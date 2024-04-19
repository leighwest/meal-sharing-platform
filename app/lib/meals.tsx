import fs from 'node:fs';

import { MealItemRequest, MealItemType } from '@/components/meals/model/meal';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals(): Promise<MealItemType[]> {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // only need async because we're using a Promise to simulate lag
  // throw new Error();   put here to test that error.tsx works
  return db.prepare('SELECT * FROM meals').all() as MealItemType[];
}

export function getMeal(slug: string): MealItemType {
  return db
    .prepare('SELECT * FROM meals WHERE slug = ?')
    .get(slug) as MealItemType;
}

export async function saveMeal(mealRequest: MealItemRequest) {
  const extension = (mealRequest.image as File).name.split('.').pop();
  const fileName = `${mealRequest.slug}.${extension}`;

  const response = await fetch(URL.createObjectURL(mealRequest.image as File));
  const bufferedImage = await response.arrayBuffer();

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed');
    }
  });

  const meal: MealItemType = {
    title: mealRequest.title as string,
    slug: slugify(mealRequest.title as string, { lower: true }),
    creator: mealRequest.creator as string,
    creator_email: mealRequest.creator_email as string,
    image: `/images/${fileName}`,
    summary: mealRequest.summary as string,
    instructions: xss(mealRequest.instructions as string), // sanitise instructions
  };

  db.prepare(
    `
    INSERT INTO meals 
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `
  ).run(meal);
}

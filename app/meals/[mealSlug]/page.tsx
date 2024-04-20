import Image from 'next/image';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import classes from './page.module.css';
import { getMeal } from '@/app/lib/meals';
import {notFound} from "next/navigation";

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound()
  }
    return {
      title: meal.title,
      description: meal.summary,
    };
}

export default function MealDetailsPage({ params }: Props) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image as string} alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}

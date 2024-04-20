'use server';
// creates a server action - guarantees function will only execute on server (also requires async)
// server action can then be assigned to the 'action' prop on the form

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';
import { MealItemType } from '@/components/meals/model/meal';
import { revalidatePath } from 'next/cache';

function isInvalidFormValue(text: string) {
  return !text || text.trim() === '';
}

export async function shareMeal(
  prevState: { message: string | null },
  formData: FormData
) {
  const meal: MealItemType = {
    title: formData.get('title') as string, // the 'name' of the input should be passed to the get method
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as string,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
    slug: formData.get('title') as string,
  };

  // Validate the title ensuring it's a string and not empty
  for (const [key, value] of Object.entries(meal)) {
    if (key != 'image' && isInvalidFormValue(value as string)) {
      return {
        message: `Meal ${key} is required and must be a non-empty string.`,
      };
    }
  }

  if ((meal.image as File).size == 0) {
    return { message: 'Meal image is required and cannot be of size 0.' };
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  // this will only refresh the cache of the page in /meals, equivalent to revalidate('/meals', 'page')
  // if you want to revalidate nested pages too, then you use revalidate('/meals', 'layout')
  redirect('/meals');
}

'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';

// creates a server action - guarantees function will only execute on server (also requires async)
// server action can then be assigned to the 'action' prop on the form

export async function shareMeal(formData: FormData) {
  const meal = {
    title: formData.get('title'), // the 'name' of the input should be passed to the get method
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    slug: formData.get('title'),
  };

  await saveMeal(meal);
  redirect('/meals');
}

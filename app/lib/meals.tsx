import { MealItemType } from '@/components/meals/meal-item';
import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals(): Promise<MealItemType[]> {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare('SELECT * FROM meals').all() as MealItemType[];
}

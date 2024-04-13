import { MealItemType } from '@/components/meals/meal-item';
import sql from 'better-sqlite3';

const db = sql('meals.db');

export function getMeals(): MealItemType[] {
  return db.prepare('SELECT * FROM meals').all() as MealItemType[];
}

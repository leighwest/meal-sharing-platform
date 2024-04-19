import { MealItemType } from './model/meal';
import MealItem from './meal-item';
import classes from './meals-grid.module.css';

type Props = {
  meals: MealItemType[];
};

export default async function MealsGrid({ meals }: Props) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}

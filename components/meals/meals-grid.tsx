import MealItem, { MealItemProps } from './meal-item';
import classes from './meals-grid.module.css';

export default function MealsGrid(meals: MealItemProps[]) {
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

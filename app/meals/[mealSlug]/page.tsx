import Image from 'next/image';

import classes from './page.module.css';
import { getMeal } from '@/app/lib/meals';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

type MealDetailsProps = {
  params: Params;
};

export default function MealDetailsPage({ params }: MealDetailsProps) {
  const meal = getMeal(params.mealSlug);

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image} alt={meal.title} />
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

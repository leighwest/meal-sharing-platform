import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export type MealItemType = {
  id: number;
  title: string;
  slug: string;
  creator: string;
  creator_email: string;
  image: string;
  summary: string;
  instructions: string;
};

export default function MealItem({
  title,
  slug,
  image,
  summary,
  creator,
}: MealItemType) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}

import classes from '.page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import Link from 'next/link';

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}></header>
      <h1>
        Delicious meals, created{' '}
        <span className={classes.highlight}>by you</span>
      </h1>
      <p>
        Choose your favourite receipe and cook it yourself. It is easy and fun!
      </p>
      <p className={classes.cta}>
        <Link href="meals/share">Share Your Favourite Recipe</Link>
      </p>
      <main className={classes.main}>
        <MealsGrid meals={[]} />
      </main>
    </>
  );
}

import { Branches } from '../components/Branches';
import { CatalogGrid } from '../components/CatalogGrid';
import { HeroSlider } from '../components/HeroSlider';
import { News } from '../components/News';
import { Popular } from '../components/Popular';
import { Promos } from '../components/Promos';
import { Reasons } from '../components/Reasons';
import { Services } from '../components/Services';
import s from './Home.module.css';

export function Home() {
  return (
    <main>
      <HeroSlider />
      <Services />
      <CatalogGrid />
      <section className={s.sheet} aria-label="Популярное, акции, новости и филиалы">
        <Popular />
        <Promos />
        <News />
        <Branches />
        <Reasons />
      </section>
    </main>
  );
}

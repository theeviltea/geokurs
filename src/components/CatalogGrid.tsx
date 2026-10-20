import { categoryTiles } from '../data/home';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './CatalogGrid.module.css';

export function CatalogGrid() {
  return (
    <section className={`container ${s.section}`} aria-labelledby="catalog-title">
      <h2 id="catalog-title" className={`h2 ${s.title}`}>Каталог</h2>
      <div className={s.grid}>
        {categoryTiles.map((c) => (
          <SmartLink key={c.name} href={c.href} className={s.tile}>
            <span className={s.name}>{c.name}</span>
            <span className={s.pic}><img src={c.image} alt="" className={c.wide ? s.wide : undefined} loading="lazy" /></span>
          </SmartLink>
        ))}
        <SmartLink href="#" className={s.all}>
          <svg className={s.allRings} viewBox="0 0 260 260" fill="none" aria-hidden="true">
            <circle cx="130" cy="130" r="125" stroke="#FFFFFF" strokeOpacity="0.14" />
            <circle cx="130" cy="130" r="80" stroke="#FFFFFF" strokeOpacity="0.14" />
            <path d="M130 0v260M0 130h260" stroke="#FFFFFF" strokeOpacity="0.14" />
          </svg>
          <span className={s.allText}>
            <span className={s.allTitle}>Весь каталог</span>
            <span className={s.allSub}><span className="desktop-only">12 разделов: от GNSS до аксессуаров</span><span className="mobile-only">12 разделов</span></span>
          </span>
          <span className={s.allArrow} aria-hidden="true"><Icon name="arrowRight" size={22} stroke={2} /></span>
        </SmartLink>
      </div>
    </section>
  );
}

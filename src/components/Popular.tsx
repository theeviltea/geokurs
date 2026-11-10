import { useState } from 'react';
import { popularProducts } from '../data/products';
import { Icon } from './Icon';
import { ProductCard } from './ProductCard';
import { SmartLink } from './SmartLink';
import s from './Popular.module.css';

const TABS = ['Хит', 'Советуем', 'Новинка'];

export function Popular() {
  const [tab, setTab] = useState(0);
  // Prototype: the three picks share one list; order changes so switching is visible.
  const list = tab === 0 ? popularProducts : tab === 1 ? [...popularProducts].reverse() : [...popularProducts.slice(4), ...popularProducts.slice(0, 4)];
  return (
    <div className={`container ${s.wrap}`}>
      <div className={s.head}>
        <h2 className="h2">Рекомендации</h2>
        <SmartLink href="/catalog/gnss-oborudovanie" className={`${s.allLink} mobile-only`}>Все</SmartLink>
        <div role="tablist" aria-label="Подборки" className={s.tabs}>
          {TABS.map((t, i) => (
            <button key={t} type="button" role="tab" aria-selected={tab === i} className={`${s.tab} ${tab === i ? s.tabOn : ''}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>
      </div>
      <div className={`${s.grid} no-scrollbar`}>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} variant="carousel" meta={p.sku ? `Под заказ · ${p.sku}` : `Под заказ · ${p.brand}`} />
        ))}
        <SmartLink href="/catalog/gnss-oborudovanie" className={`${s.allCard} desktop-only`}>
          {/* same look as the «Весь каталог» tile in the catalog grid: rings, title, sub, arrow bottom-left */}
          <svg className={s.allRings} viewBox="0 0 260 260" fill="none" aria-hidden="true">
            <circle cx="130" cy="130" r="125" stroke="#FFFFFF" strokeOpacity="0.14" />
            <circle cx="130" cy="130" r="80" stroke="#FFFFFF" strokeOpacity="0.14" />
            <path d="M130 0v260M0 130h260" stroke="#FFFFFF" strokeOpacity="0.14" />
          </svg>
          <span className={s.allText}>
            <span className={s.allTitle}>Весь каталог</span>
            <span className={s.allSub}>12 разделов: от GNSS до аксессуаров</span>
          </span>
          <span className={s.allArrow} aria-hidden="true"><Icon name="arrowRight" size={22} stroke={2} /></span>
        </SmartLink>
      </div>
    </div>
  );
}

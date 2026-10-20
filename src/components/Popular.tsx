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
        <h2 className="h2">Популярное</h2>
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
          <span className={s.allTitle}>Весь каталог</span>
          <span className={s.allArrow}><Icon name="arrowUpRight" size={26} stroke={2} /></span>
        </SmartLink>
      </div>
    </div>
  );
}

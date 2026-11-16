import { useEffect, useRef, useState } from 'react';
import { popularProducts } from '../data/products';
import { Icon } from './Icon';
import { ProductCard } from './ProductCard';
import { SmartLink } from './SmartLink';
import s from './Popular.module.css';

const TABS = ['Хит', 'Советуем', 'Новинка'];

export function Popular({ embedded = false }: { embedded?: boolean } = {}) {
  const [tab, setTab] = useState(0);
  // Prototype: the three picks share one list; order changes so switching is visible.
  const list = tab === 0 ? popularProducts : tab === 1 ? [...popularProducts].reverse() : [...popularProducts.slice(4), ...popularProducts.slice(0, 4)];
  // In the cabinet the picks are one row, paged with arrows.
  const row = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ left: false, right: true });
  const sync = () => {
    const el = row.current;
    if (el) setEdge({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  };
  useEffect(() => {
    if (!embedded) return;
    row.current?.scrollTo({ left: 0 });
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [embedded, tab]);
  const page = (dir: number) => {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const step = card.offsetWidth + 16; // card + gap
    const perPage = Math.max(1, Math.floor((el.clientWidth + 16) / step));
    el.scrollBy({ left: dir * perPage * step, behavior: 'smooth' });
  };
  return (
    <div className={embedded ? s.embedded : `container ${s.wrap}`}>
      <div className={s.head}>
        <h2 className="h2">Рекомендации</h2>
        <SmartLink href="/catalog/gnss-oborudovanie" className={`${s.allLink} mobile-only`}>Все</SmartLink>
        <div role="tablist" aria-label="Подборки" className={s.tabs}>
          {TABS.map((t, i) => (
            <button key={t} type="button" role="tab" aria-selected={tab === i} className={`${s.tab} ${tab === i ? s.tabOn : ''}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>
        {embedded && (
          <div className={`${s.arrows} desktop-only`}>
            <button type="button" aria-label="Предыдущие товары" disabled={!edge.left} onClick={() => page(-1)}><Icon name="chevronLeft" size={20} stroke={2} /></button>
            <button type="button" aria-label="Следующие товары" disabled={!edge.right} onClick={() => page(1)}><Icon name="chevronRight" size={20} stroke={2} /></button>
          </div>
        )}
      </div>
      <div ref={row} onScroll={embedded ? sync : undefined} className={`${s.grid} ${embedded ? s.row : ''} no-scrollbar`}>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} variant="carousel" stack={embedded} meta={p.sku ? `Под заказ · ${p.sku}` : `Под заказ · ${p.brand}`} />
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

import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import { FavIcon } from './ProductCard';
import { keyByName, store, useStore, type Item } from '../lib/store';
import s from './SimilarStrip.module.css';

export type MiniProduct = { name: string; brand: string; price: string | null; img: string | null; href?: string };

const asItem = (p: MiniProduct): Item => ({ key: keyByName(p.name) ?? `m:${p.name}`, name: p.name, brand: p.brand, price: p.price, image: p.img ?? '', href: p.href });

function Row({ items }: { items: MiniProduct[] }) {
  const st = useStore();
  return (
    <div className={`${s.grid} no-scrollbar`}>
      {items.map((p) => (
        <article key={p.name} className={s.card}>
          <div className={s.media}>
            {p.img ? <img src={p.img} alt={p.name} loading="lazy" /> : <span className={s.ph} aria-hidden="true">{p.brand}</span>}
            {(() => { const on = st.fav.includes(asItem(p).key); return (
              <button type="button" aria-label={on ? 'Убрать из избранного' : 'В избранное'} aria-pressed={on} className={`${s.fav} ${on ? s.favOn : ''}`} onClick={() => store.toggleFav(asItem(p))}><FavIcon on={on} /></button>
            ); })()}
          </div>
          <div className={s.body}>
            <span className={s.meta}>Под заказ · {p.brand}</span>
            <h3 className={s.name}><SmartLink href={p.href ?? '#'}>{p.name}</SmartLink></h3>
            <div className={s.foot}>
              <span className={s.price}>{p.price ?? 'По запросу'}</span>
              <button type="button" className={s.buy} aria-label={p.price ? 'В корзину' : 'Узнать цену'} onClick={() => { if (p.price) store.addToCart(asItem(p)); }}>
                <Icon name="cart" size={18} stroke={1.8} className={s.buyIcon} />
                <span className={s.buyLabel}>{p.price ? 'В корзину' : 'Узнать цену'}</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/** Sunken sheet with a row of product cards (grid on desktop, compact scroller on phones);
 *  phones also get a «Рекомендуем» row below. */
export function SimilarStrip({ title, allLabel, allHref = '#', items, recommend }: { title: string; allLabel: string; allHref?: string; items: MiniProduct[]; recommend?: MiniProduct[] }) {
  return (
    <section className={s.sheet} aria-label={title}>
      <div className={`container ${s.wrap}`}>
        <div className={s.head}>
          <h2 className="h2">{title}</h2>
          <SmartLink href={allHref} className={s.all}>
            <span className="desktop-only">{allLabel}</span><span className="mobile-only">Все</span>
            <Icon name="arrowRight" size={16} stroke={2} className="desktop-only" />
          </SmartLink>
        </div>
        <Row items={items} />
        {recommend && recommend.length > 0 && (
          <div className={s.more}>
            <div className={s.head}>
              <h2 className="h2">Рекомендуем</h2>
              <SmartLink href="/catalog/gnss-oborudovanie" className={s.all}>Все</SmartLink>
            </div>
            <Row items={recommend} />
          </div>
        )}
      </div>
    </section>
  );
}

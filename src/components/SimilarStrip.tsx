import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './SimilarStrip.module.css';

export type MiniProduct = { name: string; brand: string; price: string | null; img: string | null; href?: string };

/** Sunken sheet with a row of product cards (grid on desktop, scroller on phones). */
export function SimilarStrip({ title, allLabel, allHref = '#', items }: { title: string; allLabel: string; allHref?: string; items: MiniProduct[] }) {
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
        <div className={`${s.grid} no-scrollbar`}>
          {items.map((p) => (
            <article key={p.name} className={s.card}>
              <div className={s.media}>
                {p.img ? <img src={p.img} alt={p.name} loading="lazy" /> : <span className={s.ph} aria-hidden="true">{p.brand}</span>}
                <button type="button" aria-label="Отложить" className={s.fav}><Icon name="fav" size={20} stroke={1.6} /></button>
              </div>
              <div className={s.body}>
                <span className={s.meta}>Под заказ · {p.brand}</span>
                <h3 className={s.name}><SmartLink href={p.href ?? '#'}>{p.name}</SmartLink></h3>
                <div className={s.foot}>
                  <span className={s.price}>{p.price ?? 'Цена по запросу'}</span>
                  <button type="button" className={s.buy} aria-label={p.price ? 'В корзину' : 'Узнать цену'}>
                    <span className={s.buyLabel}>{p.price ? 'В корзину' : 'Узнать цену'}</span>
                    <Icon name="cart" size={18} stroke={1.8} className={s.buyIcon} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { productHref } from '../data/catalog';
import { formatPrice, type Product } from '../data/products';
import { SmartLink } from './SmartLink';
import { navByKey } from '../lib/products';
import { store, useStore, type Item } from '../lib/store';
import { Icon } from './Icon';
import s from './ProductCard.module.css';

type Props = { product: Product; meta?: string; badges?: boolean; variant?: 'grid' | 'carousel'; className?: string };

export function ProductCard({ product: p, meta, badges = false, variant = 'grid', className }: Props) {
  const badge = badges ? (p.hit ? 'hit' : p.isNew ? 'new' : null) : null;
  const st = useStore();
  const faved = st.fav.includes(p.id);
  const compared = st.compare.includes(p.id);
  const item: Item = { key: p.id, name: p.name, brand: p.brand, price: p.price ? formatPrice(p) : null, image: p.image, cat: navByKey[p.id]?.cat, href: productHref[p.id] };
  return (
    <article className={`${s.card} ${variant === 'carousel' ? s.carousel : ''} ${className ?? ''}`}>
      <div className={s.media}>
        <img src={p.image} alt={p.name} loading="lazy" />
        {badge === 'hit' && <span className={`${s.badge} ${s.hit}`}><span className="desktop-only">Хит продаж</span><span className="mobile-only">Хит</span></span>}
        {badge === 'new' && <span className={`${s.badge} ${s.new}`}>Новинка</span>}
        <button type="button" aria-label={faved ? 'Убрать из избранного' : 'В избранное'} aria-pressed={faved} className={`${s.round} ${s.fav} ${faved ? s.favOn : ''}`} onClick={() => store.toggleFav(item)}><FavIcon on={faved} /></button>
        <button type="button" aria-label={compared ? 'Убрать из сравнения' : 'Добавить к сравнению'} aria-pressed={compared} className={`${s.round} ${s.compare} ${compared ? s.cmpOn : ''}`} onClick={() => store.toggleCompare(item)}><Icon name="compare" size={20} stroke={1.6} /></button>
      </div>
      <div className={s.body}>
        <span className={s.meta}><span className={s.dot} />{meta ?? `Под заказ · ${p.brand}`}</span>
        <h3 className={s.name}><SmartLink href={productHref[p.id] ?? '#'}>{p.name}</SmartLink></h3>
        <div className={s.foot}>
          <span className={s.price}>{formatPrice(p)}</span>
          <button type="button" className={s.buy} aria-label="В корзину" onClick={() => store.addToCart(item)}>
            <span className={s.buyLabel}>В корзину</span>
            <Icon name="cart" size={18} stroke={1.8} className={s.buyIcon} />
          </button>
        </div>
      </div>
    </article>
  );
}

const HEART = 'M2,8.69C2,13.03 7.59,17.86 10.41,19.97C11.36,20.68 12.64,20.68 13.59,19.97C16.41,17.86 22,13.03 22,8.69C22,5.83 19.89,3.5 17,3.5C15.5,3.5 14,4 12,6C10,4 8.5,3.5 7,3.5C4.11,3.5 2,5.83 2,8.69Z';

/** Heart outline; filled when the product is in favourites. */
export function FavIcon({ on, size = 20 }: { on: boolean; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d={HEART} /></svg>;
}

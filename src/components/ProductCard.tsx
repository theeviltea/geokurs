import { productHref } from '../data/catalog';
import { formatPrice, type Product } from '../data/products';
import { SmartLink } from './SmartLink';
import { Icon } from './Icon';
import s from './ProductCard.module.css';

type Props = { product: Product; meta?: string; badges?: boolean; variant?: 'grid' | 'carousel'; className?: string };

export function ProductCard({ product: p, meta, badges = false, variant = 'grid', className }: Props) {
  const badge = badges ? (p.hit ? 'hit' : p.isNew ? 'new' : null) : null;
  return (
    <article className={`${s.card} ${variant === 'carousel' ? s.carousel : ''} ${className ?? ''}`}>
      <div className={s.media}>
        <img src={p.image} alt={p.name} loading="lazy" />
        {badge === 'hit' && <span className={`${s.badge} ${s.hit}`}><span className="desktop-only">Хит продаж</span><span className="mobile-only">Хит</span></span>}
        {badge === 'new' && <span className={`${s.badge} ${s.new}`}>Новинка</span>}
        <button type="button" aria-label="Отложить" className={`${s.round} ${s.fav}`}><Icon name="fav" size={20} stroke={1.6} /></button>
        <button type="button" aria-label="Добавить к сравнению" className={`${s.round} ${s.compare}`}><Icon name="compare" size={20} stroke={1.6} /></button>
      </div>
      <div className={s.body}>
        <span className={s.meta}><span className={s.dot} />{meta ?? `Под заказ · ${p.brand}`}</span>
        <h3 className={s.name}><SmartLink href={productHref[p.id] ?? '#'}>{p.name}</SmartLink></h3>
        <div className={s.foot}>
          <span className={s.price}>{formatPrice(p)}</span>
          <button type="button" className={s.buy} aria-label="В корзину">
            <span className={s.buyLabel}>В корзину</span>
            <Icon name="cart" size={18} stroke={1.8} className={s.buyIcon} />
          </button>
        </div>
      </div>
    </article>
  );
}

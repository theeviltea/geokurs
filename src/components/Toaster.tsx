import { Link } from 'react-router-dom';
import { toast, useToasts, type Toast } from '../lib/toast';
import { Icon } from './Icon';
import s from './Toaster.module.css';

const HEART = 'M2,8.69C2,13.03 7.59,17.86 10.41,19.97C11.36,20.68 12.64,20.68 13.59,19.97C16.41,17.86 22,13.03 22,8.69C22,5.83 19.89,3.5 17,3.5C15.5,3.5 14,4 12,6C10,4 8.5,3.5 7,3.5C4.11,3.5 2,5.83 2,8.69Z';
const META = {
  cart: { title: 'Добавлено в корзину', link: 'Перейти в корзину', to: '/cart' },
  fav: { title: 'Добавлено в избранное', link: 'Открыть избранное', to: '/favorites' },
  unfav: { title: 'Удалено из избранного', link: 'Вернуть', to: '' },
  cmp: { title: 'Добавлено в сравнение', link: 'Перейти к сравнению', to: '/compare' },
  uncmp: { title: 'Удалено из сравнения', link: 'Вернуть', to: '' },
} as const;

function Item({ t }: { t: Toast }) {
  const m = META[t.kind];
  return (
    <div role="status" className={`${s.toast} ${s[t.kind]}`} onMouseEnter={() => toast.hold(t.id)} onMouseLeave={() => toast.release(t.id)}>
      <span className={s.thumb}>
        <img src={t.image} alt="" />
        <span className={s.mark} aria-hidden="true">
          {t.kind === 'cart' && <Icon name="check" size={12} stroke={3} />}
          {t.kind === 'fav' && <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d={HEART} /></svg>}
          {(t.kind === 'unfav' || t.kind === 'uncmp') && <Icon name="minus" size={12} stroke={3} />}
          {t.kind === 'cmp' && <Icon name="compare" size={13} stroke={2.2} />}
        </span>
      </span>
      <span className={s.text}>
        <b>{m.title}</b>
        <span className={s.name}>{t.name}</span>
        {t.kind === 'unfav' || t.kind === 'uncmp'
          ? <button type="button" className={s.link} onClick={() => { toast.dismiss(t.id); t.undo?.(); }}>{m.link}<Icon name="arrowRight" size={14} stroke={2} /></button>
          : <Link to={m.to} className={s.link} onClick={() => toast.dismiss(t.id)}>{m.link}<Icon name="arrowRight" size={14} stroke={2} /></Link>}
      </span>
      <button type="button" aria-label="Закрыть уведомление" className={s.close} onClick={() => toast.dismiss(t.id)}><Icon name="close" size={16} stroke={2} /></button>
      <span className={s.timer} aria-hidden="true" />
    </div>
  );
}

/** Stack of notices under the header, aligned with the cart button. */
export function Toaster() {
  const list = useToasts();
  return (
    <div className={s.wrap} aria-live="polite">
      <div className={s.stack}>{list.map((t) => <Item key={t.id} t={t} />)}</div>
    </div>
  );
}

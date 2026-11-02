import { Link, useLocation } from 'react-router-dom';
import { cartCount, useStore } from '../lib/store';
import { Icon } from './Icon';
import s from './TabBar.module.css';

const HOME = 'M3,10.5L12,3L21,10.5M5,9L5,19C5,20.1 5.9,21 7,21L17,21C18.1,21 19,20.1 19,19L19,9M10,21L10,15L14,15L14,21';

/** Bottom navigation on phones and tablets (the desktop header takes over from 1180px). */
export function TabBar() {
  const { pathname, search } = useLocation();
  const n = cartCount(useStore());
  const active =
    pathname === '/' ? 'home'
    : pathname.startsWith('/catalog') || pathname.startsWith('/product') ? 'catalog'
    : pathname === '/cart' ? 'cart'
    : pathname === '/account' && search.includes('tab=fav') ? 'fav'
    : ['/account', '/login', '/register'].includes(pathname) ? 'account' : '';
  const cls = (k: string) => `${s.item} ${active === k ? s.on : ''}`;
  return (
    <nav aria-label="Основная навигация" className={s.bar}>
      <Link to="/" className={cls('home')} aria-current={active === 'home' ? 'page' : undefined}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={HOME} /></svg>Главная
      </Link>
      <button type="button" className={cls('catalog')} onClick={() => window.dispatchEvent(new Event('gk:open-catalog'))}>
        <Icon name="grid" size={24} />Каталог
      </button>
      <Link to="/cart" className={cls('cart')} aria-label={`Корзина, ${n} товаров`}>
        <span className={s.icon}><Icon name="cartAlt" size={24} />{n > 0 && <span className={s.badge}>{n}</span>}</span>Корзина
      </Link>
      <Link to="/account?tab=fav" className={cls('fav')}><Icon name="fav" size={24} />Избранное</Link>
      <Link to="/account" className={cls('account')}><Icon name="user" size={24} />Кабинет</Link>
    </nav>
  );
}

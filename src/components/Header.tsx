import { useState } from 'react';
import { Link } from 'react-router-dom';
import { img } from '../data/images';
import { mainNav, PHONE } from '../data/nav';
import { Icon } from './Icon';
import { MobileMenu } from './MobileMenu';
import { SmartLink } from './SmartLink';
import s from './Header.module.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={s.header}>
      {/* Desktop */}
      <div className={`container ${s.desktop}`}>
        <div className={s.left}>
          <Link to="/" aria-label="GEOKURS — на главную" className={s.logo}>
            <img src={img('logo-green.png')} alt="GEOKURS" />
          </Link>
          <nav aria-label="Разделы" className={s.nav}>
            {mainNav.map((n) => (
              <SmartLink key={n.label} href={n.href} className={s.navLink}>
                {n.label}
                {n.dropdown && <Icon name="chevronDown" size={14} stroke={2} />}
              </SmartLink>
            ))}
          </nav>
        </div>
        <form className={s.search} role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="site-search" className="sr-only">Поиск</label>
          <Icon name="search" size={18} stroke={2} color="var(--c-gray-600)" />
          <input id="site-search" type="search" placeholder="Поиск по каталогу" />
        </form>
        <div className={s.right}>
          <a href={PHONE.mainHref} className={s.phone}>{PHONE.main}</a>
          <div className={s.icons}>
            <a href="#" aria-label="Сравнение, 0" className={s.iconBtn}><Icon name="compare" stroke={1.8} /></a>
            <a href="#" aria-label="Отложенные, 0" className={s.iconBtn}><Icon name="fav" stroke={1.8} /></a>
            <a href="#" aria-label="Мой кабинет" className={s.iconBtn}><Icon name="user" stroke={1.8} /></a>
            <a href="#" className={s.cartBtn}><Icon name="cart" size={20} stroke={1.9} />Корзина · 0</a>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={s.mobile}>
        <Link to="/" aria-label="GEOKURS — на главную" className={s.logoSm}>
          <img src={img('logo-green.png')} alt="GEOKURS" />
        </Link>
        <a href="#" aria-label="Поиск" className={s.iconBtn} style={{ marginLeft: 'auto' }}><Icon name="search" stroke={1.5} /></a>
        <a href="#" aria-label="Корзина, 0 товаров" className={s.iconBtn}>
          <Icon name="cart" stroke={1.5} />
          <span className={s.badge}>0</span>
        </a>
        <button type="button" aria-label="Меню" aria-expanded={menuOpen} aria-controls="mobile-menu" className={s.iconBtn} onClick={() => setMenuOpen(true)}>
          <Icon name="menu" stroke={1.8} />
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

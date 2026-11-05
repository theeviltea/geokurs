import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { img } from '../data/images';
import { mainNav, PHONE } from '../data/nav';
import { searchCatalog } from '../lib/search';
import { cartCount, useStore } from '../lib/store';
import { Icon } from './Icon';
import { MobileMenu } from './MobileMenu';
import { MobileSearch } from './MobileSearch';
import { CatalogMenu, HelpMenu } from './NavMenus';
import { SearchResults } from './SearchResults';
import { SmartLink } from './SmartLink';
import s from './Header.module.css';

type Menu = 'catalog' | 'help' | null;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<'root' | 'cats'>('root');
  const [mobileSearch, setMobileSearch] = useState(false);
  const [menu, setMenu] = useState<Menu>(null);
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const searchRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const st = useStore();
  const inCart = cartCount(st);
  const navigate = useNavigate();

  const closeAll = useCallback(() => { window.clearTimeout(timer.current); setMenu(null); setSearchOpen(false); }, []);
  // Hover intent: open after a short pause, close a little after the pointer leaves the header.
  const hoverOpen = (m: Menu) => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => { setMenu(m); setSearchOpen(false); }, menu ? 0 : 120); };
  const hoverClose = () => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setMenu(null), 220); };
  const toggle = (m: Menu) => { window.clearTimeout(timer.current); setSearchOpen(false); setMenu((cur) => (cur === m ? null : m)); };

  useEffect(() => { closeAll(); setMenuOpen(false); setMobileSearch(false); }, [location.pathname, closeAll]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  // The bottom tab bar asks for the catalog: open the menu straight on the sections list.
  useEffect(() => {
    const open = () => { setMenuView('cats'); setMenuOpen(true); };
    const search = () => { if (window.matchMedia('(max-width: 1179px)').matches) setMobileSearch(true); else document.getElementById('site-search')?.focus(); };
    window.addEventListener('gk:open-catalog', open);
    window.addEventListener('gk:open-search', search);
    return () => { window.removeEventListener('gk:open-catalog', open); window.removeEventListener('gk:open-search', search); };
  }, []);
  useEffect(() => {
    if (!menu && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll(); };
    const onDown = (e: MouseEvent) => { if (searchOpen && searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false); };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, [menu, searchOpen, closeAll]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const first = searchCatalog(q, 50).items.find((x) => x.href.startsWith('/'));
    if (first) { navigate(first.href); closeAll(); }
  };

  return (
    <header className={s.header} onMouseLeave={() => menu && hoverClose()} onMouseEnter={() => menu && window.clearTimeout(timer.current)}>
      {/* Desktop */}
      <div className={`container ${s.desktop}`}>
        <div className={s.left}>
          <Link to="/" aria-label="GEOKURS — на главную" className={s.logo}>
            <img src={img('logo-green.png')} alt="GEOKURS" />
          </Link>
          <nav aria-label="Разделы" className={s.nav}>
            {mainNav.map((n) => {
              const key: Menu = n.label === 'Каталог' ? 'catalog' : n.label === 'Как купить' ? 'help' : null;
              if (!key) {
                return <SmartLink key={n.label} href={n.href} className={s.navLink} onMouseEnter={() => menu && hoverClose()}>{n.label}</SmartLink>;
              }
              const on = menu === key;
              return (
                <div key={n.label} className={s.navItem}>
                  <button type="button" className={`${s.navLink} ${on ? s.navOn : ''}`} aria-expanded={on} aria-haspopup="true"
                    onMouseEnter={() => hoverOpen(key)} onClick={() => { if (key === 'catalog') { closeAll(); navigate('/catalog'); } else toggle(key); }}>
                    {n.label}
                    <Icon name="chevronDown" size={14} stroke={2} className={s.chev} />
                  </button>
                  {key === 'help' && on && <HelpMenu onGo={closeAll} />}
                </div>
              );
            })}
          </nav>
        </div>
        <form ref={searchRef} className={`${s.search} ${searchOpen ? s.searchOn : ''}`} role="search" onSubmit={submit} onMouseEnter={() => menu && hoverClose()}>
          <label htmlFor="site-search" className="sr-only">Поиск по каталогу</label>
          <Icon name="search" size={18} stroke={2} color={searchOpen ? 'var(--c-green-600)' : 'var(--c-gray-600)'} />
          <input id="site-search" type="search" autoComplete="off" placeholder="Поиск по каталогу" value={q}
            aria-expanded={searchOpen} aria-controls="site-search-results"
            onChange={(e) => { setQ(e.target.value); setSearchOpen(true); }}
            onFocus={() => { setMenu(null); setSearchOpen(true); }} />
          {q && (
            <button type="button" aria-label="Очистить поиск" className={s.clear} onClick={() => { setQ(''); setSearchOpen(true); searchRef.current?.querySelector('input')?.focus(); }}>
              <Icon name="close" size={14} stroke={2.2} />
            </button>
          )}
          {searchOpen && (
            <div className={s.results}>
              <SearchResults id="site-search-results" query={q} onPick={setQ} onGo={closeAll} />
            </div>
          )}
        </form>
        <div className={s.right}>
          <a href={PHONE.mainHref} className={s.phone}>{PHONE.main}</a>
          <div className={s.icons}>
            <Link to="/compare" aria-label={`Сравнение, ${st.compare.length}`} className={s.iconBtn}><Icon name="compare" stroke={1.8} />{st.compare.length > 0 && <span key={st.compare.length} className={s.badge}>{st.compare.length}</span>}</Link>
            <Link to="/favorites" aria-label={`Избранное, ${st.fav.length}`} className={s.iconBtn}><Icon name="fav" stroke={1.8} />{st.fav.length > 0 && <span key={st.fav.length} className={s.badge}>{st.fav.length}</span>}</Link>
            <Link to="/account" aria-label="Мой кабинет" className={s.iconBtn}><Icon name="user" stroke={1.8} /></Link>
            <Link to="/cart" className={s.cartBtn}><Icon name="cart" size={20} stroke={1.9} />Корзина · {inCart}</Link>
          </div>
        </div>
      </div>
      {menu === 'catalog' && <CatalogMenu onGo={closeAll} />}
      {(menu === 'catalog' || searchOpen) && <div className={s.dim} aria-hidden="true" onClick={closeAll} onMouseEnter={() => menu && hoverClose()} />}

      {/* Mobile */}
      <div className={s.mobile}>
        <Link to="/" aria-label="GEOKURS — на главную" className={s.logoSm}>
          <img src={img('logo-green.png')} alt="GEOKURS" />
        </Link>
        <button type="button" aria-label="Поиск" className={s.iconBtn} style={{ marginLeft: 'auto' }} onClick={() => setMobileSearch(true)}><Icon name="search" stroke={1.5} /></button>
        <button type="button" aria-label="Меню" aria-expanded={menuOpen} aria-controls="mobile-menu" className={s.iconBtn} onClick={() => { setMenuView('root'); setMenuOpen(true); }}>
          <Icon name="menu" stroke={1.8} />
        </button>
      </div>
      <MobileMenu open={menuOpen} startView={menuView} onClose={() => setMenuOpen(false)} />
      <MobileSearch open={mobileSearch} onClose={() => setMobileSearch(false)} />
    </header>
  );
}

import { useEffect, useState, type CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSlider } from '../../components/HeroSlider';
import { Icon } from '../../components/Icon';
import { Popular } from '../../components/Popular';
import { SmartLink } from '../../components/SmartLink';
import { img } from '../../data/images';
import type { IconName } from '../../icons/icons';
import { cartCount, useStore } from '../../lib/store';
import s from './Cabinet.module.css';

const LOGO = img('logo-green.png');
const USER = { name: 'Alibek Berdenov', initials: 'AB' };

type Item = { icon: IconName; label: string; href?: string; soon?: boolean };
/** Left menu: the structure and names of the client's LK. */
const MENU: { title?: string; gap?: boolean; items: Item[] }[] = [
  { items: [{ icon: 'home', label: 'Главная', href: '/cabinet' }, { icon: 'chip', label: 'Мои приборы' }] },
  { title: 'Услуги', items: [
    { icon: 'radioWaves', label: 'Базовые станции', href: '/services/base-stations' }, { icon: 'buoy', label: 'Техподдержка', href: '/services/support' },
    { icon: 'wrench', label: 'Сервисный центр', href: '/services/repair' }, { icon: 'ruler', label: 'Поверка', href: '/services/metrology' },
    { icon: 'key', label: 'Аренда', href: '/services/rent', soon: true }, { icon: 'cap', label: 'Обучение', href: '/services/education', soon: true },
  ] },
  { title: 'Покупки', items: [{ icon: 'bag', label: 'Каталог', href: '/catalog' }, { icon: 'box', label: 'Заказы' }, { icon: 'bill', label: 'Счета и оплаты' }] },
  { gap: true, items: [{ icon: 'doc', label: 'Документы' }, { icon: 'chatBubble', label: 'Сообщения' }] },
  { title: 'Полезное', items: [{ icon: 'book', label: 'База знаний' }, { icon: 'firmware', label: 'Прошивки' }, { icon: 'refresh', label: 'Trade-in', href: '/services/trade-in' }] },
];
/** Content tiles: the same eight blocks. */
const TILES: (Item & { sub: string })[] = [
  { icon: 'bag', label: 'Каталог', sub: 'Приборы, ПО и аксессуары', href: '/catalog' },
  { icon: 'ruler', label: 'Метрология', sub: 'Поверка и калибровка', href: '/services/metrology' },
  { icon: 'wrench', label: 'Сервис', sub: 'Ремонт и диагностика', href: '/services/repair' },
  { icon: 'buoy', label: 'Техподдержка', sub: 'Помощь с приборами и ПО', href: '/services/support' },
  { icon: 'radioWaves', label: 'Базовые станции', sub: 'Подключение к сети RTK', href: '/services/base-stations' },
  { icon: 'key', label: 'Аренда', sub: 'Приборы на время', href: '/services/rent', soon: true },
  { icon: 'recycle', label: 'Б/У', sub: 'Купить или продать', href: '/services/used' },
  { icon: 'grid', label: 'Все сервисы', sub: 'Полный список сервисов', href: '/services' },
];

function Lang() {
  const [lang, setLang] = useState<'ru' | 'kk'>('ru');
  return (
    <div role="group" aria-label="Язык" className={s.lang}>
      {(['ru', 'kk'] as const).map((k) => <button key={k} type="button" aria-pressed={lang === k} className={lang === k ? s.langOn : ''} onClick={() => setLang(k)}>{k.toUpperCase()}</button>)}
    </div>
  );
}

function Menu({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  return (
    <nav className={s.menu} aria-label="Меню кабинета">
      {MENU.map((g, i) => (
        <div key={i} className={g.gap ? s.groupGap : undefined}>
          {g.title && <span className={s.section}>{g.title}</span>}
          {g.items.map((it) => {
            const on = it.href === pathname;
            return (
              <SmartLink key={it.label} href={it.href ?? '#'} className={`${s.item} ${on ? s.itemOn : ''}`} aria-current={on ? 'page' : undefined} onClick={onNavigate}>
                <Icon name={it.icon} size={20} stroke={1.7} />
                <span className={s.itemLabel}>{it.label}</span>
                {it.soon && <span className={s.soon}>Скоро</span>}
              </SmartLink>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function Sites() {
  return (
    <a href="https://geokurs.kz" target="_blank" rel="noreferrer" className={`${s.item} ${s.sites}`}>
      <Icon name="globe" size={20} stroke={1.7} /><span className={s.itemLabel}>Сайты Geokurs</span><Icon name="chevronRight" size={16} stroke={2} />
    </a>
  );
}

function Badge({ n }: { n: number }) {
  return n > 0 ? <span className={s.badge}>{n}</span> : null;
}

/** New personal-cabinet home: LK header + left menu, banner, service tiles, recommendations. */
export function CabinetPage() {
  const [drawer, setDrawer] = useState(false);
  const cart = cartCount(useStore());
  useEffect(() => {
    if (!drawer) return;
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawer(false); };
    const body = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = body; };
  }, [drawer]);

  return (
    <div className={s.shell}>
      <header className={s.header}>
        <button type="button" className={`${s.iconBtn} ${s.burger}`} aria-label="Меню кабинета" aria-expanded={drawer} onClick={() => setDrawer(true)}><Icon name="menu" size={22} stroke={1.8} /></button>
        <SmartLink href="/" className={s.brand} aria-label="GEOKURS — вернуться в интернет-магазин">
          <img src={LOGO} alt="GEOKURS" /><span>Личный кабинет</span>
        </SmartLink>
        <div className={s.headMain}>
          <form role="search" className={s.search} onSubmit={(e) => e.preventDefault()}>
            <Icon name="search" size={18} stroke={2} />
            <input type="search" aria-label="Поиск по кабинету" placeholder="Прибор, серийный номер, № заявки" />
          </form>
          <div className={s.tools}>
            <button type="button" className={s.iconBtn} aria-label="Уведомления, 2 новых"><Icon name="bell" size={22} stroke={1.8} /><Badge n={2} /></button>
            <SmartLink href="/cart" className={s.iconBtn} aria-label={`Корзина, ${cart} товаров`}><Icon name="cart" size={22} stroke={1.8} /><Badge n={cart} /></SmartLink>
            <span className={s.langWrap}><Lang /></span>
            <SmartLink href="/cabinet" className={s.user} aria-label={`Профиль: ${USER.name}`}>
              <span className={s.avatar}>{USER.initials}</span><span className={s.userName}>{USER.name}</span><Icon name="chevronDown" size={16} stroke={2} className={s.userChev} />
            </SmartLink>
          </div>
        </div>
      </header>

      <div className={s.body}>
        <aside className={s.side}>
          <Menu />
          <Sites />
        </aside>

        {drawer && (
          <div className={s.drawerWrap}>
            <div className={s.scrim} onClick={() => setDrawer(false)} />
            <aside className={s.drawer} role="dialog" aria-modal="true" aria-label="Меню кабинета">
              <div className={s.drawerHead}>
                <SmartLink href="/" className={s.brand} aria-label="GEOKURS — вернуться в интернет-магазин" onClick={() => setDrawer(false)}><img src={LOGO} alt="GEOKURS" /><span>Личный кабинет</span></SmartLink>
                <button type="button" className={s.iconBtn} aria-label="Закрыть меню" onClick={() => setDrawer(false)}><Icon name="close" size={22} stroke={2} /></button>
              </div>
              <Menu onNavigate={() => setDrawer(false)} />
              <div className={s.drawerLang}><span>Язык</span><Lang /></div>
              <Sites />
            </aside>
          </div>
        )}

        <main className={s.main}>
          <form role="search" className={`${s.search} ${s.searchMobile}`} onSubmit={(e) => e.preventDefault()}>
            <Icon name="search" size={18} stroke={2} />
            <input type="search" aria-label="Поиск по кабинету" placeholder="Прибор, серийный номер, № заявки" />
          </form>
          <HeroSlider compact />
          <div className={s.tiles}>
            {TILES.map((t, i) => (
              <SmartLink key={t.label} href={t.href ?? '#'} className={s.tile} style={{ '--i': i } as CSSProperties}>
                <span className={s.tileBig} aria-hidden="true"><Icon name={t.icon} size={120} stroke={1.1} /></span>
                {t.soon && <span className={`${s.soon} ${s.tileSoon}`}>Скоро</span>}
                <span className={s.tileIcon}><Icon name={t.icon} size={26} stroke={1.7} /></span>
                <span className={s.tileText}><b>{t.label}</b><span>{t.sub}</span></span>
                <span className={s.tileGo} aria-hidden="true"><Icon name="arrowUpRight" size={18} stroke={2} /></span>
              </SmartLink>
            ))}
          </div>
          <Popular embedded />
        </main>
      </div>
    </div>
  );
}

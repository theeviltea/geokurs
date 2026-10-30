import { useEffect, useRef, useState } from 'react';
import { img } from '../data/images';
import { ADDRESS, EMAIL, mobileNav, PHONE, socials } from '../data/nav';
import { helpLinks, navCategories, navProducts } from '../data/navigation';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './MobileMenu.module.css';

type Props = { open: boolean; onClose: () => void };
/** 'root' = main menu, 'cats' = catalog sections, 'cat:<key>' = one section, 'help' = «Как купить». */
type View = string;
const byKey = Object.fromEntries(navProducts.map((p) => [p.key, p]));

export function MobileMenu({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>('root');
  const cur = view.startsWith('cat:') ? navCategories.find((c) => 'cat:' + c.key === view) : undefined;
  const go = (v: View) => { setView(v); panel.current?.scrollTo(0, 0); };
  useEffect(() => { if (!open) setView('root'); }, [open]);
  useEffect(() => {
    // Keep the closed drawer out of the tab order and the accessibility tree.
    if (ref.current) (ref.current as HTMLDivElement & { inert: boolean }).inert = !open;
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" className={`${s.overlay} ${open ? s.open : ''}`} ref={ref} aria-hidden={!open}>
      <div className={s.backdrop} onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label="Меню" className={s.panel} ref={panel}>
        {view === 'root' ? (
          <div className={s.top}>
            <img src={img('logo-green.png')} alt="GEOKURS" className={s.logo} />
            <button type="button" aria-label="Закрыть меню" className={s.close} onClick={onClose}>
              <Icon name="close" stroke={1.8} />
            </button>
          </div>
        ) : (
          <div className={s.top} style={{ paddingLeft: 4 }}>
            <button type="button" aria-label="Назад" className={s.close} onClick={() => go(view.startsWith('cat:') ? 'cats' : 'root')}>
              <Icon name="chevronLeft" size={22} stroke={2} />
            </button>
            <span className={s.title}>{view === 'cats' ? 'Каталог' : view === 'help' ? 'Как купить' : cur?.name}</span>
            <button type="button" aria-label="Закрыть меню" className={s.close} onClick={onClose}>
              <Icon name="close" stroke={1.8} />
            </button>
          </div>
        )}

        {view === 'cats' && (
          <>
            <nav aria-label="Разделы каталога" className={s.nav}>
              {navCategories.map((c) => (
                <button key={c.key} type="button" className={s.catRow} onClick={() => go('cat:' + c.key)}>
                  <span className={s.thumb}><img src={c.image} alt="" /></span>{c.name}
                  <Icon name="chevronRight" size={18} stroke={2} color="var(--c-gray-600)" className={s.push} />
                </button>
              ))}
            </nav>
            <div className={s.block}>
              <SmartLink href="/catalog/gnss-oborudovanie" className={s.callBtn} onClick={onClose}><Icon name="grid" size={20} />Весь каталог</SmartLink>
            </div>
          </>
        )}

        {cur && (
          <>
            <nav aria-label={cur.name} className={s.nav}>
              <SmartLink href={cur.href} className={`${s.subRow} ${s.subAll}`} onClick={onClose}>Все товары раздела<Icon name="arrowRight" size={18} stroke={2} className={s.push} /></SmartLink>
              {cur.subs.map((x) => (
                <SmartLink key={x.name} href={x.href} className={s.subRow} onClick={onClose}>{x.name}<Icon name="chevronRight" size={18} stroke={2} color="var(--c-gray-600)" className={s.push} /></SmartLink>
              ))}
            </nav>
            <div className={s.popular}>
              <span className={s.label}>Популярное в разделе</span>
              <div className={`${s.cards} no-scrollbar`}>
                {cur.products.map((k) => byKey[k]).map((p) => (
                  <SmartLink key={p.key} href={p.href} className={s.card} onClick={onClose}>
                    <span className={s.cardMedia}><img src={p.image} alt="" loading="lazy" /></span>
                    <span className={s.cardName}>{p.name}</span>
                    <span className={s.cardPrice}>{p.price ?? 'По запросу'}</span>
                  </SmartLink>
                ))}
              </div>
            </div>
          </>
        )}

        {view === 'help' && (
          <>
            <nav aria-label="Как купить" className={s.helpList}>
              {helpLinks.map((h) => (
                <a key={h.name} href={h.href} className={s.helpRow}>
                  <span className={s.helpIcon}><Icon name={h.icon} size={22} /></span>
                  <span className={s.helpText}><b>{h.name}</b><small>{h.text}</small></span>
                  <Icon name="chevronRight" size={18} stroke={2} color="var(--c-gray-600)" />
                </a>
              ))}
            </nav>
            <div className={s.block}>
              <a href={PHONE.mainHref} className={s.callBtn}><Icon name="call" size={20} stroke={1.8} />{PHONE.main}</a>
            </div>
          </>
        )}

        {view === 'root' && (
        <>
        <nav aria-label="Разделы" className={s.nav}>
          {mobileNav.map((l) => (l.label === 'Каталог' || l.label === 'Как купить') ? (
            <button key={l.label} type="button" className={s.navLink} onClick={() => go(l.label === 'Каталог' ? 'cats' : 'help')}>
              {l.label}
              <Icon name="chevronRight" size={18} stroke={2} color="var(--c-gray-600)" />
            </button>
          ) : (
            <SmartLink key={l.label} href={l.href} className={s.navLink} onClick={onClose}>
              {l.label}
              <Icon name="chevronRight" size={18} stroke={2} color="var(--c-gray-600)" />
            </SmartLink>
          ))}
        </nav>

        <div className={s.shop}>
          {([['Личный кабинет', 'user'], ['Корзина', 'cartAlt'], ['Избранное', 'fav']] as const).map(([label, icon]) => (
            <a key={label} href="#" className={s.shopTile}>
              <Icon name={icon} color="var(--c-green-600)" />
              {label}
            </a>
          ))}
        </div>

        <div className={s.block}>
          <a href={PHONE.mainHref} className={s.callBtn}><Icon name="call" size={20} stroke={1.8} />{PHONE.main}</a>
        </div>

        <div className={s.block}>
          <span className={s.contactsTitle}>Контакты</span>
          <a href={PHONE.secondHref} className={s.row}><Icon name="call" size={18} color="var(--c-green-600)" />{PHONE.second}</a>
          <a href={`mailto:${EMAIL}`} className={s.row}><Icon name="mail" size={18} color="var(--c-green-600)" />{EMAIL}</a>
          <span className={s.row}><Icon name="pin" size={18} color="var(--c-green-600)" />{ADDRESS}</span>
          <div className={s.socials}>
            {socials.map((so) => (
              <a key={so.name} href={so.href} aria-label={so.name} className={s.social} target="_blank" rel="noreferrer">
                <Icon name={so.icon} size={20} />
              </a>
            ))}
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}

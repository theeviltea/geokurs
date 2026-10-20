import { useEffect, useRef } from 'react';
import { img } from '../data/images';
import { ADDRESS, EMAIL, mobileNav, PHONE, socials } from '../data/nav';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './MobileMenu.module.css';

type Props = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
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
      <div role="dialog" aria-modal="true" aria-label="Меню" className={s.panel}>
        <div className={s.top}>
          <img src={img('logo-green.png')} alt="GEOKURS" className={s.logo} />
          <button type="button" aria-label="Закрыть меню" className={s.close} onClick={onClose}>
            <Icon name="close" stroke={1.8} />
          </button>
        </div>

        <nav aria-label="Разделы" className={s.nav}>
          {mobileNav.map((l) => (
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
      </div>
    </div>
  );
}

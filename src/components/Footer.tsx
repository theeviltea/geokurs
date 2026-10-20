import { img } from '../data/images';
import { EMAIL, footerNav, PHONE, socials } from '../data/nav';
import { SmartLink } from './SmartLink';
import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.top}`}>
        <div className={s.contacts}>
          <img src={img('logo-white.png')} alt="GEOKURS" className={s.logo} />
          <div className={s.contactList}>
            <a href={PHONE.mainHref} className={s.phone}>{PHONE.main}</a>
            <a href={PHONE.secondHref}>{PHONE.second}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span>Алматы, пр. Абая, 150, к.н.п. 1а</span>
          </div>
        </div>
        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.title} className={s.col}>
            <span className={s.colTitle}>{col.title}</span>
            {col.links.map(([label, href]) => (
              <SmartLink key={label} href={href}>{label}</SmartLink>
            ))}
          </nav>
        ))}
      </div>
      <div className={`container ${s.bar}`}>
        <span>© 2026 Интернет-магазин GEOKURS</span>
        <div className={s.socials}>
          {socials.map((so) => (
            <a key={so.name} href={so.href} target="_blank" rel="noreferrer">{so.name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

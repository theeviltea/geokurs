import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './Crumbs.module.css';

type Crumb = { label: string; href?: string };

/** Desktop breadcrumbs; on phones the last link becomes a «‹ back» link. */
export function Crumbs({ items, back }: { items: Crumb[]; back: Crumb & { href: string } }) {
  return (
    <>
      <nav aria-label="Хлебные крошки" className={`${s.crumbs} desktop-only`}>
        {items.map((c, i) => (
          <span key={c.label} className={s.item}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href ? <SmartLink href={c.href} className={s.link}>{c.label}</SmartLink> : <span className={s.current} aria-current="page">{c.label}</span>}
          </span>
        ))}
      </nav>
      <SmartLink href={back.href} className={`${s.back} mobile-only`}><Icon name="chevronLeft" size={16} stroke={2} />{back.label}</SmartLink>
    </>
  );
}

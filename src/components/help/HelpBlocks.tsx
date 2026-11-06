import { useEffect, useRef, type ReactNode } from 'react';
import type { IconName } from '../../icons/icons';
import { helpLinks } from '../../data/navigation';
import { Crumbs } from '../Crumbs';
import { Icon } from '../Icon';
import { SmartLink } from '../SmartLink';
import { useFx } from '../services/ServiceBlocks';
import s from './Help.module.css';

export const HELP_PHONE = { label: '+7 700 829 00 00', href: 'tel:+77008290000' };

/** Banner on the page background: text flush left, the animated illustration on the right (above the title on phones). */
function HelpHero({ title, lede, art, badges }: { title: string; lede: string; art: string; badges: [IconName, string][] }) {
  const ref = useFx<HTMLElement>();
  return (
    <section ref={ref} className={s.hero}>
      <div aria-hidden="true" className={s.art} dangerouslySetInnerHTML={{ __html: art }} />
      <div className={s.heroBody}>
        <h1 className={s.h1}>{title}</h1>
        <p className={s.heroLede}>{lede}</p>
        <div className={s.badges}>
          {badges.map(([icon, text]) => <span key={text} className={s.badge}><Icon name={icon} size={18} stroke={1.8} />{text}</span>)}
        </div>
      </div>
    </section>
  );
}

/** Help section switcher: a sticky side menu with a contact card on desktop, a chip row on phones. */
function HelpNav({ active }: { active: string }) {
  const chips = useRef<HTMLElement>(null);
  // keep the current section's chip in view on phones (the row scrolls sideways)
  useEffect(() => {
    const row = chips.current;
    const on = row?.querySelector<HTMLElement>('[aria-current="page"]');
    if (row && on) row.scrollLeft = on.offsetLeft - 16;
  }, [active]);
  return (
    <>
      <aside className={`${s.aside} desktop-only`}>
        <nav aria-label="Помощь покупателю" className={s.side}>
          <span className={s.sideTitle}>Помощь покупателю</span>
          {helpLinks.map((h) => (
            <SmartLink key={h.name} href={h.href} aria-current={h.name === active ? 'page' : undefined} className={`${s.sideLink} ${h.name === active ? s.sideOn : ''}`}>
              {h.name}<Icon name="chevronRight" size={16} stroke={2} />
            </SmartLink>
          ))}
        </nav>
        <div className={s.ask}>
          <span className={s.askIcon}><Icon name="headset" size={22} stroke={1.7} /></span>
          <b>Остались вопросы?</b>
          <span>Менеджер ответит по телефону и в WhatsApp.</span>
          <a href={HELP_PHONE.href}>{HELP_PHONE.label}</a>
        </div>
      </aside>
      <div className={`${s.chipsWrap} mobile-only`}>
        <nav ref={chips} aria-label="Помощь покупателю" className={`${s.chips} no-scrollbar`}>
          {helpLinks.map((h) => (
            <SmartLink key={h.name} href={h.href} aria-current={h.name === active ? 'page' : undefined} className={`${s.chip} ${h.name === active ? s.chipOn : ''}`}>{h.name}</SmartLink>
          ))}
        </nav>
      </div>
    </>
  );
}

type HeroProps = { lede: string; art: string; badges: [IconName, string][] };

/** Shared layout of the «Помощь покупателю» pages. */
export function HelpLayout({ title, hero, children }: { title: string; hero: HeroProps; children: ReactNode }) {
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Помощь покупателю' }, { label: title }]} back={{ label: 'Главная', href: '/' }} />
      <HelpHero title={title} {...hero} />
      <div className={s.layout}>
        <HelpNav active={title} />
        <div className={s.body}>{children}</div>
      </div>
    </main>
  );
}

export function Section({ title, lede, children }: { title: string; lede?: string; children: ReactNode }) {
  return (
    <section className={s.section}>
      <div className={s.secHead}><h2 className={s.h2}>{title}</h2>{lede && <p className={s.lede}>{lede}</p>}</div>
      {children}
    </section>
  );
}

export function Grid({ cols, children }: { cols: 2 | 3; children: ReactNode }) {
  return <div className={`${s.grid} ${cols === 3 ? s.grid3 : ''}`}>{children}</div>;
}

/** White method card: icon tile (or a logo) with a tag, title, text and a checklist; optional action at the bottom. */
export function Method({ icon, title, text, points, tag, logo, action }: { icon: IconName; title: string; text: string; points: string[]; tag?: string; logo?: { src: string; alt: string }; action?: ReactNode }) {
  return (
    <article className={s.method}>
      <span className={s.methodTop}>
        {logo ? <img className={s.methodLogo} src={logo.src} alt={logo.alt} /> : <span className={s.methodIcon}><Icon name={icon} size={26} stroke={1.7} /></span>}
        {!logo && tag && <span className={s.tag}>{tag}</span>}
      </span>
      <span className={s.methodText}><b>{title}</b><span>{text}</span></span>
      <ul className={s.points}>
        {points.map((p) => <li key={p}><span><Icon name="check" size={12} stroke={3} /></span>{p}</li>)}
      </ul>
      {action}
    </article>
  );
}

export function Note({ icon, title, text, white = false }: { icon: IconName; title: string; text: ReactNode; white?: boolean }) {
  return (
    <div className={`${s.note} ${white ? s.noteWhite : ''}`}>
      <span className={s.noteIcon}><Icon name={icon} size={20} stroke={1.8} /></span>
      <span className={s.noteText}><b>{title}</b><span>{text}</span></span>
    </div>
  );
}

export function Checklist({ title, items }: { title?: string; items: [IconName, string][] }) {
  return (
    <div className={s.checklist}>
      {title && <span className={s.checkTitle}>{title}</span>}
      <ul>{items.map(([icon, t]) => <li key={t}><span><Icon name={icon} size={18} stroke={1.8} /></span>{t}</li>)}</ul>
    </div>
  );
}

const Rings = ({ className }: { className: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 240 240" fill="none"><circle cx="120" cy="120" r="118" stroke="#227831" strokeOpacity="0.12" /><circle cx="120" cy="120" r="74" stroke="#227831" strokeOpacity="0.12" /></svg>
);

/** Big green number card («14 дней»). */
export function Stat({ big, unit, text, eyebrow }: { big: string; unit: string; text: string; eyebrow?: string }) {
  return (
    <div className={s.stat}>
      <Rings className={s.statRings} />
      {eyebrow && <span className={s.eyebrow}>{eyebrow}</span>}
      <b>{big} <span>{unit}</span></b>
      <span className={s.statText}>{text}</span>
    </div>
  );
}

export function Quote({ children }: { children: ReactNode }) {
  return <div className={s.quote}><span aria-hidden="true">“</span><b>{children}</b></div>;
}

/** Light-green call strip with an icon, text and a phone button. */
export function CallStrip({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <div className={s.strip}>
      <div className={s.stripText}><span className={s.stripIcon}><Icon name={icon} size={24} stroke={1.7} /></span><span><b>{title}</b><span>{text}</span></span></div>
      <a href={HELP_PHONE.href} className={s.btn}><Icon name="call" size={18} />{HELP_PHONE.label}</a>
    </div>
  );
}

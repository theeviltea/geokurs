import { useEffect, useRef, useState, type ReactNode } from 'react';
import { services } from '../../data/home';
import type { IconName } from '../../icons/icons';
import { Icon } from '../Icon';
import { SmartLink } from '../SmartLink';
import sv from '../Services.module.css';
import s from './ServiceBlocks.module.css';

/* Looping background motion for the hero art (same keyframes as the design canvas); off under reduced motion. */
const FX: Record<string, Keyframe[]> = {
  sweep: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
  pulse: [{ transform: 'scale(0.15)', opacity: 0, offset: 0 }, { opacity: 0.5, offset: 0.15 }, { transform: 'scale(1)', opacity: 0, offset: 1 }],
  breathe: [{ transform: 'scale(1)', opacity: 0.8 }, { transform: 'scale(1.18)', opacity: 1 }, { transform: 'scale(1)', opacity: 0.8 }],
  glow: [{ opacity: 0.45 }, { opacity: 1 }, { opacity: 0.45 }],
  dash: [{ strokeDashoffset: 0 }, { strokeDashoffset: -20 }],
  bar: [{ transform: 'scaleY(0.35)' }, { transform: 'scaleY(1)' }, { transform: 'scaleY(0.35)' }],
  slide180: [{ transform: 'translateX(0)' }, { transform: 'translateX(-180px)' }],
  slide240: [{ transform: 'translateX(0)' }, { transform: 'translateX(-240px)' }],
  slide320: [{ transform: 'translateX(0)' }, { transform: 'translateX(-320px)' }],
};

function useFx() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !root.animate) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const anims: Animation[] = [];
    root.querySelectorAll<SVGElement>('[data-fx]').forEach((el) => {
      const [name, dur, delay, easing] = (el.getAttribute('data-fx') || '').split(' ');
      if (FX[name]) anims.push(el.animate(FX[name], { duration: +dur, delay: +delay, easing, iterations: Infinity, fill: 'backwards' }));
    });
    return () => anims.forEach((a) => a.cancel());
  }, []);
  return ref;
}

/** Compact dark-green service banner with animated abstract art on the right. */
export function ServiceHero({ art, artClass, children }: { art: string; artClass: 'net' | 'dial' | 'wave'; children: ReactNode }) {
  const ref = useFx();
  return (
    <section className={s.hero}>
      <div ref={ref} aria-hidden="true" className={`${s.art} ${artClass === 'dial' ? s.artDial : s.artNet} ${artClass === 'wave' ? s.artWave : ''}`} dangerouslySetInnerHTML={{ __html: art }} />
      <div className={s.heroBody}>{children}</div>
    </section>
  );
}

export function Head({ title, lede, aside }: { title: string; lede?: string; aside?: ReactNode }) {
  return (
    <div className={s.head}>
      <div className={s.headText}><h2 className={s.h2}>{title}</h2>{lede && <p className={s.lede}>{lede}</p>}</div>
      {aside}
    </div>
  );
}

export type Step = { icon: IconName; title: string; text: string };

/** Numbered steps: a row of cards on desktop, a connected vertical list on phones. */
export function Steps({ title, lede, steps }: { title: string; lede?: string; steps: Step[] }) {
  return (
    <section className={s.block}>
      <Head title={title} lede={lede} />
      <ol className={s.steps}>
        {steps.map((st, i) => (
          <li key={st.title} className={s.step}>
            <span className={s.stepMark}>
              <span className={s.stepIcon}><Icon name={st.icon} size={20} stroke={1.9} /><b className="mobile-only">{i + 1}</b></span>
              <b className={`${s.stepNum} desktop-only`}>0{i + 1}</b>
            </span>
            <span className={s.stepText}><b>{st.title}</b><span>{st.text}</span></span>
            {i < steps.length - 1 && <span aria-hidden="true" className={s.stepArrow}><Icon name="chevronRight" size={14} stroke={2.2} /></span>}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState(-1);
  return (
    <section className={s.block}>
      <Head title="Частые вопросы" />
      <div className={s.faq}>
        {items.map(([q, a], i) => (
          <div key={q} className={s.faqItem}>
            <button type="button" aria-expanded={open === i} className={s.faqQ} onClick={() => setOpen(open === i ? -1 : i)}>
              {q}<span className={s.faqChevron}><Icon name="chevronRight" size={18} stroke={2} /></span>
            </button>
            {open === i && <p className={s.faqA}>{a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Dark closing call-to-action card. */
export function DarkCta({ title, text, actions, foot }: { title: string; text: string; actions: ReactNode; foot?: ReactNode }) {
  return (
    <section className={s.cta}>
      <svg aria-hidden="true" className={s.ctaRings} viewBox="0 0 420 420" fill="none"><circle cx="210" cy="210" r="200" stroke="#7BDB84" strokeOpacity="0.12" /><circle cx="210" cy="210" r="130" stroke="#7BDB84" strokeOpacity="0.12" /></svg>
      <div className={s.ctaRow}>
        <div className={s.ctaText}><h2>{title}</h2><p>{text}</p></div>
        <div className={s.ctaActions}>{actions}</div>
      </div>
      {foot && <div className={s.ctaFoot}>{foot}</div>}
    </section>
  );
}

/** «Другие сервисы»: the home-page service cards without the current page. */
export function OtherServices({ exclude }: { exclude: string }) {
  const list = services.filter((x) => x.name !== exclude);
  return (
    <section className={s.block}>
      <Head title="Другие сервисы" />
      <div className={`${sv.row} ${s.others} no-scrollbar`}>
        {list.map((x) => (
          <SmartLink key={x.name} href={x.href} className={sv.card}>
            <span className={sv.head}>
              <span className={sv.tile} aria-hidden="true"><Icon name={x.icon} size={22} stroke={1.6} /></span>
              <span className={sv.name}>{x.name}</span>
            </span>
            <span className={sv.text}>{x.text}</span>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}

export const WHATSAPP = '#';
const CONTACTS: [IconName, string, string][] = [['call', '+7 727 229 00 00', 'tel:+77272290000'], ['whatsapp', 'WhatsApp', '#'], ['mail', 'info@geokurs.kz', 'mailto:info@geokurs.kz']];

/** Light-green «Свяжитесь напрямую» card that sits next to a request form. */
export function ContactCard({ text }: { text: string }) {
  return (
    <div className={s.contact}>
      <svg aria-hidden="true" className={s.contactRings} viewBox="0 0 300 300" fill="none"><circle cx="150" cy="150" r="148" stroke="#227831" strokeOpacity="0.1" /><circle cx="150" cy="150" r="104" stroke="#227831" strokeOpacity="0.12" /><circle cx="150" cy="150" r="60" stroke="#227831" strokeOpacity="0.14" /><circle cx="58" cy="236" r="5" fill="#227831" fillOpacity="0.35" /><circle cx="40" cy="120" r="3.5" fill="#227831" fillOpacity="0.3" /></svg>
      <div className={s.contactTop}>
        <span className={s.contactBadge} aria-hidden="true"><Icon name="headset" size={34} stroke={1.7} /><i /></span>
        <div><b>Свяжитесь напрямую</b><span>{text}</span></div>
      </div>
      <div className={s.pills}>
        {CONTACTS.map(([icon, label, href]) => (
          <a key={label} href={href} className={s.pillLink}><span><Icon name={icon} size={18} /></span>{label}<Icon name="arrowRight" size={16} stroke={2} /></a>
        ))}
      </div>
    </div>
  );
}

/** Hero title with an icon tile (service centre, support). */
export function HeroTitle({ icon, title, lede, cta }: { icon: IconName; title: string; lede: string; cta: ReactNode }) {
  return (
    <>
      <div className={s.titleRow}>
        <span className={s.heroTile} aria-hidden="true"><Icon name={icon} size={30} stroke={1.8} /></span>
        <h1 className={s.h1}>{title}</h1>
      </div>
      <p className={s.heroLede}>{lede}</p>
      {cta}
    </>
  );
}
export const PHONE = { label: '+7 727 229 00 00', href: 'tel:+77272290000' };

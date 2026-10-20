import { useState } from 'react';
import { branches } from '../data/branches';
import { KZ_MAP } from '../data/kzMap';
import { Icon } from './Icon';
import s from './Branches.module.css';

const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, '')}`;

export function Branches() {
  const [active, setActive] = useState(0);
  const cur = branches[active];
  return (
    <section className={`container ${s.wrap}`} aria-labelledby="branches-title">
      <div className={s.head}>
        <h2 id="branches-title" className="h2">Филиалы</h2>
        <span className={s.sub}>7 офисов по Казахстану</span>
      </div>
      <div className={s.card}>
        <div className={s.side}>
          <div role="group" aria-label="Город" className={`${s.chips} no-scrollbar`}>
            {branches.map((b, i) => (
              <button key={b.city} type="button" aria-pressed={i === active} className={`${s.chip} ${i === active ? s.chipOn : ''}`} onClick={() => setActive(i)}>{b.city}</button>
            ))}
          </div>
          <div className={s.info}>
            <div className={s.cityRow}>
              <span className={s.city}>{cur.city}</span>
              {cur.tag && <span className={s.tag}>{cur.tag}</span>}
            </div>
            <span className={s.line}><Icon name="pin" size={18} color="var(--c-green-600)" />{cur.address}</span>
            {cur.phones.map((p) => (
              <a key={p} href={tel(p)} className={s.line}><Icon name="call" size={18} color="var(--c-green-600)" />{p}</a>
            ))}
            <a href={`mailto:${cur.email}`} className={s.line}><Icon name="mail" size={18} color="var(--c-green-600)" />{cur.email}</a>
            <a href="https://geokurs.kz/contacts" className={s.route}>Схема проезда <Icon name="arrowRight" size={16} stroke={2} /></a>
          </div>
        </div>
        <div className={s.mapCol}>
          <div className={s.map} style={{ aspectRatio: `${KZ_MAP.width} / ${KZ_MAP.height}` }}>
            <svg viewBox={`0 0 ${KZ_MAP.width} ${KZ_MAP.height}`} fill="none" aria-hidden="true">
              <path d={KZ_MAP.path} fill="var(--c-green-100)" stroke="var(--c-green-300)" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            {branches.map((b, i) => (
              <button
                key={b.city}
                type="button"
                aria-label={b.city}
                aria-pressed={i === active}
                className={`${s.pin} ${i === active ? s.pinOn : ''}`}
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
                onClick={() => setActive(i)}
              >
                <span className={s.pinDot} />
                {i === active && <span className={s.pinLabel}>{b.city}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

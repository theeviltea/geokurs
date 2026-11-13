import type { CSSProperties } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { PHONE } from '../data/nav';
import { hubServices, type HubService } from '../data/servicesHub';
import s from './ServicesPage.module.css';

const Glyph = ({ d, size, sw }: { d: string; size: number; sw: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);


const EXTRA = ['credit', 'delivery'];
const main = hubServices.filter((x) => !EXTRA.includes(x.key));
const extra = hubServices.filter((x) => EXTRA.includes(x.key));

function Tile({ sv, i }: { sv: HubService; i: number }) {
  return (
    <SmartLink href={sv.href ?? '#'} className={s.tile} style={{ '--i': i } as CSSProperties}>
      <span aria-hidden="true" className={s.big}>
        <span className={`${s.motion} ${s[`m_${sv.motion}`]}`} style={{ animationDelay: `${i * 0.3}s` }}><Glyph d={sv.d} size={150} sw={1.1} /></span>
      </span>
      <span className={s.top}>
        <span className={s.ic}><Glyph d={sv.d} size={28} sw={1.6} /></span>
        <span aria-hidden="true" className={s.go}><Icon name="arrowRight" size={18} stroke={2} /></span>
      </span>
      <span className={s.copy}>
        <b className={s.title}>{sv.title}</b>
        <span className={s.text}>{sv.text}</span>
      </span>
    </SmartLink>
  );
}

/** «Сервисы»: every GEOKURS service as a tile. Services without a page yet link nowhere. */
export function ServicesPage() {
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сервисы' }]} back={{ label: 'Главная', href: '/' }} />
      <div className={s.head}>
        <h1>Сервисы</h1>
        <p>Всё, что нужно прибору и вашей команде после покупки: от сети базовых станций и поверки до обучения, аренды и trade-in.</p>
      </div>

      <div className={s.grid}>
        {main.map((sv, i) => <Tile key={sv.key} sv={sv} i={i} />)}
      </div>

      <div className={s.extraHead}>
        <h2>Дополнительно</h2>
        <p>Условия покупки — подробнее в разделе «Как купить».</p>
      </div>
      <div className={s.grid}>
        {extra.map((sv, i) => <Tile key={sv.key} sv={sv} i={main.length + i} />)}
      </div>

      <section className={s.cta}>
        <svg aria-hidden="true" className={s.ctaRings} viewBox="0 0 320 320" fill="none"><circle cx="160" cy="160" r="158" stroke="#7BDB84" strokeOpacity="0.18" /><circle cx="160" cy="160" r="100" stroke="#7BDB84" strokeOpacity="0.18" /></svg>
        <span className={s.ctaCopy}>
          <b>Не нашли нужный сервис?</b>
          <span>Расскажите о задаче — подберём решение и подключим специалистов.</span>
        </span>
        <a href={PHONE.mainHref} className={s.ctaBtn}><Icon name="call" size={18} />{PHONE.main}</a>
      </section>
    </main>
  );
}

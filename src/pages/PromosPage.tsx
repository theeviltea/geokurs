import { useState, type FormEvent, type ReactNode } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { img } from '../data/images';
import s from './PromosPage.module.css';

function Chip({ children, tone, live = false }: { children: ReactNode; tone: 'mint' | 'ink' | 'paper' | 'white' | 'glass'; live?: boolean }) {
  return <span className={`${s.chip} ${s[`chip_${tone}`]}`}>{live && <span className={s.live} aria-hidden="true" />}{children}</span>;
}

const Go = ({ light = false, label }: { light?: boolean; label?: string }) =>
  label
    ? <span className={`${s.go} ${s.goLabel} ${light ? s.goLight : ''}`}>{label}<Icon name="arrowRight" size={16} stroke={2} /></span>
    : <span aria-hidden="true" className={`${s.go} ${light ? s.goLight : ''}`}><Icon name="arrowRight" size={18} stroke={2} /></span>;

/** «Акции»: all promotions as a bento grid; the kit promo has its own page. */
export function PromosPage() {
  const [subscribed, setSubscribed] = useState(false);
  const subscribe = (e: FormEvent) => { e.preventDefault(); setSubscribed(true); };
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Акции' }]} back={{ label: 'Главная', href: '/' }} />
      <div className={s.head}>
        <div className={s.headText}>
          <h1>Акции</h1>
          <p>Спецпредложения на оборудование, рассрочка и бонусы GEOKURS.</p>
        </div>
        <span className={s.count}><span className={s.liveGreen} aria-hidden="true" />6 действующих предложений</span>
      </div>

      <div className={s.grid}>
        <SmartLink href="/promo/baza-rover" className={`${s.tile} ${s.kit}`}>
          <span aria-hidden="true" className={s.kitGlow} />
          <svg aria-hidden="true" className={s.kitRings} viewBox="0 0 560 560" fill="none">
            <g className={s.ring}><circle cx="280" cy="280" r="270" stroke="#7BDB84" strokeOpacity="0.18" strokeDasharray="2 10" /><circle cx="280" cy="10" r="5" fill="#7BDB84" /></g>
            <g className={s.ring2}><circle cx="280" cy="280" r="190" stroke="#FFFFFF" strokeOpacity="0.1" /><circle cx="470" cy="280" r="4" fill="#FFFFFF" fillOpacity="0.6" /></g>
            <circle cx="280" cy="280" r="110" stroke="#7BDB84" strokeOpacity="0.22" />
          </svg>
          <img className={`${s.img} ${s.kitImg}`} src={img('promo-i73.webp')} alt="" />
          <span className={s.kitBody}>
            <Chip tone="glass">Акция · с 17 сентября</Chip>
            <span className={s.kitCopy}>
              <b className={s.kitTitle}>Комплект база + ровер</b>
              <span className={s.kitText}>Два приёмника GEOKURS CHCNAV i73+ — готовый комплект для RTK-съёмки по УКВ-радио.</span>
            </span>
            <span className={s.kitPrice}><b>4 100 000 ₸</b><Go light label="Подробнее" /></span>
          </span>
        </SmartLink>

        <SmartLink href="/help/credit" className={`${s.tile} ${s.inst}`}>
          <img className={`${s.img} ${s.instImg}`} src={img('p-s5.webp')} alt="" />
          <span className={s.body}>
            <Chip tone="ink" live>Только 5–8 ноября</Chip>
            <span className={s.instCopy}>
              <span className={s.instKicker}>Рассрочка</span>
              <b className={s.instBig}>0‑0‑24</b>
              <span className={s.instText}>0 ₸ первый взнос, 0% переплаты, 24 месяца</span>
            </span>
            <Go />
          </span>
        </SmartLink>

        <SmartLink href="/services/trade-in" className={`${s.tile} ${s.trade}`}>
          <img className={`${s.img} ${s.tradeImg}`} src={img('p-i73.webp')} alt="" />
          <span className={`${s.body} ${s.tradeBody}`}>
            <Chip tone="paper">Trade-in</Chip>
            <span className={s.copy}>
              <b className={s.title}>Обменяйте старый прибор на i73+</b>
              <span className={s.text}>Сдайте приёмник в зачёт стоимости нового.</span>
            </span>
          </span>
        </SmartLink>

        <SmartLink href="/help/delivery" className={`${s.tile} ${s.deliv}`}>
          <span className={s.body}>
            <Chip tone="white">Постоянно</Chip>
            <span className={s.copy}>
              <b className={`${s.title} ${s.titleDark}`}>Бесплатная доставка от 40 000 ₸</b>
              <span className={`${s.text} ${s.textInk}`}>Курьером по Казахстану — на следующий день после подтверждения.</span>
            </span>
            <span aria-hidden="true" className={s.road}><span className={s.truck}><Icon name="truck" size={22} stroke={1.8} /></span></span>
          </span>
        </SmartLink>

        <SmartLink href="/help/credit" className={`${s.tile} ${s.kaspi}`}>
          <span className={s.body}>
            <span className={s.kaspiTop}><Chip tone="paper">Физлицам</Chip><img src={img('kaspi-pay.png')} alt="Kaspi" /></span>
            <span className={s.copy}>
              <b className={s.title}>Купить в кредит через Kaspi Bank</b>
              <span className={s.text}>Товары с пометкой «Купить в кредит» — каталог постоянно пополняется.</span>
            </span>
            <span className={s.end}><Go /></span>
          </span>
        </SmartLink>

        <SmartLink href="/help/credit" className={`${s.tile} ${s.jur}`}>
          <svg aria-hidden="true" className={s.jurRings} viewBox="0 0 360 360" fill="none"><g className={s.ring}><circle cx="180" cy="180" r="170" stroke="#7BDB84" strokeOpacity="0.25" strokeDasharray="4 12" /></g><circle cx="180" cy="180" r="110" stroke="#FFFFFF" strokeOpacity="0.1" /></svg>
          <span className={`${s.body} ${s.jurBody}`}>
            <b className={s.jurBig}>0%</b>
            <span className={s.copy}>
              <Chip tone="glass">Юрлицам</Chip>
              <b className={s.title}>Рассрочка без процентов до 3 месяцев</b>
              <span className={`${s.text} ${s.textLight}`}>Для компаний: без переплаты, условия обсудим по телефону.</span>
            </span>
            <span className="desktop-only"><Go light /></span>
          </span>
        </SmartLink>

        <section className={`${s.tile} ${s.sub}`} aria-labelledby="promo-sub">
          <span className={s.body}>
            <span className={s.subIcon}><Icon name="mail" size={24} stroke={1.7} /></span>
            <span className={s.copy}>
              <b id="promo-sub" className={s.title}>Узнавайте об акциях первыми</b>
              <span className={s.text}>Раз в месяц — новые предложения и скидки, без спама.</span>
            </span>
            <form className={s.form} onSubmit={subscribe}>
              <label htmlFor="promo-mail" className="sr-only">E-mail</label>
              <input id="promo-mail" type="email" required autoComplete="email" placeholder="Ваш e-mail" disabled={subscribed} />
              <button type="submit" disabled={subscribed}>{subscribed ? 'Вы подписаны' : 'Подписаться'}</button>
            </form>
          </span>
        </section>
      </div>
    </main>
  );
}

import { useState, type FormEvent, type MouseEvent } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { PHONE } from '../data/nav';
import { img } from '../data/images';
import type { IconName } from '../icons/icons';
import s from './PromoPage.module.css';

const KIT = [
  { role: 'База', text: 'Ставится на известную точку и передаёт поправки роверу по УКВ‑радио.' },
  { role: 'Ровер', text: 'Работает на вехе с IMU‑компенсацией наклона до 60°.' },
];
const FACTS = [['1408', 'каналов в каждом приёмнике'], ['60°', 'наклон вехи без калибровки IMU'], ['24 ч', 'работы ровером от одного заряда'], ['10,5 ч', 'работы базой по УКВ'], ['IP67', 'защита от пыли и воды'], ['0,73 кг', 'вес приёмника']];
const TERMS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'calendar', title: 'Старт акции', text: '17 сентября 2026' },
  { icon: 'badge', title: 'Поверка', text: 'Перед отгрузкой, прибор готов к работе' },
  { icon: 'truck', title: 'Доставка', text: 'В любую точку Казахстана' },
  { icon: 'pin', title: 'Самовывоз', text: 'Алматы, Астана, Караганда, Костанай, Уральск, Атырау' },
];
const CITIES = ['Алматы', 'Астана', 'Караганда', 'Костанай', 'Уральск', 'Атырау', 'Другой город'];

export function PromoPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  const scrollToForm = (e: MouseEvent) => { e.preventDefault(); document.getElementById('promo-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (
    <main>
      <div className={`container ${s.top}`}>
        <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Акции', href: '/promo/baza-rover' }, { label: 'Комплект база + ровер' }]} back={{ label: 'Акции', href: '/' }} />
      </div>

      <section className={`container ${s.heroWrap}`}>
        <div className={s.hero}>
          <svg className={s.rings} viewBox="0 0 720 720" fill="none" aria-hidden="true">
            <circle cx="360" cy="360" r="350" stroke="#FFFFFF" strokeOpacity="0.08" />
            <circle cx="360" cy="360" r="250" stroke="#FFFFFF" strokeOpacity="0.08" />
            <circle cx="360" cy="360" r="150" stroke="#FFFFFF" strokeOpacity="0.08" />
            <path d="M360 0v720M0 360h720" stroke="#FFFFFF" strokeOpacity="0.06" />
          </svg>
          <span className={s.mark} aria-hidden="true">RTK</span>
          <img src={img('promo-i73.webp')} alt="GNSS-приёмник GEOKURS CHCNAV i73+" className={s.heroImg} />
          <div className={s.heroCopy}>
            <span className={s.eyebrow}>Акция · с 17 сентября 2026</span>
            <h1 className={s.h1}>Комплект база + ровер</h1>
            <p className={s.lede}>Два приёмника GEOKURS CHCNAV i73+: готовый комплект для RTK‑съёмки по УКВ‑радио.</p>
            <div className={s.price}>4 100 000 ₸</div>
            <div className={`${s.heroCtas} desktop-only`}>
              <a href="#promo-form" onClick={scrollToForm} className={s.primary}>Оставить заявку <Icon name="arrowRight" size={18} stroke={2} /></a>
              <a href={PHONE.mainHref} className={s.ghost}>{PHONE.main}</a>
            </div>
          </div>
        </div>
        <a href="#promo-form" onClick={scrollToForm} className={`${s.mobileCta} mobile-only`}>Оставить заявку <Icon name="arrowRight" size={18} stroke={2} /></a>
      </section>

      <section className={`container ${s.block}`}>
        <h2 className={`h2 ${s.h2}`}>Что входит в комплект</h2>
        <div className={s.kit}>
          {KIT.map((k) => (
            <SmartLink key={k.role} href="/product/geokurs-chcnav-i73" className={s.kitCard}>
              <span className={s.kitPic}><img src={img('p-i73.webp')} alt="GNSS‑приёмник GEOKURS CHCNAV i73+" /><span className={s.role}>{k.role}</span></span>
              <span className={s.kitText}><b>GNSS‑приёмник GEOKURS CHCNAV i73+</b><small>{k.text}</small></span>
            </SmartLink>
          ))}
          <div className={s.extra}>
            <b>К каждому приёмнику</b>
            <ul>
              {['УКВ‑антенна 410–470 МГц', 'Кабель USB Type‑C', 'Работа с полевым ПО CHCNAV LandStar'].map((x) => <li key={x}><Icon name="check" size={20} stroke={2} />{x}</li>)}
            </ul>
            <small>Полную комплектацию менеджер подтвердит при оформлении заказа.</small>
          </div>
        </div>
      </section>

      <section className={`container ${s.block}`}>
        <div className={s.factsCard}>
          <h2 className={`h2 ${s.h2}`}>Почему этот комплект</h2>
          <dl className={s.facts}>
            {FACTS.map(([big, small]) => <div key={big}><dt>{small}</dt><dd>{big}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className={`container ${s.block}`}>
        <h2 className={`h2 ${s.h2}`}>Условия</h2>
        <div className={s.terms}>
          {TERMS.map((t) => (
            <div key={t.title} className={s.term}>
              <span className={s.termIcon} aria-hidden="true"><Icon name={t.icon} size={22} stroke={1.6} /></span>
              <span className={s.termText}><b>{t.title}</b><small>{t.text}</small></span>
            </div>
          ))}
        </div>
      </section>

      <section id="promo-form" className={`container ${s.formWrap}`}>
        <div className={s.formCard}>
          <svg className={s.formRings} viewBox="0 0 520 520" fill="none" aria-hidden="true"><circle cx="260" cy="260" r="250" stroke="#FFFFFF" strokeOpacity="0.08" /><circle cx="260" cy="260" r="170" stroke="#FFFFFF" strokeOpacity="0.08" /></svg>
          <div className={s.formCopy}>
            <h2 className={s.formTitle}>Заявка на комплект</h2>
            <p>Оставьте контакты: подтвердим наличие, комплектацию и сроки.</p>
          </div>
          <form className={s.form} onSubmit={submit}>
            <label htmlFor="promo-name">Имя<input id="promo-name" type="text" autoComplete="name" placeholder="Как к вам обращаться" /></label>
            <label htmlFor="promo-phone">Телефон<input id="promo-phone" type="tel" autoComplete="tel" placeholder="+7 ___ ___ __ __" /></label>
            <label htmlFor="promo-city" className={s.selectLabel}>Город
              <select id="promo-city" defaultValue={CITIES[0]}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
              <Icon name="chevronDown" size={16} stroke={2} className={s.chev} />
            </label>
            <div className={s.formFoot}>
              <button type="submit" className={s.submit}>{sent ? 'Заявка отправлена' : 'Отправить заявку'}</button>
              <span>Менеджер перезвонит и уточнит детали заказа.</span>
            </div>
          </form>
        </div>
      </section>

      <section className={s.sheet}>
        <div className={`container ${s.sheetWrap}`}>
          <h2 className={`h2 ${s.h2}`}>Другие акции</h2>
          <div className={s.others}>
            <a href="#" className={`${s.other} ${s.otherGreen}`}>
              <span className={s.otherEyebrow}>Рассрочка</span>
              <span className={s.otherCopy}><span className={s.big}>0‑0‑24</span><span className={s.otherNote}>0 ₸ первый взнос, 0% переплаты, 24 месяца</span></span>
              <img src={img('p-s5.webp')} alt="" className={s.otherS5} />
            </a>
            <a href="https://geokurs.kz/services/trade-in" className={`${s.other} ${s.otherWhite}`}>
              <span className={s.otherEyebrow}>Trade-in</span>
              <span className={s.otherCopy}><span className={s.otherTitle}>Обменяйте старый прибор на i73+</span><span className={`${s.otherNote} desktop-only`}>Сдайте приёмник в зачёт стоимости нового.</span></span>
              <img src={img('p-i73.webp')} alt="" className={s.otherI73} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

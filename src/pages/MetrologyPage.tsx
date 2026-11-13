import { useState, type FormEvent } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Field } from '../components/Field';
import f from '../components/Field.module.css';
import { Icon } from '../components/Icon';
import { LEVEL_SVG } from '../components/services/art';
import { ContactCard, DarkCta, Faq, Head, HeroTitle, OtherServices, PHONE, ServiceHero, Steps, WHATSAPP } from '../components/services/ServiceBlocks';
import b from '../components/services/ServiceBlocks.module.css';
import { img } from '../data/images';
import { calibDevices, calibPrices, calibStats, calibTrust, mtFaq, mtSteps } from '../data/services';
import s from './Service.module.css';

export function MetrologyPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сервисы', href: '/services' }, { label: 'Метрология' }]} back={{ label: 'Главная', href: '/' }} />

      <ServiceHero art={LEVEL_SVG} artClass="level" auto>
        <HeroTitle icon="gauge" title="Поверочная лаборатория" nowrap
          lede="Поверка и калибровка геодезических приборов в аккредитованной лаборатории. Сертификат, который принимают госорганы РК."
          cta={<a href="#calibration-form" className={s.heroBtn}><Icon name="send" size={18} />Записать прибор на поверку</a>} />
      </ServiceHero>

      <section className={s.stats} aria-label="GEOKURS в цифрах">
        {calibStats.map(([n, t]) => <div key={t}><b>{n}</b><span>{t}</span></div>)}
      </section>

      <section className={b.block}>
        <Head title="Какие приборы поверяем" />
        <ul className={s.chips}>{calibDevices.map((d) => <li key={d}>{d}</li>)}</ul>
      </section>

      <section className={b.block}>
        <Head title="Сроки и цены" />
        <div className={s.prices} role="table" aria-label="Сроки и цены поверки">
          <div role="row" className={`${s.pRow} ${s.pHead} desktop-only`}>
            <span role="columnheader">Услуга</span><span role="columnheader">Стандартный срок</span><span role="columnheader">Цена</span><span role="columnheader">Срочный срок</span><span role="columnheader">Цена</span>
          </div>
          {calibPrices.map(([name, std, fast]) => (
            <div role="row" key={name} className={s.pRow}>
              <span role="cell" className={s.pName}>{name}</span>
              <span role="cell" className={`${s.pMuted} desktop-only`}>до 5 дней</span>
              <b role="cell" className={`${s.pPrice} desktop-only`}>{std}</b>
              <span role="cell" className={`${s.pMuted} ${s.pFast} desktop-only`}><Icon name="zap" size={14} stroke={2} />до 3 дней</span>
              <b role="cell" className={`${s.pPrice} ${s.pGreen} desktop-only`}>{fast}</b>
              <span className={`${s.pTiles} mobile-only`}>
                <span><span>Стандарт · до 5 дней</span><b>{std}</b></span>
                <span className={s.pTileFast}><span>Срочно · до 3 дней</span><b>{fast}</b></span>
              </span>
            </div>
          ))}
        </div>
        <span className={s.note}>Цены ориентировочные. Точная стоимость зависит от модели, года выпуска и объёма работ.</span>
      </section>

      <section className={b.block}>
        <Head title="Почему нам доверяют" />
        <div className={s.why}>
          <div className={s.whyCard}>
            <svg aria-hidden="true" className={s.whyRings} viewBox="0 0 380 380" fill="none"><circle cx="190" cy="190" r="188" stroke="#FFFFFF" strokeOpacity="0.1" /><circle cx="190" cy="190" r="130" stroke="#FFFFFF" strokeOpacity="0.1" /><circle cx="190" cy="190" r="72" stroke="#FFFFFF" strokeOpacity="0.1" /></svg>
            <span className={s.gost}><Icon name="shield" size={14} stroke={2} />ГОСТ ISO/IEC 17025-2019</span>
            <b>Аккредитованная поверочная лаборатория</b>
            <div className={s.cert} aria-hidden="true">
              <span className={s.certTop}><img src={img('logo-green.png')} alt="" /><span>№ 0000-25</span></span>
              <b>Сертификат о поверке</b>
              <span className={s.certLines}><i style={{ width: '90%' }} /><i style={{ width: '72%' }} /><i style={{ width: '84%' }} /><i style={{ width: '60%' }} /></span>
              <span className={s.certFoot}><span><i />подпись поверителя</span><span className={s.seal}><Icon name="shield" size={24} stroke={1.8} /></span></span>
            </div>
          </div>
          <ul className={s.whyList}>
            {calibTrust.map((x) => <li key={x.text}><span><Icon name={x.icon} size={22} stroke={1.7} /></span>{x.text}</li>)}
          </ul>
        </div>
      </section>

      <Steps title="Как это работает" steps={mtSteps} />

      <section className={s.formRow}>
        <form id="calibration-form" className={s.form} onSubmit={submit}>
          <div className={s.formHead}><h2 className={b.h2}>Заявка на поверку</h2><span>Ответим в течение часа в рабочее время.</span></div>
          {sent ? (
            <div className={s.sent} role="status"><span><Icon name="check" size={26} stroke={2.2} /></span><b>Заявка отправлена</b><span>Мы свяжемся с вами в ближайшее рабочее время.</span></div>
          ) : (
            <>
              <div className={s.two}>
                <Field label="Ваше имя" placeholder="Как к вам обращаться" autoComplete="name" required />
                <Field label="Телефон" type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" required />
              </div>
              <div className={s.two}>
                <div className={f.field}>
                  <span className={f.head}><label htmlFor="calib-kind">Тип прибора</label></span>
                  <span className={`${f.box} ${s.selectBox}`}>
                    <select id="calib-kind" className={f.input} defaultValue="">
                      <option value="" disabled>Выберите тип</option>
                      {calibDevices.map((d) => <option key={d}>{d}</option>)}
                    </select>
                    <Icon name="chevronDown" size={18} stroke={2} className={s.selectChevron} />
                  </span>
                </div>
                <Field label="Модель" placeholder="Например, Trimble S7" />
              </div>
              <div className={f.field}>
                <span className={f.head}><label htmlFor="calib-text">Комментарий <span className={s.optional}>· необязательно</span></label></span>
                <textarea id="calib-text" rows={3} className={`${f.input} ${s.textarea}`} placeholder="Количество приборов, срочность, город" />
              </div>
              <button type="submit" className={s.submit}>Отправить заявку</button>
              <span className={s.consent}>Нажимая «Отправить заявку», вы соглашаетесь на обработку персональных данных.</span>
            </>
          )}
        </form>
        <ContactCard text="Инженеры и менеджеры GEOKURS ответят на вопросы о поверке, сроках и документах." />
      </section>

      <Faq items={mtFaq} />
      <DarkCta
        title="Остались вопросы?"
        text="Позвоните или напишите — ответим быстро."
        actions={<>
          <a href={PHONE.href} className={b.btnGreen}><Icon name="call" size={18} />Позвонить</a>
          <a href={WHATSAPP} className={b.btnGhost}><Icon name="whatsapp" size={18} />WhatsApp</a>
        </>}
      />
      <OtherServices exclude="Метрология" />
    </main>
  );
}

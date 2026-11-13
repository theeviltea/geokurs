import { useState, type FormEvent } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Field } from '../components/Field';
import f from '../components/Field.module.css';
import { Icon } from '../components/Icon';
import { DIAL_SVG } from '../components/services/art';
import { ContactCard, DarkCta, Faq, Head, HeroTitle, OtherServices, PHONE, ServiceHero, Steps, WHATSAPP } from '../components/services/ServiceBlocks';
import b from '../components/services/ServiceBlocks.module.css';
import { repairKinds, scFaq, scSteps } from '../data/services';
import s from './Service.module.css';

export function ServiceCenterPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сервисы', href: '/services' }, { label: 'Сервисный центр' }]} back={{ label: 'Главная', href: '/' }} />

      <ServiceHero art={DIAL_SVG} artClass="dial">
        <HeroTitle icon="wrench" title="Сервисный центр" lede="Ремонт, диагностика и настройка геодезического оборудования. Бесплатная диагностика, гарантия 6 месяцев." cta={<a href="#repair-form" className={s.heroBtn}><Icon name="send" size={18} />Оставить заявку на ремонт</a>} />
      </ServiceHero>

      <section className={b.block}>
        <Head title="Что ремонтируем" />
        <div className={`${s.kinds} no-scrollbar`}>
          {repairKinds.map((k) => (
            <div key={k.name} className={s.kind}><span><Icon name={k.icon} size={22} stroke={1.7} /></span><b>{k.name}</b></div>
          ))}
        </div>
        <div className={s.trust}>
          <div className={s.trustDark}>
            <svg aria-hidden="true" className={s.trustRings} viewBox="0 0 260 260" fill="none"><circle cx="130" cy="130" r="128" stroke="#FFFFFF" strokeOpacity="0.12" /><circle cx="130" cy="130" r="80" stroke="#FFFFFF" strokeOpacity="0.12" /></svg>
            <span className={s.trustIcon}><Icon name="shield" size={24} stroke={1.8} /></span>
            <span><span className={s.eyebrow}>Сертификация</span><b>Авторизованный сервис Trimble</b></span>
          </div>
          <div className={s.trustLight}>
            <span className={s.trustIcon}><Icon name="check" size={24} stroke={2.2} /></span>
            <span><span className={s.eyebrow}>Гарантия 6 месяцев</span><span>На все выполненные работы и установленные запчасти.</span></span>
          </div>
        </div>
      </section>

      <Steps title="Как это работает" steps={scSteps} />

      <section className={s.formRow}>
        <form id="repair-form" className={s.form} onSubmit={submit}>
          <div className={s.formHead}><h2 className={b.h2}>Заявка на ремонт</h2><span>Ответим в течение часа в рабочее время.</span></div>
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
                  <span className={f.head}><label htmlFor="repair-kind">Тип прибора</label></span>
                  <span className={`${f.box} ${s.selectBox}`}>
                    <select id="repair-kind" className={f.input} defaultValue="">
                      <option value="" disabled>Выберите тип</option>
                      {repairKinds.map((k) => <option key={k.name}>{k.name}</option>)}
                      <option>Другое</option>
                    </select>
                    <Icon name="chevronDown" size={18} stroke={2} className={s.selectChevron} />
                  </span>
                </div>
                <Field label="Модель" placeholder="Например, Trimble S7" />
              </div>
              <div className={f.field}>
                <span className={f.head}><label htmlFor="repair-text">Опишите неисправность</label></span>
                <textarea id="repair-text" rows={4} className={`${f.input} ${s.textarea}`} placeholder="Что случилось с прибором" />
              </div>
              <button type="submit" className={s.submit}>Отправить заявку</button>
              <span className={s.consent}>Нажимая «Отправить заявку», вы соглашаетесь на обработку персональных данных.</span>
            </>
          )}
        </form>
        <ContactCard text="Инженеры и менеджеры GEOKURS ответят на ваши вопросы о ремонте и сроках." />
      </section>

      <Faq items={scFaq} />
      <DarkCta
        title="Остались вопросы?"
        text="Позвоните или напишите — ответим быстро."
        actions={<>
          <a href={PHONE.href} className={b.btnGreen}><Icon name="call" size={18} />Позвонить</a>
          <a href={WHATSAPP} className={b.btnGhost}><Icon name="whatsapp" size={18} />WhatsApp</a>
        </>}
      />
      <OtherServices exclude="Сервисный центр" />
    </main>
  );
}

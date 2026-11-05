import { useState, type FormEvent } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Field } from '../components/Field';
import f from '../components/Field.module.css';
import { Icon } from '../components/Icon';
import { WAVE_SVG } from '../components/services/art';
import { ContactCard, DarkCta, Faq, Head, HeroTitle, OtherServices, PHONE, ServiceHero, Steps, WHATSAPP } from '../components/services/ServiceBlocks';
import b from '../components/services/ServiceBlocks.module.css';
import { spFaq, spSteps, supportFormats } from '../data/services';
import s from './Service.module.css';

const Optional = () => <span className={s.optional}>· необязательно</span>;

export function SupportPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сервисы' }, { label: 'Техническая поддержка' }]} back={{ label: 'Главная', href: '/' }} />

      <ServiceHero art={WAVE_SVG} artClass="wave">
        <HeroTitle icon="headset" title="Техническая поддержка" lede="Поможем с приборами и ПО: по телефону, в WhatsApp, удалённо или с выездом инженера." cta={<a href="#support-form" className={s.heroBtn}><Icon name="send" size={18} />Написать в поддержку</a>} />
      </ServiceHero>

      <section className={b.block}>
        <Head title="Форматы поддержки" />
        <div className={s.formats}>
          {supportFormats.map((x) => (
            <div key={x.title} className={s.format}><span><Icon name={x.icon} size={22} stroke={1.7} /></span><span><b>{x.title}</b><span>{x.text}</span></span></div>
          ))}
        </div>
      </section>

      <Steps title="Как это работает" steps={spSteps} />

      <section className={s.formRow}>
        <form id="support-form" className={s.form} onSubmit={submit}>
          <div className={s.formHead}><h2 className={b.h2}>Запрос в поддержку</h2><span>Ответим в течение часа в рабочее время.</span></div>
          {sent ? (
            <div className={s.sent} role="status"><span><Icon name="check" size={26} stroke={2.2} /></span><b>Запрос отправлен</b><span>Инженер свяжется с вами в течение часа в рабочее время.</span></div>
          ) : (
            <>
              <div className={s.two}>
                <Field label="Ваше имя" placeholder="Как к вам обращаться" autoComplete="name" required />
                <Field label="Телефон" type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" required />
              </div>
              <div className={f.field}>
                <span className={f.head}><label htmlFor="support-email">E-mail <Optional /></label></span>
                <input id="support-email" type="email" className={f.input} placeholder="name@company.kz" autoComplete="email" />
              </div>
              <div className={f.field}>
                <span className={f.head}><label htmlFor="support-text">Комментарий <Optional /></label></span>
                <textarea id="support-text" rows={4} className={`${f.input} ${s.textarea}`} placeholder="Опишите вопрос, модель прибора или ПО" />
              </div>
              <button type="submit" className={s.submit}>Отправить заявку</button>
              <span className={s.consent}>Нажимая «Отправить заявку», вы соглашаетесь на обработку персональных данных.</span>
            </>
          )}
        </form>
        <ContactCard text="Инженеры и менеджеры GEOKURS помогут с настройкой приборов и ПО." />
      </section>

      <Faq items={spFaq} />
      <DarkCta
        title="Остались вопросы?"
        text="Позвоните или напишите — ответим быстро."
        actions={<>
          <a href={PHONE.href} className={b.btnGreen}><Icon name="call" size={18} />Позвонить</a>
          <a href={WHATSAPP} className={b.btnGhost}><Icon name="whatsapp" size={18} />WhatsApp</a>
        </>}
      />
      <OtherServices exclude="Техподдержка 24/7" />
    </main>
  );
}

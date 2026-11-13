import { useState, type FormEvent, type ReactNode } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Field } from '../components/Field';
import f from '../components/Field.module.css';
import { Icon } from '../components/Icon';
import { DIAL_SVG } from '../components/services/art';
import { ContactCard, DarkCta, Faq, Head, HeroTitle, OtherServices, PHONE, ServiceHero, Steps, WHATSAPP } from '../components/services/ServiceBlocks';
import b from '../components/services/ServiceBlocks.module.css';
import {
  daysLabel, demoBenefits, demoPhotos, demoSteps, eduAbout, eduCourses, eduFaq, eduFree, eduPhotos, kitsLabel, rentCats, rentDocs, rentFaq, rentSteps,
  pilotGains, pilotPhotos, pilotSteps, tiAccept, tiFaq, tiKinds, tiPhotos, tiSteps,
} from '../data/serviceExtras';
import type { IconName } from '../icons/icons';
import s from './Service.module.css';
import x from './ServiceExtra.module.css';

/* ---------- shared pieces ---------- */
function Crumb({ label }: { label: string }) {
  return <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сервисы', href: '/services' }, { label }]} back={{ label: 'Сервисы', href: '/services' }} />;
}

function Hero({ icon, title, lede, cta, href, nowrap = false }: { icon: IconName; title: string; lede: string; cta: string; href: string; nowrap?: boolean }) {
  return (
    <ServiceHero art={DIAL_SVG} artClass="dial" auto>
      <HeroTitle icon={icon} title={title} nowrap={nowrap} lede={lede} cta={<a href={href} className={s.heroBtn}><Icon name="send" size={18} />{cta}</a>} />
    </ServiceHero>
  );
}

function Features({ items, cols }: { items: { icon: IconName; title: string; text: string }[]; cols: number }) {
  return (
    <div className={x.features} style={{ ['--cols' as string]: cols }}>
      {items.map((it) => (
        <div key={it.title} className={x.feature}>
          <span className={x.featureIcon}><Icon name={it.icon} size={24} stroke={1.7} /></span>
          <span className={x.featureText}><b>{it.title}</b><span>{it.text}</span></span>
        </div>
      ))}
    </div>
  );
}

function Duo({ dark, light }: { dark: { icon: IconName; eyebrow: string; text: string }; light: { icon: IconName; eyebrow: string; text: string } }) {
  return (
    <div className={s.trust}>
      <div className={s.trustDark}>
        <svg aria-hidden="true" className={s.trustRings} viewBox="0 0 260 260" fill="none"><circle cx="130" cy="130" r="128" stroke="#FFFFFF" strokeOpacity="0.12" /><circle cx="130" cy="130" r="80" stroke="#FFFFFF" strokeOpacity="0.12" /></svg>
        <span className={s.trustIcon}><Icon name={dark.icon} size={24} stroke={1.8} /></span>
        <span><span className={s.eyebrow}>{dark.eyebrow}</span><span className={x.duoText}>{dark.text}</span></span>
      </div>
      <div className={s.trustLight}>
        <span className={s.trustIcon}><Icon name={light.icon} size={24} stroke={1.8} /></span>
        <span><span className={s.eyebrow}>{light.eyebrow}</span><span>{light.text}</span></span>
      </div>
    </div>
  );
}

function Photos({ title, items }: { title: string; items: { src: string; alt: string }[] }) {
  return (
    <section className={b.block}>
      <Head title={title} />
      <div className={`${x.photos} no-scrollbar`}>
        {items.map((p) => <img key={p.src} src={p.src} alt={p.alt} />)}
      </div>
    </section>
  );
}

function Select({ id, label, placeholder, options }: { id: string; label: string; placeholder: string; options: string[] }) {
  return (
    <div className={f.field}>
      <span className={f.head}><label htmlFor={id}>{label}</label></span>
      <span className={`${f.box} ${s.selectBox}`}>
        <select id={id} className={f.input} defaultValue="">
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <Icon name="chevronDown" size={18} stroke={2} className={s.selectChevron} />
      </span>
    </div>
  );
}

function Seg({ label, options, initial = 0 }: { label: string; options: string[]; initial?: number }) {
  const [on, setOn] = useState(initial);
  return (
    <div className={f.field}>
      <span className={f.head}><span>{label}</span></span>
      <span className={x.seg} role="radiogroup" aria-label={label}>
        {options.map((o, i) => (
          <button key={o} type="button" role="radio" aria-checked={on === i} className={on === i ? x.segOn : ''} onClick={() => setOn(i)}>{o}</button>
        ))}
      </span>
    </div>
  );
}

export function RequestForm({ id, title, lede, contact, children }: { id: string; title: string; lede: string; contact: string; children: ReactNode }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <section className={s.formRow}>
      <form id={id} className={s.form} onSubmit={submit}>
        <div className={s.formHead}><h2 className={b.h2}>{title}</h2><span>{lede}</span></div>
        {sent ? (
          <div className={s.sent} role="status"><span><Icon name="check" size={26} stroke={2.2} /></span><b>Заявка отправлена</b><span>Мы свяжемся с вами в ближайшее рабочее время.</span></div>
        ) : (
          <>
            {children}
            <button type="submit" className={s.submit}>Отправить заявку</button>
            <span className={s.consent}>Нажимая «Отправить заявку», вы даёте согласие на обработку персональных данных в соответствии с Законом РК «О персональных данных и их защите».</span>
          </>
        )}
      </form>
      <ContactCard text={contact} />
    </section>
  );
}

export function Closing({ exclude }: { exclude: string }) {
  return (
    <>
      <DarkCta
        title="Остались вопросы?"
        text="Позвоните или напишите — ответим быстро."
        actions={<>
          <a href={PHONE.href} className={b.btnGreen}><Icon name="call" size={18} />Позвонить</a>
          <a href={WHATSAPP} className={b.btnGhost}><Icon name="whatsapp" size={18} />WhatsApp</a>
        </>}
      />
      <OtherServices exclude={exclude} />
    </>
  );
}

/* ---------- Trade-in ---------- */
export function TradeInPage() {
  return (
    <main className={`container ${s.page}`}>
      <Crumb label="Trade-in" />
      <Hero icon="swap" title="Trade-in" href="#tradein-form" cta="Запросить консультацию"
        lede="Обменяйте старый геодезический прибор на новый с доплатой — его стоимость пойдёт в зачёт любого прибора, купленного в GEOKURS." />

      <section className={b.block}>
        <Head title="В зачёт принимаем" lede="Зачтём стоимость вашего устаревшего оборудования в стоимость любого нового прибора из нашего каталога." />
        <Features items={tiAccept} cols={3} />
        <Duo dark={{ icon: 'box', eyebrow: 'Не просто акция', text: 'Нам действительно нужны эти приборы — они идут на запчасти для ремонта других инструментов.' }}
          light={{ icon: 'museum', eyebrow: 'Музей GEOKURS', text: 'Очень старые приборы мы не разбираем, а храним в нашем музее.' }} />
      </section>

      <Steps title="Как проходит обмен" steps={tiSteps} />
      <Photos title="Trade-in в GEOKURS" items={tiPhotos} />

      <RequestForm id="tradein-form" title="Запрос консультации по Trade-in" lede="Заполните форму — специалист свяжется с вами, оценит прибор и подберёт новый."
        contact="Менеджеры GEOKURS расскажут об условиях Trade-in и запишут на оценку прибора.">
        <div className={s.two}>
          <Field label="Ваше имя" placeholder="Как к вам обращаться" autoComplete="name" required />
          <Field label="Город" placeholder="Например, Алматы" autoComplete="address-level2" required />
        </div>
        <div className={s.two}>
          <Field label="Телефон" type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" required />
          <Field label="Электронная почта" type="email" placeholder="name@company.kz" autoComplete="email" required />
        </div>
        <div className={s.two}>
          <Select id="ti-kind" label="Оборудование для Trade-in" placeholder="Выберите тип прибора" options={tiKinds} />
          <Field label="Модель прибора" placeholder="Например, Trimble M3" />
        </div>
      </RequestForm>

      <Faq items={tiFaq} />
      <Closing exclude="Trade-in" />
    </main>
  );
}

/* ---------- Аренда ---------- */
export function RentPage() {
  return (
    <main className={`container ${s.page}`}>
      <Crumb label="Аренда оборудования" />
      <Hero icon="calendar" title="Аренда оборудования" href="#rent-form" cta="Оформить заявку на аренду"
        lede="Комплекты оборудования для разовых геодезических задач. Все приборы поверены и регулярно обслуживаются в сервисном центре GEOKURS." />

      <Steps title="Три простых шага" lede="Аренда выгодна, когда нужно выполнить разовые работы, а покупать прибор ради них экономически нецелесообразно." steps={rentSteps} />

      <section className={b.block}>
        <Head title="Документы для аренды" />
        <div className={x.docs}>
          {rentDocs.map((d) => (
            <div key={d.title} className={`${x.doc} ${d.dark ? x.docDark : ''}`}>
              {d.dark && <svg aria-hidden="true" className={x.docRings} viewBox="0 0 300 300" fill="none"><circle cx="150" cy="150" r="148" stroke="#FFFFFF" strokeOpacity="0.12" /><circle cx="150" cy="150" r="96" stroke="#FFFFFF" strokeOpacity="0.12" /></svg>}
              <span className={x.docHead}>
                <span className={x.docIcon}><Icon name={d.icon} size={24} stroke={1.8} /></span>
                <span><span className={s.eyebrow}>{d.kicker}</span><b>{d.title}</b></span>
              </span>
              <ul className={x.checks}>{d.items.map((t) => <li key={t}><span><Icon name="check" size={12} stroke={2.6} /></span>{t}</li>)}</ul>
              <span className={x.docNote}>{d.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={b.block}>
        <Head title="Условия аренды" />
        <div className={x.terms}>
          <div className={x.term}>
            <span className={x.featureIcon}><Icon name="box" size={22} stroke={1.8} /></span>
            <span className={x.featureText}><b>Только приборы</b><span>В аренду GEOKURS предоставляет сами приборы — комплект согласуем при заявке.</span></span>
          </div>
          <div className={x.term}>
            <span className={x.featureIcon}><Icon name="play" size={22} stroke={1.8} /></span>
            <span className={x.featureText}><b>Вводный курс 30 минут</b><span>При выдаче прибора техподдержка проведёт короткое знакомство с ним.</span></span>
          </div>
          <div className={`${x.term} ${x.termDark}`}>
            <svg aria-hidden="true" className={x.docRings} viewBox="0 0 300 300" fill="none"><circle cx="150" cy="150" r="148" stroke="#7BDB84" strokeOpacity="0.16" /><circle cx="150" cy="150" r="96" stroke="#7BDB84" strokeOpacity="0.16" /></svg>
            <span className={x.featureIcon}><Icon name="headset" size={22} stroke={1.8} /></span>
            <span className={x.featureText}><b>Поддержка во время аренды</b><span>Если в процессе работы появятся вопросы, техподдержка поможет — это платная услуга.</span></span>
            <span className={x.prices}><span><b>20 000 ₸</b>до 1 часа</span><span><b>200 000 ₸</b>на 1 год</span></span>
          </div>
        </div>
      </section>

      <section className={b.block}>
        <Head title="Выберите категорию прибора" lede="Цены указаны за сутки аренды без НДС. Состав комплекта уточним при оформлении заявки." />
        <div className={x.cats}>
          {rentCats.map((c) => (
            <a key={c.name} href="#rent-form" className={x.cat}>
              <span className={x.catPic}>
                <img src={c.image} alt="" />
                <span className={x.catKits}><i />{kitsLabel(c.kits)}</span>
              </span>
              <span className={x.catFoot}>
                <span><b>{c.name}</b><span>от <b>{c.price} ₸</b><span className="desktop-only"> в сутки, без НДС</span><span className="mobile-only"> / сутки</span></span></span>
                <span aria-hidden="true" className={x.catGo}><Icon name="arrowRight" size={18} stroke={2} /></span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <RequestForm id="rent-form" title="Заявка на аренду" lede="Менеджер подтвердит наличие комплекта и подготовит договор."
        contact="Расскажем о наличии комплектов, залоге и условиях договора.">
        <Seg label="Арендатор" options={['Юрлицо', 'Физлицо / ИП']} />
        <div className={s.two}>
          <Field label="Ваше имя" placeholder="Как к вам обращаться" autoComplete="name" required />
          <Field label="Телефон" type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" required />
        </div>
        <div className={s.two}>
          <Select id="rent-cat" label="Категория прибора" placeholder="Выберите категорию" options={rentCats.map((c) => c.name)} />
          <Field label="Срок аренды" placeholder="Например, 10 дней" />
        </div>
        <div className={f.field}>
          <span className={f.head}><label htmlFor="rent-text">Комментарий</label></span>
          <textarea id="rent-text" rows={3} className={`${f.input} ${s.textarea}`} placeholder="Модель прибора, даты, объект" />
        </div>
      </RequestForm>

      <Faq items={rentFaq} />
      <Closing exclude="Аренда оборудования" />
    </main>
  );
}

/* ---------- Обучение ---------- */
export function EducationPage() {
  const [tab, setTab] = useState(0);
  const cur = eduCourses[tab];
  return (
    <main className={`container ${s.page}`}>
      <Crumb label="Обучение" />
      <Hero icon="cap" title="Обучение" href="#edu-form" cta="Записаться на обучение"
        lede="Курсы повышения квалификации в сфере топографо-геодезических и маркшейдерских работ — в учебном центре GEOKURS или на объекте заказчика." />

      <section className={b.block}>
        <Head title="Об обучении" lede="Специалисты GEOKURS работают с нашим оборудованием и ПО практически во всех областях и помогут освоить приобретаемые или уже имеющиеся приборы." />
        <Features items={eduAbout} cols={4} />
        <div className={x.free}>
          <svg aria-hidden="true" className={x.freeRings} viewBox="0 0 420 420" fill="none"><circle cx="210" cy="210" r="208" stroke="#FFFFFF" strokeOpacity="0.1" /><circle cx="210" cy="210" r="140" stroke="#FFFFFF" strokeOpacity="0.1" /></svg>
          <div className={x.freeHead}>
            <span className={x.freeIcon}><Icon name="gift" size={26} stroke={1.8} /></span>
            <b>Бесплатно при покупке оборудования</b>
            <span>Купили прибор в GEOKURS — научим с ним работать без дополнительной оплаты.</span>
          </div>
          <ul className={`${x.checks} ${x.freeList}`}>{eduFree.map((t) => <li key={t}><span><Icon name="check" size={12} stroke={2.6} /></span>{t}</li>)}</ul>
        </div>
        <div className={x.extra}>
          <span><Icon name="database" size={22} stroke={1.8} /></span>
          <span><b>Обработка полевых данных.</b> Дополнительно поможем обработать ваши полевые данные — по договорной цене.</span>
        </div>
      </section>

      <section className={b.block}>
        <Head title="Курсы и стоимость" lede="Стоимость указана за весь курс на одного человека. Обучение проводится в группе от 2 до 4 человек." />
        <div className={`${x.tabs} no-scrollbar`} role="tablist" aria-label="Направления">
          {eduCourses.map((c, i) => (
            <button key={c.tab} type="button" role="tab" aria-selected={tab === i} className={`${x.tab} ${tab === i ? x.tabOn : ''}`} onClick={() => setTab(i)}>
              {c.tab}<span>{c.rows.length}</span>
            </button>
          ))}
        </div>
        <div className={x.table} role="tabpanel">
          <div className={x.tHead}><b>{cur.group}</b><span className="desktop-only">Длительность</span><span className="desktop-only">Стоимость</span></div>
          {cur.rows.map((r) => (
            <div key={r.name} className={x.tRow}>
              <span className={x.tName}><b>{r.name}</b>{r.sub && <span>{r.sub}</span>}</span>
              <span className={x.tDays}><Icon name="clock" size={15} stroke={2} />{daysLabel(r.days)}</span>
              <b className={x.tPrice}>{r.price} ₸</b>
            </div>
          ))}
        </div>
        <div className={x.notes}>
          <div className={`${x.note} ${x.noteDark}`}><span><Icon name="user" size={22} stroke={1.8} /></span><span><b>70 000 ₸ / день</b><span>Стоимость индивидуального обучения</span></span></div>
          <div className={x.note}><span><Icon name="percent" size={22} stroke={1.8} /></span><span><b>Скидка 10%</b><span>Если от одной организации сразу набирается полная группа из 4 человек</span></span></div>
          <div className={x.note}><span><Icon name="clock" size={22} stroke={1.8} /></span><span><b>Сроки ориентировочные</b><span>Рассчитаны на специалистов со знаниями геодезии без опыта работы с этим оборудованием и ПО</span></span></div>
        </div>
      </section>

      <Photos title="Как проходят занятия" items={eduPhotos} />

      <RequestForm id="edu-form" title="Запись на обучение" lede="Группы формируются по предварительным заявкам — сообщим, когда соберётся ваша."
        contact="Подскажем программу, сроки и ближайшую группу.">
        <div className={s.two}>
          <Field label="Ваше имя" placeholder="Как к вам обращаться" autoComplete="name" required />
          <Field label="Телефон" type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" required />
        </div>
        <div className={s.two}>
          <Field label="Организация" placeholder="Название компании" autoComplete="organization" />
          <Select id="edu-dir" label="Направление" placeholder="Выберите направление" options={eduCourses.map((c) => c.group)} />
        </div>
        <div className={s.two}>
          <Seg label="Участников" options={['1', '2', '3', '4']} initial={1} />
          <Seg label="Где обучаться" options={['В учебном центре', 'На объекте']} />
        </div>
      </RequestForm>

      <Faq items={eduFaq} />
      <Closing exclude="Обучение" />
    </main>
  );
}

/* ---------- Демонстрация ---------- */
function Quote({ lead, text }: { lead: string; text: string }) {
  return (
    <div className={x.quote}>
      <span aria-hidden="true" className={x.quoteMark}>“</span>
      <p className={x.quoteLead}>{lead}</p>
      <p className={x.quoteText}>{text}</p>
    </div>
  );
}

export function DemoServicePage() {
  return (
    <main className={`container ${s.page}`}>
      <Crumb label="Демонстрация оборудования" />
      <Hero icon="play" nowrap title="Демонстрация оборудования" href="#demo-form" cta="Заказать демонстрацию"
        lede="Новый объект с нестандартной задачей и вы не уверены, что прибор справится? Покажем оборудование в деле и вместе обсудим нюансы его использования на вашем объекте." />

      <section className={b.block}>
        <Head title="Зачем нужна демонстрация" />
        <div className={x.split}>
          <Quote lead="Геодезическое оборудование стоит недёшево — перед покупкой хочется убедиться, что оно подходит под ваши задачи."
            text="Большая часть нашей работы — показывать вам оборудование, и мы очень любим это делать. Демонстрация — это не только повод пообщаться лично, но и возможность отшлифовать ваши и наши знания и проверить себя на новых нестандартных задачах." />
          <div className={x.benefits}>
            {demoBenefits.map((it, i) => (
              <div key={it.title} className={`${x.benefit} ${i === 0 ? x.benefitOn : ''}`}>
                <span className={x.benefitIcon}><Icon name={it.icon} size={22} stroke={1.8} /></span>
                <span className={x.featureText}><b>{it.title}</b><span>{it.text}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Steps title="Как заказать" steps={demoSteps} />
      <Photos title="Демонстрации GEOKURS" items={demoPhotos} />

      <RequestForm id="demo-form" title="Заказать демонстрацию" lede="Оставьте заявку — свяжемся с вами и согласуем сроки."
        contact="Позвоните — вместе подберём прибор и время демонстрации.">
        <div className={s.two}>
          <Field label="Ваше имя" placeholder="Как к вам обращаться" autoComplete="name" required />
          <Field label="Телефон" type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" required />
        </div>
        <div className={s.two}>
          <Field label="Организация" placeholder="Название компании" autoComplete="organization" required />
          <Field label="Город" placeholder="Например, Алматы" autoComplete="address-level2" required />
        </div>
        <Field label="Какой прибор хотите увидеть" placeholder="Необязательно — например, Trimble X9" />
      </RequestForm>

      <Closing exclude="Демонстрация оборудования" />
    </main>
  );
}

/* ---------- Пилот-проект ---------- */
export function PilotPage() {
  return (
    <main className={`container ${s.page}`}>
      <Crumb label="Пилот-проект" />
      <Hero icon="flag" title="Пилот-проект" href="#pilot-form" cta="Заказать пилот-проект"
        lede="Выполним небольшую часть вашего объёма с интересующим вас оборудованием — посмотрите реальное выполнение работы и обсудите все детали технологии и прибора." />

      <section className={b.block}>
        <Head title="Что такое пилот-проект" />
        <div className={x.split}>
          <Quote lead="Часто демонстрации недостаточно, чтобы оценить эффективность оборудования на конкретном объекте."
            text="Пилот-проект — это небольшой объём съёмки вашего реального объекта выбранным оборудованием под ключ. Вы получаете готовый материал по предварительному ТЗ и на его основе оцениваете эффективность прибора или технологии." />
          <div className={x.vsCard}>
            <svg aria-hidden="true" className={x.docRings} viewBox="0 0 340 340" fill="none"><circle cx="170" cy="170" r="168" stroke="#7BDB84" strokeOpacity="0.14" /><circle cx="170" cy="170" r="110" stroke="#7BDB84" strokeOpacity="0.14" /></svg>
            <span className={x.vsKicker}>Например</span>
            <span className={x.vs}>
              <span className={x.vsNew}><span><Icon name="drone" size={22} stroke={1.8} /></span><b>Съёмка БПЛА</b><small>Новая технология</small></span>
              <b className={x.vsMark}>vs</b>
              <span className={x.vsOld}><span><Icon name="baseStation" size={22} stroke={1.8} /></span><b>GNSS</b><small>Традиционный метод</small></span>
            </span>
            <span className={x.vsText}>Обычно пилот-проект заказывают, когда хотят применить новую технологию вместо традиционных методов.</span>
            <span className={x.vsPrice}><span><Icon name="percent" size={20} stroke={1.8} /></span><span><b>Стоимость оговаривается отдельно</b> и, как правило, берётся в зачёт при покупке оборудования.</span></span>
          </div>
        </div>
      </section>

      <section className={b.block}>
        <Head title="Что даёт пилот-проект" />
        <div className={x.gains}>
          {pilotGains.map((it, i) => (
            <div key={it.title} className={`${x.benefit} ${i === 0 ? x.benefitOn : ''}`}>
              <span className={x.benefitIcon}><Icon name={it.icon} size={22} stroke={1.8} /></span>
              <span className={x.featureText}><b>{it.title}</b><span>{it.text}</span></span>
            </div>
          ))}
        </div>
      </section>

      <Steps title="Как проходит пилот-проект" steps={pilotSteps} />
      <Photos title="Наши проекты" items={pilotPhotos} />

      <RequestForm id="pilot-form" title="Заказать пилот-проект" lede="Оставьте заявку — обсудим объект, задачу и подготовим ТЗ."
        contact="Позвоните — расскажем, как проходит пилот-проект и от чего зависит стоимость.">
        <div className={s.two}>
          <Field label="Ваше имя" placeholder="Как к вам обращаться" autoComplete="name" required />
          <Field label="Телефон" type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" required />
        </div>
        <div className={s.two}>
          <Field label="Организация" placeholder="Название компании" autoComplete="organization" required />
          <Field label="Город" placeholder="Например, Алматы" autoComplete="address-level2" required />
        </div>
        <Field label="Объект и задача" placeholder="Необязательно — например, топосъёмка 50 га с БПЛА" />
      </RequestForm>

      <Closing exclude="Пилот-проект" />
    </main>
  );
}

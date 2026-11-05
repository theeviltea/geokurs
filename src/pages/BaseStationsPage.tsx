import { useState } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { KZ_MAP, KZ_MAP_MOBILE, NET_SVG } from '../components/services/art';
import { DarkCta, Faq, Head, OtherServices, PHONE, ServiceHero, Steps, WHATSAPP } from '../components/services/ServiceBlocks';
import b from '../components/services/ServiceBlocks.module.css';
import { BS_CABINET, bsFaq, bsNeeds, bsSteps, tariffGroups } from '../data/services';
import s from './Service.module.css';

const STAR = 'M12 2l2.9 6.9L22 9.3l-5.5 4.8 1.7 7.2L12 17.5 5.8 21.3l1.7-7.2L2 9.3l7.1-.4z';
const Hit = () => <span className={s.hit}><svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"><path d={STAR} fill="currentColor" /></svg>Хит</span>;

export function BaseStationsPage() {
  const [shut, setShut] = useState<Record<string, boolean>>({});
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сервисы' }, { label: 'Базовые станции' }]} back={{ label: 'Главная', href: '/' }} />

      <ServiceHero art={NET_SVG} artClass="net">
        <span className={s.status}><span aria-hidden="true" />Сеть онлайн · 21 из 24 станций</span>
        <h1 className={b.h1}>Базовые станции</h1>
        <div className={s.heroRow}>
          <a href={BS_CABINET} className={s.heroBtn}><Icon name="user" size={18} />Перейти в личный кабинет</a>
          <div className={s.ntrip}>
            <b>NTRIP</b><span>ntrip.geokurs.kz:2101</span><i aria-hidden="true" className="desktop-only">·</i><br className="mobile-only" />
            <span>RMS ±0.008 m</span><i aria-hidden="true">·</i><b>FIXED</b>
          </div>
        </div>
      </ServiceHero>

      <section id="tariffs" className={b.block}>
        <Head title="Тарифы" lede="Выберите тип оборудования, чтобы увидеть подходящие тарифы. Один логин — на одно устройство." />
        {tariffGroups.map((g) => {
          const open = !shut[g.key];
          return (
            <div key={g.key} className={s.tGroup}>
              <button type="button" className={s.tHead} aria-expanded={open} onClick={() => setShut({ ...shut, [g.key]: open })}>
                <span><b>{g.title}</b><span>{g.sub}</span></span>
                <span className={s.tToggle}><Icon name="chevronDown" size={18} stroke={2} /></span>
              </button>
              {open && (
                <div role="table" aria-label={g.title}>
                  <div role="row" className={`${s.tRow} ${s.tCols} desktop-only`}>
                    <span role="columnheader">Тариф</span><span role="columnheader">Срок</span><span role="columnheader">Базовые станции</span><span role="columnheader">Цена</span>
                  </div>
                  {g.rows.map((r) => (
                    <div role="row" key={r.name} className={s.tRow}>
                      <span role="cell" className={s.tName}><span>{r.name}{r.hit && <Hit />}</span><span className="mobile-only">{r.term} · Все БС РК</span></span>
                      <span role="cell" className={`${s.tMuted} desktop-only`}>{r.term}</span>
                      <span role="cell" className={`${s.tMuted} desktop-only`}>Все БС РК</span>
                      <b role="cell" className={s.tPrice}>{r.price}</b>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <section className={b.block}>
        <Head title="Карта покрытия" aside={<a href="#" className={s.tg}>Проверить статус через Telegram-бот <Icon name="arrowRight" size={16} stroke={2} /></a>} />
        <div className={s.cover}>
          <div className={s.map}>
            <span className={`${s.pill} ${s.pillTL}`}><i className={s.dotOn} /><b>21/24</b>online</span>
            <span className={`${s.pill} ${s.pillTR}`}><Icon name="pin" size={14} stroke={2} />Казахстан · NTRIP</span>
            <div className="desktop-only" dangerouslySetInnerHTML={{ __html: KZ_MAP }} />
            <div className="mobile-only" dangerouslySetInnerHTML={{ __html: KZ_MAP_MOBILE }} />
            <span className={`${s.pill} ${s.pillBL}`}><i className={s.dotOn} />Онлайн<i className={s.dotOff} />Офлайн</span>
            <span className={s.north} aria-hidden="true">N↑</span>
          </div>
          <div className={s.coverSide}>
            <div className={s.active}>
              <span><span className={s.eyebrow}>Активных станций</span><b>24</b></span>
              <span className={s.online}><i aria-hidden="true" />Онлайн 24/7</span>
            </div>
            <div className={s.need}>
              <b>Что нужно для подключения</b>
              <ul>{bsNeeds.map((n) => <li key={n.text}><span><Icon name={n.icon} size={20} stroke={1.8} /></span>{n.text}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <Steps title="Как подключиться" lede="Никакого ожидания — подключение к сети происходит автоматически сразу после оплаты." steps={bsSteps} />
      <Faq items={bsFaq} />
      <DarkCta
        title="Готовы работать в RTK?"
        text="Зарегистрируйтесь и подключитесь за пару минут."
        actions={<>
          <a href={BS_CABINET} className={b.btnGreen}><Icon name="user" size={18} />Создать кабинет</a>
          <a href={WHATSAPP} className={b.btnGhost}><Icon name="whatsapp" size={18} />WhatsApp</a>
        </>}
        foot={<>Нужна помощь? Техподдержка — <a href={PHONE.href}>{PHONE.label}</a> · <a href={WHATSAPP}>WhatsApp</a></>}
      />
      <OtherServices exclude="Базовые станции" />
    </main>
  );
}

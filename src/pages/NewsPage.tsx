import { useState } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { news } from '../data/home';
import { img } from '../data/images';
import s from './NewsPage.module.css';

const STEPS = [
  ['Оставьте заявку', 'На сайте сети базовых станций bs.geokurs.kz.'],
  ['Получите доступ', 'Менеджер пришлёт логин и пароль для подключения.'],
  ['Настройте контроллер', 'Укажите параметры NTRIP в полевом ПО и начните съёмку.'],
];

function Cover() {
  return (
    <div role="img" aria-label="Схема: базовая станция в Жезказгане и зона приёма поправок" className={s.cover}>
      <div className={s.glow} />
      <svg className={s.coverRings} viewBox="0 0 720 720" fill="none" aria-hidden="true">
        <circle cx="360" cy="360" r="350" stroke="#7BDB84" strokeOpacity="0.16" />
        <circle cx="360" cy="360" r="250" stroke="#7BDB84" strokeOpacity="0.22" />
        <circle cx="360" cy="360" r="150" stroke="#7BDB84" strokeOpacity="0.32" />
        <circle cx="360" cy="360" r="60" stroke="#7BDB84" strokeOpacity="0.5" />
        <path d="M360 0v720M0 360h720" stroke="#FFFFFF" strokeOpacity="0.08" />
        <circle cx="360" cy="360" r="10" fill="#7BDB84" />
        <circle cx="360" cy="360" r="22" stroke="#7BDB84" strokeWidth="2" />
        <circle cx="590" cy="250" r="5" fill="#FFFFFF" fillOpacity="0.7" />
        <circle cx="190" cy="470" r="5" fill="#FFFFFF" fillOpacity="0.7" />
        <circle cx="450" cy="560" r="5" fill="#FFFFFF" fillOpacity="0.7" />
      </svg>
      <span className={s.city}>Жезказган</span>
      <span className={s.mark} aria-hidden="true">RTK</span>
    </div>
  );
}

export function NewsPage() {
  const [copied, setCopied] = useState(false);
  const other = news.slice(1);
  const copy = () => {
    try { navigator.clipboard?.writeText(window.location.href).catch(() => {}); } catch { /* ignore */ }
    setCopied(true);
  };
  return (
    <main>
      <div className={`container ${s.top}`}>
        <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Новости', href: 'https://geokurs.kz/news/' }, { label: 'Новая базовая станция в Жезказгане' }]} back={{ label: 'Новости', href: '/' }} />
      </div>
      <section className={`container ${s.layout}`}>
        <article className={s.article}>
          <header className={s.head}>
            <span className={s.metaRow}><span className={s.tag}>Базовые станции</span><time dateTime="2025-11-10">10 ноября 2025</time></span>
            <h1 className={s.h1}>Новая базовая станция в Жезказгане</h1>
            <p className={s.lead}>В Жезказгане заработала новая базовая станция GEOKURS. Геодезисты и строители Улытауской области могут получать RTK‑поправки в городе и окрестностях без установки собственной базы.</p>
          </header>
          <Cover />
          <div className={s.body}>
            <h2>Что это даёт</h2>
            <p>Ровер получает поправки от станции через интернет по протоколу NTRIP. Вторую базу не нужно возить на объект и охранять, а съёмку можно начинать сразу после подключения к сети.</p>
            <h2>Как подключиться</h2>
            <ol className={s.steps}>
              {STEPS.map(([t, d], i) => (
                <li key={t}><span className={s.num}>{i + 1}</span><span><b>{t}</b><small>{d}</small></span></li>
              ))}
            </ol>
            <div className={`${s.network} mobile-only`}>
              <span className={s.networkTitle}>Сеть базовых станций GEOKURS</span>
              <a href="https://bs.geokurs.kz/" className={s.networkBtn}>Подключиться <Icon name="arrowRight" size={18} stroke={2} /></a>
            </div>
            <div className={s.share}>
              <span className="desktop-only">Поделиться</span>
              <span className={s.shareBtns}>
                <button type="button" onClick={copy} className={s.copy}><Icon name="link" size={18} stroke={1.8} />{copied ? 'Ссылка скопирована' : 'Скопировать ссылку'}</button>
                <button type="button" aria-label="Отправить" className={s.round}><Icon name="share" size={18} stroke={1.8} /></button>
              </span>
            </div>
          </div>
        </article>
        <aside className={`${s.aside} desktop-only`}>
          <div className={s.netCard}>
            <svg viewBox="0 0 260 260" fill="none" aria-hidden="true"><circle cx="130" cy="130" r="125" stroke="#FFFFFF" strokeOpacity="0.16" /><circle cx="130" cy="130" r="80" stroke="#FFFFFF" strokeOpacity="0.16" /></svg>
            <span className={s.netTitle}>Сеть базовых станций GEOKURS</span>
            <span className={s.netText}>RTK‑поправки по NTRIP без своей базы на объекте.</span>
            <a href="https://bs.geokurs.kz/" className={s.netBtn}>Подключиться <Icon name="arrowRight" size={18} stroke={2} /></a>
          </div>
          <SmartLink href="/product/geokurs-chcnav-i73" className={s.mini}>
            <span className={s.miniPic}><img src={img('p-i73.webp')} alt="" /></span>
            <span className={s.miniText}><small>Приёмник для работы с сетью</small><b>GEOKURS CHCNAV i73+</b><strong>1 914 500 ₸</strong></span>
          </SmartLink>
          <div className={s.more}>
            <span className={s.moreTitle}>Ещё новости</span>
            <ul>{other.map((n) => <li key={n.href}><a href={n.href}><small>{n.date}</small><b>{n.title}</b></a></li>)}</ul>
          </div>
        </aside>
      </section>
      <section className={s.sheet}>
        <div className={`container ${s.sheetWrap}`}>
          <div className={s.sheetHead}>
            <h2 className="h2">Другие новости</h2>
            <a href="https://geokurs.kz/news/" className={s.all}><span className="desktop-only">Все новости</span><span className="mobile-only">Все</span><Icon name="arrowRight" size={16} stroke={2} className="desktop-only" /></a>
          </div>
          <div className={`${s.cards} no-scrollbar`}>
            {other.map((n) => (
              <a key={n.href} href={n.href} className={s.card}>
                <span className={s.cardTop}><span className={s.tag}>{n.tag}</span><span className={s.date}>{n.date}</span></span>
                <span className={s.cardTitle}>{n.title}</span>
                <span className={s.read}>Читать <Icon name="arrowRight" size={16} stroke={2} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

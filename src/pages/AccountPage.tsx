import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Crumbs } from '../components/Crumbs';
import { Check, Field } from '../components/Field';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { currentOrders, demoUser, favourites, pastOrders, type Order } from '../data/account';
import { PHONE } from '../data/nav';
import type { IconName } from '../icons/icons';
import { navByKey } from '../lib/products';
import s from './Shop.module.css';

type Tab = 'orders' | 'profile' | 'fav' | 'password';
const TABS: { key: Tab; name: string; icon: IconName; badge?: number }[] = [
  { key: 'orders', name: 'Мои заказы', icon: 'box', badge: currentOrders.length },
  { key: 'profile', name: 'Личные данные', icon: 'user' },
  { key: 'fav', name: 'Отложенные', icon: 'fav', badge: favourites.length },
  { key: 'password', name: 'Смена пароля', icon: 'lock' },
];
const names = (o: Order) => o.items.map((k) => navByKey[k].name).join(', ');

function OrderCard({ o }: { o: Order }) {
  return (
    <article className={`${s.card} ${s.order}`}>
      <div className={s.orderHead}>
        <span><b className={s.orderNo}>Заказ № {o.no}</b><small>от {o.date}</small></span>
        <span className={`${s.status} ${s[o.tone]}`}>{o.status}</span>
      </div>
      <div className={s.orderItems}>
        <span className={s.thumbs}>{o.items.map((k) => <span key={k} className={s.thumb}><img src={navByKey[k].image} alt="" /></span>)}</span>
        <span className={s.orderNames}>{names(o)}</span>
      </div>
      <div className={s.orderFoot}>
        <span className={s.how}><Icon name="pin" size={16} color="var(--c-green-600)" />{o.how}</span>
        <span className={s.orderSum}><b>{o.sum}</b><a href="#" className={s.ghostSm}>Подробнее</a></span>
      </div>
    </article>
  );
}

export function AccountPage() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState<Tab>(params.get('tab') === 'fav' ? 'fav' : 'orders');
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Личный кабинет' }]} back={{ label: 'Главная', href: '/' }} />
      <h1 className={s.h1}>Личный кабинет</h1>
      <div className={s.accGrid}>
        <aside className={`${s.card} ${s.accSide}`}>
          <div className={s.profile}>
            <span className={s.avatar}>{demoUser.initials}</span>
            <span className={s.profileText}><b>{demoUser.name}</b><small>{demoUser.email}</small></span>
            <SmartLink href="/login" className={`${s.logoutSm} mobile-only`} aria-label="Выйти"><Icon name="logout" size={20} stroke={1.6} /></SmartLink>
          </div>
          <nav aria-label="Разделы кабинета" className={`${s.accNav} no-scrollbar`} role="tablist">
            {TABS.map((t) => (
              <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} className={`${s.accTab} ${tab === t.key ? s.accTabOn : ''}`} onClick={() => setTab(t.key)}>
                <Icon name={t.icon} size={20} className="desktop-only" />{t.name}
                {t.badge ? <span className={s.badge}>{t.badge}</span> : null}
              </button>
            ))}
            <SmartLink href="/login" className={`${s.accTab} ${s.logout} desktop-only`}><Icon name="logout" size={20} />Выйти</SmartLink>
          </nav>
          <div className={`${s.askBox} desktop-only`}>
            <b>Вопрос по заказу?</b>
            <a href={PHONE.mainHref}><Icon name="call" size={18} stroke={1.8} />{PHONE.main}</a>
          </div>
        </aside>
        <div className={s.accMain}>
          {tab === 'orders' && (
            <>
              <h2 className={s.h3}>Текущие заказы</h2>
              {currentOrders.map((o) => <OrderCard key={o.no} o={o} />)}
              <h2 className={`${s.h3} ${s.mt}`}>История заказов</h2>
              <div className={`${s.card} ${s.history}`}>
                <div className={`${s.histRow} ${s.histHead} desktop-only`}><span>Номер</span><span>Дата</span><span>Состав</span><span>Сумма</span><span>Статус</span></div>
                {pastOrders.map((o) => (
                  <a key={o.no} href="#" className={s.histRow}>
                    <b>№ {o.no}<span className="mobile-only"> · {o.sum}</span></b>
                    <span className={s.histDate}>{o.date}<span className="mobile-only"> · {o.status}</span></span>
                    <span className={`${s.histNames} desktop-only`}>{names(o)}</span>
                    <b className="desktop-only">{o.sum}</b>
                    <span className={`${s.histStatus} desktop-only`}>{o.status}</span>
                    <Icon name="chevronRight" size={18} stroke={2} color="var(--c-gray-600)" className={`${s.histChev} mobile-only`} />
                  </a>
                ))}
              </div>
            </>
          )}
          {tab === 'profile' && (
            <form className={`${s.card} ${s.panel}`} onSubmit={(e) => e.preventDefault()}>
              <h2 className={s.h3}>Личные данные</h2>
              <Field label="Фамилия, имя, отчество" defaultValue={demoUser.name} autoComplete="name" />
              <div className={s.pair}>
                <Field label="E-mail" type="email" defaultValue={demoUser.email} autoComplete="email" />
                <Field label="Телефон" type="tel" defaultValue={demoUser.phone} autoComplete="tel" />
              </div>
              <div className={s.pair}>
                <Field label="Компания" placeholder="Если покупаете на юрлицо" autoComplete="organization" />
                <Field label="БИН / ИИН" placeholder="12 цифр" inputMode="numeric" />
              </div>
              <Check>Получать новости и акции на e-mail</Check>
              <button type="submit" className={`${s.primary} ${s.fit}`}>Сохранить изменения</button>
            </form>
          )}
          {tab === 'fav' && (
            <>
              <h2 className={s.h3}>Отложенные товары</h2>
              <div className={s.favGrid}>
                {favourites.map((k) => navByKey[k]).map((p) => (
                  <article key={p.key} className={s.mini}>
                    <SmartLink href={p.href} className={s.miniMedia}><img src={p.image} alt="" /><span className={s.favOn}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2,8.69C2,13.03 7.59,17.86 10.41,19.97C11.36,20.68 12.64,20.68 13.59,19.97C16.41,17.86 22,13.03 22,8.69C22,5.83 19.89,3.5 17,3.5C15.5,3.5 14,4 12,6C10,4 8.5,3.5 7,3.5C4.11,3.5 2,5.83 2,8.69Z" /></svg></span></SmartLink>
                    <SmartLink href={p.href} className={s.miniName}>{p.name}</SmartLink>
                    <span className={s.miniPrice}>{p.price ?? 'По запросу'}</span>
                    <button type="button" className={s.miniBuy}><Icon name="cartAlt" size={16} />В корзину</button>
                  </article>
                ))}
              </div>
            </>
          )}
          {tab === 'password' && (
            <form className={`${s.card} ${s.panel} ${s.narrow}`} onSubmit={(e) => e.preventDefault()}>
              <h2 className={s.h3}>Смена пароля</h2>
              <Field label="Текущий пароль" type="password" placeholder="Введите текущий пароль" autoComplete="current-password" />
              <Field label="Новый пароль" type="password" placeholder="Придумайте новый пароль" autoComplete="new-password" />
              <Field label="Повторите новый пароль" type="password" placeholder="Ещё раз" autoComplete="new-password" />
              <button type="submit" className={`${s.primary} ${s.fit}`}>Сменить пароль</button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

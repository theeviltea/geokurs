import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { useOrder } from '../lib/order';
import { fmt, priceNumber } from '../lib/products';
import { plural } from '../lib/search';
import { store } from '../lib/store';
import { TotalBlock } from './CartPage';
import shop from './Shop.module.css';
import s from './Checkout.module.css';

type Buyer = 'person' | 'company';
type Delivery = 'courier' | 'pickup';
type Pay = 'kaspi' | 'card' | 'cash' | 'invoice';
const PAY_LABEL: Record<Pay, string> = { kaspi: 'Kaspi Pay', card: 'Оплата картой', cash: 'Наличный расчёт', invoice: 'Счёт на оплату' };
const PAY_NOTE: Record<Pay, string> = { kaspi: 'Kaspi.kz', card: 'Visa, Mastercard', cash: 'Наличными при получении', invoice: 'Безналичный расчёт' };

/** What the success page shows (passed through router state). */
export type PlacedOrder = { no: string; date: string; count: number; subtotal: number; coupon: string | null; discount: number; total: number; vat: number; pay: Pay; delivery: Delivery; buyer: Buyer };

const SKU: Record<string, string> = { i73: '8001010262', case: '58080010', gtx24: 'GTX 24 SET' };
const ALERT = 'M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3ZM12,7.5L12,13M12,16.2L12,16.5';
const Alert = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ALERT} /></svg>
);

function Card({ icon, title, aside, children }: { icon: Parameters<typeof Icon>[0]['name']; title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section className={s.card}>
      <div className={s.cardHead}><span className={s.cardIcon}><Icon name={icon} size={22} stroke={1.7} /></span><h2>{title}</h2>{aside}</div>
      {children}
    </section>
  );
}

function Option<T extends string>({ value, current, onPick, title, sub, note, badge }: { value: T; current: T; onPick: (v: T) => void; title: string; sub?: string; note?: string; badge?: ReactNode }) {
  const on = value === current;
  return (
    <button type="button" role="radio" aria-checked={on} className={`${s.opt} ${on ? s.optOn : ''}`} onClick={() => onPick(value)}>
      <span className={s.radio}>{on && <Icon name="check" size={12} stroke={2.6} />}</span>
      <span className={s.optBody}>
        <span className={s.optTitle}><b>{title}</b>{badge}</span>
        {sub && <span className={s.optSub}>{sub}</span>}
        {note && <span className={s.optNote}>{note}</span>}
      </span>
    </button>
  );
}
const Free = () => <span className={s.free}>бесплатно</span>;

function Input({ id, label, required, error, textarea, ...rest }: { id: string; label: string; required?: boolean; error?: string; textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  const err = error ? { 'aria-invalid': true, 'aria-describedby': `${id}-err` } : {};
  return (
    <div className={s.field}>
      <label htmlFor={id}>{label}{required && <span className={s.req} aria-hidden="true"> *</span>}</label>
      {textarea
        ? <textarea id={id} rows={3} className={s.input} placeholder={rest.placeholder} value={rest.value as string} onChange={rest.onChange as never} />
        : <input id={id} className={`${s.input} ${error ? s.inputErr : ''}`} required={required} {...err} {...rest} />}
      {error && <span id={`${id}-err`} className={s.err}><Alert />{error}</span>}
    </div>
  );
}

const STEPS = ['Корзина', 'Оформление', 'Подтверждение'];
function Steps() {
  return (
    <>
      <ol aria-label="Шаги заказа" className={`${s.steps} desktop-only`}>
        {STEPS.map((t, i) => (
          <li key={t} className={i === 1 ? s.stepOn : ''}><span className={i < 2 ? s.stepDone : ''}>{i === 0 ? <Icon name="check" size={12} stroke={2.6} /> : i + 1}</span>{t}</li>
        ))}
      </ol>
      <div className="mobile-only"><div className={s.stepsM}><span aria-hidden="true"><i className={s.barOn} /><i className={s.barOn} /><i /></span>Шаг 2 из 3 · <b>Оформление</b></div></div>
    </>
  );
}

/** /checkout — buyer type, delivery, payment, contacts, the items; validates before placing the order. */
export function CheckoutPage() {
  const nav = useNavigate();
  const o = useOrder();
  const [buyer, setBuyer] = useState<Buyer>('person');
  const [delivery, setDelivery] = useState<Delivery>('courier');
  const [pay, setPay] = useState<Pay>('kaspi');
  const [f, setF] = useState({ org: '', bin: '', name: '', phone: '', email: '', address: '', comment: '' });
  const [agree, setAgree] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const banner = useRef<HTMLDivElement>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setF({ ...f, [k]: e.target.value }); if (errors[k]) setErrors({ ...errors, [k]: '' }); };
  const pickBuyer = (b: Buyer) => { setBuyer(b); if (b === 'person' && pay === 'invoice') setPay('kaspi'); };

  if (!o.lines.length) {
    return (
      <main className={`container ${shop.page}`}>
        <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Корзина', href: '/cart' }, { label: 'Оформление заказа' }]} back={{ label: 'Корзина', href: '/cart' }} />
        <section className={`${shop.card} ${shop.empty}`}>
          <span className={shop.emptyIcon}><Icon name="cartAlt" size={32} stroke={1.6} /></span>
          <b>Корзина пуста — оформлять нечего</b>
          <span>Добавьте товары в корзину, и вернитесь к оформлению.</span>
          <div className={shop.emptyBtns}><SmartLink href="/catalog/gnss-oborudovanie" className={shop.primarySm}>Перейти в каталог</SmartLink><button type="button" className={shop.ghost} onClick={store.restoreCart}>Вернуть товары</button></div>
        </section>
      </main>
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (buyer === 'company' && !f.org.trim()) er.org = 'Укажите название организации';
    if (buyer === 'company' && f.bin.replace(/\D/g, '').length !== 12) er.bin = 'БИН — 12 цифр';
    if (f.name.trim().split(/\s+/).filter(Boolean).length < 2) er.name = 'Укажите фамилию, имя и отчество';
    const digits = f.phone.replace(/\D/g, '');
    if (!(digits.length === 11 && /^[78]/.test(digits)) && digits.length !== 10) er.phone = 'Введите номер полностью: +7 и 10 цифр';
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Проверьте адрес почты';
    if (delivery === 'courier' && !f.address.trim()) er.address = 'Укажите адрес, куда привезти заказ';
    if (!agree) er.agree = 'Нужно согласие на обработку персональных данных';
    setErrors(er);
    if (Object.keys(er).length) {
      requestAnimationFrame(() => { banner.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); banner.current?.focus(); });
      return;
    }
    // Prototype: a comment with «ошибка» shows the «order not placed» page.
    if (/ошибк/i.test(f.comment)) { nav('/checkout/error'); return; }
    const now = new Date();
    const order: PlacedOrder = { no: String(870 + Math.floor(Math.random() * 90)), date: now.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ','),
      count: o.count, subtotal: o.subtotal, coupon: o.coupon, discount: o.discount, total: o.total, vat: o.vat, pay, delivery, buyer };
    store.clearCart();
    nav('/checkout/success', { state: order });
  };

  const errList = Object.entries(errors).filter(([, v]) => v);
  const LABELS: Record<string, string> = { org: 'название организации', bin: 'БИН', name: 'Ф.И.О.', phone: 'телефон', email: 'e-mail', address: 'адрес доставки', agree: 'согласие на обработку данных' };
  const countLabel = `${o.count} ${plural(o.count)}`;

  const summary = (
    <aside className={s.summary}>
      <div className={s.sumHead}><span>Ваш заказ</span><SmartLink href="/cart">Изменить</SmartLink></div>
      <div className={shop.sumRows}>
        <div><span>Товары, {countLabel}</span><b>{fmt(o.subtotal)}</b></div>
        {o.coupon && <div><span>Скидка по промокоду</span><b className={shop.discount}>−{fmt(o.discount)}</b></div>}
        <div><span>Доставка</span><b className={shop.discount}>бесплатно</b></div>
      </div>
      {o.coupon && <div className={s.chip}><span><Icon name="check" size={12} stroke={2.6} /></span><b>{o.coupon}</b> · скидка {o.pct}%</div>}
      <TotalBlock subtotal={o.subtotal} total={o.total} vat={o.vat} struck={!!o.coupon} />
      <label className={s.agree}>
        <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setErrors({ ...errors, agree: '' }); }} />
        <span className={s.tick} aria-hidden="true"><Icon name="check" size={13} stroke={2.6} /></span>
        <span>Я согласен на <a href="#">обработку персональных данных</a></span>
      </label>
      {errors.agree && <span className={s.err}><Alert />{errors.agree}</span>}
      <button type="submit" className={`${shop.primary} desktop-only`}>Оформить заказ <Icon name="arrowRight" size={18} stroke={2} /></button>
      <span className={s.fine}>Менеджер перезвонит для подтверждения в рабочее время. Оплата — после подтверждения наличия и сроков.</span>
    </aside>
  );

  return (
    <main className={`container ${shop.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Корзина', href: '/cart' }, { label: 'Оформление заказа' }]} back={{ label: 'Корзина', href: '/cart' }} />
      <div className={s.titleRow}><h1 className={shop.h1}>Оформление заказа</h1><Steps /></div>
      <form className={s.grid} onSubmit={submit} noValidate>
        <div className={s.main}>
          {errList.length > 0 && (
            <div ref={banner} tabIndex={-1} role="alert" className={s.banner}>
              <Alert size={22} />
              <span><b>Не получилось оформить заказ</b><span>Проверьте: {errList.map(([k]) => LABELS[k]).join(', ')}.</span></span>
            </div>
          )}
          <Card icon="user" title="Тип покупателя">
            <div role="radiogroup" aria-label="Тип покупателя" className={s.two}>
              <Option value="person" current={buyer} onPick={pickBuyer} title="Физическое лицо" note="Kaspi Pay, картой или наличными" />
              <Option value="company" current={buyer} onPick={pickBuyer} title="Юридическое лицо" note="Счёт на оплату, закрывающие документы, НДС" />
            </div>
          </Card>
          <div className={s.two}>
            <Card icon="truck" title="Способ доставки">
              <div role="radiogroup" aria-label="Способ доставки" className={s.opts}>
                <Option value="courier" current={delivery} onPick={setDelivery} title="Доставка" sub="По всему Казахстану" note="Бесплатно при заказе от 40 000 ₸. Срок и время согласует менеджер." badge={<Free />} />
                <Option value="pickup" current={delivery} onPick={setDelivery} title="Самовывоз" sub="Офисы в Алматы, Астане, Караганде, Костанае, Уральске, Атырау" note="Пн–Пт, 9:00–18:00. Сообщим, когда заказ будет готов к выдаче." badge={<Free />} />
              </div>
            </Card>
            <Card icon="wallet" title="Способ оплаты">
              <div role="radiogroup" aria-label="Способ оплаты" className={s.opts}>
                <Option value="kaspi" current={pay} onPick={setPay} title="Kaspi Pay" note="Подтвердите оплату в приложении Kaspi.kz" badge={<span className={s.kaspi}>Kaspi</span>} />
                <Option value="card" current={pay} onPick={setPay} title="Оплата картой" note="Visa, Mastercard — онлайн после подтверждения заказа" />
                <Option value="cash" current={pay} onPick={setPay} title="Наличный расчёт" note="Наличными курьеру при получении или в офисе при самовывозе" />
                {buyer === 'company' && <Option value="invoice" current={pay} onPick={setPay} title="Счёт на оплату" note="Выставим счёт на реквизиты компании, оплата по безналу" />}
              </div>
            </Card>
          </div>
          <Card icon="doc" title="Покупатель">
            <div className={s.fields}>
              {buyer === 'company' && (
                <div className={s.two}>
                  <Input id="co-org" label="Название организации" required placeholder="ТОО «Компания»" autoComplete="organization" value={f.org} onChange={set('org')} error={errors.org} />
                  <Input id="co-bin" label="БИН" required placeholder="12 цифр" inputMode="numeric" value={f.bin} onChange={set('bin')} error={errors.bin} />
                </div>
              )}
              <Input id="co-name" label="Ф.И.О." required placeholder="Иванов Иван Иванович" autoComplete="name" value={f.name} onChange={set('name')} error={errors.name} />
              <div className={s.two}>
                <Input id="co-phone" label="Телефон" required type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" value={f.phone} onChange={set('phone')} error={errors.phone} />
                <Input id="co-email" label="E-mail" type="email" placeholder="Для чека и статуса заказа" autoComplete="email" value={f.email} onChange={set('email')} error={errors.email} />
              </div>
              {delivery === 'courier' && <Input id="co-address" label="Адрес доставки" required placeholder="Город, улица, дом, квартира" autoComplete="street-address" value={f.address} onChange={set('address')} error={errors.address} />}
              <Input id="co-comment" label="Комментарий к заказу" textarea placeholder="Например, удобное время звонка" value={f.comment} onChange={set('comment') as never} />
              <span className={s.fine}><span className={s.req}>*</span> — обязательные поля</span>
            </div>
          </Card>
          <Card icon="cart" title="Товары в заказе" aside={<SmartLink href="/cart" className={s.edit}>Изменить</SmartLink>}>
            <div>
              {o.lines.map(({ key, qty, p }) => (
                <div key={key} className={s.item}>
                  <span className={s.itemPic}><img src={p.image} alt="" /></span>
                  <span className={s.itemInfo}><span>{p.name}</span><small>{SKU[key] ?? p.brand} · {qty} шт{qty > 1 ? ` × ${fmt(priceNumber(p))}` : ''}</small></span>
                  <b>{fmt(priceNumber(p) * qty)}</b>
                </div>
              ))}
            </div>
          </Card>
          <div className="mobile-only">{summary}</div>
        </div>
        <div className="desktop-only">{summary}</div>
        <div className={`${shop.checkoutBar} mobile-only`}>
          <span><small>Итого, в т.ч. НДС {fmt(o.vat)}</small><b>{fmt(o.total)}</b></span>
          <button type="submit" className={shop.checkoutBtn}>Оформить</button>
        </div>
      </form>
    </main>
  );
}

const DEMO: PlacedOrder = { no: '874', date: '17.11.2026, 12:50', count: 4, subtotal: 2642500, coupon: 'GEOKURS5', discount: 132125, total: 2510375, vat: 346259, pay: 'kaspi', delivery: 'courier', buyer: 'person' };

/** /checkout/success — the order is placed: numbers, paid status, summary and what happens next. */
export function CheckoutSuccessPage() {
  const o = (useLocation().state as PlacedOrder | null) ?? DEMO;
  const cash = o.pay === 'cash' || o.pay === 'invoice';
  const next: [Parameters<typeof Icon>[0]['name'], string, string][] = [
    ['call', 'Менеджер перезвонит', 'В рабочее время подтвердит наличие, сроки и стоимость доставки.'],
    ['doc', cash ? 'Оплата' : 'Чек и документы', cash ? (o.pay === 'cash' ? 'Оплатите наличными при получении заказа.' : 'Счёт придёт на e-mail после подтверждения заказа.') : 'Чек об оплате придёт на e-mail, документы по заказу — в личном кабинете.'],
    ['truck', o.delivery === 'courier' ? 'Доставка' : 'Самовывоз', o.delivery === 'courier' ? 'Отправим заказ и пришлём трек-номер по SMS и e-mail.' : 'Сообщим, когда заказ будет готов к выдаче в офисе.'],
  ];
  return (
    <main className={`container ${shop.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Заказ сформирован' }]} back={{ label: 'Главная', href: '/' }} />
      <div className={s.result}>
        <section className={s.hero}>
          <Rings />
          <span className={`${s.badge} ${s.badgeOk}`}><Icon name="check" size={36} stroke={2.6} /></span>
          <h1>Заказ сформирован</h1>
          <p>Ваш заказ <b>№ {o.no}</b> от {o.date} успешно создан. Номер вашей оплаты: <b>№ {o.no}/1</b>. Подтверждение отправили на e-mail.</p>
          <Contacts />
          <span className={s.heroNote}>Если возникли вопросы — позвоните или напишите нам</span>
        </section>
        <div className={s.resultGrid}>
          <div className={s.col}>
            <section className={s.card}>
              <div className={s.payHead}><h2>Оплата заказа</h2>{cash ? <span className={s.wait}>Оплата при получении</span> : <span className={s.paid}><Icon name="check" size={12} stroke={2.6} />Оплачено</span>}</div>
              <div className={s.payBox}><span className={o.pay === 'kaspi' ? s.payKaspi : s.payIcon}>{o.pay === 'kaspi' ? 'Kaspi' : <Icon name="wallet" size={24} stroke={1.7} />}</span><span><b>{PAY_LABEL[o.pay]}</b><small>Оплата № {o.no}/1 · {fmt(o.total)} · {PAY_NOTE[o.pay]}</small></span></div>
            </section>
            <section className={s.card}>
              <h2 className={s.h2}>Что дальше</h2>
              <ol className={s.next}>{next.map(([i, t, d]) => <li key={t}><span><Icon name={i} size={20} stroke={1.7} /></span><span><b>{t}</b><small>{d}</small></span></li>)}</ol>
            </section>
          </div>
          <section className={s.card}>
            <div className={s.payHead}><h2>Заказ № {o.no}</h2><small>{o.date}</small></div>
            <div className={s.rows}>
              <div><span>Товары, {o.count} {plural(o.count)}</span><b>{fmt(o.subtotal)}</b></div>
              {o.coupon && <div><span>Скидка по промокоду {o.coupon}</span><b className={shop.discount}>−{fmt(o.discount)}</b></div>}
              <div><span>Доставка</span><b>{o.delivery === 'courier' ? 'бесплатно, по Казахстану' : 'самовывоз'}</b></div>
              <div><span>Итого</span><b className={s.bigSum}>{fmt(o.total)}</b></div>
              <div><span>в т.ч. НДС 16%</span><b>{fmt(o.vat)}</b></div>
            </div>
          </section>
        </div>
        <div className={s.btns}><SmartLink href="/cabinet" className={`${shop.primary} ${s.dark}`}>Мои заказы в личном кабинете</SmartLink><SmartLink href="/" className={s.ghostBtn}>Продолжить покупки</SmartLink></div>
      </div>
    </main>
  );
}

/** /checkout/error — the order could not be created (server side). */
export function CheckoutErrorPage() {
  const o = useOrder();
  const saved = [`Корзина: ${o.count} ${plural(o.count)} на ${fmt(o.total)}`, ...(o.coupon ? [`Промокод ${o.coupon}`] : []), 'Данные покупателя, доставка и оплата'];
  return (
    <main className={`container ${shop.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Корзина', href: '/cart' }, { label: 'Оформление заказа', href: '/checkout' }, { label: 'Ошибка' }]} back={{ label: 'Оформление', href: '/checkout' }} />
      <div className={s.result}>
        <section className={s.hero}>
          <Rings err />
          <span className={`${s.badge} ${s.badgeErr}`}><Alert size={36} /></span>
          <h1>Не удалось оформить заказ</h1>
          <p>Что-то пошло не так на нашей стороне — заказ не создан, деньги не списаны. Корзина и введённые данные сохранены: попробуйте ещё раз через минуту.</p>
          <span className={s.code}>Код ошибки 500 · {new Date().toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          <div className={s.btns}><SmartLink href="/checkout" className={shop.primary}><Icon name="arrowRight" size={18} stroke={2} />Попробовать ещё раз</SmartLink><SmartLink href="/cart" className={s.ghostBtn}>Вернуться в корзину</SmartLink></div>
        </section>
        <div className={s.resultGrid}>
          <section className={s.card}>
            <h2 className={s.h2}>Ничего не потерялось</h2>
            <ul className={s.saved}>{saved.map((t) => <li key={t}><span><Icon name="check" size={12} stroke={2.6} /></span>{t}</li>)}</ul>
          </section>
          <section className={`${s.card} ${s.helpCard}`}>
            <h2 className={s.h2}>Оформим заказ по телефону</h2>
            <p>Если ошибка повторяется — позвоните или напишите. Менеджер оформит заказ вручную с теми же ценами{o.coupon ? ` и промокодом ${o.coupon}` : ''}.</p>
            <Contacts dark />
          </section>
        </div>
      </div>
    </main>
  );
}

function Contacts({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`${s.contacts} ${dark ? s.contactsDark : ''}`}>
      <a href="tel:+77008290000"><Icon name="call" size={17} stroke={1.8} />+7 700 829 00 00</a>
      <a href="mailto:info@geokurs.kz"><Icon name="mail" size={17} stroke={1.8} />info@geokurs.kz</a>
    </div>
  );
}
function Rings({ err = false }: { err?: boolean }) {
  return (
    <svg aria-hidden="true" className={s.rings} viewBox="0 0 420 420" fill="none" stroke={err ? '#C62828' : '#227831'} strokeOpacity="0.07">
      <circle cx="210" cy="210" r="208" /><circle cx="210" cy="210" r="150" /><circle cx="210" cy="210" r="92" />
    </svg>
  );
}

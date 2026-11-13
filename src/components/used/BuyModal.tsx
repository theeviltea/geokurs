import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { usedCities } from '../../data/used';
import { Icon } from '../Icon';
import s from '../demo/DemoModal.module.css';
import x from './BuyModal.module.css';

type Who = 'person' | 'company';
const WHO: [Who, string][] = [['person', 'Частное лицо'], ['company', 'Представитель компании']];
type Item = { title: string; price: string; city: string; id: string; thumb: string };
const KEYS = ['first', 'last', 'phone', 'email', 'city'] as const;
type Key = typeof KEYS[number];
const MSG: Record<Key, string> = { first: 'Укажите имя', last: 'Укажите фамилию', phone: 'Проверьте номер телефона', email: 'Проверьте email', city: 'Выберите город' };

/** «Заявка на покупку» for a Б/У listing; then the «Заявка на покупку отправлена» state. */
export function BuyModal({ item, onClose }: { item: Item; onClose: () => void }) {
  const [who, setWho] = useState<Who>('person');
  const [err, setErr] = useState<Partial<Record<Key | 'agree', boolean>>>({});
  const [done, setDone] = useState<{ name: string; phone: string; city: string } | null>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    dialog.current?.querySelector<HTMLElement>('button[role=radio]')?.focus();
    const body = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = body; window.removeEventListener('keydown', key); prev?.focus?.(); };
  }, [onClose]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget.elements as unknown as Record<string, HTMLInputElement>;
    const v = (k: string) => f[k].value.trim();
    const next = {
      first: !v('first'), last: !v('last'), phone: v('phone').replace(/\D/g, '').length < 10,
      email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('email')), city: !v('city'), agree: !f.agree.checked,
    };
    setErr(next);
    const firstBad = KEYS.find((k) => next[k]);
    if (firstBad) f[firstBad].focus();
    if (Object.values(next).some(Boolean)) return;
    // TODO: send to the client's CRM / geoshop.kz endpoint when it exists.
    setDone({ name: v('first'), phone: v('phone'), city: v('city') });
  };

  const input = (k: Key, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <label className={s.field}><span>{label} <i>*</i></span>
      <input name={k} {...props} aria-invalid={!!err[k]} aria-describedby={err[k] ? `buy-${k}-err` : undefined} className={err[k] ? s.bad : ''} />
      {err[k] && <em id={`buy-${k}-err`}>{MSG[k]}</em>}
    </label>
  );
  const mini = (small = false) => (
    <div className={`${s.product} ${x.item} ${small ? s.productSm : ''}`}>
      <img src={item.thumb} alt="" />
      <span><small>Б/У · {item.city} · {item.id}</small><b>{item.title}</b></span>
      <strong className={x.price}>{item.price} ₸</strong>
    </div>
  );

  return createPortal(
    <div className={s.overlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialog} className={`${s.card} ${x.card}`} role="dialog" aria-modal="true" aria-labelledby="buy-title">
        <button type="button" className={s.close} aria-label="Закрыть" onClick={onClose}><Icon name="close" size={20} stroke={2} /></button>
        {!done ? (
          <>
            <div className={s.head}>
              <span className={s.headIcon}><Icon name="cart" size={24} stroke={1.8} /></span>
              <span><b id="buy-title">Заявка на покупку</b><span>Все поля со звёздочкой обязательны</span></span>
            </div>
            {mini()}
            <form className={s.form} onSubmit={submit} noValidate>
              <div className={s.field}><span id="buy-who">Покупатель</span>
                <div role="radiogroup" aria-labelledby="buy-who" className={s.where}>
                  {WHO.map(([k, label]) => <button key={k} type="button" role="radio" aria-checked={who === k} className={who === k ? s.on : ''} onClick={() => setWho(k)}>{label}</button>)}
                </div>
              </div>
              <div className={s.row}>
                {input('first', 'Имя', { autoComplete: 'given-name', placeholder: 'Введите имя' })}
                {input('last', 'Фамилия', { autoComplete: 'family-name', placeholder: 'Введите фамилию' })}
              </div>
              <div className={s.row}>
                {input('phone', 'Телефон', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '+7 (___) ___-__-__' })}
                {input('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'name@company.kz' })}
              </div>
              <div className={s.row}>
                <label className={s.field}><span>Город <i>*</i></span>
                  <span className={x.selectBox}>
                    <select name="city" defaultValue="" aria-invalid={!!err.city} className={`${x.select} ${err.city ? x.bad : ''}`}>
                      <option value="">Выберите город</option>
                      {usedCities.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <Icon name="chevronDown" size={18} stroke={2} className={x.chev} />
                  </span>
                  {err.city && <em>{MSG.city}</em>}
                </label>
                <label className={s.field}><span>Адрес <small>· необязательно</small></span><input name="addr" autoComplete="street-address" placeholder="Улица, дом" /></label>
              </div>
              <label className={s.field}><span>Комментарий к заказу <small>· необязательно</small></span><textarea name="note" rows={3} className={x.textarea} placeholder="Например, удобное время для звонка" /></label>
              <label className={s.agree}>
                <input type="checkbox" name="agree" defaultChecked />
                <span>Отправляя заявку, я соглашаюсь на <a href="#">обработку персональных данных</a> в соответствии с Законом РК № 94-V.</span>
              </label>
              {err.agree && <em className={s.agreeErr}>Нужно согласие на обработку данных</em>}
              <button type="submit" className={s.submit}>Отправить заявку · {item.price} ₸</button>
            </form>
          </>
        ) : (
          <div className={s.done} role="status">
            <svg className={s.ok} aria-hidden="true" width="112" height="112" viewBox="0 0 112 112" fill="none">
              <circle className={s.ring} cx="56" cy="56" r="40" stroke="#7BDB84" strokeWidth="2" />
              <circle cx="56" cy="56" r="40" fill="#227831" />
              <path className={s.tick} d="M38 57l12 12 24-26" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <b id="buy-title">Заявка на покупку отправлена</b>
            <p>Спасибо, {done.name}! Менеджер GEOKURS свяжется с вами по номеру <strong>{done.phone}</strong>, подтвердит наличие прибора и расскажет об оплате через «Безопасную сделку».</p>
            {mini(true)}
            <ul className={x.notes}>
              <li><Icon name="shieldCheck" size={18} stroke={2} />Не отправляйте предоплату — оплата только через «Безопасную сделку»</li>
              <li><Icon name="store" size={18} stroke={2} />Получение — {done.city}</li>
            </ul>
            <button type="button" className={s.submit} onClick={onClose}>Хорошо</button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

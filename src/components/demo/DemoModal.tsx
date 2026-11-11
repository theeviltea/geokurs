import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../Icon';
import s from './DemoModal.module.css';

type Where = 'office' | 'site';
const WHERE: [Where, string][] = [['office', 'В офисе GEOKURS'], ['site', 'На вашем объекте']];

/** «Заявка на демонстрацию»: name + phone (required), where to show, city; then the «Заявка отправлена» state. */
export function DemoModal({ product, image, onClose }: { product: string; image?: string; onClose: () => void }) {
  const [where, setWhere] = useState<Where>('office');
  const [err, setErr] = useState({ name: false, phone: false, agree: false });
  const [done, setDone] = useState<{ name: string; phone: string; city: string } | null>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    dialog.current?.querySelector<HTMLElement>('input, button')?.focus();
    const body = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = body; window.removeEventListener('keydown', key); prev?.focus?.(); };
  }, [onClose]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget.elements as unknown as Record<string, HTMLInputElement>;
    const name = f.name.value.trim(), phone = f.phone.value.trim(), city = f.city.value.trim();
    const next = { name: !name, phone: phone.replace(/\D/g, '').length < 10, agree: !f.agree.checked };
    setErr(next);
    if (next.name) f.name.focus(); else if (next.phone) f.phone.focus();
    if (next.name || next.phone || next.agree) return;
    // TODO: send to the client's CRM / mail endpoint when it exists.
    setDone({ name, phone, city });
  };
  const whereText = `${WHERE.find(([k]) => k === where)?.[1]}${done?.city ? ` · ${done.city}` : ''}`;
  const mini = (small = false) => (
    <div className={`${s.product} ${small ? s.productSm : ''}`}>
      {image && <img src={image} alt="" />}
      <span>{!small && <small>Прибор</small>}<b>{product}</b>{small && <small>{whereText}</small>}</span>
    </div>
  );

  return createPortal(
    <div className={s.overlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialog} className={s.card} role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <button type="button" className={s.close} aria-label="Закрыть" onClick={onClose}><Icon name="close" size={20} stroke={2} /></button>
        {!done ? (
          <>
            <div className={s.head}>
              <span className={s.headIcon}><Icon name="play" size={26} stroke={1.7} /></span>
              <span><b id="demo-title">Заявка на демонстрацию</b><span>Покажем прибор в работе и ответим на вопросы</span></span>
            </div>
            {mini()}
            <form className={s.form} onSubmit={submit} noValidate>
              <div className={s.row}>
                <label className={s.field}><span>Имя <i>*</i></span>
                  <input name="name" autoComplete="name" placeholder="Как к вам обращаться" aria-invalid={err.name} aria-describedby={err.name ? 'demo-name-err' : undefined} className={err.name ? s.bad : ''} />
                  {err.name && <em id="demo-name-err">Укажите имя</em>}
                </label>
                <label className={s.field}><span>Телефон <i>*</i></span>
                  <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" aria-invalid={err.phone} aria-describedby={err.phone ? 'demo-phone-err' : undefined} className={err.phone ? s.bad : ''} />
                  {err.phone && <em id="demo-phone-err">Проверьте номер телефона</em>}
                </label>
              </div>
              <div className={s.field}><span id="demo-where">Где показать</span>
                <div role="radiogroup" aria-labelledby="demo-where" className={s.where}>
                  {WHERE.map(([k, label]) => (
                    <button key={k} type="button" role="radio" aria-checked={where === k} className={where === k ? s.on : ''} onClick={() => setWhere(k)}>{label}</button>
                  ))}
                </div>
              </div>
              <label className={s.field}><span>Город <small>· необязательно</small></span><input name="city" autoComplete="address-level2" placeholder="Например, Алматы" /></label>
              <label className={s.agree}>
                <input type="checkbox" name="agree" defaultChecked />
                <span>Отправляя заявку, я соглашаюсь на <a href="#">обработку персональных данных</a> в соответствии с Законом РК № 94-V.</span>
              </label>
              {err.agree && <em className={s.agreeErr}>Нужно согласие на обработку данных</em>}
              <button type="submit" className={s.submit}>Отправить заявку</button>
            </form>
          </>
        ) : (
          <div className={s.done} role="status">
            <svg className={s.ok} aria-hidden="true" width="112" height="112" viewBox="0 0 112 112" fill="none">
              <circle className={s.ring} cx="56" cy="56" r="40" stroke="#7BDB84" strokeWidth="2" />
              <circle cx="56" cy="56" r="40" fill="#227831" />
              <path className={s.tick} d="M38 57l12 12 24-26" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <b id="demo-title">Заявка отправлена</b>
            <p>Спасибо, {done.name}! Ожидайте — менеджер свяжется с вами по номеру <strong>{done.phone}</strong> в течение рабочего дня и согласует дату и место демонстрации.</p>
            {mini(true)}
            <button type="button" className={s.submit} onClick={onClose}>Хорошо</button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crumbs } from '../components/Crumbs';
import { Check, IconField } from '../components/Field';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import s from './Shop.module.css';

const PERKS = ['Статус и история ваших заказов', 'Сохранённые данные для быстрого оформления', 'Отложенные товары и сравнение'];

/** Sign-in and registration by phone or e-mail (prototype: submitting opens the account page). */
export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const navigate = useNavigate();
  const [by, setBy] = useState<'phone' | 'email'>('phone');
  const login = mode === 'login';
  const submit = (e: FormEvent) => { e.preventDefault(); navigate('/account'); };
  const idField = by === 'phone'
    ? <IconField key="phone" icon="call" type="tel" label="Номер телефона" placeholder="+7 (___) ___-__-__" autoComplete="tel" inputMode="tel" required />
    : <IconField key="email" icon="mail" type="email" label="Email" placeholder="name@company.kz" autoComplete="email" required />;

  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: login ? 'Вход' : 'Регистрация' }]} back={{ label: 'Главная', href: '/' }} />
      <div className={`${s.authGrid} ${login ? '' : s.authSingle}`}>
        <section className={`${s.card} ${s.authCard}`}>
          <div className={s.authHead}>
            <h1 className={s.h1}>{login ? 'Вход' : 'Регистрация'}</h1>
            <p className={s.lede}>{login ? 'Войдите, чтобы следить за заказами и управлять личными данными.' : 'Создайте аккаунт: так будет проще оформлять заказы и следить за ними.'}</p>
          </div>
          <form className={`${s.form} ${login ? s.formNarrow : ''}`} onSubmit={submit}>
            <div role="tablist" aria-label="Способ входа" className={s.seg}>
              <button type="button" role="tab" aria-selected={by === 'phone'} className={by === 'phone' ? s.segOn : undefined} onClick={() => setBy('phone')}>По номеру телефона</button>
              <button type="button" role="tab" aria-selected={by === 'email'} className={by === 'email' ? s.segOn : undefined} onClick={() => setBy('email')}>По email адресу</button>
            </div>
            {idField}
            <IconField icon="lock" type="password" label="Пароль" placeholder="Пароль" autoComplete={login ? 'current-password' : 'new-password'} required />
            {login ? (
              <div className={s.rowBetween}><Check defaultChecked>Запомнить меня</Check><a href="#">Забыли пароль?</a></div>
            ) : (
              <>
                <IconField icon="lock" type="password" label="Повторите пароль" placeholder="Повторите пароль" autoComplete="new-password" required />
                <Check>Я принимаю <a href="#" className={s.u}>политику конфиденциальности</a> и <a href="#" className={s.u}>условия использования</a></Check>
              </>
            )}
            <button type="submit" className={s.primary}>{login ? 'Войти' : 'Зарегистрироваться'}</button>
            <div className={s.or} aria-hidden="true"><span />или<span /></div>
            <p className={s.switchLine}>
              {login ? <>Нет аккаунта? <SmartLink href="/register">Зарегистрироваться</SmartLink></> : <>Есть аккаунт? <SmartLink href="/login">Войти</SmartLink></>}
            </p>
          </form>
        </section>
        {login && (
          <aside className={`${s.side} desktop-only`}>
            <svg className={s.sideRings} viewBox="0 0 460 460" fill="none" aria-hidden="true"><circle cx="230" cy="230" r="228" stroke="#FFFFFF" strokeOpacity="0.08" /><circle cx="230" cy="230" r="160" stroke="#FFFFFF" strokeOpacity="0.08" /><circle cx="230" cy="230" r="92" stroke="#FFFFFF" strokeOpacity="0.08" /></svg>
            <span className={s.sideTitle}>Зачем личный кабинет</span>
            <span className={s.sideText}>Всё по вашим заказам — в одном месте.</span>
            <ul className={s.perks}>
              {PERKS.map((p) => <li key={p}><span><Icon name="check" size={16} stroke={2.2} /></span>{p}</li>)}
            </ul>
          </aside>
        )}
      </div>
    </main>
  );
}

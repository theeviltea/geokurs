import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crumbs } from '../components/Crumbs';
import { Check, Field } from '../components/Field';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import s from './Shop.module.css';

const PERKS = ['Статус и история ваших заказов', 'Сохранённые данные для быстрого оформления', 'Отложенные товары и сравнение'];

/** Sign-in and registration (prototype: submitting opens the account page). */
export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const navigate = useNavigate();
  const login = mode === 'login';
  const submit = (e: FormEvent) => { e.preventDefault(); navigate('/account'); };
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: login ? 'Вход' : 'Регистрация' }]} back={{ label: 'Главная', href: '/' }} />
      <div className={s.authGrid}>
        <section className={`${s.card} ${s.authCard}`}>
          <div className={s.authHead}>
            <h1 className={s.h1}>{login ? 'Вход в личный кабинет' : 'Регистрация'}</h1>
            <p className={s.lede}>{login ? 'Войдите, чтобы следить за заказами и управлять личными данными.' : 'Создайте аккаунт: так будет проще оформлять заказы и следить за ними.'}</p>
          </div>
          {login ? (
            <form className={`${s.form} ${s.formNarrow}`} onSubmit={submit}>
              <Field label="Логин или e-mail" placeholder="name@company.kz" autoComplete="username" required />
              <Field label="Пароль" type="password" placeholder="Введите пароль" autoComplete="current-password" required aside={<a href="#">Забыли пароль?</a>} />
              <Check defaultChecked>Запомнить меня</Check>
              <button type="submit" className={s.primary}>Войти</button>
            </form>
          ) : (
            <form className={s.form} onSubmit={submit}>
              <Field label="Фамилия, имя, отчество" placeholder="Как к вам обращаться" autoComplete="name" required />
              <div className={s.pair}>
                <Field label="E-mail" type="email" placeholder="name@company.kz" autoComplete="email" required />
                <Field label="Телефон" type="tel" placeholder="+7 ___ ___ __ __" autoComplete="tel" required />
              </div>
              <div className={s.pair}>
                <Field label="Пароль" type="password" placeholder="Придумайте пароль" autoComplete="new-password" required />
                <Field label="Повторите пароль" type="password" placeholder="Ещё раз" autoComplete="new-password" required />
              </div>
              <Check defaultChecked>Я согласен на <a href="#">обработку персональных данных</a></Check>
              <button type="submit" className={s.primary}>Зарегистрироваться</button>
            </form>
          )}
        </section>
        <aside className={s.side}>
          <svg className={s.sideRings} viewBox="0 0 460 460" fill="none" aria-hidden="true"><circle cx="230" cy="230" r="228" stroke="#FFFFFF" strokeOpacity="0.08" /><circle cx="230" cy="230" r="160" stroke="#FFFFFF" strokeOpacity="0.08" /><circle cx="230" cy="230" r="92" stroke="#FFFFFF" strokeOpacity="0.08" /></svg>
          <span className={s.sideTitle}>{login ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}</span>
          <span className={s.sideText}>{login ? 'Регистрация займёт минуту.' : 'Войдите, чтобы продолжить.'}</span>
          <ul className={`${s.perks} desktop-only`}>
            {PERKS.map((p) => <li key={p}><span><Icon name="check" size={16} stroke={2.2} /></span>{p}</li>)}
          </ul>
          <SmartLink href={login ? '/register' : '/login'} className={s.sideBtn}>{login ? 'Зарегистрироваться' : 'Войти'} <Icon name="arrowRight" size={18} stroke={2} /></SmartLink>
        </aside>
      </div>
    </main>
  );
}

import { PHONE } from '../data/nav';
import { Icon } from './Icon';
import s from './RequestCta.module.css';

export function RequestCta() {
  return (
    <section className={`container ${s.wrap}`}>
      <div className={s.card}>
        <svg className={s.rings} viewBox="0 0 520 520" fill="none" aria-hidden="true">
          <circle cx="260" cy="260" r="250" stroke="#FFFFFF" strokeOpacity="0.08" />
          <circle cx="260" cy="260" r="170" stroke="#FFFFFF" strokeOpacity="0.08" />
          <circle cx="260" cy="260" r="90" stroke="#FFFFFF" strokeOpacity="0.08" />
        </svg>
        <div className={s.copy}>
          <h2 className={s.title}>Не нашли нужную модель?</h2>
          <p className={s.text}>Подберём комплект под вашу задачу и подготовим коммерческое предложение.</p>
        </div>
        <div className={s.actions}>
          <a href="#" className={s.primary}>Запросить КП</a>
          <a href="#" className={`${s.ghost} desktop-only`}><Icon name="headset" size={20} stroke={1.5} />Консультация</a>
          <a href={PHONE.mainHref} className={s.ghost}>{PHONE.main}</a>
        </div>
      </div>
    </section>
  );
}

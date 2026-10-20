import { services } from '../data/home';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './Services.module.css';

export function Services() {
  return (
    <section className={`container ${s.section}`} aria-label="Сервисы GEOKURS">
      <div className={`${s.row} no-scrollbar`}>
        {services.map((sv) => (
          <SmartLink key={sv.name} href={sv.href} className={s.card}>
            <span className={s.head}>
              <span className={s.tile} aria-hidden="true"><Icon name={sv.icon} size={22} stroke={1.6} /></span>
              <span className={s.name}>{sv.name}</span>
            </span>
            <span className={s.text}>{sv.text}</span>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}

import { img } from '../data/images';
import { SmartLink } from './SmartLink';
import s from './Promos.module.css';

export function Promos() {
  return (
    <div className={`container ${s.wrap}`}>
      <div className={s.grid}>
        <SmartLink href="/promo/baza-rover" className={`${s.card} ${s.dark}`}>
          <span className={s.eyebrow}>Акция · с 17 сентября 2026</span>
          <div className={s.copy}>
            <h3 className={s.h3}>Комплект<br />база + ровер</h3>
            <div className={s.price}>4 100 000 ₸</div>
          </div>
          <img src={img('promo-i73.webp')} alt="" className={s.receiver} loading="lazy" />
        </SmartLink>
        <a href="#" className={`${s.card} ${s.light}`}>
          <span className={s.eyebrow}>Рассрочка</span>
          <div className={s.copy}>
            <div className={s.big}>0‑0‑24</div>
            <p className={s.note}>0 ₸ первый взнос, 0% переплаты, 24 месяца</p>
          </div>
          <img src={img('p-s5.webp')} alt="" className={s.station} loading="lazy" />
        </a>
      </div>
    </div>
  );
}

import { reasons } from '../data/home';
import s from './Reasons.module.css';

export function Reasons() {
  return (
    <div className={`container ${s.wrap}`}>
      <h2 className={s.title}>Шесть причин купить в GEOKURS</h2>
      <ol className={s.list}>
        {reasons.map((r, i) => (
          <li key={r.title} className={s.item}>
            <span className={s.num}>{i + 1}</span>
            <span className={s.copy}><span className={s.itemTitle}>{r.title}</span><span className={s.text}>{r.text}</span></span>
          </li>
        ))}
      </ol>
    </div>
  );
}

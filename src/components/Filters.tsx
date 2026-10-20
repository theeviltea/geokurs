import { gnssBrands, gnssSignals, gnssTypes, type Product } from '../data/products';
import s from './Filters.module.css';

export type FilterState = { brands: string[]; types: string[]; signals: string[]; multi: boolean };
export const emptyFilters: FilterState = { brands: [], types: [], signals: [], multi: false };

type Props = {
  value: FilterState;
  onChange: (v: FilterState) => void;
  products: Product[];
  /** Larger touch targets for the phone sheet. */
  touch?: boolean;
};

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function Filters({ value, onChange, products, touch }: Props) {
  const count = (key: 'brand' | 'type', v: string) => products.filter((p) => p[key] === v).length;
  return (
    <div className={`${s.filters} ${touch ? s.touch : ''}`}>
      <fieldset className={s.group}>
        <legend>Цена, ₸</legend>
        <div className={s.price}>
          <label>от<input type="text" inputMode="numeric" placeholder="398 500" /></label>
          <label>до<input type="text" inputMode="numeric" placeholder="11 000 000" /></label>
        </div>
        {!touch && (
          <div className={s.range} aria-hidden="true">
            <span className={s.track} /><span className={s.knob} style={{ left: -2 }} /><span className={s.knob} style={{ right: -2 }} />
          </div>
        )}
      </fieldset>
      <hr />
      <fieldset className={s.group}>
        <legend>Производитель</legend>
        {gnssBrands.map((b) => (
          <label key={b} className={s.check}>
            <input type="checkbox" checked={value.brands.includes(b)} onChange={() => onChange({ ...value, brands: toggle(value.brands, b) })} />
            <span className={s.label}>{b}</span>
            <span className={s.count}>{count('brand', b)}</span>
          </label>
        ))}
      </fieldset>
      <hr />
      <fieldset className={s.group}>
        <legend>Тип приёмника</legend>
        {gnssTypes.map((t) => (
          <label key={t} className={s.check}>
            <input type="checkbox" checked={value.types.includes(t)} onChange={() => onChange({ ...value, types: toggle(value.types, t) })} />
            <span className={s.label}>{t}</span>
            <span className={s.count}>{count('type', t)}</span>
          </label>
        ))}
      </fieldset>
      <hr />
      <fieldset className={s.group}>
        <legend>Количество частот</legend>
        <label className={s.check}>
          <input type="checkbox" checked={value.multi} onChange={() => onChange({ ...value, multi: !value.multi })} />
          <span className={s.label}>Мультичастотный</span>
        </label>
      </fieldset>
      <hr />
      <fieldset className={s.group}>
        <legend>Сигналы спутников</legend>
        <div className={s.signals}>
          {gnssSignals.map((g) => {
            const on = value.signals.includes(g);
            return (
              <button key={g} type="button" aria-pressed={on} className={`${s.signal} ${on ? s.signalOn : ''}`} onClick={() => onChange({ ...value, signals: toggle(value.signals, g) })}>{g}</button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

import { navCategories, popularQueries } from '../data/navigation';
import { PHONE } from '../data/nav';
import { plural, searchCatalog } from '../lib/search';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './SearchResults.module.css';

type Props = { query: string; onPick: (q: string) => void; onGo: () => void; mobile?: boolean; id?: string };

/** Live search panel: hints for an empty query, sections and products for a match, a fallback when nothing is found. */
export function SearchResults({ query, onPick, onGo, mobile, id }: Props) {
  const r = searchCatalog(query);
  const cls = `${s.wrap} ${mobile ? s.mobile : ''}`;

  if (!r.words.length) {
    return (
      <div className={cls} id={id}>
        <div className={s.group}>
          <span className={s.label}>Часто ищут</span>
          <div className={s.chips}>
            {popularQueries.map((q) => (
              <button key={q} type="button" className={s.chip} onClick={() => onPick(q)}>
                <Icon name="search" size={14} stroke={2} color="var(--c-gray-600)" />{q}
              </button>
            ))}
          </div>
        </div>
        <div className={s.group}>
          <span className={s.label}>Категории</span>
          <div className={s.cats}>
            {navCategories.slice(0, 6).map((c) => (
              <SmartLink key={c.key} href={c.href} className={s.cat} onClick={onGo}>
                <span className={s.thumb}><img src={c.image} alt="" /></span>{c.name}
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!r.total && !r.sections.length) {
    return (
      <div className={cls} id={id}>
        <div className={s.none}>
          <span className={s.noneIcon}><Icon name="search" size={24} stroke={2} /></span>
          <b>Ничего не нашли по запросу «{query.trim()}»</b>
          <span>Проверьте написание или позвоните: подберём прибор под вашу задачу.</span>
          <a href={PHONE.mainHref} className={s.call}><Icon name="call" size={18} stroke={1.8} />{PHONE.main}</a>
        </div>
      </div>
    );
  }

  return (
    <div className={cls} id={id}>
      {r.sections.length > 0 && (
        <div className={s.group}>
          <span className={s.label}>Разделы</span>
          <div className={s.chips}>
            {r.sections.map((x) => <SmartLink key={x.name} href={x.href} className={s.chip} onClick={onGo}>{x.name}</SmartLink>)}
          </div>
        </div>
      )}
      {r.items.length > 0 && (
        <div className={s.group}>
          <div className={s.labelRow}><span className={s.label}>Товары</span><span>{r.total} {plural(r.total)}</span></div>
          <ul className={s.items}>
            {r.items.map((p) => (
              <li key={p.key}>
                <SmartLink href={p.href} className={s.item} onClick={onGo}>
                  <span className={s.thumbLg}><img src={p.image} alt="" /></span>
                  <span className={s.itemText}>
                    <span className={s.itemName}>{p.parts[0]}<mark>{p.parts[1]}</mark>{p.parts[2]}</span>
                    <span className={s.itemMeta}>{p.catName}{mobile && <> · <b>{p.price ?? 'По запросу'}</b></>}</span>
                  </span>
                  {!mobile && <span className={s.price}>{p.price ?? 'По запросу'}</span>}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      <SmartLink href="/catalog/gnss-oborudovanie" className={s.all} onClick={onGo}>
        <span>Все результаты по запросу «{query.trim()}»</span><Icon name="arrowRight" size={16} stroke={2} />
      </SmartLink>
    </div>
  );
}

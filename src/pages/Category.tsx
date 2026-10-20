import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Filters, emptyFilters, type FilterState } from '../components/Filters';
import { Icon } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { RequestCta } from '../components/RequestCta';
import { GNSS_TOTAL, gnssProducts, gnssSubcategories, type Product } from '../data/products';
import s from './Category.module.css';

type Sort = 'pop' | 'asc' | 'desc' | 'new' | 'az';
const sorters: Record<Sort, (a: Product, b: Product) => number> = {
  pop: (a, b) => a.pop - b.pop,
  asc: (a, b) => a.price - b.price,
  desc: (a, b) => b.price - a.price,
  new: (a, b) => Number(!!b.isNew) - Number(!!a.isNew) || a.pop - b.pop,
  az: (a, b) => a.name.localeCompare(b.name, 'ru'),
};
const plural = (n: number) =>
  n % 10 === 1 && n % 100 !== 11 ? 'товар' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'товара' : 'товаров';
const PAGE = 12;

export function Category() {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<Sort>('pop');
  const [sub, setSub] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [sheet, setSheet] = useState(false);

  useEffect(() => { document.title = 'GNSS-оборудование — GEOKURS'; return () => { document.title = 'GEOKURS — интернет-магазин геодезического оборудования'; }; }, []);
  useEffect(() => {
    if (!sheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [sheet]);

  const change = (v: FilterState) => { setFilters(v); setShowAll(false); };
  const list = useMemo(
    () => gnssProducts
      .filter((p) => (!filters.brands.length || filters.brands.includes(p.brand)) && (!filters.types.length || (p.type && filters.types.includes(p.type))))
      .sort(sorters[sort]),
    [filters, sort],
  );
  const shown = showAll ? list : list.slice(0, PAGE);
  const chips = [...filters.brands.map((b) => ({ name: b, key: 'brands' as const })), ...filters.types.map((t) => ({ name: t, key: 'types' as const }))];
  const hasActive = chips.length > 0;
  const foundLabel = `${list.length} ${plural(list.length)}`;
  const reset = () => change(emptyFilters);

  return (
    <main>
      <section className={`container ${s.title}`}>
        <nav aria-label="Хлебные крошки" className={`${s.crumbs} desktop-only`}>
          <Link to="/">Главная</Link><span aria-hidden="true">/</span>
          <a href="#">Каталог</a><span aria-hidden="true">/</span>
          <span aria-current="page">GNSS-оборудование</span>
        </nav>
        <Link to="/" className={`${s.back} mobile-only`}><Icon name="chevronLeft" size={16} stroke={2} />Каталог</Link>
        <div className={s.h1Row}>
          <h1 className={s.h1}>GNSS-оборудование</h1>
          <span className={s.total}>{GNSS_TOTAL} товаров</span>
        </div>
        <div className={`${s.subs} no-scrollbar`}>
          {gnssSubcategories.map((c) => (
            <button key={c.id} type="button" aria-pressed={sub === c.id} className={`${s.sub} ${sub === c.id ? s.subOn : ''}`} onClick={() => setSub(c.id)}>
              {c.name}<span className={s.subCount}>{c.count}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={`container ${s.body}`}>
        <aside aria-label="Фильтры" className={`${s.aside} desktop-only`}>
          <div className={s.asideHead}>
            <span className={s.asideTitle}>Фильтры</span>
            <button type="button" className={s.reset} onClick={reset}>Сбросить</button>
          </div>
          <Filters value={filters} onChange={change} products={gnssProducts} />
          <button type="button" className={s.apply}>Показать {hasActive ? foundLabel : `${GNSS_TOTAL} товаров`}</button>
        </aside>

        <div className={s.main}>
          <div className={s.toolbar}>
            <div className={`${s.status} desktop-only`}>
              {hasActive ? (
                <>
                  <span>Найдено {foundLabel}</span>
                  {chips.map((c) => (
                    <button key={c.name} type="button" className={s.chip} aria-label={`Убрать фильтр ${c.name}`} onClick={() => change({ ...filters, [c.key]: filters[c.key].filter((x) => x !== c.name) })}>
                      {c.name}<Icon name="close" size={16} stroke={2} />
                    </button>
                  ))}
                </>
              ) : (
                <span>Показано {shown.length} из {GNSS_TOTAL}</span>
              )}
            </div>
            <button type="button" className={`${s.filterBtn} mobile-only`} onClick={() => setSheet(true)} aria-haspopup="dialog">
              <Icon name="filter" size={18} stroke={1.5} />Фильтры{hasActive && <span className={s.filterCount}>{chips.length}</span>}
            </button>
            <label className={s.sortLabel}>
              <span className="desktop-only">Сортировать</span>
              <span className="sr-only">Сортировка</span>
              <span className={s.selectWrap}>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                  <option value="pop">По популярности</option>
                  <option value="asc">Сначала недорогие</option>
                  <option value="desc">Сначала дорогие</option>
                  <option value="new">Сначала новинки</option>
                  <option value="az">По названию А–Я</option>
                </select>
                <Icon name="chevronDown" size={16} stroke={2} />
              </span>
            </label>
          </div>

          {list.length > 0 ? (
            <div className={s.grid}>
              {shown.map((p) => <ProductCard key={p.id} product={p} badges />)}
            </div>
          ) : (
            <div className={s.empty}>
              <span className={s.emptyTitle}>Ничего не нашлось</span>
              <span>Попробуйте убрать часть фильтров</span>
              <button type="button" className={s.more} onClick={reset}>Сбросить фильтры</button>
            </div>
          )}

          <div className={s.pager}>
            <span className={`${s.shown} mobile-only`}>Показано {shown.length} из {GNSS_TOTAL}</span>
            {!showAll && list.length > PAGE && <button type="button" className={s.more} onClick={() => setShowAll(true)}>Показать ещё</button>}
            <nav aria-label="Страницы" className={`${s.pages} desktop-only`}>
              <button type="button" aria-label="Предыдущая страница" disabled><Icon name="chevronLeft" size={18} stroke={2} /></button>
              <a href="#" aria-current="page" className={s.pageOn}>1</a>
              <a href="#">2</a><a href="#">3</a><span>…</span><a href="#">6</a>
              <a href="#" aria-label="Следующая страница"><Icon name="chevronRight" size={18} stroke={2} /></a>
            </nav>
          </div>
        </div>
      </section>

      <RequestCta />

      {/* Phone filter sheet */}
      <div className={`${s.sheet} ${sheet ? s.sheetOpen : ''}`} role="dialog" aria-modal="true" aria-label="Фильтры" aria-hidden={!sheet}>
        <div className={s.sheetHead}>
          <h2 className={s.sheetTitle}>Фильтры</h2>
          <button type="button" aria-label="Закрыть фильтры" className={s.sheetClose} onClick={() => setSheet(false)}><Icon name="close" stroke={1.8} /></button>
        </div>
        <div className={`${s.sheetBody} no-scrollbar`}>
          <Filters value={filters} onChange={change} products={gnssProducts} touch />
        </div>
        <div className={s.sheetFoot}>
          <button type="button" className={s.sheetReset} onClick={reset}>Сбросить</button>
          <button type="button" className={s.sheetApply} onClick={() => setSheet(false)}>Показать {hasActive ? foundLabel : `${GNSS_TOTAL} товаров`}</button>
        </div>
      </div>
    </main>
  );
}

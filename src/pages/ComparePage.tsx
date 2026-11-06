import { useEffect, useRef, useState } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { compareKeys, compareSpecs } from '../data/account';
import { navCategories, type NavProduct } from '../data/navigation';
import { plural } from '../lib/search';
import { navByKey } from '../lib/products';
import { store, useStore } from '../lib/store';
import s from './Shop.module.css';

const LEAD = 304; // label column with the row insets, px
const COL = 250; // min product column width, px — more products than fit scroll sideways

/** Spec table for one category: the demo GNSS specs, or the basics every product has. */
function specsFor(cat: string, prods: NavProduct[]) {
  if (cat === 'gnss') {
    const idx = prods.map((p) => compareKeys.indexOf(p.key));
    return compareSpecs.map((g) => ({ group: g.group, rows: g.rows.map(([label, vals]) => ({ label, v: idx.map((i) => (i >= 0 ? vals[i] : '—')) })) }));
  }
  return [{ group: 'Основное', rows: [{ label: 'Бренд', v: prods.map((p) => p.brand) }, { label: 'Цена', v: prods.map((p) => p.price ?? 'По запросу') }] }];
}

export function ComparePage() {
  const st = useStore();
  const [diff, setDiff] = useState(false);
  const [off, setOff] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const head = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ left: false, right: false });

  // Products are compared only within their own category: one tab per category.
  const all = st.compare.map((k) => navByKey[k]).filter(Boolean);
  const cats = navCategories.map((c) => ({ key: c.key, name: c.name, items: all.filter((p) => p.cat === c.key) })).filter((c) => c.items.length > 0);
  const other = all.filter((p) => !navCategories.some((c) => c.key === p.cat));
  if (other.length) cats.push({ key: 'other', name: 'Другое', items: other });
  const cur = cats.find((c) => c.key === picked) ?? cats[0];
  const prods = cur?.items ?? [];
  const n = prods.length;
  const start = Math.min(off, Math.max(0, n - 2));
  const groups = specsFor(cur?.key ?? '', prods)
    .map((g) => ({ group: g.group, rows: g.rows.map((r) => ({ ...r, same: r.v.every((x) => x === r.v[0]) })).filter((r) => !diff || !r.same) }))
    .filter((g) => g.rows.length > 0);
  const width = { minWidth: `${LEAD + n * COL}px` };
  // one or two products keep a card-sized column instead of stretching across the table
  const cols = { gridTemplateColumns: `repeat(${Math.max(n, 1)}, minmax(${COL}px, ${n < 3 ? "340px" : "1fr"}))` };

  // Header and body scroll sideways together; arrows appear when there is more to see.
  const sync = () => {
    const b = body.current;
    if (!b) return;
    if (head.current) head.current.scrollLeft = b.scrollLeft;
    const left = b.scrollLeft > 4, right = b.scrollLeft + b.clientWidth < b.scrollWidth - 4;
    setEdge((e) => (e.left === left && e.right === right ? e : { left, right }));
  };
  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  });
  const nudge = (dir: number) => body.current?.scrollBy({ left: dir * COL, behavior: 'smooth' });
  const choose = (key: string) => { setPicked(key); setOff(0); if (body.current) body.current.scrollLeft = 0; };
  const clear = () => (cats.length > 1 ? prods.forEach((p) => store.uncompare(p.key)) : store.clearCompare());

  const toggle = (
    <button type="button" role="switch" aria-checked={diff} className={s.switch} onClick={() => setDiff((d) => !d)}>
      <span className={`${s.track} ${diff ? s.trackOn : ''}`}><span /></span>Только различия
    </button>
  );

  return (
    <main className={`container ${s.page} ${s.pageBottom}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сравнение товаров' }]} back={{ label: 'Главная', href: '/' }} />
      <div className={s.titleRow}><h1 className={s.h1}><span className="desktop-only">Сравнение товаров</span><span className="mobile-only">Сравнение</span></h1>{all.length > 0 && <span>{all.length} {plural(all.length)}</span>}</div>
      {n === 0 ? (
        <section className={`${s.card} ${s.empty}`}>
          <span className={s.emptyIcon}><Icon name="compare" size={32} stroke={1.6} /></span>
          <b>Список сравнения пуст</b>
          <span>Добавляйте товары кнопкой со значком весов на карточке, чтобы сравнить характеристики.</span>
          <div className={s.emptyBtns}>
            <SmartLink href="/catalog" className={s.primarySm}>Перейти в каталог</SmartLink>
            <button type="button" className={s.ghost} onClick={store.restoreCompare}>Вернуть товары</button>
          </div>
        </section>
      ) : (
        <>
          <div className={s.cmpBar}>
            <div role="tablist" aria-label="Категории сравнения" className={`${s.cmpTabs} no-scrollbar`}>
              {cats.map((c) => (
                <button key={c.key} type="button" role="tab" aria-selected={c.key === cur.key} className={`${s.chip} ${c.key === cur.key ? '' : s.chipOff}`} onClick={() => choose(c.key)}>
                  {c.name} <span>{c.items.length}</span>
                </button>
              ))}
            </div>
            <div className={s.cmpTools}>
              {toggle}
              <button type="button" className={s.clearBtn} onClick={clear} aria-label={cats.length > 1 ? 'Очистить категорию' : 'Очистить список'}><Icon name="trash" size={18} stroke={1.6} /><span className="desktop-only">{cats.length > 1 ? 'Очистить категорию' : 'Очистить список'}</span></button>
            </div>
          </div>
          {n > 2 && (
            <div className={`${s.pager} mobile-only`}>
              <button type="button" aria-label="Предыдущие" disabled={start === 0} onClick={() => setOff(start - 1)}><Icon name="chevronLeft" size={18} stroke={2} /></button>
              <span>{start + 1}–{start + 2} из {n}</span>
              <button type="button" aria-label="Следующие" disabled={start + 2 >= n} onClick={() => setOff(start + 1)}><Icon name="chevronRight" size={18} stroke={2} /></button>
            </div>
          )}
          {/* Desktop: table that scrolls sideways when the products don't fit; the label column stays put */}
          <section aria-label={`Таблица сравнения: ${cur.name}`} className={`${s.card} ${s.cmpTable} desktop-only`}>
            <div className={s.cmpHeadWrap}>
              <div ref={head} className={s.cmpHeadScroll}>
                <div className={s.cmpHead} style={width}>
                  <div className={s.cmpLead}>
                    <b>Характеристики</b>Совпадающие значения — обычным шрифтом, различия выделены.
                    {(edge.left || edge.right) && (
                      <span className={s.cmpArrows}>
                        <button type="button" aria-label="Прокрутить влево" disabled={!edge.left} onClick={() => nudge(-1)}><Icon name="chevronLeft" size={18} stroke={2} /></button>
                        <button type="button" aria-label="Прокрутить вправо" disabled={!edge.right} onClick={() => nudge(1)}><Icon name="chevronRight" size={18} stroke={2} /></button>
                      </span>
                    )}
                  </div>
                  <div className={s.cmpCols} style={cols}>
                    {prods.map((p) => (
                      <div key={p.key} className={s.cmpProd}>
                        <button type="button" aria-label="Убрать из сравнения" className={s.cmpX} onClick={() => store.uncompare(p.key)}><Icon name="close" size={16} stroke={2} /></button>
                        <SmartLink href={p.href} className={s.cmpMedia}><img src={p.image} alt={p.name} /></SmartLink>
                        <SmartLink href={p.href} className={s.cmpName}>{p.name}</SmartLink>
                        <div className={s.cmpBuy}><b>{p.price ?? 'По запросу'}</b>{p.price && <button type="button" className={s.buySm} onClick={() => store.addToCart(p)}>В корзину</button>}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {edge.left && <span aria-hidden="true" className={`${s.cmpFade} ${s.cmpFadeL}`} />}
              {edge.right && <span aria-hidden="true" className={`${s.cmpFade} ${s.cmpFadeR}`} />}
            </div>
            <div ref={body} className={s.cmpBodyScroll} onScroll={sync}>
              <div style={width}>
                {groups.map((g) => (
                  <div key={g.group}>
                    <div className={s.cmpGroup}><span>{g.group}</span></div>
                    <div className={s.rows}>
                      {g.rows.map((r) => (
                        <div key={r.label} className={s.cmpRow}>
                          <span className={s.cmpLabel}>{r.label}</span>
                          <div className={s.cmpCols} style={cols}>{r.v.map((v, i) => <span key={i} className={r.same ? undefined : s.diff}>{v}</span>)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Phones: two products side by side */}
          <div className={`${s.cmpMobile} mobile-only`}>
            <div className={s.cmpPair}>
              {prods.slice(start, start + 2).map((p) => (
                <article key={p.key} className={s.mini}>
                  <button type="button" aria-label="Убрать из сравнения" className={s.miniX} onClick={() => store.uncompare(p.key)}><Icon name="close" size={16} stroke={2} /></button>
                  <SmartLink href={p.href} className={s.miniMedia}><img src={p.image} alt={p.name} /></SmartLink>
                  <SmartLink href={p.href} className={s.miniName}>{p.name}</SmartLink>
                  <span className={s.miniPrice}>{p.price ?? 'По запросу'}</span>
                  {p.price && <button type="button" className={s.miniBuy} onClick={() => store.addToCart(p)}><Icon name="cartAlt" size={16} />В корзину</button>}
                </article>
              ))}
            </div>
            {groups.map((g) => (
              <section key={g.group} className={`${s.card} ${s.cmpCard}`}>
                <div className={s.cmpGroupSm}>{g.group}</div>
                <div className={s.rows}>
                  {g.rows.map((r) => (
                    <div key={r.label} className={s.cmpRowSm}>
                      <span>{r.label}</span>
                      <div>{r.v.slice(start, start + 2).map((v, i) => <span key={i} className={r.same ? undefined : s.diff}>{v}</span>)}</div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

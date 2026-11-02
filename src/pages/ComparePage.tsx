import { useState } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { compareKeys, compareSpecs } from '../data/account';
import { plural } from '../lib/search';
import { navByKey } from '../lib/products';
import { store, useStore } from '../lib/store';
import s from './Shop.module.css';

export function ComparePage() {
  const st = useStore();
  const [diff, setDiff] = useState(false);
  const [off, setOff] = useState(0);
  const idx = compareKeys.map((k, i) => (st.compare.includes(k) ? i : -1)).filter((i) => i >= 0);
  const prods = idx.map((i) => navByKey[compareKeys[i]]);
  const n = prods.length;
  const start = Math.min(off, Math.max(0, n - 2));
  const groups = compareSpecs.map((g) => ({
    group: g.group,
    rows: g.rows.map(([label, vals]) => {
      const v = idx.map((i) => vals[i]);
      return { label, v, same: v.every((x) => x === v[0]) };
    }).filter((r) => !diff || !r.same),
  })).filter((g) => g.rows.length > 0);
  const cols = { gridTemplateColumns: `repeat(${Math.max(n, 1)}, minmax(0, 1fr))` };

  const toggle = (
    <button type="button" role="switch" aria-checked={diff} className={s.switch} onClick={() => setDiff((d) => !d)}>
      <span className={`${s.track} ${diff ? s.trackOn : ''}`}><span /></span>Только различия
    </button>
  );
  const chip = <span className={s.chip}>GNSS-оборудование <span>{n}</span></span>;

  return (
    <main className={`container ${s.page} ${s.pageBottom}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сравнение товаров' }]} back={{ label: 'Главная', href: '/' }} />
      <div className={s.titleRow}><h1 className={s.h1}><span className="desktop-only">Сравнение товаров</span><span className="mobile-only">Сравнение</span></h1>{n > 0 && <span>{n} {plural(n)}</span>}</div>
      {n === 0 ? (
        <section className={`${s.card} ${s.empty}`}>
          <span className={s.emptyIcon}><Icon name="compare" size={32} stroke={1.6} /></span>
          <b>Список сравнения пуст</b>
          <span>Добавляйте товары кнопкой со значком весов на карточке, чтобы сравнить характеристики.</span>
          <div className={s.emptyBtns}>
            <SmartLink href="/catalog/gnss-oborudovanie" className={s.primarySm}>Перейти в каталог</SmartLink>
            <button type="button" className={s.ghost} onClick={store.restoreCompare}>Вернуть товары</button>
          </div>
        </section>
      ) : (
        <>
          <div className={s.cmpBar}>
            {chip}
            <div className={s.cmpTools}>
              {toggle}
              <button type="button" className={s.clearBtn} onClick={store.clearCompare} aria-label="Очистить список"><Icon name="trash" size={18} stroke={1.6} /><span className="desktop-only">Очистить список</span></button>
            </div>
          </div>
          {n > 2 && (
            <div className={`${s.pager} mobile-only`}>
              <button type="button" aria-label="Предыдущие" disabled={start === 0} onClick={() => setOff(start - 1)}><Icon name="chevronLeft" size={18} stroke={2} /></button>
              <span>{start + 1}–{start + 2} из {n}</span>
              <button type="button" aria-label="Следующие" disabled={start + 2 >= n} onClick={() => setOff(start + 1)}><Icon name="chevronRight" size={18} stroke={2} /></button>
            </div>
          )}
          {/* Desktop: full table */}
          <section aria-label="Таблица сравнения" className={`${s.card} ${s.cmpTable} desktop-only`}>
            <div className={s.cmpHead}>
              <div className={s.cmpLead}><b>Характеристики</b>Совпадающие значения — обычным шрифтом, различия выделены.</div>
              <div className={s.cmpCols} style={cols}>
                {prods.map((p) => (
                  <div key={p.key} className={s.cmpProd}>
                    <button type="button" aria-label="Убрать из сравнения" className={s.cmpX} onClick={() => store.uncompare(p.key)}><Icon name="close" size={16} stroke={2} /></button>
                    <SmartLink href={p.href} className={s.cmpMedia}><img src={p.image} alt={p.name} /></SmartLink>
                    <SmartLink href={p.href} className={s.cmpName}>{p.name}</SmartLink>
                    <div className={s.cmpBuy}><b>{p.price ?? 'По запросу'}</b><button type="button" className={s.buySm}>В корзину</button></div>
                  </div>
                ))}
              </div>
            </div>
            {groups.map((g) => (
              <div key={g.group}>
                <div className={s.cmpGroup}>{g.group}</div>
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
                  <button type="button" className={s.miniBuy}><Icon name="cartAlt" size={16} />В корзину</button>
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

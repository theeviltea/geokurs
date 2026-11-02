import { useState } from 'react';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { SmartLink } from '../components/SmartLink';
import { navCategories } from '../data/navigation';
import { plural } from '../lib/search';
import { asCard, navByKey } from '../lib/products';
import { store, useStore } from '../lib/store';
import s from './Favorites.module.css';

const POPULAR = ['r780', 'tbc', 'glm100', 'apache6'];
const catName = Object.fromEntries(navCategories.map((c) => [c.key, c.name]));
const HEART = 'M2,8.69C2,13.03 7.59,17.86 10.41,19.97C11.36,20.68 12.64,20.68 13.59,19.97C16.41,17.86 22,13.03 22,8.69C22,5.83 19.89,3.5 17,3.5C15.5,3.5 14,4 12,6C10,4 8.5,3.5 7,3.5C4.11,3.5 2,5.83 2,8.69Z';

export function FavoritesPage() {
  const st = useStore();
  const [f, setF] = useState('all');
  const [added, setAdded] = useState(false);
  const list = st.fav.map((k) => navByKey[k]);
  const cats: { key: string; name: string; n: number }[] = [];
  list.forEach((p) => { const c = cats.find((x) => x.key === p.cat); if (c) c.n += 1; else cats.push({ key: p.cat, name: catName[p.cat], n: 1 }); });
  const filter = f === 'all' || cats.some((c) => c.key === f) ? f : 'all';
  const shown = list.filter((p) => filter === 'all' || p.cat === filter);
  const n = list.length;

  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Избранное' }]} back={{ label: 'Главная', href: '/' }} />
      <div className={s.head}>
        <div className={s.title}><h1 className={s.h1}>Избранное</h1>{n > 0 && <span>{n} {plural(n)}</span>}</div>
        {n > 0 && <button type="button" className={`${s.clearIcon} mobile-only`} aria-label="Очистить избранное" onClick={store.clearFav}><Icon name="trash" size={18} stroke={1.6} /></button>}
      </div>
      {n > 0 ? (
        <>
          <div className={s.bar}>
            <div className={`${s.chips} no-scrollbar`}>
              {[{ key: 'all', name: 'Все', n }, ...cats].map((c) => (
                <button key={c.key} type="button" aria-pressed={filter === c.key} className={`${s.chip} ${filter === c.key ? s.chipOn : ''}`} onClick={() => setF(c.key)}>{c.name}<span>{c.n}</span></button>
              ))}
            </div>
            <div className={`${s.tools} desktop-only`}>
              <button type="button" className={s.addAll} onClick={() => { store.favToCart(st.fav.filter((k) => navByKey[k].price)); setAdded(true); }}><Icon name="cartAlt" size={18} />{added ? 'Добавлено в корзину' : 'Добавить всё в корзину'}</button>
              <button type="button" className={s.clear} onClick={store.clearFav}><Icon name="trash" size={18} stroke={1.6} />Очистить</button>
            </div>
          </div>
          <div className={s.grid}>
            {shown.map((p, i) => (
              <div key={p.key} className={s.cell}>
                <ProductCard product={asCard(p.key, i)} meta={`${catName[p.cat]} · ${p.brand}`} variant="carousel" className={s.cardFix} />
                <button type="button" aria-label="Убрать из избранного" className={s.heart} onClick={() => store.unfav(p.key)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d={HEART} /></svg>
                </button>
              </div>
            ))}
          </div>
          <button type="button" className={`${s.addAllM} mobile-only`} onClick={() => { store.favToCart(st.fav.filter((k) => navByKey[k].price)); setAdded(true); }}><Icon name="cartAlt" size={18} />{added ? 'Добавлено в корзину' : 'Добавить всё в корзину'}</button>
        </>
      ) : (
        <>
          <section className={s.empty}>
            <span className={s.emptyIcon}><Icon name="fav" size={32} stroke={1.6} /></span>
            <b>В избранном пока пусто</b>
            <span>Нажимайте на сердечко на карточке товара, чтобы вернуться к нему позже.</span>
            <SmartLink href="/catalog" className={s.toCatalog}>Перейти в каталог</SmartLink>
          </section>
          <h2 className={s.h2}>Популярные товары</h2>
          <div className={`${s.popular} no-scrollbar`}>
            {POPULAR.map((k, i) => <ProductCard key={k} product={asCard(k, i)} variant="carousel" />)}
          </div>
        </>
      )}
    </main>
  );
}

import { Navigate, useParams } from 'react-router-dom';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { navCategories } from '../data/navigation';
import { PHONE } from '../data/nav';
import { navByKey } from '../lib/products';
import s from './Catalog.module.css';

const subLabel = (n: number) => !n ? 'Смотреть товары' : `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'подраздел' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'подраздела' : 'подразделов'}`;
const openSearch = () => window.dispatchEvent(new Event('gk:open-search'));

function Cta() {
  return (
    <section className={s.cta}>
      <svg className={s.ctaRings} viewBox="0 0 360 360" fill="none" aria-hidden="true"><circle cx="180" cy="180" r="170" stroke="#FFFFFF" strokeOpacity="0.08" /><circle cx="180" cy="180" r="110" stroke="#FFFFFF" strokeOpacity="0.08" /></svg>
      <div className={s.ctaText}><h2>Не нашли нужное оборудование?</h2><p>Подберём комплект и подготовим коммерческое предложение.</p></div>
      <div className={s.ctaBtns}><a href="#" className={s.ctaMain}>Запросить КП</a><a href={PHONE.mainHref} className={s.ctaGhost}>{PHONE.main}</a></div>
    </section>
  );
}

/** «Каталог»: all sections — cards on desktop, tiles on phones. */
export function CatalogPage() {
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Каталог' }]} back={{ label: 'Главная', href: '/' }} />
      <div className={s.head}>
        <h1 className={s.h1}>Каталог</h1>
        <button type="button" className={s.search} onClick={openSearch}><Icon name="search" size={18} stroke={2} />Поиск по каталогу</button>
      </div>
      <div className={s.grid}>
        {navCategories.map((c) => {
          const ex = c.products.slice(0, 2).map((k) => navByKey[k].name).join(', ');
          return (
            <article key={c.key} className={s.card}>
              <SmartLink href={`/catalog/s/${c.key}`} className={s.media}><img src={c.image} alt="" loading="lazy" /></SmartLink>
              <div className={s.body}>
                <SmartLink href={`/catalog/s/${c.key}`} className={s.name}>{c.name}</SmartLink>
                <span className={`${s.count} mobile-only`}>{subLabel(c.subs.length)}</span>
                <div className={`${s.desc} desktop-only`}>
                  {c.subs.length ? (
                    <div className={s.subs}>
                      {c.subs.slice(0, 6).map((x) => <SmartLink key={x.name} href={x.href} className={s.sub}>{x.name}</SmartLink>)}
                      {c.subs.length > 6 && <SmartLink href={`/catalog/s/${c.key}`} className={`${s.sub} ${s.more}`}>ещё {c.subs.length - 6}</SmartLink>}
                    </div>
                  ) : <span className={s.ex}>Например: {ex}</span>}
                </div>
                <SmartLink href={c.href} className={`${s.all} desktop-only`}>Все товары раздела <Icon name="arrowRight" size={16} stroke={2} /></SmartLink>
              </div>
            </article>
          );
        })}
      </div>
      <Cta />
    </main>
  );
}

/** One section: subsections and popular products (used from the phone catalog). */
export function CatalogSectionPage() {
  const { key } = useParams();
  const c = navCategories.find((x) => x.key === key);
  if (!c) return <Navigate to="/catalog" replace />;
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Каталог', href: '/catalog' }, { label: c.name }]} back={{ label: 'Каталог', href: '/catalog' }} />
      <div className={s.secHead}><span className={s.secIcon}><img src={c.image} alt="" /></span><h1 className={s.h1}>{c.name}</h1></div>
      <nav aria-label="Подразделы" className={s.secList}>
        <SmartLink href={c.href} className={`${s.secRow} ${s.secAll}`}>Все товары раздела<Icon name="arrowRight" size={18} stroke={2} /></SmartLink>
        {c.subs.map((x) => <SmartLink key={x.name} href={x.href} className={s.secRow}>{x.name}<Icon name="chevronRight" size={18} stroke={2} color="var(--c-gray-600)" /></SmartLink>)}
      </nav>
      <h2 className={s.h2}>Популярное в разделе</h2>
      <div className={`${s.pop} no-scrollbar`}>
        {c.products.map((k) => navByKey[k]).map((p) => (
          <article key={p.key} className={s.mini}>
            <SmartLink href={p.href} className={s.miniMedia}><img src={p.image} alt={p.name} /></SmartLink>
            <SmartLink href={p.href} className={s.miniName}>{p.name}</SmartLink>
            <span className={s.miniPrice}>{p.price ?? 'По запросу'}</span>
            <button type="button" className={s.miniBuy}><Icon name="cartAlt" size={16} />{p.price ? 'В корзину' : 'Узнать цену'}</button>
          </article>
        ))}
      </div>
      <Cta />
    </main>
  );
}

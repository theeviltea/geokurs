import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SimilarStrip } from '../components/SimilarStrip';
import { SmartLink } from '../components/SmartLink';
import { productBySlug, type ProductDetail } from '../data/catalog';
import { img } from '../data/images';
import { navProducts } from '../data/navigation';
import { FavIcon } from '../components/ProductCard';
import { store, useStore, type Item } from '../lib/store';

/** «Рекомендуем» under the product (phones): products that have their own page. */
const RECOMMEND = ['i73', 's5', 'x9core', 'gtx24', 'x500', 'tbc', 'glm100'];
import s from './Product.module.css';

const SERVICE = [
  { name: 'Метрология', text: 'Поверка и калибровка оборудования', href: '/services/metrology' },
  { name: 'Сервисный центр', text: 'Ремонт и диагностика приборов', href: '/services/repair' },
  { name: 'Техподдержка 24/7', text: 'Помощь с приборами и ПО', href: '/services/support' },
  { name: 'Trade-in', text: 'Обмен старого прибора на новый', href: 'https://geokurs.kz/services/trade-in' },
];

const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Cart / favourites entry for a product page (menu key when the product is in the menu data). */
const itemOf = (p: ProductDetail): Item => {
  const nav = navProducts.find((x) => x.href === `/product/${p.slug}`);
  return { key: nav?.key ?? `p:${p.slug}`, name: p.name, brand: p.brand, price: p.price != null ? `${p.priceFrom ? 'от ' : ''}${fmt(p.price)} ₸` : null, image: p.shots[0]?.src ?? '', cat: nav?.cat, href: `/product/${p.slug}` };
};

type TabId = 'desc' | 'specs' | 'kit' | 'service';

function Gallery({ p }: { p: ProductDetail }) {
  const shots = [...p.shots.map((x) => ({ ...x, video: false })), { src: '', alt: 'Видеообзор', dark: true, video: true }];
  const [sel, setSel] = useState(0);
  const cur = shots[sel];
  const st = useStore();
  const item = itemOf(p);
  const faved = st.fav.includes(item.key);
  return (
    <div className={s.gallery}>
      <div role="tablist" aria-label="Фото товара" className={s.thumbs}>
        {shots.map((t, i) => (
          <button key={i} type="button" role="tab" aria-selected={i === sel} aria-label={t.alt} onClick={() => setSel(i)} className={`${s.thumb} ${t.video ? s.thumbVideo : ''} ${i === sel ? s.thumbOn : ''}`}>
            {t.video ? <Icon name="play" size={26} stroke={1.8} /> : <img src={t.src} alt="" />}
          </button>
        ))}
      </div>
      <div className={`${s.stage} ${cur.video ? s.stageVideo : cur.dark ? s.stageDark : ''}`}>
        <svg className={s.rings} viewBox="0 0 520 520" fill="none" aria-hidden="true">
          <circle cx="260" cy="260" r="250" /><circle cx="260" cy="260" r="170" /><path d="M260 0v520M0 260h520" />
        </svg>
        {cur.video ? (
          <span className={s.video}><span className={s.play}><Icon name="play" size={34} stroke={1.8} /></span><span className={s.videoLabel}>Видеообзор</span></span>
        ) : (
          <img src={cur.src} alt={cur.alt} className={s.main} style={{ maxHeight: `min(${p.maxH}px, 100%)`, maxWidth: `${p.maxW}%` }} />
        )}
        {p.hit && <span className={s.hit}>Хит</span>}
        <button type="button" aria-label={faved ? 'Убрать из избранного' : 'В избранное'} aria-pressed={faved} className={`${s.stageFav} ${faved ? s.favOn : ''} mobile-only`} onClick={() => store.toggleFav(item)}><FavIcon on={faved} size={22} /></button>
        <span className={`${s.counter} desktop-only`}>{sel + 1} / {shots.length}</span>
        <div role="tablist" aria-label="Фото товара" className={`${s.dots} mobile-only`}>
          {shots.map((t, i) => (
            <button key={i} type="button" role="tab" aria-selected={i === sel} aria-label={t.alt} onClick={() => setSel(i)}><span className={i === sel ? s.dotOn : ''} /></button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuyBox({ p }: { p: ProductDetail }) {
  const [qty, setQty] = useState(1);
  const [vi, setVi] = useState(0);
  const v = p.variants?.options[vi];
  const price = v ? v[1] : p.price;
  const priced = price != null;
  const st = useStore();
  const item = itemOf(p);
  // Each variant is its own cart line; favourites and compare keep the product itself.
  const cartItem = v ? { ...item, key: `${item.key}~${v[0]}`, name: `${p.name}, ${p.variants!.title.toLowerCase()} ${v[0]}`, price: `${fmt(v[1])} ₸` } : item;
  const faved = st.fav.includes(item.key);
  return (
    <div className={s.buy}>
      {p.variants && (
        <div className={s.variants}>
          <span className={s.varHead}><b id="variant-title">{p.variants.title}</b><span>влияет на цену</span></span>
          <div role="radiogroup" aria-labelledby="variant-title" className={s.varRow}>
            {p.variants.options.map(([label, pr], i) => (
              <button key={label} type="button" role="radio" aria-checked={i === vi} className={`${s.varBtn} ${i === vi ? s.varOn : ''}`} onClick={() => setVi(i)}>
                {label}
                <small>{i === 0 ? 'базовая' : <><span className="desktop-only">+{fmt(pr - p.variants!.options[0][1])}</span><span className="mobile-only">+{((pr - p.variants!.options[0][1]) / 1e6).toFixed(1).replace('.', ',')} млн</span></>}</small>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className={s.priceRow}>
        <div className={s.priceCol}>
          <span className={s.price}>{priced ? `${p.priceFrom && !v ? 'от ' : ''}${fmt(price!)} ₸` : 'Цена по запросу'}</span>
          <span className={s.stock}><span className={s.stockDot} />{priced ? 'Под заказ · срок поставки уточнит менеджер' : 'Наличие и цену уточнит менеджер'}</span>
        </div>
        {priced && price! >= 100000 && <a href="#" className={s.inst}>0‑0‑24 · от {fmt(Math.ceil(price! / 24))} ₸/мес</a>}
      </div>
      <div className={s.actions}>
        <div role="group" aria-label="Количество" className={`${s.qty} desktop-only`}>
          <button type="button" aria-label="Меньше" onClick={() => setQty((q) => Math.max(1, q - 1))}><Icon name="minus" size={18} stroke={2} /></button>
          <span>{qty}</span>
          <button type="button" aria-label="Больше" onClick={() => setQty((q) => q + 1)}><Icon name="plus" size={18} stroke={2} /></button>
        </div>
        <button type="button" className={s.cart} onClick={() => { if (priced) store.addToCart(cartItem, qty); }}><Icon name="cart" size={20} stroke={1.9} />{priced ? 'В корзину' : 'Узнать цену'}</button>
        <button type="button" aria-label={faved ? 'Убрать из избранного' : 'В избранное'} aria-pressed={faved} className={`${s.round} ${faved ? s.favOn : ''} desktop-only`} onClick={() => store.toggleFav(item)}><FavIcon on={faved} /></button>
        <button type="button" aria-label={st.compare.includes(item.key) ? 'Убрать из сравнения' : 'Добавить к сравнению'} aria-pressed={st.compare.includes(item.key)} className={`${s.round} ${st.compare.includes(item.key) ? s.cmpOn : ''}`} onClick={() => store.toggleCompare(item)}><Icon name="compare" size={20} stroke={1.8} /></button>
      </div>
      <a href="#" className={s.kp}><span className="desktop-only">Запросить коммерческое предложение</span><span className="mobile-only">Запросить КП</span></a>
      {p.physical && (
        <ul className={s.perks}>
          <li><Icon name="truck" size={22} stroke={1.6} /><span><b>Доставка в любую точку Казахстана</b><small>Стоимость и срок рассчитает менеджер</small></span></li>
          <li><Icon name="pin" size={22} stroke={1.6} /><span><b>Самовывоз из 6 городов</b><small>Алматы, Астана, Караганда, Костанай, Уральск, Атырау</small></span></li>
          {p.verify && <li><Icon name="badge" size={22} stroke={1.6} /><span><b>Поверка перед отгрузкой</b><small>Прибор приходит готовым к работе</small></span></li>}
        </ul>
      )}
    </div>
  );
}

function Panels({ p, id }: { p: ProductDetail; id: TabId }) {
  if (id === 'desc') return (
    <div className={s.descGrid}>
      <div className={s.descText}>{p.desc.map((d) => <p key={d}>{d}</p>)}</div>
      <div className={s.quick}>
        <span className={s.quickTitle}>Коротко</span>
        <ul>{p.quick.map((q) => <li key={q}><Icon name="check" size={20} stroke={2} />{q}</li>)}</ul>
      </div>
    </div>
  );
  if (id === 'specs') return (
    <dl className={s.specs}>{p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
  );
  if (id === 'kit') return (
    <div className={s.kitWrap}>
      <ul className={s.kit}>{p.kit.map((k) => <li key={k}><span><Icon name="check" size={18} stroke={2} /></span>{k}</li>)}</ul>
      <span className={s.note}>Полная комплектация указана в паспорте прибора. Менеджер подтвердит её при оформлении заказа.</span>
    </div>
  );
  return (
    <div className={s.service}>
      {SERVICE.map((x) => (
        <SmartLink key={x.name} href={x.href}><b>{x.name}</b><small>{x.text}</small><Icon name="arrowRight" size={18} stroke={2} /></SmartLink>
      ))}
    </div>
  );
}

function Details({ p }: { p: ProductDetail }) {
  const tabs = ([['desc', 'Описание'], ['specs', 'Характеристики'], ['kit', 'Комплектация'], ['service', 'Сервис']] as [TabId, string][]).filter(([t]) => t !== 'kit' || p.kit.length);
  const [tab, setTab] = useState<TabId>('desc');
  const [open, setOpen] = useState<TabId | ''>('desc');
  return (
    <section className={`container ${s.detailsWrap}`}>
      <div className={`${s.details} desktop-only`}>
        <div role="tablist" aria-label="О товаре" className={s.tabs}>
          {tabs.map(([t, label]) => <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? s.tabOn : ''} onClick={() => setTab(t)}>{label}</button>)}
        </div>
        <Panels p={p} id={tab} />
      </div>
      <div className={`${s.acc} mobile-only`}>
        {tabs.map(([t, label]) => (
          <div key={t} className={s.accItem}>
            <button type="button" aria-expanded={open === t} onClick={() => setOpen(open === t ? '' : t)}>{label}<Icon name="chevronDown" size={20} stroke={2} className={open === t ? s.rot : ''} /></button>
            {open === t && <div className={s.accBody}><Panels p={p} id={t} /></div>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Product() {
  const { slug } = useParams();
  const p = productBySlug(slug);
  if (!p) return <Navigate to="/" replace />;
  return (
    <main key={p.slug}>
      <div className={`container ${s.top}`}>
        <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Каталог', href: '/catalog' }, { label: p.cat, href: p.catHref }, { label: p.short }]} back={{ label: p.cat, href: p.catHref }} />
      </div>
      <section className={`container ${s.hero}`}>
        <Gallery p={p} />
        <div className={s.info}>
          <div className={s.titleBlock}>
            <div className={s.metaRow}><span className={s.brand}>{p.brand}</span>{p.sku && <span>Артикул {p.sku}</span>}</div>
            <h1 className={s.h1}>{p.name}</h1>
            <p className={`${s.lede} desktop-only`}>{p.lede}</p>
          </div>
          {p.facts.length > 0 && (
            <div className={`${s.facts} no-scrollbar`} style={{ ['--cols' as string]: p.facts.length }}>
              {p.facts.map(([big, small]) => <div key={big} className={s.fact}><b>{big}</b><span>{small}</span></div>)}
            </div>
          )}
          <BuyBox p={p} />
        </div>
      </section>
      {p.promo && (
        <section className={`container ${s.promoWrap}`}>
          <SmartLink href="/promo/baza-rover" className={s.promo}>
            <span className={s.promoCopy}>
              <span className={s.promoEyebrow}><span className="desktop-only">Акция · с 17 сентября 2026</span><span className="mobile-only">Акция</span></span>
              <span className={s.promoTitle}><span className="desktop-only">Выгоднее в комплекте: </span>база + ровер на i73+ за <em>4 100 000 ₸</em></span>
            </span>
            <img src={img('promo-i73.webp')} alt="" className={s.promoImg} />
            <span className={`${s.promoBtn} desktop-only`}>Подробнее <Icon name="arrowRight" size={18} stroke={2} /></span>
          </SmartLink>
        </section>
      )}
      <Details p={p} />
      <SimilarStrip title={p.simTitle} allLabel={p.simAll} allHref={p.catHref} items={p.similar}
        recommend={RECOMMEND.map((k) => navProducts.find((x) => x.key === k)!).filter((x) => x.href !== `/product/${p.slug}`).slice(0, 6)
          .map((x) => ({ name: x.name, brand: x.brand, price: x.price, img: x.image, href: x.href }))} />
    </main>
  );
}

import { useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { accDevs, accessories, accHref, accTypeImage, accTypeLabel, accTypes, compatFor, fitFor, isAccDev, type Accessory, type AccType } from '../data/accessories';
import { store } from '../lib/store';
import s from './Accessories.module.css';

const plural = (n: number, a: string, b: string, c: string) => (n % 10 === 1 && n % 100 !== 11 ? a : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? b : c);
const toItem = (a: Accessory) => ({ key: `acc:${a.name}`, name: a.name, brand: a.brand, price: a.price, image: a.image, href: a.href, cat: 'acc' });

/** «Подходит к:» chips: the first few models, then «+N». */
function Fits({ a, max = 3 }: { a: Accessory; max?: number }) {
  if (a.univ) return <span className={s.fits}><span className={`${s.fit} ${s.fitAll}`}><Icon name="check" size={12} stroke={2.6} /><span className="desktop-only">Для всех приборов раздела</span><span className="mobile-only">Для всех</span></span></span>;
  return (
    <span className={s.fits}>
      {a.fits.slice(0, max).map((f) => <span key={f} className={s.fit}>{f}</span>)}
      {a.fits.length > max && <span className={`${s.fit} ${s.fitMore}`}>+{a.fits.length - max}</span>}
    </span>
  );
}

export function AccCard({ a, compat = false }: { a: Accessory; compat?: boolean }) {
  return (
    <article className={s.card}>
      <SmartLink href={a.href ?? '#'} className={s.pic}>
        <img src={a.image} alt={a.name} loading="lazy" />
        {compat && <span className={s.ok}><Icon name="check" size={13} stroke={2.6} />Совместимо</span>}
      </SmartLink>
      <div className={s.body}>
        <span className={s.meta}><b>{accTypeLabel[a.type]}</b><span className="desktop-only"> · {a.brand}</span></span>
        <SmartLink href={a.href ?? '#'} className={s.name}>{a.name}</SmartLink>
        {!compat && <><span className={`${s.fitLabel} desktop-only`}>Подходит к:</span><Fits a={a} /></>}
        <div className={s.foot}>
          <b className={s.price}>{a.price}</b>
          <button type="button" className={s.buy} aria-label={`В корзину: ${a.name}`} onClick={() => store.addToCart(toItem(a))}>
            <Icon name="cart" size={18} stroke={1.8} className="mobile-only" /><span className="desktop-only">В корзину</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function HelpCard() {
  return (
    <div className={s.help}>
      <b>Не уверены в совместимости?</b>
      <span>Назовите модель прибора — подберём аксессуары и проверим, что всё подойдёт.</span>
      <a href="tel:+77008290000"><Icon name="call" size={16} stroke={1.9} />Позвонить</a>
    </div>
  );
}

/** «Аксессуары для тахеометров» and the other device sections: /catalog/accessories/:dev?model=… */
export function AccessoriesPage() {
  const { dev } = useParams();
  const [params] = useSearchParams();
  const initModel = params.get('model');
  const [type, setType] = useState<AccType | 'all'>('all');
  const [picked, setPicked] = useState<string[]>(initModel ? [initModel] : []);
  const [key, setKey] = useState(`${dev}|${initModel ?? ''}`);
  if (key !== `${dev}|${initModel ?? ''}`) { setKey(`${dev}|${initModel ?? ''}`); setType('all'); setPicked(initModel ? [initModel] : []); }
  if (!isAccDev(dev)) return <Navigate to={accHref('ts')} replace />;

  const D = accDevs.find((d) => d.key === dev)!;
  const inDev = accessories.filter((a) => a.dev === dev);
  const fitsPicked = (a: Accessory) => !picked.length || a.univ || a.fits.some((f) => picked.includes(f));
  const list = inDev.filter((a) => (type === 'all' || a.type === type) && fitsPicked(a));
  const types = accTypes.filter((t) => inDev.some((a) => a.type === t.key));
  const toggle = (m: string) => setPicked(picked.includes(m) ? picked.filter((x) => x !== m) : [...picked, m]);

  const filter = (
    <div className={s.filter}>
      <div className={s.filterHead}><b>Совместимость</b>{picked.length > 0 && <button type="button" onClick={() => setPicked([])}>Сбросить</button>}</div>
      <span className={s.filterSub}>Отметьте свой прибор</span>
      {D.models.map((m) => {
        const on = picked.includes(m);
        return (
          <button key={m} type="button" role="checkbox" aria-checked={on} className={s.check} onClick={() => toggle(m)}>
            <span className={`${s.box} ${on ? s.boxOn : ''}`}>{on && <Icon name="check" size={12} stroke={3} />}</span>
            <span>{m}</span><small>{inDev.filter((a) => a.univ || a.fits.includes(m)).length}</small>
          </button>
        );
      })}
    </div>
  );

  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Каталог', href: '/catalog' }, { label: D.name, href: D.href }, { label: `Аксессуары для ${D.forName}` }]} back={{ label: 'Каталог', href: '/catalog' }} />
      <div className={s.head}>
        <h1>Аксессуары для {D.forName} <span>{inDev.length} {plural(inDev.length, 'товар', 'товара', 'товаров')}</span></h1>
        <p>Выберите тип аксессуара и свой прибор — покажем только то, что к нему подходит.</p>
      </div>

      <div className={s.segWrap}>
        <span className={`${s.eyebrow} desktop-only`}>Аксессуары для</span>
        <div role="tablist" aria-label="Аксессуары для" className={`${s.segs} no-scrollbar`}>
          {accDevs.map((d) => (
            <SmartLink key={d.key} href={accHref(d.key)} role="tab" aria-selected={d.key === dev} className={`${s.seg} ${d.key === dev ? s.segOn : ''}`}>
              Для {d.forName}<span>{accessories.filter((a) => a.dev === d.key).length}</span>
            </SmartLink>
          ))}
        </div>
      </div>

      <div role="tablist" aria-label="Тип аксессуара" className={`${s.types} no-scrollbar`}>
        <button type="button" role="tab" aria-selected={type === 'all'} className={`${s.type} ${type === 'all' ? s.typeOn : ''}`} onClick={() => setType('all')}>
          <span className={s.typePic}><span className={s.allIcon}><Icon name="grid" size={22} stroke={1.8} /></span></span>
          <span className={s.typeLabel}>Все <small>{inDev.length}</small></span>
        </button>
        {types.map((t) => (
          <button key={t.key} type="button" role="tab" aria-selected={type === t.key} className={`${s.type} ${type === t.key ? s.typeOn : ''}`} onClick={() => setType(t.key)}>
            <span className={s.typePic}><img src={accTypeImage(t.key)} alt="" /></span>
            <span className={s.typeLabel}>{t.label} <small>{inDev.filter((a) => a.type === t.key).length}</small></span>
          </button>
        ))}
      </div>

      <details className={`${s.filterMobile} mobile-only`}>
        <summary><span><Icon name="filter" size={18} stroke={1.8} />Совместимость с прибором</span><small>{picked.length ? `выбрано ${picked.length}` : 'все приборы'}</small></summary>
        {filter}
      </details>

      <div className={s.layout}>
        <aside className={`${s.side} desktop-only`}>
          <div className={s.sideBox}>{filter}</div>
          <HelpCard />
        </aside>
        <div className={s.results}>
          <div className={`${s.bar} desktop-only`}><span>Показано {list.length} из {inDev.length}</span></div>
          <div className={s.grid}>{list.map((a) => <AccCard key={a.key} a={a} />)}</div>
          {!list.length && <div className={s.empty}><b>Под выбранный прибор таких аксессуаров пока нет</b><span>Сбросьте фильтр или спросите менеджера — подберём под заказ</span></div>}
          <div className="mobile-only"><HelpCard /></div>
        </div>
      </div>
    </main>
  );
}

/** Line under a product title: «Подходит к тахеометрам Trimble S5 · S7 · S9». */
export function FitLine({ slug }: { slug: string }) {
  const c = compatFor[slug];
  if (!c) return null;
  return (
    <div className={s.fitLine}>
      <span><Icon name="check" size={14} stroke={2.6} /></span>
      <p>{c.lead} {c.short.map((x, i) => <span key={x}>{i > 0 && ' · '}<a href="#compat">{x}</a></span>)}</p>
    </div>
  );
}

/** «Совместимые приборы» on an accessory page. */
export function CompatDevices({ slug }: { slug: string }) {
  const c = compatFor[slug];
  if (!c) return null;
  return (
    <section id="compat" className={`container ${s.section}`}>
      <div className={s.secHead}><div><h2>Совместимые приборы</h2><span>{c.sub}</span></div></div>
      <div className={`${s.compat} no-scrollbar`}>
        {c.devices.map((d) => (
          <SmartLink key={d.name} href={d.href ?? '#'} className={s.dev}>
            <span className={s.devPic}><img src={d.image} alt={d.name} loading="lazy" /><span className={s.ok}><Icon name="check" size={13} stroke={2.6} />Подходит</span></span>
            <span className={s.devBody}><span className={`${s.meta} desktop-only`}>{d.meta}</span><b>{d.name}</b><strong>{d.price}</strong></span>
          </SmartLink>
        ))}
        <div className={`${s.ask} desktop-only`}>
          <span><b>Вашего прибора нет в списке?</b><span>Назовите модель — проверим совместимость и подберём аналог.</span></span>
          <a href="tel:+77008290000"><Icon name="call" size={16} stroke={1.9} />Уточнить совместимость</a>
        </div>
      </div>
    </section>
  );
}

/** «Подходящие аксессуары» on a device page, with tabs by accessory group. */
export function FitAccessories({ slug }: { slug: string }) {
  const f = fitFor[slug];
  const [tab, setTab] = useState('all');
  if (!f) return null;
  const acc = accessories.filter((a) => a.dev === f.dev && (a.univ || a.fits.includes(f.model)));
  const inG = (types: AccType[] | null, a: Accessory) => !types || types.includes(a.type);
  const groups = f.groups.filter(([, , t]) => acc.some((a) => inG(t, a)));
  const cur = groups.find(([k]) => k === tab) ?? groups[0];
  const shown = acc.filter((a) => inG(cur[2], a));
  const D = accDevs.find((d) => d.key === f.dev)!;
  return (
    <section className={`container ${s.section}`}>
      <div className={s.secHead}>
        <div><h2>Подходящие аксессуары</h2><span>Совместимы с {f.label}<span className="desktop-only"> — всё, что пригодится в поле</span></span></div>
        <SmartLink href={accHref(f.dev, f.model)} className={s.allBtn}><span className="desktop-only">Все аксессуары для {D.forName}</span><span className="mobile-only">Все</span><Icon name="arrowRight" size={16} stroke={2} className="desktop-only" /></SmartLink>
      </div>
      <div role="tablist" aria-label="Тип аксессуара" className={`${s.tabs} no-scrollbar`}>
        {groups.map(([k, label, t]) => (
          <button key={k} type="button" role="tab" aria-selected={cur[0] === k} className={cur[0] === k ? s.tabOn : ''} onClick={() => setTab(k)}>{label}<span>{acc.filter((a) => inG(t, a)).length}</span></button>
        ))}
      </div>
      <div className={`${s.strip} no-scrollbar`}>{shown.slice(0, 8).map((a) => <AccCard key={a.key} a={a} compat />)}</div>
    </section>
  );
}

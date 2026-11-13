import { useState, type MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from '../components/errors/SystemPage';
import { Crumbs } from '../components/Crumbs';
import { Field } from '../components/Field';
import { Icon } from '../components/Icon';
import { Steps } from '../components/services/ServiceBlocks';
import b from '../components/services/ServiceBlocks.module.css';
import { SmartLink } from '../components/SmartLink';
import { BuyModal } from '../components/used/BuyModal';
import { img } from '../data/images';
import { usedCatLabel, usedCats, usedItem, usedListings, usedPerks, type UsedCat, type UsedListing } from '../data/used';
import { Closing, RequestForm } from './ServiceExtraPages';
import s from './Service.module.css';
import u from './Used.module.css';

const GEOSHOP = 'https://geoshop.kz';
const listingHref = (l: UsedListing) => (l.slug ? `/services/used/${l.slug}` : GEOSHOP);
const plural = (n: number) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'объявление' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'объявления' : 'объявлений'}`;

function Fav({ on, onToggle, big = false }: { on: boolean; onToggle: () => void; big?: boolean }) {
  const click = (e: MouseEvent) => { e.preventDefault(); e.stopPropagation(); onToggle(); };
  return (
    <button type="button" aria-label="В избранное" aria-pressed={on} className={`${u.fav} ${big ? u.favBig : ''} ${on ? u.favOn : ''}`} onClick={click}>
      <Icon name="fav" size={big ? 22 : 18} stroke={1.8} />
    </button>
  );
}

function Badges({ safe, fast }: { safe?: boolean; fast?: boolean }) {
  if (!safe && !fast) return null;
  return (
    <span className={u.badges}>
      {safe && <span className={u.safe}><Icon name="shieldCheck" size={13} stroke={2} />Безопасная сделка</span>}
      {fast && <span className={u.fast}><Icon name="speed" size={13} stroke={2} />Быстрая сделка</span>}
    </span>
  );
}

function ListingCard({ l, fav, onFav, compact = false }: { l: UsedListing; fav: boolean; onFav: () => void; compact?: boolean }) {
  return (
    <SmartLink href={listingHref(l)} className={u.card}>
      <span className={u.pic}>
        <img src={l.image} alt={l.name} loading="lazy" />
        <Fav on={fav} onToggle={onFav} />
      </span>
      <span className={u.body}>
        <span className={u.cat}>{usedCatLabel(l.cat)}</span>
        <b className={u.name}>{l.name}</b>
        <span className={u.priceRow}><b>{l.price} ₸</b><span><Icon name="pin" size={13} stroke={2} />{l.city}</span></span>
        {!compact && <span className={`${u.desc} desktop-only`}>{l.desc}</span>}
        {!compact && <Badges safe={l.safe} fast={l.fast} />}
      </span>
    </SmartLink>
  );
}

function useFavs() {
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  return [favs, (k: string) => setFavs((f) => ({ ...f, [k]: !f[k] }))] as const;
}

/* ---------- «Б/У оборудование» ---------- */
export function UsedPage() {
  const [cat, setCat] = useState<UsedCat | 'all'>('all');
  const [favs, toggle] = useFavs();
  const list = usedListings.map((l, i) => ({ l, k: String(i) })).filter(({ l }) => cat === 'all' || l.cat === cat);
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сервисы', href: '/services' }, { label: 'Б/У оборудование' }]} back={{ label: 'Сервисы', href: '/services' }} />
      <div className={u.head}>
        <h1>Б/У оборудование</h1>
        <p>Площадка geoshop.kz для безопасной покупки и продажи б/у геодезического оборудования в Казахстане — и сервисы GEOKURS для его обслуживания.</p>
      </div>

      <section className={u.perksRow}>
        <div className={u.perks}>
          <span className={u.perksHead}><span>geoshop.kz</span><b>Преимущества площадки</b></span>
          <ul>{usedPerks.map((p) => <li key={p.text}><span><Icon name={p.icon} size={20} stroke={1.8} /></span>{p.text}</li>)}</ul>
        </div>
        <SmartLink href="/services/rent" className={u.rent}>
          <svg aria-hidden="true" className={u.rentRings} viewBox="0 0 280 280" fill="none"><circle cx="140" cy="140" r="138" stroke="#7BDB84" strokeOpacity="0.16" /><circle cx="140" cy="140" r="90" stroke="#7BDB84" strokeOpacity="0.16" /></svg>
          <img src={img('p-i73.webp')} alt="" className={u.rentImg} />
          <span className={u.rentText}><span>Нужен прибор ненадолго?</span><b>Аренда</b><span>от <strong>5 000 ₸</strong> / день</span></span>
          <span className={u.rentBtn}>Подробнее<Icon name="arrowRight" size={16} stroke={2} /></span>
        </SmartLink>
      </section>

      <section className={b.block} id="listings">
        <div className={u.catHead}>
          <div><h2 className={b.h2}>Каталог б/у оборудования</h2><p className={b.lede}>Последние поступления на geoshop.kz</p></div>
          <span>{plural(list.length)}</span>
        </div>
        <div className={`${u.cats} no-scrollbar`} role="tablist" aria-label="Категории б/у оборудования">
          {usedCats.map((c) => (
            <button key={c.key} type="button" role="tab" aria-selected={cat === c.key} className={`${u.catBtn} ${cat === c.key ? u.catOn : ''}`} onClick={() => setCat(c.key)}>
              <span><Icon name={c.icon} size={22} stroke={1.8} /></span>{c.label}
            </button>
          ))}
        </div>
        {list.length ? (
          <div className={u.grid}>{list.map(({ l, k }) => <ListingCard key={k} l={l} fav={!!favs[k]} onFav={() => toggle(k)} />)}</div>
        ) : (
          <div className={u.empty}><b>В этой категории пока нет объявлений</b><span>Загляните позже или посмотрите все объявления на geoshop.kz</span></div>
        )}
        <a href={GEOSHOP} target="_blank" rel="noreferrer" className={u.more}>Все объявления на geoshop.kz<Icon name="arrowRight" size={18} stroke={2} /></a>
      </section>

      <Steps title="Как продать прибор" lede="Разместите объявление сами или оставьте заявку — поможем продать." steps={[
        { icon: 'filedoc', title: 'Объявление', text: 'Разместите прибор на geoshop.kz или оставьте заявку' },
        { icon: 'search', title: 'Проверка', text: 'Сервисный центр GEOKURS проверит исправность прибора' },
        { icon: 'shieldCheck', title: 'Безопасная сделка', text: 'Расчёт и передача прибора через GEOKURS' },
        { icon: 'store', title: 'Получение', text: 'Покупатель забирает прибор в филиале GEOKURS' },
      ]} />

      <RequestForm id="sell-form" title="Заявка на продажу" lede="Расскажите о приборе — поможем разместить объявление и провести сделку."
        contact="Подскажем, как разместить объявление, и расскажем о безопасной сделке. Хотите обменять прибор на новый — есть Trade-in.">
        <div className={s.two}>
          <Field label="Ваше имя" placeholder="Как к вам обращаться" autoComplete="name" required />
          <Field label="Телефон" type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" required />
        </div>
        <div className={s.two}>
          <Field label="Организация" placeholder="Название компании" autoComplete="organization" />
          <Field label="Город" placeholder="Например, Алматы" autoComplete="address-level2" required />
        </div>
        <Field label="Прибор" placeholder="Модель, год, комплект и состояние" />
      </RequestForm>

      <Closing exclude="Б/У оборудование" />
    </main>
  );
}

/* ---------- Б/У listing card ---------- */
export function UsedItemPage() {
  const { slug } = useParams();
  if (slug !== usedItem.slug) return <NotFoundPage />;
  return <UsedItem />;
}

function UsedItem() {
  const it = usedItem;
  const [buy, setBuy] = useState(false);
  const [fav, setFav] = useState(false);
  const [phone, setPhone] = useState(false);
  const [mail, setMail] = useState(false);
  const [favs, toggle] = useFavs();
  const others = usedListings.filter((l) => l.slug !== it.slug).slice(0, 4);
  const specs: [string, string][] = [['Модель', it.model], ['Производитель', it.brand], ['Категория', it.cat], ['Состояние', it.cond], ['Город', it.city], ['Продавец', it.seller], ['ID объявления', it.id]];
  const facts: [string, string][] = [[it.city, 'город'], ['Удовл.', 'состояние'], ['Компания', 'продавец'], ['6 мес', 'гарантия']];
  return (
    <main className={`container ${s.page} ${u.itemPage}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сервисы', href: '/services' }, { label: 'Б/У оборудование', href: '/services/used' }, { label: it.model }]}
        back={{ label: 'Б/У оборудование', href: '/services/used' }} />

      <div className={u.top}>
        <div className={u.gallery}>
          <svg aria-hidden="true" className={u.galleryArt} viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" fill="none"><circle cx="300" cy="300" r="250" stroke="#EEF1EC" /><circle cx="300" cy="300" r="170" stroke="#EEF1EC" /><path d="M300 40v520M40 300h520" stroke="#F2F4F1" /></svg>
          <img src={it.image} alt={it.title} />
          <span className={u.tagUsed}>Б/У</span>
          <span className={u.views}><Icon name="eye" size={15} stroke={2} />{it.views} просмотров</span>
        </div>
        <div className={u.side}>
          <div className={u.titleBlock}>
            <span className={u.meta}><span className={u.brand}>{it.brand}</span>{it.cat} · ID {it.id}</span>
            <h1>{it.title}</h1>
            <p>Комплект с контроллером, вехой и зарядным устройством. Продавец — {it.seller.toLowerCase()}, {it.city}.</p>
          </div>
          <div className={u.facts}>{facts.map(([v, k]) => <span key={k}><b>{v}</b>{k}</span>)}</div>
          <div className={u.buy}>
            <div className={u.buyPrice}><b>{it.price} ₸</b><Badges safe fast /></div>
            <div className={u.buyRow}>
              <button type="button" className={u.buyBtn} onClick={() => setBuy(true)}><Icon name="cart" size={20} stroke={1.9} />Оформить заказ</button>
              <Fav on={fav} onToggle={() => setFav((v) => !v)} big />
            </div>
            <ul className={u.checks}>
              <li><Icon name="shieldCheck" size={20} stroke={1.8} />Гарантия 6 месяцев</li>
              <li><Icon name="check" size={20} stroke={1.8} />Полностью проверен и готов к работе</li>
              <li><Icon name="cert" size={20} stroke={1.8} />Свидетельство о поверке</li>
            </ul>
          </div>
          <div className={u.seller}>
            <div className={u.sellerHead}><b>Контакты продавца</b><span>{it.seller}</span></div>
            <div className={u.contact}>
              <span><Icon name="call" size={18} stroke={1.8} /></span>
              {phone ? <a href={`tel:${it.phone.replace(/\s/g, '')}`}>{it.phone}</a> : <b>{it.phoneMasked}</b>}
              {!phone && <button type="button" onClick={() => setPhone(true)}>Показать телефон</button>}
            </div>
            <div className={u.contact}>
              <span><Icon name="mail" size={18} stroke={1.8} /></span>
              {mail ? <a href={`mailto:${it.email}`}>{it.email}</a> : <b>{it.emailMasked}</b>}
              {!mail && <button type="button" onClick={() => setMail(true)}>Показать email</button>}
            </div>
            <div className={u.warn}><Icon name="alert" size={16} stroke={2} /><span><b>Остерегайтесь мошенников</b> — никогда не отправляйте предоплату. Для сохранности денег пользуйтесь сервисом «Безопасная сделка».</span></div>
          </div>
        </div>
      </div>

      <section className={u.details}>
        <h2 className={b.h2}>Описание</h2>
        <div className={u.detailsGrid}>
          <div className={u.kit}><b>Комплектация</b><ul>{it.kit.map((t) => <li key={t}><span><Icon name="check" size={12} stroke={2.6} /></span>{t}</li>)}</ul></div>
          <div className={u.specs}><b>Характеристики</b>{specs.map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}</div>
        </div>
        <div className={u.metaRow}>
          <span><Icon name="eye" size={15} stroke={2} />Просмотров: {it.views}</span>
          <span><Icon name="pin" size={15} stroke={2} />{it.city}</span>
          <span>ID объявления: {it.id}</span>
        </div>
      </section>

      <section className={b.block}>
        <div className={u.catHead}><h2 className={b.h2}>Другие объявления</h2><SmartLink href="/services/used" className={u.allLink}>Весь каталог б/у<Icon name="arrowRight" size={16} stroke={2} /></SmartLink></div>
        <div className={`${u.grid} ${u.others} no-scrollbar`}>{others.map((l, i) => <ListingCard key={i} l={l} compact fav={!!favs[i]} onFav={() => toggle(String(i))} />)}</div>
      </section>

      {buy && <BuyModal item={{ title: it.title, price: it.price, city: it.city, id: it.id, thumb: it.thumb }} onClose={() => setBuy(false)} />}
    </main>
  );
}

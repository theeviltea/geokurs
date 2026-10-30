import { useState } from 'react';
import { navCategories, navProducts, helpLinks } from '../data/navigation';
import { PHONE } from '../data/nav';
import { img } from '../data/images';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './NavMenus.module.css';

const byKey = Object.fromEntries(navProducts.map((p) => [p.key, p]));

/** Desktop catalog mega menu: sections on the left (hover to switch), subsections and popular products in the middle. */
export function CatalogMenu({ onGo }: { onGo: () => void }) {
  const [act, setAct] = useState(0);
  const cur = navCategories[act];
  return (
    <div className={s.mega} role="region" aria-label="Каталог">
      <div className={`container ${s.megaGrid}`}>
        <nav aria-label="Разделы каталога" className={s.cats}>
          {navCategories.map((c, i) => (
            <SmartLink key={c.key} href={c.href} className={`${s.cat} ${i === act ? s.catOn : ''}`}
              onMouseEnter={() => setAct(i)} onFocus={() => setAct(i)} onClick={onGo} aria-current={i === act ? 'true' : undefined}>
              <span className={s.thumb}><img src={c.image} alt="" /></span>
              <span className={s.catName}>{c.name}</span>
              <Icon name="chevronRight" size={16} stroke={2} className={s.catChev} />
            </SmartLink>
          ))}
        </nav>
        <div className={s.main}>
          <div className={s.mainHead}>
            <span className={s.mainTitle}>{cur.name}</span>
            <SmartLink href={cur.href} className={s.allLink} onClick={onGo}>Все товары раздела <Icon name="arrowRight" size={16} stroke={2} /></SmartLink>
          </div>
          {cur.subs.length > 0 && (
            <div className={`${s.subs} ${cur.subs.length > 6 ? s.subs3 : ''}`}>
              {cur.subs.map((x) => (
                <SmartLink key={x.name} href={x.href} className={s.sub} onClick={onGo}>{x.name}<Icon name="chevronRight" size={16} stroke={2} color="var(--c-gray-600)" /></SmartLink>
              ))}
            </div>
          )}
          <div className={s.popular}>
            <span className={s.label}>Популярное в разделе</span>
            <div className={s.cards}>
              {cur.products.map((k) => byKey[k]).map((p) => (
                <SmartLink key={p.key} href={p.href} className={s.card} onClick={onGo}>
                  <span className={s.cardMedia}><img src={p.image} alt="" loading="lazy" /></span>
                  <span className={s.cardName}>{p.name}</span>
                  <span className={s.cardPrice}>{p.price ?? 'По запросу'}</span>
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
        <div className={s.side}>
          <SmartLink href="/promo/baza-rover" className={s.promo} onClick={onGo}>
            <svg className={s.promoRings} viewBox="0 0 300 300" fill="none" aria-hidden="true"><circle cx="150" cy="150" r="148" stroke="#FFFFFF" strokeOpacity="0.08" /><circle cx="150" cy="150" r="100" stroke="#FFFFFF" strokeOpacity="0.08" /></svg>
            <span className={s.promoEyebrow}>Акция</span>
            <span className={s.promoTitle}>Комплект база + ровер</span>
            <span className={s.promoPrice}>4 100 000 ₸</span>
            <img src={img('promo-i73.webp')} alt="" className={s.promoImg} />
            <span className={s.promoMore}>Подробнее <Icon name="arrowRight" size={16} stroke={2} /></span>
          </SmartLink>
          <div className={s.help}>
            <b>Не нашли нужный прибор?</b>
            <span>Подберём оборудование под вашу задачу.</span>
            <a href={PHONE.mainHref} className={s.call}><Icon name="call" size={18} stroke={1.8} />{PHONE.main}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** «Как купить» dropdown. */
export function HelpMenu({ onGo }: { onGo: () => void }) {
  return (
    <div className={s.drop} role="region" aria-label="Как купить">
      {helpLinks.map((h) => (
        <a key={h.name} href={h.href} className={s.dropItem} onClick={onGo}>
          <span className={s.dropIcon}><Icon name={h.icon} size={20} /></span>
          <span className={s.dropText}><b>{h.name}</b><small>{h.text}</small></span>
        </a>
      ))}
      <div className={s.dropFoot}>
        <span><b>Нужна консультация?</b><small>Поможем выбрать прибор</small></span>
        <a href={PHONE.mainHref} className={s.dropCall}><Icon name="call" size={16} stroke={1.8} />Позвонить</a>
      </div>
    </div>
  );
}

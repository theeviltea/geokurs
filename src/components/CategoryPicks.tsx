import { picks } from '../data/home';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './CategoryPicks.module.css';

export function CategoryPicks() {
  return (
    <div className={`container ${s.wrap}`}>
      <h2 className="h2">Подбор по категориям</h2>
      {picks.map((g) => (
        <section key={g.title} className={s.group} aria-label={g.title}>
          <div className={s.head}>
            <h3 className={s.title}>{g.title}</h3>
            <SmartLink href={g.href} className={s.all}>
              <span className="desktop-only">Смотреть все</span><span className="mobile-only">Все</span>
              <Icon name="arrowRight" size={16} stroke={2} className="desktop-only" />
            </SmartLink>
          </div>
          <div className={`${s.row} no-scrollbar`}>
            {g.items.map((p) => (
              <article key={p.name} className={s.card}>
                <span className={s.media}>
                  {p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <span className={s.ph} aria-hidden="true">{p.brand}</span>}
                </span>
                <span className={s.body}>
                  <SmartLink href={p.href} className={s.name}>{p.name}</SmartLink>
                  <span className={s.foot}>
                    <span className={s.price}>{p.price ?? 'По запросу'}</span>
                    <button type="button" className={s.buy}>
                      <Icon name="cart" size={16} stroke={1.8} className={s.buyIcon} />
                      {p.price ? 'В корзину' : 'Узнать цену'}
                    </button>
                  </span>
                </span>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

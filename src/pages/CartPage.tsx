import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { SmartLink } from '../components/SmartLink';
import { plural } from '../lib/search';
import { asCard, fmt, navByKey, priceNumber } from '../lib/products';
import { cartCount, store, useStore } from '../lib/store';
import s from './Shop.module.css';

const SKU: Record<string, string> = { i73: '8001010262', case: '58080010', gtx24: 'GTX 24 SET' };
const RECOMMEND = ['s5', 'x9core', 'x500', 'tbc', 'glm100', 'i93'];

export function CartPage() {
  const st = useStore();
  const lines = st.cart.map((l) => ({ ...l, p: navByKey[l.key] }));
  const count = cartCount(st);
  const total = lines.reduce((a, l) => a + priceNumber(l.p) * l.qty, 0);
  const countLabel = `${count} ${plural(count)}`;

  return (
    <main>
      <div className={`container ${s.page}`}>
        <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Корзина' }]} back={{ label: 'Главная', href: '/' }} />
        <div className={s.titleRow}><h1 className={s.h1}>Корзина</h1>{count > 0 && <span>{countLabel}</span>}</div>
        {lines.length > 0 ? (
          <div className={s.cartGrid}>
            <section aria-label="Товары в корзине" className={`${s.card} ${s.lines}`}>
              {lines.map(({ key, qty, p }) => (
                <article key={key} className={s.line}>
                  <SmartLink href={p.href} className={s.lineMedia}><img src={p.image} alt="" /></SmartLink>
                  <div className={s.lineInfo}>
                    <span className={s.lineSku}>Под заказ · {SKU[key] ?? p.brand}</span>
                    <SmartLink href={p.href} className={s.lineName}>{p.name}</SmartLink>
                    <span className={`${s.lineActions} desktop-only`}>
                      <button type="button"><Icon name="fav" size={16} />Отложить</button>
                      <button type="button" onClick={() => store.remove(key)}><Icon name="trash" size={16} />Удалить</button>
                    </span>
                  </div>
                  <div className={s.lineBuy}>
                    <div role="group" aria-label="Количество" className={s.stepper}>
                      <button type="button" aria-label="Меньше" disabled={qty <= 1} onClick={() => store.setQty(key, qty - 1)}><Icon name="minus" size={16} stroke={2} /></button>
                      <span aria-live="polite">{qty}</span>
                      <button type="button" aria-label="Больше" onClick={() => store.setQty(key, qty + 1)}><Icon name="plus" size={16} stroke={2} /></button>
                    </div>
                    <span className={s.lineSum}><b>{fmt(priceNumber(p) * qty)}</b>{qty > 1 && <small>{fmt(priceNumber(p))} × {qty}</small>}</span>
                    <button type="button" aria-label="Удалить" className={`${s.lineDel} mobile-only`} onClick={() => store.remove(key)}><Icon name="trash" size={18} stroke={1.6} /></button>
                  </div>
                </article>
              ))}
            </section>
            <aside className={`${s.card} ${s.summary}`}>
              <span className={s.sumTitle}>Ваш заказ</span>
              <div className={s.sumRows}>
                <div><span>Товары, {countLabel}</span><b>{fmt(total)}</b></div>
                <div><span>Доставка</span><span>рассчитает менеджер</span></div>
              </div>
              <div className={s.sumTotal}><span>Итого</span><b>{fmt(total)}</b></div>
              <a href="#" className={`${s.primary} desktop-only`}>Оформить заказ <Icon name="arrowRight" size={18} stroke={2} /></a>
              <SmartLink href="/promo/baza-rover" className={s.installment}><Icon name="percent" size={18} stroke={1.8} />Рассрочка 0‑0‑24: без взноса и переплаты</SmartLink>
              <ul className={s.sumInfo}>
                <li><Icon name="truck" size={18} color="var(--c-green-600)" />Доставка в любую точку Казахстана</li>
                <li><Icon name="pin" size={18} color="var(--c-green-600)" />Самовывоз: Алматы, Астана, Караганда, Костанай, Уральск, Атырау</li>
                <li><Icon name="badge" size={18} color="var(--c-green-600)" />Поверка перед отгрузкой</li>
              </ul>
            </aside>
            <div className={`${s.checkoutBar} mobile-only`}>
              <span><small>Итого, {countLabel}</small><b>{fmt(total)}</b></span>
              <a href="#" className={s.checkoutBtn}>Оформить</a>
            </div>
          </div>
        ) : (
          <section className={`${s.card} ${s.empty}`}>
            <span className={s.emptyIcon}><Icon name="cartAlt" size={32} stroke={1.6} /></span>
            <b>Корзина пуста</b>
            <span>Загляните в каталог или вернитесь к товарам, которые смотрели.</span>
            <div className={s.emptyBtns}>
              <SmartLink href="/catalog/gnss-oborudovanie" className={s.primarySm}>Перейти в каталог</SmartLink>
              <button type="button" className={s.ghost} onClick={store.restoreCart}>Вернуть товары</button>
            </div>
          </section>
        )}
      </div>
      <section className={s.sheet} aria-label="Рекомендации">
        <div className={`container ${s.sheetWrap}`}>
          <div className={s.sheetHead}>
            <h2 className="h2">Рекомендации</h2>
            <SmartLink href="/catalog/gnss-oborudovanie" className={s.allLink}><span className="desktop-only">Весь каталог</span><span className="mobile-only">Все</span><Icon name="arrowRight" size={16} stroke={2} className="desktop-only" /></SmartLink>
          </div>
          <div className={`${s.recGrid} no-scrollbar`}>
            {RECOMMEND.map((k, i) => <ProductCard key={k} product={asCard(k, i)} variant="carousel" className={i >= 4 ? s.recExtra : undefined} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

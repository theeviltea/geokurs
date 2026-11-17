import { navByKey, priceNumber } from './products';
import { COUPONS, cartCount, useStore } from './store';

/** VAT in Kazakhstan, included in prices. */
export const VAT_RATE = 16;
export const vatOf = (gross: number) => Math.round((gross * VAT_RATE) / (100 + VAT_RATE));

/** Cart lines and money: subtotal, promo discount, total and the VAT inside it. */
export function useOrder() {
  const st = useStore();
  const lines = st.cart.map((l) => ({ ...l, p: navByKey[l.key] }));
  const subtotal = lines.reduce((a, l) => a + priceNumber(l.p) * l.qty, 0);
  const pct = st.coupon ? COUPONS[st.coupon] ?? 0 : 0;
  const discount = Math.round((subtotal * pct) / 100);
  const total = subtotal - discount;
  return { lines, count: cartCount(st), subtotal, coupon: st.coupon, pct, discount, total, vat: vatOf(total) };
}

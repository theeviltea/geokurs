import { navProducts, type NavProduct } from '../data/navigation';
import type { Product } from '../data/products';

export const navByKey: Record<string, NavProduct> = Object.fromEntries(navProducts.map((p) => [p.key, p]));
export const priceNumber = (p: NavProduct) => (p.price ? Number(p.price.replace(/\D/g, '')) : 0);
export const fmt = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₸`;

/** A menu/search product as a card product (for ProductCard). */
export const asCard = (key: string, i = 0): Product => {
  const p = navByKey[key];
  return { id: key, name: p.name, brand: p.brand, price: priceNumber(p), from: !!p.price?.startsWith('от'), image: p.image, pop: i };
};

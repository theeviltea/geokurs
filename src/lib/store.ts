import { useSyncExternalStore } from 'react';
import { navProducts, type NavProduct } from '../data/navigation';
import { navByKey } from './products';
import { toast } from './toast';

/** Tiny client-side store for the prototype: cart lines and the compare list (kept in memory). */
type State = { cart: { key: string; qty: number }[]; compare: string[]; fav: string[] };
const INITIAL: State = { cart: [{ key: 'i73', qty: 1 }, { key: 'case', qty: 1 }, { key: 'gtx24', qty: 2 }], compare: ['i73', 'i89', 'i93'], fav: ['i73', 'i93', 's5', 'x9core', 'gtx24', 'x500'] };
let state: State = INITIAL;
const subs = new Set<() => void>();
const set = (next: State) => { state = next; subs.forEach((f) => f()); };
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };

export const useStore = () => useSyncExternalStore(subscribe, () => state, () => state);
export const cartCount = (s: State) => s.cart.reduce((a, l) => a + l.qty, 0);
/** What a «В корзину» / «В избранное» button knows about its product. */
export type Item = { key: string; name: string; brand: string; price: string | null; image: string; cat?: string; href?: string };

/** Products outside the menu data (category, similar items) are registered so cart and favourites can show them. */
const register = (it: Item) => {
  if (!navByKey[it.key]) navByKey[it.key] = { key: it.key, name: it.name, brand: it.brand, price: it.price, image: it.image, href: it.href ?? '#', cat: it.cat ?? 'gnss' } as NavProduct;
};
/** Menu key for a product name when there is one (keeps cart/favourites free of duplicates). */
export const keyByName = (name: string) => navProducts.find((p) => p.name === name)?.key;

export const store = {
  addToCart: (it: Item, qty = 1) => {
    register(it);
    const has = state.cart.some((l) => l.key === it.key);
    set({ ...state, cart: has ? state.cart.map((l) => (l.key === it.key ? { ...l, qty: l.qty + qty } : l)) : [...state.cart, { key: it.key, qty }] });
    toast.push({ kind: 'cart', name: it.name, image: it.image });
  },
  toggleFav: (it: Item) => {
    register(it);
    if (state.fav.includes(it.key)) {
      set({ ...state, fav: state.fav.filter((k) => k !== it.key) });
      toast.push({ kind: 'unfav', name: it.name, image: it.image, undo: () => store.toggleFav(it) });
    } else {
      set({ ...state, fav: [...state.fav, it.key] });
      toast.push({ kind: 'fav', name: it.name, image: it.image });
    }
  },
  setQty: (key: string, qty: number) => set({ ...state, cart: state.cart.map((l) => (l.key === key ? { ...l, qty: Math.max(1, qty) } : l)) }),
  remove: (key: string) => set({ ...state, cart: state.cart.filter((l) => l.key !== key) }),
  restoreCart: () => set({ ...state, cart: INITIAL.cart }),
  uncompare: (key: string) => set({ ...state, compare: state.compare.filter((k) => k !== key) }),
  clearCompare: () => set({ ...state, compare: [] }),
  restoreCompare: () => set({ ...state, compare: INITIAL.compare }),
  unfav: (key: string) => set({ ...state, fav: state.fav.filter((k) => k !== key) }),
  clearFav: () => set({ ...state, fav: [] }),
  /** Adds every saved item that has a price to the cart (one each). */
  favToCart: (keys: string[]) => set({ ...state, cart: [...state.cart, ...keys.filter((k) => !state.cart.some((l) => l.key === k)).map((key) => ({ key, qty: 1 }))] }),
};

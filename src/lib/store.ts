import { useSyncExternalStore } from 'react';

/** Tiny client-side store for the prototype: cart lines and the compare list (kept in memory). */
type State = { cart: { key: string; qty: number }[]; compare: string[]; fav: string[] };
const INITIAL: State = { cart: [{ key: 'i73', qty: 1 }, { key: 'case', qty: 1 }, { key: 'gtx24', qty: 2 }], compare: ['i73', 'i89', 'i93'], fav: ['i73', 'i93', 's5', 'x9core', 'gtx24', 'x500'] };
let state: State = INITIAL;
const subs = new Set<() => void>();
const set = (next: State) => { state = next; subs.forEach((f) => f()); };
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };

export const useStore = () => useSyncExternalStore(subscribe, () => state, () => state);
export const cartCount = (s: State) => s.cart.reduce((a, l) => a + l.qty, 0);
export const store = {
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

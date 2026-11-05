import { useSyncExternalStore } from 'react';

/** Short notices shown under the header after «В корзину» / «В избранное». */
export type Toast = { id: number; kind: 'cart' | 'fav' | 'unfav'; name: string; image: string; undo?: () => void };

const LIFETIME = 4000;
let list: Toast[] = [];
let seq = 0;
const timers = new Map<number, number>();
const left = new Map<number, { ms: number; since: number }>();
const arm = (id: number, ms: number) => { timers.set(id, window.setTimeout(() => toast.dismiss(id), ms)); left.set(id, { ms, since: Date.now() }); };
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

export const toast = {
  push: (t: Omit<Toast, 'id'>) => {
    const id = ++seq;
    const max = window.matchMedia('(max-width: 767px)').matches ? 1 : 3;
    list = [{ ...t, id }, ...list];
    list.slice(max).forEach((x) => toast.dismiss(x.id, false));
    list = list.slice(0, max);
    arm(id, LIFETIME);
    emit();
  },
  dismiss: (id: number, notify = true) => {
    window.clearTimeout(timers.get(id)); timers.delete(id); left.delete(id);
    list = list.filter((x) => x.id !== id);
    if (notify) emit();
  },
  /** Hovering a toast keeps it on screen; leaving restarts its timer. */
  hold: (id: number) => {
    const l = left.get(id); if (!l) return;
    window.clearTimeout(timers.get(id));
    left.set(id, { ms: Math.max(600, l.ms - (Date.now() - l.since)), since: Date.now() });
  },
  release: (id: number) => { const l = left.get(id); if (l) arm(id, l.ms); },
};

export const useToasts = () => useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f); }; }, () => list, () => list);

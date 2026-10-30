import { navCategories, navProducts, type NavProduct } from '../data/navigation';

const norm = (s: string) => s.toLowerCase().replace(/ё/g, 'е').replace(/[‑–—]/g, '-');
const catName = Object.fromEntries(navCategories.map((c) => [c.key, c.name]));

export type SearchHit = NavProduct & { catName: string; parts: [string, string, string] };
export type SearchResult = { words: string[]; sections: { name: string; href: string }[]; items: SearchHit[]; total: number };

/** Every word of the query must occur in the product name, brand or category. */
export function searchCatalog(query: string, limit = 5): SearchResult {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return { words, sections: [], items: [], total: 0 };
  const hit = (text: string) => words.every((w) => norm(text).includes(w));
  const found = navProducts.filter((p) => hit(`${p.name} ${p.brand} ${catName[p.cat]}`));
  const sections: { name: string; href: string }[] = [];
  const add = (name: string, href: string) => { if (!sections.some((s) => s.name === name)) sections.push({ name, href }); };
  navCategories.forEach((c) => {
    if (hit(c.name)) add(c.name, c.href);
    c.subs.forEach((s) => hit(s.name) && add(s.name, s.href));
  });
  found.forEach((p) => { const c = navCategories.find((x) => x.key === p.cat); if (c) add(c.name, c.href); });
  const first = words[0];
  const items = found.slice(0, limit).map((p) => {
    const i = norm(p.name).indexOf(first);
    const parts: [string, string, string] = i < 0 ? [p.name, '', ''] : [p.name.slice(0, i), p.name.slice(i, i + first.length), p.name.slice(i + first.length)];
    return { ...p, catName: catName[p.cat], parts };
  });
  return { words, sections: sections.slice(0, 5), items, total: found.length };
}

export const plural = (n: number) =>
  n % 10 === 1 && n % 100 !== 11 ? 'товар' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'товара' : 'товаров';

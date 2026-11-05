import { img } from './images';
import { gnssProducts } from './products';

export const GNSS_BRANDS_PATH = '/catalog/gnss-oborudovanie/priemniki';

/** Brand step before the receivers list: each brand is a separate customer segment for the client. */
export type GnssBrand = { brand: string; logo: string | null; accent: string; text: string; models: string[]; image: string; geokurs: boolean };

export const gnssBrands: GnssBrand[] = [
  { brand: 'Trimble', logo: img('logo-trimble.webp'), accent: '#0B6FB8', text: 'Флагманская линейка: базы, роверы и решения для сложных задач.', models: ['R980', 'R780', 'R580', 'R750', 'Alloy', 'Catalyst DA2'], image: img('p-r780.webp'), geokurs: false },
  { brand: 'GEOKURS CHCNAV', logo: img('logo-chcnav.webp'), accent: '#F07C1E', text: 'Приёмники CHCNAV с гарантией и сервисом GEOKURS.', models: ['i73+', 'i89', 'i93', 'iBase', 'ViLi i100'], image: img('p-i73.webp'), geokurs: true },
  { brand: 'Spectra Geospatial', logo: null, accent: '#1E3A6E', text: 'Бренд группы Trimble: приёмники для съёмки и разбивки.', models: ['SP90m', 'SP60'], image: img('p-sp60.webp'), geokurs: false },
  { brand: 'GEOKURS E-Survey', logo: img('logo-esurvey.webp'), accent: '#3B4BA8', text: 'Приёмники E-Survey с гарантией и сервисом GEOKURS.', models: ['NET20 PLUS'], image: img('p-net20.webp'), geokurs: true },
];

/** Number of models and the lowest price per brand, from the catalog data. */
export const brandStats = (brand: string) => {
  const list = gnssProducts.filter((p) => p.brand === brand);
  return { n: list.length, from: list.length ? Math.min(...list.map((p) => p.price)) : 0 };
};
export const brandHref = (brand: string) => `/catalog/gnss-oborudovanie?brand=${encodeURIComponent(brand)}`;

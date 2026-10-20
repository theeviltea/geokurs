import { img } from './images';

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  /** Price is a starting price ("от …"). */
  from?: boolean;
  sku?: string;
  image: string;
  type?: 'Моноблок' | 'Раздельное решение';
  hit?: boolean;
  isNew?: boolean;
  /** Popularity rank used by the default sort. */
  pop: number;
};

export const formatPrice = (p: Pick<Product, 'price' | 'from'>) =>
  `${p.from ? 'от ' : ''}${String(p.price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₸`;

/** GNSS-оборудование — 14 позиций с geokurs-online.kz (Leica исключена). */
export const gnssProducts: Product[] = [
  { id: 'r780', name: 'GNSS-приёмник Trimble R780 c конфигурацией база/ровер', brand: 'Trimble', price: 6492500, sku: 'R780-101-60-CFG', image: img('p-r780.webp'), type: 'Моноблок', hit: true, pop: 1 },
  { id: 'i73', name: 'GNSS-приёмник GEOKURS CHCNAV i73+', brand: 'GEOKURS CHCNAV', price: 1914500, sku: '8001010262', image: img('p-i73.webp'), type: 'Моноблок', hit: true, pop: 2 },
  { id: 'r980', name: 'GNSS-приёмник Trimble R980 передвижной c конфигурацией база/ровер', brand: 'Trimble', price: 11000000, image: img('p-r980.webp'), type: 'Моноблок', pop: 3 },
  { id: 'r580', name: 'GNSS-приёмник Trimble R580 c конфигурацией до 1 см/радио', brand: 'Trimble', price: 4084500, image: img('p-r580.webp'), type: 'Моноблок', isNew: true, pop: 4 },
  { id: 'i93', name: 'GNSS-приёмник GEOKURS CHCNAV i93', brand: 'GEOKURS CHCNAV', price: 4384500, image: img('p-i93.webp'), type: 'Моноблок', isNew: true, pop: 5 },
  { id: 'i89', name: 'GNSS-приёмник GEOKURS CHCNAV i89', brand: 'GEOKURS CHCNAV', price: 3330000, image: img('p-i89.webp'), type: 'Моноблок', isNew: true, pop: 6 },
  { id: 'r750', name: 'GNSS-приёмник Trimble R750 базовый', brand: 'Trimble', price: 2331000, image: img('p-r750.webp'), type: 'Раздельное решение', isNew: true, pop: 7 },
  { id: 'vili-i100', name: 'GNSS-приёмник GEOKURS CHCNAV ViLi i100', brand: 'GEOKURS CHCNAV', price: 5105000, image: img('p-vili-i100.webp'), type: 'Моноблок', pop: 8 },
  { id: 'sp90m', name: 'GNSS-приёмник Spectra Geospatial SP90m', brand: 'Spectra Geospatial', price: 6493500, image: img('p-sp90m.webp'), type: 'Раздельное решение', pop: 9 },
  { id: 'catalyst-da2', name: 'GNSS-приёмник Trimble Catalyst DA2', brand: 'Trimble', price: 398500, image: img('p-catalyst-da2.webp'), type: 'Раздельное решение', pop: 10 },
  { id: 'ibase', name: 'GNSS-приёмник GEOKURS CHCNAV iBase', brand: 'GEOKURS CHCNAV', price: 2297500, image: img('p-ibase.webp'), type: 'Моноблок', isNew: true, pop: 11 },
  { id: 'sp60', name: 'GNSS-приёмник Spectra Geospatial SP60 без УКВ', brand: 'Spectra Geospatial', price: 2325000, image: img('p-sp60.webp'), type: 'Моноблок', pop: 12 },
  { id: 'alloy', name: 'GNSS-приёмник Trimble Alloy', brand: 'Trimble', price: 8880000, image: img('p-alloy.webp'), type: 'Раздельное решение', pop: 13 },
  { id: 'net20', name: 'GNSS-приёмник GEOKURS E-Survey NET20 PLUS', brand: 'GEOKURS E-Survey', price: 4384500, image: img('p-net20.webp'), type: 'Раздельное решение', pop: 14 },
];

/** «Популярное» на главной. */
export const popularProducts: Product[] = [
  gnssProducts[0],
  gnssProducts[1],
  { id: 's5', name: 'Электронный тахеометр Trimble S5 Autolock, DR Plus', brand: 'Trimble', price: 10417000, from: true, image: img('p-s5.webp'), pop: 3 },
  { id: 's5-at', name: 'Электронный тахеометр Trimble S5 Autolock, DR Plus, Active Tracking', brand: 'Trimble', price: 11821500, from: true, image: img('p-s5.webp'), pop: 4 },
  { id: 'gtx132a', name: 'Нивелир Геокурс GTX 132А', brand: 'GEOKURS', price: 166500, sku: 'GTX 132A', image: img('p-gtx132a.webp'), pop: 5 },
  { id: 'gtx24', name: 'Нивелир GEOKURS GTX 24 SET', brand: 'GEOKURS', price: 131000, sku: 'GTX 24 SET', image: img('p-gtx24.webp'), pop: 6 },
  { id: 'x500', name: 'Квадрокоптер CHCNAV X500', brand: 'CHCNAV', price: 4800000, image: img('p-x500.webp'), pop: 7 },
];

export const gnssBrands = ['Trimble', 'GEOKURS CHCNAV', 'Spectra Geospatial', 'GEOKURS E-Survey'] as const;
export const gnssTypes = ['Моноблок', 'Раздельное решение'] as const;
export const gnssSignals = ['GPS', 'ГЛОНАСС', 'Galileo', 'BeiDou', 'QZSS', 'SBAS', 'NavIC (IRNSS)', 'L-диапазон RTX'] as const;
export const gnssSubcategories = [
  { id: 'all', name: 'Все', count: 69 },
  { id: 'rx', name: 'GNSS-приёмники', count: 23 },
  { id: 'radio', name: 'Радиомодемы', count: 8 },
  { id: 'ant', name: 'Антенны', count: 14 },
  { id: 'acc', name: 'Аксессуары', count: 24 },
] as const;
export const GNSS_TOTAL = 69;

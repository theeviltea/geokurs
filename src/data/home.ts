import type { IconName } from '../icons/icons';
import { img } from './images';

export type HeroDevice = {
  src: string; alt: string;
  /** CSS offsets and box size; the box keeps the picture's aspect ratio. */
  right: string; bottom: string; h: string; w: string;
  /** float period, glint delay and entrance delay, ms */
  dur: number; glint: number; enter: number;
};
export type HeroFx = 'scan' | 'orbit' | 'cloud';
export type Slide = {
  id: string;
  tab: string;
  brand: string;
  logo: string;
  logoH: number;
  logoHm: number;
  mark: string;
  title: string;
  fx: HeroFx;
  badges?: string[];
  cta: { label: string; href: string };
  devices: HeroDevice[];
  devicesMobile: HeroDevice[];
};

const d = (src: string, alt: string, right: string, bottom: string, h: number, w: number, dur: number, glint: number, enter: number): HeroDevice =>
  ({ src: img(src), alt, right, bottom, h: `${h}px`, w: `${w}px`, dur, glint, enter });

/** Три баннера: Trimble (сканирование), E‑Survey и CHCNAV (GNSS). */
export const slides: Slide[] = [
  {
    id: 'trimble', tab: 'Trimble · сканирование', brand: 'Trimble', logo: img('logo-trimble.webp'), logoH: 34, logoHm: 22,
    mark: '3D', title: 'Будущее за лазерным сканированием', fx: 'scan',
    cta: { label: 'Смотреть сканеры', href: '/product/trimble-x9-core' },
    devices: [
      d('hero-sx12.webp', 'Сканирующий тахеометр Trimble SX12 на штативе', 'calc(2% + 230px)', '0px', 490, 298, 6000, 0, 150),
      d('hero-x9.webp', 'Наземный 3D-сканер Trimble X9', 'calc(2% + 90px)', '50px', 320, 191, 7000, 700, 310),
    ],
    devicesMobile: [
      d('hero-sx12.webp', 'Сканирующий тахеометр Trimble SX12 на штативе', '-18px', '0px', 270, 164, 6000, 0, 150),
    ],
  },
  {
    id: 'esurvey', tab: 'E-Survey · GNSS', brand: 'E-Survey', logo: img('logo-esurvey.webp'), logoH: 30, logoHm: 20,
    mark: 'RTK', title: 'Надёжное решение для точных измерений', fx: 'orbit',
    cta: { label: 'Смотреть приёмники', href: '/catalog/gnss-oborudovanie' },
    devices: [
      d('hero-es-cam.webp', 'GNSS-приёмник GEOKURS E-Survey с камерой на вехе', 'calc(2% + 190px)', '0px', 500, 312, 6500, 0, 150),
      d('hero-es-dome.webp', 'GNSS-приёмник GEOKURS E-Survey на вехе', 'calc(2% + 420px)', '-60px', 400, 254, 7200, 600, 310),
      d('hero-es-grey.webp', 'GNSS-приёмник GEOKURS E-Survey с адаптером', 'calc(2% + 0px)', '-70px', 330, 326, 5800, 1200, 470),
    ],
    devicesMobile: [
      d('hero-es-cam.webp', 'GNSS-приёмник GEOKURS E-Survey с камерой', '50px', '0px', 230, 144, 6500, 0, 150),
      d('hero-es-grey.webp', 'GNSS-приёмник GEOKURS E-Survey', '-34px', '-40px', 150, 148, 5800, 900, 310),
    ],
  },
  {
    id: 'chcnav', tab: 'CHCNAV · GNSS', brand: 'CHCNAV', logo: img('logo-chcnav.webp'), logoH: 26, logoHm: 17,
    mark: 'GNSS', title: 'Новое поколение GNSS‑решений', fx: 'cloud', badges: ['i85', 'ViLi i100'],
    cta: { label: 'Смотреть приёмники', href: '/catalog/gnss-oborudovanie' },
    devices: [
      d('hero-ch-vili.webp', 'GNSS-приёмник GEOKURS CHCNAV ViLi i100 на вехе', 'calc(2% + 40px)', '0px', 500, 321, 6800, 500, 150),
      d('hero-ch-i85.webp', 'GNSS-приёмник GEOKURS CHCNAV i85 на вехе', 'calc(2% + 300px)', '-40px', 420, 273, 6000, 0, 310),
    ],
    devicesMobile: [
      d('hero-ch-vili.webp', 'GNSS-приёмник GEOKURS CHCNAV ViLi i100', '-10px', '0px', 220, 141, 6800, 500, 150),
      d('hero-ch-i85.webp', 'GNSS-приёмник GEOKURS CHCNAV i85', '84px', '-20px', 170, 110, 6000, 0, 310),
    ],
  },
];

export const services: { name: string; text: string; href: string; icon: IconName }[] = [
  { name: 'Базовые станции', text: 'Подключение к сети базовых станций', href: 'https://bs.geokurs.kz/', icon: 'baseStation' },
  { name: 'Сервисный центр', text: 'Ремонт и диагностика приборов', href: 'https://geokurs.kz/services/', icon: 'wrench' },
  { name: 'Метрология', text: 'Поверка и калибровка оборудования', href: 'https://geokurs-online.kz/help/metrology_service/', icon: 'gauge' },
  { name: 'Техподдержка 24/7', text: 'Помощь с приборами и ПО', href: 'https://geokurs.kz/services/support', icon: 'support' },
  { name: 'Trade-in', text: 'Обмен старого прибора на новый', href: 'https://geokurs.kz/services/trade-in', icon: 'tradeIn' },
];

export type CategoryTile = { name: string; short?: string; image: string; href: string; wide?: boolean };

export const categoryTiles: CategoryTile[] = [
  { name: 'GNSS‑оборудование', short: 'GNSS-оборудование', image: img('cat-gnss.webp'), href: '/catalog/gnss-oborudovanie' },
  { name: 'Тахеометры', image: img('cat-total-stations.webp'), href: '/product/trimble-s5' },
  { name: 'Лазерное сканирование', image: img('cat-scanning.webp'), href: '/product/trimble-x9-core' },
  { name: 'Нивелиры и теодолиты', image: img('cat-levels.webp'), href: '/product/geokurs-gtx-24-set' },
  { name: 'БПЛА', image: img('cat-uav.webp'), href: '/product/chcnav-x500', wide: true },
  { name: 'САУ для спецтехники', short: 'САУ для техники', image: img('cat-machine-control.webp'), href: '/product/chcnav-tx73' },
  { name: 'Эхолоты и батиметрия', short: 'Эхолоты', image: img('cat-echosounders.webp'), href: '/product/chcnav-apache-6' },
];

export const news = [
  { date: '10.11.2025', tag: 'Базовые станции', title: 'Новая базовая станция в Жезказгане', href: '/news/novaya-bazovaya-stanciya-v-zhezkazgane' },
  { date: '29.10.2025', tag: 'Trade-in', title: 'Обменяйте старый прибор на GEOKURS CHCNAV i73+', href: 'https://geokurs.kz/news/2025/obmen-geokurs-chcnav-i73plus' },
  { date: '22.09.2025', tag: 'Новинки', title: 'Новый контроллер от Trimble', href: 'https://geokurs.kz/news/2025/novyi-kontroller-trimble-tsc510' },
  { date: '21.08.2025', tag: 'Новинки', title: 'Новый GNSS-приёмник с лазерным дальномером', href: 'https://geokurs.kz/news/2025/novyi-gnss-priemnik-s-lazernyim-dalnomerom' },
];

export const reasons = [
  { title: 'Поверено и на складе', text: 'Забрать можно в Алматы, Астане, Караганде, Костанае, Уральске и Атырау.' },
  { title: 'Только мировые бренды', text: 'Узкий круг проверенных производителей.' },
  { title: 'Без подделок', text: 'Не продаём копии и не навязываем лишние опции.' },
  { title: 'Консультанты‑практики', text: 'Подберём прибор под вашу задачу.' },
  { title: 'Защита прав потребителей', text: 'Работаем по законам Республики Казахстан.' },
  { title: 'Быстрая доставка', text: 'В любую точку Казахстана.' },
];

export type PickItem = { name: string; brand: string; price: string | null; image: string | null; href: string };
export type PickCat = { name: string; image: string; href: string };
/** A group shows product cards (items) or, for accessories, subcategory cards (cats). */
export type PickGroup = { title: string; href: string; items: PickItem[]; cats?: PickCat[] };

/** «Подбор по категориям» на главной: реальные товары и цены с geokurs-online.kz. */
export const picks: PickGroup[] = [
  { title: 'GNSS-оборудование', href: '/catalog/gnss-oborudovanie', items: [
    { name: 'GNSS-приёмник Trimble R780 c конфигурацией база/ровер', brand: 'Trimble', price: '6 492 500 ₸', image: img('p-r780.webp'), href: '#' },
    { name: 'GNSS-приёмник GEOKURS CHCNAV i73+', brand: 'CHCNAV', price: '1 914 500 ₸', image: img('p-i73.webp'), href: '/product/geokurs-chcnav-i73' },
    { name: 'GNSS-приёмник GEOKURS CHCNAV i93', brand: 'CHCNAV', price: '4 384 500 ₸', image: img('p-i93.webp'), href: '#' },
    { name: 'GNSS-приёмник GEOKURS CHCNAV i89', brand: 'CHCNAV', price: '3 330 000 ₸', image: img('p-i89.webp'), href: '#' },
  ] },
  { title: 'Тахеометры', href: '#', items: [
    { name: 'Электронный тахеометр Trimble S5 Autolock, DR Plus', brand: 'Trimble', price: 'от 10 417 000 ₸', image: img('p-s5.webp'), href: '/product/trimble-s5' },
    { name: 'Электронный тахеометр Trimble C5', brand: 'Trimble', price: null, image: img('cat-total-stations.webp'), href: '#' },
    { name: 'Электронный тахеометр Nikon XS', brand: 'Nikon', price: null, image: img('p-nikon-xs.webp'), href: '#' },
    { name: 'Тахеометр сканирующий Trimble SX12 (1″) Robotic', brand: 'Trimble', price: null, image: img('hero-sx12.webp'), href: '#' },
  ] },
  { title: 'Лазерное сканирование', href: '#', items: [
    { name: 'Наземный 3D-сканер Trimble X9 CORE', brand: 'Trimble', price: '22 299 500 ₸', image: img('cat-scanning.webp'), href: '/product/trimble-x9-core' },
    { name: 'Наземный 3D-сканер Trimble X9 PREMIUM', brand: 'Trimble', price: '28 404 500 ₸', image: img('cat-scanning.webp'), href: '#' },
    { name: 'Лазерный сканер Trimble X9 с контроллером Trimble T10X', brand: 'Trimble', price: '36 075 000 ₸', image: img('p-x9-t10x.webp'), href: '#' },
    { name: 'Ручной 3D LiDAR SLAM-сканер GEOKURS CHCNAV RS7 (40 м)', brand: 'CHCNAV', price: '5 000 000 ₸', image: null, href: '#' },
  ] },
  { title: 'Аксессуары', href: '#', items: [], cats: [
    { name: 'Штативы', image: img('acc-shtativy.webp'), href: '#' },
    { name: 'Адаптеры и трегеры', image: img('acc-adaptery.webp'), href: '#' },
    { name: 'Измерительные рейки', image: img('acc-reyki.webp'), href: '#' },
    { name: 'Биподы и триподы', image: img('acc-bipody.webp'), href: '#' },
    { name: 'Источники питания', image: img('acc-pitanie.webp'), href: '#' },
    { name: 'Кабели', image: img('acc-kabeli.webp'), href: '#' },
    { name: 'Отражатели и марки', image: img('acc-otrazhateli.webp'), href: '#' },
    { name: 'Вехи', image: img('acc-vehi.webp'), href: '#' },
    { name: 'Крепления и переходники', image: img('acc-krepleniya.webp'), href: '#' },
    { name: 'Курвиметры', image: img('acc-kurvimetry.webp'), href: '#' },
    { name: 'Приёмники лазерных нивелиров', image: img('acc-priemniki.webp'), href: '#' },
    { name: 'Кейсы', image: img('acc-keisy.webp'), href: '#' },
    { name: 'Чехлы', image: img('acc-chehly.webp'), href: '#' },
    { name: 'Разное', image: img('acc-raznoe.webp'), href: '#' },
  ] },
];

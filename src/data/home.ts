import type { IconName } from '../icons/icons';
import { img } from './images';

export type Slide = {
  id: string;
  mark: string;
  tab: string;
  eyebrow?: string;
  title: string;
  text: string;
  mobileText?: string;
  cta: { label: string; mobileLabel?: string; href: string };
  cta2?: { label: string; mobileLabel?: string; href: string };
  photo?: { src: string; alt: string; pos: string; mobilePos: string; flip?: boolean };
};

const scanSlide: Slide = {
    id: 'scan',
    mark: '3D',
    tab: 'Лазерное сканирование',
    title: 'Будущее за лазерным сканированием',
    text: 'Сканирующий тахеометр Trimble SX12 и сканер Trimble X9 превращают объект в точную 3D‑модель за один выезд.',
    mobileText: 'Сканирующий тахеометр SX12 — точная 3D‑модель объекта за один выезд.',
    cta: { label: 'Смотреть сканеры', href: '#' },
    cta2: { label: 'Получить консультацию', href: '#' },
};

// Пока везде один зелёный баннер; слайдер оставлен рабочим для наглядности.
export const slides: Slide[] = [1, 2, 3, 4].map((n) => ({ ...scanSlide, id: `scan-${n}` }));

// Прежние баннеры, временно не показываются.
export const archivedSlides: Slide[] = [
  {
    id: 'rtk',
    mark: 'RTK',
    tab: 'База + ровер',
    eyebrow: 'GNSS‑оборудование · Акция',
    title: 'Комплект база + ровер за 4 100 000 ₸',
    text: 'Базовая станция и ровер — готовый комплект для RTK‑съёмки.',
    cta: { label: 'Подробнее об акции', mobileLabel: 'Подробнее', href: '/catalog/gnss-oborudovanie' },
    cta2: { label: 'Все GNSS‑приёмники', mobileLabel: 'Все приёмники', href: '/catalog/gnss-oborudovanie' },
    photo: { src: img('hero-gnss.webp'), alt: 'Геодезист с GNSS-ровером у горного озера', pos: '70% 40%', mobilePos: '68% 50%' },
  },
  {
    id: 'installment',
    mark: '0%',
    tab: 'Рассрочка 0‑0‑24',
    eyebrow: 'Рассрочка',
    title: 'Прибор сейчас, оплата — 24 месяца',
    text: 'Рассрочка 0‑0‑24: без первого взноса и без переплаты.',
    cta: { label: 'Условия рассрочки', mobileLabel: 'Условия', href: '#' },
    cta2: { label: 'Покупка в кредит', href: '#' },
    photo: { src: img('hero-installment.webp'), alt: 'Тахеометр на штативе в маковом поле', pos: '50% 45%', mobilePos: '40% 50%', flip: true },
  },
  {
    id: 'service',
    mark: '24/7',
    tab: 'Сервис и поддержка',
    eyebrow: 'Сервис GEOKURS',
    title: 'С вами и после покупки',
    text: 'Сервисный центр, метрология, техподдержка 24/7 и обучение работе с прибором.',
    cta: { label: 'О сервисе', href: 'https://geokurs.kz/services/' },
    cta2: { label: 'Обмен по Trade‑in', mobileLabel: 'Trade‑in', href: 'https://geokurs.kz/services/trade-in' },
    photo: { src: img('hero-service.webp'), alt: 'Геодезист с GNSS-приёмником на причале горного озера', pos: '50% 35%', mobilePos: '35% 50%', flip: true },
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
export type PickGroup = { title: string; href: string; items: PickItem[] };

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
  { title: 'Нивелиры и теодолиты', href: '#', items: [
    { name: 'Нивелир GEOKURS GTX 24 SET', brand: 'GEOKURS', price: '131 000 ₸', image: img('p-gtx24.webp'), href: '/product/geokurs-gtx-24-set' },
    { name: 'Нивелир Геокурс GTX 132А', brand: 'GEOKURS', price: '166 500 ₸', image: img('p-gtx132a.webp'), href: '#' },
    { name: 'Оптический нивелир Геокурс GTX 132 + штатив + рейка 4 м', brand: 'GEOKURS', price: '162 500 ₸', image: null, href: '#' },
    { name: 'Нивелир Геокурс GTX 24', brand: 'GEOKURS', price: '99 500 ₸', image: null, href: '#' },
  ] },
];

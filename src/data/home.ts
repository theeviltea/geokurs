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
  { name: 'Тахеометры', image: img('cat-total-stations.webp'), href: '#' },
  { name: 'Лазерное сканирование', image: img('cat-scanning.webp'), href: '#' },
  { name: 'Нивелиры и теодолиты', image: img('cat-levels.webp'), href: '#' },
  { name: 'БПЛА', image: img('cat-uav.webp'), href: '#', wide: true },
  { name: 'САУ для спецтехники', short: 'САУ для техники', image: img('cat-machine-control.webp'), href: '#' },
  { name: 'Эхолоты и батиметрия', short: 'Эхолоты', image: img('cat-echosounders.webp'), href: '#' },
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

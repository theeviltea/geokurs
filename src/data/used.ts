// Б/У catalog (geoshop.kz listings from the client's screenshot; Leica listings left out on purpose).
import type { IconName } from '../icons/icons';
import { img } from './images';

export type UsedCat = 'gnss' | 'uav' | 'scan' | 'level' | 'ctrl' | 'radio' | 'ts';
export const usedCats: { key: UsedCat | 'all'; label: string; icon: IconName }[] = [
  { key: 'all', label: 'Все', icon: 'grid' },
  { key: 'gnss', label: 'GNSS-приёмники', icon: 'baseStation' },
  { key: 'uav', label: 'БПЛА', icon: 'drone' },
  { key: 'scan', label: 'Лазерные сканеры', icon: 'scan' },
  { key: 'level', label: 'Нивелиры', icon: 'level' },
  { key: 'ctrl', label: 'Полевые контроллеры', icon: 'tablet' },
  { key: 'radio', label: 'Радиомодемы', icon: 'radio' },
  { key: 'ts', label: 'Тахеометры', icon: 'compass' },
];
export const usedCatLabel = (k: UsedCat) => usedCats.find((c) => c.key === k)!.label;

export type UsedListing = { slug?: string; cat: UsedCat; name: string; price: string; city: string; desc: string; image: string; safe?: boolean; fast?: boolean };
export const usedListings: UsedListing[] = [
  { slug: 's-max-geo', cat: 'gnss', name: 'Руснавгеосеть S-Max Geo', price: '1 099 900', city: 'Алматы', desc: 'Передвижной GNSS-приёмник S-Max Geo', image: img('used-smax2.webp'), safe: true, fast: true },
  { cat: 'gnss', name: 'Trimble R10', price: '5 300 000', city: 'Алматы', desc: 'Trimble R10 LT, RTX, Radio 2w TX, GSM, контроллер TSC3', image: img('used-r10.webp'), safe: true },
  { cat: 'gnss', name: 'CHCNAV i73+', price: '1 800 000', city: 'Семей', desc: 'Новый GNSS-приёмник CHCNAV i73+', image: img('p-i73.webp'), fast: true },
  { cat: 'gnss', name: 'Trimble R2', price: '2 000 000', city: 'Актобе', desc: 'Trimble R2', image: img('used-r2a.webp') },
  { cat: 'ts', name: 'Nikon NPR-352', price: '800 000', city: 'Алматы', desc: 'Электронный тахеометр Nikon NPR-352', image: img('used-npr.webp'), safe: true },
  { cat: 'gnss', name: 'Trimble R2', price: '1 700 000', city: 'Караганда', desc: 'Trimble R2 + Trimble Slate', image: img('used-r2slate.webp') },
  { cat: 'ts', name: 'Nikon Nivo M', price: '800 000', city: 'Караганда', desc: 'Тахеометр Nikon Nivo 3M 5″, 2007, Japan', image: img('used-nivo.webp') },
  { cat: 'gnss', name: 'Руснавгеосеть S-Max Geo', price: '900 000', city: 'Кызылорда', desc: 'GNSS-приёмник S-Max Geo', image: img('used-smax1.webp') },
];

export const usedPerks: { icon: IconName; text: string }[] = [
  { icon: 'shieldCheck', text: 'Безопасность сделки' }, { icon: 'coins', text: 'Безопасность расчёта' },
  { icon: 'check', text: 'Исправное оборудование' }, { icon: 'wrench', text: 'Дополнительные сервисы' },
  { icon: 'box', text: 'Дополнительные аксессуары' }, { icon: 'pin', text: 'Объявления по всему Казахстану' },
  { icon: 'percent', text: 'Спецпредложения GEOKURS' }, { icon: 'store', text: 'Получение в филиалах GEOKURS по стране' },
];

/** The one listing with a full card. */
export const usedItem = {
  slug: 's-max-geo', title: 'Передвижной GNSS-приёмник S-Max Geo', brand: 'Руснавгеосеть', model: 'S-Max Geo', cat: 'GNSS-приёмники',
  price: '1 099 900', city: 'Алматы', seller: 'Представитель компании', cond: 'Удовлетворительное', id: 'GA-GRMPJ8QR', views: 661,
  image: img('used-smax2-big.webp'), thumb: img('used-smax2.webp'),
  phone: '+7 771 482 90 17', phoneMasked: '+7 (771) ··· ·· ··', email: 'kat@geokurs.kz', emailMasked: 'kat@geok·····',
  kit: ['GNSS-приёмник S-Max Geo', 'Зарядное устройство GEOKURS (двухслотовое, для приёмников Trimble, SP)', 'Аккумуляторная батарея — 2 шт',
    'Контроллер Doogee S55', 'Веха телескопическая карбоновая 2,5 м', 'Кронштейн X-Grip'],
};
export const usedCities = ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Атырау', 'Костанай', 'Усть-Каменогорск', 'Семей', 'Кызылорда', 'Уральск', 'Павлодар'];

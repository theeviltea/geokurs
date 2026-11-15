// Accessories segmented by device type («Аксессуары для тахеометров» etc.) and their compatibility.
// Names, prices and compatibility lists are placeholders for the design: in production the shop's admin sets them.
import { img } from './images';

export type AccDev = 'ts' | 'gnss' | 'lvl' | 'scan' | 'uav';
export type AccType = 'ctrl' | 'ref' | 'pole' | 'tri' | 'adapt' | 'mount' | 'bipod' | 'power' | 'cable' | 'rod' | 'recv' | 'wheel' | 'case';

export const accDevs: { key: AccDev; forName: string; name: string; href: string; models: string[] }[] = [
  { key: 'ts', forName: 'тахеометров', name: 'Тахеометры', href: '/product/trimble-s5', models: ['Trimble S5', 'Trimble S7', 'Trimble S9', 'Trimble C3/C5', 'Nikon Nivo', 'Spectra Focus'] },
  { key: 'gnss', forName: 'GNSS-оборудования', name: 'GNSS-оборудование', href: '/catalog/gnss-oborudovanie', models: ['CHCNAV i73+', 'CHCNAV i93', 'CHCNAV i89', 'Trimble R780', 'Trimble R980'] },
  { key: 'lvl', forName: 'нивелиров', name: 'Нивелиры и теодолиты', href: '/product/geokurs-gtx-24-set', models: ['GEOKURS GTX 24', 'GEOKURS GTX 132A', 'Trimble DiNi', 'Лазерные нивелиры'] },
  { key: 'scan', forName: 'лазерных сканеров', name: 'Лазерное сканирование', href: '/product/trimble-x9-core', models: ['Trimble X9', 'Trimble X7', 'Trimble SX12'] },
  { key: 'uav', forName: 'БПЛА', name: 'БПЛА', href: '/product/chcnav-x500', models: ['CHCNAV X500', 'CHCNAV BB4'] },
];

export const accTypes: { key: AccType; label: string; img: string }[] = [
  { key: 'ctrl', label: 'Контроллеры', img: 'acc-controller.svg' },
  { key: 'ref', label: 'Отражатели', img: 'acc-otrazhateli.webp' },
  { key: 'pole', label: 'Вехи', img: 'acc-vehi.webp' },
  { key: 'tri', label: 'Штативы', img: 'acc-shtativy.webp' },
  { key: 'adapt', label: 'Трегеры и адаптеры', img: 'acc-adaptery.webp' },
  { key: 'mount', label: 'Крепления', img: 'acc-krepleniya.webp' },
  { key: 'bipod', label: 'Биподы', img: 'acc-bipody.webp' },
  { key: 'power', label: 'Питание', img: 'acc-pitanie.webp' },
  { key: 'cable', label: 'Кабели', img: 'acc-kabeli.webp' },
  { key: 'rod', label: 'Рейки', img: 'acc-reyki.webp' },
  { key: 'recv', label: 'Приёмники луча', img: 'acc-priemniki.webp' },
  { key: 'wheel', label: 'Курвиметры', img: 'acc-kurvimetry.webp' },
  { key: 'case', label: 'Кейсы и чехлы', img: 'acc-keisy.webp' },
];
export const accTypeLabel = Object.fromEntries(accTypes.map((t) => [t.key, t.label])) as Record<AccType, string>;

export type Accessory = {
  key: string; dev: AccDev; type: AccType; name: string; brand: string; price: string; image: string;
  /** Models it fits; `univ` = every model of its device section. */
  fits: string[]; univ: boolean; href?: string;
};

type Row = [AccDev, AccType, string, string, string, string | null, string[] | null, string?];
const ROWS: Row[] = [
  ['ts', 'case', 'Кейс к тахеометрам Trimble S-Series', 'Trimble', '466 000', 'p-case-s.webp', ['Trimble S5', 'Trimble S7', 'Trimble S9'], '/product/trimble-case-s-series'],
  ['ts', 'ctrl', 'Контроллер Trimble TSC7', 'Trimble', '3 150 000', null, ['Trimble S5', 'Trimble S7', 'Trimble S9', 'Trimble C3/C5']],
  ['ts', 'ref', 'Отражатель круговой 360° GEOKURS', 'GEOKURS', '98 000', null, null],
  ['ts', 'ref', 'Мини-призма GEOKURS с вешкой', 'GEOKURS', '36 500', null, null],
  ['ts', 'tri', 'Штатив GEOKURS SJW70F (фибергласс, тяжёлый)', 'GEOKURS', '122 500', null, null],
  ['ts', 'tri', 'Штатив Trimble (фибергласс, 1,8 м, 7,3 кг)', 'Trimble', '305 000', 'acc-bipody.webp', null],
  ['ts', 'adapt', 'Адаптер для трегера GEOKURS AL-3', 'GEOKURS', '55 500', null, null],
  ['ts', 'adapt', 'Трегер GEOKURS с оптическим отвесом', 'GEOKURS', '68 000', null, null],
  ['ts', 'power', 'Аккумулятор для тахеометров Trimble S-Series', 'Trimble', '112 000', null, ['Trimble S5', 'Trimble S7', 'Trimble S9']],
  ['ts', 'cable', 'Кабель USB для передачи данных', 'GEOKURS', '24 500', null, ['Trimble C3/C5', 'Nikon Nivo', 'Spectra Focus']],
  ['ts', 'pole', 'Веха для отражателя 2,6 м', 'GEOKURS', '41 000', null, null],
  ['gnss', 'ctrl', 'Контроллер CHCNAV HCE600', 'CHCNAV', '1 180 000', null, ['CHCNAV i73+', 'CHCNAV i93', 'CHCNAV i89'], '/product/chcnav-hce600'],
  ['gnss', 'ctrl', 'Контроллер Trimble TSC5', 'Trimble', '2 450 000', null, ['Trimble R780', 'Trimble R980']],
  ['gnss', 'pole', 'Веха карбоновая телескопическая 2,5 м', 'GEOKURS', '64 500', null, null],
  ['gnss', 'mount', 'Кронштейн для контроллера на веху', 'GEOKURS', '18 900', null, null],
  ['gnss', 'adapt', 'Адаптер GEOKURS QRA-1 (алюминиевый)', 'GEOKURS', '47 000', null, null],
  ['gnss', 'power', 'Аккумулятор для CHCNAV i73+', 'CHCNAV', '39 000', null, ['CHCNAV i73+']],
  ['gnss', 'cable', 'Кабель для внешнего радиомодема', 'CHCNAV', '29 500', null, ['CHCNAV i93', 'CHCNAV i89']],
  ['gnss', 'bipod', 'Бипод для вехи', 'GEOKURS', '52 000', null, null],
  ['gnss', 'case', 'Кейс для GNSS-приёмника', 'GEOKURS', '48 000', null, ['CHCNAV i73+', 'CHCNAV i93', 'CHCNAV i89']],
  ['lvl', 'rod', 'Рейка нивелирная телескопическая 5 м', 'GEOKURS', '28 500', null, ['GEOKURS GTX 24', 'GEOKURS GTX 132A']],
  ['lvl', 'tri', 'Штатив алюминиевый для нивелира', 'GEOKURS', '36 000', null, ['GEOKURS GTX 24', 'GEOKURS GTX 132A', 'Trimble DiNi']],
  ['lvl', 'recv', 'Приёмник лазерного луча LD-400', 'CST/berger', '62 000', null, ['Лазерные нивелиры']],
  ['lvl', 'wheel', 'Курвиметр GEOKURS', 'GEOKURS', '24 000', null, null],
  ['lvl', 'case', 'Чехол для нивелира', 'GEOKURS', '9 500', 'acc-chehly.webp', ['GEOKURS GTX 24', 'GEOKURS GTX 132A']],
  ['scan', 'ctrl', 'Планшет Trimble T10x', 'Trimble', '2 900 000', null, null],
  ['scan', 'tri', 'Штатив для лазерного сканера', 'Trimble', '285 000', null, ['Trimble X9', 'Trimble X7']],
  ['scan', 'power', 'Аккумулятор для Trimble X9', 'Trimble', '168 000', null, ['Trimble X9', 'Trimble X7']],
  ['scan', 'case', 'Кейс для Trimble X9', 'Trimble', '420 000', null, ['Trimble X9']],
  ['uav', 'power', 'Аккумулятор для CHCNAV X500', 'CHCNAV', '310 000', null, ['CHCNAV X500']],
  ['uav', 'case', 'Кейс для CHCNAV X500', 'CHCNAV', '185 000', null, ['CHCNAV X500']],
  ['uav', 'cable', 'Кабель зарядки', 'CHCNAV', '14 000', 'acc-raznoe.webp', null],
];

const typeImg = Object.fromEntries(accTypes.map((t) => [t.key, t.img])) as Record<AccType, string>;
export const accessories: Accessory[] = ROWS.map(([dev, type, name, brand, price, pic, fits, href], i) => ({
  key: `acc${i}`, dev, type, name, brand, price: `${price} ₸`, image: img(pic ?? typeImg[type]),
  fits: fits ?? accDevs.find((d) => d.key === dev)!.models, univ: !fits, href,
}));
export const accTypeImage = (t: AccType) => img(typeImg[t]);
export const isAccDev = (k: string | undefined): k is AccDev => accDevs.some((d) => d.key === k);
export const accHref = (dev: AccDev, model?: string) => `/catalog/accessories/${dev}${model ? `?model=${encodeURIComponent(model)}` : ''}`;

/** Device pages that show «Подходящие аксессуары»: product slug → device section + model. */
export const fitFor: Record<string, { dev: AccDev; model: string; label: string; groups: [string, string, AccType[] | null][] }> = {
  'geokurs-chcnav-i73': { dev: 'gnss', model: 'CHCNAV i73+', label: 'GEOKURS CHCNAV i73+', groups: [['all', 'Все', null], ['ctrl', 'Контроллеры', ['ctrl']], ['pole', 'Вехи и крепления', ['pole', 'mount', 'adapt', 'bipod']], ['power', 'Питание и кабели', ['power', 'cable']], ['case', 'Кейсы', ['case']]] },
  'trimble-s5': { dev: 'ts', model: 'Trimble S5', label: 'Trimble S5', groups: [['all', 'Все', null], ['ref', 'Отражатели и вехи', ['ref', 'pole']], ['tri', 'Штативы и трегеры', ['tri', 'adapt']], ['ctrl', 'Контроллеры', ['ctrl']], ['power', 'Питание и кабели', ['power', 'cable']], ['case', 'Кейсы', ['case']]] },
};

/** Accessory pages that show «Совместимые приборы». */
export type CompatDevice = { name: string; image: string; price: string; meta: string; href?: string };
export const compatFor: Record<string, { lead: string; short: string[]; sub: string; devices: CompatDevice[] }> = {
  'trimble-case-s-series': {
    lead: 'Подходит к тахеометрам Trimble', short: ['S5', 'S7', 'S9'], sub: 'Кейс подходит к этим тахеометрам — проверено GEOKURS',
    devices: [
      { name: 'Электронный тахеометр Trimble S5', image: img('p-s5.webp'), price: 'от 10 417 000 ₸', meta: 'Тахеометры · Trimble', href: '/product/trimble-s5' },
      { name: 'Электронный тахеометр Trimble S7', image: img('p-s5.webp'), price: 'Цена по запросу', meta: 'Тахеометры · Trimble' },
      { name: 'Электронный тахеометр Trimble S9', image: img('p-s9.webp'), price: 'от 19 000 000 ₸', meta: 'Тахеометры · Trimble', href: '/product/trimble-s9' },
    ],
  },
  'chcnav-hce600': {
    lead: 'Подходит к приёмникам CHCNAV', short: ['i73+', 'i93', 'i89'], sub: 'Контроллер работает с этими приёмниками — проверено GEOKURS',
    devices: [
      { name: 'GNSS-приёмник GEOKURS CHCNAV i73+', image: img('p-i73.webp'), price: '1 914 500 ₸', meta: 'GNSS-приёмники · CHCNAV', href: '/product/geokurs-chcnav-i73' },
      { name: 'GNSS-приёмник GEOKURS CHCNAV i93', image: img('p-i93.webp'), price: '4 384 500 ₸', meta: 'GNSS-приёмники · CHCNAV' },
      { name: 'GNSS-приёмник GEOKURS CHCNAV i89', image: img('p-i89.webp'), price: '3 330 000 ₸', meta: 'GNSS-приёмники · CHCNAV' },
    ],
  },
};

// Demo data for the account and compare pages (prototype only).
export const demoUser = { name: 'Айдар Сеитов', initials: 'АС', email: 'a.seitov@example.com', phone: '+7 701 000 00 00' };

export type Order = { no: string; date: string; status: string; tone: 'amber' | 'green' | 'gray'; items: string[]; sum: string; how?: string };
const PICKUP = 'Самовывоз · Алматы, пр. Абая 150, н.п. 1А';
export const currentOrders: Order[] = [
  { no: '10482', date: '28.10.2026', status: 'В обработке', tone: 'amber', items: ['i73'], sum: '1 914 500 ₸', how: PICKUP },
  { no: '10417', date: '14.10.2026', status: 'Готов к выдаче', tone: 'green', items: ['gtx24', 'case'], sum: '728 000 ₸', how: PICKUP },
];
export const pastOrders: Order[] = [
  { no: '10233', date: '02.09.2026', status: 'Выполнен', tone: 'gray', items: ['glm100'], sum: '183 210 ₸' },
  { no: '10102', date: '11.08.2026', status: 'Выполнен', tone: 'gray', items: ['gtx24'], sum: '131 000 ₸' },
  { no: '9987', date: '20.07.2026', status: 'Отменён', tone: 'gray', items: ['tbc'], sum: '1 775 000 ₸' },
];
export const favourites = ['s5', 'x9core', 'apache6'];

/** Specs from the product pages on geokurs-online.kz; values follow the order of compareKeys. */
export const compareKeys = ['i73', 'i89', 'i93'];
export const compareSpecs: { group: string; rows: [string, string[]][] }[] = [
  { group: 'Основное', rows: [
    ['Тип приёмника', ['моноблок', 'моноблок', 'моноблок']],
    ['Количество частот', ['мультичастотный', 'мультичастотный', 'мультичастотный']],
    ['Сигналы спутников', ['GPS, ГЛОНАСС, Galileo, BeiDou, QZSS, SBAS', 'GPS, ГЛОНАСС, Galileo, BeiDou, QZSS, IRNSS, SBAS', 'GPS, ГЛОНАСС, Galileo, BeiDou, QZSS, SBAS']],
    ['Производитель', ['GEOKURS CHCNAV', 'GEOKURS CHCNAV', 'GEOKURS CHCNAV']],
  ] },
  { group: 'Точность (СКО)', rows: [
    ['RTK в плане', ['8 мм + 1 мм/км', '8 мм + 1 мм/км', '8 мм + 1 мм/км']],
    ['RTK по высоте', ['15 мм + 1 мм/км', '15 мм + 1 мм/км', '15 мм + 1 мм/км']],
    ['Статика в плане', ['2,5 мм + 0,1 мм/км', '2,5 мм + 0,5 мм/км', '2,5 мм + 0,5 мм/км']],
    ['Статика по высоте', ['5 мм + 0,5 мм/км', '5 мм + 0,5 мм/км', '5 мм + 0,5 мм/км']],
    ['Кодовая DGPS в плане', ['0,4 м + 1 мм/км', '0,4 м + 1 мм/км', '0,4 м + 1 мм/км']],
  ] },
  { group: 'Связь', rows: [
    ['Интерфейсы', ['TNC, USB Type-C, Bluetooth 4.2, Wi‑Fi 802.11 b/g/n, NFC', 'TNC, USB Type-C, Bluetooth 4.2, Wi‑Fi 802.11 b/g/n/ac (2,4 и 5,8 ГГц), NFC', 'LEMO 7‑pin (RS‑232), USB Type-C, TNC, Bluetooth 5.0 и 4.2, Wi‑Fi 802.11 a/b/g/n/ac, NFC']],
    ['Радиомодем', ['встроенный, 450 МГц (приём / передача)', 'встроенный, 450 МГц (приём / передача)', 'встроенный, 450 МГц (приём / передача)']],
    ['Сотовый модем', ['нет', 'нет', 'встроенный 4G LTE']],
  ] },
  { group: 'Питание и память', rows: [
    ['Время работы', ['RTK: до 24 ч; статика: до 25 ч', 'RTK ровер: 16,5 ч; статика: 22 ч', 'RTK ровер: до 34 ч; статика: до 36 ч']],
    ['Память', ['—', '8 ГБ встроенной', '32 ГБ встроенной + до 128 ГБ внешней']],
  ] },
  { group: 'Корпус', rows: [
    ['Вес', ['0,73 кг', '0,75 кг', '1,15 кг']],
    ['Габариты', ['119 × 119 × 85 мм', '133 × 87 мм', '152 × 81 мм']],
    ['Температура эксплуатации', ['от −40 до +65 °C', 'от −40 до +65 °C', 'от −40 до +65 °C']],
    ['Температура хранения', ['от −40 до +85 °C', 'от −40 до +85 °C', 'от −40 до +85 °C']],
  ] },
];

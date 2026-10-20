// Филиалы GEOKURS — geokurs.kz/contacts. x/y — положение точки на карте (KZ_MAP), в процентах.
export type Branch = { city: string; address: string; phones: string[]; email: string; tag?: string; x: number; y: number };

export const branches: Branch[] = [
  { city: 'Алматы', address: '050046, г. Алматы, пр. Абая 150, н.п. 1А', phones: ['+7 700 829 00 00', '+7 727 229 00 00'], email: 'info@geokurs.kz', tag: 'Головной офис', x: 73.5, y: 82.5 },
  { city: 'Астана', address: 'Z10P5T9, г. Астана, ул. Кенесары 8, н.п. 48', phones: ['+7 7172 73 88 79', '+7 771 765 62 89'], email: 'ast@geokurs.kz', x: 60.5, y: 32.73 },
  { city: 'Караганда', address: '100009, г. Караганда, пр. Н. Абдирова 3/2, офис 301', phones: ['+7 7212 42 34 30', '+7 771 765 62 85'], email: 'krg@geokurs.kz', x: 64.38, y: 41.59 },
  { city: 'Усть-Каменогорск', address: '070012, г. Усть-Каменогорск, ул. Горького 74, офис 319 (ТД «Нарын»)', phones: ['+7 7232 57 88 79', '+7 777 542 66 35'], email: 'ukg@geokurs.kz', x: 86.88, y: 40.68 },
  { city: 'Костанай', address: '110005, г. Костанай, ул. Курганская 2а, ЖК «Австрийский», блок №1', phones: ['+7 7142 39 05 37', '+7 705 416 68 21'], email: 'kst@geokurs.kz', x: 42.12, y: 18.18 },
  { city: 'Уральск', address: '090006, г. Уральск, пр. Нурсултана Назарбаева 215, офис 513', phones: ['+7 7112 50 95 32', '+7 771 765 62 90'], email: 'url@geokurs.kz', x: 13.25, y: 32.05 },
  { city: 'Атырау', address: '060011, г. Атырау, пр. Елорда 6/7, блок 14', phones: ['+7 7122 30 93 07', '+7 777 691 06 06'], email: 'atr@geokurs.kz', x: 14.5, y: 59.09 },
];

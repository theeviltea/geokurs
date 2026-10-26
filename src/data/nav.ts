export const PHONE = { main: '+7 700 829 00 00', mainHref: 'tel:+77008290000', second: '+7 727 229 00 00', secondHref: 'tel:+77272290000' };
export const EMAIL = 'info@geokurs.kz';
export const ADDRESS = 'Алматы, пр. Абая 150, н.п. 1А';

export const mainNav = [
  { label: 'Каталог', href: '/catalog/gnss-oborudovanie', dropdown: true },
  { label: 'Акции', href: '/promo/baza-rover' },
  { label: 'Как купить', href: '#', dropdown: true },
  { label: 'Сервис', href: 'https://geokurs.kz/services/' },
  { label: 'О компании', href: 'https://geokurs.kz/about' },
];

export const mobileNav = [
  { label: 'Каталог', href: '/catalog/gnss-oborudovanie' },
  { label: 'Услуги', href: 'https://geokurs.kz/services/' },
  { label: 'О компании', href: 'https://geokurs.kz/about' },
  { label: 'Акции', href: '/promo/baza-rover' },
  { label: 'Как купить', href: '#' },
  { label: 'Контакты', href: 'https://geokurs.kz/contacts' },
];

export const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/geokurs/', icon: 'instagram' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCrFd23NOOYpBrbXvqL3m53Q', icon: 'youtube' },
  { name: 'Facebook', href: 'https://www.facebook.com/geokurs.kz', icon: 'facebook' },
  { name: 'ВКонтакте', href: 'https://vk.com/club72002765', icon: 'vk' },
] as const;

export const footerNav = [
  { title: 'Каталог', links: [['Тахеометры', '#'], ['GNSS-оборудование', '/catalog/gnss-oborudovanie'], ['Нивелиры', '#'], ['Теодолиты', '#'], ['Дальномеры', '#'], ['Аксессуары', '#']] },
  { title: 'Помощь', links: [['Доставка и оплата', '#'], ['Покупка в кредит', '#'], ['Гарантия', '#'], ['Банковские реквизиты', '#']] },
  { title: 'Компания', links: [['О компании', 'https://geokurs.kz/about'], ['Акции', '/promo/baza-rover'], ['Новости', '/news/novaya-bazovaya-stanciya-v-zhezkazgane'], ['Корпоративный сайт', 'https://geokurs.kz']] },
] as const;

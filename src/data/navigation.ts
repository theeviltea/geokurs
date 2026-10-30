// Каталог для меню, «Как купить» и поиск. Структура разделов взята с geokurs-online.kz.
import type { IconName } from '../icons/icons';
import { img } from './images';

export type NavProduct = { key: string; name: string; brand: string; price: string | null; image: string; href: string; cat: string };
export type NavSub = { name: string; href: string };
export type NavCategory = { key: string; name: string; image: string; href: string; subs: NavSub[]; products: string[] };
export type HelpLink = { name: string; text: string; icon: IconName; href: string };

export const navProducts: NavProduct[] = [
  { key: "r780", name: "GNSS-приёмник Trimble R780 c конфигурацией база/ровер", brand: "Trimble", price: "6 492 500 ₸", image: img("p-r780.webp"), href: "#", cat: "gnss" },
  { key: "i73", name: "GNSS-приёмник GEOKURS CHCNAV i73+", brand: "CHCNAV", price: "1 914 500 ₸", image: img("p-i73.webp"), href: "/product/geokurs-chcnav-i73", cat: "gnss" },
  { key: "i93", name: "GNSS-приёмник GEOKURS CHCNAV i93", brand: "CHCNAV", price: "4 384 500 ₸", image: img("p-i93.webp"), href: "#", cat: "gnss" },
  { key: "i89", name: "GNSS-приёмник GEOKURS CHCNAV i89", brand: "CHCNAV", price: "3 330 000 ₸", image: img("p-i89.webp"), href: "#", cat: "gnss" },
  { key: "s5", name: "Электронный тахеометр Trimble S5 Autolock, DR Plus", brand: "Trimble", price: "от 10 417 000 ₸", image: img("p-s5.webp"), href: "/product/trimble-s5", cat: "ts" },
  { key: "c5", name: "Электронный тахеометр Trimble C5", brand: "Trimble", price: null, image: img("cat-total-stations.webp"), href: "#", cat: "ts" },
  { key: "nikon", name: "Электронный тахеометр Nikon XS", brand: "Nikon", price: null, image: img("p-nikon-xs.webp"), href: "#", cat: "ts" },
  { key: "sx12", name: "Тахеометр сканирующий Trimble SX12 (1″) Robotic", brand: "Trimble", price: null, image: img("hero-sx12.webp"), href: "#", cat: "ts" },
  { key: "x500", name: "Квадрокоптер CHCNAV X500", brand: "CHCNAV", price: "4 800 000 ₸", image: img("p-x500.webp"), href: "/product/chcnav-x500", cat: "uav" },
  { key: "x9core", name: "Наземный 3D-сканер Trimble X9 CORE", brand: "Trimble", price: "22 299 500 ₸", image: img("hero-x9.webp"), href: "/product/trimble-x9-core", cat: "scan" },
  { key: "x9prem", name: "Наземный 3D-сканер Trimble X9 PREMIUM", brand: "Trimble", price: "28 404 500 ₸", image: img("hero-x9.webp"), href: "#", cat: "scan" },
  { key: "x9t10", name: "Лазерный сканер Trimble X9 с контроллером Trimble T10X", brand: "Trimble", price: "36 075 000 ₸", image: img("p-x9-t10x.webp"), href: "#", cat: "scan" },
  { key: "gtx24", name: "Нивелир GEOKURS GTX 24 SET", brand: "GEOKURS", price: "131 000 ₸", image: img("p-gtx24.webp"), href: "/product/geokurs-gtx-24-set", cat: "lev" },
  { key: "gtx132a", name: "Нивелир Геокурс GTX 132А", brand: "GEOKURS", price: "166 500 ₸", image: img("p-gtx132a.webp"), href: "#", cat: "lev" },
  { key: "tbc", name: "Программное обеспечение Trimble Business Center Intermediate", brand: "Trimble", price: "1 775 000 ₸", image: img("p-tbc-box.webp"), href: "/product/trimble-business-center", cat: "soft" },
  { key: "s9", name: "Электронный тахеометр Trimble S9 1″ Robotic, DR HP, FineLock", brand: "Trimble", price: "20 642 200 ₸", image: img("p-s9.webp"), href: "/product/trimble-s9", cat: "mon" },
  { key: "tx73", name: "Комплект системы автоматического управления TX73 для экскаватора", brand: "CHCNAV", price: "16 000 000 ₸", image: img("p-tx73-kit.webp"), href: "/product/chcnav-tx73", cat: "mc" },
  { key: "apache6", name: "БПВА CHCNAV Apache 6", brand: "CHCNAV", price: "40 655 500 ₸", image: img("p-apache6.webp"), href: "/product/chcnav-apache-6", cat: "echo" },
  { key: "glm100", name: "Лазерный дальномер Bosch GLM 100-25 C", brand: "Bosch", price: "183 210 ₸", image: img("p-glm100.webp"), href: "/product/bosch-glm-100-25-c", cat: "tape" },
  { key: "case", name: "Кейс к тахеометрам Trimble S-Series", brand: "Trimble", price: "466 000 ₸", image: img("p-case-s.webp"), href: "/product/trimble-case-s-series", cat: "acc" },
  { key: "soap", name: "Мыло GEOKURS R8S", brand: "GEOKURS", price: null, image: img("p-soap.webp"), href: "/product/geokurs-soap-r8s", cat: "souv" },
];

export const navCategories: NavCategory[] = [
  { key: "gnss", name: "GNSS-оборудование", image: img("cat-gnss.webp"), href: "/catalog/gnss-oborudovanie", products: ["r780", "i73", "i93"],
    subs: [{ name: "GNSS-приёмники", href: "/catalog/gnss-oborudovanie" }, { name: "Радиомодемы", href: "#" }, { name: "Антенны", href: "#" }, { name: "Аксессуары для GNSS-оборудования", href: "#" }] },
  { key: "ts", name: "Тахеометры", image: img("cat-total-stations.webp"), href: "/product/trimble-s5", products: ["s5", "c5", "nikon"],
    subs: [{ name: "Механические тахеометры", href: "#" }, { name: "Роботизированные тахеометры", href: "#" }, { name: "Сканирующие тахеометры", href: "#" }, { name: "Аксессуары для тахеометров", href: "#" }] },
  { key: "uav", name: "БПЛА", image: img("cat-uav.webp"), href: "/product/chcnav-x500", products: ["x500"],
    subs: [] },
  { key: "scan", name: "Лазерное сканирование", image: img("cat-scanning.webp"), href: "/product/trimble-x9-core", products: ["x9core", "x9prem", "x9t10"],
    subs: [{ name: "Лазерные сканеры", href: "#" }, { name: "Аксессуары для лазерных сканеров", href: "#" }] },
  { key: "lev", name: "Нивелиры и теодолиты", image: img("cat-levels.webp"), href: "/product/geokurs-gtx-24-set", products: ["gtx24", "gtx132a"],
    subs: [{ name: "Оптические нивелиры", href: "#" }, { name: "Лазерные нивелиры", href: "#" }, { name: "Цифровые нивелиры", href: "#" }, { name: "Теодолиты", href: "#" }, { name: "Аксессуары для нивелиров", href: "#" }] },
  { key: "soft", name: "Программное обеспечение", image: img("p-tbc-box.webp"), href: "/product/trimble-business-center", products: ["tbc"],
    subs: [] },
  { key: "mon", name: "Оборудование для мониторинга", image: img("p-s9.webp"), href: "/product/trimble-s9", products: ["s9"],
    subs: [{ name: "Тахеометры для мониторинга", href: "#" }, { name: "GNSS-приёмники для мониторинга", href: "#" }, { name: "Георадары", href: "#" }, { name: "Аксессуары для мониторинга", href: "#" }] },
  { key: "mc", name: "САУ для спецтехники", image: img("cat-machine-control.webp"), href: "/product/chcnav-tx73", products: ["tx73"],
    subs: [] },
  { key: "echo", name: "Эхолоты и батиметрия", image: img("cat-echosounders.webp"), href: "/product/chcnav-apache-6", products: ["apache6"],
    subs: [] },
  { key: "tape", name: "Лазерные рулетки", image: img("p-glm100.webp"), href: "/product/bosch-glm-100-25-c", products: ["glm100"],
    subs: [] },
  { key: "acc", name: "Аксессуары", image: img("acc-shtativy.webp"), href: "#", products: ["case"],
    subs: [{ name: "Штативы", href: "#" }, { name: "Адаптеры и трегеры", href: "#" }, { name: "Измерительные рейки", href: "#" }, { name: "Биподы и триподы", href: "#" }, { name: "Источники питания", href: "#" }, { name: "Кабели", href: "#" }, { name: "Отражатели и марки", href: "#" }, { name: "Вехи", href: "#" }, { name: "Крепления и переходники", href: "#" }, { name: "Курвиметры", href: "#" }, { name: "Приёмники лазерных нивелиров", href: "#" }, { name: "Кейсы", href: "#" }, { name: "Чехлы", href: "#" }, { name: "Разное", href: "#" }] },
  { key: "souv", name: "Сувенирная продукция", image: img("p-soap.webp"), href: "/product/geokurs-soap-r8s", products: ["soap"],
    subs: [] },
];

export const helpLinks: HelpLink[] = [
  { name: "Доставка", text: "В любую точку Казахстана", icon: "truck", href: "https://geokurs-online.kz/help/delivery/" },
  { name: "Оплата", text: "Способы оплаты заказа", icon: "wallet", href: "https://geokurs-online.kz/help/payment/" },
  { name: "Гарантия на товар", text: "Условия гарантийного обслуживания", icon: "badge", href: "https://geokurs-online.kz/help/warranty/" },
  { name: "Покупка в кредит", text: "Кредит и рассрочка 0‑0‑24", icon: "percent", href: "https://geokurs-online.kz/help/credit_purchase/" },
  { name: "Метрология и сервис", text: "Поверка, калибровка и ремонт", icon: "gauge", href: "https://geokurs-online.kz/help/metrology_service/" },
  { name: "Банковские реквизиты", text: "Для оплаты по счёту", icon: "doc", href: "https://geokurs-online.kz/include/requesites.php" },
];

export const popularQueries = ["CHCNAV i73+", "Trimble X9", "Trimble S5", "Нивелир", "Штатив", "Квадрокоптер"];

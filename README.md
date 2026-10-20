# GEOKURS Online — редизайн интернет-магазина

Vite · React 18 · TypeScript · react-router. Одна адаптивная кодовая база для десктопа и телефона
(брейкпоинт 767px; шапка переключается на мобильную с бургером на <1180px).

Превью по ссылке: https://theeviltea.github.io/geokurs/

## Запуск

```bash
npm install
npm run dev        # http://localhost:5173/geokurs/
npm run build      # typecheck + сборка в dist/
npm run preview    # посмотреть сборку
npm run tokens     # пересобрать src/theme/tokens.* из design/tokens.json
```

## Структура

```
design/tokens.json        токены из Geokurs Design System (источник правды)
scripts/build-tokens.mjs  tokens.json → src/theme/tokens.css (CSS-переменные) + tokens.ts
scripts/postbuild.mjs     404.html для глубоких ссылок на GitHub Pages
src/theme/                глобальные стили и токены
src/icons/icons.ts        иконки Hugeicons Stroke Rounded — тот же набор, что в дизайн-канвасе
src/components/           компоненты 1:1 с макетами (Header, MobileMenu, HeroSlider, Services, CatalogGrid,
                          ProductCard, Popular, Promos, News, Branches, Reasons, Filters, RequestCta, Footer)
src/data/                 данные: товары и цены с geokurs-online.kz, слайды, новости, филиалы, контур карты
src/pages/                Home — главная, Category — «GNSS-оборудование»
public/images/            картинки, выгруженные с канваса
```

## Что готово

- **Главная `/`**: слайдер (4 слайда, автопрокрутка, свайп на телефоне, анимация сканирования на первом слайде),
  сервисы, каталог 2×4, «Популярное» с подборками, акции, новости, филиалы с картой Казахстана, «Шесть причин».
- **GNSS-оборудование `/catalog/gnss-oborudovanie`**: подкатегории, фильтры (производитель, тип — реально фильтруют),
  сортировка, «Показать ещё», активные фильтры чипами; на телефоне фильтры открываются шторкой.
- **Мобильное меню** по бургеру: разделы, ЛК / корзина / избранное, звонок, контакты и соцсети.

Бренд Leica в проекте не используется.

## Деплой

Push в `main` → GitHub Actions собирает сайт и публикует `dist` в ветку `gh-pages`
(Settings → Pages → Source: «Deploy from a branch», `gh-pages` / root).

## Превью в артефакте

`npm run build:artifact` собирает один HTML-файл со всеми стилями, скриптами и картинками внутри: `preview/geokurs-preview.html`.

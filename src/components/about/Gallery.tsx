import { useState, type ReactElement } from 'react';
import { img } from '../../data/images';
import { Icon } from '../Icon';
import { Lightbox, type LightboxItem } from './Lightbox';
import s from './Gallery.module.css';

// Photos from the client's current site gallery (placeholders until the originals arrive).
const PHOTOS: { id: string; alt: string; tall?: boolean }[] = [
  { id: 'g01', alt: 'Инженер GEOKURS с тахеометром Trimble в поле', tall: true },
  { id: 'g04', alt: 'GNSS-приёмник на фоне Байтерека, Астана' },
  { id: 'g02', alt: 'Съёмка тахеометром на трассе в лесу' },
  { id: 'g03', alt: 'Работа с GNSS-приёмником в поле ранней весной' },
  { id: 'g05', alt: 'Команда GEOKURS на зимней съёмке' },
  { id: 'g06', alt: 'GNSS-приёмник и контроллер Trimble в осенней листве' },
  { id: 'g07', alt: 'Зимняя съёмка в лесу' },
  { id: 'g08', alt: 'Инженер с контроллером в зимнем лесу' },
  { id: 'g09', alt: 'Приёмник Trimble в городском парке' },
  { id: 'g10', alt: 'Инженер с вехой на лесной дороге' },
  { id: 'g11', alt: 'Работа с тахеометром на улице' },
  { id: 'g12', alt: 'Ночная съёмка в городе' },
  { id: 'g13', alt: 'Тахеометр Trimble на трассе' },
];
const ITEMS: LightboxItem[] = PHOTOS.map((p) => ({ src: img(`about-${p.id}.webp`), alt: p.alt, sub: p.alt, wide: !p.tall, photo: !p.tall }));
const SHOWN = 10; // tiles before the «ещё N фото» tile on desktop
const SHOWN_M = 5;

const SOCIAL: [string, string, ReactElement][] = [
  ['Instagram', '#', <path key="i" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01" />],
  ['YouTube', '#', <path key="y" d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM10 9l5 3-5 3z" />],
  ['Telegram', '#', <path key="t" d="M21 4 3 11l6 2 2 6 3-4 5 4 2-15zM9 13l9-6" />],
  ['Facebook', '#', <path key="f" d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />],
];

/** «Галерея»: bento of field photos, a «ещё N» tile, social links; any photo opens the lightbox. */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const tile = (i: number, extra = '') => {
    const p = PHOTOS[i];
    return (
      <button key={p.id} type="button" data-reveal={(i % 5) * 60} className={`${s.tile} ${s[`t${i}`] ?? ''} ${extra}`} onClick={() => setOpen(i)} aria-label={`Открыть фото: ${p.alt}`}>
        <img src={img(`about-${p.id}.webp`)} alt="" loading="lazy" />
        <span className={s.zoom} aria-hidden="true"><Icon name="zoomIn" size={20} stroke={2} /></span>
      </button>
    );
  };
  const more = (from: number, cls: string) => (
    <button type="button" className={`${s.tile} ${s.more} ${cls}`} onClick={() => setOpen(from)} aria-label={`Смотреть все фото (${PHOTOS.length})`}>
      <img src={img(`about-${PHOTOS[from].id}.webp`)} alt="" loading="lazy" />
      <span className={s.moreBody}><b>+{PHOTOS.length - from}</b><span>Все {PHOTOS.length} фото</span></span>
    </button>
  );
  return (
    <section className={s.block}>
      <div data-reveal="0" className={s.head}>
        <div className={s.headText}>
          <h2>Галерея</h2>
          <p>В поле, на объектах и в любую погоду — работаем по всему Казахстану.</p>
        </div>
        <div className={s.social}>
          <span>Мы в соцсетях</span>
          <div className={s.socialRow}>
            {SOCIAL.map(([name, href, icon]) => (
              <a key={name} href={href} aria-label={name} className={s.soc} target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
              </a>
            ))}
            <a href="#" aria-label="ВКонтакте" className={`${s.soc} ${s.vk}`} target="_blank" rel="noreferrer">VK</a>
          </div>
        </div>
      </div>
      <div className="desktop-only">
        <div className={s.grid}>
          {PHOTOS.slice(0, SHOWN).map((_, i) => tile(i))}
          {more(SHOWN, s.t10)}
        </div>
      </div>
      <div className="mobile-only">
        <div className={s.gridM}>
          {PHOTOS.slice(0, SHOWN_M).map((_, i) => tile(i, i === 0 ? s.mBig : ''))}
          {more(SHOWN_M, s.mMore)}
        </div>
      </div>
      {open !== null && <Lightbox items={ITEMS} index={open} onClose={() => setOpen(null)} onGo={setOpen} noun="фото" />}
    </section>
  );
}

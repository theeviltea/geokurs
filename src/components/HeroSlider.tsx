import { useCallback, useEffect, useRef, useState } from 'react';
import { slides } from '../data/home';
import { img } from '../data/images';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './HeroSlider.module.css';

const AUTOPLAY_MS = 8000;
const TWINKLES = [
  [140, 180, 3200, 0], [520, 130, 2600, 800], [600, 420, 3800, 1600], [210, 520, 2900, 400], [380, 90, 3400, 2100],
  [470, 560, 2400, 1100], [90, 360, 3600, 2700], [640, 250, 3000, 200], [300, 300, 2700, 1900], [430, 410, 3300, 600],
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = useCallback((i: number) => setActive((i + slides.length) % slides.length), []);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce) return;
    const t = window.setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, go]);

  const slide = slides[active];
  const isScan = slide.id.startsWith('scan');

  return (
    <section
      className={`${s.hero} ${isScan ? s.scan : ''}`}
      aria-roledescription="карусель"
      aria-label="Главные предложения"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div key={slide.id} className={s.slide} role="group" aria-roledescription="слайд" aria-label={`${active + 1} из ${slides.length}`}>
        {isScan ? (
          <div className={s.scanBg} aria-hidden="true">
            <div className={s.glow} />
            <div className={s.fx}>
              <div className={s.sweep} />
              <div className={s.pulse} />
              <div className={s.pulse} style={{ animationDelay: '2s' }} />
              <div className={s.pulse} style={{ animationDelay: '4s' }} />
              {TWINKLES.map(([x, y, d, dl]) => (
                <span key={`${x}-${y}`} className={s.dot} style={{ left: x, top: y, animationDuration: `${d}ms`, animationDelay: `${dl}ms` }} />
              ))}
            </div>
            <svg className={s.rings} viewBox="0 0 720 720" fill="none">
              <circle cx="360" cy="360" r="350" stroke="#FFFFFF" strokeOpacity="0.1" />
              <circle cx="360" cy="360" r="250" stroke="#FFFFFF" strokeOpacity="0.1" />
              <circle cx="360" cy="360" r="150" stroke="#FFFFFF" strokeOpacity="0.1" />
              <path d="M360 0v720M0 360h720" stroke="#FFFFFF" strokeOpacity="0.1" />
            </svg>
            <div className={s.floorShadow} />
            <img className={s.device} src={img('hero-sx12.webp')} alt="Сканирующий тахеометр Trimble SX12 на штативе" />
          </div>
        ) : (
          slide.photo && (
            <div className={s.photoBg}>
              <img
                src={slide.photo.src}
                alt={slide.photo.alt}
                className={slide.photo.flip ? s.flip : undefined}
                style={{ ['--pos' as string]: slide.photo.pos, ['--pos-m' as string]: slide.photo.mobilePos }}
              />
              <div className={s.veil} />
            </div>
          )
        )}
        <span className={`${s.mark} ${isScan ? s.drift : ''}`} aria-hidden="true">{slide.mark}</span>

        <div className={`container ${s.content}`}>
          {slide.eyebrow && <span className={s.eyebrow}>{slide.eyebrow}</span>}
          <h1 className={s.title}>{slide.title}</h1>
          <p className={s.text}>
            <span className={slide.mobileText ? 'desktop-only' : undefined}>{slide.text}</span>
            {slide.mobileText && <span className="mobile-only">{slide.mobileText}</span>}
          </p>
          <div className={s.ctas}>
            <SmartLink href={slide.cta.href} className={s.primary}>
              <span className="desktop-only">{slide.cta.label}</span>
              <span className="mobile-only">{slide.cta.mobileLabel ?? slide.cta.label}</span>
              <Icon name="arrowRight" size={18} stroke={2} className="desktop-only" />
            </SmartLink>
            {slide.cta2 && (
              <SmartLink href={slide.cta2.href} className={s.secondary}>
                <span className="desktop-only">{slide.cta2.label}</span>
                <span className="mobile-only">{slide.cta2.mobileLabel ?? slide.cta2.label}</span>
              </SmartLink>
            )}
          </div>
        </div>
      </div>

      <div className={s.controls}>
        <div className={`container ${s.controlsRow}`}>
          <div role="tablist" aria-label="Слайды" className={s.tabs}>
            {slides.map((sl, i) => (
              <button key={sl.id} type="button" role="tab" aria-selected={i === active} aria-label={sl.tab} className={`${s.tab} ${i === active ? s.tabActive : ''}`} onClick={() => go(i)}>
                <span className={s.tabLine} />
                <span className={s.tabLabel}><span className={s.tabNum}>{String(i + 1).padStart(2, '0')}</span>{sl.tab}</span>
              </button>
            ))}
          </div>
          <div className={s.arrows}>
            <button type="button" aria-label="Предыдущий слайд" onClick={() => go(active - 1)}><Icon name="chevronLeft" size={18} stroke={2} /></button>
            <button type="button" aria-label="Следующий слайд" onClick={() => go(active + 1)}><Icon name="chevronRight" size={18} stroke={2} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { slides, type HeroDevice, type HeroFx } from '../data/home';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './HeroSlider.module.css';

const SLIDE_MS = 8000;
const TWINKLES = [
  [140, 180, 3200, 0], [520, 130, 2600, 800], [600, 420, 3800, 1600], [210, 520, 2900, 400], [380, 90, 3400, 2100],
  [470, 560, 2400, 1100], [90, 360, 3600, 2700], [640, 250, 3000, 200], [300, 300, 2700, 1900], [430, 410, 3300, 600],
];
const ORBIT_TWINKLES = [[120, 150, 2600, 0], [610, 260, 3400, 900], [470, 600, 3000, 1800]];
const ORBITS = [
  { size: 680, tilt: -18, sy: 0.38, dur: 16000, delay: 0 },
  { size: 540, tilt: 28, sy: 0.42, dur: 22000, delay: -6000 },
  { size: 620, tilt: 72, sy: 0.34, dur: 28000, delay: -12000 },
];
/** Point-cloud terrain for the third slide: 13 wavy rows of dots, denser and brighter towards the front. */
const CLOUD = Array.from({ length: 13 }, (_, k) => Array.from({ length: 34 }, (_, i) => {
  const x = 20 + i * 20.5;
  const y = 250 + k * 30 + 16 * Math.sin(x / 70 + k * 0.6) + 8 * Math.sin(x / 23);
  return { x: Math.round(x), y: Math.round(y), r: 1.1 + k * 0.11, o: 0.16 + k * 0.028 };
})).flat();

const ms = (n: number) => `${n}ms`;

function useIsPhone() {
  const q = '(max-width: 767px)';
  const [phone, setPhone] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.(q).matches);
  useEffect(() => {
    const m = window.matchMedia?.(q);
    if (!m) return;
    const on = () => setPhone(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return phone;
}

function Fx({ kind }: { kind: HeroFx }) {
  if (kind === 'orbit') {
    return (
      <div className={`${s.fxBox} ${s.bgIn}`} aria-hidden="true">
        {ORBITS.map((o) => {
          const off = (720 - o.size) / 2;
          return (
            <div key={o.size} className={s.orbit} style={{ left: off, top: off, width: o.size, height: o.size, transform: `rotate(${o.tilt}deg) scaleY(${o.sy})` }}>
              <div className={s.orbitRing} />
              <div className={s.spin} style={{ animationDuration: ms(o.dur), animationDelay: ms(o.delay) }}><span className={s.sat} /></div>
            </div>
          );
        })}
        {[0, 1500, 3000].map((dl) => <div key={dl} className={s.wave} style={{ animationDelay: ms(dl) }} />)}
        {ORBIT_TWINKLES.map(([x, y, d, dl]) => <span key={x} className={s.dot} style={{ left: x, top: y, animationDuration: ms(d), animationDelay: ms(dl) }} />)}
      </div>
    );
  }
  if (kind === 'cloud') {
    return (
      <div className={`${s.fxBox} ${s.bgIn}`} aria-hidden="true">
        <svg className={s.cloud} viewBox="0 0 720 720" fill="none">
          {CLOUD.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r.toFixed(1)} fill="#7BDB84" fillOpacity={p.o.toFixed(2)} />)}
        </svg>
        <div className={s.scanLine}><span /></div>
      </div>
    );
  }
  return (
    <>
      <div className={`${s.fxBox} ${s.bgIn}`} aria-hidden="true">
        <div className={s.sweep} />
        {[0, 2000, 4000].map((dl) => <div key={dl} className={s.pulse} style={{ animationDelay: ms(dl) }} />)}
        {TWINKLES.map(([x, y, d, dl]) => <span key={`${x}-${y}`} className={s.dot} style={{ left: x, top: y, animationDuration: ms(d), animationDelay: ms(dl) }} />)}
      </div>
      <svg className={`${s.rings} ${s.bgIn}`} viewBox="0 0 720 720" fill="none" aria-hidden="true">
        <circle cx="360" cy="360" r="350" stroke="#FFFFFF" strokeOpacity="0.1" />
        <circle cx="360" cy="360" r="250" stroke="#FFFFFF" strokeOpacity="0.1" />
        <circle cx="360" cy="360" r="150" stroke="#FFFFFF" strokeOpacity="0.1" />
        <path d="M360 0v720M0 360h720" stroke="#FFFFFF" strokeOpacity="0.1" />
      </svg>
    </>
  );
}

function Device({ d }: { d: HeroDevice }) {
  const mask: CSSProperties = { WebkitMaskImage: `url(${d.src})`, maskImage: `url(${d.src})` };
  return (
    <div className={s.device} style={{ right: d.right, bottom: d.bottom, width: d.w, height: d.h, animationDuration: ms(d.dur) }}>
      <div className={s.rise} style={{ animationDelay: ms(d.enter) }}>
        <img src={d.src} alt={d.alt} />
        <div className={s.shine} style={mask} aria-hidden="true"><span style={{ animationDelay: ms(d.glint) }} /></div>
      </div>
    </div>
  );
}

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const phone = useIsPhone();
  const go = useCallback((i: number) => setActive((i + slides.length) % slides.length), []);

  const slide = slides[active];
  const devices = phone ? slide.devicesMobile : slide.devices;
  const logoStyle = { ['--logo-h' as string]: `${slide.logoH}px`, ['--logo-h-m' as string]: `${slide.logoHm}px` } as CSSProperties;

  return (
    <section
      className={`${s.hero} ${paused ? s.paused : ''}`}
      aria-roledescription="карусель"
      aria-label="Главные предложения"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div key={slide.id} className={s.slide} role="group" aria-roledescription="слайд" aria-label={`${active + 1} из ${slides.length}`}>
        <div className={s.stage}>
          <div className={s.glow} />
          <Fx kind={slide.fx} />
          {devices.map((d) => <Device key={d.src} d={d} />)}
        </div>
        <span className={s.mark} aria-hidden="true">{slide.mark}</span>

        <div className={`container ${s.content}`} style={logoStyle}>
          <img src={slide.logo} alt={slide.brand} className={s.logo} />
          <h1 className={s.title}>{slide.title}</h1>
          {slide.badges && (
            <div className={s.badges}>{slide.badges.map((b) => <span key={b}>{b}</span>)}</div>
          )}
          <div className={s.ctas}>
            <SmartLink href={slide.cta.href} className={s.primary}>
              {slide.cta.label}
              <Icon name="arrowRight" size={18} stroke={2} className="desktop-only" />
            </SmartLink>
            <SmartLink href="#" className={`${s.secondary} desktop-only`}>Получить консультацию</SmartLink>
          </div>
        </div>
      </div>

      <div className={s.controls}>
        <div className={`container ${s.controlsRow}`}>
          <div role="tablist" aria-label="Слайды" className={s.tabs}>
            {slides.map((sl, i) => (
              <button key={sl.id} type="button" role="tab" aria-selected={i === active} aria-label={sl.tab} className={`${s.tab} ${i === active ? s.tabActive : ''}`} onClick={() => go(i)}>
                <span className={s.tabLine}>
                  {i === active && (
                    <span key={`${sl.id}-${active}`} className={s.progress} style={{ animationDuration: ms(SLIDE_MS) }} onAnimationEnd={() => go(active + 1)} />
                  )}
                </span>
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

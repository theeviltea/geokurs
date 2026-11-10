import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../Icon';
import s from './Certificates.module.css';

export type LightboxItem = { src: string; alt: string; title?: string; sub?: string; wide?: boolean; photo?: boolean; download?: { href: string; name: string } };

/** Full-screen viewer: prev/next, counter, optional download; Esc / ← / → from the keyboard, click outside closes. */
export function Lightbox({ items, index, onClose, onGo, noun = 'изображение' }: { items: LightboxItem[]; index: number; onClose: () => void; onGo: (i: number) => void; noun?: string }) {
  const it = items[index];
  const close = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => onGo((index + d + items.length) % items.length), [index, items.length, onGo]);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    close.current?.focus();
    const body = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = body; prev?.focus?.(); };
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [go, onClose]);
  return createPortal(
    <div className={s.overlay} role="dialog" aria-modal="true" aria-label={it.title ?? it.alt} onClick={onClose}>
      <button ref={close} type="button" aria-label="Закрыть" className={s.close} onClick={onClose}><Icon name="close" size={22} stroke={2} /></button>
      <button type="button" aria-label={`Предыдущее: ${noun}`} className={`${s.nav} ${s.prev}`} onClick={(e) => { e.stopPropagation(); go(-1); }}><Icon name="chevronLeft" size={24} stroke={2} /></button>
      <button type="button" aria-label={`Следующее: ${noun}`} className={`${s.nav} ${s.next}`} onClick={(e) => { e.stopPropagation(); go(1); }}><Icon name="chevronRight" size={24} stroke={2} /></button>
      <figure key={it.src} className={`${s.figure} ${it.wide ? s.figureWide : ''} ${it.photo ? s.figurePhoto : ''}`} onClick={(e) => e.stopPropagation()}>
        <img src={it.src} alt={it.alt} />
        <figcaption className={s.caption}>
          <span className={s.capText}>{it.title && <b>{it.title}</b>}{it.sub && <span>{it.sub}</span>}</span>
          <span className={s.capTools}>
            <span className={s.counter}>{index + 1} / {items.length}</span>
            {it.download && <a href={it.download.href} download={it.download.name} className={s.dl}><Icon name="download" size={18} stroke={2} />PDF</a>}
          </span>
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}

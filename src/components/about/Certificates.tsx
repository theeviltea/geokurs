import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { docUrl, img } from '../../data/images';
import { Icon } from '../Icon';
import s from './Certificates.module.css';

type Cert = { id: string; issuer: string; title: string; sub: string; wide?: boolean };

export const CERTS: Cert[] = [
  { id: 'trimble-authorization', issuer: 'Trimble', title: 'Официальный дистрибьютор Trimble, Nikon и Spectra Geospatial', sub: 'Авторизация производителя · 20.08.2026' },
  { id: 'accreditation', issuer: 'НЦА РК', title: 'Аттестат аккредитации поверочной лаборатории', sub: '№ KZ.P.02.E0664 · действителен до 03.11.2026' },
  { id: 'chcnav-dealer', issuer: 'CHCNAV', title: 'Авторизованный дилер CHCNAV в Казахстане', sub: 'GNSS, морская съёмка, 3D-картирование, машинное управление', wide: true },
  { id: 'trimble-service', issuer: 'Trimble', title: 'Авторизованный сервисный техник Trimble', sub: 'Обучение S Series Total Stations · 10.01.2026', wide: true },
];

/** Lightbox: the certificate large, with prev/next, download and keyboard control (Esc, ←, →). */
function Viewer({ index, onClose, onGo }: { index: number; onClose: () => void; onGo: (i: number) => void }) {
  const c = CERTS[index];
  const close = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => onGo((index + d + CERTS.length) % CERTS.length), [index, onGo]);
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
    <div className={s.overlay} role="dialog" aria-modal="true" aria-label={c.title} onClick={onClose}>
      <button ref={close} type="button" aria-label="Закрыть" className={s.close} onClick={onClose}><Icon name="close" size={22} stroke={2} /></button>
      <button type="button" aria-label="Предыдущий сертификат" className={`${s.nav} ${s.prev}`} onClick={(e) => { e.stopPropagation(); go(-1); }}><Icon name="chevronLeft" size={24} stroke={2} /></button>
      <button type="button" aria-label="Следующий сертификат" className={`${s.nav} ${s.next}`} onClick={(e) => { e.stopPropagation(); go(1); }}><Icon name="chevronRight" size={24} stroke={2} /></button>
      <figure key={c.id} className={`${s.figure} ${c.wide ? s.figureWide : ''}`} onClick={(e) => e.stopPropagation()}>
        <img src={img(`cert-${c.id}.webp`)} alt={c.title} />
        <figcaption className={s.caption}>
          <span className={s.capText}><b>{c.title}</b><span>{c.issuer} · {c.sub}</span></span>
          <span className={s.capTools}>
            <span className={s.counter}>{index + 1} / {CERTS.length}</span>
            <a href={docUrl(`geokurs-${c.id}.pdf`)} download={`geokurs-${c.id}.pdf`} className={s.dl}><Icon name="download" size={18} stroke={2} />PDF</a>
          </span>
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}

/** PDF file mark in the site palette: green sheet, mint folded corner, white label. */
const PdfBadge = () => (
  <svg aria-hidden="true" className={s.pdf} viewBox="0 0 44 52" fill="none">
    <path d="M6 0h22l16 16v30a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6Z" fill="#227831" />
    <path d="M28 0v10a6 6 0 0 0 6 6h10L28 0Z" fill="#7BDB84" />
    <text x="20" y="40" textAnchor="middle" fill="#FFFFFF" fontFamily="Montserrat, 'Golos Text', sans-serif" fontSize="11.5" fontWeight="800" letterSpacing="0.04em">PDF</text>
  </svg>
);

/** «Сертификаты и авторизации»: the top of each document peeks out of a soft stage; a click opens the lightbox. */
export function Certificates() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={s.block}>
      <div data-reveal="0" className={s.head}>
        <h2>Сертификаты и авторизации</h2>
        <p>Официальный дистрибьютор и сервисный партнёр производителей — документы можно открыть и скачать.</p>
      </div>
      <div className={`${s.grid} no-scrollbar`}>
        {CERTS.map((c, i) => (
          <button key={c.id} type="button" data-reveal={i * 90} className={s.card} onClick={() => setOpen(i)} aria-label={`Открыть: ${c.title}`}>
            <span className={s.stage}>
              <PdfBadge />
              <img className={`${s.doc} ${c.wide ? s.docWide : ''}`} src={img(`cert-${c.id}-thumb.webp`)} alt="" loading="lazy" />
              <span className={s.zoom} aria-hidden="true"><Icon name="zoomIn" size={20} stroke={2} /></span>
            </span>
            <span className={s.meta}>
              <span className={s.issuer}><Icon name="award" size={14} stroke={2} />{c.issuer}</span>
              <b>{c.title}</b>
              <span className={s.sub}>{c.sub}</span>
            </span>
          </button>
        ))}
      </div>
      {open !== null && <Viewer index={open} onClose={() => setOpen(null)} onGo={setOpen} />}
    </section>
  );
}

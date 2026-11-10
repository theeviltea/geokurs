import { useState } from 'react';
import { docUrl, img } from '../../data/images';
import { Icon } from '../Icon';
import { Lightbox, type LightboxItem } from './Lightbox';
import s from './Certificates.module.css';

type Cert = { id: string; issuer: string; title: string; sub: string; wide?: boolean };

export const CERTS: Cert[] = [
  { id: 'trimble-authorization', issuer: 'Trimble', title: 'Официальный дистрибьютор Trimble, Nikon и Spectra Geospatial', sub: 'Авторизация производителя · 20.08.2026' },
  { id: 'accreditation', issuer: 'НЦА РК', title: 'Аттестат аккредитации поверочной лаборатории', sub: '№ KZ.P.02.E0664 · действителен до 03.11.2026' },
  { id: 'chcnav-dealer', issuer: 'CHCNAV', title: 'Авторизованный дилер CHCNAV в Казахстане', sub: 'GNSS, морская съёмка, 3D-картирование, машинное управление', wide: true },
  { id: 'trimble-service', issuer: 'Trimble', title: 'Авторизованный сервисный техник Trimble', sub: 'Обучение S Series Total Stations · 10.01.2026', wide: true },
];

const ITEMS: LightboxItem[] = CERTS.map((c) => ({ src: img(`cert-${c.id}.webp`), alt: c.title, title: c.title, sub: `${c.issuer} · ${c.sub}`, wide: c.wide, download: { href: docUrl(`geokurs-${c.id}.pdf`), name: `geokurs-${c.id}.pdf` } }));

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
      {open !== null && <Lightbox items={ITEMS} index={open} onClose={() => setOpen(null)} onGo={setOpen} noun="сертификат" />}
    </section>
  );
}

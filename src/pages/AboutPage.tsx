import { useEffect, useRef } from 'react';
import { Certificates } from '../components/about/Certificates';
import { Gallery } from '../components/about/Gallery';
import { Branches } from '../components/Branches';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { PRINCIPLE_ART, TOPO_SVG } from '../components/services/art';
import { useFx } from '../components/services/ServiceBlocks';
import type { IconName } from '../icons/icons';
import s from './About.module.css';

const BRANDS = ['Trimble', 'Spectra Geospatial', 'Геокурс', 'Nikon', 'Bosch', 'Delair', 'Riegl', 'GeoSLAM'];
const PRINCIPLES: [IconName, string, string][] = [
  ['badge', 'Профессионализм', 'Консультанты-практики, сертифицированные инженеры и собственная лаборатория.'],
  ['shield', 'Проверенные решения', 'Поставляем качественное оборудование от производителей, которым доверяем.'],
  ['user', 'Индивидуальный подход', 'Подбираем приборы и условия под задачи и бюджет каждого покупателя.'],
  ['link', 'Долгие отношения', 'Честное и взаимовыгодное партнёрство с клиентами и поставщиками.'],
];
const SERVICES: [IconName, string, string | null][] = [
  ['wrench', 'Авторизованный сервисный центр', '/services/repair'], ['gauge', 'Метрологическая лаборатория', '/services/metrology'], ['headset', 'Техническая поддержка', '/services/support'],
  ['box', 'Аренда оборудования', '/services/rent'], ['baseStation', 'Сеть базовых станций', '/services/base-stations'], ['tradeIn', 'Trade-In', '/services/trade-in'],
  ['cap', 'Обучение', '/services/education'], ['percent', 'Покупка в кредит', '/help/credit'], ['wallet', 'Покупка б/у оборудования', null],
  ['eye', 'Демонстрация оборудования', null], ['zap', 'Пилот-проект', null], ['truck', 'Доставка', '/help/delivery'],
];

/** Blocks marked data-reveal rise in once when they first scroll into view. */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !('IntersectionObserver' in window)) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    els.forEach((el) => el.classList.add(s.hidden));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      el.style.transitionDelay = `${el.dataset.reveal}ms`;
      el.classList.remove(s.hidden);
      io.unobserve(el);
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export function AboutPage() {
  const page = useReveal();
  const heroFx = useFx();
  const ctaFx = useFx();
  const marqueeFx = useFx();
  return (
    <div ref={page}>
      <section className={s.hero}>
        <div ref={heroFx} aria-hidden="true" className={s.topo} dangerouslySetInnerHTML={{ __html: TOPO_SVG }} />
        <div className={`container ${s.heroBody}`}>
          <h1 data-reveal="80" className={s.h1}>Ваши цели&nbsp;— <span style={{ whiteSpace: 'nowrap' }}>наш курс</span></h1>
          <p data-reveal="160" className={s.lede}>GEOKURS объединяет передовые геодезические технологии, уникальные отраслевые решения, собственную сеть базовых станций по Казахстану и полный комплекс сервисного и технического сопровождения.</p>
        </div>
      </section>

      <div className={s.marquee} aria-label={`Бренды: ${BRANDS.join(', ')}`}>
        <div ref={marqueeFx} className={s.track} aria-hidden="true">
          <div data-fx="marquee 32000 0 linear" className={s.row}>
            {[...BRANDS, ...BRANDS].map((b, i) => <span key={i}>{b}<i /></span>)}
          </div>
        </div>
      </div>

      <main className={`container ${s.main}`}>
        <section className={s.story}>
          <h2 data-reveal="0">Год за годом развиваемся вместе с&nbsp;<span>заказчиками и партнёрами</span></h2>
          <div data-reveal="120">
            <p>Компания «Геокурс» основана в 2008 году. Мы работаем с ведущими производителями геодезического и строительно-измерительного оборудования и выстраиваем долгосрочные отношения с каждым покупателем.</p>
            <p>Наша основная задача — профессиональное партнёрство: от подбора прибора и поставки до сервиса, поверки и обучения.</p>
          </div>
        </section>

        <section className={s.block}>
          <div data-reveal="0" className={s.head}><h2>Наши принципы</h2><p>На них строятся отношения с каждым покупателем.</p></div>
          <div className={s.principles}>
            {PRINCIPLES.map(([icon, title, text], i) => (
              <div key={title} data-reveal={i * 90} className={s.pr}>
                <span aria-hidden="true" className={s.prArt} dangerouslySetInnerHTML={{ __html: PRINCIPLE_ART[i] }} />
                <span className={s.prTop}>
                  <span className={s.prIcon} style={{ animationDelay: `${-i * 1.2}s` }}><Icon name={icon} size={22} stroke={1.8} /></span>
                  <b className={s.prNum}>0{i + 1}</b>
                </span>
                <span className={s.prText}><b>{title}</b><span>{text}</span></span>
              </div>
            ))}
          </div>
        </section>

        <section className={s.block}>
          <div data-reveal="0" className={s.head}><h2>Сервисы компании</h2><p>Сопровождаем оборудование на всём сроке службы.</p></div>
          <div className={s.services}>
            {SERVICES.map(([icon, name, href], i) => {
              const inner = <><span className={s.svIcon}><Icon name={icon} size={22} stroke={1.7} /></span><b>{name}</b><Icon name="arrowRight" size={16} stroke={2} className={`${s.svArrow} desktop-only`} /></>;
              return href
                ? <SmartLink key={name} href={href} data-reveal={(i % 4) * 70} className={s.sv}>{inner}</SmartLink>
                : <div key={name} data-reveal={(i % 4) * 70} className={s.sv}>{inner}</div>;
            })}
          </div>
        </section>

        <Certificates />

        <Gallery />
      </main>

      <Branches />

      <div className={`container ${s.ctaWrap}`}>
        <section data-reveal="0" className={s.cta}>
          <div ref={ctaFx} aria-hidden="true" className={s.ctaTopo} dangerouslySetInnerHTML={{ __html: TOPO_SVG }} />
          <div className={s.ctaText}><h2>Станем партнёрами?</h2><p>Расскажите о задаче — подберём оборудование, условия поставки и сервис.</p></div>
          <div className={s.ctaBtns}>
            <a href="tel:+77008290000" className={s.ctaGreen}><Icon name="call" size={18} />+7 700 829 00 00</a>
            <SmartLink href="/catalog" className={s.ctaGhost}>Перейти в каталог <Icon name="arrowRight" size={16} stroke={2} /></SmartLink>
          </div>
        </section>
      </div>
    </div>
  );
}

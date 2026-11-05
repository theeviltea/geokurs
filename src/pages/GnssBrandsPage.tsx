import { Crumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { brandHref, brandStats, gnssBrands } from '../data/gnssBrands';
import { fmt } from '../lib/products';
import s from './GnssBrands.module.css';

const models = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? 'модель' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'модели' : 'моделей');

export function GnssBrandsPage() {
  return (
    <main className={`container ${s.page}`}>
      <Crumbs items={[{ label: 'Главная', href: '/' }, { label: 'Каталог', href: '/catalog' }, { label: 'GNSS-оборудование', href: '/catalog/gnss-oborudovanie' }, { label: 'GNSS-приёмники' }]} back={{ label: 'GNSS-оборудование', href: '/catalog/s/gnss' }} />
      <div className={s.head}>
        <div className={s.headText}>
          <h1 className={s.h1}>GNSS-приёмники</h1>
          <p>Выберите бренд — у каждого своя линейка, уровень и стоимость.</p>
        </div>
        <SmartLink href="/catalog/gnss-oborudovanie" className={s.all}>Все приёмники без разделения по брендам <Icon name="arrowRight" size={16} stroke={2} /></SmartLink>
      </div>

      <div className={s.grid}>
        {gnssBrands.map((b) => {
          const st = brandStats(b.brand);
          return (
            <SmartLink key={b.brand} href={brandHref(b.brand)} className={s.card}>
              <div className={s.media} style={{ ['--accent' as string]: b.accent }}>
                <svg aria-hidden="true" className={s.rings} viewBox="0 0 380 380" fill="none"><circle cx="190" cy="190" r="188" stroke="#FFFFFF" strokeOpacity="0.08" /><circle cx="190" cy="190" r="128" stroke="#FFFFFF" strokeOpacity="0.08" /><circle cx="190" cy="190" r="68" stroke="#7BDB84" strokeOpacity="0.25" /></svg>
                <div className={s.mark}>
                  {b.geokurs && <span className={s.gk}>GEOKURS</span>}
                  {b.logo ? <img src={b.logo} alt={b.brand} className={s.logo} data-brand={b.brand} /> : <span className={s.word}>Spectra<small>Geospatial</small></span>}
                </div>
                <img src={b.image} alt="" className={s.photo} loading="lazy" />
              </div>
              <div className={s.body}>
                <div className={s.title}><b>{b.brand}</b><span>{b.text}</span></div>
                <div className={s.models}>{b.models.map((m) => <span key={m}>{m}</span>)}</div>
                <div className={s.foot}>
                  <span className={s.stat}><span>{st.n} {models(st.n)}</span><b>от {fmt(st.from)}</b></span>
                  <span className={s.cta}><span className="desktop-only">Смотреть приёмники</span><span className="mobile-only">Смотреть</span><Icon name="arrowRight" size={16} stroke={2} /></span>
                </div>
              </div>
            </SmartLink>
          );
        })}
      </div>

      <section className={s.help}>
        <div className={s.helpText}>
          <span className={s.helpIcon}><Icon name="headset" size={26} stroke={1.7} /></span>
          <span><b>Не знаете, какой бренд выбрать?</b><span>Расскажите о задачах — подберём приёмник под точность, условия и бюджет.</span></span>
        </div>
        <a href="tel:+77272290000" className={s.helpBtn}><Icon name="call" size={18} />Получить консультацию</a>
      </section>
    </main>
  );
}

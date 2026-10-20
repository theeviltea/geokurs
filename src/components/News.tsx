import { news } from '../data/home';
import { Icon } from './Icon';
import s from './News.module.css';

export function News() {
  return (
    <div className={`container ${s.wrap}`}>
      <div className={s.head}>
        <h2 className="h2">Новости</h2>
        <a href="https://geokurs.kz/news/" className={s.all}>
          <span className="desktop-only">Все новости</span><span className="mobile-only">Все</span>
          <Icon name="arrowRight" size={16} stroke={2} className="desktop-only" />
        </a>
      </div>
      <div className={`${s.grid} no-scrollbar`}>
        {news.map((n) => (
          <a key={n.href} href={n.href} className={s.card}>
            <span className={s.top}><span className={s.tag}>{n.tag}</span><span className={s.date}>{n.date}</span></span>
            <span className={s.title}>{n.title}</span>
            <span className={s.read}>Читать <Icon name="arrowRight" size={16} stroke={2} /></span>
          </a>
        ))}
      </div>
    </div>
  );
}

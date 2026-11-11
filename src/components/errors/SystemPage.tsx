import { Component, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { SmartLink } from '../SmartLink';
import { ART_404, ART_500, ART_OFFLINE } from './art';
import './art.css';
import s from './SystemPage.module.css';

type Kind = '404' | '500' | 'offline';

function Shell({ kind, eyebrow, title, text, children }: { kind: Kind; eyebrow: string; title: string; text: string; children: ReactNode }) {
  const art = kind === '404' ? ART_404 : kind === '500' ? ART_500 : ART_OFFLINE;
  return (
    <main className={`container ${s.page}`}>
      <div aria-hidden="true" className={s.art} dangerouslySetInnerHTML={{ __html: art }} />
      <div className={s.copy}>
        <span className={`${s.eyebrow} ${kind === '404' ? '' : s.eyebrowRed}`}><span className="er-dot" />{eyebrow}</span>
        <h1 className={s.h1}>{title}</h1>
        <p className={s.text}>{text}</p>
        {children}
      </div>
    </main>
  );
}

export function NotFoundPage() {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const submit = (e: FormEvent) => { e.preventDefault(); nav(q.trim() ? `/catalog?q=${encodeURIComponent(q.trim())}` : '/catalog'); };
  useEffect(() => { document.title = 'Страница не найдена — GEOKURS'; }, []);
  return (
    <Shell kind="404" eyebrow="Ошибка 404" title="Точка не найдена" text="Похоже, страница переехала или в адресе ошибка. Проверьте ссылку или найдите нужное через поиск.">
      <form className={s.search} role="search" onSubmit={submit}>
        <label htmlFor="nf-q" className="sr-only">Поиск по каталогу</label>
        <Icon name="search" size={20} stroke={2} />
        <input id="nf-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Например, тахеометр Trimble" />
        <button type="submit">Найти</button>
      </form>
      <div className={s.actions}>
        <SmartLink href="/" className={`${s.btn} ${s.primary}`}><Icon name="home" size={18} stroke={2} />На главную</SmartLink>
        <SmartLink href="/catalog" className={s.btn}><Icon name="grid" size={18} stroke={2} />В каталог</SmartLink>
      </div>
      <div className={s.popular}>
        <span>Популярное</span>
        <div>
          <SmartLink href="/catalog/gnss-oborudovanie/priemniki">GNSS-приёмники</SmartLink>
          <SmartLink href="/catalog/s/ts">Тахеометры</SmartLink>
          <SmartLink href="/services/repair">Сервисный центр</SmartLink>
          <SmartLink href="/promo">Акции</SmartLink>
        </div>
      </div>
    </Shell>
  );
}

export function ServerErrorPage({ code = '7F3A-21C9' }: { code?: string }) {
  return (
    <Shell kind="500" eyebrow="Ошибка 500" title="Что-то пошло не так" text="Сервер не смог обработать запрос. Мы уже знаем о проблеме и выравниваем систему — обновите страницу через минуту.">
      <div className={`${s.actions} ${s.actionsStack}`}>
        <button type="button" className={`${s.btn} ${s.primary}`} onClick={() => window.location.reload()}><Icon name="refresh" size={18} stroke={2} />Обновить страницу</button>
        <a href={`${import.meta.env.BASE_URL}`} className={s.btn}><Icon name="home" size={18} stroke={2} />На главную</a>
      </div>
      <div className={s.card}>
        <span className={s.cardIcon}><Icon name="call" size={20} stroke={1.8} /></span>
        <span className={s.cardText}><b>Ошибка повторяется?</b><span>Позвоните <a href="tel:+77008290000">+7 700 829 00 00</a> — оформим заказ по телефону.</span></span>
      </div>
      <span className={s.code}>Код запроса: {code}</span>
    </Shell>
  );
}

export function OfflinePage({ onRetry }: { onRetry?: () => void }) {
  return (
    <Shell kind="offline" eyebrow="Нет соединения" title="Потерян сигнал" text="Проверьте подключение к интернету. Как только связь восстановится, страница загрузится сама — корзина и избранное сохранятся.">
      <div className={s.card} role="status">
        <span className={`${s.cardIcon} ${s.cardIconRed}`}><Icon name="wifiOff" size={20} stroke={1.8} /></span>
        <span className={s.cardText}><b>Ищем сеть<span className="er-dot">.</span><span className="er-dot" style={{ animationDelay: '.2s' }}>.</span><span className="er-dot" style={{ animationDelay: '.4s' }}>.</span></b><span>Проверьте Wi-Fi или мобильный интернет</span></span>
      </div>
      <div className={s.actions}>
        <button type="button" className={`${s.btn} ${s.primary}`} onClick={onRetry ?? (() => window.location.reload())}><Icon name="refresh" size={18} stroke={2} />Попробовать снова</button>
      </div>
    </Shell>
  );
}

/** True while the browser reports no network; flips back on the «online» event. */
export function useOffline() {
  const [off, setOff] = useState(() => typeof navigator !== 'undefined' && navigator.onLine === false);
  useEffect(() => {
    const on = () => setOff(false);
    const no = () => setOff(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', no);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', no); };
  }, []);
  return [off, () => setOff(navigator.onLine === false)] as const;
}

/** Catches render errors on a page and shows the 500 screen instead of a blank page. */
export class PageErrorBoundary extends Component<{ children: ReactNode; resetKey: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidUpdate(prev: { resetKey: string }) { if (prev.resetKey !== this.props.resetKey && this.state.failed) this.setState({ failed: false }); }
  render() { return this.state.failed ? <ServerErrorPage /> : this.props.children; }
}

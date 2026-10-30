import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { SearchResults } from './SearchResults';
import s from './MobileSearch.module.css';

/** Full-screen search for phones. */
export function MobileSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => input.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.clearTimeout(t); window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={s.screen} role="dialog" aria-modal="true" aria-label="Поиск">
      <div className={s.bar}>
        <button type="button" aria-label="Назад" className={s.back} onClick={onClose}><Icon name="chevronLeft" size={22} stroke={2} /></button>
        <form className={s.field} role="search" onSubmit={(e) => { e.preventDefault(); input.current?.blur(); }}>
          <Icon name="search" size={18} stroke={2} color="var(--c-green-600)" />
          <input ref={input} type="search" autoComplete="off" aria-label="Поиск по каталогу" placeholder="Поиск по каталогу" value={q} onChange={(e) => setQ(e.target.value)} />
          {q && <button type="button" aria-label="Очистить поиск" className={s.clear} onClick={() => { setQ(''); input.current?.focus(); }}><Icon name="close" size={14} stroke={2.2} /></button>}
        </form>
      </div>
      <div className={s.body}>
        <SearchResults mobile query={q} onPick={setQ} onGo={onClose} />
      </div>
    </div>
  );
}

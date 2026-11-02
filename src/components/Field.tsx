import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon } from './Icon';
import s from './Field.module.css';

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; aside?: ReactNode };

/** Labelled text field; password fields get a show/hide toggle. */
export function Field({ label, aside, type = 'text', ...rest }: Props) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPass = type === 'password';
  return (
    <div className={s.field}>
      <span className={s.head}><label htmlFor={id}>{label}</label>{aside}</span>
      <span className={s.box}>
        <input id={id} type={isPass && show ? 'text' : type} className={`${s.input} ${isPass ? s.withEye : ''}`} {...rest} />
        {isPass && (
          <button type="button" className={s.eye} aria-label={show ? 'Скрыть пароль' : 'Показать пароль'} aria-pressed={show} onClick={() => setShow((v) => !v)}>
            <Icon name="eye" size={20} stroke={1.6} />
          </button>
        )}
      </span>
    </div>
  );
}

export function Check({ children, defaultChecked = false }: { children: ReactNode; defaultChecked?: boolean }) {
  return (
    <label className={s.check}>
      <input type="checkbox" defaultChecked={defaultChecked} />
      <span className={s.tick} aria-hidden="true"><Icon name="check" size={14} stroke={2.4} /></span>
      <span>{children}</span>
    </label>
  );
}

type IconProps = InputHTMLAttributes<HTMLInputElement> & { icon: 'call' | 'mail' | 'lock'; label: string };

/** Field with a leading icon and no visible label (the label is read by screen readers). */
export function IconField({ icon, label, type = 'text', ...rest }: IconProps) {
  const [show, setShow] = useState(false);
  const isPass = type === 'password';
  return (
    <span className={s.box}>
      <span className={s.lead} aria-hidden="true"><Icon name={icon} size={20} stroke={1.6} /></span>
      <input aria-label={label} type={isPass && show ? 'text' : type} className={`${s.input} ${s.withIcon} ${isPass ? s.withEye : ''}`} {...rest} />
      {isPass && (
        <button type="button" className={s.eye} aria-label={show ? 'Скрыть пароль' : 'Показать пароль'} aria-pressed={show} onClick={() => setShow((v) => !v)}>
          <Icon name="eye" size={20} stroke={1.6} />
        </button>
      )}
    </span>
  );
}

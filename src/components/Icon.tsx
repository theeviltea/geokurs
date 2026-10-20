import { icons, type IconName } from '../icons/icons';

type Props = { name: IconName; size?: number; stroke?: number; className?: string; color?: string };

export function Icon({ name, size = 22, stroke = 1.7, className, color = 'currentColor' }: Props) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}

import { Link } from 'react-router-dom';
import type { AnchorHTMLAttributes } from 'react';

/** Internal paths ("/…") go through the router; everything else is a plain link. */
export function SmartLink({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href.startsWith('/')) return <Link to={href} {...rest} />;
  return <a href={href} {...rest} />;
}

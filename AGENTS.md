# Notes for coding agents

- Design source: the «Geokurs Online Redesign» design canvas and «Geokurs Design System». Match them 1:1.
- Colours, radii and spacing only via CSS variables from `src/theme/tokens.css`
  (generated — edit `design/tokens.json`, then `npm run tokens`).
- Headings use Montserrat (`var(--font-display)`), body text Golos Text (`var(--font-text)`).
- Icons: `<Icon name="…" />` from `src/icons/icons.ts` (Hugeicons Stroke Rounded).
- Never use Leica (competitor) anywhere — products, images, copy.
- Before committing run `npm run build` (includes the typecheck).

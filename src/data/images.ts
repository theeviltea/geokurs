// Pictures exported from the design canvas live in public/images.
// The single-file artifact preview inlines them into window.__GK_IMAGES (see scripts/build-artifact.mjs).
declare global { interface Window { __GK_IMAGES?: Record<string, string> } }

export const img = (file: string) =>
  (typeof window !== 'undefined' && window.__GK_IMAGES?.[file]) || `${import.meta.env.BASE_URL}images/${file}`;

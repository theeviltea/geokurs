// Pictures exported from the design canvas live in public/images, documents in public/docs.
// The single-file artifact preview inlines them into window.__GK_IMAGES / __GK_DOCS (see scripts/build-artifact.mjs).
declare global { interface Window { __GK_IMAGES?: Record<string, string>; __GK_DOCS?: Record<string, string> } }

export const img = (file: string) =>
  (typeof window !== 'undefined' && window.__GK_IMAGES?.[file]) || `${import.meta.env.BASE_URL}images/${file}`;

export const docUrl = (file: string) =>
  (typeof window !== 'undefined' && window.__GK_DOCS?.[file]) || `${import.meta.env.BASE_URL}docs/${file}`;

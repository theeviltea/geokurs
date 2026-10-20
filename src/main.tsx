import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
// Global styles first so component modules can override them.
import './theme/global.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {import.meta.env.VITE_ARTIFACT ? (
      // Single-file artifact preview: no real URL space, keep routing in memory.
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ) : (
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <App />
      </BrowserRouter>
    )}
  </StrictMode>,
);

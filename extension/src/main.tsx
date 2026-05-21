import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Popup } from 'extension/src/popup';

import 'extension/src/globals.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Missing #root');
createRoot(rootEl).render(
  <StrictMode>
    <Popup />
  </StrictMode>
);

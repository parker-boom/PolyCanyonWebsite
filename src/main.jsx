import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// An open tab may request a chunk from the previous build after an update.
// Refresh once to get the current files; persistent failures keep the recovery UI.
window.addEventListener('vite:preloadError', (event) => {
  try {
    const key = 'polycanyon:asset-reload-at';
    const now = Date.now();
    const lastReload = Number(sessionStorage.getItem(key));
    if (lastReload && now - lastReload < 30000) return;
    sessionStorage.setItem(key, String(now));
    event.preventDefault();
    window.location.reload();
  } catch {
    // If browser storage is unavailable, let the page offer manual recovery.
  }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

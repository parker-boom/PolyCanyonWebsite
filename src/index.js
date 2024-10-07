// Importing libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// Importing pages
import './index.css';
import DownloadPageMobile from './downloads/DownloadPageMobile';
import DownloadPageWeb from './downloads/DownloadPageWeb';
import SupportPage from './support/SupportPage';
import InfoPage from './info/InfoPage';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Router>
      <Routes>
        <Route path="/support" element={<SupportPage />} />
        <Route path="/download" element={isMobile ? <DownloadPageMobile /> : <DownloadPageWeb />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/" element={isMobile ? <DownloadPageMobile /> : <DownloadPageWeb />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

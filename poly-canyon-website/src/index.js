import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DownloadPage from './downloads/DownloadPage';
import SupportPage from './support/SupportPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/support" element={<SupportPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/" element={<DownloadPage />} /> 
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



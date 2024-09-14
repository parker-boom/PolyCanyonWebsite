import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DownloadPage from './downloads/DownloadPage';



function App() {
  return (
    <div className="App">
      <DownloadPage />
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



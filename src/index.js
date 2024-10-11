// Importing libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

// Importing components
import Navigation from './layout/Navigation';
import { Footer, FooterText } from './layout/Navigation.styles';

// Importing pages
import './index.css';
import DownloadPageMobile from './downloads/DownloadPageMobile';
import DownloadPageWeb from './downloads/DownloadPageWeb';
import InfoPage from './info/InfoPage';
import StructuresPage from './structures/Structures.js';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Router>
      <AppContainer>
        <Navigation />
        <Content>
          <Routes>
            <Route path="/download" element={isMobile ? <DownloadPageMobile /> : <DownloadPageWeb />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/" element={isMobile ? <DownloadPageMobile /> : <DownloadPageWeb />} />
            <Route path="/structures" element={<StructuresPage />} />
          </Routes>
        </Content>
        <Footer>
          <FooterText>© 2024 Poly Canyon App. All rights reserved.</FooterText>
          <FooterText>Cal Poly, San Luis Obispo</FooterText>
        </Footer>
      </AppContainer>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

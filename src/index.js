/**
 * Main App Component
 * Purpose: Manages routing and layout for the Poly Canyon app. Provides a responsive navigation structure with separate pages for downloading the app, viewing info, and exploring structures.
 * Key Features: Responsive routing (mobile vs. web view), centralized navigation, dynamic footer, and page switching using react-router-dom.
 * Dependencies: react-responsive for media queries, react-router-dom for routing, styled-components for layout, and ReactDOM for rendering.
 */

/*
Imports
*/

// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { HelmetProvider } from 'react-helmet-async';

import './index.css';
import Navigation from './layout/Navigation';
import { Footer, FooterText } from './layout/Navigation.styles';

// Pages
import DownloadPageMobile from './downloads/DownloadPageMobile';
import DownloadPageWeb from './downloads/DownloadPageWeb';
import InfoPage from './info/InfoPage';
import StructuresPage from './structures/Structures';

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
            {/* Define your routes */}
            <Route path="/info" element={<InfoPage />} />
            <Route path="/structures" element={<StructuresPage />} />
            <Route
              path="/download"
              element={isMobile ? <DownloadPageMobile /> : <DownloadPageWeb />}
            />

            {/* Redirect any other route to /download */}
            <Route path="*" element={<Navigate to="/download" replace />} />
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

// Wrap your app with HelmetProvider to manage dynamic metadata
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

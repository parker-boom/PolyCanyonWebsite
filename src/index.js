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
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { HelmetProvider } from 'react-helmet-async';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// Styles
import './index.css';
import Navigation from './layout/Navigation.js';
import { Footer, FooterText } from './layout/Navigation.styles.js';

// Pages
import HomeWeb from './home/homeWeb.js';
import HomeMobile from './home/homeMobile.js';
import DownloadPageMobile from './downloads/DownloadPageMobile.js';
import DownloadPageWeb from './downloads/DownloadPageWeb.js';
import InfoPageMobile from './info/InfoPageMobile.js';
import InfoPageWeb from './info/InfoPageWeb.js';
import MapPageWeb from './map/MapPageWeb.js';
import MapPageMobile from './map/MapPageMobile.js';
import StructureList from './structures/StructureList.js';
import StructureListMobile from './structures/StructureListMobile.js';
import StructureInfo from './structures/StructureInfo.js';
import StructureInfoMobile from './structures/StructureInfoMobile.js';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  margin-top: ${(props) => (props.path === '/' ? '0' : '80px')};
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    position: relative;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #ffffff;
    min-height: 100%;
    width: 100%;
    position: relative;
  }
`;

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const location = useLocation();

  useEffect(() => {
    // Check if the URL contains #invite_token
    if (window.location.hash.includes('invite_token')) {
      const token = window.location.hash.split('invite_token=')[1];
      if (token) {
        // Redirect to /admin with the invite token
        window.location.href = `/admin/#invite_token=${token}`;
      }
    }
  }, []);

  return (
    <AppContainer>
      {location.pathname !== '/' && <Navigation />}
      <Content path={location.pathname}>
        <Routes>
          {/* Home route */}
          <Route path="/" element={isMobile ? <HomeMobile /> : <HomeWeb />} />

          {/* Main routes */}
          <Route
            path="/info"
            element={isMobile ? <InfoPageMobile /> : <InfoPageWeb />}
          />

          {/* Structures routes */}
          <Route
            path="/structures"
            element={isMobile ? <StructureListMobile /> : <StructureList />}
          />
          <Route
            path="/structures/:structureUrl"
            element={isMobile ? <StructureInfoMobile /> : <StructureInfo />}
          />

          {/* Download route */}
          <Route
            path="/download"
            element={isMobile ? <DownloadPageMobile /> : <DownloadPageWeb />}
          />

          {/* Map route */}
          <Route
            path="/map"
            element={isMobile ? <MapPageMobile /> : <MapPageWeb />}
          />

          {/* Redirect any unmatched route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>

      {location.pathname !== '/' && (
        <Footer>
          <FooterText>© 2024 Poly Canyon App. All rights reserved.</FooterText>
          <FooterText>Cal Poly, San Luis Obispo</FooterText>
        </Footer>
      )}
    </AppContainer>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <HelmetProvider>
        <GlobalStyle />
        <App />
      </HelmetProvider>
    </Router>
  </React.StrictMode>
);

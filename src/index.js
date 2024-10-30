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
import styled from 'styled-components';

import './index.css';
import Navigation from './layout/Navigation.js';
import { Footer, FooterText } from './layout/Navigation.styles.js';

// Pages
import DownloadPageMobile from './downloads/DownloadPageMobile.js';
import DownloadPageWeb from './downloads/DownloadPageWeb.js';
import InfoPageMobile from './info/InfoPageMobile.js';
import InfoPageWeb from './info/InfoPageWeb.js';
import StructuresList from './structures/StructureList.js';
import StructureInfo from './structures/StructureInfo.js';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <HelmetProvider>
      <Router>
        <AppContainer>
          {/* Conditionally render Navigation based on route */}
          <Routes>
            <Route path="/structure/info" element={<StructureInfo />} />
            <Route
              path="*"
              element={
                <>
                  <Navigation />
                  <Content>
                    <Routes>
                      <Route
                        path="/info"
                        element={
                          isMobile ? <InfoPageMobile /> : <InfoPageWeb />
                        }
                      />
                      <Route path="/structures" element={<StructuresList />} />
                      <Route
                        path="/download"
                        element={
                          isMobile ? (
                            <DownloadPageMobile />
                          ) : (
                            <DownloadPageWeb />
                          )
                        }
                      />
                      <Route
                        path="*"
                        element={<Navigate to="/download" replace />}
                      />
                    </Routes>
                  </Content>
                  <Footer>
                    <FooterText>
                      © 2024 Poly Canyon App. All rights reserved.
                    </FooterText>
                    <FooterText>Cal Poly, San Luis Obispo</FooterText>
                  </Footer>
                </>
              }
            />
          </Routes>
        </AppContainer>
      </Router>
    </HelmetProvider>
  );
};

// Wrap your app with HelmetProvider to manage dynamic metadata
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

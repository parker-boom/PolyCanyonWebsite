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
  useLocation,
} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { HelmetProvider } from 'react-helmet-async';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import './index.css';
import Navigation from './layout/Navigation.js';
import { Footer, FooterText } from './layout/Navigation.styles.js';

// Pages
import HomeWeb from './home/homeWeb';
import HomeMobile from './home/homeMobile';
import DownloadPageMobile from './downloads/DownloadPageMobile';
import DownloadPageWeb from './downloads/DownloadPageWeb';
import InfoPageMobile from './info/InfoPageMobile';
import InfoPageWeb from './info/InfoPageWeb';
import StructuresPage from './structures/Structures';
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
  margin-top: ${(props) =>
    props.path === '/' ? '0' : '80px'}; // No margin for home page
`;

// Separate component to use useLocation hook
function AppContent() {
const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const location = useLocation();

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={null} />
        <Route path="*" element={<Navigation />} />
      </Routes>

      <Content path={location.pathname}>
        <Routes>
          {/* Home route with mobile/web conditional rendering */}
          <Route path="/" element={isMobile ? <HomeMobile /> : <HomeWeb />} />

          {/* Other routes */}
          <Route
            path="/info"
            element={isMobile ? <InfoPageMobile /> : <InfoPageWeb />}
          />
          <Route path="/structures" element={<StructuresPage />} />
          <Route
            path="/download"
            element={isMobile ? <DownloadPageMobile /> : <DownloadPageWeb />}
          />

          {/* Redirect any unmatched route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>

      {/* Only show Footer on non-home routes */}
      <Routes>
        <Route path="/" element={null} />
        <Route
          path="*"
          element={
            <Footer>
              <FooterText>
                © 2024 Poly Canyon App. All rights reserved.
              </FooterText>
              <FooterText>Cal Poly, San Luis Obispo</FooterText>
            </Footer>
          }
        />
      </Routes>
    </AppContainer>
  );
}

// Main App component
function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

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
import {
  Footer,
  FooterText,
  FooterDivider,
} from './layout/Navigation.styles.js';

// Pages
import HomeWeb from './home/homeWeb.js';
import HomeMobile from './home/homeMobile.js';
import DownloadPageMobile from './downloads/DownloadPageMobile.js';
import DownloadPageWeb from './downloads/DownloadPageWeb.js';
import InfoPageMobile from './info/InfoPageMobile.js';
import InfoPageWeb from './info/InfoPageWeb.js';
import MapPageWeb from './map/MapPageWeb.js';
import MapPageMobile from './map/MapPageMobile.js';
import StructureList from './structures/list/StructureList.js';
import StructureListMobile from './structures/list/StructureListMobile.js';
import StructureInfo from './structures/info/StructureInfo.js';
import StructureInfoMobile from './structures/info/StructureInfoMobile.js';
import AccessoryStructureInfo from './structures/accessory/AccessoryStructureInfo.js';
import AccessoryStructureInfoMobile from './structures/accessory/AccessoryStructureInfoMobile.js';
import ChroniclesHome from './chronicles/Home/cHome.js';
import Story from './chronicles/Story/cStory.js';
import Land from './chronicles/Land/cLand.js';
import People from './chronicles/People/cPeople.js';
import Projects from './chronicles/Projects/cProjects.js';
import ChroniclesHomeMobile from './chronicles/Home/cHome.mobile.js';

// Utils
import { loadGoogleMapsScript } from './utils/googleMaps.js';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  margin-top: ${(props) =>
    props.path === '/' || props.path.startsWith('/chronicles') ? '0' : '80px'};
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
    // Load Google Maps when app initializes
    loadGoogleMapsScript();

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
      {!location.pathname.startsWith('/chronicles') &&
        (location.pathname !== '/' || isMobile) && <Navigation />}
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
          <Route
            path="/structures/accessory"
            element={
              isMobile ? (
                <AccessoryStructureInfoMobile />
              ) : (
                <AccessoryStructureInfo />
              )
            }
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

          {/* Chronicles routes */}
          <Route
            path="/chronicles"
            element={isMobile ? <ChroniclesHomeMobile /> : <ChroniclesHome />}
          />
          <Route
            path="/chronicles/2"
            element={isMobile ? <ChroniclesHomeMobile /> : <ChroniclesHome />}
          />
          <Route path="/chronicles/story" element={<Story />} />
          <Route path="/chronicles/land" element={<Land />} />
          <Route path="/chronicles/people" element={<People />} />
          <Route path="/chronicles/people/:type" element={<People />} />
          <Route path="/chronicles/projects" element={<Projects />} />

          {/* Redirect any unmatched route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>

      {location.pathname !== '/' &&
        !location.pathname.startsWith('/chronicles') && (
          <Footer>
            <FooterText $primary>© 2024 Poly Canyon App</FooterText>
            <FooterText $primary $developer>
              Designed & Developed by Parker Jones
            </FooterText>
            <FooterText $contact>
              <a href="mailto:pjones15@calpoly.edu">pjones15@calpoly.edu</a>
              <FooterDivider>•</FooterDivider>
              <a href="tel:425-577-9664">425-577-9664</a>
            </FooterText>
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

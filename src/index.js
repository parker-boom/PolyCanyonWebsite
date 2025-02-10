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
import React, { useEffect, useState } from 'react';
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
import { FaTimes } from 'react-icons/fa';

// Styles
import './index.css';
import Navigation from './layout/Navigation.js';
import {
  Footer,
  FooterText,
  FooterDivider,
  CopyrightLink,
  DisclaimerPopup,
  DisclaimerContent,
  DisclaimerTitle,
  DisclaimerSection,
  CloseButton,
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
import PrivacyPolicy from './utils/privacyPolicy.js';

// Utils
import { loadGoogleMapsScript } from './utils/googleMaps.js';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Any time the route changes, scroll to the top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
  const [isDisclaimerOpen, setDisclaimerOpen] = useState(false);

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
        !location.pathname.startsWith('/privacy') &&
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

          {/* Privacy Policy route */}
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Redirect any unmatched route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>

      {location.pathname !== '/' &&
        !location.pathname.startsWith('/chronicles') &&
        !location.pathname.startsWith('/privacy') && (
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
            <CopyrightLink onClick={() => setDisclaimerOpen(true)}>
              Copyright Disclaimer
            </CopyrightLink>
          </Footer>
        )}

      {isDisclaimerOpen && (
        <DisclaimerPopup onClick={() => setDisclaimerOpen(false)}>
          <DisclaimerContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setDisclaimerOpen(false)}>
              <FaTimes />
            </CloseButton>
            <DisclaimerTitle>Copyright Disclaimer</DisclaimerTitle>
            <DisclaimerSection>
              <p>
                The content featured on this site, including images and
                information, is curated solely for educational, archival, and
                non-commercial purposes to document and preserve the history and
                cultural significance of Poly Canyon. We aim to present this
                information as part of a larger interactive experience that
                provides value to the community while respecting intellectual
                property rights.
              </p>
            </DisclaimerSection>

            <DisclaimerSection>
              <h3>Our Approach to Content:</h3>
              <p>
                Wherever possible, we attribute sources and highlight the
                origins of the materials used. Content such as photos and
                resources has been integrated into broader educational
                experiences, offering context and additional insights. Some
                images and materials originate from contributors and archives
                who have explicitly or implicitly supported their use for
                research and documentation.
              </p>
            </DisclaimerSection>

            <DisclaimerSection>
              <h3>Respect for Copyright Holders:</h3>
              <p>
                If you are the copyright owner of any material featured here and
                have concerns about its use, or if you prefer your content not
                be included, we are happy to address this. Please fill out our{' '}
                <a
                  href="https://forms.office.com/r/yL2REum2cj"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Opt-Out Form
                </a>{' '}
                or email at{' '}
                <a href="mailto:pjones15@calpoly.edu">pjones15@calpoly.edu</a>.
                We are committed to resolving such requests promptly and
                respectfully.
              </p>
            </DisclaimerSection>

            <DisclaimerSection>
              <h3>Good Faith Use:</h3>
              <p>
                This site operates under a good-faith belief that its use of
                copyrighted materials falls under fair use principles, as it is
                educational, transformative, and non-commercial in nature.
                However, we value collaboration and respect intellectual
                property rights above all else.
              </p>
            </DisclaimerSection>

            <DisclaimerSection>
              <p>
                By engaging with this site, users agree that all content is
                provided for informational and educational purposes only, with
                no intent to infringe on the rights of copyright holders.
              </p>
            </DisclaimerSection>
          </DisclaimerContent>
        </DisclaimerPopup>
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
        <ScrollToTop />
        <App />
      </HelmetProvider>
    </Router>
  </React.StrictMode>
);

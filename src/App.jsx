import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './layout/Navigation.jsx';
import Footer from './layout/Footer.jsx';
import PageMetadata from './app/PageMetadata.jsx';
import RoutePosition from './app/RoutePosition.jsx';
import PageErrorBoundary from './app/PageErrorBoundary.jsx';

const HomeWeb = lazy(() => import('./home/homeWeb.jsx'));
const Structures = lazy(() => import('./structures/list/StructureList.jsx'));
const StructureWeb = lazy(() => import('./structures/info/StructureInfo.jsx'));
const AccessoryWeb = lazy(
  () => import('./structures/accessory/AccessoryStructureInfo.jsx')
);
const Download = lazy(() => import('./downloads/DownloadPage.jsx'));
const About = lazy(() => import('./about/AboutPage.jsx'));
const Support = lazy(() => import('./support/SupportPage.jsx'));
const Privacy = lazy(() => import('./utils/privacyPolicy.jsx'));
const Shell = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;
const Content = styled.main`
  flex: 1;
  min-width: 0;
`;
const Loading = styled.div`
  padding: 60px 24px;
  min-height: 40vh;
  text-align: center;
  color: var(--green);
`;

export default function App() {
  const { pathname, search } = useLocation();

  return (
    <Shell>
      <PageMetadata />
      <RoutePosition />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <Content id="main-content" tabIndex={-1}>
        <PageErrorBoundary key={pathname}>
          <Suspense fallback={<Loading role="status">Loading…</Loading>}>
            <Routes>
              <Route path="/" element={<HomeWeb />} />
              <Route
                path="/info"
                element={<Navigate to="/about#visiting" replace />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/structures" element={<Structures />} />
              <Route path="/structures/accessory" element={<AccessoryWeb />} />
              <Route
                path="/structures/:structureUrl"
                element={<StructureWeb key={pathname + search} />}
              />
              <Route path="/app" element={<Download />} />
              <Route
                path="/download"
                element={<Navigate to="/app" replace />}
              />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/support" element={<Support />} />
              <Route
                path="/chronicles/projects"
                element={<Navigate to="/structures" replace />}
              />
              <Route
                path="/chronicles/land"
                element={<Navigate to="/about#visiting" replace />}
              />
              <Route
                path="/chronicles/people/*"
                element={<Navigate to="/about#stewardship" replace />}
              />
              <Route
                path="/chronicles/story"
                element={<Navigate to="/about#history" replace />}
              />
              <Route
                path="/chronicles/*"
                element={<Navigate to="/about" replace />}
              />
              <Route
                path="/map"
                element={<Navigate to="/about#visiting" replace />}
              />
              <Route
                path="*"
                element={
                  <Loading>
                    <h1>Page not found</h1>
                    <p>This address doesn’t match a page in the archive.</p>
                    <Link to="/structures">Browse the structures</Link>
                  </Loading>
                }
              />
            </Routes>
          </Suspense>
        </PageErrorBoundary>
      </Content>
      <Footer />
    </Shell>
  );
}

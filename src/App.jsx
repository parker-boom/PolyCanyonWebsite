import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Navigation from './layout/Navigation.jsx';
import Footer from './layout/Footer.jsx';
import PageMetadata from './app/PageMetadata.jsx';
import RoutePosition from './app/RoutePosition.jsx';
import PageErrorBoundary from './app/PageErrorBoundary.jsx';

const HomeWeb = lazy(() => import('./home/homeWeb.jsx'));
const HomeMobile = lazy(() => import('./home/homeMobile.jsx'));
const InfoWeb = lazy(() => import('./info/InfoPageWeb.jsx'));
const InfoMobile = lazy(() => import('./info/InfoPageMobile.jsx'));
const Structures = lazy(() => import('./structures/list/StructureList.jsx'));
const StructureWeb = lazy(() => import('./structures/info/StructureInfo.jsx'));
const StructureMobile = lazy(
  () => import('./structures/info/StructureInfoMobile.jsx')
);
const AccessoryWeb = lazy(
  () => import('./structures/accessory/AccessoryStructureInfo.jsx')
);
const AccessoryMobile = lazy(
  () => import('./structures/accessory/AccessoryStructureInfoMobile.jsx')
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
  margin-top: ${({ $home }) => ($home ? '0' : '80px')};
`;
const Loading = styled.div`
  padding: 60px 24px;
  min-height: 40vh;
  text-align: center;
  color: #376d31;
`;

export default function App() {
  const mobile = useMediaQuery({ maxWidth: 768 });
  const { pathname, search } = useLocation();
  const detail = /^\/structures\/[^/]+\/?$/.test(pathname);
  return (
    <Shell>
      <PageMetadata />
      <RoutePosition />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {!detail && (pathname !== '/' || mobile) && <Navigation />}
      <Content
        id="main-content"
        $home={pathname === '/' || detail}
        tabIndex={-1}
      >
        <PageErrorBoundary key={pathname}>
          <Suspense fallback={<Loading role="status">Loading…</Loading>}>
            <Routes>
              <Route path="/" element={mobile ? <HomeMobile /> : <HomeWeb />} />
              <Route
                path="/info"
                element={mobile ? <InfoMobile /> : <InfoWeb />}
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/structures"
                element={<Structures mobile={mobile} />}
              />
              <Route
                path="/structures/accessory"
                element={mobile ? <AccessoryMobile /> : <AccessoryWeb />}
              />
              <Route
                path="/structures/:structureUrl"
                element={
                  mobile ? (
                    <StructureMobile key={pathname + search} />
                  ) : (
                    <StructureWeb key={pathname + search} />
                  )
                }
              />
              <Route path="/download" element={<Download />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/support" element={<Support />} />
              <Route
                path="/chronicles/projects"
                element={<Navigate to="/structures" replace />}
              />
              <Route
                path="/chronicles/land"
                element={<Navigate to="/info" replace />}
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
              <Route path="/map" element={<Navigate to="/info" replace />} />
              <Route
                path="*"
                element={
                  <Loading>
                    <h1>Page not found</h1>
                    <p>There’s more to explore in the canyon.</p>
                    <Link to="/structures">Browse the structures</Link>
                  </Loading>
                }
              />
            </Routes>
          </Suspense>
        </PageErrorBoundary>
      </Content>
      {pathname !== '/' && !detail && <Footer />}
    </Shell>
  );
}

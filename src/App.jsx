import React, { lazy, Suspense, useLayoutEffect } from 'react';
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
  margin-top: 0;
  > :not([role='status']) {
    animation: page-settle 200ms ease-out;
  }
  @keyframes page-settle {
    from {
      transform: translateY(5px);
    }
    to {
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    > * {
      animation: none;
    }
  }
`;
const Loading = styled.div`
  padding: 60px 24px;
  /* Keep the footer below the viewport while a route chunk loads. */
  min-height: calc(100dvh - 88px);
  text-align: center;
  color: #376d31;
`;

export default function App() {
  useLayoutEffect(() => {
    document.documentElement.classList.remove('app-booting');
  }, []);
  const { pathname, search } = useLocation();
  return (
    <Shell>
      <PageMetadata />
      <RoutePosition />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <Content id="main-content" $home={pathname === '/'} tabIndex={-1}>
        <Suspense fallback={<Loading role="status">Loading…</Loading>}>
          <PageErrorBoundary key={pathname}>
            <Routes>
              <Route path="/" element={<HomeWeb />} />
              <Route
                path="/info"
                element={<Navigate to="/about#visit" replace />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/structures" element={<Structures />} />
              <Route
                path="/structures/history"
                element={<Structures historical />}
              />
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
                element={<Navigate to="/about#visit" replace />}
              />
              <Route
                path="/chronicles/people/*"
                element={<Navigate to="/about#project" replace />}
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
                element={<Navigate to="/about#visit" replace />}
              />
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
          </PageErrorBoundary>
        </Suspense>
      </Content>
      <Footer />
    </Shell>
  );
}

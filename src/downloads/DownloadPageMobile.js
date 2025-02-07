/**
 * Component: DownloadPageMobile
 * Purpose: Mobile version of the download page. Displays app information and a download button based on the user's device (iOS or Android).
 * Key Features: Device detection, GIF preview, device-specific download button (App Store or Google Play), and switch between iOS and Android options.
 * Dependencies: React hooks (useState, useEffect), LazyGif component for displaying app previews, react-icons for device icons.
 */

/*
Imports
*/

// Libraries
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { isIOS, isAndroid } from 'react-device-detect';
import { FaApple, FaAndroid, FaArrowRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

// Styles
import {
  PageContainer,
  RoundedContainer,
  LearnMoreButton,
  GifContainer,
  DownloadButton,
  DeviceSwitchContainer,
  SwitchText,
  Header,
  Subtitle,
  MainTitle,
  Divider,
} from './DownloadPage.styles.js';

// Component
import LazyGif from './LazyGif.js';

/*
Components & Render
*/
const DownloadPageMobile = () => {
  // State variables
  const [deviceType, setDeviceType] = useState('unknown');
  const downloadButtonRef = useRef(null);

  // Change GIF based on device
  useEffect(() => {
    if (isIOS) {
      setDeviceType('ios');
    } else if (isAndroid) {
      setDeviceType('android');
    }
  }, []);

  const toggleDevice = () => {
    setDeviceType((prevType) => (prevType === 'ios' ? 'android' : 'ios'));
  };

  // Change link based on device
  const getStoreLink = () => {
    return deviceType === 'ios'
      ? 'https://apps.apple.com/us/app/poly-canyon/id6499063781'
      : 'https://play.google.com/store/apps/details?id=com.polycanyon&pcampaignid=web_share';
  };

  const getStoreIcon = () => {
    return deviceType === 'ios' ? <FaApple /> : <FaAndroid />;
  };

  return (
    <>
      {/* Meta Data */}
      <Helmet>
        <title>Download the Poly Canyon App</title>
        <meta
          name="description"
          content="Explore the unique student-built structures and projects from anywhere. Experience the area through the app, available for iOS and Android."
        />
        <meta property="og:title" content="Download the Poly Canyon App" />
        <meta
          property="og:description"
          content="Explore the unique student-built structures and projects from anywhere. Experience the area through the app, available for iOS and Android."
        />
        <meta property="og:url" content="https://polycanyon.com/download" />
        <meta name="twitter:title" content="Download the Poly Canyon App" />
        <meta
          name="twitter:description"
          content="Explore the unique student-built structures and projects from anywhere. Experience the area through the app, available for iOS and Android."
        />
      </Helmet>

      <PageContainer>
        <RoundedContainer>
          <Header>
            <Subtitle>The Poly Canyon</Subtitle>
            <MainTitle>Mobile App</MainTitle>
          </Header>

          <Divider />

          <DownloadButton
            ref={downloadButtonRef}
            href={getStoreLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download button for ${deviceType === 'ios' ? 'iOS' : 'Android'}`}
          >
            {getStoreIcon()} Download for{' '}
            {deviceType === 'ios' ? 'iOS' : 'Android'}
          </DownloadButton>

          {/* Moved device switch inside RoundedContainer */}
          <DeviceSwitchContainer>
            <SwitchText
              onClick={toggleDevice}
              onKeyPress={(e) => e.key === 'Enter' && toggleDevice()}
              tabIndex={0}
              role="button"
              aria-label={`Switch the download button to ${deviceType === 'ios' ? 'Android' : 'iOS'}`}
            >
              Switch to {deviceType === 'ios' ? 'Android' : 'iOS'}
            </SwitchText>
          </DeviceSwitchContainer>
        </RoundedContainer>

        <Suspense fallback={<div>Loading preview...</div>}>
          <GifContainer>
            <LazyGif deviceType={deviceType} />
          </GifContainer>
        </Suspense>

        {/* Removed margin-top from LearnMoreButton */}
        <LearnMoreButton to="/info" style={{ marginTop: '0px' }}>
          Learn More First <FaArrowRight />
        </LearnMoreButton>
      </PageContainer>
    </>
  );
};

// // Used in Index.js (Mobile only)
export default DownloadPageMobile;

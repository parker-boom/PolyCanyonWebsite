// DownloadPage.js
// This component renders the download page for the Poly Canyon app, 
// detecting the user's device type and providing appropriate download links.

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { isIOS, isAndroid } from 'react-device-detect';
import { FaApple, FaAndroid } from 'react-icons/fa';
import app360 from '../assets/app360.jpg';
import {
  PageContainer,
  IconContainer,
  Title,
  Subtitle,
  DownloadButton,
  GifContainer,
  DeviceSwitchContainer,
  SwitchText,
  Footer,
  FooterText,
} from './DownloadPage.styles';

const LazyGif = lazy(() => import('./LazyGif')); // Lazy load the GIF component

const DownloadPage = () => {
  const [deviceType, setDeviceType] = useState('unknown'); // State to track device type

  useEffect(() => {
    // Determine device type on component mount
    if (isIOS) {
      setDeviceType('ios');
    } else if (isAndroid) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  const toggleDevice = () => {
    // Toggle between iOS and Android device types
    setDeviceType(prevType => (prevType === 'ios' ? 'android' : 'ios'));
  };

  const getStoreLink = () => {
    // Return the appropriate app store link based on device type
    return deviceType === 'ios'
      ? 'https://apps.apple.com/us/app/poly-canyon/id6499063781'
      : 'https://play.google.com/store/apps/details?id=com.polycanyon&pcampaignid=web_share';
  };

  const getStoreIcon = () => {
    // Return the appropriate store icon based on device type
    return deviceType === 'ios' ? <FaApple /> : <FaAndroid />;
  };

  return (
    <PageContainer>
      {/* Meta tags for SEO */}
      <head>
        <title>Download Poly Canyon App</title>
        <meta name="description" content="Explore, learn, and track your journey through the canyon's architectural wonders" />
        <meta name="keywords" content="Poly Canyon, Cal Poly, interactive map, architecture, student projects" />
        <html lang="en" />
      </head>
      <IconContainer>
        {/* App icon */}
        <img 
          src={app360} 
          alt="Poly Canyon App Icon" 
          loading="lazy"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            borderRadius: '36px' 
          }} 
        />
      </IconContainer>
      <Title>Poly Canyon</Title>
      <Subtitle>Explore, learn, and track your journey through the canyon's architectural wonders</Subtitle>
      <Suspense fallback={<div>Loading preview...</div>}>
        {/* Lazy loaded GIF based on device type */}
        <GifContainer>
          <LazyGif deviceType={deviceType} />
        </GifContainer>
      </Suspense>

      {/* Download button */}
      <DownloadButton 
        href={getStoreLink()} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={`Download button for ${deviceType === 'ios' ? 'iOS' : 'Android'}`}
      >
        {getStoreIcon()} Download for {deviceType === 'ios' ? 'iOS' : 'Android'}
      </DownloadButton>
      <DeviceSwitchContainer>
        {/* Device switch text */}
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
      <Footer>
        {/* Footer information */}
        <FooterText>© 2024 Poly Canyon App. All rights reserved.</FooterText>
        <FooterText>Cal Poly, San Luis Obispo</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default DownloadPage;
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { isIOS, isAndroid } from 'react-device-detect';
import { FaApple, FaAndroid } from 'react-icons/fa';
import app360 from './assets/app360.jpg';

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
  // Remove ScrollToTopButton import
} from './DownloadPage.styles';

const LazyGif = lazy(() => import('./LazyGif'));

const DownloadPage = () => {
  const [deviceType, setDeviceType] = useState('unknown');
  // Remove showScrollButton state

  useEffect(() => {
    if (isIOS) {
      setDeviceType('ios');
    } else if (isAndroid) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
    }

    // Remove scroll event listener
  }, []);

  const toggleDevice = () => {
    setDeviceType(prevType => prevType === 'ios' ? 'android' : 'ios');
  };

  const getStoreLink = () => {
    if (deviceType === 'ios') {
      return 'https://apps.apple.com/us/app/poly-canyon/id6499063781';
    } else {
      return 'https://play.google.com/store/apps/details?id=com.polycanyon&pcampaignid=web_share';
    }
  };

  const getStoreIcon = () => {
    return deviceType === 'ios' ? <FaApple /> : <FaAndroid />;
  };

  // Remove scrollToTop function

  return (
    <PageContainer>
      <head>
        <title>Download Poly Canyon App</title>
        <meta name="description" content="Explore, learn, and track your journey through the canyon's architectural wonders" />
        <meta name="keywords" content="Poly Canyon, Cal Poly, interactive map, architecture, student projects" />
        <html lang="en" />
      </head>
      <IconContainer>
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
        <GifContainer>
          <LazyGif deviceType={deviceType} />
        </GifContainer>
      </Suspense>

      <DownloadButton 
        href={getStoreLink()} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={`Download button for ${deviceType === 'ios' ? 'iOS' : 'Android'}`}
      >
        {getStoreIcon()} Download for {deviceType === 'ios' ? 'iOS' : 'Android'}
      </DownloadButton>
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
      <Footer>
        <FooterText>© 2024 Poly Canyon App. All rights reserved.</FooterText>
        <FooterText>Cal Poly, San Luis Obispo</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default DownloadPage;
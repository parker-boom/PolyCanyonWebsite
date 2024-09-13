import React, { useState, useEffect } from 'react';
import { isIOS, isAndroid } from 'react-device-detect';
import { FaApple, FaAndroid, FaArrowUp } from 'react-icons/fa';
import LazyGif from './LazyGif';
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
  ScrollToTopButton,
} from './DownloadPage.styles';

const DownloadPage = () => {
  const [deviceType, setDeviceType] = useState('unknown');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (isIOS) {
      setDeviceType('ios');
    } else if (isAndroid) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
    }

    const handleScroll = () => {
      setShowScrollButton(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageContainer>
      <head>
        <title>Download Poly Canyon App</title>
        <meta name="description" content="Explore Poly Canyon with our interactive app. Download now for iOS and Android." />
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
      <Subtitle>Explore an interactive map and discover the fascinating structures and their rich history</Subtitle>
      <GifContainer>
        <LazyGif deviceType={deviceType} />
      </GifContainer>
      <DownloadButton 
        href={getStoreLink()} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={`Download for ${deviceType === 'ios' ? 'iOS' : 'Android'}`}
      >
        {getStoreIcon()} Download for {deviceType === 'ios' ? 'iOS' : 'Android'}
      </DownloadButton>
      <DeviceSwitchContainer>
        <SwitchText 
          onClick={toggleDevice} 
          onKeyPress={(e) => e.key === 'Enter' && toggleDevice()}
          tabIndex={0}
          role="button"
          aria-label={`Switch to ${deviceType === 'ios' ? 'Android' : 'iOS'}`}
        >
          Switch to {deviceType === 'ios' ? 'Android' : 'iOS'}
        </SwitchText>
      </DeviceSwitchContainer>
      <Footer>
        <FooterText>© 2024 Poly Canyon App. All rights reserved.</FooterText>
        <FooterText>Cal Poly, San Luis Obispo</FooterText>
      </Footer>
      <ScrollToTopButton 
        onClick={scrollToTop} 
        visible={showScrollButton}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </ScrollToTopButton>
    </PageContainer>
  );
};

export default DownloadPage;
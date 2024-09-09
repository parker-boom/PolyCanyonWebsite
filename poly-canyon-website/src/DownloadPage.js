// src/DownloadPage.js
import React, { useState, useEffect } from 'react';
import { isMobile, isIOS, isAndroid } from 'react-device-detect';
import { FaApple, FaAndroid } from 'react-icons/fa';
import LazyGif from './LazyGif';
import app360 from './assets/app360.jpg';
import { 
  PageContainer,
  IconContainer,
  Title,
  Subtitle,
  DownloadButton,
  GifContainer,
  ToggleContainer,
  ToggleButton,
  Footer,
  FooterText,
} from './DownloadPage.styles';

const DownloadPage = () => {
  const [deviceType, setDeviceType] = useState('unknown');
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    if (isIOS) {
      setDeviceType('ios');
    } else if (isAndroid) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
      setShowToggle(true);
    }
  }, []);

  const toggleDevice = () => {
    setDeviceType(prevType => prevType === 'ios' ? 'android' : 'ios');
  };

  const getStoreLink = () => {
    if (deviceType === 'ios') {
      return 'https://apps.apple.com/us/app/poly-canyon/id6499063781';
    } else if (deviceType === 'android') {
      return 'https://play.google.com/store/apps/details?id=com.polycanyon&pcampaignid=web_share';
    }
    return '#';
  };

  const getStoreIcon = () => {
    return deviceType === 'ios' ? <FaApple /> : <FaAndroid />;
  };

  return (
    <PageContainer>
      <IconContainer>
        <img 
          src={app360} 
          alt="Poly Canyon App Icon" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            borderRadius: '36px' 
          }} 
        />
      </IconContainer>
      <Title>Poly Canyon</Title>
      <Subtitle>Explore an interactive map and discover the fascinating structures of Poly Canyon</Subtitle>
      <GifContainer>
        <LazyGif deviceType={deviceType} />
      </GifContainer>
      <DownloadButton href={getStoreLink()} target="_blank" rel="noopener noreferrer">
        {getStoreIcon()} Download for {deviceType === 'ios' ? 'iOS' : 'Android'}
      </DownloadButton>
      {showToggle && (
        <ToggleContainer>
          <ToggleButton onClick={toggleDevice} active={deviceType === 'ios'}>iOS</ToggleButton>
          <ToggleButton onClick={toggleDevice} active={deviceType === 'android'}>Android</ToggleButton>
        </ToggleContainer>
      )}
      <Footer>
        <FooterText>© 2024 Poly Canyon App. All rights reserved.</FooterText>
        <FooterText>Cal Poly, San Luis Obispo</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default DownloadPage;
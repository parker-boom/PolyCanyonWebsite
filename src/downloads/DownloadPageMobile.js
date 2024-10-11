// DownloadPageMobile.js
// This component renders the download page for the Poly Canyon app on mobile devices, 
// detecting the user's device type and providing appropriate download links.

import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { isIOS, isAndroid } from 'react-device-detect';
import { FaApple, FaAndroid, FaArrowRight } from 'react-icons/fa'; 

import {
  DownloadButton,
  DeviceSwitchContainer,
  SwitchText,
  GifContainer,
  PageContainer,
  Title,
  RoundedContainer,
  WebDescription,
  WebLearnMoreButton,
} from './DownloadPage.styles';

const LazyGif = lazy(() => import('./LazyGif'));

const DownloadPageMobile = () => {
  const [deviceType, setDeviceType] = useState('unknown');
  const downloadButtonRef = useRef(null);

  useEffect(() => {
    if (isIOS) {
      setDeviceType('ios');
    } else if (isAndroid) {
      setDeviceType('android');
    }
  }, []);

  const toggleDevice = () => {
    setDeviceType(prevType => (prevType === 'ios' ? 'android' : 'ios'));
  };

  const getStoreLink = () => {
    return deviceType === 'ios'
      ? 'https://apps.apple.com/us/app/poly-canyon/id6499063781'
      : 'https://play.google.com/store/apps/details?id=com.polycanyon&pcampaignid=web_share';
  };

  const getStoreIcon = () => {
    return deviceType === 'ios' ? <FaApple /> : <FaAndroid />;
  };

  return (
    <PageContainer>

      {/* Download Description Widget */}
      <RoundedContainer style={{ padding: '0px 10px' }}>
        <Title>Download Now!</Title>
        <WebDescription>
          Explore, learn, and track your journey through the canyon's architectural wonders
        </WebDescription>
        <WebLearnMoreButton style={{ marginBottom: '15px' }} to="/info">Learn More <FaArrowRight /></WebLearnMoreButton>
      </RoundedContainer>

      {/* GIF */}
      <Suspense fallback={<div>Loading preview...</div>}>
        <GifContainer>
          <LazyGif deviceType={deviceType} />
        </GifContainer>
      </Suspense>

      {/* Download Button */}
      <DownloadButton 
        ref={downloadButtonRef}
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

    </PageContainer>
  );
};

export default DownloadPageMobile;
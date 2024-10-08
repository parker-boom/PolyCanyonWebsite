// DownloadPageMobile.js
// This component renders the download page for the Poly Canyon app on mobile devices, 
// detecting the user's device type and providing appropriate download links.

import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { isIOS, isAndroid } from 'react-device-detect';
import { FaApple, FaAndroid, FaBars, FaDownload, FaInfoCircle, FaBuilding, FaTimes, FaArrowRight } from 'react-icons/fa'; 
import app360 from '../assets/app360.jpg';
import {
  BannerMobile,
  MenuIcon,
  PolyCanyonTitle,
  Logo,
  PopupContainer,
  PopupContent,
  PopupCloseButton,
  PopupNavLink,
  PopupTitle,
  NavLinkContainer,
  Footer,
  FooterText,
} from '../Navigation';

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
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [activePage, setActivePage] = useState('download');

  useEffect(() => {
    if (isIOS) {
      setDeviceType('ios');
    } else if (isAndroid) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
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

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <PageContainer>
      <BannerMobile>
        <MenuIcon onClick={togglePopup}>
          <FaBars />
        </MenuIcon>
        <PolyCanyonTitle>
          Poly Canyon
        </PolyCanyonTitle>
        <Logo src={app360} alt="Poly Canyon Logo" />
      </BannerMobile>

      {isPopupOpen && (
        <PopupContainer onClick={togglePopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupCloseButton onClick={togglePopup}>
              <FaTimes />
            </PopupCloseButton>
            <PopupTitle>Switch Pages</PopupTitle>
            <NavLinkContainer>
              <PopupNavLink to="/download" $isActive={activePage === 'download'} onClick={() => { togglePopup(); setActivePage('download'); }}>
                <FaDownload /> Download
              </PopupNavLink>
              <PopupNavLink to="/info" $isActive={activePage === 'info'} onClick={() => { togglePopup(); setActivePage('info'); }}>
                <FaInfoCircle /> Info
              </PopupNavLink>
              <PopupNavLink to="/structures" $isActive={activePage === 'structures'} onClick={() => { togglePopup(); setActivePage('structures'); }}>
                <FaBuilding /> Structures
              </PopupNavLink>
            </NavLinkContainer>
          </PopupContent>
        </PopupContainer>
      )}

      <RoundedContainer style={{ padding: '0px 10px' }}>
        <Title>Download Now!</Title>
        <WebDescription>
          Explore, learn, and track your journey through the canyon's architectural wonders
        </WebDescription>
        <WebLearnMoreButton style={{ marginBottom: '15px' }} to="/info">Learn More <FaArrowRight /></WebLearnMoreButton>
      </RoundedContainer>


        <Suspense fallback={<div>Loading preview...</div>}>
          <GifContainer>
            <LazyGif deviceType={deviceType} />
          </GifContainer>
        </Suspense>

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


      <Footer>
        <FooterText>© 2024 Poly Canyon App. All rights reserved.</FooterText>
        <FooterText>Cal Poly, San Luis Obispo</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default DownloadPageMobile;
// DownloadPageWeb.js
// This component renders the download page for web users.

// TO DO: Add the ability to switch between virtual tour and physical tour modes, updating the GIFS and info. 
// TO DO: Remove the white background from GIFs and add shadow
// TO DO: Add links in the bottom description to support pages and info page.

// LIBRARY IMPORTS
import React from 'react';
import { FaApple, FaAndroid, FaArrowRight, FaDownload, FaInfoCircle, FaBuilding } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

// STYLE IMPORTS
import {
  Banner,
  BannerContent,
  BannerIcon,
  BannerText,
  NavLinks,
  NavLink,
  Footer,
  FooterText,
  LeftSection,
  RightSection,
} from '../Navigation';

import {
  WebDescription,
  WebLearnMoreButton,
  SplitContainer,
  Column,
  PlatformTitle,
  WebDownloadButton,
  PageContainer,
  RoundedContainer,
  DownloadNowText,
} from './DownloadPage.styles';

// ASSET IMPORTS
import appleGIF from '../assets/appleGIF.gif';
import androidGIF from '../assets/androidGIF.gif';
import app360 from '../assets/app360.jpg';




const DownloadPageWeb = () => {
  const location = useLocation();

  return (
    <PageContainer>
      {/* Banner moved to the top */}
      <Banner>
        <BannerContent>
          {/* Left Section: Title and Nav Links */}
          <LeftSection>
            <BannerText>Poly Canyon</BannerText>
            <NavLinks>
              <NavLink to="/download" $isActive={location.pathname === '/download'}>
                <FaDownload /> Download
              </NavLink>
              <NavLink to="/info" $isActive={location.pathname === '/info'}>
                <FaInfoCircle /> Info
              </NavLink>
              <NavLink to="/structures" $isActive={location.pathname === '/structures'}>
                <FaBuilding /> Structures
              </NavLink>
            </NavLinks>
          </LeftSection>
          
          {/* Right Section: App Icon */}
          <RightSection>
            <BannerIcon src={app360} alt="Poly Canyon Logo" />
          </RightSection>
        </BannerContent>
      </Banner>


      {/* Download Call-to-Action Section */}
      <RoundedContainer>
        <DownloadNowText>Download Today!</DownloadNowText>
        <WebDescription>
          The Poly Canyon app is available on both iOS and Android, and can be downloaded for free on either platform.
        </WebDescription>
        <WebLearnMoreButton to="/info">Learn more   <FaArrowRight /></WebLearnMoreButton>
      </RoundedContainer>
      
      {/* Download Split Section */}
      <RoundedContainer>
        <SplitContainer>
          {/* iOS Column */}
          <Column>
            <PlatformTitle>iOS <FaApple /></PlatformTitle>
            <img 
              src={appleGIF} 
              alt="iOS App Preview" 
              style={{ width: '64%', borderRadius: '10px' }} 
            />
            <WebDownloadButton
              href="https://apps.apple.com/us/app/poly-canyon/id6499063781"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download button for iOS"
            >
              Download
            </WebDownloadButton>
          </Column>

          {/* Android Column */}
          <Column>
            <PlatformTitle>Android <FaAndroid /></PlatformTitle>
            <img 
              src={androidGIF} 
              alt="Android App Preview" 
              style={{ width: '64%', borderRadius: '10px' }}  
            />
            <WebDownloadButton
              href="https://play.google.com/store/apps/details?id=com.polycanyon&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download button for Android"
            >
              Download
            </WebDownloadButton>
          </Column>
        </SplitContainer>

        {/* Bottom Section */}
        <WebDescription>
          If you are interested in detailed information on all structures or looking for support with the app download or function, please navigate to those pages.
        </WebDescription>
      </RoundedContainer>

      {/* Footer */}
      <Footer>
        <FooterText>© 2024 Poly Canyon App. All rights reserved.</FooterText>
        <FooterText>Cal Poly, San Luis Obispo</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default DownloadPageWeb;
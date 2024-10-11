// DownloadPageWeb.js
// This component renders the download page for web users.

// LIBRARY IMPORTS
import React from 'react';
import { FaApple, FaAndroid, FaArrowRight } from 'react-icons/fa';
import LazyGif from './LazyGif';

// STYLE IMPORTS
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
  GifContainerWeb,
} from './DownloadPage.styles';

const DownloadPageWeb = () => {
  return (
    <PageContainer>

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
            <GifContainerWeb height={600}>
              <LazyGif deviceType="ios" />
            </GifContainerWeb>
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
            <GifContainerWeb height={600}>
              <LazyGif deviceType="android" />
            </GifContainerWeb>
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
    </PageContainer>
  );
};

export default DownloadPageWeb;
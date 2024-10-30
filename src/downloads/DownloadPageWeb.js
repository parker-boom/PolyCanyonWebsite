/**
 * Component: DownloadPageWeb
 * Purpose: Web version of the download page. Displays app details and provides separate download buttons for iOS and Android.
 * Key Features: Side-by-side layout for iOS and Android previews, LazyGif component for device-specific app previews, links to App Store and Google Play.
 * Dependencies: react-icons for download and device icons, LazyGif for animated app previews, and styled-components for layout and design.
 */

/*
Imports
*/

// Libraries
import React from 'react';
import { FaApple, FaAndroid, FaArrowRight, FaDownload } from 'react-icons/fa';
import LazyGif from './LazyGif.js';
import { Helmet } from 'react-helmet-async';

// Styles
import {
  PageContainer,
  RoundedContainer,
  Title,
  WebDescription,
  LearnMoreButton,
  SplitContainer,
  Column,
  GifContainerWeb,
  DownloadButtonWrapper,
  DownloadButtonIcon,
  DownloadButtonText,
  DownloadButtonSubtext,
} from './DownloadPage.styles.js';

/* 
Components & Render
*/
const DownloadPageWeb = () => {
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
        <meta
          property="og:image"
          content="https://polycanyon.com/sharePNG/ogdownload.png"
        />
        <meta property="og:url" content="https://polycanyon.com/download" />
        <meta name="twitter:title" content="Download the Poly Canyon App" />
        <meta
          name="twitter:description"
          content="Explore the unique student-built structures and projects from anywhere. Experience the area through the app, available for iOS and Android."
        />
        <meta
          name="twitter:image"
          content="https://polycanyon.com/sharePNG/twitdownload.png"
        />
      </Helmet>

      <PageContainer>
        {/* Title Section */}
        <RoundedContainer>
          <Title>Download Today!</Title>
          <WebDescription>
            The Poly Canyon app is available on both iOS and Android, and can be
            downloaded for free on either platform.
          </WebDescription>
          <LearnMoreButton to="/info">
            Learn more <FaArrowRight />
          </LearnMoreButton>
        </RoundedContainer>

        {/* Download Split Section */}
        <RoundedContainer>
          <SplitContainer>
            {/* iOS Column */}
            <Column>
              <GifContainerWeb height={600}>
                <LazyGif deviceType="ios" />
              </GifContainerWeb>
              <DownloadButtonWrapper
                href="https://apps.apple.com/us/app/poly-canyon/id6499063781"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download button for iOS"
              >
                <DownloadButtonIcon>
                  <FaApple className="default-icon" />
                  <FaDownload className="hover-icon" />
                </DownloadButtonIcon>
                <div>
                  <DownloadButtonText>Download</DownloadButtonText>
                  <DownloadButtonSubtext>App Store</DownloadButtonSubtext>
                </div>
              </DownloadButtonWrapper>
            </Column>

            {/* Android Column */}
            <Column>
              <GifContainerWeb height={600}>
                <LazyGif deviceType="android" />
              </GifContainerWeb>
              <DownloadButtonWrapper
                href="https://play.google.com/store/apps/details?id=com.polycanyon&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download button for Android"
              >
                <DownloadButtonIcon>
                  <FaAndroid className="default-icon" />
                  <FaDownload className="hover-icon" />
                </DownloadButtonIcon>
                <div>
                  <DownloadButtonText>Download</DownloadButtonText>
                  <DownloadButtonSubtext>Google Play</DownloadButtonSubtext>
                </div>
              </DownloadButtonWrapper>
            </Column>
          </SplitContainer>

          {/* Bottom Section */}
          <WebDescription>
            If you are interested in detailed information on all structures or
            more information on the physical area, please navigate to those
            pages.
          </WebDescription>
        </RoundedContainer>
      </PageContainer>
    </>
  );
};

// Used in Index.js (Web Only)
export default DownloadPageWeb;

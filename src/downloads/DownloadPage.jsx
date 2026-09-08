import React from 'react';
import { FaApple, FaArrowRight } from 'react-icons/fa';
import iosPreview from '../assets/generated/app/ios.webp';
import {
  PageContainer,
  RoundedContainer,
  Header,
  Subtitle,
  MainTitle,
  TitleTagline,
  Description,
  LearnMoreButton,
  StoreGrid,
  StoreCard,
  Preview,
  DownloadButton,
  Divider,
} from './DownloadPage.styles.js';

export default function DownloadPage() {
  return (
    <>
      <PageContainer>
        <RoundedContainer>
          <Header>
            <Subtitle>The Poly Canyon</Subtitle>
            <MainTitle>Mobile App</MainTitle>
            <TitleTagline>Your canyon companion</TitleTagline>
          </Header>
          <Divider />
          <Description>
            Put a name to what you find. Explore the structures, browse their
            photographs, and uncover the stories behind them—from the trail or
            wherever you are.
          </Description>
          <LearnMoreButton to="/info">
            Plan your visit <FaArrowRight aria-hidden="true" />
          </LearnMoreButton>
        </RoundedContainer>
        <StoreGrid aria-label="Get the Poly Canyon app">
          <StoreCard>
            <h2>Poly Canyon for iPhone</h2>
            <DownloadButton
              href="https://apps.apple.com/us/app/poly-canyon/id6499063781"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Poly Canyon on the App Store (opens in a new tab)"
            >
              <FaApple aria-hidden="true" /> Get it on the App Store
            </DownloadButton>
            <Preview
              src={iosPreview}
              alt="Poly Canyon iPhone app map preview"
              width="540"
              height="960"
              loading="lazy"
              decoding="async"
            />
          </StoreCard>
        </StoreGrid>
      </PageContainer>
    </>
  );
}

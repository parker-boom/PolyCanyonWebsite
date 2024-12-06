import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaChevronRight } from 'react-icons/fa';
import {
  HomeContainer,
  MainHeading,
  ActionContainer,
  ActionCard,
  CardImage,
  CardContent,
  CardTitle,
  CardSubtitle,
  WelcomeSection,
  Subtitle,
  StatsContainer,
  StatItem,
  StatNumber,
  StatLabel,
  GlobalBackgroundStyle,
} from './home.styles.js';

import download from '../assets/home/Download.jpg';
import info from '../assets/home/Info.jpg';
import structures from '../assets/home/Structures.jpg';

const Home = () => {
  return (
    <>
      <GlobalBackgroundStyle />
      <Helmet>
        <title>Poly Canyon Home</title>
        <meta
          name="description"
          content="Discover Poly Canyon's unique architectural structures through our interactive app, educational resources, and detailed research materials."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          property="og:title"
          content="Poly Canyon - Student Built Architectural Laboratory"
        />
        <meta
          property="og:description"
          content="Discover Poly Canyon's unique architectural structures through our interactive app, educational resources, and detailed research materials."
        />
        <meta property="og:url" content="https://polycanyon.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Poly Canyon - Student Built Architectural Laboratory"
        />
        <meta
          name="twitter:description"
          content="Discover Poly Canyon's unique architectural structures through our interactive app, educational resources, and detailed research materials."
        />
      </Helmet>

      <HomeContainer>
        <WelcomeSection>
          <MainHeading>How would you like to explore Poly Canyon?</MainHeading>
          <Subtitle>
            Your gateway to Cal Poly&apos;s unique architectural laboratory
          </Subtitle>
          <div className="animated-divider" />
        </WelcomeSection>

        <ActionContainer>
          {/* Learn Card */}
          <ActionCard to="/info" cardType="info">
            <CardImage src={info} />
            <CardContent>
              <CardTitle>Learn About the Canyon</CardTitle>
              <CardSubtitle>
                Discover the significance of this unique architectural
                playground
              </CardSubtitle>
              <FaChevronRight className="arrow-icon" />
            </CardContent>
          </ActionCard>

          {/* Download Card */}
          <ActionCard to="/download" cardType="download">
            <CardImage src={download} />
            <CardContent>
              <CardTitle>Download the App</CardTitle>
              <CardSubtitle>
                Enhance your visit with real time navigation and detailed
                information
              </CardSubtitle>
              <FaChevronRight className="arrow-icon" />
            </CardContent>
          </ActionCard>

          {/* Research Card */}
          <ActionCard to="/structures" cardType="research">
            <CardImage src={structures} />
            <CardContent>
              <CardTitle>Research Structures</CardTitle>
              <CardSubtitle>
                Dive into comprehensive details about unique architectural
                projects
              </CardSubtitle>
              <FaChevronRight className="arrow-icon" />
            </CardContent>
          </ActionCard>
        </ActionContainer>

        <StatsContainer>
          <StatItem>
            <StatNumber index={0}>30+</StatNumber>
            <StatLabel index={0}>Unique Structures</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber index={1}>60</StatNumber>
            <StatLabel index={1}>Years of History</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber index={2}>1000+</StatNumber>
            <StatLabel index={2}>Monthly Visitors</StatLabel>
          </StatItem>
        </StatsContainer>
      </HomeContainer>
    </>
  );
};

export default Home;

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
} from './home.styles';

import download from '../assets/home/SquareDownload.jpg';
import info from '../assets/home/SquareInfo.jpg';
import structures from '../assets/home/SquareStructures.jpg';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          Poly Canyon - Explore Cal Poly&apos;s Architectural Playground
        </title>
        <meta
          name="description"
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
          <ActionCard to="/info">
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
          <ActionCard to="/download">
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
          <ActionCard to="/structures">
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
            <StatNumber>30+</StatNumber>
            <StatLabel>Unique Structures</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>60</StatNumber>
            <StatLabel>Years of History</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>1000+</StatNumber>
            <StatLabel>Monthly Visitors</StatLabel>
          </StatItem>
        </StatsContainer>
      </HomeContainer>
    </>
  );
};

export default Home;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  HomeContainer,
  MainHeading,
  ActionContainer,
  ActionCard,
  CardImage,
  CardContent,
  CardTitle,
  CardSubtitle,
  PopularTag,
  WelcomeSection,
  Subtitle,
  StatsContainer,
  StatItem,
  StatNumber,
  StatLabel,
} from './home.styles';

// Placeholder images - replace these with actual images later
import placeholderApp from '../assets/Download.jpg';
import placeholderLearn from '../assets/Info.jpg';
import placeholderResearch from '../assets/Structures.jpg';

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
        </WelcomeSection>

        <ActionContainer>
          {/* Learn Card */}
          <ActionCard to="/info">
            <CardImage src={placeholderLearn} />
            <CardContent>
              <CardTitle>Learn About the Canyon</CardTitle>
              <CardSubtitle>
                Discover the significance of this unique architectural
                playground
              </CardSubtitle>
            </CardContent>
          </ActionCard>

          {/* Download Card */}
          <ActionCard to="/download">
            <PopularTag>Popular</PopularTag>
            <CardImage src={placeholderApp} />
            <CardContent>
              <CardTitle>Download the App</CardTitle>
              <CardSubtitle>
                Enhance your visit with real time navigation and detailed
                information
              </CardSubtitle>
            </CardContent>
          </ActionCard>

          {/* Research Card */}
          <ActionCard to="/structures">
            <CardImage src={placeholderResearch} />
            <CardContent>
              <CardTitle>Research Structures</CardTitle>
              <CardSubtitle>
                Explore detailed information about specific student creations
              </CardSubtitle>
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

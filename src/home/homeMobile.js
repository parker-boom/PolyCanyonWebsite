import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaChevronRight } from 'react-icons/fa';
import {
  HomeContainer,
  MainHeading,
  WelcomeSection,
  Subtitle,
  CardListMobile,
  ListCardMobile,
  CardImageSquareMobile,
  CardContentMobile,
  CardTitleMobile,
  CardSubtitleMobile,
  PopularTagMobile,
  HeaderImageMobile,
} from './home.styles';

import placeholderApp from '../assets/Download.jpg';
import placeholderLearn from '../assets/Info.jpg';
import placeholderResearch from '../assets/Structures.jpg';
import pcWide from './pcWide.jpg';

const CARDS = [
  {
    id: 0,
    to: '/download',
    image: placeholderApp,
    title: 'Download the App',
    subtitle: 'Enhance your visit with real time navigation',
    isPopular: true,
  },
  {
    id: 1,
    to: '/info',
    image: placeholderLearn,
    title: 'Learn About the Canyon',
    subtitle: 'Discover this unique architectural playground',
    color: 'rgba(245, 235, 166, 0.2)',
  },
  {
    id: 2,
    to: '/structures',
    image: placeholderResearch,
    title: 'Research Structures',
    subtitle: 'Explore architectural projects in detail',
    color: 'rgba(207, 190, 155, 0.2)',
  },
];

const HomeMobile = () => {
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
        <HeaderImageMobile src={pcWide} alt="Poly Canyon Overview" />
        <WelcomeSection>
          <MainHeading>How would you like to explore Poly Canyon?</MainHeading>
          <Subtitle>
            Your gateway to appreciating Cal Poly&apos;s unique student-built
            architectural laboratory
          </Subtitle>
        </WelcomeSection>

        <CardListMobile>
          {CARDS.map((card) => (
            <ListCardMobile key={card.id} to={card.to} color={card.color}>
              {card.isPopular && <PopularTagMobile>Popular</PopularTagMobile>}
              <CardImageSquareMobile src={card.image} />
              <CardContentMobile>
                <CardTitleMobile>{card.title}</CardTitleMobile>
                <CardSubtitleMobile>{card.subtitle}</CardSubtitleMobile>
                <FaChevronRight className="arrow-icon" />
              </CardContentMobile>
            </ListCardMobile>
          ))}
        </CardListMobile>
      </HomeContainer>
    </>
  );
};

export default HomeMobile;

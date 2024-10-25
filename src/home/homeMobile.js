import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaChevronRight } from 'react-icons/fa';
import {
  HomeContainer,
  MainHeading,
  WelcomeSection,
  CardListMobile,
  ListCardMobile,
  CardImageSquareMobile,
  CardContentMobile,
  CardTitleMobile,
  HeaderImageMobile,
} from './home.styles';

import download from '../assets/home/SquareDownload.jpg';
import info from '../assets/home/SquareInfo.jpg';
import structures from '../assets/home/SquareStructures.jpg';
import pcWide from './pcWide.jpg';

const CARDS = [
  {
    id: 0,
    to: '/download',
    image: download,
    title: 'Download the App',
  },
  {
    id: 1,
    to: '/info',
    image: info,
    title: 'Learn About the Canyon',
    color: 'rgba(245, 235, 166, 0.2)',
  },
  {
    id: 2,
    to: '/structures',
    image: structures,
    title: 'Research Structures',
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>

      <HomeContainer>
        <HeaderImageMobile src={pcWide} alt="Poly Canyon Overview" />
        <WelcomeSection>
          <MainHeading>
            <span className="mobile-title">Poly Canyon</span>
            <span className="mobile-subtitle">Choose your adventure</span>
            <div className="animated-divider" />
          </MainHeading>
        </WelcomeSection>

        <CardListMobile>
          {CARDS.map((card) => (
            <ListCardMobile key={card.id} to={card.to} color={card.color}>
              <CardImageSquareMobile src={card.image} />
              <CardContentMobile>
                <CardTitleMobile>{card.title}</CardTitleMobile>
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

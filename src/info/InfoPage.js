import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Banner,
  BannerContent,
  BannerIcon,
  BannerText,
  NavLinks,
  NavLink,
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
  LeftSection,
  RightSection,
} from '../Navigation';
import { FaBars, FaTimes, FaDownload, FaInfoCircle, FaBuilding } from 'react-icons/fa';
import app360 from '../assets/app360.jpg';

import { FaApple, FaAndroid, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaWalking } from 'react-icons/fa';
import {
  PageContainer,
  ContentContainer,
  Header,
  Title,
  Subtitle,
  Section,
  SectionTitle,
  CarouselContainer,
  CarouselSlide,
  CarouselImage,
  CarouselTitle,
  CarouselDescription,
  CarouselButton,
  ModeSelector,
  ModeButton,
  FeatureList,
  FeatureItem,
  DownloadSection,
  DownloadButton,
  VisitTips,
  VisitTipsTitle,
  ButtonContainer,
  DownloadCTA,
  AllTrailsButton,
  GoogleMapsButton,
  Footer,
  FooterText
} from './InfoPage.styles';

import geodesicDome from '../assets/geodesic-dome.jpg';
import shellHouse from '../assets/shell-house.jpg';
import greenHouse from '../assets/green-house.jpg';

import { useSwipeable } from 'react-swipeable'; 

const structures = [
  {
    name: "Geodesic Dome",
    description: "A pioneering structure, first of its kind on the West Coast.",
    image: geodesicDome
  },
  {
    name: "Shell House",
    description: "Once a functional living space with a working kitchen for caretakers.",
    image: shellHouse
  },
  {
    name: "Green House",
    description: "Meant to house real plants, now just a shell of its past self.",
    image: greenHouse
  }
];

const InfoPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMode, setCurrentMode] = useState('explorer');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % structures.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + structures.length) % structures.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <PageContainer>
      {isMobile ? (
        <BannerMobile>
          <MenuIcon onClick={togglePopup}>
            <FaBars />
          </MenuIcon>
          <PolyCanyonTitle>
            Poly Canyon
          </PolyCanyonTitle>
          <Logo src={app360} alt="Poly Canyon Logo" />
        </BannerMobile>
      ) : (
        <Banner>
          <BannerContent>
            <LeftSection>
              <BannerText>Poly Canyon</BannerText>
              <NavLinks>
                <NavLink to="/download">
                  <FaDownload /> Download
                </NavLink>
                <NavLink to="/info">
                  <FaInfoCircle /> Info
                </NavLink>
                <NavLink to="/structures">
                  <FaBuilding /> Structures
                </NavLink>
              </NavLinks>
            </LeftSection>
            <RightSection>
              <BannerIcon src={app360} alt="Poly Canyon Logo" />
            </RightSection>
          </BannerContent>
        </Banner>
      )}

      <ContentContainer>
        {isPopupOpen && isMobile && (
          <PopupContainer onClick={togglePopup}>
            <PopupContent onClick={(e) => e.stopPropagation()}>
              <PopupCloseButton onClick={togglePopup}>
                <FaTimes />
              </PopupCloseButton>
              <PopupTitle>Switch Pages</PopupTitle>
              <NavLinkContainer>
                <PopupNavLink to="/download" onClick={togglePopup}>
                  <FaDownload /> Download
                </PopupNavLink>
                <PopupNavLink to="/info" onClick={togglePopup}>
                  <FaInfoCircle /> Info
                </PopupNavLink>
                <PopupNavLink to="/structures" onClick={togglePopup}>
                  <FaBuilding /> Structures
                </PopupNavLink>
              </NavLinkContainer>
            </PopupContent>
          </PopupContainer>
        )}

        <Header>
          <Title>Discover Poly Canyon</Title>
          <Subtitle>An Architecture Playground</Subtitle>
        </Header>

        <Section>
          <SectionTitle>What is Poly Canyon?</SectionTitle>
          <CarouselContainer {...handlers}>
            <CarouselButton onClick={prevSlide} aria-label="Previous slide">
              <FaChevronLeft />
            </CarouselButton>
            <CarouselSlide>
              <CarouselImage src={structures[currentSlide].image} alt={structures[currentSlide].name} loading="lazy" />
              <CarouselTitle>{structures[currentSlide].name}</CarouselTitle>
              <CarouselDescription>{structures[currentSlide].description}</CarouselDescription>
            </CarouselSlide>
            <CarouselButton onClick={nextSlide} aria-label="Next slide">
              <FaChevronRight />
            </CarouselButton>
          </CarouselContainer>
          <p>
            Nestled just a mile from Cal Poly's campus, Poly Canyon is a unique outdoor area where creativity takes physical form. This 9-acre experimental space showcases over 30 permanent and temporary structures, all designed and built by Cal Poly students.
          </p>
          <p>
            Poly Canyon embodies the Learn by Doing philosophy, offering architecture and design students a canvas to transform theoretical concepts into tangible, full-scale projects. It's a place where ideas quite literally come to life. It is a popular place for students to hang out, run or bike, and stargaze! It is free to visit and is open for students and the public.
          </p>
          <p>
            Since its inception in the 1960s, Poly Canyon has been a testament to innovation, sustainability, and the power of hands-on learning. Each structure tells a story of student ingenuity and the evolution of architectural thought.
          </p>
        </Section>

        <Section>
          <SectionTitle>What does the Poly Canyon app do?</SectionTitle>
          <ModeSelector>
            <ModeButton 
              active={currentMode === 'explorer'} 
              onClick={() => setCurrentMode('explorer')}
            >
              Explorer Mode
            </ModeButton>
            <ModeButton 
              active={currentMode === 'virtual'} 
              onClick={() => setCurrentMode('virtual')}
            >
              Virtual Visit
            </ModeButton>
          </ModeSelector>
          {currentMode === 'explorer' ? (
            <>
              <h3>🧭 Explorer Mode</h3>
              <p>Adventure through the canyon in person</p>
              <p><strong>Best For:</strong> Students and in-person visits</p>
              <FeatureList>
                <FeatureItem>🗺️ Interactive map for easy navigation</FeatureItem>
                <FeatureItem>✅ Automatic tracking of visited structures</FeatureItem>
                <FeatureItem>📚 In-depth historical insights for each structure</FeatureItem>
              </FeatureList>
            </>
          ) : (
            <>
              <h3>🖥️ Virtual Visit</h3>
              <p>Experience the canyon from anywhere</p>
              <p><strong>Best For:</strong> Remote explorers and virtual viewing</p>
              <FeatureList>
                <FeatureItem>🏞️ Virtual walkthrough of the canyon</FeatureItem>
                <FeatureItem>⭐ Decide which structures are your favorite</FeatureItem>
                <FeatureItem>📝 Learn about structures even from afar</FeatureItem>
              </FeatureList>
            </>
          )}
          <p>
            Whether you're walking the grounds or exploring from a distance, the Poly Canyon app enhances your experience with rich content, interactive features, and a user-friendly interface.
          </p>
          <DownloadSection>
            <h3>Download now!</h3>
            <div>
              <DownloadButton href="https://apps.apple.com/us/app/poly-canyon/id6499063781" target="_blank" rel="noopener noreferrer">
                <FaApple /> Apple
              </DownloadButton>
              <DownloadButton href="https://play.google.com/store/apps/details?id=com.polycanyon&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
                <FaAndroid /> Android
              </DownloadButton>
            </div>
          </DownloadSection>
        </Section>

        <Section>
          <SectionTitle>How do I get there?</SectionTitle>
          <p>
            Most Cal Poly students are familiar with Poly Canyon, often referred to as the Architecture Graveyard. It's a popular spot for outdoor enthusiasts and curious minds alike.
          </p>
          <p>
            New to the area? The best way to reach Poly Canyon is by using AllTrails or Google Maps for initial directions. Once you arrive, switch to the Poly Canyon app to start your adventure.
          </p>
          <ButtonContainer>
            <AllTrailsButton href="https://www.alltrails.com/trail/us/california/architecture-graveyard-hike-private-property?sh=rvw6ps" target="_blank" rel="noopener noreferrer">
              <FaWalking /> All Trails
            </AllTrailsButton>
            <GoogleMapsButton href="https://maps.app.goo.gl/H8Dq6Y5x1E6pQJzk9" target="_blank" rel="noopener noreferrer">
              <FaMapMarkerAlt /> Google Maps
            </GoogleMapsButton>
          </ButtonContainer>
          <VisitTipsTitle>Tips for Visiting:</VisitTipsTitle>
          <VisitTips>
            <FeatureItem>🌞 Poly Canyon is best visited during daylight hours, offering the best visibility for appreciating the structures.</FeatureItem>
            <FeatureItem>🏞️ Remember, you're entering a protected outdoor space. It's home to diverse wildlife, including horses, so please respect both the natural environment and the architectural wonders.</FeatureItem>
            <FeatureItem>👟 Wear comfortable shoes and bring water – there's a lot to explore!</FeatureItem>
          </VisitTips>
          <ButtonContainer>
            <DownloadCTA to="/download">Download the App</DownloadCTA>
          </ButtonContainer>
        </Section>

        <Footer>
          <FooterText>© 2024 Poly Canyon App. All rights reserved.</FooterText>
          <FooterText>Cal Poly, San Luis Obispo</FooterText>
        </Footer>
      </ContentContainer>
    </PageContainer>
  );
};

export default InfoPage;
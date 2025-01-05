import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FaDownload,
  FaInfo,
  FaBuilding,
  FaChevronRight,
  FaDice,
} from 'react-icons/fa';
import { mainImages } from '../structures/images/structureImages.js';
import structuresList from '../structures/data/structuresList.json';
import {
  HomeContainer,
  ContentWrapper,
  GlassNav,
  NavContent,
  Logo,
  SiteTitle,
  LeftSection,
  LogoGroup,
  NavLinks,
  NavLink,
  ChroniclesButton,
  MainLayout,
  StructuresSection,
  ButtonsSection,
  StructureImageArea,
  StructureInfoArea,
  ImageContainer,
  MainImage,
  TitleContainer,
  StructureTitle,
  StructureNumber,
  TitleContent,
  ViewButton,
  InfoIcon,
  InfoSubtitle,
  InfoDescription,
  CornerChevron,
  ActionButton,
  ButtonContent,
  ButtonTitle,
  ButtonSubtitle,
  ChroniclesBanner,
  ChroniclesContent,
  ChroniclesIcon,
  ChroniclesTitle,
  ChroniclesSubtitle,
  ChroniclesTitleGroup,
  WelcomeRow,
  RandomStructureSection,
  DiceIcon,
  RandomStructureText,
  WelcomeSection,
  WelcomeText,
  WelcomeTitle,
  WelcomeSubtitle,
  WelcomeLogo,
  QuoteRow,
  QuoteContainer,
  QuoteText,
  QuoteAuthor,
  ImageContainer2,
} from './home.styles.js';
import app360 from '../assets/app360.jpg';
import CAEDLogo from '../assets/CAEDLogo.png';

// Filter out ghost structures, accessory structures, and long titles
const activeStructures = structuresList.filter(
  (structure) =>
    structure.status === 'Active' &&
    structure.number > 0 &&
    structure.number <= 30 &&
    structure.title.length <= 20
);

// Add this function to track mouse position
const handleMouseMove = (e) => {
  const banner = e.currentTarget;
  const rect = banner.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / banner.offsetWidth) * 100;
  const y = ((e.clientY - rect.top) / banner.offsetHeight) * 100;

  banner.style.setProperty('--mouse-x', `${x}%`);
  banner.style.setProperty('--mouse-y', `${y}%`);
};

const HomeWeb = () => {
  const navigate = useNavigate();
  const [currentStructure, setCurrentStructure] = useState(0);

  // Rotate through structures randomly
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * activeStructures.length);
      setCurrentStructure(nextIndex);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const structure = activeStructures[currentStructure];
  const imageKey = structure?.image_key;
  const imageUrl = mainImages[imageKey];

  const getRandomStructure = () => {
    const activeStructures = structuresList.filter(
      (structure) => structure.status === 'Active' && structure.number > 0
    );
    const randomIndex = Math.floor(Math.random() * activeStructures.length);
    return activeStructures[randomIndex];
  };

  return (
    <>
      <Helmet>
        <title>Poly Canyon Home</title>
        <meta
          name="description"
          content="Welcome to Poly Canyon - Cal Poly's unique outdoor experimental construction laboratory. Explore student-built architectural projects and discover the innovative spirit of hands-on learning."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://polycanyon.com" />
      </Helmet>

      <HomeContainer>
        <ContentWrapper>
          <GlassNav>
            <NavContent>
              <LeftSection>
                <LogoGroup>
                  <Logo
                    src={app360}
                    alt="Poly Canyon Logo"
                    onClick={() => navigate('/')}
                  />
                  <SiteTitle>Poly Canyon</SiteTitle>
                </LogoGroup>
                <NavLinks>
                  <NavLink to="/download">
                    <FaDownload /> App
                  </NavLink>
                  <NavLink to="/info">
                    <FaInfo /> Info
                  </NavLink>
                  <NavLink to="/structures">
                    <FaBuilding /> Structures
                  </NavLink>
                  <ChroniclesButton to="/chronicles">
                    <span>Chronicles</span>
                  </ChroniclesButton>
                </NavLinks>
              </LeftSection>
            </NavContent>
          </GlassNav>

          <WelcomeRow>
            <RandomStructureSection
              onClick={() =>
                navigate(`/structures/${getRandomStructure().url}`)
              }
            >
              <DiceIcon>
                <FaDice />
              </DiceIcon>
              <RandomStructureText>
                Explore a Random Structure
              </RandomStructureText>
            </RandomStructureSection>

            <WelcomeSection>
              <WelcomeText>
                <WelcomeTitle>Welcome to the Canyon!</WelcomeTitle>
                <WelcomeSubtitle>
                  What are you waiting for? Get started.
                </WelcomeSubtitle>
              </WelcomeText>
              <WelcomeLogo src={app360} alt="Poly Canyon Logo" />
            </WelcomeSection>
          </WelcomeRow>

          <MainLayout>
            <StructuresSection>
              <StructureImageArea>
                <ImageContainer>
                  <MainImage src={imageUrl} alt={structure.title} />
                </ImageContainer>
                <TitleContainer
                  onClick={() => navigate(`/structures/${structure.url}`)}
                >
                  <StructureNumber>{structure.number}</StructureNumber>
                  <TitleContent>
                    <StructureTitle>{structure.title}</StructureTitle>
                    <ViewButton>
                      <FaChevronRight />
                    </ViewButton>
                  </TitleContent>
                </TitleContainer>
              </StructureImageArea>
              <StructureInfoArea onClick={() => navigate('/structures')}>
                <InfoIcon>
                  <FaBuilding />
                </InfoIcon>
                <InfoSubtitle>Research Structures</InfoSubtitle>
                <InfoDescription>
                  Must have details on all the best creations
                </InfoDescription>
                <CornerChevron />
              </StructureInfoArea>
            </StructuresSection>

            <ButtonsSection>
              <ActionButton to="/info" $type="info">
                <FaInfo />
                <ButtonContent>
                  <ButtonTitle $type="info">Get Information</ButtonTitle>
                  <ButtonSubtitle>
                    The essentials before your first canyon visit
                  </ButtonSubtitle>
                </ButtonContent>
              </ActionButton>

              <ActionButton to="/download" $type="app">
                <FaDownload />
                <ButtonContent>
                  <ButtonTitle $type="app">Checkout the App</ButtonTitle>
                  <ButtonSubtitle>
                    A much needed travel guide for the canyon
                  </ButtonSubtitle>
                </ButtonContent>
              </ActionButton>
            </ButtonsSection>
          </MainLayout>

          <ChroniclesBanner to="/chronicles" onMouseMove={handleMouseMove}>
            <ChroniclesContent>
              <ChroniclesTitleGroup>
                <ChroniclesIcon>✧</ChroniclesIcon>
                <ChroniclesTitle>ENTER THE CHRONICLES</ChroniclesTitle>
                <ChroniclesIcon>✧</ChroniclesIcon>
              </ChroniclesTitleGroup>
              <ChroniclesSubtitle>
                AN <strong>INTERACTIVE EXPERIENCE</strong> LIKE NO OTHER
              </ChroniclesSubtitle>
            </ChroniclesContent>
          </ChroniclesBanner>

          <QuoteRow>
            <QuoteContainer>
              <QuoteText>
                &ldquo;We must remember what has been,
                <br />
                to dream about what can be&rdquo;
              </QuoteText>
              <QuoteAuthor>- Parker Jones</QuoteAuthor>
            </QuoteContainer>
            <ImageContainer2>
              <img src={CAEDLogo} alt="CAED Logo" />
            </ImageContainer2>
          </QuoteRow>
        </ContentWrapper>
      </HomeContainer>
    </>
  );
};

export default HomeWeb;

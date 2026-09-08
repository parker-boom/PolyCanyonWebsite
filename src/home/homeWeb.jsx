import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaDownload,
  FaInfo,
  FaBuilding,
  FaChevronRight,
  FaDice,
} from 'react-icons/fa';
import {
  mainImages,
  getResponsiveImage,
} from '../structures/images/structureImages.js';
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
  AboutBanner,
  AboutContent,
  AboutTitle,
  AboutSubtitle,
  WelcomeRow,
  RandomStructureSection,
  DiceIcon,
  RandomStructureText,
  WelcomeSection,
  WelcomeText,
  WelcomeTitle,
  WelcomeSubtitle,
  WelcomeLogo,
} from './home.styles.js';
import app360 from '../assets/app360.webp';

// Filter out ghost structures, accessory structures, and long titles
const activeStructures = structuresList.filter(
  (structure) =>
    structure.status === 'Active' &&
    structure.number > 0 &&
    structure.number <= 30 &&
    structure.title.length <= 20
);

const HomeWeb = () => {
  const navigate = useNavigate();
  const structure = activeStructures[0];
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
      <HomeContainer>
        <ContentWrapper>
          <GlassNav>
            <NavContent>
              <LeftSection>
                <LogoGroup>
                  <Logo src={app360} alt="" width="44" height="44" />
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
                  <NavLink to="/about">About</NavLink>
                </NavLinks>
              </LeftSection>
            </NavContent>
          </GlassNav>

          <WelcomeRow>
            <RandomStructureSection
              type="button"
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
                  <MainImage
                    {...getResponsiveImage(
                      imageUrl,
                      '(max-width: 768px) calc(100vw - 40px), 600px'
                    )}
                    alt={structure.title}
                    decoding="async"
                    fetchpriority="high"
                  />
                </ImageContainer>
                <TitleContainer to={`/structures/${structure.url}`}>
                  <StructureNumber>{structure.number}</StructureNumber>
                  <TitleContent>
                    <StructureTitle>{structure.title}</StructureTitle>
                    <ViewButton>
                      <FaChevronRight />
                    </ViewButton>
                  </TitleContent>
                </TitleContainer>
              </StructureImageArea>
              <StructureInfoArea to="/structures">
                <InfoIcon>
                  <FaBuilding />
                </InfoIcon>
                <InfoSubtitle>Research Structures</InfoSubtitle>
                <InfoDescription>
                  Discover the ideas behind the structures
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
                  <ButtonTitle $type="app">Explore with the App</ButtonTitle>
                  <ButtonSubtitle>
                    Find your way around and see the stories behind each
                    structure
                  </ButtonSubtitle>
                </ButtonContent>
              </ActionButton>
            </ButtonsSection>
          </MainLayout>

          <AboutBanner to="/about">
            <AboutContent>
              <AboutTitle>About the Canyon</AboutTitle>
              <AboutSubtitle>
                A place to build, experiment, and learn. Get to know its story.
              </AboutSubtitle>
            </AboutContent>
            <FaChevronRight aria-hidden="true" />
          </AboutBanner>
        </ContentWrapper>
      </HomeContainer>
    </>
  );
};

export default HomeWeb;

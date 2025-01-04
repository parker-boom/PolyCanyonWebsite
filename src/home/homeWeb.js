import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaInfo, FaBuilding, FaChevronRight } from 'react-icons/fa';
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
} from './home.styles.js';
import app360 from '../assets/app360.jpg';

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

  return (
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
                Explore all the amazing creations in depth
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
                  Everything you need to know before your first visit
                </ButtonSubtitle>
              </ButtonContent>
            </ActionButton>

            <ActionButton to="/download" $type="app">
              <FaDownload />
              <ButtonContent>
                <ButtonTitle $type="app">Checkout the App</ButtonTitle>
                <ButtonSubtitle>
                  The must have interactive exploration guide is here
                </ButtonSubtitle>
              </ButtonContent>
            </ActionButton>
          </ButtonsSection>
        </MainLayout>

        <ChroniclesBanner to="/chronicles" onMouseMove={handleMouseMove}>
          <ChroniclesContent>
            <ChroniclesTitleGroup>
              <ChroniclesIcon>✧</ChroniclesIcon>
              <ChroniclesTitle>CHRONICLES</ChroniclesTitle>
              <ChroniclesIcon>✧</ChroniclesIcon>
            </ChroniclesTitleGroup>
            <ChroniclesSubtitle>
              EXPLORE THE <strong>INTERACTIVE EXPERIENCE</strong>
            </ChroniclesSubtitle>
          </ChroniclesContent>
        </ChroniclesBanner>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default HomeWeb;

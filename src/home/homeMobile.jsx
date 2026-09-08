import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaDownload, FaInfo, FaBuilding, FaChevronRight } from 'react-icons/fa';
import {
  mainImages,
  getResponsiveImage,
} from '../structures/images/structureImages.js';
import structuresList from '../structures/data/structuresList.json';

// Mobile-specific styled components
const MobileContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 90px 15px 15px;
  background: rgba(189, 139, 19, 0.15);
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
  margin: 0 auto;
`;

const StructuresCard = styled.div`
  background: #e8efe8;
  border-radius: 20px;
  padding: 16px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 4px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(55, 109, 49, 0.1);
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleBar = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: linear-gradient(
    135deg,
    rgba(55, 109, 49, 0.13) 0%,
    rgba(55, 109, 49, 0.22) 100%
  );
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:active {
    transform: scale(0.98);
  }
`;

const StructureNumber = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  opacity: 0.8;

  &::before {
    content: '#';
    opacity: 0.5;
  }
`;

const StructureTitle = styled.h2`
  flex: 1;
  font-size: 20px;
  font-weight: 800;
  color: #bd8b13;
  margin: 0;
`;
const InfoButton = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: linear-gradient(
    135deg,
    rgba(55, 109, 49, 0.12) 0%,
    rgba(232, 239, 232, 0.9) 85%,
    rgba(255, 255, 255, 0.25) 100%
  );
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  svg {
    font-size: 18px;
    flex-shrink: 0;
    color: #376d31;

    &:last-child {
      font-size: 12px;
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ButtonText = styled.div`
  flex: 1;
  text-align: left;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => (props.$type === 'info' ? '#bd8b13' : '#376d31')};
    margin: 0 0 4px 0;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: ${(props) =>
    props.$type === 'info'
      ? `linear-gradient(135deg, rgba(254, 255, 247, 1) 0%, rgba(189, 139, 19, 0.03) 75%, rgba(189, 139, 19, 0.22) 100%)`
      : `linear-gradient(135deg, rgba(250, 255, 247, 1) 0%, rgba(55, 109, 49, 0.03) 75%, rgba(55, 109, 49, 0.22) 100%)`};
  padding: 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  svg {
    font-size: 24px;
    color: ${(props) => (props.$type === 'info' ? '#bd8b13' : '#376d31')};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: #336731;
  margin: 0 0 8px 4px;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '${(props) => props.$emoji}';
    font-size: 22px;
  }
`;

const SectionDivider = styled.div`
  margin: 12px 0;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(189, 139, 19, 0.2),
    rgba(189, 139, 19, 0.1)
  );
`;

// Filter structures just like in web version
const activeStructures = structuresList.filter(
  (structure) =>
    structure.status === 'Active' &&
    structure.number > 0 &&
    structure.number <= 30 &&
    structure.title.length <= 20
);

const HomeMobile = () => {
  const structure = activeStructures[0];
  const imageUrl = mainImages[structure?.image_key];

  return (
    <>
      <MobileContainer>
        <ContentSection>
          <SectionTitle as="h1" $emoji="🏛️">
            Meet the Structures
          </SectionTitle>
          <StructuresCard>
            <TitleBar to={`/structures/${structure.url}`}>
              <StructureNumber>{structure.number}</StructureNumber>
              <StructureTitle>{structure.title}</StructureTitle>
              <FaChevronRight color="#376d31" />
            </TitleBar>

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

            <InfoButton to="/structures">
              <FaBuilding />
              <ButtonText>
                <h3>Research Structures</h3>
                <p>Discover the ideas behind the structures</p>
              </ButtonText>
              <FaChevronRight color="#376d31" />
            </InfoButton>
          </StructuresCard>

          <SectionDivider />

          <SectionTitle $emoji="⚡">Quick Access</SectionTitle>
          <ActionButton $type="info" to="/info">
            <FaInfo />
            <ButtonText $type="info">
              <h3>Get Information</h3>
              <p>Everything you need to know before your first visit</p>
            </ButtonText>
            <FaChevronRight color="#bd8b13" />
          </ActionButton>

          <ActionButton $type="app" to="/download">
            <FaDownload />
            <ButtonText>
              <h3>Explore with the App</h3>
              <p>Find your way around and discover each structure</p>
            </ButtonText>
            <FaChevronRight color="#376d31" />
          </ActionButton>
          <ActionButton to="/about" $type="info">
            <FaInfo aria-hidden="true" />
            <ButtonText $type="info">
              <h3>About the Canyon</h3>
              <p>A place to build, experiment, and learn.</p>
            </ButtonText>
            <FaChevronRight aria-hidden="true" />
          </ActionButton>
        </ContentSection>
      </MobileContainer>
    </>
  );
};

export default HomeMobile;

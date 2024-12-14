import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import * as S from '../Structures.styles.js';
import { getAccessoryStructures } from '../data/structuresData.js';
import { accessoryImages } from '../images/structureImages.js';
import GoogleMapLandmark from '../extraComponents/GoogleMapLandmark.js';
import styled from 'styled-components';
// Keep only the styled components we need
const MobileInfoPageWrapper = styled(S.InfoPageWrapper)`
  padding: 0;
`;

const MobileCenteredWrapper = styled(S.CenteredWrapper)`
  max-width: 100%;
`;

const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  height: 64px;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.95),
    rgba(255, 245, 222, 0.9)
  );
  border-bottom: 2px solid rgba(189, 139, 19, 0.4);
  box-shadow:
    0 4px 16px rgba(189, 139, 19, 0.15),
    0 2px 4px rgba(189, 139, 19, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const MobileNumber = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 2px solid rgba(189, 139, 19, 0.3);
  border-radius: 50%;
  margin: 0;
`;

const MobileTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
  position: relative;
  max-width: 65%;
  padding: 0 40px;
`;

const NavigationCircle = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(55, 109, 49, 0.1);
  border: 1px solid rgba(55, 109, 49, 0.2);
  color: #376d31;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  z-index: 2;

  &:first-child {
    left: -8px;
  }

  &:last-child {
    right: -8px;
  }
`;

const MobileTitle = styled.div`
  font-size: ${(props) => {
    const length = props.children?.toString().length || 0;
    if (length > 20) return 'clamp(18px, 4.5vw, 32px)';
    if (length > 15) return 'clamp(20px, 5vw, 34px)';
    return 'clamp(20px, 5.5vw, 36px)';
  }};
  font-weight: 800;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1),
    rgba(189, 139, 19, 0.85)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const MobileContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #e8efe8;
`;

const MobileMainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
`;

const AccessoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MobileQuickFacts = styled(S.InfoCardsSection)`
  margin: 10px;
  padding: 16px;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.95),
    rgba(255, 245, 222, 0.9)
  );
  height: auto;
  min-height: auto;
`;

const MobileDescription = styled(S.DescriptionContainer)`
  margin: 10px;
  border-radius: 24px;
  width: auto;
`;

const CloseButton = styled.button`
  width: 48px;
  height: 48px;
  margin: 0;
  flex-shrink: 0;
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 2px solid rgba(189, 139, 19, 0.3);
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    transform: none;
    background: linear-gradient(135deg, #376d31, #2c5526);
    border-color: rgba(189, 139, 19, 0.3);
  }

  svg {
    font-size: 32px;
  }
`;

const AccessoryStructureInfoMobile = () => {
  const navigate = useNavigate();
  const [structures, setStructures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const accessoryStructures = getAccessoryStructures();
    setStructures(accessoryStructures);
    setCurrentIndex(Math.floor(Math.random() * accessoryStructures.length));
  }, []);

  const currentStructure = structures[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % structures.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + structures.length) % structures.length
    );
  };

  if (!currentStructure) return null;

  return (
    <MobileInfoPageWrapper>
      <Helmet>
        <title>{currentStructure.name} - Accessory Structure</title>
        <meta name="description" content={currentStructure.description} />
      </Helmet>

      <MobileCenteredWrapper>
        <MobileHeader>
          <MobileNumber>★</MobileNumber>
          <MobileTitleContainer>
            <NavigationCircle onClick={handlePrev}>
              <FaChevronLeft />
            </NavigationCircle>
            <MobileTitle>{currentStructure.name}</MobileTitle>
            <NavigationCircle onClick={handleNext}>
              <FaChevronRight />
            </NavigationCircle>
          </MobileTitleContainer>
          <CloseButton onClick={() => navigate('/structures')}>
            <FaTimes />
          </CloseButton>
        </MobileHeader>

        <MobileContentContainer>
          <MobileMainContent>
            <ImageContainer>
              <AccessoryImage
                src={
                  accessoryImages[
                    currentStructure.image
                      .split('/accessory/')
                      .pop()
                      .split('.')[0]
                  ]
                }
                alt={currentStructure.name}
              />
            </ImageContainer>

            <MobileDescription>
              <S.SectionTitleInfo>Description</S.SectionTitleInfo>
              <S.DescriptionText>
                <p>{currentStructure.description}</p>
              </S.DescriptionText>
            </MobileDescription>

            <MobileQuickFacts>
              <S.SectionTitleInfo>Quick Facts</S.SectionTitleInfo>

              <S.InfoCard>
                <S.InfoCardHeader>
                  <S.InfoCardEmoji>📅</S.InfoCardEmoji>
                  <S.InfoCardTitle>Year</S.InfoCardTitle>
                </S.InfoCardHeader>
                <S.InfoCardContent>{currentStructure.year}</S.InfoCardContent>
              </S.InfoCard>

              <S.InfoCard>
                <S.InfoCardHeader>
                  <S.InfoCardEmoji>📍</S.InfoCardEmoji>
                  <S.InfoCardTitle>Location</S.InfoCardTitle>
                </S.InfoCardHeader>
                <S.InfoCardContent>
                  <GoogleMapLandmark
                    latitude={currentStructure.location.latitude}
                    longitude={currentStructure.location.longitude}
                    structureName={currentStructure.name}
                  />
                </S.InfoCardContent>
              </S.InfoCard>

              <S.InfoCard>
                <S.InfoCardHeader>
                  <S.InfoCardEmoji>🔄</S.InfoCardEmoji>
                  <S.InfoCardTitle>Status</S.InfoCardTitle>
                </S.InfoCardHeader>
                <S.InfoCardContent>Accessory</S.InfoCardContent>
              </S.InfoCard>
            </MobileQuickFacts>
          </MobileMainContent>
        </MobileContentContainer>
      </MobileCenteredWrapper>
    </MobileInfoPageWrapper>
  );
};

export default AccessoryStructureInfoMobile;

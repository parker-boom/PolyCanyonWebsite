import React from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import * as S from '../Structures.styles.js';
import useAccessoryDetail from '../hooks/useAccessoryDetail.js';
import { accessoryImages } from '../images/structureImages.js';
import GoogleMapLandmark from '../extraComponents/GoogleMapLandmark.jsx';

// Styled components modifications
const AccessoryNumber = styled(S.StructureNumberBubble)`
  font-size: 42px;
`;

const ImageOnlyContainer = styled(S.ImageSectionContainer)`
  margin-bottom: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  height: 400px;
`;

const AccessoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FullWidthDescription = styled(S.DescriptionContainer)`
  width: 99%;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

const AccessoryInfoCards = styled(S.InfoCardsSection)`
  height: 400px;
  min-height: unset;
  overflow-y: auto;
`;

const NavigationOverlay = styled(S.NavigationOverlay)`
  span {
    display: none;
  }
`;

const ColumnsContainer = styled(S.ColumnsContainer)`
  margin-bottom: 10px;
`;

const AccessoryStructureInfo = () => {
  const { currentStructure, handleNext, handlePrev, backToList } =
    useAccessoryDetail();
  if (!currentStructure)
    return (
      <S.InfoPageWrapper>
        <S.CenteredWrapper>
          <h1>Accessory structures are unavailable</h1>
          <button onClick={backToList}>Back to structures</button>
        </S.CenteredWrapper>
      </S.InfoPageWrapper>
    );

  return (
    <S.InfoPageWrapper>
      <S.CenteredWrapper>
        {/* Header */}
        <S.HeaderContainer>
          <AccessoryNumber>★</AccessoryNumber>

          <S.TitleWrapper>
            <NavigationOverlay
              side="left"
              as="button"
              type="button"
              onClick={handlePrev}
              aria-label="Previous structure"
            >
              <FaArrowLeft />
            </NavigationOverlay>

            <S.TitleAndShareContainer>
              <S.StructureTitleInfo as="h1">
                {currentStructure.name}
              </S.StructureTitleInfo>
            </S.TitleAndShareContainer>

            <NavigationOverlay
              side="right"
              as="button"
              type="button"
              onClick={handleNext}
              aria-label="Next structure"
            >
              <FaArrowRight />
            </NavigationOverlay>
          </S.TitleWrapper>

          <S.CloseButton aria-label="Back to structures" onClick={backToList}>
            <FaTimes />
          </S.CloseButton>
        </S.HeaderContainer>

        {/* Content */}
        <S.ContentContainer>
          <S.MainContent>
            <ColumnsContainer>
              {/* Left Section - Image */}
              <S.LeftSection>
                <ImageOnlyContainer>
                  <AccessoryImage
                    loading="lazy"
                    decoding="async"
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
                </ImageOnlyContainer>
              </S.LeftSection>

              {/* Right Section - Info Cards */}
              <AccessoryInfoCards>
                <S.SectionTitleInfo>Quick Facts</S.SectionTitleInfo>

                {/* Year Card */}
                <S.InfoCard>
                  <S.InfoCardHeader>
                    <S.InfoCardEmoji>📅</S.InfoCardEmoji>
                    <S.InfoCardTitle>Year</S.InfoCardTitle>
                  </S.InfoCardHeader>
                  <S.InfoCardContent>{currentStructure.year}</S.InfoCardContent>
                </S.InfoCard>

                {/* Location Card */}
                <S.InfoCard>
                  <S.InfoCardHeader>
                    <S.InfoCardEmoji>📍</S.InfoCardEmoji>
                    <S.InfoCardTitle>Location</S.InfoCardTitle>
                  </S.InfoCardHeader>
                  <S.InfoCardContent>
                    {currentStructure.location.latitude === 0 ? (
                      'Unknown'
                    ) : (
                      <GoogleMapLandmark
                        latitude={currentStructure.location.latitude}
                        longitude={currentStructure.location.longitude}
                        structureName={currentStructure.name}
                      />
                    )}
                  </S.InfoCardContent>
                </S.InfoCard>

                {/* Status Card */}
                <S.InfoCard>
                  <S.InfoCardHeader>
                    <S.InfoCardEmoji>🔄</S.InfoCardEmoji>
                    <S.InfoCardTitle>Status</S.InfoCardTitle>
                  </S.InfoCardHeader>
                  <S.InfoCardContent>Accessory</S.InfoCardContent>
                </S.InfoCard>
              </AccessoryInfoCards>
            </ColumnsContainer>

            {/* Description */}
            <FullWidthDescription>
              <S.SectionTitleInfo>Description</S.SectionTitleInfo>
              <S.DescriptionText>
                <p>{currentStructure.description}</p>
              </S.DescriptionText>
            </FullWidthDescription>
          </S.MainContent>
        </S.ContentContainer>
      </S.CenteredWrapper>
    </S.InfoPageWrapper>
  );
};

export default AccessoryStructureInfo;

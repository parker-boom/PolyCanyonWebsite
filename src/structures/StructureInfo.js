/*
Images:
1. Scale images correctly, make sure vertically fits, background image horizontally fills
---
Quick Facts:
1. Location card should use coordinates to display google maps pin 
*/

// StructureInfo.jsx
import React, { useState, useEffect } from 'react';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCamera,
  FaNewspaper,
  FaBook,
  FaGlobe,
  FaArrowLeft,
  FaArrowRight,
  FaChevronUp,
  FaExchangeAlt,
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

import { StructureLocationMap } from '../info/GoogleMapsRoute.js';

// Styles
import * as S from './Structures.styles.js';

// Import structureImages for the list view
import { mainImages, closeUpImages } from './images/structureImages.js';
import { getStructuresList, getStructureInfo } from './data/structuresData.js';

// Update the getImagePath function to handle both formats
const getImagePath = (imagePath) => {
  // Extract the image key (e.g., "M-1" or "C-1") from the path
  const imageKey = imagePath.split('/').pop();

  // Check if it's a main image or closeup image
  if (imageKey.startsWith('M-')) {
    return mainImages[imageKey];
  } else if (imageKey.startsWith('C-')) {
    return closeUpImages[imageKey];
  }

  console.warn(`Image not found for path: ${imagePath}`);
  return null;
};

const StructureInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [structure, setStructure] = useState(null);
  const [error, setError] = useState(null);

  const structureNumber = location.state?.structureNumber || 3;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [showDropdownIcon, setShowDropdownIcon] = useState(false);
  const [showList, setShowList] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(null);

  const [structuresList, setStructuresList] = useState([]);

  useEffect(() => {
    try {
      const list = getStructuresList();
      setStructuresList(list);
    } catch (error) {
      console.error('Error loading structures list:', error);
    }
  }, []);

  useEffect(() => {
    try {
      const structureData = getStructureInfo(structureNumber);
      if (structureData) {
        setStructure(structureData);
      } else {
        setError('Structure not found');
      }
    } catch (error) {
      console.error('Error loading structure:', error);
      setError(error.message);
    }
  }, [structureNumber]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [structureNumber]);

  useEffect(() => {
    const loadImage = async () => {
      if (structure?.images?.[currentImageIndex]?.path) {
        try {
          const img = new Image();
          const imagePath = getImagePath(
            structure.images[currentImageIndex].path
          );

          if (imagePath) {
            img.src = imagePath;
            img.onload = () => {
              setImageAspectRatio(img.width / img.height);
            };
          }
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }
    };

    loadImage();
  }, [currentImageIndex, structure]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!structure) {
    return (
      <S.InfoPageWrapper>
        <S.CenteredWrapper>
          <S.HeaderContainer>
            <S.StructureNumberBubble>{structureNumber}</S.StructureNumberBubble>
            <S.StructureTitleInfo>Structure Not Found</S.StructureTitleInfo>
            <S.CloseButton onClick={() => navigate('/structures')}>
              <FaTimes />
            </S.CloseButton>
          </S.HeaderContainer>
          <S.ContentContainer>
            <S.MainContent>
              <S.DescriptionContainer>
                <S.SectionTitleInfo>Notice</S.SectionTitleInfo>
                <S.DescriptionText>
                  Detailed information for structure #{structureNumber} is not
                  yet available.
                </S.DescriptionText>
              </S.DescriptionContainer>
            </S.MainContent>
          </S.ContentContainer>
        </S.CenteredWrapper>
      </S.InfoPageWrapper>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? structure.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === structure.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleDescription = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  const getLinkIcon = (title) => {
    if (title.toLowerCase().includes('article')) return <FaNewspaper />;
    if (title.toLowerCase().includes('thesis')) return <FaBook />;
    return <FaGlobe />;
  };

  const getInfoEmoji = (type) => {
    const emojiMap = {
      year: '📅',
      department: '🏛️',
      advisor: '👨‍🏫',
      builders: '👷',
      status: '🔄',
      style: '🎨',
      location: '📍',
    };
    return emojiMap[type] || '📌';
  };

  const handleStructureSelect = (number) => {
    navigate('/structure/info', { state: { structureNumber: number } });
    setShowList(false);
  };

  const handlePrevStructure = () => {
    if (!structuresList.length) return;

    const currentIndex = structuresList.findIndex(
      (s) => s.number === structureNumber
    );
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : structuresList.length - 1;
    navigate('/structure/info', {
      state: { structureNumber: structuresList[prevIndex].number },
    });
  };

  const handleNextStructure = () => {
    if (!structuresList.length) return;

    const currentIndex = structuresList.findIndex(
      (s) => s.number === structureNumber
    );
    const nextIndex =
      currentIndex < structuresList.length - 1 ? currentIndex + 1 : 0;
    navigate('/structure/info', {
      state: { structureNumber: structuresList[nextIndex].number },
    });
  };

  const getPrevStructureNumber = () => {
    if (!structuresList.length) return null;

    const currentIndex = structuresList.findIndex(
      (s) => s.number === structureNumber
    );
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : structuresList.length - 1;
    return structuresList[prevIndex].number;
  };

  const getNextStructureNumber = () => {
    if (!structuresList.length) return null;

    const currentIndex = structuresList.findIndex(
      (s) => s.number === structureNumber
    );
    const nextIndex =
      currentIndex < structuresList.length - 1 ? currentIndex + 1 : 0;
    return structuresList[nextIndex].number;
  };

  const currentImage = structure?.images?.[currentImageIndex];
  const currentImagePath = currentImage?.path
    ? getImagePath(currentImage.path)
    : null;
  const imageDescription = currentImage?.description;

  return (
    <S.InfoPageWrapper>
      <S.CenteredWrapper>
        <S.HeaderContainer>
          <S.StructureNumberBubble
            onClick={() => setShowList(!showList)}
            isOpen={showList}
            onMouseEnter={() => !showList && setShowDropdownIcon(true)}
            onMouseLeave={() => !showList && setShowDropdownIcon(false)}
          >
            {showList ? (
              <FaChevronUp />
            ) : showDropdownIcon ? (
              <FaExchangeAlt />
            ) : (
              structure.number
            )}
          </S.StructureNumberBubble>

          <S.TitleWrapper>
            <S.NavigationOverlay side="left" onClick={handlePrevStructure}>
              <S.NavigationNumber>
                {getPrevStructureNumber()}
              </S.NavigationNumber>
              <FaArrowLeft />
            </S.NavigationOverlay>

            <S.StructureTitleInfo
              onClick={() => setShowList(!showList)}
              isOpen={showList}
            >
              {showList ? 'Choose Another Structure' : structure.name}
            </S.StructureTitleInfo>

            <S.NavigationOverlay side="right" onClick={handleNextStructure}>
              <S.NavigationNumber>
                {getNextStructureNumber()}
              </S.NavigationNumber>
              <FaArrowRight />
            </S.NavigationOverlay>
          </S.TitleWrapper>

          <S.CloseButton onClick={() => navigate('/structures')}>
            <FaTimes />
          </S.CloseButton>
        </S.HeaderContainer>

        <S.ContentContainer>
          {showList ? (
            <S.StructureListView>
              <S.StructuresListGrid>
                {structuresList.map((item) => (
                  <S.StructureListCard
                    key={item.number}
                    onClick={() => handleStructureSelect(item.number)}
                    isSelected={item.number === structure.number}
                  >
                    <S.StructureImage
                      src={mainImages[item.image_key]}
                      alt={item.title}
                    />
                    <S.StructureListInfo>
                      <S.StructureListNumber>
                        {item.number}
                      </S.StructureListNumber>
                      <S.StructureListTitle>{item.title}</S.StructureListTitle>
                    </S.StructureListInfo>
                  </S.StructureListCard>
                ))}
              </S.StructuresListGrid>
            </S.StructureListView>
          ) : (
            <S.MainContent>
              <S.ColumnsContainer>
                <S.LeftSection>
                  <S.DescriptionContainer>
                    <S.SectionTitleInfo>Images</S.SectionTitleInfo>
                    <S.ImageContainer>
                      {structure?.images?.[currentImageIndex]?.path && (
                        <>
                          <S.BackgroundImage
                            src={getImagePath(
                              structure.images[currentImageIndex].path
                            )}
                            alt=""
                            loading="lazy"
                            style={{
                              objectPosition:
                                imageAspectRatio < 16 / 9
                                  ? '50% 50%'
                                  : '50% 50%',
                            }}
                          />

                          <S.StyledImage
                            src={getImagePath(
                              structure.images[currentImageIndex].path
                            )}
                            alt={
                              structure.images[currentImageIndex].description
                            }
                            style={{
                              width:
                                imageAspectRatio < 16 / 9 ? 'auto' : '100%',
                              height:
                                imageAspectRatio < 16 / 9 ? '100%' : 'auto',
                            }}
                          />
                        </>
                      )}

                      {structure?.images?.length > 1 && (
                        <S.ImageControls>
                          <S.ArrowButton onClick={handlePrevImage}>
                            <FaChevronLeft />
                          </S.ArrowButton>
                          <S.ArrowButton onClick={handleNextImage}>
                            <FaChevronRight />
                          </S.ArrowButton>
                        </S.ImageControls>
                      )}
                    </S.ImageContainer>

                    <S.ImageDescription>
                      <FaCamera />
                      <p>{imageDescription}</p>
                    </S.ImageDescription>
                  </S.DescriptionContainer>

                  <S.DescriptionContainer>
                    <S.SectionTitleInfo>Description</S.SectionTitleInfo>
                    <S.DescriptionText expanded={descriptionExpanded}>
                      <p>{structure.description}</p>
                      <p>{structure.extended_description}</p>
                    </S.DescriptionText>
                    <S.ToggleDescriptionButton onClick={toggleDescription}>
                      {descriptionExpanded
                        ? 'Show Less Info'
                        : 'Show More Info'}
                    </S.ToggleDescriptionButton>
                  </S.DescriptionContainer>
                </S.LeftSection>

                <S.InfoCardsSection>
                  <S.SectionTitleInfo>Quick Facts</S.SectionTitleInfo>

                  {structure.year && (
                    <S.InfoCard>
                      <S.InfoCardHeader>
                        <S.InfoCardEmoji>
                          {getInfoEmoji('year')}
                        </S.InfoCardEmoji>
                        <S.InfoCardTitle>Year</S.InfoCardTitle>
                      </S.InfoCardHeader>
                      <S.InfoCardContent>{structure.year}</S.InfoCardContent>
                    </S.InfoCard>
                  )}

                  {structure.department?.length > 0 && (
                    <S.InfoCard>
                      <S.InfoCardHeader>
                        <S.InfoCardEmoji>
                          {getInfoEmoji('department')}
                        </S.InfoCardEmoji>
                        <S.InfoCardTitle>Department</S.InfoCardTitle>
                      </S.InfoCardHeader>
                      <S.InfoCardContent>
                        {structure.department.join(', ')}
                      </S.InfoCardContent>
                    </S.InfoCard>
                  )}

                  {structure.advisor_builders?.some((person) =>
                    person.role.includes('Advisor')
                  ) && (
                    <S.InfoCard>
                      <S.InfoCardHeader>
                        <S.InfoCardEmoji>
                          {getInfoEmoji('advisor')}
                        </S.InfoCardEmoji>
                        <S.InfoCardTitle>Advisors</S.InfoCardTitle>
                      </S.InfoCardHeader>
                      <S.InfoCardContent>
                        {structure.advisor_builders
                          .filter((person) => person.role.includes('Advisor'))
                          .map((person) => person.name)
                          .join(', ')}
                      </S.InfoCardContent>
                    </S.InfoCard>
                  )}

                  {structure.advisor_builders?.some(
                    (person) => !person.role.includes('Advisor')
                  ) && (
                    <S.InfoCard>
                      <S.InfoCardHeader>
                        <S.InfoCardEmoji>
                          {getInfoEmoji('builders')}
                        </S.InfoCardEmoji>
                        <S.InfoCardTitle>Builders</S.InfoCardTitle>
                      </S.InfoCardHeader>
                      <S.InfoCardContent>
                        {structure.advisor_builders
                          .filter((person) => !person.role.includes('Advisor'))
                          .map((person) => person.name)
                          .join(', ')}
                      </S.InfoCardContent>
                    </S.InfoCard>
                  )}

                  {structure.status && (
                    <S.InfoCard>
                      <S.InfoCardHeader>
                        <S.InfoCardEmoji>
                          {getInfoEmoji('status')}
                        </S.InfoCardEmoji>
                        <S.InfoCardTitle>Status</S.InfoCardTitle>
                      </S.InfoCardHeader>
                      <S.InfoCardContent>{structure.status}</S.InfoCardContent>
                    </S.InfoCard>
                  )}

                  {structure.style && (
                    <S.InfoCard>
                      <S.InfoCardHeader>
                        <S.InfoCardEmoji>
                          {getInfoEmoji('style')}
                        </S.InfoCardEmoji>
                        <S.InfoCardTitle>Style</S.InfoCardTitle>
                      </S.InfoCardHeader>
                      <S.InfoCardContent>{structure.style}</S.InfoCardContent>
                    </S.InfoCard>
                  )}

                  {structure.location?.latitude &&
                    structure.location?.longitude && (
                      <S.InfoCard>
                        <S.InfoCardHeader>
                          <S.InfoCardEmoji>
                            {getInfoEmoji('location')}
                          </S.InfoCardEmoji>
                          <S.InfoCardTitle>Location</S.InfoCardTitle>
                        </S.InfoCardHeader>
                        <StructureLocationMap
                          latitude={structure.location.latitude}
                          longitude={structure.location.longitude}
                        />
                      </S.InfoCard>
                    )}
                </S.InfoCardsSection>
              </S.ColumnsContainer>

              <S.LinksSection>
                <S.LinkButtonContainer>
                  {structure.links.map((link, index) => (
                    <S.LinkButton
                      key={index}
                      href={link.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getLinkIcon(link.title)}
                      {link.title}
                    </S.LinkButton>
                  ))}
                </S.LinkButtonContainer>
              </S.LinksSection>
            </S.MainContent>
          )}
        </S.ContentContainer>
      </S.CenteredWrapper>
    </S.InfoPageWrapper>
  );
};

export default StructureInfo;

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

// Data
import structureData from './structureExInfo.json';
import structureList from './structureList.json';
import { StructureLocationMap } from '../info/GoogleMapsRoute';

// Styles
import * as S from './Structures.styles';

// Import structureImages for the list view
import { structureImages } from './structureImages';

// Import all main and closeup images
import M1 from './images/M-1.jpg';
import M2 from './images/M-2.jpg';
import M3 from './images/M-3.jpg';
import M4 from './images/M-4.jpg';
import M5 from './images/M-5.jpg';
import M6 from './images/M-6.jpg';

import C1 from './images/C-1.jpg';
import C2 from './images/C-2.jpg';
import C3 from './images/C-3.jpg';
import C4 from './images/C-4.jpg';
import C5 from './images/C-5.jpg';
import C6 from './images/C-6.jpg';

// Historical images for Structure 3
import HistM3 from './historicalImages/M-3.jpg';
import HistC3 from './historicalImages/C-3.jpg';
import BladeRedesign from './historicalImages/BladeRedesign.png';
import OriginalBladePeople from './historicalImages/OriginalBladePeople.png';

// Create a comprehensive image map
const imageMap = {
  // Standard images (M/C pairs)
  '/images/M-1': M1,
  '/images/C-1': C1,
  '/images/M-2': M2,
  '/images/C-2': C2,
  '/images/M-3': M3,
  '/images/C-3': C3,
  '/images/M-4': M4,
  '/images/C-4': C4,
  '/images/M-5': M5,
  '/images/C-5': C5,
  '/images/M-6': M6,
  '/images/C-6': C6,

  // Special case: Structure 3 historical images
  '/historicalImages/M-3.jpg': HistM3,
  '/historicalImages/C-3.jpg': HistC3,
  '/historicalImages/BladeRedesign.png': BladeRedesign,
  '/historicalImages/OriginalBladePeople.png': OriginalBladePeople,
};

// Update the getImagePath function to handle both formats
const getImagePath = (relativePath) => {
  // Handle paths that already include the extension
  if (relativePath.includes('.')) {
    return imageMap[relativePath];
  }
  // Handle paths that need the extension added
  return imageMap[`${relativePath}.jpg`] || imageMap[relativePath];
};

// Add new helper function for image loading
const createImageLoader = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

const StructureInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get structure data first
  const structureNumber = location.state?.structureNumber || 3;
  const structure = structureData.structures.find(
    (s) => s.number === structureNumber
  );

  // Then declare states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [showDropdownIcon, setShowDropdownIcon] = useState(false);
  const [showList, setShowList] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(null);

  // Reset currentImageIndex when structure changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [structureNumber]);

  // Now useEffect can safely access structure
  useEffect(() => {
    const loadImage = async () => {
      if (structure?.images?.[currentImageIndex]?.path) {
        try {
          const img = await createImageLoader(
            getImagePath(structure.images[currentImageIndex].path)
          );
          setImageAspectRatio(img.width / img.height);
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }
    };

    loadImage();
  }, [currentImageIndex, structure]);

  // Function to handle closing
  const handleClose = () => {
    navigate('/structures');
  };

  // If no structure is found, show a message
  if (!structure) {
    return (
      <S.InfoPageWrapper>
        <S.CenteredWrapper>
          <S.HeaderContainer>
            <S.StructureNumberBubble>{structureNumber}</S.StructureNumberBubble>
            <S.StructureTitleInfo>Structure Not Found</S.StructureTitleInfo>
            <S.CloseButton onClick={handleClose}>
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

  // Helper function to get link icon
  const getLinkIcon = (title) => {
    if (title.toLowerCase().includes('article')) return <FaNewspaper />;
    if (title.toLowerCase().includes('thesis')) return <FaBook />;
    return <FaGlobe />;
  };

  // Helper function to get emoji for info cards
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
    const currentIndex = structureList.findIndex(
      (s) => s.number === structureNumber
    );
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : structureList.length - 1;
    navigate('/structure/info', {
      state: { structureNumber: structureList[prevIndex].number },
    });
  };

  const handleNextStructure = () => {
    const currentIndex = structureList.findIndex(
      (s) => s.number === structureNumber
    );
    const nextIndex =
      currentIndex < structureList.length - 1 ? currentIndex + 1 : 0;
    navigate('/structure/info', {
      state: { structureNumber: structureList[nextIndex].number },
    });
  };

  // Add these helper functions
  const getPrevStructureNumber = () => {
    const currentIndex = structureList.findIndex(
      (s) => s.number === structureNumber
    );
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : structureList.length - 1;
    return structureList[prevIndex].number;
  };

  const getNextStructureNumber = () => {
    const currentIndex = structureList.findIndex(
      (s) => s.number === structureNumber
    );
    const nextIndex =
      currentIndex < structureList.length - 1 ? currentIndex + 1 : 0;
    return structureList[nextIndex].number;
  };

  // Add safety checks in the render section
  const currentImage = structure?.images?.[currentImageIndex];
  const imagePath = currentImage?.path;
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

          <S.CloseButton onClick={handleClose}>
            <FaTimes />
          </S.CloseButton>
        </S.HeaderContainer>

        <S.ContentContainer>
          {showList ? (
            <S.StructureListView>
              <S.StructuresListGrid>
                {structureList.map((item) => (
                  <S.StructureListCard
                    key={item.number}
                    onClick={() => handleStructureSelect(item.number)}
                    isSelected={item.number === structure.number}
                  >
                    <S.StructureImage
                      src={structureImages[item.image_key]}
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
                      {imagePath && (
                        <>
                          <S.BackgroundImage
                            src={getImagePath(imagePath)}
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
                            src={getImagePath(imagePath)}
                            alt={imageDescription}
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

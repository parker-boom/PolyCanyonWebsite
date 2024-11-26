/*

FUTURE
2. Add sharing feature
3. Advisor logic (currently just shows as builders)
*/

/*
Imports
*/
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
import { useNavigate, useParams } from 'react-router-dom';

// Styles
import * as S from './Structures.styles.js';

// Components, images, and data
import GoogleMapLandmark from './GoogleMapLandmark.js';
import {
  mainImages,
  closeUpImages,
  otherImages,
} from './images/structureImages.js';
import { getStructuresList, getStructureInfo } from './data/structuresData.js';
import useImagePreloader from './useImagePreloader.js';
import LoadingSpinner from './LoadingSpinner.js';

// Image path helper function
const getImagePath = (imagePath) => {
  const imageKey = imagePath.split('/').pop();

  if (imageKey.startsWith('M-')) return mainImages[imageKey];
  if (imageKey.startsWith('C-')) return closeUpImages[imageKey];
  return otherImages[imageKey];
};

// Add this sorting function near the top of the file
const sortImages = (images) => {
  return [...images].sort((a, b) => {
    const typeOrder = { main: 0, other: 1, closeup: 2 };
    return typeOrder[a.type] - typeOrder[b.type];
  });
};

const StructureInfo = () => {
  // Navigate
  const navigate = useNavigate();
  const { structureUrl } = useParams();

  // States
  const [structure, setStructure] = useState(null);
  const [structureNumber, setStructureNumber] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [showDropdownIcon, setShowDropdownIcon] = useState(false);
  const [showList, setShowList] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(null);
  const [structuresList, setStructuresList] = useState([]);
  const [imagePaths, setImagePaths] = useState({
    currentPaths: [],
    adjacentPaths: { prev: [], next: [] },
  });

  // Use the preloader hook with new interface
  const { imagesLoaded, loadedImages } = useImagePreloader(imagePaths);

  // Load structures list (from JSON)
  useEffect(() => {
    try {
      const list = getStructuresList();
      setStructuresList(list);
    } catch (error) {
      console.error('Error loading structures list:', error);
    }
  }, []);

  // Modify the structure data loading effect to include adjacent structures
  useEffect(() => {
    try {
      const list = getStructuresList();
      const foundStructure = list.find((s) => s.url === structureUrl);
      if (foundStructure) {
        setStructureNumber(foundStructure.number);
        const structureData = getStructureInfo(foundStructure.number);

        // Sort the images if they exist
        if (structureData.images) {
          structureData.images = sortImages(structureData.images);
        }

        setStructure(structureData);

        // Get current structure paths (now using sorted images)
        const currentPaths =
          structureData?.images
            ?.map((img) => getImagePath(img.path))
            .filter(Boolean) || [];

        // Get adjacent structure paths
        const currentIndex = list.findIndex((s) => s.url === structureUrl);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : list.length - 1;
        const nextIndex = currentIndex < list.length - 1 ? currentIndex + 1 : 0;

        const prevStructure = getStructureInfo(list[prevIndex].number);
        const nextStructure = getStructureInfo(list[nextIndex].number);

        const prevPaths =
          prevStructure?.images
            ?.map((img) => getImagePath(img.path))
            .filter(Boolean) || [];
        const nextPaths =
          nextStructure?.images
            ?.map((img) => getImagePath(img.path))
            .filter(Boolean) || [];

        setImagePaths({
          currentPaths,
          adjacentPaths: {
            prev: prevPaths,
            next: nextPaths,
          },
        });
      }
    } catch (error) {
      console.error('Error loading structure:', error);
    }
  }, [structureUrl]);

  // Reset image index when structure changes
  useEffect(() => {
    if (structureNumber) {
      setCurrentImageIndex(0);
    }
  }, [structureNumber]);

  // Load image & determine aspect ratio
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

  // Go back 1 image in carousel
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? structure.images.length - 1 : prevIndex - 1
    );
  };

  // Go forward 1 image in carousel
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === structure.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Toggle description expanded/normal
  const toggleDescription = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  // Get link icon based on title
  const getLinkIcon = (title) => {
    if (title.toLowerCase().includes('article')) return <FaNewspaper />;
    if (title.toLowerCase().includes('thesis')) return <FaBook />;
    return <FaGlobe />;
  };

  // Emojis
  const getInfoEmoji = (type) => {
    const emojiMap = {
      year: '📅',
      advisor: '👨‍🏫',
      builders: '👷',
      status: '🔄',
      location: '📍',
    };
    return emojiMap[type] || '📌';
  };

  // Update URL when structure changes
  const handleStructureSelect = (structure) => {
    navigate(`/structures/${structure.url}`);
    setShowList(false);
  };

  // Go back 1 structure in list
  const handlePrevStructure = () => {
    if (!structuresList.length) return;
    const currentIndex = structuresList.findIndex(
      (s) => s.url === structureUrl
    );
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : structuresList.length - 1;
    navigate(`/structures/${structuresList[prevIndex].url}`);
  };

  // Go forward 1 structure in list
  const handleNextStructure = () => {
    if (!structuresList.length) return;
    const currentIndex = structuresList.findIndex(
      (s) => s.url === structureUrl
    );
    const nextIndex =
      currentIndex < structuresList.length - 1 ? currentIndex + 1 : 0;
    navigate(`/structures/${structuresList[nextIndex].url}`);
  };

  // Get previous structure number in list
  const getPrevStructureNumber = () => {
    if (!structuresList.length) return null;

    const currentIndex = structuresList.findIndex(
      (s) => s.number === structureNumber
    );
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : structuresList.length - 1;
    return structuresList[prevIndex].number;
  };

  // Get next structure number in list
  const getNextStructureNumber = () => {
    if (!structuresList.length) return null;

    const currentIndex = structuresList.findIndex(
      (s) => s.number === structureNumber
    );
    const nextIndex =
      currentIndex < structuresList.length - 1 ? currentIndex + 1 : 0;
    return structuresList[nextIndex].number;
  };

  // Get the current image and description
  const currentImage = structure?.images?.[currentImageIndex];
  const imageDescription = currentImage?.description;

  // Get valid links (AKA don't show placeholder links)
  const getValidLinks = () => {
    if (!structure.links) return [];
    return structure.links.filter((link) => link.URL !== 'https://google.com');
  };

  // Modify the loading state to keep header visible
  if (!structure || !structureNumber) {
    return (
      <S.InfoPageWrapper>
        <S.CenteredWrapper>
          <S.HeaderContainer>
            <S.StructureTitleInfo>Loading...</S.StructureTitleInfo>
            <S.CloseButton onClick={() => navigate('/structures')}>
              <FaTimes />
            </S.CloseButton>
          </S.HeaderContainer>
        </S.CenteredWrapper>
      </S.InfoPageWrapper>
    );
  }

  // Show loading spinner only for images while keeping header
  if (!imagesLoaded) {
    return (
      <S.InfoPageWrapper>
        <S.CenteredWrapper>
          {/* Header stays visible during image loading */}
          <S.HeaderContainer>
            <S.StructureNumberBubble>
              {structure.number}
            </S.StructureNumberBubble>

            <S.TitleWrapper>
              <S.NavigationOverlay side="left" onClick={handlePrevStructure}>
                <S.NavigationNumber>
                  {getPrevStructureNumber()}
                </S.NavigationNumber>
                <FaArrowLeft />
              </S.NavigationOverlay>

              <S.StructureTitleInfo>{structure.names[0]}</S.StructureTitleInfo>

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

          {/* Loading spinner for images */}
          <S.ContentContainer>
            <LoadingSpinner />
          </S.ContentContainer>
        </S.CenteredWrapper>
      </S.InfoPageWrapper>
    );
  }

  // Render the structure info page
  return (
    <S.InfoPageWrapper>
      <S.CenteredWrapper>
        {/* Header Content: Number, Title, Close*/}
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
              {showList ? 'Choose Another Structure' : structure.names[0]}
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

        {/* Content Container: List of structures or Structure Info Content */}
        <S.ContentContainer>
          {/* List of structures for changing */}
          {showList ? (
            <S.StructureListView>
              <S.StructuresListGrid>
                {structuresList.map((item) => (
                  <S.StructureListCard
                    key={item.number}
                    onClick={() => handleStructureSelect(item)}
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
              {/* Main Content: Image / Description on left | Quick Facts on right */}
              <S.ColumnsContainer>
                <S.LeftSection>
                  <S.DescriptionContainer>
                    <S.SectionTitleInfo>Images</S.SectionTitleInfo>

                    {/* Image Container: Carousel & Scaling based on aspect ratio */}
                    <S.ImageContainer>
                      {structure?.images?.[currentImageIndex]?.path &&
                        loadedImages[currentImageIndex] && (
                          <>
                            <S.BackgroundImage
                              src={
                                loadedImages[currentImageIndex].background.src
                              }
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
                              src={
                                loadedImages[currentImageIndex].foreground.src
                              }
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

                  {/* Description Container: Description & Toggle extended Button */}
                  <S.DescriptionContainer>
                    <S.SectionTitleInfo>Description</S.SectionTitleInfo>
                    <S.DescriptionText expanded={descriptionExpanded}>
                      <p>{structure.description}</p>
                      {descriptionExpanded && (
                        <div className="extended">
                          {structure.extended_description}
                        </div>
                      )}
                    </S.DescriptionText>
                    <S.ToggleDescriptionButton onClick={toggleDescription}>
                      {descriptionExpanded
                        ? 'Show Less Info'
                        : 'Show More Info'}
                    </S.ToggleDescriptionButton>
                  </S.DescriptionContainer>
                </S.LeftSection>

                {/* Info Cards Section: Quick Facts, scrollable, matches height of image/description */}
                <S.InfoCardsSection>
                  <S.SectionTitleInfo>Quick Facts</S.SectionTitleInfo>

                  {/* Year Card */}
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

                  {/* Add Also Known As card if there are alternate names */}
                  {structure.names.length > 1 && (
                    <S.InfoCard>
                      <S.InfoCardHeader>
                        <S.InfoCardEmoji>📝</S.InfoCardEmoji>
                        <S.InfoCardTitle>Also Known As</S.InfoCardTitle>
                      </S.InfoCardHeader>
                      <S.InfoCardContent>
                        {structure.names.slice(1).join(', ')}
                      </S.InfoCardContent>
                    </S.InfoCard>
                  )}

                  {/* Advisor Card : !DOESNT WORK BECAUSE ADVISORS ARE JUST BUILDERS RN */}
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

                  {/* Builders Card */}
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

                  {/* Status Card */}
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

                  {/* Location Card */}
                  {structure.location?.latitude &&
                    structure.location?.longitude && (
                      <S.InfoCard>
                        <S.InfoCardHeader>
                          <S.InfoCardEmoji>
                            {getInfoEmoji('location')}
                          </S.InfoCardEmoji>
                          <S.InfoCardTitle>Location</S.InfoCardTitle>
                        </S.InfoCardHeader>
                        {/* Google Maps Connection */}
                        <GoogleMapLandmark
                          latitude={structure.location.latitude}
                          longitude={structure.location.longitude}
                          structureName={structure.names[0]}
                        />
                      </S.InfoCard>
                    )}
                </S.InfoCardsSection>
              </S.ColumnsContainer>

              {/* Links Section (only shows if there are valid links) */}
              {getValidLinks().length > 0 && (
                <S.LinksSection>
                  <S.LinkButtonContainer>
                    {getValidLinks().map((link, index) => (
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
              )}
            </S.MainContent>
          )}
        </S.ContentContainer>
      </S.CenteredWrapper>
    </S.InfoPageWrapper>
  );
};

export default StructureInfo;

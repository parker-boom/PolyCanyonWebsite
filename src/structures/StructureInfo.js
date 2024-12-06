/*
Imports
*/
import React, { useState, useEffect, useRef } from 'react';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaNewspaper,
  FaBook,
  FaGlobe,
  FaArrowLeft,
  FaArrowRight,
  FaExpandArrowsAlt,
  FaQuestion,
  FaShareSquare,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
import ResearchInfo from './ResearchInfo.js';

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
  const [imageAspectRatio, setImageAspectRatio] = useState(null);
  const [structuresList, setStructuresList] = useState([]);
  const [imagePaths, setImagePaths] = useState({
    currentPaths: [],
    adjacentPaths: { prev: [], next: [] },
  });
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [showResearchInfo, setShowResearchInfo] = useState(false);

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

        // Get URL parameters
        const params = new URLSearchParams(window.location.search);

        // Set fullscreen mode if parameter exists
        if (params.get('fullscreen') === 'true') {
          setIsFullscreenMode(true);
        }

        // Set image index if parameter exists and is valid
        const imageIndex = parseInt(params.get('imageIndex'));
        if (
          !isNaN(imageIndex) &&
          structureData.images &&
          imageIndex < structureData.images.length
        ) {
          setCurrentImageIndex(imageIndex);
        }

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

  // Measure image container height
  const imageContainerRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(null);

  // Measure image container height
  useEffect(() => {
    if (imageContainerRef.current) {
      setImageHeight(imageContainerRef.current.offsetHeight);
    }
  }, [structure, descriptionExpanded]); // Re-measure when description expands/collapses

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreenMode(!isFullscreenMode);
  };

  // Share function with API if available, otherwise fallback to copying URL
  const handleShare = async () => {
    const shareUrl = `https://polycanyon.com/structures/${structure.url}`;
    const shareText = 'Check out this structure in Poly Canyon!';

    if (navigator.share) {
      try {
        await navigator.share({
          title: structure.names[0],
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // Don't show error if user just cancelled share
        if (error.name !== 'AbortError') {
          // Fallback to copying URL
          await navigator.clipboard.writeText(shareUrl);
        }
      }
    } else {
      // Fallback for browsers that don't support sharing
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch (error) {
        console.error('Failed to copy URL:', error);
      }
    }
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
              <S.NavigationOverlay
                side="left"
                onClick={handlePrevStructure}
                role="button"
                aria-label="Previous structure"
              >
                <S.NavigationNumber side="left">
                  {getPrevStructureNumber()}
                </S.NavigationNumber>
                <FaArrowLeft />
              </S.NavigationOverlay>

              <S.TitleAndShareContainer>
                <S.StructureTitleInfo>
                  {structure.names[0]}
                </S.StructureTitleInfo>
              </S.TitleAndShareContainer>

              <S.NavigationOverlay
                side="right"
                onClick={handleNextStructure}
                role="button"
                aria-label="Next structure"
              >
                <S.NavigationNumber side="right">
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
    <>
      {structure && (
        <Helmet>
          {/* Basic metadata */}
          <title>{structure.names[0]}</title>
          <meta
            name="description"
            content={structure.description.slice(0, 155) + '...'}
          />
          <meta
            name="keywords"
            content={[
              ...structure.tags,
              ...structure.names,
              'Poly Canyon',
              'Cal Poly',
              'Architecture',
              'Student Projects',
            ].join(', ')}
          />

          {/* OpenGraph metadata with image */}
          <meta property="og:title" content={structure.names[0]} />
          <meta
            property="og:description"
            content={structure.description.slice(0, 155) + '...'}
          />
          <meta
            property="og:url"
            content={`https://polycanyon.com/structures/${structure.url}`}
          />
          {structure?.images?.[0]?.path && (
            <>
              <meta
                property="og:image"
                content={getImagePath(structure.images[0].path)}
              />
              <meta
                property="og:image"
                content={`https://polycanyon.com${getImagePath(structure.images[0].path)}`}
              />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />
            </>
          )}

          {/* Twitter metadata with image */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={structure.names[0]} />
          <meta
            name="twitter:description"
            content={structure.description.slice(0, 155) + '...'}
          />
          {structure?.images?.[0]?.path && (
            <meta
              name="twitter:image"
              content={getImagePath(structure.images[0].path)}
            />
          )}
        </Helmet>
      )}

      <S.InfoPageWrapper>
        <S.CenteredWrapper>
          {/* Header Content: Number, Title, Close*/}
          <S.HeaderContainer>
            <S.StructureNumberBubble>
              {structure.number}
            </S.StructureNumberBubble>

            <S.TitleWrapper>
              <S.NavigationOverlay
                side="left"
                onClick={handlePrevStructure}
                role="button"
                aria-label="Previous structure"
              >
                <S.NavigationNumber side="left">
                  {getPrevStructureNumber()}
                </S.NavigationNumber>
                <FaArrowLeft />
              </S.NavigationOverlay>

              <S.TitleAndShareContainer>
                <S.StructureTitleInfo>
                  {structure.names[0]}
                </S.StructureTitleInfo>
              </S.TitleAndShareContainer>

              <S.NavigationOverlay
                side="right"
                onClick={handleNextStructure}
                role="button"
                aria-label="Next structure"
              >
                <S.NavigationNumber side="right">
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
          <S.ContentContainer isFullscreen={isFullscreenMode}>
            {isFullscreenMode ? (
              <S.FullscreenContainer>
                <S.FullscreenImageContainer>
                  {structure?.images?.[currentImageIndex]?.path &&
                    loadedImages[currentImageIndex] && (
                      <>
                        <S.FullscreenBackgroundImage
                          src={loadedImages[currentImageIndex].background.src}
                          alt=""
                          loading="lazy"
                          style={{
                            objectPosition:
                              imageAspectRatio < 16 / 9 ? '50% 50%' : '50% 50%',
                          }}
                        />
                        <S.FullscreenImage
                          src={loadedImages[currentImageIndex].foreground.src}
                          alt={structure.images[currentImageIndex].description}
                          style={{
                            width: imageAspectRatio < 16 / 9 ? 'auto' : '100%',
                            height: imageAspectRatio < 16 / 9 ? '100%' : 'auto',
                          }}
                        />
                      </>
                    )}

                  <S.FullscreenNavigation>
                    {structure?.images?.length > 1 && (
                      <>
                        <S.FullscreenArrowButton onClick={handlePrevImage}>
                          <FaChevronLeft />
                        </S.FullscreenArrowButton>
                        <S.FullscreenArrowButton onClick={handleNextImage}>
                          <FaChevronRight />
                        </S.FullscreenArrowButton>
                      </>
                    )}
                  </S.FullscreenNavigation>

                  <S.FullscreenCaptionBar>
                    <S.ImageCounter>
                      {currentImageIndex + 1} / {structure.images.length}
                    </S.ImageCounter>
                    <S.CaptionText>{imageDescription}</S.CaptionText>
                    <S.FullscreenCloseButton
                      onClick={toggleFullscreen}
                      aria-label="Exit fullscreen mode"
                    >
                      <FaTimes />
                    </S.FullscreenCloseButton>
                  </S.FullscreenCaptionBar>
                </S.FullscreenImageContainer>
              </S.FullscreenContainer>
            ) : (
              <S.MainContent>
                {/* Main Content: Image / Description on left | Quick Facts on right */}
                <S.ColumnsContainer>
                  <S.LeftSection>
                    <S.ImageSectionContainer ref={imageContainerRef}>
                      <S.ImageSectionHeader>
                        <S.SectionTitleInfo>Images</S.SectionTitleInfo>
                        <S.FullscreenButton
                          onClick={toggleFullscreen}
                          aria-label="Toggle fullscreen mode"
                        >
                          <FaExpandArrowsAlt />
                        </S.FullscreenButton>
                      </S.ImageSectionHeader>

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
                                  structure.images[currentImageIndex]
                                    .description
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
                      </S.ImageContainer>

                      <S.ImageDescription>
                        {structure?.images?.length > 1 && (
                          <S.ArrowButton onClick={handlePrevImage}>
                            <FaChevronLeft />
                          </S.ArrowButton>
                        )}
                        <p>{imageDescription}</p>
                        {structure?.images?.length > 1 && (
                          <S.ArrowButton onClick={handleNextImage}>
                            <FaChevronRight />
                          </S.ArrowButton>
                        )}
                      </S.ImageDescription>
                    </S.ImageSectionContainer>

                    {descriptionExpanded ? (
                      <S.DescriptionContainerExpanded>
                        <S.SectionTitleInfo>Description</S.SectionTitleInfo>
                        <S.DescriptionText expanded={descriptionExpanded}>
                          <p>{structure.description}</p>
                          <div className="extended">
                            {structure.extended_description}
                          </div>
                        </S.DescriptionText>
                        <S.ToggleDescriptionButton onClick={toggleDescription}>
                          Show Less Info
                        </S.ToggleDescriptionButton>
                      </S.DescriptionContainerExpanded>
                    ) : (
                      <S.DescriptionContainer>
                        <S.SectionTitleInfo>Description</S.SectionTitleInfo>
                        <S.DescriptionText expanded={false}>
                          <p>{structure.description}</p>
                        </S.DescriptionText>
                        <S.ToggleDescriptionButton onClick={toggleDescription}>
                          Show More Info
                        </S.ToggleDescriptionButton>
                      </S.DescriptionContainer>
                    )}
                  </S.LeftSection>

                  {/* Info Cards Section: Quick Facts, scrollable, matches height of image/description */}
                  {descriptionExpanded ? (
                    <S.InfoCardsSectionExpanded imageHeight={imageHeight}>
                      <S.ShareButton
                        onClick={handleShare}
                        aria-label="Share structure"
                      >
                        <FaShareSquare />
                      </S.ShareButton>
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
                          <S.InfoCardContent>
                            {structure.year}
                          </S.InfoCardContent>
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
                              .filter((person) =>
                                person.role.includes('Advisor')
                              )
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
                              .filter(
                                (person) => !person.role.includes('Advisor')
                              )
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
                          <S.InfoCardContent>
                            {structure.status}
                          </S.InfoCardContent>
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
                    </S.InfoCardsSectionExpanded>
                  ) : (
                    <S.InfoCardsSection>
                      <S.ShareButton
                        onClick={handleShare}
                        aria-label="Share structure"
                      >
                        <FaShareSquare />
                      </S.ShareButton>
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
                          <S.InfoCardContent>
                            {structure.year}
                          </S.InfoCardContent>
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
                              .filter((person) =>
                                person.role.includes('Advisor')
                              )
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
                              .filter(
                                (person) => !person.role.includes('Advisor')
                              )
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
                          <S.InfoCardContent>
                            {structure.status}
                          </S.InfoCardContent>
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
                  )}
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
                      <S.CircleInfoButton
                        onClick={() => setShowResearchInfo(true)}
                        style={{ marginLeft: 'auto' }}
                      >
                        <FaQuestion />
                      </S.CircleInfoButton>
                    </S.LinkButtonContainer>
                  </S.LinksSection>
                )}
              </S.MainContent>
            )}
          </S.ContentContainer>
        </S.CenteredWrapper>
      </S.InfoPageWrapper>

      {showResearchInfo && (
        <ResearchInfo onClose={() => setShowResearchInfo(false)} />
      )}
    </>
  );
};

export default StructureInfo;

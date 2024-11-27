/*
Mobile implementation of StructureInfo component
Maintains core functionality with mobile-optimized layout
*/

/*
Imports
*/
import React, { useState, useEffect } from 'react';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaNewspaper,
  FaBook,
  FaGlobe,
  FaCamera,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useGesture } from '@use-gesture/react';
import useImagePreloader from './useImagePreloader.js';
import LoadingSpinner from './LoadingSpinner.js';
import { Helmet } from 'react-helmet-async';

// Components and data
import GoogleMapLandmark from './GoogleMapLandmark.js';
import {
  mainImages,
  closeUpImages,
  otherImages,
} from './images/structureImages.js';
import { getStructuresList, getStructureInfo } from './data/structuresData.js';
import * as S from './Structures.styles.js';

/*
Mobile-specific styled components extending base styles
*/
const MobileInfoPageWrapper = styled(S.InfoPageWrapper)`
  padding: 0;
`;

const MobileCenteredWrapper = styled(S.CenteredWrapper)`
  max-width: 100%;
`;

const MobileHeaderContainer = styled(S.HeaderContainer)`
  border-radius: 0;
  padding: 12px;
  margin: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
`;

const MobileContentContainer = styled(S.ContentContainer)`
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  background: #e8efe8;
`;

const MobileMainContent = styled(S.MainContent)`
  flex-direction: column;
  background: #e8efe8;
`;

const MobileImageContainer = styled(S.ImageContainer)`
  border-radius: 0;
  border-bottom: none;
  margin-bottom: 0;
  box-shadow: none;
`;

const MobileDescriptionContainer = styled(S.DescriptionContainer)`
  border-radius: 24px;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 10px;
  width: 95%;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.9),
    rgba(255, 245, 222, 0.85)
  );
  border: 1px solid rgba(189, 139, 19, 0.15);
  box-shadow:
    0 4px 16px rgba(55, 109, 49, 0.15),
    0 2px 4px rgba(55, 109, 49, 0.1);

  &:hover {
    transform: none;
  }
`;

const MobileInfoCardsSection = styled(S.InfoCardsSection)`
  margin: 12px;
  border-radius: 12px;
`;

const MobileLinksSection = styled(S.LinksSection)`
  padding: 16px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.95),
    rgba(255, 245, 222, 0.9)
  );
  box-shadow: 0 2px 8px rgba(189, 139, 19, 0.15);
  border: 1px solid rgba(189, 139, 19, 0.15);
  position: relative;
  margin-top: 24px;

  &::before {
    content: 'Resources';
    position: absolute;
    top: -10px;
    left: 24px;
    background: #e8efe8; // Match parent background
    padding: 0 12px;
    color: #376d31;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;

const MobileHeader = styled(MobileHeaderContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  height: 64px;
  background: #e8efe8;
  border-bottom: 3px solid rgba(189, 139, 19, 0.15);
  box-shadow: 0 2px 8px rgba(189, 139, 19, 0.15);
`;

const MobileNumber = styled(S.StructureNumberBubble)`
  width: 48px;
  height: 48px;
  font-size: 24px;
  margin: 0;
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 2px solid rgba(189, 139, 19, 0.3);
  color: white;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(55, 109, 49, 0.2);

  &:hover {
    transform: none;
    border-color: rgba(189, 139, 19, 0.3);
    background: linear-gradient(135deg, #376d31, #2c5526);
    box-shadow: 0 2px 4px rgba(55, 109, 49, 0.2);
  }
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

  &:active {
    background: rgba(55, 109, 49, 0.2);
    transform: translateY(-50%) scale(0.95);
  }

  svg {
    font-size: 16px;
  }

  &:first-child {
    left: -8px;
  }

  &:last-child {
    right: -8px;
  }
`;

const MobileTitle = styled(S.StructureTitleInfo)`
  font-size: clamp(20px, 5.5vw, 36px);
  text-align: center;
  padding: 0 32px;
  margin: 0;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1),
    rgba(189, 139, 19, 0.85)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  line-height: 1.1;
  max-height: 2.2em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-shadow: 0 1px 2px rgba(189, 139, 19, 0.1);

  &:hover {
    transform: none;
    text-shadow: 0 1px 2px rgba(189, 139, 19, 0.1);
  }

  &:not(:empty) {
    font-size: ${(props) => {
      const length = props.children?.toString().length || 0;
      if (length > 20) return 'clamp(18px, 4.5vw, 32px)';
      if (length > 15) return 'clamp(20px, 5vw, 34px)';
      return 'clamp(20px, 5.5vw, 36px)';
    }};
  }
`;

const CloseButton = styled(S.CloseButton)`
  width: 48px;
  height: 48px;
  margin: 0;
  flex-shrink: 0;
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 2px solid rgba(189, 139, 19, 0.3);

  &:hover {
    transform: none;
    background: linear-gradient(135deg, #376d31, #2c5526);
    border-color: rgba(189, 139, 19, 0.3);
  }
`;

const MobileImageDescription = styled(S.ImageDescription)`
  margin: 0;
  padding: 16px;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.95),
    rgba(255, 245, 222, 0.9)
  );
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border: 1px solid rgba(189, 139, 19, 0.15);
  border-top: none;
  box-shadow:
    0 4px 12px rgba(55, 109, 49, 0.15),
    0 2px 4px rgba(55, 109, 49, 0.1);
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ImageNavigation = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
  padding-left: 12px;
  border-left: 1px solid rgba(55, 109, 49, 0.1);
`;

const ImageNavigationButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(55, 109, 49, 0.05);
  border: 1px solid rgba(55, 109, 49, 0.1);
  color: #376d31;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(55, 109, 49, 0.1);
    transform: scale(1.05);
  }

  svg {
    font-size: 16px;
  }
`;

const CaptionText = styled.div`
  flex: 1;
  font-size: clamp(14px, 3.5vw, 16px);
  line-height: 1.5;
  color: #333;
  display: flex;
  align-items: flex-start;
  gap: 12px;

  svg {
    color: #376d31;
    font-size: 18px;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const MobileQuickFacts = styled(MobileInfoCardsSection)`
  margin: 10px;
  padding: 16px;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.95),
    rgba(255, 245, 222, 0.9)
  );
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: visible;
  height: auto;
  min-height: auto;
  border: 1px solid rgba(189, 139, 19, 0.15);
  box-shadow:
    0 4px 16px rgba(55, 109, 49, 0.15),
    0 2px 4px rgba(55, 109, 49, 0.1);
`;

const MobileInfoCard = styled(S.InfoCard)`
  margin: 0;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(55, 109, 49, 0.12),
    rgba(55, 109, 49, 0.08)
  );
  padding: 16px;
  border: 1px solid rgba(189, 139, 19, 0.1);
  border-left: 2px solid #376d31;
  transform: none;
  box-shadow: none;

  &:hover {
    transform: none;
    box-shadow: none;
    background: linear-gradient(
      135deg,
      rgba(55, 109, 49, 0.12),
      rgba(55, 109, 49, 0.08)
    );
    border: 1px solid rgba(189, 139, 19, 0.1);
    border-left: 2px solid #376d31;
  }

  ${S.InfoCardTitle} {
    &:hover {
      color: #376d31;
    }
  }
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => Math.min(props.itemCount, 3)},
    minmax(80px, 1fr)
  );
  gap: 12px;
  width: 100%;
  padding: 4px;

  // Remove fixed height constraint
  max-height: none;
  overflow: visible;
`;

const ResourceBox = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  background: linear-gradient(135deg, #376d31, #2c5526);
  border-radius: 16px;
  border: 1px solid rgba(189, 139, 19, 0.2);
  text-decoration: none;
  color: white;
  gap: 8px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(55, 109, 49, 0.15);
  transition: all 0.2s ease;

  svg {
    font-size: 24px;
    color: white;
  }

  &:active {
    background: linear-gradient(135deg, #2c5526, #1e3a1a);
    transform: scale(0.98);
    border-color: rgba(189, 139, 19, 0.3);
  }
`;

const ResourceTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: white;
  line-height: 1.2;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const ModalImage = styled(animated.img)`
  max-width: 95%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 4px;
  touch-action: none;
`;

const ModalCaption = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  margin-top: 16px;
  text-align: center;
  max-width: 90%;
  line-height: 1.4;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ToggleDescriptionButton = styled(S.ToggleDescriptionButton)`
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 0.1),
    rgba(189, 139, 19, 0.05)
  );
  border: 1px solid rgba(189, 139, 19, 0.2);
  color: rgba(189, 139, 19, 0.9);
  font-weight: 600;
  padding: 12px 16px;
  border-radius: 12px;
  margin-top: 16px;

  &:active {
    background: rgba(189, 139, 19, 0.15);
    transform: scale(0.98);
  }
`;

const SwipeableImageContainer = styled(MobileImageContainer)`
  touch-action: pan-y pan-x;
  user-select: none;
  -webkit-user-select: none;
`;

const SwipeableContent = styled(MobileMainContent)`
  touch-action: pan-y pan-x;
  user-select: none;
  -webkit-user-select: none;
`;

const StructureInfoMobile = () => {
  // Navigation
  const navigate = useNavigate();
  const { structureUrl } = useParams();

  // States
  const [structure, setStructure] = useState(null);
  const [structureNumber, setStructureNumber] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(null);
  const [structuresList, setStructuresList] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageStyle, setModalImageStyle] = useSpring(() => ({
    scale: 1,
  }));
  const [imagePaths, setImagePaths] = useState({
    currentPaths: [],
    adjacentPaths: { prev: [], next: [] },
  });

  // Use the preloader hook
  const { imagesLoaded, loadedImages } = useImagePreloader(imagePaths);

  // Load structures list
  useEffect(() => {
    try {
      const list = getStructuresList();
      setStructuresList(list);
    } catch (error) {
      console.error('Error loading structures list:', error);
    }
  }, []);

  // Load structure data
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

  // Image helper functions
  const getImagePath = (imagePath) => {
    const imageKey = imagePath.split('/').pop();
    if (imageKey.startsWith('M-')) return mainImages[imageKey];
    if (imageKey.startsWith('C-')) return closeUpImages[imageKey];
    return otherImages[imageKey];
  };

  // Add sorting function
  const sortImages = (images) => {
    return [...images].sort((a, b) => {
      const typeOrder = { main: 0, other: 1, closeup: 2 };
      return typeOrder[a.type] - typeOrder[b.type];
    });
  };

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

  // Navigation handlers
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

  const handlePrevStructure = () => {
    if (!structuresList.length) return;
    const currentIndex = structuresList.findIndex(
      (s) => s.url === structureUrl
    );
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : structuresList.length - 1;
    navigate(`/structures/${structuresList[prevIndex].url}`);
  };

  const handleNextStructure = () => {
    if (!structuresList.length) return;
    const currentIndex = structuresList.findIndex(
      (s) => s.url === structureUrl
    );
    const nextIndex =
      currentIndex < structuresList.length - 1 ? currentIndex + 1 : 0;
    navigate(`/structures/${structuresList[nextIndex].url}`);
  };

  // Helper functions
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
      advisor: '👨‍🏫',
      builders: '👷',
      status: '🔄',
      location: '📍',
    };
    return emojiMap[type] || '📌';
  };

  const getValidLinks = () => {
    if (!structure?.links) return [];
    return structure.links.filter((link) => link.URL !== 'https://google.com');
  };

  // Simplify the gesture handler to only handle pinch/zoom
  const bindGestures = useGesture(
    {
      onPinch: ({ offset: [d] }) => {
        setModalImageStyle.start({
          scale: Math.min(Math.max(0.5, d / 200 + 1), 4), // Limit zoom between 0.5x and 4x
        });
      },
      onDoubleClick: () => {
        // Reset zoom on double tap
        setModalImageStyle.start({ scale: 1 });
      },
    },
    {
      pinch: {
        scaleBounds: { min: 0.5, max: 4 },
        rubberband: true,
      },
    }
  );

  // Add these new gesture bindings
  const bindImageGestures = useGesture(
    {
      onDrag: ({ direction: [xDir], distance, cancel }) => {
        if (distance > 50) {
          // Threshold for swipe
          if (xDir < 0) {
            handleNextImage();
          } else {
            handlePrevImage();
          }
          cancel();
        }
      },
    },
    {
      drag: {
        axis: 'x',
        filterTaps: true,
        threshold: 10,
      },
    }
  );

  const bindStructureGestures = useGesture(
    {
      onDrag: ({ direction: [xDir], distance, cancel }) => {
        if (distance > 100) {
          // Higher threshold for structure change
          if (xDir < 0) {
            handleNextStructure();
          } else {
            handlePrevStructure();
          }
          cancel();
        }
      },
    },
    {
      drag: {
        axis: 'x',
        filterTaps: true,
        threshold: 10,
      },
    }
  );

  // Loading state
  if (!structure || !structureNumber) {
    return (
      <MobileInfoPageWrapper>
        <MobileCenteredWrapper>
          <MobileHeader>
            <MobileTitle>Loading...</MobileTitle>
            <CloseButton onClick={() => navigate('/structures')}>
              <FaTimes />
            </CloseButton>
          </MobileHeader>
        </MobileCenteredWrapper>
      </MobileInfoPageWrapper>
    );
  }

  if (!imagesLoaded) {
    return (
      <MobileInfoPageWrapper>
        <MobileCenteredWrapper>
          <MobileHeader>
            <MobileNumber>{structure.number}</MobileNumber>
            <MobileTitleContainer>
              <NavigationCircle onClick={handlePrevStructure}>
                <FaChevronLeft />
              </NavigationCircle>
              <MobileTitle>{structure.names[0]}</MobileTitle>
              <NavigationCircle onClick={handleNextStructure}>
                <FaChevronRight />
              </NavigationCircle>
            </MobileTitleContainer>
            <CloseButton onClick={() => navigate('/structures')}>
              <FaTimes />
            </CloseButton>
          </MobileHeader>
          <MobileContentContainer>
            <LoadingSpinner />
          </MobileContentContainer>
        </MobileCenteredWrapper>
      </MobileInfoPageWrapper>
    );
  }

  return (
    <MobileInfoPageWrapper>
      {structure && (
        <Helmet>
          {/* Basic metadata */}
          <title>{structure.names[0]}</title>
          <meta
            name="description"
            content="Discover this iconic structure in Poly Canyon and learn about its unique history"
          />

          {/* Keywords combining structure-specific tags with default keywords */}
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

          {/* OpenGraph metadata */}
          <meta property="og:title" content={structure.names[0]} />
          <meta
            property="og:description"
            content="Discover this iconic structure in Poly Canyon and learn about its unique history"
          />

          {/* Twitter metadata */}
          <meta name="twitter:title" content={structure.names[0]} />
          <meta
            name="twitter:description"
            content="Discover this iconic structure in Poly Canyon and learn about its unique history"
          />
        </Helmet>
      )}

      <MobileCenteredWrapper>
        <MobileHeader>
          <MobileNumber>{structure.number}</MobileNumber>

          <MobileTitleContainer>
            <NavigationCircle onClick={handlePrevStructure}>
              <FaChevronLeft />
            </NavigationCircle>
            <MobileTitle>{structure.names[0]}</MobileTitle>
            <NavigationCircle onClick={handleNextStructure}>
              <FaChevronRight />
            </NavigationCircle>
          </MobileTitleContainer>

          <CloseButton onClick={() => navigate('/structures')}>
            <FaTimes />
          </CloseButton>
        </MobileHeader>

        <MobileContentContainer>
          <SwipeableContent {...bindStructureGestures()}>
            <SwipeableImageContainer {...bindImageGestures()}>
              {structure?.images?.[currentImageIndex]?.path &&
                loadedImages[currentImageIndex] && (
                  <>
                    <S.BackgroundImage
                      src={loadedImages[currentImageIndex].background.src}
                      alt=""
                      loading="lazy"
                    />
                    <S.StyledImage
                      src={loadedImages[currentImageIndex].foreground.src}
                      alt={structure.images[currentImageIndex].description}
                      style={{
                        width: imageAspectRatio < 16 / 9 ? 'auto' : '100%',
                        height: imageAspectRatio < 16 / 9 ? '100%' : 'auto',
                      }}
                      onClick={() => setIsImageModalOpen(true)}
                    />
                  </>
                )}
            </SwipeableImageContainer>

            {structure?.images?.[currentImageIndex]?.description && (
              <MobileImageDescription>
                <CaptionText>
                  <FaCamera />
                  {structure.images[currentImageIndex].description}
                </CaptionText>
                {structure?.images?.length > 1 && (
                  <ImageNavigation>
                    <ImageNavigationButton onClick={handlePrevImage}>
                      <FaChevronLeft />
                    </ImageNavigationButton>
                    <ImageNavigationButton onClick={handleNextImage}>
                      <FaChevronRight />
                    </ImageNavigationButton>
                  </ImageNavigation>
                )}
              </MobileImageDescription>
            )}

            <MobileDescriptionContainer>
              <S.SectionTitleInfo>About</S.SectionTitleInfo>
              <S.DescriptionText expanded={descriptionExpanded}>
                <p>{structure.description}</p>
                {descriptionExpanded && (
                  <div className="extended">
                    {structure.extended_description}
                  </div>
                )}
              </S.DescriptionText>
              <ToggleDescriptionButton onClick={toggleDescription}>
                {descriptionExpanded ? 'Show Less' : 'Show More'}
              </ToggleDescriptionButton>
            </MobileDescriptionContainer>

            <MobileQuickFacts>
              <S.SectionTitleInfo>Quick Facts</S.SectionTitleInfo>

              {/* Year Card */}
              {structure.year && (
                <MobileInfoCard>
                  <S.InfoCardHeader>
                    <S.InfoCardEmoji>{getInfoEmoji('year')}</S.InfoCardEmoji>
                    <S.InfoCardTitle>Year</S.InfoCardTitle>
                  </S.InfoCardHeader>
                  <S.InfoCardContent>{structure.year}</S.InfoCardContent>
                </MobileInfoCard>
              )}

              {/* Alternate Names Card */}
              {structure.names.length > 1 && (
                <MobileInfoCard>
                  <S.InfoCardHeader>
                    <S.InfoCardEmoji>📝</S.InfoCardEmoji>
                    <S.InfoCardTitle>Also Known As</S.InfoCardTitle>
                  </S.InfoCardHeader>
                  <S.InfoCardContent>
                    {structure.names.slice(1).join(', ')}
                  </S.InfoCardContent>
                </MobileInfoCard>
              )}

              {/* Builders Card */}
              {structure.advisor_builders?.some(
                (person) => !person.role.includes('Advisor')
              ) && (
                <MobileInfoCard>
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
                </MobileInfoCard>
              )}

              {/* Advisors Card */}
              {structure.advisor_builders?.some((person) =>
                person.role.includes('Advisor')
              ) && (
                <MobileInfoCard>
                  <S.InfoCardHeader>
                    <S.InfoCardEmoji>{getInfoEmoji('advisor')}</S.InfoCardEmoji>
                    <S.InfoCardTitle>Advisors</S.InfoCardTitle>
                  </S.InfoCardHeader>
                  <S.InfoCardContent>
                    {structure.advisor_builders
                      .filter((person) => person.role.includes('Advisor'))
                      .map((person) => person.name)
                      .join(', ')}
                  </S.InfoCardContent>
                </MobileInfoCard>
              )}

              {/* Status Card */}
              {structure.status && (
                <MobileInfoCard>
                  <S.InfoCardHeader>
                    <S.InfoCardEmoji>{getInfoEmoji('status')}</S.InfoCardEmoji>
                    <S.InfoCardTitle>Status</S.InfoCardTitle>
                  </S.InfoCardHeader>
                  <S.InfoCardContent>{structure.status}</S.InfoCardContent>
                </MobileInfoCard>
              )}

              {/* Location Card */}
              {structure.location?.latitude &&
                structure.location?.longitude && (
                  <MobileInfoCard>
                    <S.InfoCardHeader>
                      <S.InfoCardEmoji>
                        {getInfoEmoji('location')}
                      </S.InfoCardEmoji>
                      <S.InfoCardTitle>Location</S.InfoCardTitle>
                    </S.InfoCardHeader>
                    <GoogleMapLandmark
                      latitude={structure.location.latitude}
                      longitude={structure.location.longitude}
                      structureName={structure.names[0]}
                    />
                  </MobileInfoCard>
                )}
            </MobileQuickFacts>

            {getValidLinks().length > 0 && (
              <MobileLinksSection>
                <ResourcesGrid itemCount={getValidLinks().length}>
                  {getValidLinks().map((link, index) => (
                    <ResourceBox
                      key={index}
                      href={link.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getLinkIcon(link.title)}
                      <ResourceTitle>{link.title}</ResourceTitle>
                    </ResourceBox>
                  ))}
                </ResourcesGrid>
              </MobileLinksSection>
            )}
          </SwipeableContent>
        </MobileContentContainer>
      </MobileCenteredWrapper>
      {isImageModalOpen && (
        <ImageModal
          onClick={() => {
            setIsImageModalOpen(false);
            setModalImageStyle.start({ scale: 1 });
          }}
        >
          <ModalCloseButton
            onClick={() => {
              setIsImageModalOpen(false);
              setModalImageStyle.start({ scale: 1 });
            }}
          >
            <FaTimes />
          </ModalCloseButton>
          <ModalImage
            {...bindGestures()}
            style={{
              scale: modalImageStyle.scale,
            }}
            src={loadedImages[currentImageIndex].foreground.src}
            alt={structure.images[currentImageIndex].description}
            onClick={(e) => e.stopPropagation()}
          />
          <ModalCaption>
            {structure.images[currentImageIndex].description}
          </ModalCaption>
        </ImageModal>
      )}
    </MobileInfoPageWrapper>
  );
};

export default StructureInfoMobile;

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
  FaShareSquare,
} from 'react-icons/fa';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

// Components and data
import GoogleMapLandmark from '../extraComponents/GoogleMapLandmark.jsx';
import * as S from '../Structures.styles.js';
import useStructureDetail from '../hooks/useStructureDetail.js';
import useDialog from '../hooks/useDialog.js';
import ResearchInfo from '../extraComponents/ResearchInfo.jsx';
import {
  crossedSwipeThreshold,
  boundedPinchScale,
} from '../data/gestureHelpers.js';
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
  position: relative;

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
`;

const MobileHeader = styled(MobileHeaderContainer)`
  gap: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  min-height: 64px;
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
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: center;
  position: relative;
  margin: 0 6px;
  padding: 0;
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
  position: static;
  flex-shrink: 0;
  padding: 0;
  z-index: 2;

  &:active {
    background: rgba(55, 109, 49, 0.2);
    transform: scale(0.95);
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
  padding: 0;
  min-width: 0;
  overflow-wrap: anywhere;
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
  display: block;
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
  margin-top: 12px;

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
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
`;

const SwipeableContent = styled(MobileMainContent)`
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
`;

const ResourcesLabel = styled.div`
  position: absolute;
  top: -12px;
  left: 24px;
  background: rgba(255, 248, 230, 0.95);
  padding: 4px 12px;
  border-radius: 8px;
  border: 1.5px solid rgba(189, 139, 19, 0.8);
  color: rgba(189, 139, 19, 0.9);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 4px rgba(189, 139, 19, 0.1);

  svg {
    font-size: 12px;
    margin-top: 1px;
  }
`;

const MobileShareButton = styled(S.ShareButton)`
  height: 32px;
  padding: 0 10px;
  border-radius: 16px;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;

  svg {
    font-size: 12px;
  }

  &::after {
    font-size: 13px;
  }

  /* Override hover states from parent */
  &:hover {
    transform: none;
    background: linear-gradient(135deg, #376d31, #2c5526);
    border-color: rgba(189, 139, 19, 0.3);
    box-shadow: 0 2px 8px rgba(55, 109, 49, 0.15);

    svg,
    &::after {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  /* Add touch-friendly active state */
  &:active {
    transform: scale(0.95);
    background: linear-gradient(135deg, #2c5526, #1e3a1a);
    border-color: rgba(189, 139, 19, 0.5);

    svg,
    &::after {
      color: rgba(189, 139, 19, 0.9);
    }
  }
`;

const StructureInfoMobile = () => {
  const {
    backToList,
    structure,
    structureNumber,
    notFound,
    currentImageIndex,
    descriptionExpanded,
    toggleDescription,
    imageAspectRatio,
    setImageAspectRatio,
    loadedImages,
    fullscreen,
    setFullscreen,
    handlePrevImage,
    handleNextImage,
    handlePrevStructure,
    handleNextStructure,
    getValidLinks,
    handleShare,
    shareStatus,
  } = useStructureDetail();
  const [showResearchInfo, setShowResearchInfo] = useState(false);
  const isImageModalOpen =
    fullscreen && Boolean(structure?.images?.[currentImageIndex]);
  const setIsImageModalOpen = setFullscreen;
  const dialogRef = useDialog(isImageModalOpen, () =>
    setIsImageModalOpen(false)
  );
  const [modalImageStyle, setModalImageStyle] = useSpring(() => ({ scale: 1 }));
  useEffect(() => {
    setModalImageStyle.set({ scale: 1 });
  }, [isImageModalOpen, currentImageIndex, setModalImageStyle]);
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

  // Simplify the gesture handler to only handle pinch/zoom
  const bindGestures = useGesture(
    {
      onPinch: ({ offset: [d] }) => {
        setModalImageStyle.start({
          scale: boundedPinchScale(d), // Limit zoom between 0.5x and 4x
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
        rubberband: false,
        from: () => [modalImageStyle.scale.get(), 0],
      },
    }
  );

  // Add these new gesture bindings
  const bindImageGestures = useGesture(
    {
      onDrag: ({ direction: [xDir], distance, cancel, canceled }) => {
        if (canceled) return;
        if (crossedSwipeThreshold(distance, 50)) {
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
      onDrag: ({ direction: [xDir], distance, cancel, event, canceled }) => {
        if (canceled) return;
        // A gallery swipe changes the photograph, never the enclosing structure.
        if (event.target.closest('[data-gallery]')) return;
        if (crossedSwipeThreshold(distance, 100)) {
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

  if (!structure || !structureNumber) {
    return (
      <MobileInfoPageWrapper>
        <MobileCenteredWrapper>
          <MobileHeader>
            <MobileTitle>
              {notFound ? 'Structure not found' : 'Loading…'}
            </MobileTitle>
            <CloseButton aria-label="Back to structures" onClick={backToList}>
              <FaTimes />
            </CloseButton>
          </MobileHeader>
        </MobileCenteredWrapper>
      </MobileInfoPageWrapper>
    );
  }

  return (
    <MobileInfoPageWrapper>
      <MobileCenteredWrapper>
        <MobileHeader>
          <MobileNumber>{structure.number}</MobileNumber>

          <MobileTitleContainer>
            <NavigationCircle
              aria-label="Previous structure"
              onClick={handlePrevStructure}
            >
              <FaChevronLeft />
            </NavigationCircle>
            <MobileTitle>{structure.names[0]}</MobileTitle>
            <NavigationCircle
              aria-label="Next structure"
              onClick={handleNextStructure}
            >
              <FaChevronRight />
            </NavigationCircle>
          </MobileTitleContainer>

          <CloseButton aria-label="Back to structures" onClick={backToList}>
            <FaTimes />
          </CloseButton>
        </MobileHeader>

        <MobileContentContainer>
          <SwipeableContent {...bindStructureGestures()}>
            {!structure.images.length && (
              <p>No photographs are available for this structure.</p>
            )}
            <SwipeableImageContainer
              data-gallery="true"
              {...bindImageGestures()}
            >
              {structure?.images?.[currentImageIndex]?.path &&
                loadedImages[currentImageIndex] && (
                  <>
                    <S.BackgroundImage
                      {...loadedImages[currentImageIndex]?.background}
                      alt=""
                      loading="lazy"
                    />
                    <S.StyledImage
                      decoding="async"
                      onLoad={(e) =>
                        setImageAspectRatio(
                          e.currentTarget.naturalWidth /
                            e.currentTarget.naturalHeight
                        )
                      }
                      {...loadedImages[currentImageIndex]?.foreground}
                      alt={structure.images[currentImageIndex].description}
                      style={{
                        width: imageAspectRatio < 16 / 9 ? 'auto' : '100%',
                        height: imageAspectRatio < 16 / 9 ? '100%' : 'auto',
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label="Open photograph full screen"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setIsImageModalOpen(true);
                        }
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
                    <ImageNavigationButton
                      aria-label="Previous photograph"
                      onClick={handlePrevImage}
                    >
                      <FaChevronLeft />
                    </ImageNavigationButton>
                    <ImageNavigationButton
                      aria-label="Next photograph"
                      onClick={handleNextImage}
                    >
                      <FaChevronRight />
                    </ImageNavigationButton>
                  </ImageNavigation>
                )}
              </MobileImageDescription>
            )}

            <MobileDescriptionContainer>
              <MobileShareButton
                onClick={handleShare}
                aria-label="Share structure"
              >
                <FaShareSquare />
              </MobileShareButton>
              <S.SectionTitleInfo>About</S.SectionTitleInfo>
              <S.DescriptionText expanded={descriptionExpanded}>
                <p>{structure.description}</p>
                {descriptionExpanded && (
                  <div className="extended">
                    {structure.extended_description}
                  </div>
                )}
              </S.DescriptionText>
              {structure.extended_description &&
                structure.extended_description !== '' && (
                  <ToggleDescriptionButton onClick={toggleDescription}>
                    {descriptionExpanded ? 'Show Less' : 'Show More'}
                  </ToggleDescriptionButton>
                )}
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
              {structure.location && (
                <MobileInfoCard>
                  <S.InfoCardHeader>
                    <S.InfoCardEmoji>
                      {getInfoEmoji('location')}
                    </S.InfoCardEmoji>
                    <S.InfoCardTitle>Location</S.InfoCardTitle>
                  </S.InfoCardHeader>
                  {structure.location.latitude === 0 ? (
                    <S.InfoCardContent>Unknown</S.InfoCardContent>
                  ) : (
                    <GoogleMapLandmark
                      latitude={structure.location.latitude}
                      longitude={structure.location.longitude}
                      structureName={structure.names[0]}
                    />
                  )}
                </MobileInfoCard>
              )}
            </MobileQuickFacts>

            {getValidLinks().length > 0 && (
              <MobileLinksSection>
                <ResourcesLabel
                  as="button"
                  type="button"
                  onClick={() => setShowResearchInfo(true)}
                >
                  Resources <FaChevronRight />
                </ResourcesLabel>
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          onClick={() => {
            setIsImageModalOpen(false);
            setModalImageStyle.start({ scale: 1 });
          }}
        >
          <ModalCloseButton
            aria-label="Close photograph"
            autoFocus
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
            {...loadedImages[currentImageIndex]?.foreground}
            alt={structure.images[currentImageIndex].description}
            onClick={(e) => e.stopPropagation()}
          />
          <ModalCaption>
            {structure.images[currentImageIndex].description}
          </ModalCaption>
        </ImageModal>
      )}
      {shareStatus && (
        <S.ShareStatus role="status">{shareStatus}</S.ShareStatus>
      )}
      {showResearchInfo && (
        <ResearchInfo
          onClose={() => setShowResearchInfo(false)}
          isMobile={true}
        />
      )}
    </MobileInfoPageWrapper>
  );
};

export default StructureInfoMobile;

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

// Styles
import * as S from '../Structures.styles.js';

// Components, images, and data
import GoogleMapLandmark from '../extraComponents/GoogleMapLandmark.jsx';
import ResearchInfo from '../extraComponents/ResearchInfo.jsx';

import useStructureDetail from '../hooks/useStructureDetail.js';

const StructureInfo = () => {
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
    handlePrevImage,
    handleNextImage,
    handlePrevStructure,
    handleNextStructure,
    getValidLinks,
    handleShare,
    shareStatus,
    getPrevStructureNumber,
    getNextStructureNumber,
    toggleFullscreen,
  } = useStructureDetail();
  const [showResearchInfo, setShowResearchInfo] = useState(false);
  const isFullscreenMode = fullscreen;
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

  // Get the current image and description
  const currentImage = structure?.images?.[currentImageIndex];
  const imageDescription = currentImage?.description;

  // Measure image container height
  const imageContainerRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(null);

  // Measure image container height
  useEffect(() => {
    if (imageContainerRef.current) {
      setImageHeight(imageContainerRef.current.offsetHeight);
    }
  }, [structure, descriptionExpanded]); // Re-measure when description expands/collapses

  if (!structure || !structureNumber) {
    return (
      <S.InfoPageWrapper>
        <S.CenteredWrapper>
          <S.HeaderContainer>
            <S.StructureTitleInfo>
              {notFound ? 'Structure not found' : 'Loading…'}
            </S.StructureTitleInfo>
            <S.CloseButton aria-label="Back to structures" onClick={backToList}>
              <FaTimes />
            </S.CloseButton>
          </S.HeaderContainer>
        </S.CenteredWrapper>
      </S.InfoPageWrapper>
    );
  }

  // Show loading spinner only for images while keeping header

  // Render the structure info page
  return (
    <>
      <S.InfoPageWrapper>
        <S.CenteredWrapper>
          {/* Header Content: Number, Title, Close*/}
          <S.HeaderContainer>
            <S.StructureNumberBubble>
              {structure.number}
            </S.StructureNumberBubble>

            <S.TitleWrapper>
              <S.NavigationOverlay
                as="button"
                type="button"
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
                as="button"
                type="button"
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

            <S.CloseButton aria-label="Back to structures" onClick={backToList}>
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
                          {...loadedImages[currentImageIndex]?.background}
                          sizes="100vw"
                          alt=""
                          loading="lazy"
                          style={{
                            objectPosition:
                              imageAspectRatio < 16 / 9 ? '50% 50%' : '50% 50%',
                          }}
                        />
                        <S.FullscreenImage
                          decoding="async"
                          onLoad={(e) =>
                            setImageAspectRatio(
                              e.currentTarget.naturalWidth /
                                e.currentTarget.naturalHeight
                            )
                          }
                          {...loadedImages[currentImageIndex]?.foreground}
                          sizes="100vw"
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
                        <S.FullscreenArrowButton
                          aria-label="Previous photograph"
                          onClick={handlePrevImage}
                        >
                          <FaChevronLeft />
                        </S.FullscreenArrowButton>
                        <S.FullscreenArrowButton
                          aria-label="Next photograph"
                          onClick={handleNextImage}
                        >
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
                      {!structure.images.length && (
                        <p>No photographs are available for this structure.</p>
                      )}
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
                                {...loadedImages[currentImageIndex]?.background}
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
                                decoding="async"
                                onLoad={(e) =>
                                  setImageAspectRatio(
                                    e.currentTarget.naturalWidth /
                                      e.currentTarget.naturalHeight
                                  )
                                }
                                {...loadedImages[currentImageIndex]?.foreground}
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
                          <S.ArrowButton
                            aria-label="Previous photograph"
                            onClick={handlePrevImage}
                          >
                            <FaChevronLeft />
                          </S.ArrowButton>
                        )}
                        <p>{imageDescription}</p>
                        {structure?.images?.length > 1 && (
                          <S.ArrowButton
                            aria-label="Next photograph"
                            onClick={handleNextImage}
                          >
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
                        {structure.extended_description &&
                          structure.extended_description !== '' && (
                            <S.ToggleDescriptionButton
                              onClick={toggleDescription}
                            >
                              Show More Info
                            </S.ToggleDescriptionButton>
                          )}
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
                      {structure.location && (
                        <S.InfoCard>
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
                      {structure.location && (
                        <S.InfoCard>
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
                        aria-label="About the research"
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

      {shareStatus && (
        <S.ShareStatus role="status">{shareStatus}</S.ShareStatus>
      )}
      {showResearchInfo && (
        <ResearchInfo onClose={() => setShowResearchInfo(false)} />
      )}
    </>
  );
};

export default StructureInfo;

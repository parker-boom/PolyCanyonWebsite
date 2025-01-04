import React, { useState, useEffect, useRef } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaEyeSlash,
} from 'react-icons/fa';
import eras from './eras.json';
import { eraPhotos } from './Images/eraPhotos.js';
import {
  Container,
  EraDisplay,
  ExitBar,
  ExitLink,
  TimelineContainer,
  TimelineLine,
  TimelineSection,
  TimelineDivider,
  ContentContainer,
  ImageColumn,
  TextColumn,
  ContentOverlay,
  QuestionContainer,
  RevealButton,
  ImageArea,
  CaptionArea,
  ImageContainer,
  BlurredBackground,
  MainImage,
  CaptionText,
  CaptionNavButton,
  ProgressDots,
  ProgressDot,
  CaptionContent,
  TextHeader,
  TextContent,
  TimelineWrapper,
  NavArea,
} from './cStory.styles.js';
import eraPhotoCaptions from './eraPhotoCaptions.json';
import { Helmet } from 'react-helmet-async';

const Story = () => {
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const textContentRef = useRef(null);

  // Get current era's data
  const currentEra = eras[currentEraIndex];
  const currentEraKey = String.fromCharCode(65 + currentEraIndex);
  const currentEraPhotos = eraPhotos[currentEraKey];
  const currentEraCaptions = eraPhotoCaptions[currentEraKey];

  // Find current caption
  const getCurrentCaption = () => {
    for (const captionGroup of currentEraCaptions) {
      const photoNumbers = captionGroup.numbers.split('-').map(Number);
      if (photoNumbers.length === 1) {
        if (currentPhotoIndex + 1 === photoNumbers[0])
          return captionGroup.caption;
      } else {
        const [start, end] = photoNumbers;
        if (currentPhotoIndex + 1 >= start && currentPhotoIndex + 1 <= end) {
          return captionGroup.caption;
        }
      }
    }
    return '';
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev < currentEraPhotos.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Reset photo index when era changes
  useEffect(() => {
    setCurrentPhotoIndex(0);
  }, [currentEraIndex]);

  // Reset scroll position when era changes
  useEffect(() => {
    if (textContentRef.current) {
      textContentRef.current.scrollTop = 0;
    }
  }, [currentEraIndex]);

  // Calculate percentages for timeline sections
  const eraDurations = [15, 12, 16, 20, 13, 2];
  const totalDuration = eraDurations.reduce((acc, curr) => acc + curr, 0);
  const eraWidths = eraDurations.map(
    (duration) => (duration / totalDuration) * 100
  );

  const handleTimelineClick = (index) => {
    setCurrentEraIndex(index);
    setIsRevealed(false);
  };

  const handlePrevEra = () => {
    if (currentEraIndex > 0) {
      setCurrentEraIndex(currentEraIndex - 1);
      setIsRevealed(false);
    }
  };

  const handleNextEra = () => {
    if (currentEraIndex < eras.length - 1) {
      setCurrentEraIndex(currentEraIndex + 1);
      setIsRevealed(false);
    }
  };

  const getProgressDots = () => {
    const dots = currentEraCaptions.map((captionGroup) => {
      const [start, end] = captionGroup.numbers.split('-').map(Number);
      const photoCount = end ? end - start + 1 : 1;
      const currentPhoto = currentPhotoIndex + 1;

      let progress = 0;
      if (currentPhoto >= start) {
        if (currentPhoto <= (end || start)) {
          progress = (currentPhoto - start + 1) / photoCount;
        } else if (currentPhoto > (end || start)) {
          progress = 1;
        }
      }

      return progress;
    });

    return dots;
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <Container>
      <Helmet>
        <title>The Story - History of Poly Canyon Through Time</title>
        <meta
          name="description"
          content="Journey through the eras that shaped Poly Canyon, from its earliest days to the present. Explore the evolution of this unique architectural laboratory through historical photographs and stories."
        />
        <meta
          property="og:title"
          content="The Story - History of Poly Canyon Through Time"
        />
        <meta
          property="og:description"
          content="Journey through the eras that shaped Poly Canyon, from its earliest days to the present. Explore the evolution of this unique architectural laboratory through historical photographs and stories."
        />
        <meta
          property="og:url"
          content="https://polycanyon.com/chronicles/story"
        />
        <meta
          name="twitter:title"
          content="The Story - History of Poly Canyon Through Time"
        />
        <meta
          name="twitter:description"
          content="Journey through the eras that shaped Poly Canyon, from its earliest days to the present. Explore the evolution of this unique architectural laboratory through historical photographs and stories."
        />
      </Helmet>
      <TimelineContainer>
        <TimelineWrapper>
          <NavArea
            onClick={handlePrevEra}
            disabled={currentEraIndex === 0}
            $direction="prev"
          >
            <div className="nav-content">
              <FaChevronLeft />
              <div className="nav-text">
                Previous
                <br />
                Era
              </div>
            </div>
          </NavArea>

          <TimelineLine>
            <TimelineDivider $isConnectedToActive={currentEraIndex === 0} />
            {eraWidths.map((width, index) => (
              <React.Fragment key={index}>
                <TimelineSection
                  $width={`${width}%`}
                  $isActive={currentEraIndex === index}
                  $years={eras[index].time_period}
                  onClick={() => handleTimelineClick(index)}
                />
                <TimelineDivider
                  $isConnectedToActive={
                    currentEraIndex === index || currentEraIndex === index + 1
                  }
                />
              </React.Fragment>
            ))}
          </TimelineLine>

          <NavArea
            onClick={handleNextEra}
            disabled={currentEraIndex === eras.length - 1}
            $direction="next"
          >
            <div className="nav-content">
              <FaChevronRight />
              <div className="nav-text">
                Next
                <br />
                Era
              </div>
            </div>
          </NavArea>
        </TimelineWrapper>
      </TimelineContainer>

      <ContentContainer>
        <TextColumn>
          <TextHeader>THE ERA</TextHeader>
          <TextContent ref={textContentRef}>
            {currentEra.full_description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </TextContent>
        </TextColumn>

        <ImageColumn>
          <EraDisplay>
            <span className="era-name">{currentEra.name}</span>
          </EraDisplay>

          <ImageArea>
            <ImageContainer>
              <BlurredBackground
                src={currentEraPhotos[currentPhotoIndex]}
                alt=""
              />
              <MainImage src={currentEraPhotos[currentPhotoIndex]} alt="" />
              <ProgressDots $isRevealed={isRevealed}>
                {getProgressDots().map((progress, index) => (
                  <ProgressDot key={index} $progress={progress} />
                ))}
              </ProgressDots>
            </ImageContainer>
          </ImageArea>

          <CaptionArea>
            <CaptionNavButton
              $direction="left"
              onClick={handlePrevPhoto}
              disabled={currentPhotoIndex === 0}
            >
              <FaChevronLeft />
            </CaptionNavButton>
            <CaptionContent>
              <CaptionText>{getCurrentCaption()}</CaptionText>
            </CaptionContent>
            <CaptionNavButton
              $direction="right"
              onClick={handleNextPhoto}
              disabled={currentPhotoIndex === currentEraPhotos.length - 1}
            >
              <FaChevronRight />
            </CaptionNavButton>
          </CaptionArea>

          {!isRevealed && (
            <ContentOverlay onClick={handleReveal}>
              <QuestionContainer>
                <RevealButton>
                  <FaEyeSlash size={70} color="white" />
                  <span>{currentEra.opening_question}</span>
                </RevealButton>
              </QuestionContainer>
            </ContentOverlay>
          )}
        </ImageColumn>
      </ContentContainer>

      <ExitBar>
        <ExitLink to="/chronicles/2">
          <FaArrowLeft /> Back to Chronicles
        </ExitLink>
      </ExitBar>
    </Container>
  );
};

export default Story;

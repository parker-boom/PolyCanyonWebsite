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
  NavigationBar,
  NavButton,
  EraDisplay,
  ExitBar,
  ExitLink,
  NavigationControls,
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
} from './cStory.styles.js';
import eraPhotoCaptions from './eraPhotoCaptions.json';

const Origins = () => {
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
      <NavigationBar>
        <NavigationControls>
          <NavButton
            onClick={handlePrevEra}
            disabled={currentEraIndex === 0}
            $direction="prev"
          >
            <FaChevronLeft /> Previous Era
          </NavButton>

          <EraDisplay>
            <span className="era-name">{currentEra.name}</span>
            <span className="time-period">{currentEra.time_period}</span>
          </EraDisplay>

          <NavButton
            onClick={handleNextEra}
            disabled={currentEraIndex === eras.length - 1}
            $direction="next"
          >
            Next Era <FaChevronRight />
          </NavButton>
        </NavigationControls>
      </NavigationBar>

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
        </ImageColumn>

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
      </ContentContainer>

      <TimelineContainer>
        <TimelineLine>
          <TimelineDivider $isConnectedToActive={currentEraIndex === 0} />
          {eraWidths.map((width, index) => (
            <React.Fragment key={index}>
              <TimelineSection
                $width={`${width}%`}
                $isActive={currentEraIndex === index}
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
      </TimelineContainer>

      <ExitBar>
        <ExitLink to="/chronicles/2">
          <FaArrowLeft /> Back to Chronicles
        </ExitLink>
      </ExitBar>
    </Container>
  );
};

export default Origins;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FaGraduationCap,
  FaKey,
  FaHammer,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import { RiTeamFill, RiOrganizationChart } from 'react-icons/ri';
import {
  caretakerImages,
  builderImages,
  facultyImages,
} from './PeopleImages/peopleImages.js';
import peopleData from './people.json';
import {
  ComicContainer,
  ImageSection,
  TextSection,
  BlurbText,
  Navigation,
  NavButton,
  PhaseDots,
  PhaseDot,
  BackButton,
  ContentWrapper,
} from './cPeople.styles.js';

export const ComicStrip = ({ type, onClose }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentBlurb, setCurrentBlurb] = useState(0);

  const data = peopleData[type];
  if (!data) return null;

  const phase = data.phases[currentPhase];
  const getImages = () => {
    switch (type) {
      case 'caretakers':
        return caretakerImages;
      case 'builders':
        return builderImages;
      case 'faculty':
        return facultyImages;
      default:
        return {};
    }
  };
  const images = getImages();

  const nextBlurb = () => {
    if (currentBlurb < phase.blurbs.length - 1) {
      setCurrentBlurb(currentBlurb + 1);
    } else if (currentPhase < data.phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
      setCurrentBlurb(0);
    }
  };

  const previousBlurb = () => {
    if (currentBlurb > 0) {
      setCurrentBlurb(currentBlurb - 1);
    } else if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
      setCurrentBlurb(data.phases[currentPhase - 1].blurbs.length - 1);
    }
  };

  return (
    <ComicContainer>
      <ContentWrapper>
        <Navigation>
          <NavButton
            onClick={previousBlurb}
            disabled={currentPhase === 0 && currentBlurb === 0}
          >
            <FaArrowLeft />
          </NavButton>
          <NavButton
            onClick={nextBlurb}
            disabled={
              currentPhase === data.phases.length - 1 &&
              currentBlurb === phase.blurbs.length - 1
            }
          >
            <FaArrowRight />
          </NavButton>
        </Navigation>

        <ImageSection>
          <img
            src={images[phase.image]}
            alt={`${type} Phase ${currentPhase + 1}`}
          />
        </ImageSection>

        <TextSection>
          <PhaseDots>
            {[0, 1, 2].map((index) => (
              <PhaseDot key={index} $active={index === currentPhase} />
            ))}
          </PhaseDots>
          <BlurbText>{phase.blurbs[currentBlurb]}</BlurbText>
        </TextSection>
      </ContentWrapper>

      <BackButton onClick={onClose}>
        <FaArrowLeft /> Back to People
      </BackButton>
    </ComicContainer>
  );
};

ComicStrip.propTypes = {
  type: PropTypes.oneOf([
    'faculty',
    'caretakers',
    'builders',
    'donors',
    'organizations',
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export const comicIcons = {
  faculty: FaGraduationCap,
  caretakers: FaKey,
  builders: FaHammer,
  donors: RiTeamFill,
  organizations: RiOrganizationChart,
};

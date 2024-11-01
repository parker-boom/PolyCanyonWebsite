/**
 * Styles for InfoPage Components
 * Purpose: Centralized styling for the InfoPage, including sections for history, geology, app information, and Google Maps directions.
 * Key Elements: Rounded containers, typography, animations, and responsive layouts for different sections and components.
 * Dependencies: styled-components for modular and reusable styling.
 */

/* 
Imports
 */
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/* 
Global Styles
 */
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
  padding: 5px 15px;
  background-color: #ffffff;
  box-sizing: border-box;

  @media (min-width: 1324px) {
    padding: 5px 50px;
  }
`;

export const GlobalStyle = createGlobalStyle`
  @keyframes glow {
    from {
      box-shadow: 0 0 15px rgba(55, 109, 49, 0.5);
    }
    to {
      box-shadow: 0 0 25px rgba(55, 109, 49, 0.8);
    }
  }
`;

// The base rounded container style that most sections inherit from
export const RoundedContainer = styled.div`
  background-color: #e8efe8;
  border-radius: 20px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
  padding: 20px;
  margin: 20px 0;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

// Each main section inherits these rounded rectangle properties
export const Section = styled(RoundedContainer)`
  margin-bottom: 15px;
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 850;
  color: #376d31;
  margin: 0 0 14px 0;
  text-align: center;
`;

export const Text = styled.p`
  font-size: 19.2px;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 15px;
`;

/* 
Title
 */
export const TitleSection = styled.div`
  width: 100%;
  background-color: #e8efe8;
  border-radius: 20px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
  margin-bottom: 15px;
  margin-top: 5px;
  padding: 25px 20px;
  box-sizing: border-box;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(189, 139, 19, 0.5),
      transparent
    );
  }

  &::before {
    top: 12px;
  }

  &::after {
    bottom: 12px;
    width: 180px;
  }
`;

export const Header = styled.header`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const Subtitle = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-style: italic;
  color: #376d31;
  margin: 0;
`;

export const Title = styled.h1`
  font-size: 68px;
  font-weight: 800;
  color: rgb(189, 139, 19);
  margin: 0 0 16px;
  line-height: 1;
`;

export const TitleTagline = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #376d31;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  padding: 0 24px;

  &::before,
  &::after {
    content: '•';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(189, 139, 19, 0.6);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

/* 
MoreInfo Section
 */
export const MoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MoreInfoToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(189, 139, 19, 0.15);
  border: 2px solid #376d31;
  border-radius: 25px;
  color: #376d31;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin: 20px auto;
  padding: 12px 24px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background-color: rgba(189, 139, 19, 0.25);
  }

  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateY(3px);
  }
`;

export const MoreInfoContent = styled.div`
  animation: ${fadeIn} 0.3s ease-in-out;
  margin-top: 20px;
`;

export const ImprovedPicker = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 30px 0;
  border-bottom: 2px solid #e0e0e0;
`;

export const PickerButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${(props) => (props.active ? '#376d31' : '#333333')};
  border: none;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #376d31;
    transform: scaleX(${(props) => (props.active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #376d31;
  }

  svg {
    font-size: 24px;
    margin-right: 8px;
  }
`;

export const PickerContent = styled.div`
  margin-top: 20px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const PickerTitle = styled.h3`
  font-size: 32px;
  font-weight: 800;
  color: #376d31;
  margin-bottom: 15px;
  text-align: center;
`;

/*
More Info: History Section
*/
export const StatBox = styled.div`
  background-color: rgba(189, 139, 19, 0.15);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(189, 139, 19, 0.2);
  margin: 10px;
  text-align: center;
  width: 200px;
  flex: 1;
  min-width: 150px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(189, 139, 19, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(189, 139, 19, 0.25);
  }

  h4 {
    margin: 0 0 10px;
    color: #376d31;
    font-size: 22px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    margin: 0;
    font-size: 20px;
    color: #333;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px);
    min-width: 120px;

    h4 {
      font-size: 18px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 0;
  padding-bottom: 56.25%; // 16:9 aspect ratio
  margin-top: 10px;
  overflow: hidden;
  border-radius: 20px;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(10px);
  opacity: 0.5;
`;

export const CarouselImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CarouselImage = styled.img`
  max-height: 100%;
  width: auto;
  object-fit: contain;
`;

export const ArrowButtonImage = styled.button`
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  font-size: clamp(24px, 4vw, 48px); // Responsive font size
  font-weight: bold;
  color: #376d31;
  padding: clamp(5px, 1vw, 10px); // Responsive padding
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 3;
  transition:
    background-color 0.3s,
    transform 0.3s;
  width: clamp(40px, 6vw, 80px); // Responsive width
  height: clamp(40px, 6vw, 80px); // Responsive height
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(1);
  }

  &:first-of-type {
    left: 20px;
  }

  &:last-of-type {
    right: 20px;
  }
`;

export const CarouselCaption = styled.div`
  background-color: rgba(189, 139, 19, 0.15);
  border-radius: 20px;
  padding: 20px;
  margin: 20px auto 0;
  max-width: 80%;
  text-align: center;
  box-shadow: 0 2px 4px rgba(189, 139, 19, 0.2);
  color: #555;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(189, 139, 19, 0.1);
`;

export const CaptionTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #376d31;
  margin: 0 0 10px 0;
`;

export const CaptionText = styled.p`
  font-size: 18px;
  margin: 0;
`;

/*
More Info: Geology Section
*/
export const ResponsiveRow = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0 auto 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const InfographicContainer = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: auto;
  gap: 20px;
  background-color: rgba(189, 139, 19, 0.15);
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(189, 139, 19, 0.2);
  width: 100%;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(189, 139, 19, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    padding: 15px;
  }
`;

export const InfographicSquare = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
`;

export const InfographicIcon = styled.div`
  font-size: 72px;
  color: #376d31;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

export const InfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const GreenTitle = styled.h3`
  font-size: 24px;
  color: #376d31;
  margin: 0 0 10px;

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;

export const InfoText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
    text-align: center;
  }
`;

/*
App Section 
*/
export const ModeSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

export const ModeButton = styled.button`
  background-color: ${(props) =>
    props.active ? '#376d31' : 'rgba(189, 139, 19, 0.15)'};
  color: ${(props) => (props.active ? '#ffffff' : '#333')};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 20px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  font-size: 18px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(189, 139, 19, 0.1);

  &:hover {
    background-color: ${(props) =>
      props.active ? '#2c5a28' : 'rgba(189, 139, 19, 0.25)'};
  }

  svg {
    margin-right: 8px;
    font-size: 20px;
    color: ${(props) => (props.active ? '#ffce33' : '#777')};
  }
`;

export const ModeContent = styled.div`
  animation: ${fadeIn} 0.3s ease-in-out;
  text-align: center;
  width: 100%;
  margin: 20px auto 0;
`;

export const ModeInfoBox = styled.div`
  background-color: rgba(189, 139, 19, 0.15);
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(189, 139, 19, 0.2);
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(189, 139, 19, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    width: 100%;
  }
`;

export const ModeTitle = styled.h3`
  font-size: 26.4px;
  color: #376d31;
  margin: 0 0 15px;
`;

export const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const FeatureItem = styled.li`
  font-size: 19.2px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  &::before {
    content: '•';
    color: #376d31;
    font-size: 20px;
    margin-right: 10px;
  }
`;

export const RecommendedFor = styled.div`
  font-size: 19.2px;
  background-color: rgba(189, 139, 19, 0.15);
  border-radius: 10px;
  padding: 10px 15px;
  margin-top: 15px;
  display: inline-block;
`;

export const RecommendedText = styled.span`
  font-weight: bold;
  color: #376d31;
  margin-right: 5px;
`;

export const CTAButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const CTAButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #376d31;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(55, 109, 49, 0.2);
  overflow: hidden;
  position: relative;

  &:hover {
    background-color: #2c5a28;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(55, 109, 49, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      45deg,
      #376d31,
      rgba(189, 139, 19, 0.8),
      #376d31
    );
    z-index: -1;
    filter: blur(8px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }
`;

export const CTAButtonText = styled.span`
  z-index: 1;
  margin-right: 10px;
`;

export const CTAButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;

  ${CTAButton}:hover & {
    transform: translateX(4px);
  }
`;

/*
Directions Section
*/
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const BaseButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  svg {
    margin-right: 10px;
    font-size: 24px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 20px;
    width: 100%;
    max-width: 250px;
    justify-content: center; // Center content on mobile
  }
`;

export const AllTrailsButton = styled(BaseButton)`
  background-color: #428a13;

  &:hover {
    background-color: #367010;
  }
`;

export const GoogleMapsButton = styled(BaseButton)`
  background-color: #4285f4;

  &:hover {
    background-color: #3367d6;
  }
`;

export const VisitTipsTitle = styled.h3`
  font-size: 30.5px;
  font-weight: 800;
  color: #376d31;
  margin-top: 40px;
  margin-bottom: 10px;
  text-align: center;
`;

export const VisitTips = styled.ul`
  list-style-type: none;
  padding: 0;
`;

/*
STANDALONE COMPONENTS
*/

/*
Photo Grid
*/
export const PhotoGridWrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  aspect-ratio: 16 / 9;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(9, 1fr);
  gap: 10px;
  padding: 20px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #e8efe8;
`;

export const GridItemContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
`;

export const GridImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    opacity 1s ease-in-out,
    transform 1s ease-in-out;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? 'scale(1)' : 'scale(1.05)')};
  z-index: ${(props) => (props.isVisible ? 2 : 1)};
`;

/*
Google Maps
*/
// Uses StatBox above

export const MapContainer = styled.div`
  background-color: rgba(189, 139, 19, 0.15);
  border-radius: 20px;
  padding: 5px;
  margin-top: 0px;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(189, 139, 19, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(189, 139, 19, 0.1);
`;

export const DirectionsContainer = styled.div`
  border-radius: 10px;
  padding: 15px 20px;
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px 10px;
  }
`;

export const ArrowButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#cccccc' : '#376d31')};
  border: none;
  color: #ffffff;
  font-size: 20px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  padding: 10px;
  border-radius: 50%;
  transition:
    background-color 0.3s,
    transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  width: 40px;
  height: 40px;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#cccccc' : '#2c5a28')};
    transform: ${(props) => (props.disabled ? 'none' : 'scale(1.1)')};
  }

  &:focus {
    outline: none;
  }
`;

export const ArrowButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (min-width: 769px) {
    flex: 0 0 auto;
    width: 40px;
    &:first-child {
      margin-right: 20px;
    }
    &:last-child {
      margin-left: 20px;
    }
  }

  @media (max-width: 768px) {
    margin-top: 15px;
    justify-content: center;
    width: 100%;
  }
`;

export const StepContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 0;
    width: 100%;
  }
`;

export const StepNumber = styled.div`
  font-size: 36px;
  font-weight: 1000;
  color: #376d31;

  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

export const StepText = styled.div`
  font-size: 22px;
  color: #555;
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 18px;
    text-align: center;
  }
`;

/*
MOBILE SPECIFIC STYLING
*/

// Styles for mobile history section
// New styles for vertical carousel with background image behind horizontal images
export const MobileCarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 0;
  padding-bottom: 137.77%; // 9:16 aspect ratio for vertical images
  margin-top: 10px;
  overflow: hidden;
  border-radius: 20px;
`;

export const MobileBackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(10px);
  opacity: 0.5;
`;

export const MobileCarouselImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MobileCarouselImage = styled.img`
  width: auto;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
`;

// New mobile styles for arrow buttons positioned at the bottom
export const MobileArrowButtonImage = styled.button`
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  font-size: clamp(24px, 4vw, 48px); // Responsive font size
  font-weight: bold;
  color: #376d31;
  padding: clamp(5px, 1vw, 10px); // Responsive padding
  border-radius: 50%;
  position: absolute;
  bottom: 10px; // Positioning at the bottom
  cursor: pointer;
  z-index: 3;
  transition:
    background-color 0.3s,
    transform 0.3s;
  width: clamp(40px, 6vw, 80px); // Responsive width
  height: clamp(40px, 6vw, 80px); // Responsive height
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }

  &:first-of-type {
    left: 10px; // Left arrow positioning
  }

  &:last-of-type {
    right: 10px; // Right arrow positioning
  }
`;

// Styles for mobile geology section
export const MobileGeologyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  padding: 0 8px;
`;

export const MobileGeologyCard = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(189, 139, 19, 0.15);
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(189, 139, 19, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(189, 139, 19, 0.1);
`;

export const GeologyIcon = styled.div`
  font-size: 32px;
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const GeologyContent = styled.div`
  flex: 1;
`;

export const GeologyTitle = styled.h4`
  color: #376d31;
  font-size: 18px;
  margin: 0 0 4px 0;
  font-weight: 700;
`;

export const GeologyText = styled.p`
  font-size: 14px;
  margin: 0;
  color: #333;
  line-height: 1.4;
`;

// Styles for mobile app section
export const MobileFeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
  text-align: center;
`;

export const MobileFeatureText = styled.p`
  font-size: 20px;
  margin: 0;
  color: #333;
  line-height: 1.4;
`;

export const RecommendedDescription = styled.div`
  font-size: 18px;
  color: #333;
  margin-top: 8px;
`;

// Style for mobile photo grid
export const PhotoGridMobileWrapper = styled.div`
  width: 100%;
  aspect-ratio: 9 / 16; /* Adjust this to be between 1 / 1 and 9 / 16 */
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* We'll use 3 columns */
  grid-template-rows: repeat(6, 1fr); /* And 6 rows to match the aspect ratio */
  gap: 5px;
  padding: 10px 0;
  box-sizing: border-box;
`;

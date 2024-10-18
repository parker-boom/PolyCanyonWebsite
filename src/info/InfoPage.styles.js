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
  box-sizing: border-box; // Add this line
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

export const RoundedContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px 0;
  width: 100%; // Change from 95% to 100%
  max-width: 100%; // Change from 1200px to 100%
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box; // Add this line
`;

export const Section = styled(RoundedContainer)`
  margin-bottom: 24px;
  // Remove the padding override, as it's now consistent with RoundedContainer
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
`;


/* 
Title
 */
export const TitleSection = styled(RoundedContainer)`
  margin-bottom: 24px; 
  padding: 0px 20px;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 36px;
`;

export const Title = styled.h1`
  font-size: 48px; 
  font-weight: 1000;
  color: #376d31;
  margin-top: 10px;
  margin-bottom: 0px;
`;

export const Subtitle = styled.h2`
  font-size: 30px;
  font-weight: 500;
  color: #555;
  margin-top: 5px;
  margin-bottom: 0;
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
  background-color: #f0f0f0;
  border: 2px solid #376d31;
  border-radius: 25px;
  color: #376d31;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin: 20px auto;
  padding: 12px 24px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #376d31;
    color: #ffffff;
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
  color: ${props => props.active ? '#376d31' : '#333333'};
  border: none;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #376d31;
    transform: scaleX(${props => props.active ? 1 : 0});
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
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  text-align: center;
  width: 200px;
  flex: 1;
  min-width: 150px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
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
  background-image: url(${props => props.src});
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
  transition: background-color 0.3s, transform 0.3s;
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
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 20px;
  margin: 20px auto 0;
  max-width: 80%;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #555;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;

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
  background-color: ${props => props.active ? '#376d31' : '#f0f0f0'};
  color: ${props => props.active ? '#ffffff' : '#333'};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 18px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${props => props.active ? '#2c5a28' : '#e0e0e0'};
  }

  svg {
    margin-right: 8px;
    font-size: 20px;
    color: ${props => props.active ? '#ffce33' : '#777'};
  }
`;

export const ModeContent = styled.div`
  animation: ${fadeIn} 0.3s ease-in-out;
  text-align: center;
  width: 100%;
  margin: 20px auto 0;
`;

export const ModeInfoBox = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box; // Add this line

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
  background-color: #f0f0f0;
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
    background: linear-gradient(45deg, #ffce33, #ff7e33, #ff338a, #3393ff);
    z-index: -1;
    filter: blur(10px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
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
    transform: translateX(3px);
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
  background-color: #4285F4;

  &:hover {
    background-color: #3367D6;
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
  background-color: #f5f5f5;
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
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? 'scale(1)' : 'scale(1.05)')};
  z-index: ${(props) => (props.isVisible ? 2 : 1)};
`;


/*
Google Maps
*/
// Uses StatBox above

export const MapContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 5px;
  margin-top: 10px;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  box-sizing: border-box; // Add this line

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const DirectionsContainer = styled.div`
  background-color: #e8efe8;
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
    padding: 15px;
  }
`;

export const ArrowButton = styled.button`
  background-color: ${props => props.disabled ? '#cccccc' : '#376d31'};
  border: none;
  color: #ffffff;
  font-size: 20px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  padding: 10px;
  margin: 0 10px;
  border-radius: 50%;
  transition: background-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#2c5a28'};
    transform: ${props => props.disabled ? 'none' : 'scale(1.1)'};
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    margin: 0 15px;
  }
`;

export const ArrowButtonContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 15px;
  }
`;

export const StepContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0;
    width: 100%;
  }
`;

export const StepText = styled.div`
  font-size: 22px;
  color: #555;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 18px;
    text-align: center;
    margin-bottom: 15px;
    width: 100%;
  }
`;

export const StepNumber = styled.div`
  font-size: 36px;
  font-weight: 1000;
  color: #376d31;
  margin-right: 20px;

  @media (max-width: 768px) {
    font-size: 48px;
    margin: 0 20px;
  }
`;
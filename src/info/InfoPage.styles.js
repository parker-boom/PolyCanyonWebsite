import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
  padding: 5px 15px;
  background-color: #ffffff;
`;


export const RoundedContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px 5px;
  margin: 20px 0;
  width: 95%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Section = styled(RoundedContainer)`
  margin-bottom: 24px; 
  padding: 20px 10px;
`;

export const TitleSection = styled(RoundedContainer)`
  margin-bottom: 24px; 
  padding: 0px 10px;
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

export const SectionTitle = styled.h2`
  font-size: 36px; 
  font-weight: 850;
  color: #376d31;
  margin: 0 0 14px 0; 
  text-align: center;
`;

export const CarouselContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const CarouselSlide = styled.div`
  text-align: center;
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CarouselTitle = styled.h3`
  font-size: 24px; // Increased by 1.2
  margin-top: 12px; // Increased by 1.2
  margin-bottom: 0px;
`;

export const CarouselDescription = styled.p`
  font-size: 19.2px; // Increased by 1.2
  color: #555;
  margin-top: 6px; // Increased by 1.2
  margin-bottom: 0;
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }

  &:first-child {
    left: 10px;
  }

  &:last-child {
    right: 10px;
  }
`;

export const PickerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const PickerTab = styled.button`
  background-color: ${props => props.active ? '#376d31' : '#555555'};
  color: ${props => props.active ? '#ffce33' : '#ffffff'};
  border: none;
  padding: 12px;
  margin: 0 5px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;

  &:hover {
    background-color: ${props => props.active ? '#2c5a28' : '#444444'};
  }

  svg {
    font-size: 24px;
  }
`;

export const SubSection = styled.div`
  margin-top: 20px;
`;

export const ImageSlideshow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 10px;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InfographicPlaceholder = styled.div`
  width: 30%;
  height: 150px;
  background-color: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-size: 18px;
`;

export const PictureSlideshow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 10px;
  margin-top: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CalloutBox = styled.div`
  background-color: #f9f9f9;
  border-left: 5px solid #376d31;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 36px;
`;

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
  max-width: 600px;
  margin: 0 auto;
  margin-top: 10px;
`;

export const ModeTitle = styled.h3`
  font-size: 26.4px;
  color: #376d31;
  margin: 24px 0 12px;
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

export const DownloadSection = styled.div`
  text-align: center;
  margin-top: 30px;
`;

export const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: #376d31;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  margin: 0 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2c5a28;
  }

  svg {
    margin-right: 10px;
  }
`;

export const VisitTips = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const VisitTipsTitle = styled.h3`
  font-size: 26.4px; // Increased by 1.2
  color: #376d31;
  margin: 24px 0 12px; // Increased by 1.2
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px; 
`;

export const Text = styled.p`
  font-size: 19.2px;
`;

export const DownloadCTA = styled(Link)`
  display: inline-block;
  background-color: #376d31;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #2c5a28;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const MapButton = styled.a`
  display: inline-flex;
  align-items: center;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  transition: background-color 0.3s;

  svg {
    margin-right: 5px;
  }
`;

export const AllTrailsButton = styled(MapButton)`
  background-color: #00008B; // Dark blue color
  &:hover {
    background-color: #000080;
  }
`;

export const GoogleMapsButton = styled(MapButton)`
  background-color: #4285F4;

  &:hover {
    background-color: #3367D6;
  }

  svg {
    margin-right: 5px;
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

// src/info/InfoPage.styles.js

// ... existing styled-components

// Keyframes for fade animations
export const pgFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components for PhotoGrid
export const PhotoGridWrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  aspect-ratio: 16 / 9;
  display: grid;
  grid-template-areas:
    "top-left top-right"
    "bottom-left bottom-right";
  grid-gap: 10px;
  padding: 20px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    grid-template-areas:
      "top-left"
      "top-right"
      "bottom-left"
      "bottom-right";
    aspect-ratio: auto;
  }
`;

export const PhotoGridCell = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  grid-area: ${props => props.area};
  overflow: hidden;
  border-radius: 15px;
`;

export const PhotoGridImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${pgFadeIn} 1s ease-in-out; 
`;

export const MoreInfoToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #376d31;
  font-size: 18px;
  cursor: pointer;
  margin: 20px 0;
  transition: color 0.3s ease;

  &:hover {
    color: #2c5a28;
  }

  svg {
    margin-left: 8px;
  }
`;

export const MoreInfoContent = styled.div`
  animation: ${fadeIn} 0.3s ease-in-out;
  margin-top: 20px;
`;

export const ImprovedPicker = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
  gap: 20px;
`;

export const PickerButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.active ? '#376d31' : '#f5f5f5'};
  color: ${props => props.active ? '#ffffff' : '#333333'};
  border: none;
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 80px;
  height: 80px;

  &:hover {
    background-color: ${props => props.active ? '#2c5a28' : '#e0e0e0'};
  }

  svg {
    font-size: 28px;
    margin-bottom: 8px;
  }

  span {
    font-size: 12px;
    font-weight: ${props => props.active ? 'bold' : 'normal'};
  }
`;
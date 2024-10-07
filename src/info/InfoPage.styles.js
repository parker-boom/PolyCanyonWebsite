import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f8f8f8;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: 32px;
  color: #376d31;
  margin-bottom: 0px;
`;

export const Subtitle = styled.h2`
  font-size: 20px;
  color: #555;
  font-weight: normal;
  margin-top: 0;
`;

export const Section = styled.section`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 26px;
  color: #376d31;
  margin: 0 0 20px 0;
  text-align: center;
  font-weight: bold;
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
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 0px;
`;

export const CarouselDescription = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 5px; // Add a small top margin
  margin-bottom: 0; // Remove bottom margin
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

export const ModeSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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

  &:hover {
    background-color: ${props => props.active ? '#2c5a28' : '#e0e0e0'};
  }
`;

export const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const FeatureItem = styled.li`
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px; // Add gap between buttons
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

export const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #376d31;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #2c5a28;
  }
`;

export const Footer = styled.footer`
  text-align: center;
  margin-top: 30px;
`;

export const FooterText = styled.p`
  color: #777;
  font-size: 14px;
  margin: 5px 0;
`;

export const VisitTipsTitle = styled.h3`
  font-size: 22px;
  color: #376d31;
  margin: 20px 0 10px; // Adjusted margin for spacing
  text-align: center;
  margin-top: 40px; // Increased top margin for more spacing
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
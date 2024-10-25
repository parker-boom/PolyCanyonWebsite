import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Update just the HomeContainer style, removing the background pattern
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1224px;
  margin: 0 auto;
  padding: 40px 20px;
  height: 100%; // Changed from min-height: 100vh
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
  }
`;

// Add a welcome section
export const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
    padding: 0 16px;
  }
`;

export const Subtitle = styled.h2`
  font-size: 20px;
  color: #666;
  font-weight: 400;
  margin: 0;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 8px;
    padding: 0 20px;
  }
`;

// Enhance the main heading
export const MainHeading = styled.h1`
  text-align: center;
  margin-bottom: 16px;
  padding: 0;

  .title {
    display: block;
    font-size: 36px;
    color: #376d31;
    font-weight: 800;
    margin-bottom: 4px;
  }

  .subtitle {
    display: block;
    font-size: 28px;
    color: #666;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .animated-divider {
    width: 60px;
    height: 3px;
    background: #376d31;
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.8),
        transparent
      );
      animation: shine 2s linear infinite;
    }
  }

  @keyframes shine {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

// Update ActionContainer for mobile
export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  margin-top: 20px;
  perspective: 1000px;

  @media (max-width: 768px) {
    margin: 0;
    padding: 0 20px;
    max-width: 100%;
  }
`;

// Enhance the action card with more sophisticated hover effects
export const ActionCard = styled(Link)`
  flex: 1;
  max-width: 350px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  transform-style: preserve-3d;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    margin: 0;
    transform: none !important;
    transition: transform 0.3s ease;

    &:active {
      transform: scale(0.98) !important;
    }
  }

  @media (min-width: 769px) {
    &:hover {
      transform: translateY(-5px) rotateX(2deg);
      box-shadow: 0 12px 30px rgba(55, 109, 49, 0.2);

      &::before {
        opacity: 1;
      }
    }

    &:nth-child(2) {
      transform: scale(1.05);

      &:hover {
        transform: scale(1.05) translateY(-5px) rotateX(2deg);
      }
    }
  }
`;

// Add a gradient overlay to the card image
export const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  background-image: linear-gradient(
      to bottom,
      rgba(55, 109, 49, 0.1),
      rgba(255, 255, 255, 0)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (min-width: 769px) {
    ${ActionCard}:hover & {
      transform: scale(1.05);
    }
  }
`;

// Enhance the card content
export const CardContent = styled.div`
  padding: 24px;
  background: white;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
  }

  .arrow-icon {
    position: absolute;
    bottom: 12px;
    right: 12px;
    color: #376d31;
    opacity: 0.6;
    font-size: 14px;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;

    @media (max-width: 768px) {
      bottom: 20px;
      right: 20px;
    }
  }

  @media (min-width: 769px) {
    ${ActionCard}:hover & .arrow-icon {
      transform: translateX(5px);
      opacity: 1;
    }
  }
`;

// Card title
export const CardTitle = styled.h2`
  font-size: 24px;
  color: #376d31;
  margin: 0 0 10px 0;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0 0 8px 0;
  }
`;

// Card subtitle
export const CardSubtitle = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 14px;
    padding-right: 24px;
  }
`;

// Popular tag for the center card
export const PopularTag = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #376d31;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  z-index: 1;

  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
    padding: 6px 12px;
    font-size: 12px;
  }
`;

// Add stats section
export const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 60px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 40px;
    border-radius: 12px;
    width: calc(100% - 32px);
  }
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #376d31;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const StatLabel = styled.div`
  font-size: 16px;
  color: #666;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-top: 4px;
  }
`;

// Update QuickLinks and related styles
export const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  padding: 0 20px;
  width: 100%;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const QuickLinkButton = styled(Link)`
  display: flex;
  align-items: center;
  background: white;
  color: #376d31;
  text-decoration: none;
  padding: 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => props.color || 'rgba(55, 109, 49, 0.05)'};
    opacity: 1;
    transition: opacity 0.2s ease;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  .arrow-icon {
    margin-left: auto;
    font-size: 14px;
    opacity: 0.6;
    position: relative;
  }
`;

export const QuickLinkIcon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  margin-right: 12px;
  position: relative;
  flex-shrink: 0;
`;

export const QuickLinkContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const QuickLinkTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #376d31;
`;

// Add these styles with the other exports

export const QuickNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const QuickNavDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => (props.active ? '#376d31' : '#ddd')};
  transition: all 0.2s ease;
  padding: 0;
  cursor: pointer;

  &:active {
    transform: scale(0.9);
  }
`;

// Remove carousel-related styles and update/add these styles

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0 20px;
  margin-top: 24px;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const ListCard = styled(Link)`
  display: flex;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => props.color || 'rgba(55, 109, 49, 0.05)'};
    opacity: 1;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CardImageSquare = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
`;

// Keep all the existing web styles, then add these mobile-specific styles with "Mobile" suffix

export const CardListMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 0 12px;
  margin-top: 0; // Removed margin-top since MainHeading handles spacing
`;

export const ListCardMobile = styled(Link)`
  display: flex;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  transition: transform 0.2s ease;
  height: 120px; // Reduced from 140px

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => props.color || 'rgba(55, 109, 49, 0.05)'};
    opacity: 1;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CardImageSquareMobile = styled.div`
  width: 120px; // Reduced from 140px
  height: 120px; // Reduced from 140px
  flex-shrink: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const CardContentMobile = styled.div`
  flex: 1;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .arrow-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #376d31;
    opacity: 0.7;
    font-size: 18px;
  }
`;

export const CardTitleMobile = styled.h2`
  font-size: 22px;
  color: #376d31;
  margin: 0;
  font-weight: 800;
  padding-right: 32px;
  line-height: 1.2;
`;

export const CardSubtitleMobile = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
  line-height: 1.3;
  padding-right: 32px;
`;

export const PopularTagMobile = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #376d31;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  z-index: 1;
`;

// Add this with the other mobile-specific styles

export const HeaderImageMobile = styled.img`
  width: calc(100% - 32px); // Slightly reduced side margins
  height: 25vh; // Dynamic height based on viewport
  min-height: 150px; // Minimum height to maintain visibility
  max-height: 200px; // Maximum height to prevent oversizing
  border-radius: 16px;
  margin: 0 16px 16px; // Reduced margins
  object-fit: cover;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

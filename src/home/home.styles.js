import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

// Add this new global style
export const GlobalBackgroundStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #ffffff, #f8f4e9, #ffffff);
    position: relative;
    overflow: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.857 8.485 15.272 9.9l7.9-7.9h-.83L25.172 0h-2.83zM32 0l-3.657 3.657 1.414 1.414L32 2.828l2.243 2.243 1.414-1.414L32 0zm13.627 0L52.8 8.485 51.384 9.9l-7.9-7.9h2.83zM27.656 0L36.143 8.485 34.728 9.9l-7.9-7.9h.83L25.83 0h2.83z' fill='%23bd8b13' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.5;
    animation: subtleFloat 30s linear infinite;
  }

  @keyframes subtleFloat {
    0% { background-position: 0 0; }
    100% { background-position: 60px 60px; }
  }
`;

// Update HomeContainer to remove background color since it's now handled globally
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1224px;
  margin: 0 auto;
  padding: 40px 20px;
  height: 100%;

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
  }
`;

// Update the WelcomeSection to include the divider
export const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;

  .animated-divider {
    width: 180px;
    height: 3px;
    background: #376d31;
    margin: 24px auto 0;
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

  @media (max-width: 768px) {
    margin-bottom: 24px;
    padding: 0 16px;
  }
`;

export const MainHeading = styled.h1`
  font-size: 48px;
  font-weight: 1000;
  color: #376d31;
  margin-top: 10px;
  margin-bottom: 0px;
  text-align: center;

  .mobile-title {
    display: none;
  }

  .mobile-subtitle {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin: 16px 0;

    .mobile-title {
      display: block;
      font-size: 42px;
      font-weight: 800;
      color: rgba(189, 139, 19, 0.9);
      line-height: 1.1;
    }

    .mobile-subtitle {
      display: block;
      font-size: 24px;
      font-weight: 400;
      color: #333;
      line-height: 1.2;
    }

    .animated-divider {
      width: 140px;
      margin-top: 16px;
    }
  }
`;

export const Subtitle = styled.h2`
  font-size: 30px;
  font-weight: 500;
  color: #555;
  margin-top: 5px;
  margin-bottom: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
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

// Add these new color constants at the top
const CARD_COLORS = {
  info: '#f9eda8',
  download: '#b5d6ab',
  research: '#cdbe9a',
};

export const CardContent = styled.div`
  padding: 24px;
  background: transparent;
  position: relative;
  transition: background 0.5s ease;

  .arrow-icon {
    position: absolute;
    bottom: 12px;
    right: 12px;
    color: #376d31;
    opacity: 0.6;
    font-size: 14px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

// Update ActionCard with enhanced hover effects and color transitions
export const ActionCard = styled(Link)`
  flex: 1;
  max-width: 350px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${(props) =>
      props.cardType === 'info'
        ? CARD_COLORS.info
        : props.cardType === 'download'
          ? CARD_COLORS.download
          : CARD_COLORS.research};
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    margin: 0;
    transform: none !important;

    &:active {
      transform: scale(0.98) !important;
    }
  }

  @media (min-width: 769px) {
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px
        ${(props) =>
          props.cardType === 'info'
            ? 'rgba(249, 237, 168, 0.3)'
            : props.cardType === 'download'
              ? 'rgba(181, 214, 171, 0.3)'
              : 'rgba(205, 190, 154, 0.3)'};

      &::before {
        opacity: 0.15;
      }

      ${CardContent} {
        background: linear-gradient(
          to bottom,
          transparent,
          ${(props) =>
            props.cardType === 'info'
              ? 'rgba(249, 237, 168, 0.1)'
              : props.cardType === 'download'
                ? 'rgba(181, 214, 171, 0.1)'
                : 'rgba(205, 190, 154, 0.1)'}
        );
      }

      .arrow-icon {
        transform: translateX(5px);
        opacity: 1;
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

// Update CardContent with smoother transitions

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

// Update StatsContainer with auto-rotating stats
export const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 60px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(55, 109, 49, 0.05),
      transparent
    );
    animation: shimmerStats 3s infinite;
  }

  @keyframes shimmerStats {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(50%);
    }
  }

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

// Update StatNumber with continuous animation
export const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #376d31;
  opacity: 0;
  transform: translateY(20px);
  animation:
    fadeUpIn 0.6s ease forwards,
    pulseGlow 3s ease-in-out infinite;
  animation-delay: ${(props) => props.index * 0.2}s, 0.6s;

  @keyframes pulseGlow {
    0%,
    100% {
      text-shadow: 0 0 0 rgba(55, 109, 49, 0);
    }
    50% {
      text-shadow: 0 0 10px rgba(55, 109, 49, 0.2);
    }
  }

  @keyframes fadeUpIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const StatLabel = styled.div`
  font-size: 16px;
  color: #666;
  margin-top: 5px;
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
  animation-delay: ${(props) => props.index * 0.2 + 0.2}s;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

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

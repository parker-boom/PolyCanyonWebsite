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
  min-height: 100vh;
  background-color: #ffffff;
`;

// Add a welcome section
export const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const Subtitle = styled.h2`
  font-size: 20px;
  color: #666;
  font-weight: 400;
  margin: 0;
  margin-top: 10px;
`;

// Enhance the main heading
export const MainHeading = styled.h1`
  font-size: 48px;
  color: #376d31;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 800;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: #376d31;
    margin: 20px auto 0;
    border-radius: 2px;
  }
`;

// Enhance the action container
export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  margin-top: 20px;
  perspective: 1000px; // For 3D hover effect
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(55, 109, 49, 0.1),
      rgba(55, 109, 49, 0.05)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px) rotateX(2deg);
    box-shadow: 0 12px 30px rgba(55, 109, 49, 0.2);

    &::before {
      opacity: 1;
    }
  }

  // Make the center card slightly larger
  &:nth-child(2) {
    transform: scale(1.05);

    &:hover {
      transform: scale(1.05) translateY(-5px) rotateX(2deg);
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

  ${ActionCard}:hover & {
    transform: scale(1.05);
  }
`;

// Enhance the card content
export const CardContent = styled.div`
  padding: 24px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 1)
  );
`;

// Card title
export const CardTitle = styled.h2`
  font-size: 24px;
  color: #376d31;
  margin: 0 0 10px 0;
  font-weight: 700;
`;

// Card subtitle
export const CardSubtitle = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0;
  line-height: 1.4;
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
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #376d31;
`;

export const StatLabel = styled.div`
  font-size: 16px;
  color: #666;
  margin-top: 5px;
`;

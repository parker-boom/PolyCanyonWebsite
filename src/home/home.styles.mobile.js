import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: #ffffff;
`;

export const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 24px;
  padding: 0 16px;
`;

export const Subtitle = styled.h2`
  font-size: 16px;
  color: #666;
  font-weight: 400;
  margin: 0;
  margin-top: 8px;
  padding: 0 20px;
`;

export const MainHeading = styled.h1`
  font-size: 32px;
  color: #376d31;
  text-align: center;
  margin-bottom: 16px;
  font-weight: 800;
  position: relative;
  padding: 0 10px;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: #376d31;
    margin: 16px auto 0;
    border-radius: 2px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 0 16px;
`;

export const ActionCard = styled(Link)`
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;

  &:active {
    transform: scale(0.98);
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: #f5f5f5;
  background-image: linear-gradient(
      to bottom,
      rgba(55, 109, 49, 0.1),
      rgba(255, 255, 255, 0)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

export const CardContent = styled.div`
  padding: 20px;
  background: white;
  position: relative;

  .arrow-icon {
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: #376d31;
    opacity: 0.6;
    font-size: 14px;
  }
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  color: #376d31;
  margin: 0 0 8px 0;
  font-weight: 700;
`;

export const CardSubtitle = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
  line-height: 1.4;
  padding-right: 24px;
`;

export const PopularTag = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #376d31;
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  z-index: 1;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 40px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  width: calc(100% - 32px);
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #376d31;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

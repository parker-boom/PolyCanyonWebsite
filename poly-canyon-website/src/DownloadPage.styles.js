import styled, { keyframes } from 'styled-components';

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(55, 109, 49, 0.5); }
  50% { box-shadow: 0 0 20px rgba(55, 109, 49, 0.8); }
  100% { box-shadow: 0 0 5px rgba(55, 109, 49, 0.5); }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const IconContainer = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 36px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  animation: ${glowAnimation} 3s ease-in-out infinite;
  background-color: transparent; // Changed from #ffffff to transparent
`;

export const Title = styled.h1`
  font-size: 52px; // Increased from 48px
  font-weight: 700;
  color: #333;
  margin-top: -5px; // Adjusted from -10px
  margin-bottom: 10px; // Increased from 5px
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Subtitle = styled.h2`
  font-size: 22px;
  color: #555;
  margin-top: 0; // Removed top margin
  margin-bottom: 30px;
  text-align: center;
  max-width: 80%;
  line-height: 1.4;
`;

export const GifContainer = styled.div`
  height: 70vh;
  max-height: 600px;
  width: auto;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
`;

export const DownloadButton = styled.a`
  background: linear-gradient(to bottom, #376d31, #295033);
  color: white;
  padding: 18px 36px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background: linear-gradient(to bottom, #3a7434, #2c5636);
  }

  svg {
    font-size: 28px;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const ToggleButton = styled.button`1
  background-color: ${props => props.active ? '#4CAF50' : '#fff'};
  color: ${props => props.active ? 'white' : '#333'};
  padding: 12px 24px;
  border: 2px solid #4CAF50;
  border-radius: 25px;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#f0f0f0'};
    transform: translateY(-2px);
  }
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding-top: 30px;
  width: 100%;
  text-align: center;
`;

export const FooterText = styled.p`
  color: #777;
  font-size: 16px;
  margin: 8px 0;
`;
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
  background-color: #ffffff;
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
  animation: ${glowAnimation} 3s ease-in-out infinite, ${fadeIn} 0.5s ease-out;
  background-color: transparent;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

export const Title = styled.h1`
  font-size: 52px;
  font-weight: 700;
  color: #333;
  margin-top: -5px;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
`;

export const Subtitle = styled.h2`
  font-size: 22px;
  color: #555;
  margin-top: 0; // Removed top margin
  margin-bottom: 30px;
  text-align: center;
  max-width: 88%;
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
  animation: ${fadeIn} 0.5s ease-out;
`;

export const DownloadButton = styled.a`
  background: linear-gradient(to bottom, #376d31, #295033);
  color: white;
  padding: 18px 36px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px; 
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom, #3a7434, #2c5636);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 28px;
  }
`;

export const DeviceSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px; // Removed margin-top
  animation: ${fadeIn} 0.5s ease-out;
`;

export const SwitchText = styled.span`
  color: #4CAF50;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;

  transition: color 0.3s ease, text-decoration 0.3s ease;

  &:hover {
    color: #45a049;
    text-decoration: none;
    border-bottom: 1px solid #45a049;
  }
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding-top: 30px;
  width: 100%;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const FooterText = styled.p`
  color: #777;
  font-size: 16px;
  margin: 8px 0;
`;
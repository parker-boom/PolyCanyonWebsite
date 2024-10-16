// DownloadPage.styles.js
// This file contains styled components for the DownloadPage component,
// defining the layout and appearance of various elements.

// IMPORTS
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';


// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(55, 109, 49, 0.5); }
  50% { box-shadow: 0 0 20px rgba(55, 109, 49, 0.8); }
  100% { box-shadow: 0 0 5px rgba(55, 109, 49, 0.5); }
`;

// Styled components for the download page
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px; // Add horizontal padding
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  box-sizing: border-box; // Ensure padding is included in width calculation
`;

export const IconContainer = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 36px;
  margin-top: 25px;
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  animation: ${glowAnimation} 3s ease-in-out infinite, ${fadeIn} 0.5s ease-out;
  background-color: transparent;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(5deg); // Scale and rotate on hover
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 1000;
  color: #376d31;
  margin-top: 10px;
  margin-bottom: 0px;
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

export const LearnMoreButton = styled(Link)`
  display: inline-flex;
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
  margin-top: 20px;

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

  svg {
    margin-left: 8px;
  }
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

export const GifContainerWeb = styled.div`
  height: ${props => props.height}px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
    transform: translateY(-2px) scale(1.02); // Hover effect
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom, #3a7434, #2c5636);
  }

  &:active {
    transform: translateY(0); // Active state effect
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 28px; // Icon size
  }
`;

export const DeviceSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px; 
  animation: ${fadeIn} 0.5s ease-out;
`;

export const SwitchText = styled.span`
  color: #4CAF50;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px; 
  margin-top: 10px; 
  

  transition: color 0.3s ease, text-decoration 0.3s ease;

  &:hover {
    color: #45a049; // Hover color change
    text-decoration: none;
    border-bottom: 1px solid #45a049; // Underline effect on hover
  }
`;



export const Description = styled.p`
  font-size: 27px;  // Increased from 18px to 27px (50% increase)
  color: #555;
  text-align: center;
  margin: 15px 0;
  line-height: 1.5;
  max-width: 90%;
`;

// Download Section Split
export const DownloadSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  padding: 40px 0;
  gap: 40px;
`;

export const PlatformSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const PlatformTitle = styled.h2`
  font-size: 2.5em;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 15px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Divider = styled.div`
  width: 2px;  // Increased from 1px to 2px
  height: auto;
  background-color: #000;
  margin: 0;  // Removed margin
`;

export const DownloadNowText = styled.h2`
  font-size: 2.5em;
  font-weight: 700;
  color: #333;
  margin: 0;
  padding-top: 10px;
  text-align: center;
`;

export const WebDescription = styled(Description)`
  margin: 0;
  padding-top: 20px;
  font-size: 1.65em;
  text-align: center;
  max-width: 90%;
`;

export const WebLearnMoreButton = styled(LearnMoreButton)`
  font-size: 0.9em;
  padding: 10px 20px;
  margin: 0;
  margin-top: 10px;
  display: block;
  width: fit-content;
`;

export const Icon = styled.img`
  height: 60px;
  object-fit: contain;
`;

export const Column = styled.div`
  flex: 0 1 40%;  // Changed from flex: 1 to flex: 0 1 40%
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 10px;  // Reduced horizontal padding
`;

export const SplitContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 0;
`;

export const RoundedContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  width: 100%; // Changed from 90% to 100%
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box; // Ensure padding is included in width calculation
`;

export const PlatformBadge = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  color: #376d31;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(55, 109, 49, 0.1);
  transition: all 0.3s ease;
  border: 2px solid #376d31;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(55, 109, 49, 0.2);
  }

  svg {
    margin-right: 10px;
    font-size: 28px;
  }
`;

export const DownloadButtonWrapper = styled.a`
  display: flex;
  align-items: center;
  background: #376d31;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(55, 109, 49, 0.1);
  border: 2px solid #376d31;

  &:hover {
    background: white;
    color: #376d31;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(55, 109, 49, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const DownloadButtonIcon = styled.div`
  color: white;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  transition: all 0.3s ease;

  ${DownloadButtonWrapper}:hover & {
    color: #376d31;
  }

  .default-icon, .hover-icon {
    position: absolute;
    transition: opacity 0.3s ease;
  }

  .default-icon {
    opacity: 1;
  }

  .hover-icon {
    opacity: 0;
  }

  ${DownloadButtonWrapper}:hover & .default-icon {
    opacity: 0;
  }

  ${DownloadButtonWrapper}:hover & .hover-icon {
    opacity: 1;
  }

  svg {
    font-size: 34px;
  }
`;

export const DownloadButtonText = styled.span`
  display: block;
  text-align: left;
  font-size: 20px;
  line-height: 1.2;
`;

export const DownloadButtonSubtext = styled.span`
  display: block;
  text-align: left;
  font-size: 16px;
  font-weight: normal;
  opacity: 0.8;
`;

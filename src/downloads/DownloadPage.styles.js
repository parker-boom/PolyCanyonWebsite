// DownloadPage.styles.js
// This file contains styled components for the DownloadPage component,
// defining the layout and appearance of various elements.

import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaDownload, FaInfoCircle, FaBuilding } from 'react-icons/fa';

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
  padding: 0; // Remove top padding
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
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
    transform: scale(1.1) rotate(5deg); // Scale and rotate on hover
  }
`;

export const Title = styled.h1`
  font-size: 52px;
  font-weight: 700;
  color: #333;
  margin-top: 20px;
  margin-bottom: 15px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
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
  background: #4CAF50;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: inline-block;

  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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

export const WebDownloadButton = styled(DownloadButton)`
  justify-content: center;
  padding: 15px 30px;
  font-size: 18px;
  margin-top: 20px;

  svg {
    display: none;  // Hide the icon
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
  

  transition: color 0.3s ease, text-decoration 0.3s ease;

  &:hover {
    color: #45a049; // Hover color change
    text-decoration: none;
    border-bottom: 1px solid #45a049; // Underline effect on hover
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
  margin: 8px 0; // Footer text margin
`;

// Banner
export const Banner = styled.div`
  width: 100%;
  background-color: #b6e5b6;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 20px 20px;
`;

export const BannerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px;
`;

// Add these new styles for improved control
export const LeftSection = styled.div`
  display: flex;
  align-items: flex-end; /* Align the bottom of all items */
`;

export const BannerText = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #3c6b38;
  margin: 0;
  text-shadow: 0 2px 4px rgba(253, 208, 76, 0.5);
  line-height: 1; /* Prevent extra height from line spacing */
`;

export const RightSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 30px;
`;

export const NavLink = styled(Link)`
  position: relative;
  color: #000;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #3c6b38;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }

  ${({ $isActive }) => $isActive && `
    &:after {
      width: 100%;
    }
  `}
`;


export const BannerIcon = styled.img`
  height: 48px;
  width: 48px;
  object-fit: cover;
  border-radius: 10px;
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
  padding-top: 8px;
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

// Add this new styled component
export const RoundedContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  margin: 20px 0;
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
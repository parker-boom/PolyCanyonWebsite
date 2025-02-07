/**
 * Styles for the Download Page components.
 * Provides layout and design for the page elements including buttons, containers, and animations.
 * Animations: fadeIn keyframe for smooth transitions.
 * Purpose: Centralized styling for both web and mobile download pages using styled-components.
 */

/*
Imports
*/
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

/*
Keyframes
*/
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

/*
Styles
*/

// Shared Styles
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  background-color: #ffffff;
  box-sizing: border-box;

  @media (min-width: 1324px) {
    padding: 0 50px;
  }
`;

export const RoundedContainer = styled.div`
  background-color: #e8efe8;
  border-radius: 20px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
  padding: 15px;
  margin: 10px auto;
  width: 100%;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 1000;
  color: #376d31;
  margin-top: 10px;
  margin-bottom: 0px;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 27px;
  color: #555;
  text-align: center;
  margin: 15px 0;
  line-height: 1.5;
  max-width: 90%;
`;

export const WebDescription = styled(Description)`
  margin: 0;
  padding-top: 20px;
  font-size: 1.65em;
  text-align: center;
  max-width: 90%;
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
  margin-top: 0px;
  margin-bottom: 20px;

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
    background: linear-gradient(
      45deg,
      #376d31,
      rgba(189, 139, 19, 0.8),
      #376d31
    );
    z-index: -1;
    filter: blur(8px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

export const GifContainer = styled.div`
  height: 70vh;
  max-height: 600px;
  width: auto;
  margin-bottom: 25px;
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
  transition:
    transform 0.3s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;
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

/*
Mobile
*/
export const DeviceSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const SwitchText = styled.span`
  color: #4caf50;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
  margin-top: 0px;

  transition:
    color 0.3s ease,
    text-decoration 0.3s ease;

  &:hover {
    color: #45a049;
    text-decoration: none;
    border-bottom: 1px solid #45a049;
  }
`;

/*
Web
*/
export const SplitContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 0;
`;

export const Column = styled.div`
  flex: 0 1 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 10px;
`;

export const GifContainerWeb = styled.div`
  height: ${(props) => props.height}px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
    background: rgba(189, 139, 19, 0.15);
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

  .default-icon,
  .hover-icon {
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

// Add these new styles after the imports and before existing styles
export const TitleSection = styled.div`
  width: 100%;
  background-color: #e8efe8;
  border-radius: 20px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
  margin-bottom: 24px;
  padding: 25px 20px;
  box-sizing: border-box;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(189, 139, 19, 0.5),
      transparent
    );
  }

  &::before {
    top: 12px;
  }

  &::after {
    bottom: 12px;
    width: 180px;
  }
`;

export const Header = styled.header`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const Subtitle = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-style: italic;
  color: #376d31;
  margin: 0;
`;

export const MainTitle = styled.h1`
  font-size: 68px;
  font-weight: 800;
  margin: 0 0 6px;
  line-height: 1;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1),
    rgba(189, 139, 19, 0.85)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  animation: titleGlow 3s ease-in-out infinite;

  @keyframes titleGlow {
    0%,
    100% {
      text-shadow:
        0 0 1px rgba(189, 139, 19, 0.2),
        0 0 2px rgba(189, 139, 19, 0.2),
        0 0 3px rgba(189, 139, 19, 0.2);
      filter: brightness(1);
    }
    50% {
      text-shadow:
        0 0 2px rgba(189, 139, 19, 0.3),
        0 0 4px rgba(189, 139, 19, 0.3),
        0 0 6px rgba(189, 139, 19, 0.3);
      filter: brightness(1.1);
    }
  }

  @media (max-width: 768px) {
    font-size: 52px;
  }
`;

export const TitleTagline = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #376d31;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  padding: 0 24px;

  &::before,
  &::after {
    content: '•';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(189, 139, 19, 0.6);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

// Add this new style
export const Divider = styled.div`
  width: 60%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(189, 139, 19, 0.3),
    transparent
  );
  margin: 10px 0;
`;

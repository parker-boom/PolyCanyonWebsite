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
  padding: 0 15px; // Add horizontal padding
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  box-sizing: border-box;
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
  margin-bottom: 10px;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const SwitchText = styled.span`
  color: #4caf50;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 10px;

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

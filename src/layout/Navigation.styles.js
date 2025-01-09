/**
 * Styles for Navigation Component
 * Purpose: Defines the styles for the navigation bar, including mobile and web-specific layouts, pop-up menu for mobile, and link interactions.
 * Key Elements: BannerMobile, Banner, PopupContainer, NavLinks, and responsive design for mobile and desktop views.
 * Dependencies: styled-components for modular and responsive styling.
 */

/*
Imports
*/
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const pulseGlow = keyframes`
  0% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.4; transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

/*
Mobile Elements
*/

export const BannerMobile = styled.div`
  width: 100%;
  background-color: #e8efe8;
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 25px 25px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
`;

export const MenuIcon = styled.div`
  font-size: 24px;
  color: #376d31;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.3s ease;
  background-color: rgba(55, 109, 49, 0.05);

  &:hover {
    background-color: rgba(55, 109, 49, 0.1);
    box-shadow: 0 0 0 1px rgba(189, 139, 19, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PolyCanyonTitle = styled.h1`
  font-size: 34px;
  font-weight: 900;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1) 0%,
    rgba(212, 169, 65, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(189, 139, 19, 0.1);

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    text-shadow: 0 4px 8px rgba(189, 139, 19, 0.2);
  }
`;

export const Logo = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(55, 109, 49, 0.15);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(55, 109, 49, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const PopupContainer = styled.div`
  position: fixed;
  top: 0; // Ensure it starts from the very top
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column; // Change to column layout
  z-index: 1001;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const PopupContent = styled.div`
  background-color: #ffffff;
  width: 100%;
  border-radius: 0 0 25px 25px;
  display: flex;
  flex-direction: column;
  animation: ${slideDown} 0.3s ease-out;
  box-sizing: border-box;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.15),
    0 2px 8px rgba(189, 139, 19, 0.1);
  border-bottom: 2px solid rgba(189, 139, 19, 0.1);
`;

export const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px 15px; // Add padding-top to account for banner height
`;

export const PopupTitle = styled.h2`
  font-size: 24px;
  font-weight: 850;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1) 0%,
    rgba(212, 169, 65, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-shadow: 0 2px 4px rgba(189, 139, 19, 0.1);
`;

export const PopupCloseButton = styled.button`
  background: none;
  border: none;
  color: #376d31;
  font-size: 24px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.9);
  }
`;

export const NavLinkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 0 25px 25px; // Move padding here
`;

export const PopupNavLink = styled(Link)`
  text-decoration: none;
  padding: 16px 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  transition: all 0.2s ease;
  background: ${(props) => (props.$isActive ? '#e8efe8' : '#f5f5f5')};
  text-align: center;

  svg {
    font-size: 24px;
    color: #376d31;
    margin-bottom: 2px;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: #376d31;
      background: #e8efe8;
      box-shadow:
        0 2px 8px rgba(189, 139, 19, 0.15),
        0 1px 2px rgba(189, 139, 19, 0.1);
      border: 1px solid rgba(189, 139, 19, 0.1);
    `}

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow:
      0 4px 12px rgba(189, 139, 19, 0.1),
      0 2px 4px rgba(189, 139, 19, 0.05);
  }
`;

/*
Web Banner
*/
export const Banner = styled.div`
  width: 100%;
  background-color: #e8efe8;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 25px 25px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transform: translateY(
    ${(props) => (props.$isAtTop ? '0' : props.$isVisible ? '0' : '-100%')}
  );
  transition: transform 0.3s ease;
`;

export const BannerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 40px;
  position: relative;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;

  // First child group (logo + title)
  > div:first-child {
    display: flex;
    align-items: center;
    gap: 20px; // Increased gap between logo and title
    margin-right: 48px; // Increased margin before nav links

    &:hover {
      > * {
        transform: translateY(-1px);
      }
    }
  }
`;

export const RightSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const BannerText = styled.h1`
  font-size: 32px;
  font-weight: 900;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1) 0%,
    rgba(212, 169, 65, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(189, 139, 19, 0.1);

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
    text-shadow: 0 4px 8px rgba(189, 139, 19, 0.2);
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 10px;
`;

export const NavLink = styled(Link)`
  position: relative;
  color: #333333;
  text-decoration: none;
  font-size: 17px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    font-size: 16px;
    color: #376d31;
  }

  &:hover {
    background-color: rgba(55, 109, 49, 0.05);
    box-shadow: 0 0 0 1px rgba(189, 139, 19, 0.1);
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: #376d31;

      &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 3px;
        background: #376d31;
        box-shadow: 0 1px 2px rgba(189, 139, 19, 0.1);
        border-radius: 3px;
      }
    `}
`;

export const BannerIcon = styled.img`
  height: 44px; // Slightly increased
  width: 44px; // Slightly increased
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 2px 8px rgba(55, 109, 49, 0.15),
    0 1px 2px rgba(189, 139, 19, 0.1);
  border: 2px solid rgba(189, 139, 19, 0.1);

  &:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      0 4px 12px rgba(55, 109, 49, 0.2),
      0 2px 4px rgba(189, 139, 19, 0.15);
  }
`;

/*
Footer Elements
*/
export const Footer = styled.footer`
  margin-top: auto;
  padding: 24px 0;
  width: 100%;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
  background: linear-gradient(to bottom, transparent, rgba(189, 139, 19, 0.03));
  border-top: 1px solid rgba(189, 139, 19, 0.1);
`;

export const FooterText = styled.p`
  color: ${(props) => {
    if (props.$primary && props.$developer) return 'rgba(189, 139, 19, 0.9)'; // Gold for developer credit
    if (props.$primary) return 'rgba(55, 109, 49, 0.9)'; // Green for app name
    if (props.$contact) return 'rgba(189, 139, 19, 0.7)'; // Gold for contact info
    return 'rgba(55, 109, 49, 0.8)'; // Green for Cal Poly
  }};
  font-size: ${(props) => (props.$primary ? '16px' : '14px')};
  margin: ${(props) => (props.$primary ? '8px 0' : '6px 0')};
  font-weight: ${(props) => (props.$primary ? '600' : '500')};
  letter-spacing: ${(props) => (props.$primary ? '0.3px' : 'normal')};
  transition: all 0.3s ease;

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 2px 4px;
    border-radius: 4px;

    &:hover {
      color: ${(props) =>
        props.$contact ? 'rgba(189, 139, 19, 1)' : 'rgba(55, 109, 49, 1)'};
      background: ${(props) =>
        props.$contact
          ? 'rgba(189, 139, 19, 0.05)'
          : 'rgba(55, 109, 49, 0.05)'};
    }
  }

  ${(props) =>
    props.$contact &&
    `
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 13px;
    letter-spacing: 0.5px;
  `}
`;

export const FooterDivider = styled.span`
  margin: 0 12px;
  color: rgba(189, 139, 19, 0.3);
  font-size: 8px;
  vertical-align: middle;
`;

export const PageWrapper = styled.div`
  padding-top: 70px; // Always add padding since banner is always fixed
`;

export const ChroniclesButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 0px;
  padding: 6px 8px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.3px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 20px;
  text-shadow: 0 0 15px rgba(189, 139, 19, 0.5);

  // Move the text content into a span to keep it above everything
  span {
    position: relative;
    z-index: 3;
    background: linear-gradient(
      90deg,
      rgb(189, 139, 19) 0%,
      rgb(212, 169, 65) 50%,
      rgb(189, 139, 19) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 4s linear infinite;
  }

  // Glowing orb icon
  &::before {
    content: '✧';
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${pulseGlow} 2s ease-in-out infinite;
    text-shadow: 0 0 15px rgba(189, 139, 19, 0.8);
    -webkit-text-fill-color: rgb(189, 139, 19);
    position: relative;
    z-index: 3;
  }

  &:hover {
    transform: translateY(-2px);
    padding: 6px 20px;

    // Move background effects to a separate pseudo-element
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255, 248, 235, 0.1);
      box-shadow:
        0 0 20px rgba(189, 139, 19, 0.2),
        0 0 30px rgba(189, 139, 19, 0.1),
        inset 0 0 15px rgba(189, 139, 19, 0.1);
      border-radius: 20px;
      z-index: 1;
    }

    &::before {
      animation: ${pulseGlow} 1s ease-in-out infinite;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

// Copyright Disclaimer Styles
export const CopyrightLink = styled.button`
  background: none;
  border: none;
  color: rgba(189, 139, 19, 0.7);
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 2px 4px;
  transition: all 0.3s ease;

  &:hover {
    color: rgba(189, 139, 19, 1);
  }
`;

export const DisclaimerPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const DisclaimerContent = styled.div`
  background-color: #ffffff;
  border-radius: 25px;
  padding: 40px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
  border: 1px solid rgba(189, 139, 19, 0.1);

  @media (max-width: 768px) {
    padding: 25px;
    width: 95%;
  }
`;

export const DisclaimerTitle = styled.h2`
  color: #376d31;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 20px;
`;

export const DisclaimerSection = styled.div`
  margin-bottom: 25px;

  h3 {
    color: #376d31;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  p {
    color: #333;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  a {
    color: rgba(189, 139, 19, 0.9);
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: rgba(189, 139, 19, 1);
      text-decoration: underline;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #376d31;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(55, 109, 49, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

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
  font-size: 28px;
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
  max-width: 1400px; // Increased from 1200px
  padding: 0 40px; // Increased from 30px for better spacing at larger widths
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

export const PageWrapper = styled.div`
  padding-top: 70px; // Always add padding since banner is always fixed
`;

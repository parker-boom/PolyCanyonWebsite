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

/*
Mobile Elements
*/

export const BannerMobile = styled.div`
  width: 100%;
  background-color: #b6e5b6;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 20px 20px;
  box-sizing: border-box;
`;

export const MenuIcon = styled.div`
  font-size: 28px;
  color: #3c6b38;
  cursor: pointer;
  padding: 10px 15px;
  margin-top: 10px;
`;

export const PolyCanyonTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: #3c6b38;
  text-shadow: 0 2px 4px rgba(253, 208, 76, 0.5);
  text-align: center;
  margin: 0;
`;

export const Logo = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 10px;
  margin-right: 15px;
`;

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const PopupContent = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  width: 80%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
`;

export const PopupCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #4caf50;
  }
`;

export const PopupTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 10px 0 20px;
  text-align: center;
`;

export const PopupNavLink = styled(Link)`
  text-decoration: none;
  color: #4caf50;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  padding: 12px;
  border-radius: 10px;
  width: 100%;

  &:hover {
    background-color: #f0f0f0;
    color: #45a049;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    background-color: #e8f5e9;
    color: #2e7d32;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 10px;
      right: 10px;
      height: 2px;
      background-color: #2e7d32;
    }
  `}
`;

export const NavLinkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

/*
Web Banner
*/
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

export const LeftSection = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const RightSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const BannerText = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #3c6b38;
  margin: 0;
  text-shadow: 0 2px 4px rgba(253, 208, 76, 0.5);
  line-height: 1;
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

  ${({ $isUnderlined }) =>
    $isUnderlined &&
    css`
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

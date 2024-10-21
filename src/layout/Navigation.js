/**
 * Component: Navigation
 * Purpose: Provides a responsive navigation bar for both mobile and web versions of the Poly Canyon app.
 * Key Features: Mobile pop-up menu, dynamic page links with icons (Download, Info, Structures), highlights the active page based on URL.
 * Dependencies: react-responsive for media queries, react-router-dom for navigation, react-icons for icons, styled-components for styling.
 */

/*
Imports
*/

// Libraries
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import {
  FaBars,
  FaTimes,
  FaDownload,
  FaInfo,
  FaBuilding,
} from 'react-icons/fa';

// Styles
import {
  // Mobile
  BannerMobile,
  MenuIcon,
  PolyCanyonTitle,
  Logo,
  PopupContainer,
  PopupContent,
  PopupCloseButton,
  PopupTitle,
  PopupNavLink,
  NavLinkContainer,

  // Web
  Banner,
  BannerContent,
  LeftSection,
  RightSection,
  BannerText,
  NavLinks,
  NavLink,
  BannerIcon,
} from './Navigation.styles';

// Logo
import app360 from '../assets/app360.jpg';

/*
Components & Render
*/
const Navigation = () => {
  // State variables
  const [isPopupOpen, setPopupOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const currentPath =
      location.pathname === '/' ? '/download' : location.pathname;
    setActiveLink(currentPath);
  }, [location]);

  // Open Mobile Pop-Up
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  // Change to other pages
  const navLinks = [
    { to: '/download', icon: <FaDownload />, text: 'Download' },
    { to: '/info', icon: <FaInfo />, text: 'Info' },
    { to: '/structures', icon: <FaBuilding />, text: 'Structures' },
  ];

  const handleMouseEnter = (to) => {
    setHoveredLink(to);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  // Links to other pages
  const renderNavLinks = (LinkComponent, extraProps = {}) =>
    navLinks.map(({ to, icon, text }) => (
      <LinkComponent
        key={to}
        to={to}
        $isActive={to === activeLink}
        $isUnderlined={
          (to === activeLink && hoveredLink === null) || to === hoveredLink
        }
        onMouseEnter={() => handleMouseEnter(to)}
        onMouseLeave={handleMouseLeave}
        {...extraProps}
      >
        {icon} {text}
      </LinkComponent>
    ));

  // Mobile banner + pop-up for switching pages
  if (isMobile) {
    return (
      <>
        {/* Banner */}
        <BannerMobile>
          <MenuIcon onClick={togglePopup}>
            <FaBars />
          </MenuIcon>
          <PolyCanyonTitle>Poly Canyon</PolyCanyonTitle>
          <Logo src={app360} alt="Poly Canyon Logo" />
        </BannerMobile>

        {/* PopUp */}
        {isPopupOpen && (
          <PopupContainer onClick={togglePopup}>
            <PopupContent onClick={(e) => e.stopPropagation()}>
              <PopupCloseButton onClick={togglePopup}>
                <FaTimes />
              </PopupCloseButton>
              <PopupTitle>Switch Pages</PopupTitle>
              <NavLinkContainer>
                {renderNavLinks(PopupNavLink, { onClick: togglePopup })}
              </NavLinkContainer>
            </PopupContent>
          </PopupContainer>
        )}
      </>
    );
  }

  // Web Banner
  return (
    <Banner>
      <BannerContent>
        <LeftSection>
          <BannerText>Poly Canyon</BannerText>
          <NavLinks>{renderNavLinks(NavLink)}</NavLinks>
        </LeftSection>
        <RightSection>
          <BannerIcon src={app360} alt="Poly Canyon Logo" />
        </RightSection>
      </BannerContent>
    </Banner>
  );
};

// Used in Index.js (shared among all pages)
export default Navigation;

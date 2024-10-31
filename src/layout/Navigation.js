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
import { useLocation, useNavigate } from 'react-router-dom';
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
  PopupHeader,
  PopupContent,
  PopupCloseButton,
  PopupTitle,
  PopupNavLink,
  NavLinkContainer,

  // Web
  Banner,
  BannerContent,
  LeftSection,
  BannerText,
  NavLinks,
  NavLink,
  BannerIcon,
} from './Navigation.styles.js';

// Logo
import app360 from '../assets/app360.jpg';

/*
Components & Render
*/
const Navigation = () => {
  // State variables
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();
  const [isAtTop, setIsAtTop] = useState(true);

  // Add scroll handler
  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update isAtTop state
      setIsAtTop(currentScrollY === 0);

      // Only handle visibility changes when not at top
      if (!isAtTop) {
        // Show navbar when scrolling up
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
        // Hide navbar when scrolling down
        else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        }

        // Hide after 2 seconds of no scrolling, unless at top of page
        timeoutId = setTimeout(() => {
          if (currentScrollY > 100) {
            setIsVisible(false);
          }
        }, 2000);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lastScrollY, isAtTop]);

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
          <PolyCanyonTitle onClick={() => navigate('/')}>
            Poly Canyon
          </PolyCanyonTitle>
          <Logo
            src={app360}
            alt="Poly Canyon Logo"
            onClick={() => navigate('/')}
          />
        </BannerMobile>

        {/* PopUp */}
        {isPopupOpen && (
          <PopupContainer onClick={togglePopup}>
            <PopupContent onClick={(e) => e.stopPropagation()}>
              <PopupHeader>
                <PopupTitle>Navigation</PopupTitle>
                <PopupCloseButton onClick={togglePopup}>
                  <FaTimes />
                </PopupCloseButton>
              </PopupHeader>
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
    <Banner $isVisible={isVisible} $isAtTop={isAtTop}>
      <BannerContent>
        <LeftSection>
          <div>
            <BannerIcon
              src={app360}
              alt="Poly Canyon Logo"
              onClick={() => navigate('/')}
            />
            <BannerText onClick={() => navigate('/')}>Poly Canyon</BannerText>
          </div>
          <NavLinks>
            {navLinks.map(({ to, icon, text }) => (
              <NavLink key={to} to={to} $isActive={to === activeLink}>
                {icon} {text}
              </NavLink>
            ))}
          </NavLinks>
        </LeftSection>
      </BannerContent>
    </Banner>
  );
};

// Used in Index.js (shared among all pages)
export default Navigation;

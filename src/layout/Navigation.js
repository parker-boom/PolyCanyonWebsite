import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaBars, FaTimes, FaDownload, FaInfo, FaBuilding } from 'react-icons/fa';
import {
  Banner,
  BannerContent,
  BannerIcon,
  BannerText,
  NavLinks,
  NavLink,
  LeftSection,
  RightSection,
  BannerMobile,
  MenuIcon,
  PolyCanyonTitle,
  Logo,
  PopupContainer,
  PopupContent,
  PopupCloseButton,
  PopupNavLink,
  PopupTitle,
  NavLinkContainer
} from './Navigation.styles';

import app360 from '../assets/app360.jpg';

const Navigation = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const navLinks = [
    { to: "/download", icon: <FaDownload />, text: "Download" },
    { to: "/info", icon: <FaInfo />, text: "Info" },
    { to: "/structures", icon: <FaBuilding />, text: "Structures" }
  ];

  const renderNavLinks = (LinkComponent, extraProps = {}) => (
    navLinks.map(({ to, icon, text }) => (
      <LinkComponent 
        key={to} 
        to={to} 
        $isActive={location.pathname === to}
        {...extraProps}
      >
        {icon} {text}
      </LinkComponent>
    ))
  );

  if (isMobile) {
    return (
      <>
        <BannerMobile>
          <MenuIcon onClick={togglePopup}>
            <FaBars />
          </MenuIcon>
          <PolyCanyonTitle>
            Poly Canyon
          </PolyCanyonTitle>
          <Logo src={app360} alt="Poly Canyon Logo" />
        </BannerMobile>

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

  return (
    <Banner>
      <BannerContent>
        <LeftSection>
          <BannerText>Poly Canyon</BannerText>
          <NavLinks>
            {renderNavLinks(NavLink)}
          </NavLinks>
        </LeftSection>
        <RightSection>
          <BannerIcon src={app360} alt="Poly Canyon Logo" />
        </RightSection>
      </BannerContent>
    </Banner>
  );
};

export default Navigation;

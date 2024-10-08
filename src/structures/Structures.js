import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FaBars, FaTimes, FaDownload, FaInfoCircle, FaBuilding, FaHardHat } from 'react-icons/fa';
import {
  Banner,
  BannerContent,
  BannerIcon,
  BannerText,
  NavLinks,
  NavLink,
  BannerMobile,
  MenuIcon,
  PolyCanyonTitle,
  Logo,
  PopupContainer,
  PopupContent,
  PopupCloseButton,
  PopupNavLink,
  PopupTitle,
  NavLinkContainer,
  LeftSection,
  RightSection,
} from '../Navigation';
import app360 from '../assets/app360.jpg';
import {
  PageContainer,
  ContentContainer,
  ComingSoonContainer,
  ComingSoonTitle,
  ComingSoonText,
  ConstructionIcon,
} from './Structures.styles';

const Structures = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {isMobile ? (
        <BannerMobile>
          <MenuIcon onClick={togglePopup}>
            <FaBars />
          </MenuIcon>
          <PolyCanyonTitle>
            Poly Canyon
          </PolyCanyonTitle>
          <Logo src={app360} alt="Poly Canyon Logo" />
        </BannerMobile>
      ) : (
        <Banner>
          <BannerContent>
            <LeftSection>
              <BannerText>Poly Canyon</BannerText>
            
            
              <NavLinks>
                <NavLink to="/download">
                  <FaDownload /> Download
                </NavLink>
                <NavLink to="/info">
                  <FaInfoCircle /> Info
                </NavLink>
                <NavLink to="/structures">
                  <FaBuilding /> Structures
                </NavLink>
              </NavLinks>
              </LeftSection>
              <RightSection>
              <BannerIcon src={app360} alt="Poly Canyon Logo" />
            </RightSection>
          </BannerContent>
        </Banner>
      )}

      <PageContainer>
        {isPopupOpen && isMobile && (
          <PopupContainer onClick={togglePopup}>
            <PopupContent onClick={(e) => e.stopPropagation()}>
              <PopupCloseButton onClick={togglePopup}>
                <FaTimes />
              </PopupCloseButton>
              <PopupTitle>Switch Pages</PopupTitle>
              <NavLinkContainer>
                <PopupNavLink to="/download" onClick={togglePopup}>
                  <FaDownload /> Download
                </PopupNavLink>
                <PopupNavLink to="/info" onClick={togglePopup}>
                  <FaInfoCircle /> Info
                </PopupNavLink>
                <PopupNavLink to="/structures" onClick={togglePopup}>
                  <FaBuilding /> Structures
                </PopupNavLink>
              </NavLinkContainer>
            </PopupContent>
          </PopupContainer>
        )}

        <ContentContainer>
          <ComingSoonContainer>
            <ConstructionIcon>
              <FaHardHat />
            </ConstructionIcon>
            <ComingSoonTitle>Under Construction</ComingSoonTitle>
            <ComingSoonText>
              Full information on structures coming soon!
            </ComingSoonText>
          </ComingSoonContainer>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default Structures;

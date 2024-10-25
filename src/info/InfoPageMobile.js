/*

Components to fix:
0. Main section: Paragraph1 > PhotoGrid > Paragraph 2/3
1. Make photo grid vertical/sqaure -> more than just turning it
2. Make history image carousel vertical
3. Fix icons and in general, geology squares
4. Scale up app screenshots slightly
5. App Mode Picker: Get rid of word Mode
6. Fix app mode bullet points 
7. Recommend for / info: on two different lines
8. Touch up step by step directions/map (need to be wider)

*/

/**
 * Component: InfoPage
 * Purpose: Provides detailed information about Poly Canyon, including its history, geology, and access to the Poly Canyon app.
 * Key Features: Interactive image carousel, Google Maps route integration, virtual tour/adventure mode switching, and dynamic loading of more information sections.
 * Dependencies: react-icons for icons, GoogleMapsRoute and PhotoGrid components for map and image functionalities, styled-components for layout and design.
 */

/*
IMPORTS
*/

// Libraries
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaChevronRight,
  FaMapMarkerAlt,
  FaWalking,
  FaSearch,
  FaHistory,
  FaGlobeAmericas,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

// Styles
import {
  // Global styles
  PageContainer,
  GlobalStyle,
  Section,
  SectionTitle,
  Text,

  // More Info
  MoreInfoContainer,
  MoreInfoToggle,
  MoreInfoContent,
  ImprovedPicker,
  PickerButton,
  PickerContent,
  PickerTitle,

  // More Info: History
  MobileCarouselImageContainer,
  MobileCarouselContainer,
  MobileCarouselImage,
  MobileBackgroundImage,
  MobileArrowButtonImage,
  CarouselCaption,
  CaptionTitle,
  CaptionText,

  // More Info: Geology
  MobileGeologyContainer,
  MobileGeologyCard,
  GeologyContent,
  GeologyTitle,
  GeologyText,
  GeologyIcon,

  // App Section
  ModeSelector,
  ModeButton,
  ModeContent,
  ModeInfoBox,
  ModeTitle,
  MobileFeatureList,
  MobileFeatureText,
  FeatureItem,
  RecommendedFor,
  RecommendedText,
  RecommendedDescription,
  CTAButtonWrapper,
  CTAButton,
  CTAButtonText,
  CTAButtonIcon,

  // Directions Section
  MapContainer,
  ButtonContainer,
  AllTrailsButton,
  GoogleMapsButton,
  VisitTipsTitle,
  VisitTips,
} from './InfoPage.styles';

// Separate components
import PhotoGridMobile from './PhotoGridMobile';
import GoogleMapsRoute from './GoogleMapsRoute';

// App screenshot
import appPreview from '../assets/appPreview.png';

// Historical images - imports
import bladeRedesign from '../assets/pchistory/bladeRedesign.png';
import designVillage from '../assets/pchistory/designVillage.webp';
import entryArch from '../assets/pchistory/entryArch.jpg';
import shellHouseConstruct from '../assets/pchistory/shellHouseConstruct.jpg';
import bridgeGroup from '../assets/pchistory/bridgeGroup.jpg';
import modHouseConstruction from '../assets/pchistory/modHouseConstruction.jpg';
import geodesicDome from '../assets/pchistory/geodesicDome.jpg';
import fratessaTower from '../assets/pchistory/fratessaTowerb4.jpg';

/*
CONSTANTS
*/

// Historical image titles & descriptions
const historicalImages = [
  {
    src: entryArch,
    alt: 'Entry Arch',
    caption: 'The canyon entrance, built with local serpentinite rock.',
  },
  {
    src: shellHouseConstruct,
    alt: 'Shell House Under Construction',
    caption: 'Building the Shell House with cables and sprayed concrete.',
  },
  {
    src: bridgeGroup,
    alt: 'Bridge House Group Photo',
    caption:
      'Students on the Bridge House, one of the first Cor-ten steel structures.',
  },
  {
    src: bladeRedesign,
    alt: 'Blade Structure Redesign',
    caption: 'Award-winning 2006 redesign using post-tensioning techniques.',
  },
  {
    src: modHouseConstruction,
    alt: 'Modular House Construction',
    caption: 'Construction of the experimental Modular House frame.',
  },
  {
    src: geodesicDome,
    alt: 'Geodesic Dome Construction',
    caption: "Students building the West Coast's first geodesic dome.",
  },
  {
    src: fratessaTower,
    alt: 'Fratessa Tower (Old Version)',
    caption: 'Original water-supported observation tower, since replaced.',
  },
  {
    src: designVillage,
    alt: 'Design Village Competition',
    caption: 'Annual competition where students build temporary shelters.',
  },
];

// Rendered component
const InfoPage = () => {
  // Variables for state
  const [currentPicker, setCurrentPicker] = useState('history');
  const [currentMode, setCurrentMode] = useState('adventure');
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex] = useState(1);
  const [isTransitioning] = useState(false);
  const moreInfoButtonRef = useRef(null);
  const moreInfoContainerRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Change adventure/virtual mode
  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  // Open MoreInfo Section
  const toggleMoreInfo = () => {
    setIsMoreInfoOpen(!isMoreInfoOpen);
    setHasInteracted(true);
  };

  // Close MoreInfo (& scroll up)
  useEffect(() => {
    if (!isMoreInfoOpen && hasInteracted && moreInfoContainerRef.current) {
      moreInfoContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isMoreInfoOpen, hasInteracted]);

  // Preload images
  useEffect(() => {
    historicalImages.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, []);

  // Navigate to next image (historical section)
  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % historicalImages.length
    );
  };

  // Navigate to previous image (historical section)
  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + historicalImages.length) % historicalImages.length
    );
  };

  // Components for the more info section
  const pickerContent = {
    // HISTORY
    history: {
      title: 'A Rich Legacy',
      content: (
        <>
          {/* Introductory text */}
          <Text>
            Since the 1960s, the area has been a testing ground for experimental
            architecture and engineering. Students come here to turn their
            boldest designs into reality.
          </Text>

          {/* Mobile Carousel for Historical Images with Arrow Buttons */}
          <MobileCarouselContainer>
            <MobileBackgroundImage
              src={historicalImages[currentImageIndex].src}
            />
            <MobileCarouselImageContainer>
              <MobileCarouselImage
                src={historicalImages[currentImageIndex].src}
                alt={historicalImages[currentImageIndex].alt}
                style={{ opacity: isTransitioning ? 0 : 1 }}
              />
              <MobileCarouselImage
                src={historicalImages[nextImageIndex].src}
                alt={historicalImages[nextImageIndex].alt}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: isTransitioning ? 1 : 0,
                }}
              />
            </MobileCarouselImageContainer>

            {/* Bottom-positioned Arrow Buttons */}
            <MobileArrowButtonImage
              onClick={handlePrevImage}
              disabled={isTransitioning}
            >
              &lt;
            </MobileArrowButtonImage>
            <MobileArrowButtonImage
              onClick={handleNextImage}
              disabled={isTransitioning}
            >
              &gt;
            </MobileArrowButtonImage>
          </MobileCarouselContainer>

          {/* Caption with Title */}
          <CarouselCaption>
            <CaptionTitle>
              {historicalImages[currentImageIndex].alt}
            </CaptionTitle>
            <CaptionText>
              {historicalImages[currentImageIndex].caption}
            </CaptionText>
          </CarouselCaption>
        </>
      ),
    },

    // GEOLOGY
    geology: {
      title: 'Unique Landscape',
      content: (
        <>
          <Text>
            The canyon&apos;s unique landscape was shaped over millions of
            years, creating a perfect natural laboratory for architecture and
            ecology.
          </Text>

          <MobileGeologyContainer>
            {/* Tectonic Forces */}
            <MobileGeologyCard>
              <GeologyIcon>🌍</GeologyIcon>
              <GeologyContent>
                <GeologyTitle>Moving Earth</GeologyTitle>
                <GeologyText>
                  Two massive tectonic plates meet here, creating unique rock
                  formations perfect for testing architectural designs.
                </GeologyText>
              </GeologyContent>
            </MobileGeologyCard>

            {/* Springs */}
            <MobileGeologyCard>
              <GeologyIcon>💧</GeologyIcon>
              <GeologyContent>
                <GeologyTitle>Natural Springs</GeologyTitle>
                <GeologyText>
                  Underground springs emerge through special green rocks,
                  creating micro-environments throughout the canyon.
                </GeologyText>
              </GeologyContent>
            </MobileGeologyCard>

            {/* Soil */}
            <MobileGeologyCard>
              <GeologyIcon>🌱</GeologyIcon>
              <GeologyContent>
                <GeologyTitle>Rich Soil</GeologyTitle>
                <GeologyText>
                  Different soil types across the canyon support diverse plant
                  life and provide varied building conditions.
                </GeologyText>
              </GeologyContent>
            </MobileGeologyCard>
          </MobileGeologyContainer>
        </>
      ),
    },
  };

  return (
    <>
      <Helmet>
        <title>Discover the Poly Canyon Architectural Area</title>
        <meta
          name="description"
          content="Uncover the details of this outdoor architectural space and see how the app enhances your visit with an interactive experience."
        />
        <meta
          property="og:title"
          content="Discover the Poly Canyon Architectural Area"
        />
        <meta
          property="og:description"
          content="Uncover the details of this outdoor architectural space and see how the app enhances your visit with an interactive experience."
        />
        <meta
          property="og:image"
          content="https://polycanyon.com/sharePNG/oginfo.png"
        />
        <meta property="og:url" content="https://polycanyon.com/info" />
        <meta
          name="twitter:title"
          content="Discover the Poly Canyon Architectural Area"
        />
        <meta
          name="twitter:description"
          content="Uncover the details of this outdoor architectural space and see how the app enhances your visit with an interactive experience."
        />
        <meta
          name="twitter:image"
          content="https://polycanyon.com/sharePNG/twitinfo.png"
        />
      </Helmet>

      <PageContainer>
        <GlobalStyle />

        {/*
      General Information Section 
      */}
        <Section>
          <SectionTitle>What is Poly Canyon?</SectionTitle>

          {/* ADD A ROTATING QUOTE BOARD ANSWERING QUESTION ABOVE */}

          {/* Poly Canyon Overview */}
          <Text style={{ textAlign: 'left' }}>
            Poly Canyon is a 9-acre outdoor space where Cal Poly students have
            been building experimental structures since 1963. Just a mile from
            campus, it&apos;s home to over 30 unique architectural projects.
            <br />
            <br />
            These aren&apos;t just display pieces. Each structure was designed
            and built by students testing new ideas. Some projects succeeded
            brilliantly, others showed why certain ideas stayed theoretical.
          </Text>
          <PhotoGridMobile />
          <Text>
            Whether you&apos;re interested in architecture, looking for a
            different kind of hike, or just want to experience what makes Cal
            Poly unique, it&apos;s worth checking out.
          </Text>

          {/* More Info Section (implementation above) */}
          <MoreInfoContainer ref={moreInfoContainerRef}>
            {!isMoreInfoOpen && (
              <MoreInfoToggle onClick={toggleMoreInfo} ref={moreInfoButtonRef}>
                Learn More
                <FaChevronDown />
              </MoreInfoToggle>
            )}

            {isMoreInfoOpen && (
              <MoreInfoContent>
                {/* Pikcer Between MoreInfo Subsections */}
                <ImprovedPicker>
                  <PickerButton
                    active={currentPicker === 'history'}
                    onClick={() => setCurrentPicker('history')}
                  >
                    <FaHistory />
                    History
                  </PickerButton>
                  <PickerButton
                    active={currentPicker === 'geology'}
                    onClick={() => setCurrentPicker('geology')}
                  >
                    <FaGlobeAmericas />
                    Geology
                  </PickerButton>
                </ImprovedPicker>

                <PickerContent>
                  <PickerTitle>
                    {pickerContent[currentPicker].title}
                  </PickerTitle>
                  {pickerContent[currentPicker].content}
                </PickerContent>

                <MoreInfoToggle
                  onClick={toggleMoreInfo}
                  style={{ marginTop: '30px' }}
                >
                  Show Less
                  <FaChevronUp />
                </MoreInfoToggle>
              </MoreInfoContent>
            )}
          </MoreInfoContainer>
        </Section>

        {/* 
      Poly Canyon App Section
      */}
        <Section>
          <SectionTitle>What is the Poly Canyon App?</SectionTitle>

          <img
            src={appPreview}
            alt="Poly Canyon App Preview"
            loading="lazy"
            style={{
              width: '60%',
              height: 'auto',
              borderRadius: '10px',
              minWidth: '350px', // This sets a minimum width in pixels
              minHeight: 'auto', // Keeps the aspect ratio intact with height set to 'auto'
            }}
          />

          <Text>
            Your personal guide to exploring these architectural wonders. Find
            your way around with interactive maps, uncover the stories behind
            each structure, and track your progress as you discover the area.
          </Text>

          {/* New subtitle explaining the two modes - much shorter */}
          <Text
            style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}
          >
            The app supports two main modes of exploration.
          </Text>

          {/* Switch between adventure/virtual tour */}
          <ModeSelector>
            <ModeButton
              active={currentMode === 'adventure'}
              onClick={() => handleModeChange('adventure')}
            >
              <FaWalking /> Adventure
            </ModeButton>
            <ModeButton
              active={currentMode === 'virtual'}
              onClick={() => handleModeChange('virtual')}
            >
              <FaSearch /> Virtual
            </ModeButton>
          </ModeSelector>

          {/* Mode specific information */}
          <ModeContent mode={currentMode}>
            <ModeInfoBox>
              {currentMode === 'adventure' ? (
                <>
                  <ModeTitle>🧭 Adventure</ModeTitle>
                  <MobileFeatureList>
                    <MobileFeatureText>
                      🗺️ Interactive Map Navigation
                    </MobileFeatureText>
                    <MobileFeatureText>
                      ✅ Track Your Progress
                    </MobileFeatureText>
                    <MobileFeatureText>
                      📚 Learn Structures Histories
                    </MobileFeatureText>
                  </MobileFeatureList>
                  <RecommendedFor>
                    <RecommendedText>Recommended For:</RecommendedText>
                    <RecommendedDescription>
                      On-site explorers
                    </RecommendedDescription>
                  </RecommendedFor>
                </>
              ) : (
                <>
                  <ModeTitle>🖥️ Virtual Tour</ModeTitle>
                  <MobileFeatureList>
                    <MobileFeatureText>🏞️ Explore From Home</MobileFeatureText>
                    <MobileFeatureText>
                      ⭐ Rate Favorite Structures
                    </MobileFeatureText>
                    <MobileFeatureText>📱 Learn from afar</MobileFeatureText>
                  </MobileFeatureList>
                  <RecommendedFor>
                    <RecommendedText>Recommended For:</RecommendedText>
                    <RecommendedDescription>
                      Remote enthusiasts
                    </RecommendedDescription>
                  </RecommendedFor>
                </>
              )}

              {/* Download Button*/}
              <CTAButtonWrapper>
                <CTAButton to="/download">
                  <CTAButtonText>
                    {currentMode === 'adventure'
                      ? 'Start Your Adventure'
                      : 'Explore Virtually'}
                  </CTAButtonText>
                  <CTAButtonIcon>
                    <FaChevronRight />
                  </CTAButtonIcon>
                </CTAButton>
              </CTAButtonWrapper>
            </ModeInfoBox>
          </ModeContent>
        </Section>

        {/* 
      Getting There Section
       */}
        <Section>
          <SectionTitle>How do I get there?</SectionTitle>
          <Text>
            Access the area by walking along Poly Canyon Road on campus. The
            interactive map below shows the route.
          </Text>
          <MapContainer>
            {/* Google Maps - Separate Component */}
            <GoogleMapsRoute />
          </MapContainer>
          <Text>
            Choose your path - hike, bike, or run. The trail is well-marked and
            takes about 20 minutes to walk from campus.
          </Text>

          {/* AllTrails & GMaps Links*/}
          <ButtonContainer>
            <AllTrailsButton
              href="https://www.alltrails.com/trail/us/california/architecture-graveyard-hike-private-property?sh=rvw6ps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWalking /> All Trails
            </AllTrailsButton>
            <GoogleMapsButton
              href="https://maps.app.goo.gl/H8Dq6Y5x1E6pQJzk9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt /> Google Maps
            </GoogleMapsButton>
          </ButtonContainer>

          {/* Visiting Tips */}
          <VisitTipsTitle>Before You Go:</VisitTipsTitle>
          <VisitTips>
            <FeatureItem>
              🌞 Visit during daylight hours for the best experience
            </FeatureItem>
            <FeatureItem>
              🏞️ Watch for wildlife and horses - keep your distance and respect
              their space
            </FeatureItem>
            <FeatureItem>
              👟 Bring water and wear hiking shoes - the terrain can be uneven
            </FeatureItem>
          </VisitTips>
        </Section>
      </PageContainer>
    </>
  );
};

// Used in Index.js
export default InfoPage;

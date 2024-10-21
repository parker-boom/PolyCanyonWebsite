/*
IDEA: Add live weather API or other live information in this section
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

  // Title (Web Only)
  TitleSection,
  Header,
  Title,
  Subtitle,

  // More Info
  MoreInfoContainer,
  MoreInfoToggle,
  MoreInfoContent,
  ImprovedPicker,
  PickerButton,
  PickerContent,
  PickerTitle,

  // More Info: History
  StatBox,
  CarouselContainer,
  BackgroundImage,
  CarouselImageContainer,
  CarouselImage,
  ArrowButtonImage,
  CarouselCaption,
  CaptionTitle,
  CaptionText,

  // More Info: Geology
  ResponsiveRow,
  InfographicContainer,
  InfographicIcon,
  InfographicSquare,
  InfoTextBox,
  GreenTitle,
  InfoText,

  // App Section
  ModeSelector,
  ModeButton,
  ModeContent,
  ModeInfoBox,
  ModeTitle,
  FeatureList,
  FeatureItem,
  RecommendedFor,
  RecommendedText,
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
import PhotoGrid from './PhotoGrid';
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

          {/* Statistics Section - Web Only*/}
          {window.innerWidth > 768 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                flexWrap: 'wrap',
              }}
            >
              <StatBox>
                <h4>Established</h4>
                <p>1963</p>
              </StatBox>
              <StatBox>
                <h4>Structures</h4>
                <p>30+</p>
              </StatBox>
              <StatBox>
                <h4>Acreage</h4>
                <p>9 acres</p>
              </StatBox>
              <StatBox>
                <h4>Key Event</h4>
                <p>Design Village</p>
              </StatBox>
            </div>
          )}

          {/* Image Carousel - Historical Images*/}
          <CarouselContainer>
            <BackgroundImage src={historicalImages[currentImageIndex].src} />
            <CarouselImageContainer>
              <CarouselImage
                src={historicalImages[currentImageIndex].src}
                alt={historicalImages[currentImageIndex].alt}
                style={{ opacity: isTransitioning ? 0 : 1 }}
              />
              <CarouselImage
                src={historicalImages[nextImageIndex].src}
                alt={historicalImages[nextImageIndex].alt}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: isTransitioning ? 1 : 0,
                }}
              />
            </CarouselImageContainer>
            <ArrowButtonImage
              onClick={handlePrevImage}
              disabled={isTransitioning}
            >
              &lt;
            </ArrowButtonImage>
            <ArrowButtonImage
              onClick={handleNextImage}
              disabled={isTransitioning}
            >
              &gt;
            </ArrowButtonImage>
          </CarouselContainer>

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
      title: 'A Landscape Shaped by Time',
      content: (
        <>
          {/* Geology overview */}
          <Text>
            The canyon&apos;ss landscape is shaped by tectonic forces,
            serpentine springs, and varied soil types. This intricate interplay
            provides fertile ground for architectural and ecological study.
          </Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            {/* Infographic 1 - Tectonic */}
            <ResponsiveRow>
              <InfographicContainer>
                <InfographicSquare>
                  <InfographicIcon>🌍</InfographicIcon>
                </InfographicSquare>
                <InfoTextBox>
                  <GreenTitle>Tectonic Forces</GreenTitle>
                  <InfoText>
                    The canyon&apos;s geological features are the result of
                    tectonic activity. The Pacific and North American
                    Plates&apos; movements have created formations like the
                    Franciscan Formation and serpentine outcrops.
                  </InfoText>
                </InfoTextBox>
              </InfographicContainer>
            </ResponsiveRow>

            {/* Infographic 2 - Water */}
            <ResponsiveRow>
              <InfographicContainer>
                <InfographicSquare>
                  <InfographicIcon>💧</InfographicIcon>
                </InfographicSquare>
                <InfoTextBox>
                  <GreenTitle>Serpentine Springs</GreenTitle>
                  <InfoText>
                    Unique springs form where water flows through serpentine
                    rocks. These springs provide essential water to local
                    ecosystems, creating a distinct ecological character.
                  </InfoText>
                </InfoTextBox>
              </InfographicContainer>
            </ResponsiveRow>

            {/* Infographic 3 - Soils */}
            <ResponsiveRow>
              <InfographicContainer>
                <InfographicSquare>
                  <InfographicIcon>🌱</InfographicIcon>
                </InfographicSquare>
                <InfoTextBox>
                  <GreenTitle>Diverse Soil</GreenTitle>
                  <InfoText>
                    The canyon&apos;s soils range from stable Class I soils to
                    more challenging Class V soils, influencing vegetation
                    growth and ecological diversity.
                  </InfoText>
                </InfoTextBox>
              </InfographicContainer>
            </ResponsiveRow>
          </div>
        </>
      ),
    },
  };

  return (
    <>
      <PageContainer>
        <GlobalStyle />

        {/* Title Section */}
        {window.innerWidth > 768 && (
          <TitleSection>
            <Header>
              <Title>Discover The Canyon!</Title>
              <Subtitle>An Architect&apos;s Playground</Subtitle>
            </Header>
          </TitleSection>
        )}

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
            <br />
            <br />
            Whether you&apos;re interested in architecture, looking for a
            different kind of hike, or just want to experience what makes Cal
            Poly unique, it&apos;s worth checking out.
          </Text>
          <PhotoGrid />

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
            style={{ width: '60%', height: 'auto', borderRadius: '10px' }}
          />

          <Text>
            Your personal guide to exploring these architectural wonders. Find
            your way around with interactive maps, uncover the stories behind
            each structure, and track your progress as you discover the area.
          </Text>

          {/* Switch between adventure/virtual tour */}
          <ModeSelector>
            <ModeButton
              active={currentMode === 'adventure'}
              onClick={() => handleModeChange('adventure')}
            >
              <FaWalking /> Adventure Mode
            </ModeButton>
            <ModeButton
              active={currentMode === 'virtual'}
              onClick={() => handleModeChange('virtual')}
            >
              <FaSearch /> Virtual Tour Mode
            </ModeButton>
          </ModeSelector>

          {/* Mode specific information */}
          <ModeContent mode={currentMode}>
            <ModeInfoBox>
              {currentMode === 'adventure' ? (
                <>
                  {/* Adventure Mode */}
                  <ModeTitle>🧭 Adventure Mode</ModeTitle>
                  <FeatureList>
                    <FeatureItem>
                      🗺️ Interactive map for easy navigation
                    </FeatureItem>
                    <FeatureItem>
                      ✅ Automatic tracking of visited structures
                    </FeatureItem>
                    <FeatureItem>📚 In-depth historical insights</FeatureItem>
                  </FeatureList>
                  <RecommendedFor>
                    <RecommendedText>Recommended For:</RecommendedText>
                    On-site explorers
                  </RecommendedFor>
                </>
              ) : (
                <>
                  {/* Virtual Tour Mode */}
                  <ModeTitle>🖥️ Virtual Tour Mode</ModeTitle>
                  <FeatureList>
                    <FeatureItem>
                      🏞️ Virtual walkthrough of the canyon
                    </FeatureItem>
                    <FeatureItem>
                      ⭐ Decide which structures are your favorite
                    </FeatureItem>
                    <FeatureItem>
                      📝 Learn about structures even from afar
                    </FeatureItem>
                  </FeatureList>
                  <RecommendedFor>
                    <RecommendedText>Recommended For:</RecommendedText>
                    Remote enthusiasts
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

            <Text>
              Whether you&apos;re on-site or browsing from home, dive deeper
              into the stories and innovations that make this place special.
              Download now to start your exploration.
            </Text>
          </ModeContent>
        </Section>

        {/* 
      Getting There Section
       */}
        <Section>
          <SectionTitle>How do I get there?</SectionTitle>
          <Text>
            Access the area by walking along Poly Canyon Road on campus. The
            interactive map below shows the route, or use AllTrails and Google
            Maps for detailed directions.
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
      <div>Info Page Content</div>
    </>
  );
};

// Used in Index.js
export default InfoPage;

/*
Components to fix:
1. Move body paragraphs to surround photogrid
2. Reduce padding/margins on geology 
3. Scale up bullets in the mode picker
4. Scale up tips to visit, add live API?

*/

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
  TitleTagline,

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
} from './InfoPage.styles.js';

// Separate components
import PhotoGrid from './PhotoGrid.js';
import GoogleMapsRoute from './GoogleMapsRoute.js';

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
    caption:
      'The iconic canyon entrance, built using locally quarried serpentinite rock. This gateway marks the transition from campus to experimental ground.',
  },
  {
    src: shellHouseConstruct,
    alt: 'Shell House Under Construction',
    caption:
      'Construction of the Shell House, a pioneering structure using tensioned cables and sprayed concrete to create its distinctive curved form. This technique allowed students to explore thin-shell construction methods.',
  },
  {
    src: bridgeGroup,
    alt: 'Bridge House Group Photo',
    caption:
      'Students gathered at the Bridge House, one of the first structures to use Cor-ten steel in architectural applications. This weathering steel naturally develops a protective rust layer, eliminating the need for painting.',
  },
  {
    src: bladeRedesign,
    alt: 'Blade Structure Redesign',
    caption:
      'The 2006 redesign of the Blade Structure showcased advanced post-tensioning techniques. This project won recognition for its innovative approach to preserving and upgrading an existing experimental structure.',
  },
  {
    src: modHouseConstruction,
    alt: 'Modular House Construction',
    caption:
      'Students assembling the experimental Modular House frame. This project explored flexible living spaces and efficient construction methods through a system of interchangeable components.',
  },
  {
    src: geodesicDome,
    alt: 'Geodesic Dome Construction',
    caption:
      "Student team constructing the West Coast's first geodesic dome, demonstrating Buckminster Fuller's principles of efficient structural design through geometric forms.",
  },
  {
    src: fratessaTower,
    alt: 'Fratessa Tower (Old Version)',
    caption:
      'The original Fratessa Tower utilized an unusual water-supported observation platform. Though later replaced, it demonstrated creative approaches to structural stability.',
  },
  {
    src: designVillage,
    alt: 'Design Village Competition',
    caption:
      'The annual Design Village competition transforms the canyon into a temporary architectural laboratory where students build and inhabit experimental shelters for a weekend.',
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
            Since the 1960s, this unique outdoor laboratory has been shaping the
            future of architecture and engineering. It all began when founding
            Dean George Hasslein negotiated with Cal Poly president Robert
            Kennedy to secure this 9-acre plot for student experimentation. What
            started as an ambitious idea has grown into one of the most
            distinctive architectural teaching spaces in the country, featured
            in National Geographic and the Discovery Channel.
            <br />
            <br />
            Over decades, students have pushed the boundaries of design and
            construction here, testing everything from innovative materials to
            experimental building techniques. Each structure tells a story of
            learning through doing - some have stood the test of time, while
            others have evolved or been replaced, all contributing to the
            canyon&apos;s living legacy of hands-on education.
          </Text>

          {/* Statistics Section - Web Only*/}
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
            The canyon&apos;s landscape tells a dramatic geological story shaped
            by the collision of tectonic forces, unique water features, and
            diverse soil types. This complex terrain provides both challenges
            and opportunities for architectural innovation.
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
                    The area sits at the intersection of the Pacific and North
                    American Plates, whose movement created the parallel ridges
                    and valleys of the Santa Lucia Mountains. The canyon itself
                    contains the unique Franciscan Formation - a complex mixture
                    of fragmented rock and sediment that gives the area its
                    distinctive character.
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
                    Where serpentine rock meets other formations, natural
                    springs emerge, creating a vital water source that has
                    supported life here for centuries. These springs once served
                    the original San Luis Obispo Mission community and continue
                    to influence the canyon&apos;s ecosystem today.
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
                    The canyon&apos;s soils range from stable Class I to
                    challenging Class V, with unique varieties like Los Osos
                    soils (featuring a heavy clay sublayer) and Diablo soils
                    (known for extreme shrink-swell properties). This variety of
                    soil conditions creates an ideal testing ground for
                    different foundation and construction techniques.
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

        {/* Title Section */}

        <TitleSection>
          <Header>
            <Subtitle>Welcome to</Subtitle>
            <Title>Poly Canyon</Title>
            <TitleTagline>A Living Laboratory of Design</TitleTagline>
          </Header>
        </TitleSection>

        {/*
      General Information Section 
      */}
        <Section>
          <SectionTitle>What is Poly Canyon?</SectionTitle>

          {/* ADD A ROTATING QUOTE BOARD ANSWERING QUESTION ABOVE */}

          {/* Poly Canyon Overview */}
          <Text style={{ textAlign: 'left' }}>
            Poly Canyon is a 9-acre outdoor laboratory where Cal Poly students
            have been building experimental structures since 1963. Just a mile
            from campus, it&apos;s home to over 30 unique architectural
            projects, ranging from innovative housing models to experimental
            bridges. The canyon sits within one of California&apos;s most
            complex geological regions, where volcanic basalt meets serpentine
            rock, creating a challenging and dynamic building environment.
            <br />
            <br />
            These aren&apos;t just display pieces. Each structure was designed
            and built by students testing new ideas in real-world conditions.
            The projects showcase everything from sustainable design principles
            to experimental construction techniques, with some using innovative
            materials like post-tensioned steel and sprayed concrete. Some
            projects succeeded brilliantly, while others showed why certain
            ideas stayed theoretical – both outcomes equally valuable for
            learning.
          </Text>
          <PhotoGrid />

          <Text style={{ textAlign: 'left' }}>
            Whether you&apos;re interested in architecture, looking for a
            different kind of hike, or just want to experience what makes Cal
            Poly unique, it&apos;s worth checking out. The canyon represents one
            of the most tangible examples of the &quot;Learn by Doing&quot;
            philosophy, and it&apos;s one of the few places in the world where
            students can design, build, and test full-scale architectural
            projects. As an added bonus, you&apos;ll find yourself in one of the
            campus&apos;s most scenic areas, where native grasslands (part of
            just 5% remaining in California) meet oak woodlands and
            chaparral-covered slopes.
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
            style={{ width: '60%', height: 'auto', borderRadius: '10px' }}
          />

          <Text>
            Your personal guide to exploring these architectural wonders. Find
            your way around with interactive maps, uncover the stories behind
            each structure, and track your progress as you discover the area.
            The app transforms a simple walk through the canyon into an
            immersive educational experience, combining historical photos,
            architectural insights, and location-aware features to bring each
            structure&apos;s story to life.
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
                      🗺️ Interactive detailed map with real-time location
                      tracking
                    </FeatureItem>
                    <FeatureItem>
                      ✅ Tracking of visited structures with progress indicators
                    </FeatureItem>
                    <FeatureItem>
                      📚 Access deep information and the historical narratives
                    </FeatureItem>
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
                      🏞️ Virtual walkthrough of the canyon to explore
                    </FeatureItem>
                    <FeatureItem>
                      ⭐ Decide which structures are your favorites
                    </FeatureItem>
                    <FeatureItem>
                      📝 Learn the history of the structures even from afar
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
              into the stories and innovations that make this place special. The
              app enhances both physical and virtual visits - providing
              real-time navigation and structure recognition for on-site
              explorers, while offering a virtual tour and detailed structure
              information for remote visitors. Every feature is designed to make
              the canyon&apos;s rich architectural history accessible, no matter
              how you choose to explore. Download now to start your exploration.
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
            takes about 20 minutes to walk from campus. The wide, gently sloping
            road makes it perfect for mountain biking, while runners enjoy the
            moderate incline for training. During the day, you&apos;ll be
            treated to sweeping views of rolling hills and coastal mountains,
            while clear nights offer excellent stargazing opportunities away
            from city lights. It&apos;s equally rewarding as a quick
            architectural tour or a longer nature expedition.
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
              🌞 Visit during daylight hours for the best experience -
              structures are most photogenic in morning or late afternoon light
            </FeatureItem>
            <FeatureItem>
              🏞️ Watch for wildlife and horses - keep your distance and respect
              their space. You might spot deer, hawks, and various native bird
              species
            </FeatureItem>
            <FeatureItem>
              👟 Bring water and wear hiking shoes - the terrain can be uneven,
              especially when exploring around structures
            </FeatureItem>
            <FeatureItem>
              🌡️ Check the weather before you go - the canyon can get hot during
              summer afternoons and muddy after rain
            </FeatureItem>
            <FeatureItem>
              📱 Download the app before your visit - cell service can be spotty
              in some areas of the canyon
            </FeatureItem>
          </VisitTips>
        </Section>
      </PageContainer>
    </>
  );
};

// Used in Index.js
export default InfoPage;

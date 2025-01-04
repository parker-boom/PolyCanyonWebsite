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
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaChevronRight,
  FaMapMarkerAlt,
  FaWalking,
  FaSearch,
  FaBook,
  FaLandmark,
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

  // DiveDeeper styles
  DiveDeeperTitle,
  NavigationButtons,
  NavButton,
  NavButtonTitle,
  NavButtonSubtitle,
  NavButtonIcon,
} from './InfoPage.styles.js';

// Separate components
import PhotoGrid from './PhotoGrid.js';
import GoogleMapsRoute from './GoogleMapsRoute.js';

// App screenshot
import appPreview from '../assets/appPreview.png';

/*
CONSTANTS
*/

// Rendered component
const InfoPage = () => {
  // Variables for state
  const [currentMode, setCurrentMode] = useState('adventure');

  // Change adventure/virtual mode
  const handleModeChange = (mode) => {
    setCurrentMode(mode);
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
        <meta property="og:url" content="https://polycanyon.com/info" />
        <meta
          name="twitter:title"
          content="Discover the Poly Canyon Architectural Area"
        />
        <meta
          name="twitter:description"
          content="Uncover the details of this outdoor architectural space and see how the app enhances your visit with an interactive experience."
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
        </Section>

        <Section>
          <DiveDeeperTitle>Want to dive deeper?</DiveDeeperTitle>
          <NavigationButtons>
            <NavButton to="/chronicles" $type="chronicles">
              <NavButtonIcon $type="chronicles">
                <FaBook />
              </NavButtonIcon>
              <NavButtonTitle $type="chronicles">Chronicles</NavButtonTitle>
              <NavButtonSubtitle>Interactive Learning</NavButtonSubtitle>
            </NavButton>
            <NavButton to="/structures" $type="structures">
              <NavButtonIcon $type="structures">
                <FaLandmark />
              </NavButtonIcon>
              <NavButtonTitle $type="structures">Structures</NavButtonTitle>
              <NavButtonSubtitle>Complete Research</NavButtonSubtitle>
            </NavButton>
          </NavigationButtons>
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
            educational experience, combining historical photos, architectural
            insights, and location-aware features to bring each structure&apos;s
            story to life.
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

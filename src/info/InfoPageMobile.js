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
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaChevronRight,
  FaMapMarkerAlt,
  FaWalking,
  FaSearch,
} from 'react-icons/fa';

// Styles
import {
  // Global styles
  PageContainer,
  GlobalStyle,
  Section,
  SectionTitle,
  Text,

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
} from './InfoPage.styles.js';

// Separate components
import PhotoGridMobile from './PhotoGridMobile.js';
import GoogleMapsRoute from './GoogleMapsRoute.js';

// App screenshot
import appPreview from '../assets/appPreview.png';

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
              minWidth: '350px',
              minHeight: 'auto',
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

import React, { useState } from 'react';
import { FaApple, FaAndroid, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaWalking, FaSearch, FaHistory, FaGlobeAmericas, FaRunning, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  PageContainer,
  ContentContainer,
  Header,
  Title,
  Subtitle,
  Section,
  SectionTitle,
  CarouselContainer,
  CarouselSlide,
  CarouselImage,
  CarouselTitle,
  CarouselDescription,
  CarouselButton,
  PickerContainer,
  PickerTab,
  SubSection,
  ImageSlideshow,
  InfographicPlaceholder,
  PictureSlideshow,
  CalloutBox,
  ModeSelector,
  ModeButton,
  FeatureList,
  FeatureItem,
  DownloadSection,
  DownloadButton,
  VisitTips,
  VisitTipsTitle,
  ButtonContainer,
  DownloadCTA,
  AllTrailsButton,
  GoogleMapsButton,
  GlobalStyle,
  ModeContent,
  RecommendedFor,
  RecommendedText,
  TitleSection,
  Text,
  ModeTitle,
  MoreInfoToggle,
  MoreInfoContent,
  ImprovedPicker,
  PickerButton,
  MoreInfoContainer,
  PickerContent,
  PickerTitle,
  ModeInfoBox,
} from './InfoPage.styles';
import PhotoGrid from './PhotoGrid';

import geodesicDome from '../assets/structures/a1.jpg';
import shellHouse from '../assets/structures/a2.jpg';
import greenHouse from '../assets/structures/a3.jpg';
import appPreview from '../assets/appPreview.png';

// Placeholder images for General Information
const overviewImages = [
  geodesicDome,
  shellHouse,
  greenHouse,
  // Add more images as needed
];

// Placeholder images for Historical Background
const historicalImages = [
  geodesicDome,
  shellHouse,
  greenHouse,
  // Add more images as needed
];

// Placeholder images for Current Status and Activities (Design Village)
const designVillageImages = [
  geodesicDome,
  shellHouse,
  greenHouse,
  // Add more images as needed
];

const InfoPage = () => {
  
  const [currentPicker, setCurrentPicker] = useState('history');
  const [currentMode, setCurrentMode] = useState('adventure');
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  const toggleMoreInfo = () => {
    setIsMoreInfoOpen(!isMoreInfoOpen);
  };

  const pickerContent = {
    history: {
      title: "A Rich Architectural Legacy",
      content: (
        <>
          <ImageSlideshow>
            {historicalImages.map((image, index) => (
              <CarouselImage key={index} src={image} alt={`Historical Poly Canyon ${index + 1}`} loading="lazy" />
            ))}
          </ImageSlideshow>
          <Text>
            Founded in 1963 by Dean George Hasslein, Poly Canyon was envisioned as a dynamic space where Cal Poly students could bring their architectural dreams to life. From the very beginning, it embodied the university's "Learn by Doing" philosophy, serving as an outdoor laboratory for innovative designs and hands-on experimentation. Over the decades, Poly Canyon has been the birthplace of countless student projects, including the renowned annual Design Village competition, which attracts aspiring architects from across California. This competition not only showcases creative architectural solutions but also fosters a spirit of collaboration and community. Highlighted in publications like National Geographic, Poly Canyon stands as a testament to student ingenuity and the enduring legacy of experiential learning. Despite the university scaling back active support in 2009, the canyon continues to thrive through student-led initiatives, maintaining its role as a unique hub for architectural exploration and sustainable design.
          </Text>
        </>
      ),
    },
    geology: {
      title: "A Landscape Shaped by Time",
      content: (
        <>
          <Text>
            Poly Canyon's landscape is a fascinating blend of geological forces shaped by the relentless movement of the Pacific and North American Plates. This tectonic activity has carved out the Franciscan Formation and created striking serpentine outcrops that define the canyon's rugged beauty. The area is home to serpentinite springs, where water interacts with serpentine rocks, adding to the canyon's unique ecological and geological character. The Mediterranean climate, with its mild, wet winters and hot, dry summers, supports a diverse array of native vegetation, from resilient grasses to lush riparian zones. Varied soil types, ranging from stable Class I soils to more challenging Class V and VI soils, influence the distribution of plant communities and offer rich opportunities for ecological study. This intricate interplay between geology, climate, and biology not only enhances the canyon's natural beauty but also provides a fertile ground for sustainable architectural practices and environmental education.
          </Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <InfographicPlaceholder>Infographic 1</InfographicPlaceholder>
            <InfographicPlaceholder>Infographic 2</InfographicPlaceholder>
            <InfographicPlaceholder>Infographic 3</InfographicPlaceholder>
          </div>
        </>
      ),
    },
    activities: {
      title: "The Living Laboratory",
      content: (
        <>
          <Text>
            Since 2009, the university has ceased active support for Poly Canyon, shifting the responsibility of maintenance and development to student initiatives. The annual Design Village competition continues to thrive, fostering creativity and collaboration among students. Additionally, new projects are constantly being built and renovated, and the canyon remains a popular outdoor area for running, biking, training, stargazing, and other recreational activities.
          </Text>
          <Text>
            <strong>Design Village</strong>
            <br />
            Design Village is an annual competition hosted by Cal Poly's College of Architecture and Environmental Design that brings together students from various institutions to design, build, and inhabit temporary structures in Poly Canyon. Participants create inhabitable shelters based on a specific theme each year, transporting materials by hand up a mile-long uphill path to assemble their structures without power tools. The event emphasizes collaboration, creativity, and real-world application of architectural skills, culminating in a vibrant community experience with social activities such as a Night Market and concerts.
          </Text>
          <PictureSlideshow>
            {designVillageImages.map((image, index) => (
              <CarouselImage key={index} src={image} alt={`Design Village ${index + 1}`} loading="lazy" />
            ))}
          </PictureSlideshow>
        </>
      ),
    },
  };

  return (
    <PageContainer>
      <GlobalStyle />

        {/* Title Section */}
        {window.innerWidth > 768 && (
          <TitleSection>
            <Header>
              <Title>Discover The Canyon!</Title>
              <Subtitle>An Architect's Playground</Subtitle> 
            </Header>
          </TitleSection>
        )}

        {/* General Information Section */}
        <Section>
          <SectionTitle>What is Poly Canyon?</SectionTitle>
          
          <Text>
            Poly Canyon is a living testament to the power of hands-on learning and architectural innovation. Nestled in the hills just a mile from Cal Poly's main campus, this 9-acre outdoor classroom has been inspiring students since 1963. Here, amidst the natural beauty of the landscape, aspiring architects and designers transform their boldest ideas into reality, creating structures that challenge conventions and push the boundaries of design. The canyon is dotted with over 30 permanent projects, each telling a unique story of student creativity, collaboration, and problem-solving. In this extraordinary space, the theoretical becomes tangible, and students don't just learn about architecture – they live it, breathe it, and build it with their own hands.
          </Text>
          <PhotoGrid />

          <MoreInfoContainer>
            {!isMoreInfoOpen && (
              <MoreInfoToggle onClick={toggleMoreInfo}>
                Learn More
                <FaChevronDown />
              </MoreInfoToggle>
            )}

            {isMoreInfoOpen && (
              <MoreInfoContent>
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
                  <PickerButton
                    active={currentPicker === 'activities'}
                    onClick={() => setCurrentPicker('activities')}
                  >
                    <FaRunning />
                    Activities
                  </PickerButton>
                </ImprovedPicker>

                <PickerContent>
                  <PickerTitle>{pickerContent[currentPicker].title}</PickerTitle>
                  {pickerContent[currentPicker].content}
                </PickerContent>

                <MoreInfoToggle onClick={toggleMoreInfo} style={{ marginTop: '30px' }}>
                  Show Less
                  <FaChevronUp />
                </MoreInfoToggle>
              </MoreInfoContent>
            )}
          </MoreInfoContainer>
        </Section>

        {/* Poly Canyon App Section */}
        <Section>
          <SectionTitle>What is the Poly Canyon App?</SectionTitle>

          <img src={appPreview} alt="Poly Canyon App Preview" loading="lazy" style={{ width: '60%', height: 'auto', borderRadius: '10px' }} />

          <Text>
            The app serves as your guide to navigating the area and learning more about its structures. It enhances your exploration by providing interactive maps and detailed information, making it easier to discover and appreciate the innovative architectural projects within the canyon and their rich history.
          </Text>

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

          <ModeContent mode={currentMode}>
            <ModeInfoBox>
              {currentMode === 'adventure' ? (
                <>
                  <ModeTitle>🧭 Adventure Mode</ModeTitle>
                  <FeatureList>
                    <FeatureItem>🗺️ Interactive map for easy navigation</FeatureItem>
                    <FeatureItem>✅ Automatic tracking of visited structures</FeatureItem>
                    <FeatureItem>📚 In-depth historical insights</FeatureItem>
                  </FeatureList>
                  <RecommendedFor>
                    <RecommendedText>Recommended For:</RecommendedText>
                    On-site explorers
                  </RecommendedFor>
                </>
              ) : (
                <>
                  <ModeTitle>🖥️ Virtual Tour Mode</ModeTitle>
                  <FeatureList>
                    <FeatureItem>🏞️ Virtual walkthrough of the canyon</FeatureItem>
                    <FeatureItem>⭐ Decide which structures are your favorite</FeatureItem>
                    <FeatureItem>📝 Learn about structures even from afar</FeatureItem>
                  </FeatureList>
                  <RecommendedFor>
                    <RecommendedText>Recommended For:</RecommendedText>
                    Remote enthusiasts
                  </RecommendedFor>
                </>
              )}



          <ButtonContainer>
            <DownloadCTA to="/download">
              {currentMode === 'adventure' ? 'Start Your Adventure' : 'Explore Virtually'}
              <FaChevronRight style={{ marginLeft: '10px', fontSize: '0.8em' }} />
            </DownloadCTA>
          </ButtonContainer>

          </ModeInfoBox>
          </ModeContent>

          <Text>
            The app is an educational tool to help you learn more about this truly one-of-a-kind place. Whether you're walking through the canyon or exploring virtually, the app will help you appreciate the structures and their stories.
          </Text>
        </Section>

        {/* Getting There Section */}
        <Section>
          <SectionTitle>How do I get there?</SectionTitle>
          <Text>
            Poly Canyon is accessible via Poly Canyon Road. Use the interactive map below or follow the step-by-step directions to reach the canyon. For more detailed directions, visit our All Trails and Google Maps links.
          </Text>
          {/* Map Placeholder */}
          <div style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
            {/* Future implementation of embedded map */}
            Map Placeholder
          </div>
          <Text>
            Whether you prefer hiking, biking, or running, there are various routes to reach Poly Canyon. Popular trails include AllTrails and Google Maps routes tailored for different modes of transportation.
          </Text>
          <ButtonContainer>
            <AllTrailsButton href="https://www.alltrails.com/trail/us/california/architecture-graveyard-hike-private-property?sh=rvw6ps" target="_blank" rel="noopener noreferrer">
              <FaWalking /> All Trails
            </AllTrailsButton>
            <GoogleMapsButton href="https://maps.app.goo.gl/H8Dq6Y5x1E6pQJzk9" target="_blank" rel="noopener noreferrer">
              <FaMapMarkerAlt /> Google Maps
            </GoogleMapsButton>
          </ButtonContainer>
          <VisitTipsTitle>Tips for Visiting:</VisitTipsTitle>
          <VisitTips>
            <FeatureItem>🌞 Poly Canyon is best visited during daylight hours, offering the best visibility for appreciating the structures.</FeatureItem>
            <FeatureItem>🏞️ Remember, you're entering a protected outdoor space. It's home to diverse wildlife, including horses, so please respect both the natural environment and the architectural wonders.</FeatureItem>
            <FeatureItem>👟 Wear comfortable shoes and bring water – there's a lot to explore!</FeatureItem>
          </VisitTips>
        </Section>
    </PageContainer>
  );
};

export default InfoPage;
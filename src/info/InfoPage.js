import React, { useState } from 'react';
import { FaApple, FaAndroid, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaWalking } from 'react-icons/fa';
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
} from './InfoPage.styles';

import geodesicDome from '../assets/geodesic-dome.jpg';
import shellHouse from '../assets/shell-house.jpg';
import greenHouse from '../assets/green-house.jpg';

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
  const [currentMode, setCurrentMode] = useState('explorer');
  /*
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = (imagesLength) => {
    setCurrentSlide((prev) => (prev + 1) % imagesLength);
  };

  const prevSlide = (imagesLength) => {
    setCurrentSlide((prev) => (prev - 1 + imagesLength) % imagesLength);
  }; */ 

  return (
    <PageContainer>
      <ContentContainer>

        {/* Title Section */}
        <Header>
          <Title>Discover Poly Canyon</Title>
          <Subtitle>An Architecture Playground</Subtitle>
        </Header>

        {/* General Information Section */}
        <Section>
          <SectionTitle>What is Poly Canyon</SectionTitle>
          {/* Picture Grid Placeholder */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            {overviewImages.map((image, index) => (
              <CarouselImage key={index} src={image} alt={`Poly Canyon Overview ${index + 1}`} loading="lazy" />
            ))}
          </div>
          <p>
          Poly Canyon is a living testament to the power of hands-on learning and architectural innovation. Nestled in the hills just a mile from Cal Poly's main campus, this 9-acre outdoor classroom has been inspiring students since 1963. Here, amidst the natural beauty of the landscape, aspiring architects and designers transform their boldest ideas into reality, creating structures that challenge conventions and push the boundaries of design. The canyon is dotted with over 30 permanent projects, each telling a unique story of student creativity, collaboration, and problem-solving. In this extraordinary space, the theoretical becomes tangible, and students don't just learn about architecture – they live it, breathe it, and build it with their own hands.
          </p>
        </Section>

        {/* Picker Section */}
        <Section>
          <PickerContainer>
            <PickerTab
              active={currentPicker === 'history'}
              onClick={() => setCurrentPicker('history')}
            >
              History
            </PickerTab>
            <PickerTab
              active={currentPicker === 'geology'}
              onClick={() => setCurrentPicker('geology')}
            >
              Geology
            </PickerTab>
            <PickerTab
              active={currentPicker === 'activities'}
              onClick={() => setCurrentPicker('activities')}
            >
              Activities
            </PickerTab>
          </PickerContainer>

          {/* Subsections based on Picker */}
          {currentPicker === 'history' && (
            <SubSection>
              <SectionTitle>What is the History of the Canyon</SectionTitle>
              {/* Simple Image Slideshow Placeholder */}
              <ImageSlideshow>
                {historicalImages.map((image, index) => (
                  <CarouselImage key={index} src={image} alt={`Historical Poly Canyon ${index + 1}`} loading="lazy" />
                ))}
              </ImageSlideshow>
              <p>
                Founded in 1963 by Dean George Hasslein, Poly Canyon was envisioned as a dynamic space where Cal Poly students could bring their architectural dreams to life. From the very beginning, it embodied the university’s "Learn by Doing" philosophy, serving as an outdoor laboratory for innovative designs and hands-on experimentation. Over the decades, Poly Canyon has been the birthplace of countless student projects, including the renowned annual Design Village competition, which attracts aspiring architects from across California. This competition not only showcases creative architectural solutions but also fosters a spirit of collaboration and community. Highlighted in publications like National Geographic, Poly Canyon stands as a testament to student ingenuity and the enduring legacy of experiential learning. Despite the university scaling back active support in 2009, the canyon continues to thrive through student-led initiatives, maintaining its role as a unique hub for architectural exploration and sustainable design.
              </p>
            </SubSection>
          )}

          {currentPicker === 'geology' && (
            <SubSection>
              <SectionTitle>What is the Geology of the Canyon?</SectionTitle>
              <p>
              Poly Canyon's landscape is a fascinating blend of geological forces shaped by the relentless movement of the Pacific and North American Plates. This tectonic activity has carved out the Franciscan Formation and created striking serpentine outcrops that define the canyon's rugged beauty. The area is home to serpentinite springs, where water interacts with serpentine rocks, adding to the canyon's unique ecological and geological character. The Mediterranean climate, with its mild, wet winters and hot, dry summers, supports a diverse array of native vegetation, from resilient grasses to lush riparian zones. Varied soil types, ranging from stable Class I soils to more challenging Class V and VI soils, influence the distribution of plant communities and offer rich opportunities for ecological study. This intricate interplay between geology, climate, and biology not only enhances the canyon's natural beauty but also provides a fertile ground for sustainable architectural practices and environmental education.
              </p>
              {/* Infographic Placeholders */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <InfographicPlaceholder>Infographic 1</InfographicPlaceholder>
                <InfographicPlaceholder>Infographic 2</InfographicPlaceholder>
                <InfographicPlaceholder>Infographic 3</InfographicPlaceholder>
              </div>
            </SubSection>
          )}

          {currentPicker === 'activities' && (
            <SubSection>
              <SectionTitle>Current Status and Activities</SectionTitle>
              <p>
                Since 2009, the university has ceased active support for Poly Canyon, shifting the responsibility of maintenance and development to student initiatives. The annual Design Village competition continues to thrive, fostering creativity and collaboration among students. Additionally, new projects are constantly being built and renovated, and the canyon remains a popular outdoor area for running, biking, training, stargazing, and other recreational activities.
              </p>
              <p>
                <strong>Design Village</strong>
                <br />
                Design Village is an annual competition hosted by Cal Poly's College of Architecture and Environmental Design that brings together students from various institutions to design, build, and inhabit temporary structures in Poly Canyon. Participants create inhabitable shelters based on a specific theme each year, transporting materials by hand up a mile-long uphill path to assemble their structures without power tools. The event emphasizes collaboration, creativity, and real-world application of architectural skills, culminating in a vibrant community experience with social activities such as a Night Market and concerts.
              </p>
              {/* Picture Slideshow Placeholder */}
              <PictureSlideshow>
                {designVillageImages.map((image, index) => (
                  <CarouselImage key={index} src={image} alt={`Design Village ${index + 1}`} loading="lazy" />
                ))}
              </PictureSlideshow>
            </SubSection>
          )}
        </Section>

        {/* Current Value and Future Needs Section */}
        <Section>
          <CalloutBox>
            <p>
              Poly Canyon remains the only place of its kind in the world, serving as a vital space for learning, innovation, and community engagement. To ensure its preservation and continued growth, ongoing investment and support are essential. By investing in Poly Canyon, we can maintain its legacy as a hub for architectural excellence and hands-on education for future generations.
            </p>
          </CalloutBox>
        </Section>

        {/* Poly Canyon App Section */}
        <Section>
          <SectionTitle>What is the Poly Canyon App?</SectionTitle>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={geodesicDome} alt="Poly Canyon App Logo" style={{ width: '150px', height: '150px' }} />
          </div>
          <p>
            The Poly Canyon App serves as your guide to navigating the area and learning more about its structures. It enhances your exploration experience by providing interactive maps and detailed information, making it easier to discover and appreciate the innovative architectural projects within Poly Canyon.
          </p>

          <ModeSelector>
            <ModeButton 
              active={currentMode === 'adventure'} 
              onClick={() => setCurrentMode('adventure')}
            >
              Adventure Mode
            </ModeButton>
            <ModeButton 
              active={currentMode === 'virtual'} 
              onClick={() => setCurrentMode('virtual')}
            >
              Virtual Tour Mode
            </ModeButton>
          </ModeSelector>

          {currentMode === 'adventure' ? (
            <>
              <h3>🧭 Adventure Mode</h3>
              <FeatureList>
                <FeatureItem>🗺️ Interactive map for easy navigation</FeatureItem>
                <FeatureItem>✅ Automatic tracking of visited structures</FeatureItem>
                <FeatureItem>📚 In-depth historical insights for each structure</FeatureItem>
              </FeatureList>
              <p><strong>Recommended For:</strong> Students and in-person visitors looking to actively engage with the canyon.</p>
            </>
          ) : (
            <>
              <h3>🖥️ Virtual Tour Mode</h3>
              <FeatureList>
                <FeatureItem>🏞️ Virtual walkthrough of the canyon</FeatureItem>
                <FeatureItem>⭐ Decide which structures are your favorite</FeatureItem>
                <FeatureItem>📝 Learn about structures even from afar</FeatureItem>
              </FeatureList>
              <p><strong>Recommended For:</strong> Remote explorers and virtual visitors seeking an immersive educational experience.</p>
            </>
          )}

          <p>
            The Poly Canyon App is an educational tool that enhances your visit to the area by providing detailed information and easy navigation. Whether you're walking through the canyon or exploring virtually, the app enriches your experience with comprehensive insights into each structure.
          </p>
          <DownloadSection>
            <h3>Download now!</h3>
            <div>
              <DownloadButton href="https://apps.apple.com/us/app/poly-canyon/id6499063781" target="_blank" rel="noopener noreferrer">
                <FaApple /> Apple
              </DownloadButton>
              <DownloadButton href="https://play.google.com/store/apps/details?id=com.polycanyon&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
                <FaAndroid /> Android
              </DownloadButton>
            </div>
          </DownloadSection>
          <ButtonContainer>
            <DownloadCTA to="/download">Start Your Adventure</DownloadCTA>
            <DownloadCTA to="/download">Explore Virtually</DownloadCTA>
          </ButtonContainer>
        </Section>

        {/* Getting There Section */}
        <Section>
          <SectionTitle>How do I get there?</SectionTitle>
          <p>
            Poly Canyon is accessible via Poly Canyon Road. Use the interactive map below or follow the step-by-step directions to reach the canyon. For more detailed directions, visit our All Trails and Google Maps links.
          </p>
          {/* Map Placeholder */}
          <div style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
            {/* Future implementation of embedded map */}
            Map Placeholder
          </div>
          <p>
            Whether you prefer hiking, biking, or running, there are various routes to reach Poly Canyon. Popular trails include AllTrails and Google Maps routes tailored for different modes of transportation.
          </p>
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

          <ButtonContainer>
            <DownloadCTA to="/download">Download the App</DownloadCTA>
          </ButtonContainer>
        </Section>

      </ContentContainer>
    </PageContainer>
  );
};

export default InfoPage;

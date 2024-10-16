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
  CTAButtonWrapper,
  CTAButton,
  CTAButtonText,
  CTAButtonIcon,
  InfographicIcon,
  GreenTitle,
  ResponsiveRow,
  InfographicSquare,
  InfoTextBox,
  InfographicContainer,
  InfoText,
  StatBox,
  ArrowButtonImage,
  CarouselCaption,
  CarouselImageContainer,
  BackgroundImage,
  CaptionTitle,
  CaptionText,
} from './InfoPage.styles';
import PhotoGrid from './PhotoGrid';
import GoogleMapsRoute from './GoogleMapsRoute';

import shellHouse from '../assets/structures/a2.jpg';
import greenHouse from '../assets/structures/a3.jpg';
import appPreview from '../assets/appPreview.png';

import bladeRedesign from '../assets/pchistory/bladeRedesign.png';
import designVillage from '../assets/pchistory/designVillage.webp';
import entryArch from '../assets/pchistory/entryArch.jpg';
import shellHouseConstruct from '../assets/pchistory/shellHouseConstruct.jpg';
import bridgeGroup from '../assets/pchistory/bridgeGroup.jpg';
import modHouseConstruction from '../assets/pchistory/modHouseConstruction.jpg';
import geodesicDome from '../assets/pchistory/geodesicDome.jpg';
import fratessaTower from '../assets/pchistory/fratessaTowerb4.jpg';


// Placeholder images for General Information
const overviewImages = [
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


const historicalImages = [
  {
    src: entryArch,
    alt: 'Entry Arch',
    caption: 'This early photo shows the Entry Arch, a defining feature of the canyon’s entrance. Built using local serpentinite rock, the arch serves as both a functional gateway and a symbolic marker of the creative and experimental spirit within the canyon.'
  },
  {
    src: shellHouseConstruct,
    alt: 'Shell House Under Construction',
    caption: 'This photo shows a worker inside the Shell House during its construction, surrounded by tools. The structure, built in multiple phases, is notable for its unique roof formed with cables and sprayed concrete, showcasing the hands-on approach to experimental architecture in the canyon.'
  },
  {
    src: bridgeGroup,
    alt: 'Bridge House Group Photo',
    caption: 'Students pose on the incomplete Bridge House in Poly Canyon, representing a range of careers available through a Cal Poly education. The Bridge House, one of the first structures to use Cor-ten steel, exemplifies the innovative, hands-on design and engineering projects that define the canyon.'
  },
  {
    src: bladeRedesign,
    alt: 'Blade Structure Redesign',
    caption: 'The design team, including students and faculty from Cal Poly’s Architectural Engineering department, collaborated with alumni to redesign the Blade Structure using advanced post-tensioning techniques. The new design featured a catenary arch, blending structural precision with artistic vision. This innovative approach earned the team an Award of Excellence in 2006 from the Post Tensioning Institute.'
  },
  {
    src: modHouseConstruction,
    alt: 'Modular House Construction',
    caption: 'Two men work on the Modular House, one of the experimental structures built in the canyon. Originally a fully enclosed space, the structure has since been hollowed out, leaving behind only its frame. The Modular House exemplifies the canyon’s evolving architecture and experimentation.'
  },
  {
    src: geodesicDome,
    alt: 'Geodesic Dome Construction',
    caption: 'This image captures students constructing the first structure in Poly Canyon, Cal Poly’s geodesic dome. Originally built on campus after a lecture by Buckminster Fuller, the dome was later moved to the canyon. As one of the earliest geodesic domes on the West Coast, it became a symbol of student innovation and remains an iconic representation of the “learn by doing” philosophy.'
  },
  {
    src: fratessaTower,
    alt: 'Fratessa Tower (Old Version)',
    caption: 'This image shows the original observation tower in Poly Canyon, built with a water column for structural support. Due to leakage issues, the tower was eventually decommissioned and later replaced by the current Fratessa Tower, which sits on the same foundations. The new tower preserves the original vision while addressing structural improvements.'
  },
  {
    src: designVillage,
    alt: 'Design Village Competition',
    caption: 'This image captures the bustling energy of the annual Design Village competition, where students construct temporary shelters on the canyon hillside. For over 50 years, this event has fostered creativity and collaboration, playing a crucial role in maintaining the canyon’s legacy as a hub for hands-on architectural experimentation.'
  },
];


const InfoPage = () => {

  const [currentPicker, setCurrentPicker] = useState('history');
  const [currentMode, setCurrentMode] = useState('adventure');
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  const toggleMoreInfo = () => {
    setIsMoreInfoOpen(!isMoreInfoOpen);
  };

  // Function to handle navigating to the next image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % historicalImages.length);
  };

  // Function to handle navigating to the previous image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + historicalImages.length) % historicalImages.length
    );
  };


  const pickerContent = {
    history: {
      title: "A Rich Architectural Legacy",
      content: (
        <>
          {/* Introductory text */}
          <Text>
            Poly Canyon's roots stretch back to the mid-20th century, when the first wave of student-driven projects began reshaping the landscape. Over the years, the canyon has become an iconic experimental ground where architecture, engineering, and environmental design students push the boundaries of creativity and innovation.
          </Text>

          {/* Statistics Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap' }}>
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

          {/* Image Carousel */}
          <CarouselContainer>
            <BackgroundImage src={historicalImages[currentImageIndex].src} />
            <CarouselImageContainer>
              <CarouselImage
                src={historicalImages[currentImageIndex].src}
                alt={historicalImages[currentImageIndex].alt}
              />
            </CarouselImageContainer>
            <ArrowButtonImage onClick={handlePrevImage}>&lt;</ArrowButtonImage>
            <ArrowButtonImage onClick={handleNextImage}>&gt;</ArrowButtonImage>
          </CarouselContainer>

          {/* Caption with Title */}
          <CarouselCaption>
            <CaptionTitle>{historicalImages[currentImageIndex].alt}</CaptionTitle>
            <CaptionText>{historicalImages[currentImageIndex].caption}</CaptionText>
          </CarouselCaption>
        </>
      ),
    },
    geology: {
      title: "A Landscape Shaped by Time",
      content: (
        <>
          <Text>
            The canyon's landscape is shaped by tectonic forces, serpentine springs, and varied soil types. This intricate interplay provides fertile ground for architectural and ecological study.
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            {/* Infographic 1 */}
            <ResponsiveRow>
              <InfographicContainer>
                <InfographicSquare>
                  <InfographicIcon>🌍</InfographicIcon>
                </InfographicSquare>
                <InfoTextBox>
                  <GreenTitle>Tectonic Forces</GreenTitle>
                  <InfoText>
                    The canyon's geological features are the result of tectonic activity. The Pacific and North American Plates' movements have created formations like the Franciscan Formation and serpentine outcrops.
                  </InfoText>
                </InfoTextBox>
              </InfographicContainer>
            </ResponsiveRow>

            {/* Infographic 2 */}
            <ResponsiveRow>
              <InfographicContainer>
                <InfographicSquare>
                  <InfographicIcon>💧</InfographicIcon>
                </InfographicSquare>
                <InfoTextBox>
                  <GreenTitle>Serpentine Springs</GreenTitle>
                  <InfoText>
                    Unique springs form where water flows through serpentine rocks. These springs provide essential water to local ecosystems, creating a distinct ecological character.
                  </InfoText>
                </InfoTextBox>
              </InfographicContainer>
            </ResponsiveRow>

            {/* Infographic 3 */}
            <ResponsiveRow>
              <InfographicContainer>
                <InfographicSquare>
                  <InfographicIcon>🌱</InfographicIcon>
                </InfographicSquare>
                <InfoTextBox>
                  <GreenTitle>Diverse Soil</GreenTitle>
                  <InfoText>
                    The canyon's soils range from stable Class I soils to more challenging Class V soils, influencing vegetation growth and ecological diversity.
                  </InfoText>
                </InfoTextBox>
              </InfographicContainer>
            </ResponsiveRow>
          </div>
        </>
      ),
    },
    /*
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
    }, */
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

        {/* ADD A ROTATING QUOTE BOARD ANSWERING QUESTION ABOVE */}

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
                {/*
                <PickerButton
                  active={currentPicker === 'activities'}
                  onClick={() => setCurrentPicker('activities')}
                >
                  <FaRunning />
                  Activities
                </PickerButton>
                */}
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



            <CTAButtonWrapper>
              <CTAButton to="/download">
                <CTAButtonText>
                  {currentMode === 'adventure' ? 'Start Your Adventure' : 'Explore Virtually'}
                </CTAButtonText>
                <CTAButtonIcon>
                  <FaChevronRight />
                </CTAButtonIcon>
              </CTAButton>
            </CTAButtonWrapper>

          </ModeInfoBox>

          <Text>
            The app is an educational tool to help you learn more about this truly one-of-a-kind place. Whether you're walking through the canyon or exploring virtually, the app will help you appreciate the structures and their stories.
          </Text>
        </ModeContent>
      </Section>

      {/* Getting There Section */}
      <Section>
        <SectionTitle>How do I get there?</SectionTitle>
        <Text>
          Poly Canyon is accessible via Poly Canyon Road. Use the interactive map below or follow the step-by-step directions to reach the canyon. For more detailed directions, visit our All Trails and Google Maps links.
        </Text>
        <GoogleMapsRoute />
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

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaArrowLeft,
  FaTemperatureHigh,
  FaWind,
  FaHeart,
  FaExclamationTriangle,
  FaMountain,
  FaLayerGroup,
  FaWater,
  FaSun,
  FaTools,
  FaCompass,
  FaGem,
  FaArrowUp,
  FaRedo,
} from 'react-icons/fa';
import { timeStates } from './landData.js';

// Import plant images
import toyonImg from './plantImages/toyon.jpg';
import yuccaImg from './plantImages/yucca.jpg';
import monkeyflowerImg from './plantImages/monkeyflower.jpg';

// Import wildlife images
import horseImg from './animalImages/horse.png';
import lizardImg from './animalImages/lizard.png';
import rattlesnakeImg from './animalImages/rattlesnake.png';
import tarantulaImg from './animalImages/tarantula.png';

// Import geology images
import cantileverImg from './geologyImages/deck.jpg';

// Import hydrology image
import hydroMapImg from './hydroImages/hydroMap.png';

// CLIMATE STYLES
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
`;

const InfoDisplay = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(144, 238, 144, 0.2);
  gap: 30px;

  svg {
    font-size: 32px;
    color: ${(props) =>
      props.$primary ? '#90ee90' : 'rgba(144, 238, 144, 0.6)'};
  }
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
`;

const Value = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #90ee90;
`;

const TimeNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const TimeButton = styled.button`
  background: ${(props) =>
    props.$active ? 'rgba(0, 0, 0, 0.4)' : 'transparent'};
  border: 1px solid
    ${(props) => (props.$active ? '#90ee90' : 'rgba(144, 238, 144, 0.3)')};
  border-radius: 25px;
  padding: 10px 20px;
  color: ${(props) => (props.$active ? '#90ee90' : 'rgba(255, 255, 255, 0.7)')};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 16px;
  }

  &:hover {
    border-color: #90ee90;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const InteractiveLabel = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: rgba(144, 238, 144, 0.9);
  margin: 0 0 10px 0;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(144, 238, 144, 0.3);
  padding-bottom: 8px;
`;

export const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #90ee90;
  margin: 0;
  text-shadow: 0 0 10px rgba(144, 238, 144, 0.3);
  letter-spacing: 0.5px;
`;

// VEGETATION STYLES
const PlantCard = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const PlantContent = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const PlantImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid rgba(144, 238, 144, 0.3);
`;

const PlantInfo = styled.div`
  text-align: center;
`;

const PlantName = styled.h3`
  font-size: 24px;
  color: #90ee90;
  margin: 0;
`;

const PlantNickname = styled.div`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin: 5px 0 15px;
  font-style: italic;
`;

const PlantFact = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0;
`;

const NavButton = styled.button`
  position: absolute;
  ${(props) => props.position}: 20px;
  background: none;
  border: 1px solid rgba(144, 238, 144, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(144, 238, 144, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(144, 238, 144, 0.8);
    box-shadow: 0 0 15px rgba(144, 238, 144, 0.2);
  }
`;

// Wildlife styled components
const WildlifeCard = styled(PlantCard)`
  padding: 0;
  position: relative;
`;

const WildlifeContent = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
`;

const WildlifeImage = styled.div`
  width: calc(100% - 100px);
  height: 250px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 20px;
  box-shadow: 0 0 20px
    ${(props) =>
      props.$type === 'friendly'
        ? 'rgba(144, 238, 144, 0.2)'
        : 'rgba(237, 101, 101, 0.2)'};
`;

const WildlifeInfo = styled.div`
  width: 100%;
  height: 170px;
  padding: 10px 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid
    ${(props) =>
      props.$type === 'friendly'
        ? 'rgba(144, 238, 144, 0.2)'
        : 'rgba(255, 107, 107, 0.2)'};
`;

const WildlifeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const WildlifeName = styled.h3`
  font-size: 24px;
  color: ${(props) => (props.$type === 'friendly' ? '#90ee90' : '#ed6565')};
  margin: 0;
`;

const WildlifeTip = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0 0 15px 0;
  text-align: left;
`;

const WildlifeFact = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  line-height: 1.6;
  margin: 0;
  text-align: left;
`;

const ContentArea = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(144, 238, 144, 0.2);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 24px;
  color: #90ee90;
  margin: 0 0 20px 0;
`;

const GeologyImage = styled.img`
  width: 70%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  margin: 0 auto 20px auto;
  display: block;
`;

const PointsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Point = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #90ee90;

  span {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const RefreshButton = styled.button`
  background: none;
  border: 1px solid rgba(144, 238, 144, 0.3);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(144, 238, 144, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(144, 238, 144, 0.8);
    transform: rotate(180deg);
  }
`;

const RefreshIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Add this styled component
const HydroMap = styled.img`
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
  display: block;
  margin: 0 auto;
`;

// CLIMATE INTERACTIVE
export const ClimateInteractive = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTime = timeStates[currentIndex];

  return (
    <Container>
      <InteractiveLabel>{currentTime.interactiveLabel}</InteractiveLabel>
      <InfoDisplay
        key={currentTime.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <InfoCard>
          <currentTime.icon size={40} />
          <InfoContent>
            <Label>Conditions</Label>
            <Value>{currentTime.conditions}</Value>
          </InfoContent>
        </InfoCard>

        <InfoCard>
          <FaTemperatureHigh size={40} />
          <InfoContent>
            <Label>Temperature</Label>
            <Value>{currentTime.temp}</Value>
          </InfoContent>
        </InfoCard>

        <InfoCard>
          <FaWind size={40} />
          <InfoContent>
            <Label>Wind Direction</Label>
            <Value>{currentTime.windDirection}</Value>
          </InfoContent>
        </InfoCard>
      </InfoDisplay>

      <TimeNav>
        {timeStates.map((time, index) => (
          <TimeButton
            key={time.id}
            $active={currentIndex === index}
            onClick={() => setCurrentIndex(index)}
          >
            <time.icon />
            {time.label}
          </TimeButton>
        ))}
      </TimeNav>
    </Container>
  );
};

// VEGETATION INTERACTIVE
export const VegetationInteractive = () => {
  const [currentPlant, setCurrentPlant] = useState(0);

  const plants = [
    {
      id: 'toyon',
      name: 'Toyon',
      nickname: 'Christmas Berry',
      fact: 'These bright red berries gave Hollywood its name, as they once covered the hills in winter.',
      image: toyonImg,
    },
    {
      id: 'yucca',
      name: 'Chaparral Yucca',
      nickname: "Our Lord's Candle",
      fact: 'Sends up a dramatic flower stalk taller than a person, blooming with hundreds of white flowers.',
      image: yuccaImg,
    },
    {
      id: 'monkeyflower',
      name: 'Sticky Monkeyflower',
      nickname: 'Canyon Sunshine',
      fact: 'Adapted to fire, these resilient flowers quickly return to burned areas, helping restore the land.',
      image: monkeyflowerImg,
    },
  ];
  const nextPlant = () => {
    setCurrentPlant((prev) => (prev + 1) % plants.length);
  };
  const prevPlant = () => {
    setCurrentPlant((prev) => (prev - 1 + plants.length) % plants.length);
  };
  return (
    <Container>
      <InteractiveLabel>Featured Canyon Plants</InteractiveLabel>
      <PlantCard>
        <NavButton onClick={prevPlant} position="left">
          <FaArrowLeft />
        </NavButton>

        <PlantContent>
          <PlantImage src={plants[currentPlant].image} />
          <PlantInfo>
            <PlantName>{plants[currentPlant].name}</PlantName>
            <PlantNickname>{plants[currentPlant].nickname}</PlantNickname>
            <PlantFact>{plants[currentPlant].fact}</PlantFact>
          </PlantInfo>
        </PlantContent>
        <NavButton onClick={nextPlant} position="right">
          <FaArrowRight />
        </NavButton>
      </PlantCard>
    </Container>
  );
};

// Wildlife Interactive
export const WildlifeInteractive = () => {
  const [currentAnimal, setCurrentAnimal] = useState(0);

  const animals = [
    {
      id: 'horse',
      name: 'Wild Horses',
      type: 'friendly',
      image: horseImg,
      tip: 'You can say hi from a distance, but never feed them',
      fact: 'Part of the Agriculture program',
    },
    {
      id: 'rattlesnake',
      name: 'Rattlesnake',
      type: 'caution',
      image: rattlesnakeImg,
      tip: 'Stay alert on rocky trails and listen for their warning rattle',
      fact: 'They rarely strike unless threatened',
    },
    {
      id: 'lizard',
      name: 'Western Fence Lizard',
      type: 'friendly',
      image: lizardImg,
      tip: "Watch them do push-ups on sunny rocks - they're showing off!",
      fact: 'Their blood kills Lyme disease in ticks',
    },
    {
      id: 'tarantula',
      name: 'Tarantula',
      type: 'caution',
      image: tarantulaImg,
      tip: "Give them space - they're more scared of you than you are of them",
      fact: 'Most active in fall',
    },
  ];

  const nextAnimal = () => {
    setCurrentAnimal((prev) => (prev + 1) % animals.length);
  };

  const prevAnimal = () => {
    setCurrentAnimal((prev) => (prev - 1 + animals.length) % animals.length);
  };

  return (
    <Container>
      <InteractiveLabel>Canyon Wildlife Guide</InteractiveLabel>
      <WildlifeCard>
        <WildlifeContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ImageContainer>
            <NavButton onClick={prevAnimal} position="left">
              <FaArrowLeft />
            </NavButton>
            <WildlifeImage>
              <Image
                src={animals[currentAnimal].image}
                alt={animals[currentAnimal].name}
                $type={animals[currentAnimal].type}
              />
            </WildlifeImage>
            <NavButton onClick={nextAnimal} position="right">
              <FaArrowRight />
            </NavButton>
          </ImageContainer>
          <WildlifeInfo $type={animals[currentAnimal].type}>
            <WildlifeHeader>
              {animals[currentAnimal].type === 'friendly' ? (
                <FaHeart color="#90ee90" />
              ) : (
                <FaExclamationTriangle color="#ff6b6b" />
              )}
              <WildlifeName $type={animals[currentAnimal].type}>
                {animals[currentAnimal].name}
              </WildlifeName>
            </WildlifeHeader>
            <WildlifeTip>{animals[currentAnimal].tip}</WildlifeTip>
            <WildlifeFact>{animals[currentAnimal].fact}</WildlifeFact>
          </WildlifeInfo>
        </WildlifeContent>
      </WildlifeCard>
    </Container>
  );
};

// Geology Interactive
export const GeologyInteractive = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [rotation, setRotation] = useState(0);

  const slides = [
    {
      id: 'slopes',
      title: 'Challenging Terrain',
      points: [
        {
          icon: FaMountain,
          text: 'Canyon slopes average 27% grade - among steepest developed areas in SLO',
        },
        {
          icon: FaWater,
          text: 'Los Osos clay expands dramatically with rain',
        },
        {
          icon: FaSun,
          text: 'Diablo soils crack and shift during dry seasons',
        },
        {
          icon: FaTools,
          text: 'Requires specialized foundations for all structures',
        },
      ],
    },
    {
      id: 'formation',
      title: 'Ancient Foundations',
      points: [
        {
          icon: FaLayerGroup,
          text: 'Franciscan Formation - created by colliding tectonic plates',
        },
        {
          icon: FaGem,
          text: 'Serpentine ridges guide underground springs',
        },
        {
          icon: FaMountain,
          text: 'Sandstone outcrops reveal millions of years of history',
        },
        {
          icon: FaWater,
          text: 'Dense rock layers trap water, feeding Brizzolara Creek',
        },
      ],
    },
    {
      id: 'cantilever',
      title: 'Engineering Triumph',
      image: cantileverImg,
      points: [
        {
          icon: FaArrowUp,
          text: 'Anchored into hillside for stability',
        },
        {
          icon: FaCompass,
          text: 'Dramatic overlook showcases canyon views',
        },
      ],
    },
  ];

  const handleRefresh = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setRotation(rotation + 120); // 33% = 120 degrees
  };

  return (
    <Container>
      <TitleRow>
        <InteractiveLabel>Canyon Geology</InteractiveLabel>
        <RefreshButton onClick={handleRefresh}>
          <RefreshIcon
            animate={{ rotate: rotation }}
            transition={{ duration: 0.3 }}
          >
            <FaRedo size={14} />
          </RefreshIcon>
        </RefreshButton>
      </TitleRow>

      <ContentArea>
        {slides[currentSlide].image && (
          <GeologyImage src={slides[currentSlide].image} />
        )}
        <Title>{slides[currentSlide].title}</Title>
        <PointsList>
          {slides[currentSlide].points.map((point, index) => (
            <Point key={index}>
              <point.icon size={20} />
              <span>{point.text}</span>
            </Point>
          ))}
        </PointsList>
      </ContentArea>
    </Container>
  );
};

// Add the Hydrology component
export const HydrologyInteractive = () => {
  return (
    <Container style={{ justifyContent: 'center' }}>
      <HydroMap src={hydroMapImg} alt="Hydrology Map" />
    </Container>
  );
};

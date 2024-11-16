import React, { useState, useEffect } from 'react';
import {
  WebContainer,
  CarouselContainer,
  MapSlide,
  NavigationControls,
  ArrowControls,
  ArrowButton,
  Indicators,
  Indicator,
  TitleContainer,
  TitleTop,
  TitleBottom,
  TitleTagline,
} from './MapPage.styles.js';
import {
  MdLightMode,
  MdDarkMode,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import { FaSatelliteDish } from 'react-icons/fa6';

import LightMap from './maps/LightMap.jpg';
import SatelliteMap from './maps/SatelliteMap.jpg';
import DarkMap from './maps/DarkMap.jpg';

const MapPageWeb = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const maps = [
    { id: 'light', src: LightMap, icon: MdLightMode, label: 'Light' },
    {
      id: 'satellite',
      src: SatelliteMap,
      icon: FaSatelliteDish,
      label: 'Satellite',
    },
    { id: 'dark', src: DarkMap, icon: MdDarkMode, label: 'Dark' },
  ];

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = maps.map(({ src }) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  const getPosition = (index) => {
    if (index === currentIndex) return 'active';
    if (
      (currentIndex === 0 && index === 2) ||
      (currentIndex === 1 && index === 0) ||
      (currentIndex === 2 && index === 1)
    ) {
      return 'left';
    }
    return 'right';
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % 3);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + 3) % 3);
  };

  if (!imagesLoaded) {
    return (
      <WebContainer>
        <TitleContainer>
          <TitleTop>Explore</TitleTop>
          <TitleBottom>The Map</TitleBottom>
          <TitleTagline>Choose Your View</TitleTagline>
        </TitleContainer>

        <CarouselContainer>
          <MapSlide active>
            <img src={LightMap} alt="Loading..." />
          </MapSlide>
        </CarouselContainer>
      </WebContainer>
    );
  }

  const IconComponent = maps[currentIndex].icon;

  return (
    <WebContainer>
      <TitleContainer>
        <TitleTop>Explore</TitleTop>
        <TitleBottom>The Map</TitleBottom>
        <TitleTagline>Choose Your View</TitleTagline>
      </TitleContainer>

      <CarouselContainer>
        {maps.map((map, index) => (
          <MapSlide
            key={map.id}
            position={getPosition(index)}
            active={index === currentIndex}
          >
            <img src={map.src} alt={`${map.label} map view`} />
          </MapSlide>
        ))}
      </CarouselContainer>

      <NavigationControls>
        <ArrowControls>
          <ArrowButton onClick={handlePrev}>
            <MdChevronLeft />
          </ArrowButton>
          <IconComponent size={30} color="#376d31" />
          <ArrowButton onClick={handleNext}>
            <MdChevronRight />
          </ArrowButton>
        </ArrowControls>

        <Indicators>
          {maps.map((map, index) => (
            <Indicator
              key={map.id}
              active={currentIndex === index}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Indicators>
      </NavigationControls>
    </WebContainer>
  );
};

export default MapPageWeb;

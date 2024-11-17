import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
  PageContainer,
  MapContainer,
  ZoomableContainer,
  MapImage,
  MapPicker,
  PickerOption,
} from './MapPage.styles.js';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { FaSatelliteDish } from 'react-icons/fa6';

import LightMap from './maps/LightMap.jpg';
import SatelliteMap from './maps/SatelliteMap.jpg';
import DarkMap from './maps/DarkMap.jpg';
import BlurredSatellite from './maps/BlurredSatellite.jpg';

// Move maps object outside component
const maps = {
  light: LightMap,
  satellite: SatelliteMap,
  dark: DarkMap,
};

const MapPageMobile = () => {
  const [currentMap, setCurrentMap] = useState('light');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload all images
    const preloadImages = async () => {
      const imagePromises = Object.values(maps).map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      // Also preload the blurred background
      imagePromises.push(
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = BlurredSatellite;
          img.onload = resolve;
          img.onerror = reject;
        })
      );

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []); // Now empty dependency array is fine since maps is constant

  if (!imagesLoaded) {
    return (
      <PageContainer>
        <MapContainer>
          <ZoomableContainer mapType="light">
            {/* Show the light map while others load */}
            <MapImage src={maps.light} alt="Loading map..." />
          </ZoomableContainer>
        </MapContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MapContainer>
        <ZoomableContainer mapType={currentMap} blurredBg={BlurredSatellite}>
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={8}
            centerOnInit={true}
            limitToBounds={true}
            doubleClick={{
              mode: 'reset',
            }}
            pinch={{ disabled: false }}
            wheel={{ wheelDisabled: false }}
            panning={{ disabled: false }}
            velocityAnimation={{
              sensitivity: 1,
              animationTime: 150,
              equalToMove: true,
            }}
            alignmentAnimation={{
              sizeX: 100,
              sizeY: 100,
              velocityAlignmentTime: 150,
            }}
          >
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
              }}
              contentStyle={{
                width: '100%',
                height: '100%',
              }}
            >
              <MapImage src={maps[currentMap]} alt={`${currentMap} map view`} />
            </TransformComponent>
          </TransformWrapper>
        </ZoomableContainer>

        <MapPicker>
          <PickerOption
            active={currentMap === 'light'}
            onClick={() => setCurrentMap('light')}
          >
            <MdLightMode size={24} />
            Light
          </PickerOption>
          <PickerOption
            active={currentMap === 'satellite'}
            onClick={() => setCurrentMap('satellite')}
          >
            <FaSatelliteDish size={22} />
            Satellite
          </PickerOption>
          <PickerOption
            active={currentMap === 'dark'}
            onClick={() => setCurrentMap('dark')}
          >
            <MdDarkMode size={24} />
            Dark
          </PickerOption>
        </MapPicker>
      </MapContainer>
    </PageContainer>
  );
};

export default MapPageMobile;

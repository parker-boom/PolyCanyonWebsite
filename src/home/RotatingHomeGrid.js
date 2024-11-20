/**
 * Component: RotatingHomeGrid
 * Purpose: Creates an engaging grid of horizontally-oriented structure images that rotate automatically
 */

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

// Import your horizontal structure images
import struct1 from '../assets/structures/a1.jpg';
import struct2 from '../assets/structures/a2.jpg';
import struct3 from '../assets/structures/a3.jpg';
import struct4 from '../assets/structures/a4.jpg';
import struct5 from '../assets/structures/a5.jpg';
import struct6 from '../assets/structures/a6.jpg';

const GridContainer = styled.div`
  width: calc(100% - 32px);
  height: 25vh;
  min-height: 150px;
  max-height: 200px;
  margin: 0 16px 16px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(55, 109, 49, 0.15);
`;

const GridImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const images = [struct1, struct2, struct3, struct4, struct5, struct6];

const RotatingHomeGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const rotateImages = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(rotateImages, 3000);
    return () => clearInterval(interval);
  }, [rotateImages]);

  return (
    <GridContainer>
      {images.map((img, index) => (
        <GridImage
          key={index}
          src={img}
          alt={`Structure ${index + 1}`}
          isVisible={index === currentIndex}
        />
      ))}
    </GridContainer>
  );
};

export default RotatingHomeGrid;

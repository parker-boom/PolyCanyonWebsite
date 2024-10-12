// src/info/PhotoGrid.js

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Import horizontal images (a1-a12)
import a1 from '../assets/structures/a1.jpg';
import a2 from '../assets/structures/a2.jpg';
import a3 from '../assets/structures/a3.jpg';
import a4 from '../assets/structures/a4.jpg';
import a5 from '../assets/structures/a5.jpg';
import a6 from '../assets/structures/a6.jpg';
import a7 from '../assets/structures/a7.jpg';
import a8 from '../assets/structures/a8.jpg';
import a9 from '../assets/structures/a9.jpg';
import a10 from '../assets/structures/a10.jpg';
import a11 from '../assets/structures/a11.jpg';
import a12 from '../assets/structures/a12.jpg';

// Import vertical images (b1-b7)
import b1 from '../assets/structures/b1.jpg';
import b2 from '../assets/structures/b2.jpg';
import b3 from '../assets/structures/b3.jpg';
import b4 from '../assets/structures/b4.jpg';
import b5 from '../assets/structures/b5.jpg';
import b6 from '../assets/structures/b6.jpg';
import b7 from '../assets/structures/b7.jpg';

// Arrays of images
const horizontalImages = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12];
const verticalImages = [b1, b2, b3, b4, b5, b6, b7];

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components
const PhotoGridWrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  aspect-ratio: 16 / 9;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(9, 1fr);
  gap: 10px;
  padding: 20px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #f5f5f5;
`;

const GridItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const GridImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PhotoGrid = () => {
  const [gridItems, setGridItems] = useState([]);

  const getRandomImage = (orientation, usedImages) => {
    const images = orientation === 'horizontal' ? horizontalImages : verticalImages;
    const availableImages = images.filter(img => !usedImages.includes(img));
    if (availableImages.length === 0) {
      return images[Math.floor(Math.random() * images.length)];
    }
    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    return randomImage;
  };

  useEffect(() => {
    // Updated grid structure based on your specifications
    const gridStructure = [
      // Row 1 (updated)
      { id: 1, type: 'horizontal', cols: 6, rows: 3, x: 1, y: 1 },
      { id: 2, type: 'vertical', cols: 3, rows: 3, x: 7, y: 1 },
      { id: 3, type: 'vertical', cols: 3, rows: 6, x: 10, y: 1 }, // Changed to vertical

      // Row 2 (adjusted)
      { id: 6, type: 'vertical', cols: 3, rows: 6, x: 1, y: 4 },
      { id: 5, type: 'square', cols: 6, rows: 3, x: 4, y: 4 },   // Made wider to fill space
      // Removed the image on the far right (id:4)

      // Row 3 (adjusted)
      { id: 7, type: 'horizontal', cols: 4, rows: 3, x: 4, y: 7 },
      { id: 8, type: 'square', cols: 5, rows: 3, x: 8, y: 7 },
    ];

    const usedImages = [];

    const initialGridItems = gridStructure.map(item => {
      let image;
      if (item.type === 'square') {
        // Use any horizontal image for square slots
        image = getRandomImage('horizontal', usedImages);
      } else {
        image = getRandomImage(item.type, usedImages);
      }
      usedImages.push(image);

      return {
        key: item.id,
        image: image,
        type: item.type,
        cols: item.cols,
        rows: item.rows,
        x: item.x,
        y: item.y,
      };
    });

    setGridItems(initialGridItems);

    // Set up intervals for image rotation
    const intervals = initialGridItems.map((item, index) => {
      const intervalTime = Math.random() * 5000 + 5000; // 5 to 10 seconds
      return setInterval(() => {
        setGridItems(prevItems => {
          const newItems = [...prevItems];
          const orientation = item.type === 'square' ? 'horizontal' : item.type;
          const newImage = getRandomImage(orientation, newItems.map(i => i.image));

          newItems[index] = {
            ...newItems[index],
            image: newImage,
          };

          return newItems;
        });
      }, intervalTime);
    });

    // Cleanup intervals on unmount
    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  return (
    <PhotoGridWrapper>
      {gridItems.map((item) => (
        <GridItem
          key={item.key}
          style={{
            gridColumn: `${item.x} / span ${item.cols}`,
            gridRow: `${item.y} / span ${item.rows}`,
          }}
        >
          <GridImage
            src={item.image}
            alt={`Grid Image ${item.key}`}
            style={{
              aspectRatio:
                item.type === 'horizontal'
                  ? '16 / 9'
                  : item.type === 'vertical'
                  ? '9 / 16'
                  : '1 / 1',
            }}
          />
        </GridItem>
      ))}
    </PhotoGridWrapper>
  );
};

export default PhotoGrid;

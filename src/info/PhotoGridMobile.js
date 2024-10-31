/**
 * Component: PhotoGrid
 * Purpose: Displays a randomized grid of images showcasing Poly Canyon structures, with alternating transitions between images using a custom timing sequence.
 * Key Features: Utilizes a shuffle algorithm for randomized image display, supports different image orientations (horizontal, vertical, square).
 * Dependencies: styled-components for grid layout, assets for images of Poly Canyon structures.
 */

/*
Imports
*/

// Libraries
import React, { useState, useEffect, useRef, useCallback } from 'react';

// Horizontal images (a1-a12)
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

// Vertical images (b1-b7)
import b1 from '../assets/structures/b1.jpg';
import b2 from '../assets/structures/b2.jpg';
import b3 from '../assets/structures/b3.jpg';
import b4 from '../assets/structures/b4.jpg';
import b5 from '../assets/structures/b5.jpg';
import b6 from '../assets/structures/b6.jpg';
import b7 from '../assets/structures/b7.jpg';

// Styles
import {
  PhotoGridMobileWrapper,
  GridItemContainer,
  GridImage,
} from './InfoPage.styles.js';

/*
Constants
*/

// Arrays of images
const horizontalImages = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12];
const verticalImages = [b1, b2, b3, b4, b5, b6, b7];

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/*
Components & Render
*/
const PhotoGrid = () => {
  const [gridItems, setGridItems] = useState([]);
  const [sequence, setSequence] = useState([]);
  const sequenceRef = useRef([]); // To keep track of the current sequence
  const sequenceIndexRef = useRef(0); // To track current position in sequence
  const timeoutRef = useRef(null);
  const delayToggleRef = useRef(true); // To alternate between 2s and 1s

  // Function to get a random image based on orientation, excluding used images
  const getRandomImage = useCallback((orientation, usedImages) => {
    const images =
      orientation === 'horizontal' ? horizontalImages : verticalImages;
    const availableImages = images.filter((img) => !usedImages.includes(img));
    if (availableImages.length === 0) {
      // Reset usedImages if all images have been used
      return images[Math.floor(Math.random() * images.length)];
    }
    const randomImage =
      availableImages[Math.floor(Math.random() * availableImages.length)];
    return randomImage;
  }, []);

  // Initialize grid items and sequence on mount
  useEffect(() => {
    // Define grid structure

    // Inside PhotoGridMobile.js

    const gridStructure = [
      { id: 1, type: 'horizontal', cols: 3, rows: 2, x: 1, y: 1 }, // Top image spanning full width
      { id: 2, type: 'vertical', cols: 2, rows: 4, x: 1, y: 3 }, // Left side vertical image
      { id: 3, type: 'square', cols: 1, rows: 2, x: 3, y: 3 }, // Right side square image at top
      { id: 4, type: 'square', cols: 1, rows: 2, x: 3, y: 5 }, // Right side square image at bottom
    ];

    const usedImages = [];

    const initialGridItems = gridStructure.map((item) => {
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
        currentImage: image,
        previousImage: null,
        type: item.type,
        cols: item.cols,
        rows: item.rows,
        x: item.x,
        y: item.y,
      };
    });

    setGridItems(initialGridItems);

    // Generate randomized sequence of slot indices (0-6)
    const randomizedSequence = shuffleArray([
      ...Array(initialGridItems.length).keys(),
    ]);
    setSequence(randomizedSequence);
    sequenceRef.current = randomizedSequence;
  }, [getRandomImage]);

  // Function to update image in a specific slot
  const updateImage = useCallback(
    (slotIndex) => {
      setGridItems((prevItems) => {
        const newItems = [...prevItems];
        const item = newItems[slotIndex];
        const usedImages = newItems
          .map((i, idx) => (idx !== slotIndex ? i.currentImage : null))
          .filter((img) => img !== null);
        const orientation = item.type === 'square' ? 'horizontal' : item.type;
        const newImage = getRandomImage(orientation, usedImages);

        // Set previousImage to currentImage and update currentImage
        newItems[slotIndex] = {
          ...item,
          previousImage: item.currentImage,
          currentImage: newImage,
        };

        return newItems;
      });
    },
    [getRandomImage]
  );

  // Controlled sequence loop
  useEffect(() => {
    if (sequence.length === 0) return;

    const runSequence = () => {
      const currentIndex =
        sequenceIndexRef.current % sequenceRef.current.length;
      const slotToChange = sequenceRef.current[currentIndex];

      updateImage(slotToChange);

      sequenceIndexRef.current += 1;

      // Determine next delay
      const nextDelay = delayToggleRef.current ? 2000 : 1000; // 2s or 1s
      delayToggleRef.current = !delayToggleRef.current; // Toggle for next step

      timeoutRef.current = setTimeout(runSequence, nextDelay);
    };

    // Start the sequence
    timeoutRef.current = setTimeout(runSequence, 2000); // Initial delay

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sequence, updateImage]);

  return (
    <PhotoGridMobileWrapper>
      {gridItems.map((item) => (
        <GridItemContainer
          key={item.key}
          style={{
            gridColumn: `${item.x} / span ${item.cols}`,
            gridRow: `${item.y} / span ${item.rows}`,
          }}
        >
          {/* Previous Image */}
          {item.previousImage && (
            <GridImage
              src={item.previousImage}
              alt={`Previous Grid Image ${item.key}`}
              isVisible={false}
              style={{
                aspectRatio:
                  item.type === 'horizontal'
                    ? '16 / 9'
                    : item.type === 'vertical'
                      ? '9 / 16'
                      : '1 / 1',
              }}
            />
          )}
          {/* Current Image */}
          <GridImage
            src={item.currentImage}
            alt={`Grid Image ${item.key}`}
            isVisible={true}
            style={{
              aspectRatio:
                item.type === 'horizontal'
                  ? '16 / 9'
                  : item.type === 'vertical'
                    ? '9 / 16'
                    : '1 / 1',
            }}
          />
        </GridItemContainer>
      ))}
    </PhotoGridMobileWrapper>
  );
};

// Used in Index.js
export default PhotoGrid;

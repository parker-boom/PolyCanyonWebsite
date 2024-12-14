import { useState, useEffect } from 'react';

const useImagePreloader = ({ currentPaths, adjacentPaths = {} }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);
  const [adjacentLoadedImages, setAdjacentLoadedImages] = useState({
    prev: [],
    next: [],
  });

  useEffect(() => {
    if (!currentPaths?.length) return;

    const imagePromises = [];
    const loadedImagePairs = [];

    // Load current structure images
    currentPaths.forEach((imagePath) => {
      const pair = {
        background: new Image(),
        foreground: new Image(),
      };

      const backgroundPromise = new Promise((resolve, reject) => {
        pair.background.onload = resolve;
        pair.background.onerror = reject;
        pair.background.src = imagePath;
      });

      const foregroundPromise = new Promise((resolve, reject) => {
        pair.foreground.onload = resolve;
        pair.foreground.onerror = reject;
        pair.foreground.src = imagePath;
      });

      imagePromises.push(backgroundPromise, foregroundPromise);
      loadedImagePairs.push(pair);
    });

    // Load adjacent structures' images in the background
    const adjacentPromises = [];
    const adjacentImages = { prev: [], next: [] };

    ['prev', 'next'].forEach((direction) => {
      if (adjacentPaths[direction]?.length) {
        adjacentPaths[direction].forEach((imagePath) => {
          const pair = {
            background: new Image(),
            foreground: new Image(),
          };

          adjacentPromises.push(
            new Promise((resolve) => {
              pair.background.onload = resolve;
              pair.background.src = imagePath;
            }),
            new Promise((resolve) => {
              pair.foreground.onload = resolve;
              pair.foreground.src = imagePath;
            })
          );

          adjacentImages[direction].push(pair);
        });
      }
    });

    // Handle current structure images loading
    Promise.all(imagePromises)
      .then(() => {
        setLoadedImages(loadedImagePairs);
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error('Error preloading current images:', error);
        setImagesLoaded(true);
      });

    // Handle adjacent structures images loading
    Promise.all(adjacentPromises)
      .then(() => {
        setAdjacentLoadedImages(adjacentImages);
      })
      .catch((error) => {
        console.error('Error preloading adjacent images:', error);
      });
  }, [currentPaths, adjacentPaths]);

  return { imagesLoaded, loadedImages, adjacentLoadedImages };
};

export default useImagePreloader;

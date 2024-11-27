import { useState, useEffect } from 'react';
import { mainImages } from './images/structureImages.js';

const useListImagePreloader = (structures) => {
  const [loadingStatus, setLoadingStatus] = useState({
    initialBatchLoaded: false,
    allImagesLoaded: false,
    loadedImages: new Set(),
  });

  useEffect(() => {
    if (!structures?.length) return;

    // Number of images to load in first batch (adjust based on grid size)
    const INITIAL_BATCH_SIZE = 8;

    const loadImage = (imageKey) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadingStatus((prev) => ({
            ...prev,
            loadedImages: new Set([...prev.loadedImages, imageKey]),
          }));
          resolve(imageKey);
        };
        img.onerror = reject;
        img.src = mainImages[imageKey];
      });
    };

    // Load initial batch
    const loadInitialBatch = async () => {
      try {
        await Promise.all(
          structures
            .slice(0, INITIAL_BATCH_SIZE)
            .map((structure) => loadImage(structure.image_key))
        );
        setLoadingStatus((prev) => ({ ...prev, initialBatchLoaded: true }));
      } catch (error) {
        console.error('Error loading initial batch:', error);
        // Still mark as loaded to prevent hanging
        setLoadingStatus((prev) => ({ ...prev, initialBatchLoaded: true }));
      }
    };

    // Load remaining images
    const loadRemainingImages = async () => {
      try {
        await Promise.all(
          structures
            .slice(INITIAL_BATCH_SIZE)
            .map((structure) => loadImage(structure.image_key))
        );
        setLoadingStatus((prev) => ({ ...prev, allImagesLoaded: true }));
      } catch (error) {
        console.error('Error loading remaining images:', error);
        setLoadingStatus((prev) => ({ ...prev, allImagesLoaded: true }));
      }
    };

    // Start loading process
    loadInitialBatch().then(() => {
      // Once initial batch is loaded, start loading the rest
      loadRemainingImages();
    });
  }, [structures]);

  return loadingStatus;
};

export default useListImagePreloader;

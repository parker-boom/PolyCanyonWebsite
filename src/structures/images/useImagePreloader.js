import { useEffect, useMemo } from 'react';
import { getResponsiveImage } from './structureImages.js';

/** Images never block text or controls. Only warm the next gallery photograph. */
const useImagePreloader = ({ currentPaths = [], currentIndex = 0 }) => {
  const loadedImages = useMemo(
    () =>
      currentPaths.map((src) => {
        const image = getResponsiveImage(src);
        return { background: image, foreground: image };
      }),
    [currentPaths]
  );
  const nextPath =
    currentPaths.length > 1
      ? currentPaths[(currentIndex + 1) % currentPaths.length]
      : null;

  useEffect(() => {
    if (!nextPath) return undefined;
    const nextImage = new Image();
    nextImage.decoding = 'async';
    nextImage.fetchPriority = 'low';
    const next = getResponsiveImage(nextPath);
    nextImage.sizes = next.sizes;
    if (next.srcSet) nextImage.srcset = next.srcSet;
    nextImage.src = next.src;
    return () => {
      nextImage.onload = null;
      nextImage.onerror = null;
    };
  }, [nextPath]);

  return { imagesLoaded: true, loadedImages };
};

export default useImagePreloader;

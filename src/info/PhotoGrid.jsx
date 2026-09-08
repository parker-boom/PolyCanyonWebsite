import React from 'react';
import {
  thumbnailImages,
  getResponsiveImage,
} from '../structures/images/structureImages.js';
import dome from '../assets/generated/info/a1.webp';
import {
  PhotoGridWrapper,
  PhotoGridMobileWrapper,
  GridItemContainer,
  GridImage,
} from './InfoPage.styles.js';

// Fixed photographs retain the original collage layout without rotation or timers.
const photos = [
  [dome, 'Geodesic Dome'],
  [thumbnailImages['M-14'], 'Stick Structure'],
  [thumbnailImages['M-1'], 'Entry Arch'],
  [thumbnailImages['M-3'], 'Blade Structure'],
  [thumbnailImages['M-24'], 'Shell House'],
  [thumbnailImages['M-16'], 'Bridge House'],
  [thumbnailImages['M-25'], 'Green House'],
];
const desktopLayout = [
  [1, 1, 6, 3],
  [7, 1, 3, 3],
  [10, 1, 3, 6],
  [1, 4, 3, 6],
  [4, 4, 6, 3],
  [4, 7, 4, 3],
  [8, 7, 5, 3],
];
const mobileLayout = [
  [1, 1, 3, 2],
  [1, 3, 2, 4],
  [3, 3, 1, 2],
  [3, 5, 1, 2],
];

export default function PhotoGrid({ mobile = false }) {
  const Wrapper = mobile ? PhotoGridMobileWrapper : PhotoGridWrapper;
  return (
    <Wrapper>
      {(mobile ? mobileLayout : desktopLayout).map(
        ([x, y, cols, rows], index) => {
          const [src, name] = photos[index];
          return (
            <GridItemContainer
              key={name}
              style={{
                gridColumn: `${x} / span ${cols}`,
                gridRow: `${y} / span ${rows}`,
              }}
            >
              <GridImage
                {...getResponsiveImage(src, '(max-width: 768px) 85vw, 480px')}
                loading="lazy"
                decoding="async"
                alt={`${name} in Poly Canyon`}
              />
            </GridItemContainer>
          );
        }
      )}
    </Wrapper>
  );
}

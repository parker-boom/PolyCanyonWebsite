/**
 * Component: LazyGif
 * Purpose: Displays a GIF preview of the app based on the device type (iOS or Android).
 * Key Features: Renders a device-specific GIF, supports lazy loading for performance.
 * Dependencies: styled-components for styling, gif files (appleGIF and androidGIF) for app previews.
 */

/*
Imports
*/

// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Photos
import appleGIF from '../assets/appleGIF.gif';
import androidGIF from '../assets/androidGIF.gif';

// Gif Styles
const GifWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const GifImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  border-radius: 15px;
  filter: drop-shadow(0 6px 16px rgba(189, 139, 19, 0.4));
  transition: filter 0.3s ease;

  &:hover {
    filter: drop-shadow(0 8px 20px rgba(189, 139, 19, 0.5));
  }
`;

/*
Component and Render
*/
const LazyGif = ({ deviceType }) => {
  const gifSrc = deviceType === 'ios' ? appleGIF : androidGIF;
  return (
    <GifWrapper>
      <GifImage
        src={gifSrc}
        alt={`${deviceType} app preview showing interactive map`}
      />
    </GifWrapper>
  );
};

LazyGif.propTypes = {
  deviceType: PropTypes.oneOf(['ios', 'android']).isRequired,
};

// Exports
export default LazyGif;

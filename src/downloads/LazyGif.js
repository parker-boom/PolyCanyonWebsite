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
const GifImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  border-radius: 10px;
`;

/*
Component and Render
*/
const LazyGif = ({ deviceType }) => {
  // Determine the GIF source based on device type
  const gifSrc = deviceType === 'ios' ? appleGIF : androidGIF;
  return (
    <GifImage
      src={gifSrc}
      alt={`${deviceType} app preview showing interactive map`}
    />
  );
};

LazyGif.propTypes = {
  deviceType: PropTypes.oneOf(['ios', 'android']).isRequired,
};

// Exports
export default LazyGif;

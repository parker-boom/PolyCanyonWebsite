/*
Imports
*/

// Libraries
import React from 'react';
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
  return <GifImage src={gifSrc} alt={`${deviceType} app preview showing interactive map`} />;
};

// Exports
export default LazyGif;
// LazyGif.js
// This component displays a GIF preview of the Poly Canyon app 
// based on the device type (iOS or Android).

import React from 'react';
import styled from 'styled-components';
import appleGIF from '../assets/appleGIF.gif';
import androidGIF from '../assets/androidGIF.gif';

const GifImage = styled.img`
  height: 100%; // Set height to 100% of the container
  width: auto; // Maintain aspect ratio
  object-fit: contain; // Ensure the image fits within the container
  border-radius: 10px; // Rounded corners for the GIF
`;

const LazyGif = ({ deviceType }) => {
  // Determine the GIF source based on device type
  const gifSrc = deviceType === 'ios' ? appleGIF : androidGIF;
  return <GifImage src={gifSrc} alt={`${deviceType} app preview showing interactive map`} />;
};

export default LazyGif;
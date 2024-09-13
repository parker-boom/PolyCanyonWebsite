import React from 'react';
import styled from 'styled-components';
// Update the import paths to match the correct location of your GIF files
import appleGIF from './assets/appleGIF.gif';
import androidGIF from './assets/androidGIF.gif';
  
const GifImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  border-radius: 10px;
`;

const LazyGif = ({ deviceType }) => {
  const gifSrc = deviceType === 'ios' ? appleGIF : androidGIF;
  return <GifImage src={gifSrc} alt={`${deviceType} app preview showing interactive map`} />;
};


export default LazyGif;
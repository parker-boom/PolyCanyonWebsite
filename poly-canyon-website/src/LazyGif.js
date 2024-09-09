import React from 'react';
import styled from 'styled-components';
// Update the import paths to match the correct location of your GIF files
import appleEx from './assets/appleEx.gif';
import androidEx from './assets/androidEx.gif';

const GifImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  border-radius: 10px;
`;

const LazyGif = ({ deviceType }) => {
  const gifSrc = deviceType === 'ios' ? appleEx : androidEx;
  return <GifImage src={gifSrc} alt={`${deviceType} app preview`} />;
};

export default LazyGif;
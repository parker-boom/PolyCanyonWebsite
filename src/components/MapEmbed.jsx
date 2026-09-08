import React, { useState } from 'react';
import styled from 'styled-components';

const Frame = styled.div`
  min-height: ${({ $height }) => $height}px;
  position: relative;
  background: #e8efe8;
  border: 1px solid #d5dfd0;
  border-radius: 0;
  overflow: hidden;
  iframe {
    width: 100%;
    height: ${({ $height }) => $height}px;
    border: 0;
    display: block;
  }
`;
const MapLink = styled.a`
  display: block;
  padding: 12px 20px;
  text-align: center;
  color: var(--green);
  font-size: 14px;
  text-underline-offset: 3px;
`;
const Cover = styled.div`
  min-height: ${({ $height }) => $height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
  text-align: center;
  background: #edf1e9;
  color: var(--green);
  button {
    cursor: pointer;
    background: var(--green);
    color: white;
    border: 0;
    border-radius: 2px;
    padding: 12px 20px;
    font-weight: 500;
  }
  a {
    font-size: 14px;
    text-underline-offset: 3px;
  }
`;

export default function MapEmbed({
  latitude,
  longitude,
  title,
  height = 200,
  directions = false,
}) {
  const [loaded, setLoaded] = useState(false);
  const point = `${latitude},${longitude}`;
  const url = directions
    ? `https://www.google.com/maps/dir/?api=1&origin=35.30302,-120.65913&destination=${point}&travelmode=walking`
    : `https://www.google.com/maps/search/?api=1&query=${point}`;
  return (
    <Frame $height={height}>
      {loaded ? (
        <iframe
          title={title}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(point)}&z=${directions ? 14 : 18}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <Cover $height={height}>
          <button onClick={() => setLoaded(true)}>Show map</button>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {directions
              ? 'Walking directions in Google Maps'
              : 'Open in Google Maps'}
          </a>
        </Cover>
      )}
      {loaded && (
        <MapLink href={url} target="_blank" rel="noopener noreferrer">
          {directions
            ? 'Walking directions in Google Maps'
            : 'Open in Google Maps'}
        </MapLink>
      )}
    </Frame>
  );
}

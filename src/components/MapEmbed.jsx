import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Frame = styled.div`
  min-height: ${({ $height }) => $height}px;
  position: relative;
  background: #e8efe8;
  border: 1px solid #d5dfd0;
  border-radius: 15px;
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
  color: #376d31;
  font-size: 14px;
  text-underline-offset: 3px;
`;
const MapNote = styled.p`
  margin: 0;
  padding: 12px 20px;
  color: #354133;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
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
  background:
    radial-gradient(ellipse at 20% 15%, #d9e5ce, transparent 65%),
    linear-gradient(135deg, #e8efe8, #f8f1d9);
  color: #376d31;
  button {
    cursor: pointer;
    background: #376d31;
    color: white;
    border: 0;
    border-radius: 12px;
    padding: 12px 20px;
    font-weight: 700;
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
      {directions && (
        <MapNote>
          This map marks the destination. Open Google Maps for the walking route
          from campus.
        </MapNote>
      )}
      {loaded ? (
        <iframe
          title={directions ? `${title} — destination map` : title}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(point)}&z=${directions ? 14 : 18}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <Cover $height={height}>
          <FaMapMarkerAlt size={26} aria-hidden="true" />
          <strong>{title}</strong>
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

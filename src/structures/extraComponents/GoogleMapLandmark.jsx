import React from 'react';
import MapEmbed from '../../components/MapEmbed.jsx';

export default function GoogleMapLandmark({
  latitude,
  longitude,
  structureName,
}) {
  return (
    <MapEmbed
      latitude={latitude}
      longitude={longitude}
      title={`${structureName || 'Structure'} location`}
    />
  );
}

import React from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { MapContainer } from '../info/InfoPage.styles.js';
import { structureMapStyles } from '../utils/googleMaps.js';

export const GoogleMapLandmark = ({ latitude, longitude, structureName }) => {
  if (!window.google) return <div>Loading map...</div>;

  const center = { lat: latitude, lng: longitude };

  const customMarker = {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z',
    fillColor: '#FFFFFF',
    fillOpacity: 1,
    strokeColor: '#376D31',
    strokeWeight: 2,
    scale: 2,
    anchor: new window.google.maps.Point(12, 24),
    labelOrigin: new window.google.maps.Point(12, -10),
  };

  return (
    <MapContainer style={{ height: '200px' }}>
      <GoogleMap
        center={center}
        zoom={18}
        mapContainerStyle={{
          width: '100%',
          height: '100%',
          borderRadius: '10px',
        }}
        options={{
          styles: structureMapStyles,
          disableDefaultUI: true,
          mapTypeControl: false,
          zoomControl: false,
          streetViewControl: false,
          clickableIcons: false,
          tilt: 45,
        }}
      >
        <MarkerF
          position={center}
          icon={customMarker}
          label={{
            text: structureName || '',
            color: '#376D31',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
          onClick={() =>
            window.open(
              `https://www.google.com/maps?q=${latitude},${longitude}`,
              '_blank'
            )
          }
        />
      </GoogleMap>
    </MapContainer>
  );
};

GoogleMapLandmark.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  structureName: PropTypes.string,
};

export default GoogleMapLandmark;

// GoogleMapsRoute.js

/*
 * Imports
 */
import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  MapContainer,
  DirectionsContainer,
  ArrowButton,
  ArrowButtonContainer,
  StepContent,
  StepNumber,
  StepText,
} from './InfoPage.styles.js';

/*
 * Constants
 */
const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [{ color: '#e8efe8' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#376d31' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [{ color: '#f0f0f0' }],
  },
];

const structureMapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [{ color: '#e8efe8' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#B1903C' }],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a3c7a3' }],
  },
];

/*
 * Helper: Script Loader
 * Loads Google Maps script only once to avoid redundancy across components
 */
const loadGoogleMapsScript = (callback) => {
  if (!window.google) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  } else {
    callback();
  }
};

/*
 * Component: GoogleMapsRoute
 * Displays directions and route steps
 */
const GoogleMapsRoute = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const steps = [
    'Park in the H-4f parking lot or start on campus',
    'Walk to Poly Canyon Road until you see the yellow gate',
    'Continue on the path until you see the entry arch',
  ];

  useEffect(() => {
    loadGoogleMapsScript(() => setIsMapLoaded(true));
  }, []);

  useEffect(() => {
    if (isMapLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: 35.30302, lng: -120.65913 },
          destination: { lat: 35.31344, lng: -120.65192 },
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirectionsResponse(result);
          }
        }
      );
    }
  }, [isMapLoaded]);

  if (!isMapLoaded) return <div>Loading map...</div>;

  return (
    <>
      <GoogleMap
        center={{ lat: 35.308, lng: -120.655 }}
        zoom={14}
        mapContainerStyle={{
          width: '100%',
          height: '400px',
          borderRadius: '15px',
        }}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          mapTypeControl: false,
        }}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      <DirectionsContainer>
        {!isMobile && (
          <ArrowButtonContainer>
            <ArrowButton
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <FaArrowLeft />
            </ArrowButton>
          </ArrowButtonContainer>
        )}

        <StepContent>
          <StepNumber>{currentStep + 1}</StepNumber>
          <StepText>{steps[currentStep]}</StepText>
        </StepContent>

        {!isMobile && (
          <ArrowButtonContainer>
            <ArrowButton
              onClick={() =>
                setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
              }
              disabled={currentStep === steps.length - 1}
            >
              <FaArrowRight />
            </ArrowButton>
          </ArrowButtonContainer>
        )}

        {isMobile && (
          <ArrowButtonContainer>
            <ArrowButton
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <FaArrowLeft />
            </ArrowButton>
            <ArrowButton
              onClick={() =>
                setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
              }
              disabled={currentStep === steps.length - 1}
            >
              <FaArrowRight />
            </ArrowButton>
          </ArrowButtonContainer>
        )}
      </DirectionsContainer>
    </>
  );
};

/*
 * Component: StructureLocationMap
 * Displays map with a specific structure pin
 */
export const StructureLocationMap = ({
  latitude,
  longitude,
  structureName,
}) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    loadGoogleMapsScript(() => setIsMapLoaded(true));
  }, []);

  if (!isMapLoaded) return <div>Loading map...</div>;

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

StructureLocationMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  structureName: PropTypes.string,
};

export default GoogleMapsRoute;

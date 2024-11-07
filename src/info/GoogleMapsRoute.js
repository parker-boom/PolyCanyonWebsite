/**
 * Component: GoogleMapsRoute
 * Purpose: Displays a Google Map route and step-by-step walking directions for navigating through Poly Canyon.
 * Key Features: Fetches walking directions from Google Maps API, renders route details, and provides step-by-step navigation for both web and mobile views.
 * Dependencies: @react-google-maps/api for Google Maps integration, styled-components for UI styling.
 */

/*
Imports
*/

// Libraries
import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
} from '@react-google-maps/api';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Styles
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
Constants
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

/*
Components & Render 
*/
const GoogleMapsRoute = () => {
  // State variables
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile] = useState(window.innerWidth <= 768);

  // Steps text
  const steps = [
    'Park in the H-4f parking lot or start on campus',
    'Walk to Poly Canyon Road until you see the yellow gate',
    'Continue on the path until you see the entry arch',
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (isLoaded) {
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
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

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
        {/* Left arrow for web view */}
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

        {/* Right arrow for web view */}
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

        {/* Both arrows for mobile view */}
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

// Define libraries array outside component
const libraries = ['marker'];

// Update the StructureLocationMap component
export const StructureLocationMap = ({ latitude, longitude }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  const center = { lat: latitude, lng: longitude };

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
          disableDefaultUI: true,
          mapTypeControl: false,
          zoomControl: false,
          streetViewControl: false,
          clickableIcons: false,
          mapId: process.env.REACT_APP_GOOGLE_MAPS_ID,
        }}
        onLoad={(map) => {
          // Create and add the advanced marker
          const { AdvancedMarkerElement } = window.google.maps.marker;
          const marker = new AdvancedMarkerElement({
            map,
            position: center,
          });

          // Add click listener to marker
          marker.addListener('click', () => {
            window.open(
              `https://www.google.com/maps?q=${latitude},${longitude}`,
              '_blank'
            );
          });
        }}
      />
    </MapContainer>
  );
};

// Add PropTypes
StructureLocationMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

// Used in InfoPage.js
export default GoogleMapsRoute;

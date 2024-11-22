// GoogleMapsRoute.js

/*
 * Imports
 */
import React, { useState } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
  DirectionsContainer,
  ArrowButton,
  ArrowButtonContainer,
  StepContent,
  StepNumber,
  StepText,
} from './InfoPage.styles.js';
import { mapStyles } from '../utils/googleMaps.js';

/*
 * Component: GoogleMapsRoute
 * Displays directions and route steps
 */
const GoogleMapsRoute = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const isMobile = window.innerWidth <= 768;

  const steps = [
    'Park in the H-4f parking lot or start on campus',
    'Walk to Poly Canyon Road until you see the yellow gate',
    'Continue on the path until you see the entry arch',
  ];

  React.useEffect(() => {
    if (window.google) {
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
  }, []);

  if (!window.google) return <div>Loading map...</div>;

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
        {!isMobile ? (
          <>
            <ArrowButtonContainer>
              <ArrowButton
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <FaArrowLeft />
              </ArrowButton>
            </ArrowButtonContainer>

            <StepContent>
              <StepNumber>{currentStep + 1}</StepNumber>
              <StepText>{steps[currentStep]}</StepText>
            </StepContent>

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
          </>
        ) : (
          <>
            <StepText>{steps[currentStep]}</StepText>
            <ArrowButtonContainer>
              <ArrowButton
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <FaArrowLeft />
              </ArrowButton>
              <StepNumber>{currentStep + 1}</StepNumber>
              <ArrowButton
                onClick={() =>
                  setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                }
                disabled={currentStep === steps.length - 1}
              >
                <FaArrowRight />
              </ArrowButton>
            </ArrowButtonContainer>
          </>
        )}
      </DirectionsContainer>
    </>
  );
};

export default GoogleMapsRoute;

import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import {
  MapContainer,
  StatBox,
  DirectionsContainer,
  ArrowButton,
  StepContent,
  StepNumber,
  StepText,
  ArrowButtonContainer
} from './InfoPage.styles';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [{ color: '#e8efe8' }]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#376d31' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [{ color: '#f0f0f0' }]
  }
];

const GoogleMapsRoute = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const steps = [
    "Park in the H-4f parking lot or start on campus",
    "Walk to Poly Canyon Road until you see the yellow gate",
    "Continue on the path until you see the entry arch",
  ];

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCEvglk19fQ-rB26NTPE9VYMS-JrW7vDrM',
  });

  useEffect(() => {
    if (isLoaded) {
      fetchDirections();
    }
  }, [isLoaded]);

  const fetchDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: 35.30302, lng: -120.65913 },
        destination: { lat: 35.31344, lng: -120.65192 },
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          setRouteDetails(result.routes[0].legs[0]);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <>
      <MapContainer>
        <GoogleMap
          center={{ lat: 35.308, lng: -120.655 }}
          zoom={14}
          mapContainerStyle={{ width: '100%', height: '400px', borderRadius: '15px' }}
          options={{ styles: mapStyles, disableDefaultUI: true, mapTypeControl: false }}
        >
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </MapContainer>
      {!isMobile && routeDetails && (
        <DirectionsContainer>
          <StatBox>
            <h4>Total Distance</h4>
            <p>{routeDetails.distance.text}</p>
          </StatBox>
          <StatBox>
            <h4>Estimated Duration</h4>
            <p>{routeDetails.duration.text}</p>
          </StatBox>
        </DirectionsContainer>
      )}

      <DirectionsContainer>
        {isMobile ? (
          <>
            <StepContent>
              <StepText>{steps[currentStep]}</StepText>
            </StepContent>
            <ArrowButtonContainer>
              <ArrowButton onClick={prevStep} disabled={currentStep === 0}>
                <FaArrowLeft />
              </ArrowButton>
              <StepNumber>{currentStep + 1}</StepNumber>
              <ArrowButton onClick={nextStep} disabled={currentStep === steps.length - 1}>
                <FaArrowRight />
              </ArrowButton>
            </ArrowButtonContainer>
          </>
        ) : (
          <>
            <ArrowButton onClick={prevStep} disabled={currentStep === 0}>
              <FaArrowLeft />
            </ArrowButton>
            <StepContent>
              <StepNumber>{currentStep + 1}</StepNumber>
              <StepText>{steps[currentStep]}</StepText>
            </StepContent>
            <ArrowButton onClick={nextStep} disabled={currentStep === steps.length - 1}>
              <FaArrowRight />
            </ArrowButton>
          </>
        )}
      </DirectionsContainer>
    </>
  );
};

export default GoogleMapsRoute;

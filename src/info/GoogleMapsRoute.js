import React, { useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';

const GoogleMapsRoute = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null); 
  const [stepIndex, setStepIndex] = useState(0); 
  
  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCEvglk19fQ-rB26NTPE9VYMS-JrW7vDrM', // Replace with your actual API key
  });

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: 35.304, lng: -120.6625 }, // Adjust these coordinates
          destination: { lat: 35.301, lng: -120.6644 }, // Adjust these coordinates
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
            setRouteDetails(result.routes[0].legs[0]); // Get step-by-step data
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  }, [isLoaded]);

  // Handle errors if the API doesn't load
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <>
      <GoogleMap
        center={{ lat: 35.302, lng: -120.663 }} // Center map
        zoom={14}
        mapContainerStyle={{ width: '100%', height: '400px' }}
      >
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>

      {/* Additional components like step-by-step directions can go here */}
    </>
  );
};

export default GoogleMapsRoute;

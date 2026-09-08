import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import MapEmbed from '../components/MapEmbed.jsx';
import {
  DirectionsContainer,
  ArrowButton,
  StepContent,
  StepNumber,
  StepText,
} from './InfoPage.styles.js';
import { steps } from './directions.js';

export default function GoogleMapsRoute() {
  const [step, setStep] = useState(0);
  return (
    <>
      <MapEmbed
        latitude={35.31344}
        longitude={-120.65192}
        title="Find the canyon"
        height={320}
        directions
      />
      <DirectionsContainer>
        <ArrowButton
          aria-label="Previous direction"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
        >
          <FaArrowLeft />
        </ArrowButton>
        <StepContent aria-live="polite">
          <StepNumber>{step + 1}</StepNumber>
          <StepText>{steps[step]}</StepText>
        </StepContent>
        <ArrowButton
          aria-label="Next direction"
          onClick={() => setStep(step + 1)}
          disabled={step === steps.length - 1}
        >
          <FaArrowRight />
        </ArrowButton>
      </DirectionsContainer>
    </>
  );
}

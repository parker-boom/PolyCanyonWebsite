import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 32px;
`;

const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 4px solid rgba(189, 139, 19, 0.1);
  border-left: 4px solid #376d31;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  color: #376d31;
  font-size: 18px;
  font-weight: 600;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingSpinner = () => (
  <SpinnerWrapper>
    <Spinner />
    <LoadingText>Loading Structure...</LoadingText>
  </SpinnerWrapper>
);

export default LoadingSpinner;

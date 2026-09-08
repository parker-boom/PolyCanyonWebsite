import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTransition } from './TransitionContext.js';

const expandBubble = keyframes`
  0% {
    clip-path: circle(0% at var(--start-x) var(--start-y));
  }
  100% {
    clip-path: circle(150% at var(--start-x) var(--start-y));
  }
`;

const TransitionContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: ${(props) => (props.$isActive ? 'all' : 'none')};
  background: black;
`;

const ExpandingBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  animation: ${expandBubble} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  --start-x: ${(props) => props.$startX};
  --start-y: ${(props) => props.$startY};
  opacity: ${(props) => (props.$isExiting ? 0 : 1)};
  transition: opacity 0.4s ease;
`;

const ChroniclesTransition = () => {
  const { isTransitioning, transitionData } = useTransition();
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShouldRender(true);
      setIsExiting(false);
    } else if (shouldRender) {
      // Start quick fade out after expansion
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 400); // Quick fade duration
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, shouldRender]);

  if (!shouldRender) return null;

  const { startPosition, imageUrl } = transitionData;

  return (
    <TransitionContainer $isActive={isTransitioning}>
      <ExpandingBackground
        $image={imageUrl}
        $startX={startPosition?.x || '50%'}
        $startY={startPosition?.y || '50%'}
        $isExiting={isExiting}
      />
    </TransitionContainer>
  );
};

export default ChroniclesTransition;

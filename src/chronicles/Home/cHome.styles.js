import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

// Animation Timing Configuration (in seconds)
const TIMING = {
  // Initial zoom of logo + title
  ZOOM_DELAY: 0.75,
  ZOOM_DURATION: 1.5,

  // Slide up and scale down
  SLIDE_DELAY: 2.5, // Starts after zoom completes
  SLIDE_DURATION: 1.2,

  // Action line fade in (starts after logo/title finishes moving)
  ACTION_DELAY: 3.5, // Starts after slide
  ACTION_DURATION: 0.3,

  // Exit bar appearance
  EXIT_DELAY: 5.4,
  EXIT_DURATION: 0.6,

  // Stage button fade in
  BUTTON_DELAY: 4.3,
  BUTTON_DURATION: 1.2,
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeScale = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const zoomIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, calc(-50% - 50px - 10vh + 50px)) scale(1.4);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, calc(-50% - 50px - 10vh + 50px)) scale(1);
  }
`;

const slideUpAndScale = keyframes`
  0% {
    transform: translate(-50%, calc(-50% - 50px - 10vh + 50px)) scale(1);
  }
  100% {
    transform: translate(-50%, calc(-100% + 20px - 10vh + 50px)) scale(0.9);
  }
`;

const viewportGlow = keyframes`
  0%, 100% { 
    box-shadow: inset 0 0 150px rgba(219, 139, 28, 0);
  }
  50% { 
    box-shadow: 
      inset 0 0 150px rgba(219, 139, 28, 0.25),
      inset 0 0 300px rgba(219, 139, 28, 0.1);
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
  transition: opacity 0.6s ease-out;

  &.button-hovered {
    animation: ${viewportGlow} 2s ease-in-out infinite;
  }

  &.stage-1 {
    opacity: 1;
  }

  &.stage-2 {
    opacity: 0;
    animation: ${fadeIn} 0.6s ease-out forwards;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) => (props.$stage === 2 ? '0' : '0')};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const LogoTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  opacity: 0;
  animation:
    ${zoomIn} ${TIMING.ZOOM_DURATION}s cubic-bezier(0.16, 1, 0.3, 1) forwards
      ${TIMING.ZOOM_DELAY}s,
    ${slideUpAndScale} ${TIMING.SLIDE_DURATION}s cubic-bezier(0.16, 1, 0.3, 1)
      forwards ${TIMING.SLIDE_DELAY}s;
`;

export const MainTitle = styled.h1`
  font-size: 72px;
  font-weight: 900;
  font-style: italic;
  color: #db8b1c;
  white-space: nowrap;
  text-shadow:
    0 0 20px rgba(219, 139, 28, 0.6),
    0 0 40px rgba(219, 139, 28, 0.4),
    0 0 60px rgba(219, 139, 28, 0.2);
`;

export const ChroniclesLogo = styled.img`
  width: 250px;
  height: 250px;
  filter: drop-shadow(0 0 15px rgba(189, 139, 19, 0.6))
    drop-shadow(0 0 30px rgba(189, 139, 19, 0.3));
`;

export const ExitBar = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 12px 24px;
  border-radius: 20px;
  opacity: ${(props) => (props.$stage === 2 ? 1 : 0)};
  animation: ${(props) =>
    props.$stage === 1
      ? css`
          ${fadeIn} ${TIMING.EXIT_DURATION}s ease-out forwards ${TIMING.EXIT_DELAY}s
        `
      : 'none'};
`;

export const ExitLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ActionLine = styled.div`
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  position: absolute;
  width: 100%;
  max-width: 800px;
  margin-top: 25px;
  top: calc(10px + 250px + 5px + 72px + 50px);
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: ${fadeIn} ${TIMING.ACTION_DURATION}s ease-out forwards
    ${TIMING.ACTION_DELAY}s;
  letter-spacing: 0.5px;
  line-height: 1.3;

  background: linear-gradient(135deg, #b7611f 0%, #bd6117 50%, #913d0c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-stroke: 0.3px black;
  text-stroke: 0.3px black;

  filter: drop-shadow(0 0 8px rgba(247, 227, 126, 0.4));
`;

export const StageButton = styled.button`
  position: absolute;
  top: calc(10px + 250px + 5px + 72px + 32px + 130px + 90px);
  left: 50%;
  transform: translateX(-50%) translateY(0);
  padding: 14px 28px;
  border-radius: 30px;
  border: none;
  background: rgb(0, 0, 0);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0;
  animation: ${fadeIn} ${TIMING.BUTTON_DURATION}s ease-out forwards
    ${TIMING.BUTTON_DELAY}s;

  // Subtle float effect with centered shadow
  box-shadow:
    0 0 8px rgba(255, 255, 255, 0.1),
    0 0 14px rgba(255, 255, 255, 0.05);

  &:hover {
    box-shadow:
      0 0 15px rgba(255, 255, 255, 0.03),
      0 0 40px rgba(219, 139, 28, 0.35);
  }

  span {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 26px;
    font-weight: 800;
    letter-spacing: 3px;
    color: white;
    text-transform: uppercase;
  }

  svg {
    font-size: 22px;
    color: white;
    transition: transform 0.3s ease;
  }
`;

export const ExploreTitle = styled.h1`
  font-size: 64px;
  font-weight: 800;
  color: #db8b1c;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 40px;
  opacity: 0;
  animation: ${fadeScale} 0.6s ease-out forwards;
  text-shadow:
    0 0 10px rgba(189, 139, 19, 0.6),
    0 0 20px rgba(189, 139, 19, 0.4),
    0 0 30px rgba(189, 139, 19, 0.2);
  letter-spacing: 0.5px;
  line-height: 1.2;
  width: 100%;
  max-width: 1200px;
`;

export const BubblesGrid = styled.div`
  display: grid;
  grid-template-rows: 240px 195px;
  gap: 15px;
  opacity: 0;
  animation: ${fadeScale} 0.5s ease-out forwards 0.2s;
  width: 810px;
  margin: 0 auto;
`;

export const BubbleTitle = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  transition: all 0.5s ease;

  .prefix {
    font-size: ${(props) => (props.$isStory ? '36px' : '28px')};
    font-weight: 500;
    opacity: 0.9;
    margin-bottom: 0px;
    line-height: 1;
  }

  .main {
    font-size: ${(props) => (props.$isStory ? '72px' : '48px')};
    font-weight: 800;
    letter-spacing: 1px;
    line-height: 1;
  }
`;

export const BubbleCard = styled.div`
  position: relative;
  width: ${(props) => (props.$isStory ? '100%' : 'calc((810px - 30px) / 3)')};
  height: 100%;
  border-radius: 25px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  grid-column: ${(props) => (props.$isStory ? '1 / -1' : 'auto')};

  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    background: url(${(props) => props.$image}) center/cover no-repeat;
    filter: blur(4px) brightness(0.6) grayscale(1);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(189, 139, 19, 0.1) 0%,
      rgba(189, 139, 19, 0.05) 50%,
      transparent 100%
    );
    mix-blend-mode: overlay;
  }

  &:hover {
    transform: scale(1.03);
    box-shadow:
      0 0 50px rgba(189, 139, 19, 0.15),
      0 0 100px rgba(189, 139, 19, 0.1);
    border-color: rgba(189, 139, 19, 0.3);

    &::before {
      filter: blur(3px) brightness(0.7) sepia(0.3) grayscale(0);
      transform: scale(1.15);
    }

    ${BubbleTitle} {
      transform: translateY(-5px);
      .prefix,
      .main {
        text-shadow:
          0 0 30px rgba(189, 139, 19, 0.9),
          0 0 60px rgba(189, 139, 19, 0.6);
      }
    }
  }
`;

export const BottomRow = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  justify-content: space-between;
`;

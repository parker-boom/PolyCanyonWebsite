import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

const traceText = keyframes`
  0% {
    stroke-dashoffset: 100%;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const fadeScale = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const fadeSlideUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const pulseOutline = keyframes`
  0% { border-color: rgba(219, 139, 28, 0.4); }
  50% { border-color: rgba(219, 139, 28, 1); }
  100% { border-color: rgba(219, 139, 28, 0.4); }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
  position: relative;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => (props.$stage === 1 ? '20px' : '10px')};
  width: 100%;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: ${(props) => (props.$stage === 1 ? '85px' : '40px')};
`;

export const MainTitle = styled.h1`
  font-size: 72px;
  font-weight: 900;
  font-style: italic;
  color: transparent;
  position: relative;
  width: fit-content;
  opacity: 0;
  animation: ${fadeSlideUp} 0.6s ease-out forwards;

  svg {
    position: absolute;
    inset: -40px;
    width: calc(100% + 80px);
    height: calc(100% + 80px);
    overflow: visible;

    text {
      fill: #db8b1c;
      stroke: rgb(212, 169, 65);
      stroke-width: 1px;
      stroke-dasharray: 100%;
      animation:
        ${traceText} 1.2s ease forwards,
        ${fadeSlideUp} 0.6s ease-out forwards;
      filter: drop-shadow(0 0 10px rgba(189, 139, 19, 0.6))
        drop-shadow(0 0 20px rgba(189, 139, 19, 0.4))
        drop-shadow(0 0 30px rgba(189, 139, 19, 0.2));
    }
  }
`;

export const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #e9a830;
  text-align: center;
  max-width: 700px;
  line-height: 1.3;
  opacity: 0;
  animation: ${fadeSlideUp} 0.6s ease-out forwards 0.6s;
  letter-spacing: 0.5px;
  margin-top: -5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  span {
    display: block;
    white-space: nowrap;
  }
`;

export const ExitBar = styled.div`
  position: fixed;
  bottom: 30px;
  background: rgba(0, 0, 0, 0.9);
  padding: 12px 24px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.12),
    0 0 30px rgba(255, 255, 255, 0.07);
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$stage === 2 ? 1 : 0)};
  animation: ${(props) =>
    props.$stage === 1
      ? css`
          ${fadeSlideUp} 0.6s ease-out forwards 2.5s
        `
      : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 0 25px rgba(255, 255, 255, 0.15),
      0 0 50px rgba(255, 255, 255, 0.08);
  }
`;

export const ExitLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(-3px);
  }
`;

export const BubblesContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  padding: 100px;
`;

export const BubblesGrid = styled.div`
  display: grid;
  grid-template-rows: 240px 195px;
  gap: 15px;
  margin-bottom: 20px;
  opacity: 0;
  animation: ${fadeScale} 0.5s ease-out forwards 0.2s;
  width: 810px;
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

export const StageButton = styled.button`
  background: transparent;
  border: 2px solid rgba(219, 139, 28, 0.4);
  border-radius: 30px;
  color: white;
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 16px 32px;
  margin-top: 60px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  opacity: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  box-shadow:
    0 0 10px rgba(219, 139, 28, 0.1),
    0 0 20px rgba(219, 139, 28, 0.05),
    0 0 30px rgba(219, 139, 28, 0.025);

  animation:
    ${fadeSlideUp} 0.6s ease-out forwards 1.5s,
    ${pulseOutline} 2s ease-in-out infinite 2.1s;

  svg {
    font-size: 20px;
    font-weight: bold;
    transition: transform 0.3s ease;
    opacity: 0.7;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(219, 139, 28, 1);

    animation-duration: 1s;

    box-shadow:
      0 0 15px rgba(219, 139, 28, 0.2),
      0 0 30px rgba(219, 139, 28, 0.15),
      0 0 45px rgba(219, 139, 28, 0.1);

    svg {
      transform: translateX(5px);
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ExploreTitle = styled.h1`
  font-size: 64px;
  font-weight: 800;
  color: #db8b1c;
  text-align: center;
  margin-bottom: 40px;
  opacity: 0;
  animation: ${fadeSlideUp} 0.6s ease-out forwards;
  text-shadow:
    0 0 10px rgba(189, 139, 19, 0.6),
    0 0 20px rgba(189, 139, 19, 0.4),
    0 0 30px rgba(189, 139, 19, 0.2);
  letter-spacing: 0.5px;
  line-height: 1.2;
  max-width: 1200px;
`;

export const ChroniclesLogo = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 0px;
  filter: drop-shadow(0 0 15px rgba(189, 139, 19, 0.6))
    drop-shadow(0 0 30px rgba(189, 139, 19, 0.3));
  animation: ${fadeSlideUp} 1s ease-out forwards;
`;

export const BottomRow = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  justify-content: space-between;
`;

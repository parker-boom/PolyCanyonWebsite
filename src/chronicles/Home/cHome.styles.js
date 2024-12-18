import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const traceText = keyframes`
  0% {
    stroke-dashoffset: 100%;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const fadeScale = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const fadeSlideUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
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
  gap: ${(props) => (props.$stage === 1 ? '20px' : '40px')};
  width: 100%;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 85px;
`;

export const MainTitle = styled.h1`
  font-size: 72px;
  font-weight: 900;
  font-style: italic;
  color: transparent;
  position: relative;
  width: fit-content;
  opacity: 0;
  animation: ${fadeSlideUp} 1s ease-out forwards;

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
        ${traceText} 2s ease forwards,
        ${fadeSlideUp} 1s ease-out forwards;
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
  animation: ${fadeSlideUp} 1s ease-out forwards 1s;
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
  left: 50%;
  transform: translateX(-50%);
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

  &:hover {
    transform: translateX(-50%) translateY(-2px);
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
  grid-template-columns: repeat(2, 400px);
  gap: 40px;
  margin-bottom: 20px;
  opacity: 0;
  animation: ${fadeScale} 0.8s ease-out forwards 0.3s;
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
    font-size: 28px;
    font-weight: 500;
    opacity: 0.9;
    margin-bottom: 0px;
    line-height: 1;
  }

  .main {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: 1px;
    line-height: 1;
  }
`;

export const BubbleCard = styled.div`
  position: relative;
  width: 400px;
  height: 163px;
  border-radius: 40px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    background: url(${(props) => props.$image}) center/cover no-repeat;
    filter: blur(4px) brightness(0.6);
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
    transform: translateY(-10px);
    box-shadow:
      0 0 50px rgba(189, 139, 19, 0.15),
      0 0 100px rgba(189, 139, 19, 0.1);
    border-color: rgba(189, 139, 19, 0.3);

    &::before {
      filter: blur(3px) brightness(0.7) sepia(0.3);
      transform: scale(1.15);
    }

    ${BubbleTitle} {
      transform: translateY(-5px);

      .prefix,
      .main {
        color: rgb(189, 139, 19);
        text-shadow:
          0 0 30px rgba(189, 139, 19, 0.9),
          0 0 60px rgba(189, 139, 19, 0.6);
      }
    }
  }
`;

export const StageButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  color: white;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 16px 32px;
  margin-top: 60px;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeSlideUp} 1s ease-out forwards 2s;

  svg {
    font-size: 16px;
    transition: transform 0.3s ease;
    opacity: 0.7;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(189, 139, 19, 0.3);
    transform: translateY(-2px);
    color: rgb(189, 139, 19);
    box-shadow:
      0 0 30px rgba(189, 139, 19, 0.15),
      0 0 60px rgba(189, 139, 19, 0.1);

    svg {
      transform: translateX(5px);
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ExploreTitle = styled(MainTitle)`
  font-size: 64px;
  margin-bottom: 10px;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;

  svg text {
    filter: drop-shadow(0 0 8px rgba(189, 139, 19, 0.5))
      drop-shadow(0 0 15px rgba(189, 139, 19, 0.3));
  }
`;

export const ChroniclesLogo = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 0px;
  filter: drop-shadow(0 0 15px rgba(189, 139, 19, 0.6))
    drop-shadow(0 0 30px rgba(189, 139, 19, 0.3));
  animation: ${fadeSlideUp} 1s ease-out forwards;
`;

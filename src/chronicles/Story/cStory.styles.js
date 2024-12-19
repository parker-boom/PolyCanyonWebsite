import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  color: white;
  position: relative;
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
`;

export const NavigationBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  transform: scale(1.3);
  padding-top: 40px;
`;

export const NavigationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  padding: 0 40px;
`;

export const NavButton = styled.button`
  background: transparent;
  border: none;
  color: #db8b1c;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  opacity: 0.8;

  &:hover:not(:disabled) {
    opacity: 1;
    transform: translateX(
      ${(props) => (props.$direction === 'prev' ? '-8px' : '8px')}
    );
    text-shadow: 0 0 20px rgba(219, 139, 28, 0.4);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    font-size: 14px;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover:not(:disabled) svg {
    transform: translateX(
      ${(props) => (props.$direction === 'prev' ? '-5px' : '5px')}
    );
  }
`;

export const EraDisplay = styled.div`
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(219, 139, 28, 0.3);
  border-radius: 30px;
  padding: 16px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 400px;
  box-shadow:
    0 0 30px rgba(219, 139, 28, 0.1),
    0 0 60px rgba(219, 139, 28, 0.05);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(219, 139, 28, 0.5);
    box-shadow:
      0 0 40px rgba(219, 139, 28, 0.15),
      0 0 80px rgba(219, 139, 28, 0.08);
  }

  .era-name {
    font-size: 28px;
    font-weight: 800;
    color: #db8b1c;
    letter-spacing: 0.5px;
  }

  .time-period {
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 1px;
  }
`;

export const TimelineContainer = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 1000px;
  height: 60px;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(219, 139, 28, 0.3);
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-shadow:
    0 0 30px rgba(219, 139, 28, 0.1),
    0 0 60px rgba(219, 139, 28, 0.05);
`;

export const TimelineLine = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1px;
  display: flex;
  align-items: center;
  z-index: 1;
`;

export const TimelineSection = styled.div`
  height: 2px;
  width: ${(props) => props.$width};
  background: ${(props) => (props.$isActive ? '#db8b1c' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: ${(props) =>
    props.$isActive
      ? '0 0 10px rgba(219, 139, 28, 0.6), 0 0 20px rgba(219, 139, 28, 0.4)'
      : 'none'};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  &:hover {
    background: ${(props) =>
      props.$isActive ? '#db8b1c' : 'rgba(219, 139, 28, 0.4)'};

    &::before {
      background: rgba(219, 139, 28, 0.05);
    }
  }
`;

export const TimelineDivider = styled.div`
  width: 2px;
  height: 24px;
  background: ${(props) =>
    props.$isConnectedToActive ? '#db8b1c' : 'rgba(255, 255, 255, 0.4)'};
  transform: translateY(0);
  border-radius: 1px;
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.$isConnectedToActive ? '0 0 10px rgba(219, 139, 28, 0.4)' : 'none'};
  position: relative;
  z-index: 1;
`;

export const ContentContainer = styled.div`
  position: fixed;
  top: 185px;
  bottom: 185px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(90% - 30px);
  max-width: 1400px;
  display: flex;
  gap: 25px;
  margin: 0 15px;
`;

export const ImageColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  position: relative;
  overflow: visible;
  padding-right: 20px;
`;

export const TextColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(219, 139, 28, 0.05);
  border-radius: 25px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(219, 139, 28, 0.15);
  box-shadow:
    0 0 40px rgba(0, 0, 0, 0.9),
    0 0 100px rgba(255, 255, 255, 0.04),
    0 0 18px rgba(255, 255, 255, 0.3);
`;

export const TextTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #db8b1c;
  margin: 0;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(219, 139, 28, 0.2);
  text-shadow: 0 0 20px rgba(219, 139, 28, 0.4);
`;

export const TextHeader = styled.div`
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 3px;
  color: #db8b1c;
  text-transform: uppercase;
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(219, 139, 28, 0.3);
  text-shadow: 0 0 10px rgba(219, 139, 28, 0.4);
  position: relative;
  animation: glow 2s ease-in-out infinite alternate;

  @keyframes glow {
    from {
      text-shadow:
        0 0 10px rgba(219, 139, 28, 0.4),
        0 0 20px rgba(219, 139, 28, 0.2);
    }
    to {
      text-shadow:
        0 0 15px rgba(219, 139, 28, 0.6),
        0 0 25px rgba(219, 139, 28, 0.3);
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(219, 139, 28, 0.6),
      rgba(219, 139, 28, 0.2) 50%,
      rgba(219, 139, 28, 0.6)
    );
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.3;
    }
  }
`;

export const TextContent = styled.div`
  font-size: 21px;
  font-weight: 500;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  overflow-y: auto;
  padding-right: 15px;
  margin-top: 5px;

  p {
    margin: 0 0 24px 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(219, 139, 28, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(219, 139, 28, 0.3);
    border-radius: 4px;

    &:hover {
      background: rgba(219, 139, 28, 0.4);
    }
  }
`;

export const ContentOverlay = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  width: 51%;
  height: 100%;

  &:hover {
    backdrop-filter: blur(6.5px);
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const QuestionContainer = styled.div`
  padding: 30px;
  max-width: 80%;
  text-align: center;
  transform: translateY(-20px);
  position: relative;

  &::after {
    content: 'Click to Reveal';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    opacity: 0;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding-bottom: 2px;
  }

  ${ContentOverlay}:hover &::after {
    opacity: 1;
    transform: translateX(-50%) translateY(5px);
  }
`;

export const RevealButton = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 28px;
  font-weight: 700;
  color: white;
  line-height: 1.4;
  padding: 25px 20px;
  background: rgba(219, 139, 28, 0.2);
  border: 1px solid rgba(219, 139, 28, 0.3);
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background: rgba(219, 139, 28, 0.3);
    border-color: rgba(219, 139, 28, 0.5);
    box-shadow:
      0 0 30px rgba(219, 139, 28, 0.15),
      0 0 60px rgba(219, 139, 28, 0.1);
  }

  svg {
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  &:hover svg {
    opacity: 1;
  }
`;

export const ImageArea = styled.div`
  height: 75%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 0 40px rgba(0, 0, 0, 0.9),
    0 0 100px rgba(255, 255, 255, 0.04),
    0 0 18px rgba(255, 255, 255, 0.3);
`;

export const CaptionArea = styled.div`
  height: 25%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 0 40px rgba(0, 0, 0, 0.9),
    0 0 100px rgba(255, 255, 255, 0.04),
    0 0 18px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(219, 139, 28, 0.25) 0%,
      rgba(219, 139, 28, 0.15) 50%,
      rgba(219, 139, 28, 0.08) 100%
    );
    pointer-events: none;
    border-radius: 20px;
  }
`;

export const CaptionNavButton = styled.button`
  flex: 0 0 60px;
  height: 100%;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255, 255, 255, 0.2);
    ${(props) => (props.$direction === 'left' ? 'right: 0;' : 'left: 0;')}
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: rgba(219, 139, 28, 0.8);
    background: rgba(219, 139, 28, 0.05);
  }

  svg {
    font-size: 20px;
  }
`;

export const CaptionContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 100%;
  padding: 20px 0;
`;

export const CaptionText = styled.div`
  font-size: ${(props) => {
    const length = props.children?.toString().length || 0;
    if (length > 300) return '15px';
    if (length > 200) return '17px';
    return '19px';
  }};
  font-weight: 400;
  line-height: 1.3;
  text-align: center;
  width: 100%;
  transition: font-size 0.3s ease;
  padding: 0 15px;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const BlurredBackground = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  transform: scale(1.1);
  opacity: 0.8;
`;

export const MainImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const PhotoNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$direction === 'left' ? 'left: 20px;' : 'right: 20px;')}
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  opacity: 0;

  &:disabled {
    opacity: 0;
    cursor: not-allowed;
  }

  ${ImageContainer}:hover & {
    opacity: ${(props) => (props.disabled ? 0 : 0.8)};
  }

  &:hover:not(:disabled) {
    opacity: 1;
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.1);
  }

  svg {
    font-size: 20px;
  }
`;

export const ProgressDots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  padding: 0 15px;
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  transition: opacity 0.3s ease;
`;

export const ProgressDot = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  position: relative;
  overflow: hidden;
  box-shadow:
    0 0 10px rgba(0, 0, 0, 0.6),
    0 0 15px rgba(255, 255, 255, 0.35),
    inset 0 0 4px rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(0, 0, 0, 0.8);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: #db8b1c;
    transform: scaleX(${(props) => props.$progress});
    transform-origin: left;
    transition: transform 0.3s ease;
    box-shadow:
      0 0 10px rgba(219, 139, 28, 0.8),
      0 0 20px rgba(219, 139, 28, 0.6),
      0 0 30px rgba(219, 139, 28, 0.4);
  }
`;

import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #1a1100 0%, #000000 100%);
  color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const ExitBar = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 12px 24px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(219, 139, 28, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-50%) translateY(-2px);
    border-color: rgba(219, 139, 28, 0.5);
    box-shadow:
      0 0 20px rgba(219, 139, 28, 0.2),
      0 0 40px rgba(219, 139, 28, 0.1);
  }
`;

export const ExitLink = styled(Link)`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;

  &:hover {
    color: #db8b1c;

    svg {
      transform: translateX(-3px);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

export const NavigationBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  transform: scale(1.15);
`;

export const NavigationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: 100%;
  justify-content: center;
`;

export const NavButton = styled.button`
  position: absolute;
  ${(props) => (props.$direction === 'prev' ? 'left: 0;' : 'right: 0;')}
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #db8b1c;
  padding: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.8;
  font-size: 20px;

  &:hover:not(:disabled) {
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const EraDisplay = styled.div`
  background: rgba(219, 139, 28, 0.15);
  border: 1px solid rgba(219, 139, 28, 0.3);
  border-radius: 20px;
  padding: 16px 24px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 30px rgba(219, 139, 28, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(219, 139, 28, 0.2);
    border-color: rgba(219, 139, 28, 0.4);
  }

  .era-name {
    font-size: 38px;
    font-weight: 800;
    color: #db8b1c;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(219, 139, 28, 0.4);
  }
`;

export const TimelineContainer = styled.div`
  position: relative;
  width: 70%;
  height: 80px;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(219, 139, 28, 0.3);
  border-radius: 30px;
  display: flex;
  align-items: center;
  margin: 30px auto 0;
  box-shadow:
    0 0 30px rgba(219, 139, 28, 0.1),
    0 0 60px rgba(219, 139, 28, 0.05);
`;

export const TimelineWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 15% 70% 15%;
  width: 100%;
  height: 100%;
`;

export const NavArea = styled.button`
  background: transparent;
  border: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #db8b1c;
  opacity: 0.8;
  transition: all 0.3s ease;
  position: relative;
  padding: 0 15px;
  border-radius: 30px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 15%;
    bottom: 15%;
    width: 1px;
    background: rgba(219, 139, 28, 0.3);
    ${(props) => (props.$direction === 'prev' ? 'right: 0;' : 'left: 0;')}
  }

  .nav-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-direction: ${(props) =>
      props.$direction === 'prev' ? 'row-reverse' : 'row'};
  }

  .nav-text {
    font-size: 14px;
    font-weight: 600;
    opacity: 0;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: ${(props) => (props.$direction === 'prev' ? 'right' : 'left')};
    line-height: 1.3;
  }

  svg {
    font-size: 32px;
    transition: all 0.3s ease;
  }

  &:hover:not(:disabled) {
    opacity: 1;
    background: rgba(219, 139, 28, 0.1);

    .nav-text {
      opacity: 1;
    }

    svg {
      transform: scale(1.1);
    }
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
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
  margin-top: 40px;
  padding-left: 5px;
  padding-right: 5px;
`;

export const TimelineSection = styled.div`
  height: 2px;
  width: ${(props) => props.$width};
  background: ${(props) => (props.$isActive ? '#db8b1c' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  ${(props) =>
    props.$isActive &&
    `
    &::after {
      content: '${props.$years}';
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      color: #db8b1c;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
    }
  `}

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
  height: 30px;
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
  position: relative;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 25px;
  height: calc(100vh - 185px);
  width: calc(90% - 30px);
  max-width: 1800px;
  margin: 0 auto;
  padding-bottom: 20px;
  padding-top: 20px;
`;

export const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
  padding: 0 20px;
`;

export const TextColumn = styled.div`
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
  margin-left: 20px;
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
  width: 50%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

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

import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 20px rgba(219, 139, 28, 0.15), 0 0 40px rgba(219, 139, 28, 0.1); }
  50% { box-shadow: 0 0 30px rgba(219, 139, 28, 0.25), 0 0 60px rgba(219, 139, 28, 0.15); }
  100% { box-shadow: 0 0 20px rgba(219, 139, 28, 0.15), 0 0 40px rgba(219, 139, 28, 0.1); }
`;

const pulseOutline = keyframes`
  0% { border-color: rgba(219, 139, 28, 0.4); box-shadow: 0 0 20px rgba(219, 139, 28, 0.1); }
  50% { border-color: rgba(219, 139, 28, 0.8); box-shadow: 0 0 30px rgba(219, 139, 28, 0.2); }
  100% { border-color: rgba(219, 139, 28, 0.4); box-shadow: 0 0 20px rgba(219, 139, 28, 0.1); }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: black;
  color: white;
  position: relative;
  padding-top: 20px;
`;

export const ImageSection = styled.div`
  width: 950px;
  max-width: 95%;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  animation: ${glowPulse} 4s ease-in-out infinite;
  border: 1px solid rgba(219, 139, 28, 0.3);
  backdrop-filter: blur(10px);
  transform-origin: top center;
  animation:
    ${fadeIn} 0.6s ease-out,
    ${glowPulse} 4s ease-in-out infinite;
`;

export const HeaderBar = styled.div`
  width: 100%;
  height: 60px;
  background: linear-gradient(
    to right,
    rgba(219, 139, 28, 0.2),
    rgba(219, 139, 28, 0.3),
    rgba(219, 139, 28, 0.2)
  );
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(219, 139, 28, 0.3);
  position: relative;
  padding: 8px 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: baseline;
  gap: 15px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 450px;
  aspect-ratio: 16/9;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BlurredBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.$image});
  background-position: center;
  background-size: cover;
  filter: blur(20px) brightness(0.4);
  transform: scale(1.1);
  transition: all 0.5s ease-out;
`;

export const MainImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const StructureTitle = styled.h2`
  font-size: 29px;
  font-weight: 800;
  color: white;
  margin: 0;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.5px;
  line-height: 1.1;
`;

export const HeaderYear = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 2px;
`;

export const YearInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  color: #db8b1c;
  font-size: 18px;
  font-weight: 600;
  text-shadow:
    2px 2px 0 rgba(0, 0, 0, 0.8),
    -1px -1px 0 rgba(255, 255, 255, 0.2);
  z-index: 2;

  svg {
    opacity: 0.9;
    font-size: 16px;
  }
`;

export const ProjectDescription = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 25px 35px;
  border: 1px solid rgba(219, 139, 28, 0.2);
  backdrop-filter: blur(10px);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.3px;

  animation: ${fadeIn} 0.6s ease-out;
  box-shadow:
    0 0 20px rgba(219, 139, 28, 0.1),
    0 0 40px rgba(219, 139, 28, 0.05);
`;

export const SurpriseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin: 25px auto 0;
  padding: 21px 42px;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(219, 139, 28, 0.4);
  border-radius: 15px;
  color: white;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulseOutline} 3s infinite ease-in-out;
  backdrop-filter: blur(10px);

  svg {
    font-size: 28px;
    transition: all 0.3s ease;
  }

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(219, 139, 28, 0.2) 100%
    );
    transform: translateY(-2px);
    animation: none;
    border-color: rgba(219, 139, 28, 0.8);
    box-shadow:
      0 0 30px rgba(219, 139, 28, 0.2),
      0 0 60px rgba(219, 139, 28, 0.1);

    svg {
      transform: rotate(-15deg);
      color: #db8b1c;
    }
  }

  &:active {
    transform: translateY(0);
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
`;

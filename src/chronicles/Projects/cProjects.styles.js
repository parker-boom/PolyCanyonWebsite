import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  position: relative;
  padding-top: 20px;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background: ${(props) => `url(${props.$bgImage})`} center/cover;
    filter: blur(12x) brightness(0.7);
    transform: scale(1.1);
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: -1;
  }
`;

export const ImageSection = styled.div`
  width: 950px;
  max-width: 95%;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  transform-origin: top center;
  animation: ${fadeIn} 0.6s ease-out;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
`;

export const HeaderBar = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  color: #db8b1c;
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
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 20px 30px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.25px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
`;

export const SurpriseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin: 25px auto 0;
  padding: 21px 42px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  color: white;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  svg {
    font-size: 28px;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    background: rgba(0, 0, 0, 0.9);
    border-color: rgba(219, 139, 28, 0.5);
    box-shadow:
      0 5px 15px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(219, 139, 28, 0.2);

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
  background: rgba(0, 0, 0, 0.85);
  padding: 12px 24px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-50%) translateY(-2px);
    background: rgba(0, 0, 0, 0.95);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
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
    color: white;

    svg {
      transform: translateX(-3px);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

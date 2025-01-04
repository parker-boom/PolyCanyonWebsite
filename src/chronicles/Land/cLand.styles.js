import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #000000 0%, #001a00 100%);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 10px 20px 0;
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const MainContent = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  gap: 20px;
  margin: 10px 0;
`;

export const TextColumn = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InteractiveColumn = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TextSection = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(144, 238, 144, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TextContainer = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(144, 238, 144, 0.3);
    border-radius: 4px;

    &:hover {
      background: rgba(144, 238, 144, 0.5);
    }
  }
`;

export const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #90ee90;
  margin: 0;
  text-shadow: 0 0 10px rgba(144, 238, 144, 0.3);
  letter-spacing: 0.5px;
`;

export const InteractiveSection = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(144, 238, 144, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  & > * {
    max-height: 100%;
    max-width: 100%;
  }
`;

export const NavigationContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const TopSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: rgba(0, 0, 0, 0.4);
  padding: 15px 25px;
  border-radius: 30px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  box-shadow: 0 0 20px rgba(144, 238, 144, 0.1);
  backdrop-filter: blur(5px);

  &:hover {
    box-shadow:
      0 0 25px rgba(144, 238, 144, 0.15),
      0 0 50px rgba(144, 238, 144, 0.1);
  }
`;

export const TopContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: fit-content;
`;

export const SelectedIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const DisplayIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(34, 139, 34, 0.4),
    rgba(218, 165, 32, 0.4)
  );
  border: 2px solid rgba(144, 238, 144, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 15px rgba(144, 238, 144, 0.3),
    inset 0 0 10px rgba(144, 238, 144, 0.2);

  svg {
    font-size: 24px;
    color: #90ee90;
    filter: drop-shadow(0 0 5px rgba(144, 238, 144, 0.3));
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(120deg, #90ee90, #daa520);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-align: left;
  filter: drop-shadow(0 0 10px rgba(144, 238, 144, 0.3));
  letter-spacing: 1px;
  flex: 1;
`;

export const IconsBar = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px 25px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(144, 238, 144, 0.2);
  border-radius: 30px;
  backdrop-filter: blur(5px);
  box-shadow:
    0 0 20px rgba(144, 238, 144, 0.1),
    0 0 40px rgba(144, 238, 144, 0.05);
  justify-content: center;

  &:hover {
    box-shadow:
      0 0 25px rgba(144, 238, 144, 0.15),
      0 0 50px rgba(144, 238, 144, 0.1);
  }
`;

export const NavIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ $isSelected }) =>
    $isSelected
      ? 'linear-gradient(135deg, rgba(34,139,34,0.4), rgba(218,165,32,0.4))'
      : 'rgba(0, 0, 0, 0.8)'};
  border: 2px solid
    ${({ $isSelected }) =>
      $isSelected ? 'rgba(144,238,144,0.8)' : 'rgba(144,238,144,0.3)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $isSelected }) =>
    $isSelected
      ? '0 0 15px rgba(144,238,144,0.3), inset 0 0 10px rgba(144,238,144,0.2)'
      : 'none'};

  svg {
    font-size: 24px;
    color: ${({ $isSelected }) =>
      $isSelected ? '#90ee90' : 'rgba(255,255,255,0.7)'};
    transition: all 0.3s ease;
    filter: ${({ $isSelected }) =>
      $isSelected ? 'drop-shadow(0 0 5px rgba(144,238,144,0.3))' : 'none'};
  }

  &:hover {
    border-color: rgba(144, 238, 144, 0.6);
    background: ${({ $isSelected }) =>
      $isSelected
        ? 'linear-gradient(135deg, rgba(34,139,34,0.4), rgba(218,165,32,0.4))'
        : 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(34,139,34,0.2))'};

    svg {
      color: ${({ $isSelected }) =>
        $isSelected ? '#90ee90' : 'rgba(144,238,144,0.9)'};
      transform: scale(1.1);
    }
  }
`;

export const ExitBar = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 12px 24px;
  border-radius: 20px;
  border: 1px solid rgba(144, 238, 144, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(144, 238, 144, 0.5);
    box-shadow:
      0 0 20px rgba(144, 238, 144, 0.2),
      0 0 40px rgba(144, 238, 144, 0.1);
  }
`;

export const ExitLink = styled(Link)`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: #90ee90;

    svg {
      transform: translateX(-3px);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

export const ParagraphText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 17.5px;
  line-height: 1.5;
  margin: 0;
  text-align: justify;
  letter-spacing: 0.12px;
  white-space: pre-wrap;
  animation: ${fadeIn} 0.5s ease-out;
`;

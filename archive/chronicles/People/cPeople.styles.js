import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: black;
  color: white;
  position: relative;
  padding: calc(15vh) 40px 80px 40px;
  gap: 40px;
`;

export const Title = styled.h1`
  font-size: 64px;
  font-weight: 800;
  margin: 0 0 30px;
  color: white;
  text-transform: uppercase;
  position: relative;
  text-align: center;

  &::before {
    content: 'THE PEOPLE';
    position: absolute;
    left: -2px;
    top: -2px;
    color: #4a7;
    z-index: -1;
  }

  &::after {
    content: 'THE PEOPLE';
    position: absolute;
    left: 2px;
    top: 2px;
    color: #bd8b13;
    z-index: -2;
  }
`;

export const MainParagraph = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #4a7;
  border-right: 2px solid #bd8b13;
  border-bottom: 2px solid #bd8b13;
  border-radius: 12px;
  padding: 30px;
  max-width: 800px;
  position: relative;
  animation: ${fadeIn} 0.6s ease-out;
  box-shadow:
    6px 6px 0 rgba(74, 170, 119, 0.2),
    12px 12px 0 rgba(189, 139, 19, 0.1);

  p {
    font-size: 24px;
    line-height: 1.6;
    color: white;
    margin: 0;
    text-shadow:
      0 0 20px rgba(74, 170, 119, 0.3),
      0 0 40px rgba(189, 139, 19, 0.2);
  }
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  max-width: 1000px;
  animation: ${fadeIn} 0.6s ease-out 0.3s backwards;
`;

export const IconContainer = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
  color: #4a7;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    filter: drop-shadow(2px 2px 0 #bd8b13);
  }
`;

export const ButtonTitle = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const MainButton = styled.button`
  aspect-ratio: 1;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #4a7;
  border-right: 2px solid #bd8b13;
  border-bottom: 2px solid #bd8b13;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow:
    6px 6px 0 rgba(74, 170, 119, 0.2),
    12px 12px 0 rgba(189, 139, 19, 0.1);
  overflow: hidden;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow:
      8px 8px 0 rgba(74, 170, 119, 0.3),
      16px 16px 0 rgba(189, 139, 19, 0.2);
    border-color: #5cb85c #d4a941 #d4a941 #5cb85c;

    ${IconContainer} {
      transform: scale(1.1);
      color: #5cb85c;
    }
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow:
      4px 4px 0 rgba(74, 170, 119, 0.2),
      8px 8px 0 rgba(189, 139, 19, 0.1);
  }
`;

export const SecondaryButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  max-width: 1000px;
  animation: ${fadeIn} 0.6s ease-out 0.2s backwards;
  margin-bottom: 30px;
`;

export const SecondaryButton = styled(MainButton)`
  aspect-ratio: auto;
  height: 100px;
  grid-column: span 1;
  flex-direction: row;
  gap: 15px;
  padding: 15px 30px;
  border-radius: 12px;

  ${IconContainer} {
    font-size: 36px;
    margin-bottom: 0;
  }

  ${ButtonTitle} {
    font-size: 20px;
  }
`;

export const ExitBar = styled.div`
  position: fixed;
  bottom: 30px;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #4a7;
  border-right: 2px solid #bd8b13;
  border-bottom: 2px solid #bd8b13;
  border-radius: 12px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow:
    4px 4px 0 rgba(74, 170, 119, 0.2),
    8px 8px 0 rgba(189, 139, 19, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 12px;
    text-shadow:
      1px 1px 0 rgba(74, 170, 119, 0.5),
      -1px -1px 0 rgba(189, 139, 19, 0.5);
    font-size: 18px;
    font-weight: 500;
  }

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow:
      6px 6px 0 rgba(74, 170, 119, 0.3),
      12px 12px 0 rgba(189, 139, 19, 0.2);
    border-color: #5cb85c #d4a941 #d4a941 #5cb85c;
  }
`;

// Comic Strip Styles
export const ComicContainer = styled.div`
  position: fixed;
  inset: 0;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 10px;
  z-index: 100;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  position: relative;
  padding: 0 60px;
`;

export const ImageSection = styled.div`
  height: 50vh;
  margin-bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  img {
    height: 100%;
    width: auto;
    object-fit: contain;
    animation: ${slideIn} 0.3s ease-out;
  }
`;

export const TextSection = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  border: 3px solid #4a7;
  border-right: 3px solid #bd8b13;
  border-bottom: 3px solid #bd8b13;
  border-radius: 12px;
  padding: 20px 40px;
  box-shadow:
    8px 8px 0 rgba(74, 170, 119, 0.2),
    16px 16px 0 rgba(189, 139, 19, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${slideIn} 0.3s ease-out;
`;

export const BlurbText = styled.p`
  color: white;
  font-size: 20px;
  line-height: 1.6;
  margin: 0;
  text-shadow:
    0 0 20px rgba(74, 170, 119, 0.3),
    0 0 40px rgba(189, 139, 19, 0.2);
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
`;

export const Navigation = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;
`;

export const NavButton = styled.button`
  background: none;
  border: 2px solid white;
  border-radius: 50%;
  color: ${(props) => (props.disabled ? '#555' : 'white')};
  font-size: 24px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  transition: all 0.3s ease;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};

  &:not(:disabled):hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const PhaseDots = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
`;

export const PhaseDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? '#bd8b13' : '#4a7')};
  opacity: ${(props) => (props.$active ? 1 : 0.3)};
`;

export const Counter = styled.div`
  color: white;
  font-size: 14px;
  opacity: 0.8;
`;

export const BackButton = styled.button`
  position: fixed;
  bottom: 30px;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #4a7;
  border-right: 2px solid #bd8b13;
  border-bottom: 2px solid #bd8b13;
  border-radius: 12px;
  padding: 10px 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow:
    4px 4px 0 rgba(74, 170, 119, 0.2),
    8px 8px 0 rgba(189, 139, 19, 0.1);

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow:
      6px 6px 0 rgba(74, 170, 119, 0.3),
      12px 12px 0 rgba(189, 139, 19, 0.2);
    border-color: #5cb85c #d4a941 #d4a941 #5cb85c;
  }
`;

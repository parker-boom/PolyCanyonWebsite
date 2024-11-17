import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
  padding: 10px 15px 20px;
`;

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ZoomableContainer = styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(189, 139, 19, 0.25);
  background: ${(props) => {
    switch (props.mapType) {
      case 'dark':
        return '#000000';
      case 'satellite':
        return `url(${props.blurredBg}) center/cover no-repeat`;
      default:
        return '#ffffff';
    }
  }};
`;

export const MapImage = styled.img`
  height: 100%;
  object-fit: contain;
  cursor: grab;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:active {
    cursor: grabbing;
  }
`;

export const MapPicker = styled.div`
  display: flex;
  background: rgba(189, 139, 19, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 25px;
  padding: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(55, 109, 49, 0.1);
`;

export const PickerOption = styled.button`
  flex: 1;
  padding: 12px 24px;
  background: ${(props) => (props.active ? '#376d31' : 'transparent')};
  color: ${(props) => (props.active ? '#ffffff' : '#376d31')};
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${(props) =>
      props.active ? '#376d31' : 'rgba(55, 109, 49, 0.1)'};
  }

  svg {
    font-size: 20px;
  }
`;

// Updated web styles
export const WebContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 5px;
`;

export const CarouselContainer = styled.div`
  position: relative;
  height: calc(100vh - 200px);
  aspect-ratio: 16/9;
`;

export const MapSlide = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;

  img {
    height: 100%;
    width: auto;
    border-radius: 20px;
    box-shadow: ${(props) =>
      props.active
        ? '0 8px 30px rgba(0, 0, 0, 0.8)'
        : '0 4px 20px rgba(0, 0, 0, 0.4)'};
  }

  ${(props) =>
    props.active
      ? `
    z-index: 3;
    transform: translate(-50%, -50%);
  `
      : `
    z-index: 1;
    transform: translate(${props.position === 'left' ? '-85%' : '-15%'}, -50%);
    opacity: 0.85;
  `}
`;

export const NavigationControls = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const ArrowControls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const ArrowButton = styled.button`
  background: ${(props) =>
    props.active ? '#376d31' : 'rgba(189, 139, 19, 0.15)'};
  color: ${(props) => (props.active ? '#ffffff' : '#376d31')};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(55, 109, 49, 0.1);

  &:hover {
    transform: scale(1.1);
    background: #376d31;
    color: white;
  }

  svg {
    font-size: 24px;
  }
`;

export const Indicators = styled.div`
  display: flex;
  gap: 12px;
`;

export const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? '#376d31' : 'rgba(189, 139, 19, 0.15)'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

export const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.1;
  position: relative;
  padding: 20px 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(189, 139, 19, 0.5),
      transparent
    );
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 180px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(189, 139, 19, 0.5),
      transparent
    );
  }
`;

export const TitleTop = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 400;
  font-style: italic;
  color: #376d31;
  margin-bottom: 10px;
  opacity: 0.9;
  letter-spacing: 0.5px;
  transform: translateY(12px);
`;

export const TitleBottom = styled.h1`
  font-size: 68px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -1.5px;
  line-height: 1;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1),
    rgba(189, 139, 19, 0.85)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  padding: 0 24px;
  animation: titleGlow 3s ease-in-out infinite;

  @keyframes titleGlow {
    0%,
    100% {
      text-shadow:
        0 0 1px rgba(189, 139, 19, 0.2),
        0 0 2px rgba(189, 139, 19, 0.2),
        0 0 3px rgba(189, 139, 19, 0.2);
      filter: brightness(1);
    }
    50% {
      text-shadow:
        0 0 2px rgba(189, 139, 19, 0.3),
        0 0 4px rgba(189, 139, 19, 0.3),
        0 0 6px rgba(189, 139, 19, 0.3);
      filter: brightness(1.1);
    }
  }
`;

export const TitleTagline = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #376d31;
  margin-top: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.8;
`;

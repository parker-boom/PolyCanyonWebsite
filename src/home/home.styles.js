import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.4; transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulseOutline = keyframes`
  0% { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 2px rgba(189, 139, 19, 0.3); }
  50% { box-shadow: 0 4px 20px rgba(189, 139, 19, 0.2), 0 0 0 3px rgba(189, 139, 19, 0.5); }
  100% { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 2px rgba(189, 139, 19, 0.3); }
`;

export const HomeContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: white;
  padding: 20px 0;
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;
  gap: 24px;
`;

export const GlassNav = styled.nav`
  background: linear-gradient(
    to bottom,
    rgba(232, 239, 232, 0.95),
    rgba(232, 239, 232, 0.85)
  );
  width: 100%;
  border-radius: 25px;
  padding: 12px 40px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(55, 109, 49, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(55, 109, 49, 0.15);
  backdrop-filter: blur(8px);
`;

export const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 48px;

  &:hover {
    > * {
      transform: translateY(-1px);
    }
  }
`;

export const Logo = styled.img`
  height: 44px;
  width: 44px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 2px 8px rgba(55, 109, 49, 0.15),
    0 1px 2px rgba(189, 139, 19, 0.1);
  border: 2px solid rgba(189, 139, 19, 0.1);

  &:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      0 4px 12px rgba(55, 109, 49, 0.2),
      0 2px 4px rgba(189, 139, 19, 0.15);
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 10px;
`;

export const NavLink = styled(Link)`
  position: relative;
  color: #333333;
  text-decoration: none;
  font-size: 17px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    font-size: 16px;
    color: #376d31;
  }

  &:hover {
    background-color: rgba(55, 109, 49, 0.05);
    box-shadow: 0 0 0 1px rgba(189, 139, 19, 0.1);
  }
`;

export const SiteTitle = styled.h1`
  font-size: 32px;
  font-weight: 900;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1) 0%,
    rgba(212, 169, 65, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(189, 139, 19, 0.1);

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
    text-shadow: 0 4px 8px rgba(189, 139, 19, 0.2);
  }
`;

export const MainContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 0 20px;
  margin-top: 48px;
`;

// Glass Card Base
export const GlassCard = styled(Link)`
  aspect-ratio: 3/4;
  padding: 32px 24px;
  border-radius: 24px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.2),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);

    &::before {
      opacity: 1;
    }
  }
`;

export const AppCard = styled(GlassCard)`
  background: linear-gradient(
    135deg,
    rgba(128, 128, 128, 0.25),
    rgba(128, 128, 128, 0.1)
  );
`;

export const InfoCard = styled(GlassCard)`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.15)
  );
`;

export const StructuresCard = styled(GlassCard)`
  background: linear-gradient(
    135deg,
    rgba(55, 109, 49, 0.25),
    rgba(55, 109, 49, 0.1)
  );
`;

export const CardIcon = styled.div`
  font-size: 48px;
  color: #376d31;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.15);

  ${GlassCard}:hover & {
    transform: scale(1.1);
    box-shadow:
      0 0 30px rgba(55, 109, 49, 0.2),
      inset 0 2px 2px rgba(255, 255, 255, 0.2);
  }
`;

export const CardTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #376d31;
  margin: 0 0 16px 0;
  transition: all 0.3s ease;
`;

export const CardDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #2c3e50;
  margin: 0;
  opacity: 0.9;
  max-width: 280px;
`;

export const ChroniclesButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 0px;
  padding: 6px 8px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.3px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 20px;
  text-shadow: 0 0 15px rgba(189, 139, 19, 0.5);

  // Move the text content into a span to keep it above everything
  span {
    position: relative;
    z-index: 3;
    background: linear-gradient(
      90deg,
      rgb(189, 139, 19) 0%,
      rgb(212, 169, 65) 50%,
      rgb(189, 139, 19) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 4s linear infinite;
  }

  // Glowing orb icon
  &::before {
    content: '✧';
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${pulseGlow} 2s ease-in-out infinite;
    text-shadow: 0 0 15px rgba(189, 139, 19, 0.8);
    -webkit-text-fill-color: rgb(189, 139, 19);
    position: relative;
    z-index: 3;
  }

  &:hover {
    transform: translateY(-2px);
    padding: 6px 20px;

    // Move background effects to a separate pseudo-element
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255, 248, 235, 0.1);
      box-shadow:
        0 0 20px rgba(189, 139, 19, 0.2),
        0 0 30px rgba(189, 139, 19, 0.1),
        inset 0 0 15px rgba(189, 139, 19, 0.1);
      border-radius: 20px;
      z-index: 1;
    }

    &::before {
      animation: ${pulseGlow} 1s ease-in-out infinite;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const MainSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 24px;
  margin-top: 24px;
`;

export const StructureShowcase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StructureImageArea = styled.div`
  background: rgba(189, 139, 19, 0.15);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(189, 139, 19, 0.1);
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(189, 139, 19, 0.2);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.1),
    0 12px 24px rgba(0, 0, 0, 0.15);
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

export const StructureNumber = styled.div`
  background: rgba(51, 51, 51, 0.08);
  color: #333;
  font-weight: 600;
  font-size: 18px;
  padding: 6px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &::before {
    content: '#';
    opacity: 0.5;
  }
`;

export const ViewButton = styled.div`
  color: #376d31;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  svg {
    font-size: 24px;
  }
`;

export const TitleContainer = styled.div`
  background: #e8efe8;
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 4px 20px rgba(255, 255, 255, 0.15),
    0 2px 4px rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #dbe7db;
    box-shadow:
      0 8px 30px rgba(255, 255, 255, 0.2),
      0 4px 8px rgba(255, 255, 255, 0.15);

    ${StructureNumber} {
      background: rgba(51, 51, 51, 0.12);
    }

    ${ViewButton} {
      transform: translateX(4px);
    }
  }
`;

export const StructureTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: #bd8b13;
  text-align: left;
  letter-spacing: -0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;

export const ResearchText = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;

  svg {
    font-size: 24px;
    color: #376d31;
  }

  span {
    font-size: 16px;
    opacity: 0.8;
    font-weight: normal;
    margin-left: 8px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`;

export const ButtonsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: linear-gradient(
    to bottom,
    rgba(232, 239, 232, 0.95),
    rgba(232, 239, 232, 0.85)
  );
  border-radius: 24px;
  padding: 20px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(55, 109, 49, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(55, 109, 49, 0.15);
  backdrop-filter: blur(8px);
`;

export const ActionButton = styled(Link)`
  flex: 1;
  background: ${(props) =>
    props.$type === 'info'
      ? `linear-gradient(
      135deg,
      rgba(254, 255, 247, 1) 0%,
      rgba(189, 139, 19, 0.03) 75%,
      rgba(189, 139, 19, 0.22) 100%
    )`
      : `linear-gradient(
      135deg,
      rgba(250, 255, 247, 1) 0%,
      rgba(55, 109, 49, 0.03) 75%,
      rgba(55, 109, 49, 0.22) 100%
    )`};
  border-radius: 20px;
  padding: 40px 24px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid
    ${(props) =>
      props.$type === 'info'
        ? 'rgba(189, 139, 19, 0.1)'
        : 'rgba(55, 109, 49, 0.1)'};
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.02),
    0 4px 8px rgba(0, 0, 0, 0.02);

  svg {
    font-size: 52px;
    color: ${(props) => (props.$type === 'info' ? '#bd8b13' : '#376d31')};
    opacity: 0.9;
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  &:hover {
    transform: translateY(-4px);
    background: ${(props) =>
      props.$type === 'info'
        ? `linear-gradient(
        135deg,
        rgba(189, 139, 19, 0.05) 0%,
        rgba(189, 139, 19, 0.05) 60%,
        rgba(189, 139, 19, 0.15) 100%
      )`
        : `linear-gradient(
        135deg,
        rgba(55, 109, 49, 0.05) 0%,
        rgba(55, 109, 49, 0.05) 60%,
        rgba(55, 109, 49, 0.15) 100%
      )`};
    border-color: ${(props) =>
      props.$type === 'info'
        ? 'rgba(189, 139, 19, 0.2)'
        : 'rgba(55, 109, 49, 0.2)'};
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.06),
      0 4px 8px rgba(0, 0, 0, 0.04);

    svg {
      transform: scale(1.1);
      opacity: 1;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
    }
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2px;
`;

export const ButtonTitle = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: ${(props) => (props.$type === 'info' ? '#bd8b13' : '#376d31')};
  transition: all 0.3s ease;
  opacity: 0.9;

  ${ActionButton}:hover & {
    opacity: 1;
  }
`;

export const ButtonSubtitle = styled.span`
  font-size: 15px;
  color: #666;
  max-width: 200px;
  display: block;
  margin: 0 auto;
  transition: all 0.3s ease;
  opacity: 0.8;

  ${ActionButton}:hover & {
    opacity: 1;
  }
`;

export const MainLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  min-height: 530px;
`;

export const StructuresSection = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(232, 239, 232, 0.95),
    rgba(232, 239, 232, 0.85)
  );
  border-radius: 24px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(55, 109, 49, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(55, 109, 49, 0.15);
  backdrop-filter: blur(8px);
  padding: 20px;
  display: grid;
  grid-template-columns: 56% 41%;
  gap: 20px;
`;

export const InfoIcon = styled.div`
  color: #376d31;
  font-size: 72px;
  margin-bottom: 32px;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(55, 109, 49, 0.2));
`;

export const InfoTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #376d31;
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

export const InfoSubtitle = styled.h3`
  font-size: 36px;
  font-weight: 800;
  color: #376d31;
  margin: 0 0 16px 0;
  line-height: 1.2;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(55, 109, 49, 0.1);
`;

export const InfoDescription = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: #666;
  margin: 0;
  font-weight: 500;
  transition: all 0.3s ease;
`;

export const StructureInfoArea = styled.div`
  background: linear-gradient(
    135deg,
    rgba(250, 255, 247, 1) 0%,
    rgba(232, 239, 232, 0.9) 85%,
    rgba(235, 230, 200, 1) 100%
  );
  backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(55, 109, 49, 0.1);
  position: relative;

  &:hover {
    transform: translateY(-8px);
    background: linear-gradient(
      135deg,
      rgba(55, 109, 49, 0.15) 0%,
      rgba(55, 109, 49, 0.05) 80%,
      rgba(255, 255, 255, 0.9) 100%
    );
    box-shadow:
      0 20px 40px rgba(55, 109, 49, 0.15),
      0 8px 16px rgba(55, 109, 49, 0.1);

    ${InfoIcon} {
      transform: translateY(-4px);
      color: #376d31;
    }
  }
`;

export const TitleContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CornerChevron = styled(FaChevronDown)`
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 20px;
  color: rgba(189, 139, 19, 0.4);
  transform: rotate(-45deg);
  transition: all 0.3s ease;

  ${StructureInfoArea}:hover & {
    color: #bd8b13;
    transform: rotate(-45deg) scale(1.4);
  }
`;

export const ChroniclesContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
`;

export const ChroniclesTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ChroniclesBanner = styled(Link)`
  width: 100%;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 0.55) 0%,
    #fff7e5 45%,
    #fff7e5 55%,
    rgba(189, 139, 19, 0.55) 100%
  );
  border-radius: 24px;
  padding: 32px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${pulseOutline} 3s ease-in-out infinite;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(189, 139, 19, 0.15),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--mouse-x, center) var(--mouse-y, center),
      rgba(189, 139, 19, 0.15),
      transparent 120px
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    background: #e5e5cd;

    &:before {
      transform: translateX(100%);
    }

    &:after {
      opacity: 1;
    }
  }
`;

export const ChroniclesTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: rgba(189, 139, 19, 0.9);
  margin: 0;
  letter-spacing: 4px;
  text-shadow: 0 2px 4px rgba(189, 139, 19, 0.1);
  transition: all 0.3s ease;

  ${ChroniclesBanner}:hover & {
    color: rgb(189, 139, 19);
    text-shadow: 0 2px 8px rgba(189, 139, 19, 0.2);
  }
`;

export const ChroniclesSubtitle = styled.div`
  font-size: 16px;
  color: #666;
  letter-spacing: 2px;
  font-weight: 500;
  transition: all 0.3s ease;

  strong {
    color: rgba(1, 1, 1, 0.7);
    font-weight: 700;
    transition: all 0.3s ease;
  }

  ${ChroniclesBanner}:hover & {
    color: #555;

    strong {
      color: rgb(189, 139, 19);
    }
  }
`;

export const ChroniclesIcon = styled.span`
  font-size: 24px;
  color: rgba(189, 139, 19, 0.9);
  opacity: 0.9;
  text-shadow: 0 2px 4px rgba(189, 139, 19, 0.1);
  transition: all 0.3s ease;

  ${ChroniclesBanner}:hover & {
    color: rgb(189, 139, 19);
    text-shadow: 0 2px 8px rgba(189, 139, 19, 0.2);
    transform: scale(1.1) rotate(180deg);
  }
`;

export const WelcomeRow = styled.div`
  width: 100%;
  height: 150px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
`;

export const RandomStructureSection = styled.div`
  background: linear-gradient(
    135deg,
    rgba(55, 109, 49, 0.12),
    rgba(55, 109, 49, 0.08)
  );
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(55, 109, 49, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(55, 109, 49, 0.15);
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(55, 109, 49, 0.3);
    background: linear-gradient(
      135deg,
      rgba(55, 109, 49, 0.15),
      rgba(55, 109, 49, 0.1)
    );
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.12),
      0 4px 8px rgba(55, 109, 49, 0.15),
      inset 0 1px 1px rgba(255, 255, 255, 0.6);
  }
`;

export const DiceIcon = styled.div`
  font-size: 42px;
  color: #376d31;
  margin-bottom: 12px;
  transition: all 0.3s ease;

  ${RandomStructureSection}:hover & {
    transform: rotate(180deg) scale(1.1);
    color: rgba(189, 139, 19, 0.9);
  }
`;

export const RandomStructureText = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #376d31;
  text-align: center;
  transition: all 0.3s ease;

  ${RandomStructureSection}:hover & {
    color: rgba(189, 139, 19, 0.9);
  }
`;

export const WelcomeSection = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.9),
    rgba(255, 245, 222, 0.85)
  );
  border-radius: 24px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(189, 139, 19, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(189, 139, 19, 0.15);
  backdrop-filter: blur(8px);
`;

export const WelcomeText = styled.div`
  flex: 1;
`;

export const WelcomeTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #376d31;
  margin: 0 0 8px 0;
  line-height: 1.1;
`;

export const WelcomeSubtitle = styled.div`
  font-size: 24px;
  color: rgba(189, 139, 19, 0.9);
  font-weight: 600;
`;

export const WelcomeLogo = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow:
    0 4px 12px rgba(55, 109, 49, 0.2),
    0 2px 4px rgba(189, 139, 19, 0.1);
  border: 2px solid rgba(189, 139, 19, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow:
      0 8px 24px rgba(55, 109, 49, 0.25),
      0 4px 8px rgba(189, 139, 19, 0.15);
  }
`;

export const QuoteRow = styled.div`
  width: 100%;
  height: 150px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 24px;
`;

export const QuoteContainer = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.9),
    rgba(255, 245, 222, 0.85)
  );
  border-radius: 24px;
  padding: 32px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(189, 139, 19, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(189, 139, 19, 0.15);
  backdrop-filter: blur(8px);
  overflow: hidden;

  &::before,
  &::after {
    content: '✧';
    position: absolute;
    font-size: 24px;
    color: rgba(55, 109, 49, 0.6);
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
  }

  &::before {
    left: 24px;
  }

  &::after {
    right: 24px;
  }

  &:hover {
    &::before,
    &::after {
      color: rgba(55, 109, 49, 0.8);
    }
  }
`;

export const QuoteText = styled.div`
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    rgba(55, 109, 49, 0.9),
    rgba(55, 109, 49, 0.7)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  line-height: 1.4;
  letter-spacing: -0.3px;
  padding: 0 40px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const QuoteAuthor = styled.div`
  position: absolute;
  bottom: 16px;
  right: 40px;
  font-size: 18px;
  font-weight: 700;
  color: rgba(189, 139, 19, 0.9);
  opacity: 0.9;
`;

export const ImageContainer2 = styled.div`
  background: linear-gradient(
    135deg,
    rgba(55, 109, 49, 0.12),
    rgba(55, 109, 49, 0.08)
  );
  border-radius: 24px;
  overflow: hidden;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(55, 109, 49, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(55, 109, 49, 0.15);
  backdrop-filter: blur(8px);
  padding: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

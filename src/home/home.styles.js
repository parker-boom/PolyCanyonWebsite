import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

export const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
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
  @media (max-width: 1100px) {
    padding: 0 20px;
  }
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
  flex-wrap: wrap;
  gap: 12px;
`;

export const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: auto;

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
  gap: 10px;
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

export const SiteTitle = styled.div`
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

export const StructureImageArea = styled.div`
  background: rgba(189, 139, 19, 0.15);
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

export const TitleContainer = styled(Link)`
  text-decoration: none;
  background: #e8efe8;
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
  white-space: normal;
  overflow-wrap: anywhere;
  min-width: 0;
  max-width: 250px;
  @media (max-width: 1000px) {
    font-size: 18px;
  }
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
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
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
  padding: 20px;
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 20px;
`;

export const InfoIcon = styled.div`
  color: #376d31;
  font-size: 72px;
  margin-bottom: 32px;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(55, 109, 49, 0.2));
`;

export const InfoSubtitle = styled.h3`
  font-size: clamp(24px, 2.6vw, 36px);
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

export const StructureInfoArea = styled(Link)`
  text-decoration: none;
  background: linear-gradient(
    135deg,
    rgba(250, 255, 247, 1) 0%,
    rgba(232, 239, 232, 0.9) 85%,
    rgba(235, 230, 200, 1) 100%
  );
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
  min-width: 0;
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

export const WelcomeRow = styled.div`
  width: 100%;
  min-height: 150px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
`;

export const RandomStructureSection = styled.button`
  font: inherit;
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
`;

export const WelcomeText = styled.div`
  flex: 1;
`;

export const WelcomeTitle = styled.h1`
  font-size: clamp(26px, 2.8vw, 36px);
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

export const AboutBanner = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 26px 32px;
  border-radius: 24px;
  text-decoration: none;
  color: #376d31;
  background: linear-gradient(135deg, #f2e4bf, #fff7e5 65%);
  border: 1px solid rgba(189, 139, 19, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;
export const AboutContent = styled.div``;
export const AboutTitle = styled.h2`
  margin: 0 0 6px;
  font-size: 26px;
  font-weight: 800;
`;
export const AboutSubtitle = styled.p`
  margin: 0;
  color: #65572f;
  line-height: 1.5;
`;

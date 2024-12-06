/**
 * Work in progress...
 */

/*
Imports
*/
import styled from 'styled-components';

/*
Styles
*/
export const PageContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 5px 15px;
  background-color: #ffffff;
  box-sizing: border-box;
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

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 110%;
    background: none;
    z-index: -1;
    opacity: 0.5;
    animation: glowPulse 3s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.7;
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
  position: relative;
  display: inline-block;
  padding: 0 12px;

  &::before,
  &::after {
    content: '•';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(189, 139, 19, 0.6);
    font-size: 14px;
  }

  &::before {
    left: -8px;
  }

  &::after {
    right: -8px;
  }
`;

export const SearchSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 8px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.15),
    0 2px 8px rgba(189, 139, 19, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(189, 139, 19, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);

  &:hover {
    box-shadow:
      0 8px 32px rgba(189, 139, 19, 0.2),
      0 4px 12px rgba(189, 139, 19, 0.15),
      inset 0 2px 4px rgba(255, 255, 255, 0.9);
    border-color: rgba(189, 139, 19, 0.3);
    transform: translateY(-1px);
  }

  &:focus-within {
    border-color: #376d31;
    box-shadow:
      0 8px 32px rgba(55, 109, 49, 0.15),
      0 4px 12px rgba(55, 109, 49, 0.1),
      0 0 0 2px rgba(55, 109, 49, 0.1),
      inset 0 2px 4px rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 20px;
  font-size: 18px;
  border: none;
  outline: none;
  background: transparent;
  color: #2c3e50;
  font-weight: 500;
  letter-spacing: 0.3px;

  &::placeholder {
    color: rgba(189, 139, 19, 0.4);
    font-weight: 400;
    transition: color 0.3s ease;
  }

  &:focus::placeholder {
    color: rgba(55, 109, 49, 0.4);
  }
`;

export const SearchIcon = styled.div`
  margin: 0 16px;
  color: rgba(189, 139, 19, 0.7);
  font-size: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(189, 139, 19, 0.08);

  ${SearchSection}:hover & {
    color: rgba(189, 139, 19, 0.9);
    background: rgba(189, 139, 19, 0.12);
    transform: scale(1.05);
  }

  ${SearchSection}:focus-within & {
    color: #376d31;
    transform: scale(1.05);
    background: rgba(55, 109, 49, 0.08);
  }

  ${SearchSection}:focus-within:hover & {
    color: #376d31;
    background: rgba(55, 109, 49, 0.12);
  }
`;

export const FilterSortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin: 8px 0;
  padding: 0 24px;
`;

export const ControlGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 9999;
`;

const BaseButton = styled.button`
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(55, 109, 49, 0.15);
  border-radius: 14px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  color: #333;
  font-weight: 500;
  backdrop-filter: blur(8px);

  svg {
    font-size: 18px;
    color: #376d31;
    transition: all 0.3s ease;
  }

  &:hover {
    background: #ffffff;
    border-color: #376d31;
    box-shadow:
      0 8px 24px rgba(55, 109, 49, 0.12),
      0 0 0 2px rgba(55, 109, 49, 0.05);
    transform: translateY(-2px);

    svg {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FilterButton = styled(BaseButton)`
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 2px solid rgba(189, 139, 19, 0.3);
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(55, 109, 49, 0.15);

  svg {
    color: rgba(255, 255, 255, 0.9);
  }

  &:hover {
    background: linear-gradient(135deg, #2c5526, #1e3a1a);
    transform: translateY(-2px);
    border-color: rgba(189, 139, 19, 0.5);
    box-shadow:
      0 8px 24px rgba(55, 109, 49, 0.2),
      0 4px 8px rgba(55, 109, 49, 0.15);

    svg {
      color: white;
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(189, 139, 19, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: inherit;
    z-index: -1;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const SortButton = styled(BaseButton)`
  padding: 8px 20px 8px 12px;
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 2px solid rgba(189, 139, 19, 0.3);
  font-size: 15px;
  color: white;
  min-width: 180px;
  height: 48px;
  backdrop-filter: blur(8px);
  gap: 8px;
  margin: auto 0;
  position: relative;
  z-index: 2;
  class: 'sort-button';

  svg {
    color: white !important;
    opacity: 0.9;
    transition: all 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #2c5526, #1e3a1a);
    border-color: rgba(189, 139, 19, 0.5);
    transform: translateY(-2px);
    box-shadow:
      0 8px 24px rgba(55, 109, 49, 0.2),
      0 4px 8px rgba(55, 109, 49, 0.15);

    svg {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(189, 139, 19, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: inherit;
    z-index: -1;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const SortLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #376d31;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 10;
  overflow: hidden;
  animation: dropdownFadeIn 0.2s ease-out;

  @keyframes dropdownFadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const EnhancedDropdownMenu = styled(DropdownMenu)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 12px;
  box-shadow:
    0 12px 24px rgba(55, 109, 49, 0.12),
    0 4px 8px rgba(55, 109, 49, 0.08);
  border: 1px solid rgba(189, 139, 19, 0.2);
  min-width: 200px;
  padding: 8px;
  z-index: 9999;

  transform-origin: top right;
  animation: dropdownAppear 0.2s ease-out;

  @keyframes dropdownAppear {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: ${(props) =>
    props.selected ? 'rgba(189, 139, 19, 0.15)' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${(props) => (props.selected ? '#376d31' : '#555')};
  font-weight: ${(props) => (props.selected ? '600' : '500')};
  font-size: 15px;
  transition: all 0.2s ease;

  svg {
    font-size: 16px;
    color: ${(props) => (props.selected ? '#376d31' : '#666')};
    opacity: ${(props) => (props.selected ? 1 : 0.8)};
    transition: all 0.2s ease;
  }

  &:hover {
    background: rgba(189, 139, 19, 0.1);
    color: #376d31;

    svg {
      color: #376d31;
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;

export const ItemIcon = styled.span`
  font-size: 18px;
  opacity: 0.8;
`;

export const SectionContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(189, 139, 19, 0.15);
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(189, 139, 19, 0.2);
  border: 2px solid rgba(55, 109, 49, 0.3);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(189, 139, 19, 0.18);
    border-color: rgba(55, 109, 49, 0.4);
    box-shadow:
      0 4px 8px rgba(189, 139, 19, 0.25),
      0 2px 4px rgba(55, 109, 49, 0.15);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #376d31;
  margin: 0;
`;

export const SectionToggle = styled.div`
  color: #376d31;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  svg {
    font-size: 20px;
    transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0)')};
    transition: transform 0.3s ease;
  }
`;

export const EmptySection = styled.div`
  text-align: center;
  padding: 48px;
  background: #f5f5f5;
  border-radius: 12px;
  color: #666;
  font-size: 18px;
`;

// Update these specific card-related styles

export const StructuresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 16px;
  position: relative;
  z-index: 1;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const StructureNumber = styled.div`
  font-size: 52px;
  font-weight: 800;
  color: #376d31;
  margin-bottom: 8px;
  line-height: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow:
    2px 2px 0 rgba(255, 255, 255, 0.8),
    -1px -1px 0 rgba(255, 255, 255, 0.8);
`;

export const StructureCard = styled.div`
  display: flex;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.9),
    rgba(255, 245, 222, 0.85)
  );
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 16px rgba(189, 139, 19, 0.15),
    0 2px 4px rgba(189, 139, 19, 0.1);
  border: 2px solid rgba(189, 139, 19, 0.15);
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(189, 139, 19, 0.3);
    box-shadow:
      0 12px 32px rgba(189, 139, 19, 0.2),
      0 4px 8px rgba(189, 139, 19, 0.15);
    background: linear-gradient(
      135deg,
      rgba(255, 248, 230, 0.95),
      rgba(255, 245, 222, 0.9)
    );

    ${StructureNumber} {
      color: rgba(189, 139, 19, 0.9);
      transform: scale(1.05);
    }
  }
`;

export const StructureImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  border-right: 2px solid rgba(189, 139, 19, 0.15);

  ${StructureCard}:hover & {
    border-right-color: rgba(189, 139, 19, 0.25);
  }
`;

export const StructureInfo = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    to right,
    rgba(55, 109, 49, 0.03),
    transparent 50%
  );
`;

export const StructureTitle = styled.h2`
  font-size: 34px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.2;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 48px;
    height: 3px;
    background: linear-gradient(
      to right,
      rgba(189, 139, 19, 0.8),
      rgba(189, 139, 19, 0.4)
    );
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  ${StructureCard}:hover &::after {
    width: 80px;
    background: linear-gradient(
      to right,
      rgba(189, 139, 19, 0.9),
      rgba(189, 139, 19, 0.5)
    );
  }
`;

export const ChevronIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(189, 139, 19, 0.6);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 20px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(189, 139, 19, 0.15);
  z-index: 2;

  ${StructureCard}:hover & {
    opacity: 1;
    right: 24px;
    color: rgba(189, 139, 19, 0.8);
  }
`;

export const SortDirectionToggle = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  border-top: 1px solid rgba(189, 139, 19, 0.2);
  transition: all 0.2s ease;
  color: #555;
  font-size: 15px;
  font-weight: 500;

  svg {
    font-size: 16px;
    color: #376d31;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(189, 139, 19, 0.1);
    color: #376d31;

    svg {
      transform: rotate(180deg);
    }
  }
`;

// First, add the base RoundedContainer style
export const RoundedContainer = styled.div`
  background-color: #e8efe8;
  border-radius: 20px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

// Create new containers for the search section and structures section
export const SearchContainer = styled(RoundedContainer)`
  margin-top: 5px;
  margin-bottom: 24px;
  padding: 24px;
  background-color: #e8efe8;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
`;

export const StructuresContainer = styled(RoundedContainer)`
  margin-bottom: 24px;
  padding: 20px;
  background-color: #e8efe8;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
`;

/* Structure Info page styles */
// New styles for StructureInfo component

export const SectionTitleInfo = styled.h3`
  font-size: 24px;
  font-weight: 800;
  color: #376d31;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: linear-gradient(to bottom, #376d31, rgba(189, 139, 19, 0.5));
    border-radius: 2px;
    opacity: 0.8;
  }
`;

// The outer fixed container
export const InfoPageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1000;
  padding: 15px;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

// Single wrapper for all content - add box-sizing
export const CenteredWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

// Add subtle texture
export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  transform: scale(1.1); // Prevent blur edges from showing
  opacity: 0.8;
  transition: all 0.3s ease;
`;

// Update StyledImage for foreground with 1.25x scaling
export const StyledImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.25);
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  z-index: 1;
  transition: all 0.3s ease;
`;

// Update ImageControls to position arrows over the image
export const ImageDescription = styled.div`
  background: rgba(255, 248, 230, 0.95);
  padding: 16px 64px;
  border-radius: 12px;
  margin-top: 12px;
  border: 1px solid rgba(189, 139, 19, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  position: relative;

  p {
    margin: 0;
    font-size: 17px;
    font-weight: 500;
    color: #2c3e50;
    line-height: 1.6;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* This will make the second line longer when text wraps */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align-last: center;
    hyphens: auto;
    width: 100%;
    max-width: 600px; // Adjust this value as needed
  }
`;

export const InfoCardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #376d31;
  font-weight: 800;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

export const InfoCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(55, 109, 49, 0.12),
    rgba(55, 109, 49, 0.08)
  );
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow:
    0 3px 12px rgba(0, 0, 0, 0.16),
    0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(55, 109, 49, 0.15);
  position: relative;
  backdrop-filter: blur(4px);
  z-index: 2;

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(
      135deg,
      rgba(55, 109, 49, 0.15),
      rgba(55, 109, 49, 0.1)
    );
    border-color: rgba(55, 109, 49, 0.25);
    box-shadow:
      0 6px 20px rgba(0, 0, 0, 0.1),
      0 3px 6px rgba(0, 0, 0, 0.06);

    ${InfoCardTitle} {
      color: #2c5526;
    }

    &::before {
      background: linear-gradient(to bottom, #2c5526, rgba(44, 85, 38, 0.6));
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  position: relative;
`;

export const InfoCardEmoji = styled.span`
  font-size: 24px;
`;

export const InfoCardContent = styled.div`
  color: #2c3e50;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  position: relative;
  padding-left: 4px;
`;

export const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #376d31, #2c5526);
  color: white;
  border: 1px solid rgba(189, 139, 19, 0.3);
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.05),
    0 -1px 8px rgba(189, 139, 19, 0.35);
  cursor: ${(props) => (props.as === 'button' ? 'pointer' : 'default')};

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 12px rgba(55, 109, 49, 0.15),
      0 0 0 2px rgba(189, 139, 19, 0.1),
      0 -2px 12px rgba(189, 139, 19, 0.45);
    background: linear-gradient(135deg, #2c5526, #1e3a1a);
    border-color: rgba(189, 139, 19, 0.5);
  }

  svg {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const NavigationButton = styled.button`
  background: none;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #376d31;
  font-size: 24px;
  font-weight: 700;

  &:hover {
    background: rgba(55, 109, 49, 0.15);
    color: #2c5526;
  }

  svg {
    font-size: 20px;
    transition: opacity 0.2s ease;
  }

  &:hover svg {
    opacity: 0;
  }
`;

export const TitleWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  height: 64px;
  display: flex;
  align-items: center;
  border-radius: 32px;
  background: linear-gradient(
    185deg,
    rgba(255, 248, 230, 0.95),
    rgba(255, 245, 222, 0.9)
  );
  border: 2px solid rgba(189, 139, 19, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 16px rgba(189, 139, 19, 0.15),
    0 2px 8px rgba(189, 139, 19, 0.1);

  &:hover {
    border-color: rgba(189, 139, 19, 0.5);
    transform: translateY(-1px);
    box-shadow:
      0 6px 20px rgba(189, 139, 19, 0.2),
      0 3px 10px rgba(189, 139, 19, 0.15);
  }
`;

export const NavigationOverlay = styled.div`
  position: absolute;
  top: 0;
  ${(props) => props.side}: 0;
  height: 100%;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(
    ${(props) => (props.side === 'left' ? '90deg' : '-90deg')},
    rgba(189, 139, 19, 0.2),
    transparent 70%
  );
  opacity: 0.8;
  z-index: 10;

  svg {
    position: absolute;
    font-size: 20px;
    transition: all 0.3s ease;
    ${(props) => props.side}: 24px;
    opacity: 0.7;
    color: #2c5526;
    pointer-events: none;
  }

  &:hover {
    opacity: 1;
    background: linear-gradient(
      ${(props) => (props.side === 'left' ? '90deg' : '-90deg')},
      rgba(189, 139, 19, 0.3),
      transparent 80%
    );

    svg {
      opacity: 0;
      transform: translateX(
        ${(props) => (props.side === 'left' ? '-20px' : '20px')}
      );
      color: #2c5526;
    }

    span {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const NavigationNumber = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #376d31;
  opacity: 0;
  transform: translateX(
    ${(props) => (props.side === 'left' ? '20px' : '-20px')}
  );
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.4);
`;

export const StructureListView = styled.div`
  width: 95%;
  height: 100%;
  overflow-y: auto;
  margin: 24px 24px;
  padding: 24px;
  animation: flipIn 0.4s ease-out;

  @keyframes flipIn {
    from {
      transform: rotateX(90deg);
      opacity: 0;
    }
    to {
      transform: rotateX(0);
      opacity: 1;
    }
  }

  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StructuresListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 330px));
  gap: 20px;
  justify-content: center;
  width: 100%;
`;

export const StructureListCard = styled.div`
  display: flex;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${(props) => (props.isSelected ? '#376d31' : 'transparent')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(55, 109, 49, 0.15);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    flex-shrink: 0;
  }
`;

export const StructureListInfo = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StructureListNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #376d31;
`;

export const StructureListTitle = styled.div`
  font-size: 18px;
  color: #333;
  margin-top: 4px;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #e8efe8;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LeftSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const InfoCardsSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 0;
  min-height: 98%;
  overflow-y: auto;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.95),
    rgba(255, 245, 222, 0.9)
  );
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(189, 139, 19, 0.15);
  box-shadow:
    inset 0 2px 4px rgba(189, 139, 19, 0.08),
    0 4px 16px rgba(0, 0, 0, 0.08);
  min-width: 0;
  box-sizing: border-box;
  transition: all 0.3s ease;
  margin-top: 10px;
  position: relative; // Added this to position the share button

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    pointer-events: none;
    z-index: 1;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const DescriptionContainer = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.9),
    rgba(255, 245, 222, 0.85)
  );
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid rgba(189, 139, 19, 0.15);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  margin-top: ${(props) => (props.expanded ? '24px' : '10px')};
  order: ${(props) => (props.expanded ? 1 : 0)}; // Push to bottom when expanded
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 248, 230, 0.95),
      rgba(255, 245, 222, 0.9)
    );
    box-shadow:
      0 6px 20px rgba(0, 0, 0, 0.15),
      0 3px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const DescriptionText = styled.div`
  font-size: 17px;
  line-height: 1.6;
  color: #2c3e50;
  font-weight: 500;

  > p:first-child {
    margin-top: 0;
    margin-bottom: ${(props) => (props.expanded ? '16px' : '0')};
  }

  > div.extended {
    white-space: pre-line;
    margin-top: 16px;
  }
`;

export const ToggleDescriptionButton = styled.button`
  background: rgba(55, 109, 49, 0.08);
  border: none;
  color: #376d31;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: rgba(55, 109, 49, 0.12);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-top: 24px;
  border-top: 1px solid rgba(189, 139, 19, 0.15);
  position: relative;
  margin-top: 24px;

  &::before {
    content: 'Resources';
    position: absolute;
    top: -10px;
    left: 24px;
    background: #e8efe8;
    padding: 0 12px;
    color: #376d31;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;

export const LinkButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 aspect ratio
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 4px 16px rgba(55, 109, 49, 0.3),
    0 2px 4px rgba(55, 109, 49, 0.4);
`;

export const HeaderContainer = styled.div`
  width: 100%;
  background: #e8efe8;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-shadow:
    0 4px 24px rgba(189, 139, 19, 0.15),
    0 1px 2px rgba(189, 139, 19, 0.1);
  box-sizing: border-box;
  border: 1px solid rgba(189, 139, 19, 0.1);
  border-bottom: 3px solid rgba(189, 139, 19, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(189, 139, 19, 0.5),
      transparent
    );
  }
`;

export const StructureNumberBubble = styled.div`
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1),
    rgba(189, 139, 19, 0.85)
  );
  color: white;
  font-size: 32px;
  font-weight: 700;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 12px rgba(189, 139, 19, 0.25),
    0 1px 2px rgba(189, 139, 19, 0.15);
  flex-shrink: 0;
  transition: all 0.3s ease;
  border: 2px solid rgba(55, 109, 49, 0.3);

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(
      135deg,
      rgba(189, 139, 19, 0.9),
      rgba(189, 139, 19, 0.75)
    );
    border-color: rgba(55, 109, 49, 0.5);
    box-shadow:
      0 4px 12px rgba(189, 139, 19, 0.3),
      0 0 0 2px rgba(189, 139, 19, 0.1);
  }
`;

export const StructureTitleInfo = styled.div`
  font-size: 42px;
  font-weight: 800;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  letter-spacing: -0.5px;
  text-shadow:
    0 1px 1px rgba(255, 255, 255, 0.8),
    0 2px 3px rgba(55, 109, 49, 0.2),
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 6px 12px rgba(189, 139, 19, 0.15);
  color: #376d31;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 110%;
    background: radial-gradient(
      circle at center,
      rgba(55, 109, 49, 0.08) 0%,
      transparent 70%
    );
    z-index: -1;
    opacity: 0.5;
  }

  &:hover {
    transform: scale(1.02);
    text-shadow:
      0 1px 1px rgba(255, 255, 255, 0.9),
      0 2px 4px rgba(55, 109, 49, 0.3),
      0 6px 12px rgba(0, 0, 0, 0.15),
      0 8px 16px rgba(189, 139, 19, 0.2);
  }
`;

export const CloseButton = styled.button`
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1),
    rgba(189, 139, 19, 0.85)
  );
  border: 2px solid rgba(55, 109, 49, 0.3);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  flex-shrink: 0;
  box-shadow:
    0 4px 12px rgba(189, 139, 19, 0.25),
    0 1px 2px rgba(189, 139, 19, 0.15);

  svg {
    font-size: 32px;
    transition: all 0.2s ease;
  }

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(189, 139, 19, 0.9),
      rgba(189, 139, 19, 0.75)
    );
    border-color: rgba(55, 109, 49, 0.5);
    transform: rotate(90deg) scale(1.1);
    box-shadow:
      0 4px 12px rgba(189, 139, 19, 0.3),
      0 0 0 2px rgba(189, 139, 19, 0.1);

    svg {
      transform: scale(0.9);
    }
  }

  &:active {
    svg {
      transform: rotate(90deg) scale(0.95);
    }
  }
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 25px;
  width: 100%;
  background: #e8efe8;
  padding: 10px;
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(55, 109, 49, 0.05);
  }

  &:active {
    background: rgba(55, 109, 49, 0.08);
  }
`;

export const DirectionToggle = styled.div`
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: rgba(55, 109, 49, 0.05);
  margin-right: 4px;

  svg {
    font-size: 16px;
    color: #376d31;
  }

  &:hover {
    background: rgba(55, 109, 49, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

/*
Mobile-specific styled components
*/
export const MobilePageContainer = styled(PageContainer)`
  padding: 10px;
  max-width: 100%;
`;

export const MobileSearchContainer = styled(SearchContainer)`
  padding: 15px;
  margin-bottom: 15px;
`;

export const MobileSearchSection = styled(SearchSection)`
  height: 48px;
  padding: 8px 12px;
  gap: 8px;
  background: white;
  border: 2px solid rgba(189, 139, 19, 0.2);

  &:focus-within {
    border-color: #376d31;
    box-shadow: 0 2px 8px rgba(55, 109, 49, 0.1);
  }
`;

export const MobileSearchIcon = styled(SearchIcon)`
  background: none;
  width: auto;
  height: auto;
  margin: 0;
  color: rgba(189, 139, 19, 0.6);

  ${MobileSearchSection}:focus-within & {
    color: #376d31;
  }
`;

export const MobileSearchInput = styled(SearchInput)`
  height: 100%;
  font-size: 16px;
  padding: 0;

  &::placeholder {
    color: rgba(189, 139, 19, 0.4);
  }

  &:focus::placeholder {
    color: rgba(55, 109, 49, 0.4);
  }
`;

export const MobileStructuresGrid = styled(StructuresGrid)`
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 10px;
`;

export const MobileStructureCard = styled(StructureCard)`
  height: 120px;

  ${(props) =>
    props.isActive &&
    `
    transform: translateY(-4px);
    border-color: rgba(189, 139, 19, 0.3);
    box-shadow: 
      0 12px 32px rgba(189, 139, 19, 0.2),
      0 4px 8px rgba(189, 139, 19, 0.15);
    background: linear-gradient(
      135deg,
      rgba(255, 248, 230, 0.95),
      rgba(255, 245, 222, 0.9)
    );

    ${StructureNumber} {
      color: rgba(189, 139, 19, 0.9);
    }
  `}
`;

export const MobileStructureImage = styled(StructureImage)`
  width: 120px;
  height: 120px;
`;

export const MobileStructureInfo = styled(StructureInfo)`
  padding: 12px;
`;

export const MobileStructureNumber = styled(StructureNumber)`
  font-size: 32px;
`;

export const MobileStructureTitle = styled(StructureTitle)`
  font-size: 20px;
`;

export const ContactContainer = styled(RoundedContainer)`
  margin-bottom: 24px;
  padding: 20px;
  background-color: #e8efe8;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
`;

export const ContactTitle = styled.h3`
  font-size: 30px;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1),
    rgba(189, 139, 19, 0.85)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

export const ContactText = styled.p`
  font-size: 18px;
  color: #2c3e50;
  margin: 0;
  line-height: 1.8;

  a {
    color: #376d31;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    display: block;

    &:hover {
      color: rgba(189, 139, 19, 0.9);
      text-decoration: underline;
    }
  }
`;

export const ImageSectionContainer = styled(DescriptionContainer)`
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.9),
    rgba(255, 245, 222, 0.85)
  );
  border: 1px solid rgba(189, 139, 19, 0.15);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08);

  ${ImageDescription} {
    background: rgba(255, 248, 230, 0.95);
    border: 1px solid rgba(189, 139, 19, 0.12);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }

  &:hover {
    box-shadow:
      0 6px 20px rgba(0, 0, 0, 0.15),
      0 3px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const InfoCardsSectionExpanded = styled(InfoCardsSection)`
  height: ${(props) => props.imageHeight}px;
  min-height: auto;
`;

export const DescriptionContainerExpanded = styled(DescriptionContainer)`
  width: calc(100% + (100% * 3 / 4) + 15px);
  margin-top: 10px;
`;

export const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  background: #e8efe8;
  border-radius: 24px;
  padding: 10px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(189, 139, 19, 0.1);
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  overflow: ${(props) => (props.isFullscreen ? 'visible' : 'hidden')};
  position: relative;

  ${StructureListView} {
    background: white;
  }

  &:hover {
    box-shadow:
      0 8px 24px rgba(189, 139, 19, 0.3),
      0 4px 8px rgba(189, 139, 19, 0.15);
  }
`;

export const ArrowButton = styled.button`
  background: #e8efe8;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 2px 8px rgba(55, 109, 49, 0.4);
  z-index: 2;

  &:first-of-type {
    left: 16px;
  }

  &:last-of-type {
    right: 16px;
  }

  svg {
    font-size: 20px;
    transition: transform 0.2s ease;
    color: rgba(189, 139, 19, 1);
    font-weight: bold;
  }

  &:hover {
    background: #dbe5db;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 12px rgba(55, 109, 49, 0.6);

    svg {
      transform: scale(1.1);
      color: #bd8b13;
    }
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

export const ImageSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-right: 8px;
`;

export const FullscreenButton = styled.button`
  background: none;
  border: none;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #376d31;
  opacity: 0.7;
  margin: -15px -10px 0 0;

  svg {
    font-size: 32px;
    transition: transform 0.2s ease;
  }

  &:hover {
    opacity: 1;
    transform: scale(1.1);

    svg {
      color: rgba(189, 139, 19, 0.9);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const FullscreenContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const FullscreenImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullscreenBackgroundImage = styled(BackgroundImage)`
  filter: blur(30px);
  opacity: 0.4;
`;

export const FullscreenImage = styled(StyledImage)`
  transform: translate(-50%, -50%) scale(1);
  max-height: 85vh;
  transition: transform 0.3s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.02);
  }
`;

export const FullscreenNavigation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 102;

  ${FullscreenContainer}:hover & {
    opacity: 1;
  }
`;

export const FullscreenArrowButton = styled(ArrowButton)`
  position: relative;
  transform: none;
  top: auto;
  width: 56px;
  height: 56px;
  background: rgba(255, 248, 230, 0.95);
  opacity: 1;

  svg {
    font-size: 24px;
    color: rgba(189, 139, 19, 1);
  }

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 248, 230, 0.95);

    svg {
      color: #bd8b13;
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const FullscreenCaptionBar = styled.div`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 248, 230, 0.95);
  padding: 16px 32px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease;
  min-width: 300px;
  max-width: 800px;
  z-index: 103;
  padding-right: 80px;

  ${FullscreenContainer}:hover & {
    opacity: 1;
  }
`;

export const ImageCounter = styled.span`
  color: #376d31;
  font-weight: 600;
  font-size: 18px;
  min-width: 60px;
  padding-right: 16px;
  margin-right: 16px;
  border-right: 2px solid rgba(189, 139, 19, 0.2);
`;

export const CaptionText = styled.p`
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
  line-height: 1.4;
  flex: 1;
  text-align: center;
  padding-right: 48px;
`;

export const FullscreenCloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 64px;
  border-radius: 0 20px 20px 0;
  background: rgba(232, 239, 232, 0.95);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 1px solid rgba(189, 139, 19, 0.12);

  svg {
    font-size: 28px;
    color: rgba(189, 139, 19, 1);
    transition: all 0.3s ease;
  }

  &:hover {
    background: #fff;

    svg {
      color: #bd8b13;
      transform: rotate(90deg);
    }
  }

  &:active {
    svg {
      transform: rotate(90deg) scale(0.95);
    }
  }
`;

export const StructureImagePlaceholder = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(189, 139, 19, 0.1);
  flex-shrink: 0;
`;

export const SurpriseButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: relative;
  z-index: 1;
`;

export const IntegratedSurpriseButton = styled.div`
  display: flex;
  align-items: stretch;
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 2px solid rgba(189, 139, 19, 0.3);
  border-radius: 24px;
  overflow: visible;
  box-shadow: 0 2px 8px rgba(55, 109, 49, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(189, 139, 19, 0.5);
    box-shadow:
      0 8px 24px rgba(55, 109, 49, 0.2),
      0 4px 8px rgba(55, 109, 49, 0.15);
  }
`;

export const SurpriseText = styled.div`
  padding: 0 32px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.95);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: default;
  border-right: 2px solid rgba(189, 139, 19, 0.2);

  ${IntegratedSurpriseButton}:hover & {
    color: rgba(189, 139, 19, 0.95);
    font-size: 22px;
  }
`;

export const SurpriseIconButton = styled.button`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;

  &:hover {
    background: rgba(189, 139, 19, 0.15);

    svg {
      transform: scale(1.15);
      color: rgba(189, 139, 19, 0.95);
    }

    .tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) scale(1);
    }
  }

  svg {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.95);
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
    transition: all 0.3s ease;
  }

  &:active svg {
    transform: scale(0.95);
  }
`;

// Update Tooltip styles for bottom position
export const Tooltip = styled.span`
  position: absolute;
  top: 50%;
  background: linear-gradient(
    135deg,
    rgba(55, 109, 49, 0.98),
    rgba(44, 85, 38, 0.95)
  );
  color: rgba(255, 255, 255, 0.95);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  white-space: pre-line;
  text-align: center;
  line-height: 1.4;
  min-width: 160px;
  max-width: 200px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  box-shadow:
    0 4px 12px rgba(55, 109, 49, 0.25),
    0 2px 4px rgba(55, 109, 49, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  z-index: 100;
  border: 1px solid rgba(189, 139, 19, 0.3);
  font-weight: 500;
  letter-spacing: 0.2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transform: translate(8px, -50%) scale(0.95);

  ${(props) =>
    props.position === 'right' &&
    `
    left: calc(100% + 10px);
    
    &::before {
      content: '';
      position: absolute;
      left: -6px;
      top: 50%;
      transform: translateY(-50%);
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 6px solid rgba(55, 109, 49, 0.98);
    }
  `}

  ${(props) =>
    props.position === 'left' &&
    `
    right: calc(100% + 10px);
    
    &::before {
      content: '';
      position: absolute;
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px solid rgba(55, 109, 49, 0.98);
    }
  `}

  ${(props) =>
    props.position === 'bottom' &&
    `
    top: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%) scale(0.95);
    white-space: nowrap;
    min-width: auto;
    
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: -6px;
      transform: translateX(-50%);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid rgba(55, 109, 49, 0.98);
    }

    ${IntegratedSurpriseButton}:hover & {
      transform: translateX(-50%) scale(1);
    }
  `}
`;

export const MobileSurpriseButton = styled.button`
  width: 200px;
  height: 52px;
  margin: -12px auto 20px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 2px solid rgba(189, 139, 19, 0.3);
  border-radius: 16px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(55, 109, 49, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(189, 139, 19, 0.15),
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(189, 139, 19, 0.5);
    background: linear-gradient(135deg, #2c5526, #1e3a1a);
    box-shadow:
      0 8px 24px rgba(55, 109, 49, 0.2),
      0 4px 8px rgba(55, 109, 49, 0.15);

    &::before {
      opacity: 1;
    }
  }
`;

export const MobileSurpriseIcon = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(189, 139, 19, 0.15);
  border-right: 2px solid rgba(189, 139, 19, 0.2);
  transition: all 0.3s ease;

  svg {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.95);
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
    transition: all 0.3s ease;
  }

  ${MobileSurpriseButton}:hover & {
    background: rgba(189, 139, 19, 0.25);
    border-right-color: rgba(189, 139, 19, 0.3);

    svg {
      transform: rotate(-15deg) scale(1.1);
      color: rgba(189, 139, 19, 0.95);
    }
  }
`;

export const MobileSurpriseText = styled.span`
  flex: 1;
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  padding-right: 10px;

  ${MobileSurpriseButton}:hover & {
    color: rgba(189, 139, 19, 0.95);
    text-shadow:
      0 1px 2px rgba(0, 0, 0, 0.3),
      0 0 8px rgba(189, 139, 19, 0.3);
  }
`;

// Add these new styled components after SearchIcon

export const SearchAndInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const InfoButton = styled.button`
  height: 68px; // Match SearchSection height (52px input + 8px padding * 2)
  width: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  border: 2px solid rgba(189, 139, 19, 0.2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.15),
    0 2px 8px rgba(189, 139, 19, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  flex-shrink: 0;

  svg {
    font-size: 28px;
    color: rgba(189, 139, 19, 0.7);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    box-shadow:
      0 8px 32px rgba(189, 139, 19, 0.2),
      0 4px 12px rgba(189, 139, 19, 0.15),
      inset 0 2px 4px rgba(255, 255, 255, 0.9);
    border-color: rgba(189, 139, 19, 0.3);
    transform: translateY(-1px);

    svg {
      color: rgba(189, 139, 19, 0.9);
      transform: scale(1.05);
    }

    .tooltip {
      opacity: 1;
      visibility: visible;
      transform: translate(0, -50%) scale(1);
    }
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus {
    border-color: #376d31;
    box-shadow:
      0 8px 32px rgba(55, 109, 49, 0.15),
      0 4px 12px rgba(55, 109, 49, 0.1),
      0 0 0 2px rgba(55, 109, 49, 0.1),
      inset 0 2px 4px rgba(255, 255, 255, 0.9);
    outline: none;

    svg {
      color: #376d31;
    }
  }
`;

export const CircleInfoButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 1px solid rgba(189, 139, 19, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.05),
    0 -1px 8px rgba(189, 139, 19, 0.35);
  margin-right: 20px;
  flex-shrink: 0;

  svg {
    font-size: 20px;
    color: rgba(189, 139, 19, 0.9);
    transition: all 0.2s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 12px rgba(55, 109, 49, 0.15),
      0 0 0 2px rgba(189, 139, 19, 0.1),
      0 -2px 12px rgba(189, 139, 19, 0.45);
    background: linear-gradient(135deg, #2c5526, #1e3a1a);
    border-color: rgba(189, 139, 19, 0.5);

    svg {
      color: rgba(189, 139, 19, 1);
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ShareButton = styled.button`
  height: 36px;
  padding: 0 12px;
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 2px solid rgba(189, 139, 19, 0.3);
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  box-shadow: 0 2px 8px rgba(55, 109, 49, 0.15);
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;

  svg {
    font-size: 14px;
    transition: all 0.2s ease;
  }

  &::after {
    content: 'Share';
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    transition: all 0.2s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #2c5526, #1e3a1a);
    border-color: rgba(189, 139, 19, 0.5);
    transform: translateY(-1px);
    box-shadow:
      0 4px 12px rgba(55, 109, 49, 0.2),
      0 2px 4px rgba(55, 109, 49, 0.15);

    svg {
      color: rgba(189, 139, 19, 0.9);
    }

    &::after {
      color: rgba(189, 139, 19, 0.9);
    }
  }

  &:active {
    transform: translateY(1px);
  }
`;

// Add this new container
export const TitleAndShareContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 10px;
  padding: 0 80px;
`;

// Add this mobile-specific variant of the share button
export const MobileDescriptionContainer = styled(DescriptionContainer)`
  border-radius: 24px;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 10px;
  width: 95%;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.9),
    rgba(255, 245, 222, 0.85)
  );
  border: 1px solid rgba(189, 139, 19, 0.15);
  box-shadow:
    0 4px 16px rgba(55, 109, 49, 0.15),
    0 2px 4px rgba(55, 109, 49, 0.1);
  position: relative; // Added this

  &:hover {
    transform: none;
  }
`;

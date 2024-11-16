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

export const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  background-color: #ffffff;
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
  overflow: hidden;

  &:hover {
    box-shadow:
      0 8px 24px rgba(189, 139, 19, 0.3),
      0 4px 8px rgba(189, 139, 19, 0.15);
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
    rgba(189, 139, 19, 0.08),
    rgba(189, 139, 19, 0.03)
  );
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 16px rgba(55, 109, 49, 0.08),
    0 2px 4px rgba(55, 109, 49, 0.05);
  border: 2px solid rgba(189, 139, 19, 0.15);
  cursor: pointer;
  position: relative;
  backdrop-filter: blur(8px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.1)
    );
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(189, 139, 19, 0.3);
    box-shadow:
      0 12px 32px rgba(55, 109, 49, 0.12),
      0 4px 8px rgba(55, 109, 49, 0.08);
    background: linear-gradient(
      135deg,
      rgba(189, 139, 19, 0.12),
      rgba(189, 139, 19, 0.06)
    );

    &::before {
      opacity: 0.9;
    }

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
  transition: all 0.3s ease;

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
  font-size: 20px;
  font-weight: 700;
  color: #376d31;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 4px;
    height: 20px;
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
  background: #f0f4f8;
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
  transform: translate(-50%, -50%) scale(1.25); // Added scale(1.25)
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  z-index: 1;
  transition: all 0.3s ease; // Added for smooth transitions
`;

// Update ImageControls to position arrows over the image
export const ImageControls = styled.div`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  pointer-events: none; // This ensures clicks pass through to the buttons
  z-index: 2; // Add this to ensure it's above both images
`;

// Update ArrowButton for the new positioning
export const ArrowButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #376d31;
  pointer-events: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;
  position: relative;

  svg {
    font-size: 18px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: white;
    transform: scale(1.1);

    svg {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ImageDescription = styled.div`
  background: rgba(55, 109, 49, 0.05);
  padding: 16px;
  border-radius: 12px;
  margin-top: 12px;
  border: 1px solid rgba(55, 109, 49, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;

  p {
    margin: 0;
    font-size: 16px;
    color: #333;
    line-height: 1.6;
    flex: 1;
  }

  svg {
    font-size: 24px;
    color: #376d31;
    flex-shrink: 0;
  }
`;

export const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow:
    0 2px 12px rgba(0, 0, 0, 0.2),
    0 1px 8px rgba(0, 0, 0, 0.35);
  transition: all 0.2s ease;
  border-left: 3px solid #376d31;
  background: linear-gradient(to right, rgba(55, 109, 49, 0.03), transparent);

  &:hover {
    transform: translateY(-1px);
    border-left-color: rgba(189, 139, 19, 0.5);
    background: linear-gradient(
      to right,
      rgba(189, 139, 19, 0.03),
      transparent
    );
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
`;

export const InfoCardEmoji = styled.span`
  font-size: 24px;
`;

export const InfoCardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #376d31;
  font-weight: 600;
`;

export const InfoCardContent = styled.div`
  color: #333;
  font-size: 15px;
  line-height: 1.5;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 12px rgba(55, 109, 49, 0.15),
      0 0 0 2px rgba(189, 139, 19, 0.1);
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
  background: rgba(55, 109, 49, 0.08);
  border: 2px solid rgba(189, 139, 19, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(189, 139, 19, 0.1);

  &:hover {
    background: rgba(55, 109, 49, 0.12);
    transform: translateY(-1px);
    border-color: rgba(189, 139, 19, 0.4);
    box-shadow: 0 8px 24px rgba(189, 139, 19, 0.15);
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
  color: #376d31;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(
    ${(props) => (props.side === 'left' ? '90deg' : '-90deg')},
    rgba(55, 109, 49, 0.15) 0%,
    transparent 100%
  );
  opacity: 0.5;

  svg {
    position: absolute;
    font-size: 20px;
    transition: all 0.3s ease;
    ${(props) => props.side}: 24px;
    opacity: 0.7;
  }

  &:hover {
    opacity: 1;
    background: rgba(55, 109, 49, 0.15);

    svg {
      opacity: 0;
      transform: translateX(
        ${(props) => (props.side === 'left' ? '-20px' : '20px')}
      );
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
  gap: 10px;
  background: rgba(0, 0, 0, 0.02);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
  min-width: 0;
  box-sizing: border-box;
  transition: all 0.3s ease;
  height: 0;
  min-height: 100%;
  overflow-y: auto;
  margin-right: 30px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.03);
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.03),
      0 0 0 1px rgba(0, 0, 0, 0.08);
  }
`;

export const DescriptionContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 4px 16px rgba(55, 109, 49, 0.3),
    0 2px 4px rgba(55, 109, 49, 0.4);

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DescriptionText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #333;

  /* Style for the main description */
  > p:first-child {
    margin-top: 0;
  }

  /* Style for the extended description */
  > p:last-child {
    margin-top: 16px;
    margin-bottom: 0;
    display: ${(props) => (props.expanded ? 'block' : 'none')};
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
    background: white;
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
  background: linear-gradient(to right, #ffffff, #f8f9fa);
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
  background: linear-gradient(135deg, #376d31, #2c5526);
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
    0 4px 12px rgba(55, 109, 49, 0.15),
    0 1px 2px rgba(55, 109, 49, 0.1);
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(189, 139, 19, 0.3);

  &:hover {
    transform: ${(props) => (props.isOpen ? 'scale(1.1)' : 'scale(1.05)')};
    background: linear-gradient(135deg, #2c5526, #1e3a1a);
    border-color: rgba(189, 139, 19, 0.5);
    box-shadow:
      0 4px 12px rgba(55, 109, 49, 0.2),
      0 0 0 2px rgba(189, 139, 19, 0.1);
  }
`;

export const StructureTitleInfo = styled.div`
  flex-grow: 1;
  font-size: 42px;
  font-weight: 800;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 80px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(
    135deg,
    rgba(189, 139, 19, 1),
    rgba(189, 139, 19, 0.85)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(189, 139, 19, 0.1);
  letter-spacing: -0.5px;

  ${(props) =>
    props.isOpen &&
    `
    background: linear-gradient(135deg, rgba(189, 139, 19, 0.9), rgba(189, 139, 19, 0.75));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `}

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
      rgba(255, 255, 255, 0.8) 0%,
      transparent 70%
    );
    z-index: -1;
    opacity: 0.5;
  }
`;

export const CloseButton = styled.button`
  background: linear-gradient(135deg, #376d31, #2c5526);
  border: 2px solid rgba(189, 139, 19, 0.3);
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
    0 4px 12px rgba(55, 109, 49, 0.15),
    0 1px 2px rgba(55, 109, 49, 0.1);

  svg {
    font-size: 32px;
    transition: all 0.2s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #2c5526, #1e3a1a);
    border-color: rgba(189, 139, 19, 0.5);
    transform: rotate(90deg) scale(1.1);
    box-shadow:
      0 4px 12px rgba(55, 109, 49, 0.2),
      0 0 0 2px rgba(189, 139, 19, 0.1);

    svg {
      transform: scale(0.9);
    }
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }
`;

export const ColumnsContainer = styled.div`
  margin: 15px;
  display: flex;
  gap: 25px;
  width: 100%;
  min-width: 0;
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

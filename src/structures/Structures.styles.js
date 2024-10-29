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

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: #376d31;
  text-align: center;
  margin-bottom: 32px;
`;

export const SearchSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  gap: 16px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 54px;
  padding: 0 60px;
  font-size: 18px;
  border: 2px solid rgba(55, 109, 49, 0.15);
  border-radius: 16px;
  outline: none;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);

  &:focus {
    border-color: #376d31;
    box-shadow:
      0 0 0 4px rgba(55, 109, 49, 0.1),
      0 8px 24px rgba(55, 109, 49, 0.12);
    background-color: #ffffff;
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #888;
    font-weight: 400;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #376d31;
  font-size: 20px;
  pointer-events: none;
  opacity: 0.7;
  transition: all 0.3s ease;

  ${SearchInput}:focus + & {
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
  }
`;

export const AIButton = styled.button`
  width: 48px;
  height: 48px;
  margin-left: 16px;
  flex-shrink: 0;
  background-color: #f5f5f5;
  border: 2px solid #e0e0e0;
  border-radius: 50%;
  color: #376d31;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  svg {
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: #376d31;
    border-color: #376d31;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(55, 109, 49, 0.2);

    svg {
      color: #ffffff;
      transform: rotate(15deg) scale(1.2);
      animation: sparkle 1.5s infinite;
    }

    &::before {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ffce33, #ff7e33, #ff338a, #3393ff);
    z-index: -1;
    filter: blur(10px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  @keyframes sparkle {
    0% {
      transform: rotate(15deg) scale(1.2);
    }
    50% {
      transform: rotate(-15deg) scale(1.3);
    }
    100% {
      transform: rotate(15deg) scale(1.2);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FilterSortContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 24px 0 8px;
  padding: 0 12px;
`;

export const ControlGroup = styled.div`
  margin-top: 16px;
  position: relative;
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
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(55, 109, 49, 0.2), transparent);
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
  div:first-child {
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(55, 109, 49, 0.1);
      transform: scale(1.1);
    }

    svg {
      color: #376d31;
      transform: ${(props) => (props.ascending ? 'scaleY(1)' : 'scaleY(-1)')};
    }
  }
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

export const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 20px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
  font-size: 16px;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #376d31;
    position: absolute;
    left: 8px;
    opacity: ${(props) => (props.selected ? 1 : 0)};
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: #f5f5f5;
    color: #376d31;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }

  ${(props) =>
    props.selected &&
    `
    color: #376d31;
    font-weight: 500;
    padding-left: 24px;
  `}
`;

export const SectionContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionHeader = styled.div`
  display: inline-flex; // Changed from flex to inline-flex
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 4px 8px; // Added horizontal padding
  margin-bottom: 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(55, 109, 49, 0.05);
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

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const StructureCard = styled.div`
  display: flex;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(55, 109, 49, 0.1);
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(55, 109, 49, 0.15);
    border-color: rgba(55, 109, 49, 0.2);

    .chevron-icon {
      opacity: 1;
      transform: translate(0, 0) rotate(-45deg);
    }
  }
`;

export const StructureImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const StructureInfo = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  background: linear-gradient(
    to right,
    rgba(55, 109, 49, 0.03),
    transparent 50%
  );
`;

export const StructureNumber = styled.div`
  font-size: 52px;
  font-weight: 800;
  color: #376d31;
  margin-bottom: 8px;
  line-height: 1;
  text-shadow: 2px 2px 0 rgba(55, 109, 49, 0.1);
`;

export const StructureTitle = styled.h2`
  font-size: 34px;
  font-weight: 600;
  color: #333;
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
    background: #376d31;
    border-radius: 2px;
    opacity: 0.5;
    transition: width 0.3s ease;
  }

  ${StructureCard}:hover &::after {
    width: 80px;
  }
`;

export const ChevronIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  transform: translate(8px, -8px) rotate(-45deg);
  color: #376d31;
  opacity: 0;
  transition: all 0.3s ease;
  font-size: 20px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(55, 109, 49, 0.15);
`;

export const SortDirectionToggle = styled.button`
  width: 100%;
  padding: 12px 20px;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px; // Reduced from 8px
  border-top: 2px solid #e8e8e8; // Changed from 1px and lightened color
  transition: all 0.2s ease;
  color: #376d31;
  font-weight: 500;

  svg {
    font-size: 16px;
    color: #376d31;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #e8e8e8;

    svg {
      transform: rotate(180deg);
    }
  }
`;

// First, add the base RoundedContainer style
export const RoundedContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

// Create new containers for the search section and structures section
export const SearchContainer = styled(RoundedContainer)`
  margin-bottom: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 1px solid rgba(55, 109, 49, 0.1);
  box-shadow:
    0 4px 24px rgba(55, 109, 49, 0.07),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
`;

export const StructuresContainer = styled(RoundedContainer)`
  margin-bottom: 24px;
  padding: 20px;
`;

/* Structure Info page styles */
// New styles for StructureInfo component

export const SectionTitleInfo = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #376d31;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background: #376d31;
    border-radius: 2px;
    opacity: 0.6;
  }
`;

// The outer fixed container
export const InfoPageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f5f5;
  z-index: 1000;
  padding: 15px;
  display: flex;
  justify-content: center;
`;

// Single wrapper for all content - add box-sizing
export const CenteredWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box; // Add this
`;

// Header stays the same size - add box-sizing
export const HeaderContainer = styled.div`
  width: 100%;
  background: #f8f9f8;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-shadow: 0 4px 24px rgba(55, 109, 49, 0.08);
  box-sizing: border-box;
  border: 1px solid rgba(55, 109, 49, 0.08);
`;

// Update ContentContainer - keep hover effect, no scrollbar
export const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  background: #f8f9f8;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 24px rgba(55, 109, 49, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
  box-sizing: border-box;
  transition: all 0.3s ease;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    box-shadow: 0 6px 28px rgba(0, 0, 0, 0.15);
  }
`;

// Update header elements to have consistent heights
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
    0 4px 12px rgba(55, 109, 49, 0.2),
    0 2px 4px rgba(55, 109, 49, 0.1);
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.isOpen &&
    `
    transform: scale(1.1);
    background: #2c5526;
  `}

  &:hover {
    transform: ${(props) => (props.isOpen ? 'scale(1.1)' : 'scale(1.05)')};
    background: ${(props) =>
      props.isOpen ? '#2c5526' : 'linear-gradient(135deg, #376d31, #2c5526)'};
  }

  svg {
    font-size: 24px; // Adjust icon size if needed
  }
`;

export const StructureTitleInfo = styled.div`
  flex-grow: 1;
  font-size: 36px;
  font-weight: 700;
  color: #376d31;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 80px;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.isOpen &&
    `
    background: rgba(55, 109, 49, 0.15);
  `}
`;

export const TitleIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%)
    rotate(${(props) => (props.isOpen ? '180deg' : '0deg')});
  transition: all 0.3s ease;
`;

export const StructureListOverlay = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 100;
  transition: all 0.3s ease;
`;

export const StructureList = styled.div`
  max-height: 300px; // Set a max height to enable scrolling
  overflow-y: auto;
  padding: 16px;
  scrollbar-width: thin;
  scrollbar-color: #376d31 #f1f1f1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #376d31;
    border-radius: 4px;
  }
`;

export const StructureListItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  background: ${(props) =>
    props.isSelected ? 'rgba(55, 109, 49, 0.1)' : 'transparent'};
  font-weight: ${(props) => (props.isSelected ? '500' : '400')};
  color: #333;

  span {
    font-weight: 600;
    color: #376d31;
    min-width: 32px;
  }

  &:hover {
    background: rgba(55, 109, 49, 0.05);
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  width: 64px; // Increased from 48px
  height: 64px; // Increased from 48px
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  flex-shrink: 0;

  svg {
    font-size: 32px; // Increased from 24px
    transition: transform 0.2s ease;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #333;
    transform: rotate(90deg);

    svg {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }
`;

// Update MainContent to maintain flex layout
export const MainContent = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 24px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

// Update LeftSection to be the height reference
export const LeftSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

// Update InfoCardsSection - keep hover effect, no scrollbar
export const InfoCardsSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: rgba(55, 109, 49, 0.03);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(55, 109, 49, 0.08);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  min-width: 0;
  box-sizing: border-box;
  transition: all 0.3s ease;

  // Make it match height and enable scrolling
  height: 0;
  min-height: 100%;
  overflow-y: auto;

  // Hide scrollbar completely
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    background: rgba(55, 109, 49, 0.06);
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.08),
      0 0 0 2px rgba(55, 109, 49, 0.1);
  }
`;

// Update DescriptionContainer to remove hover effect
export const DescriptionContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid rgba(55, 109, 49, 0.08);
  box-shadow: 0 2px 12px rgba(55, 109, 49, 0.06);

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

// Update LinksSection to be below the columns
export const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-top: 24px;
  border-top: 1px solid rgba(55, 109, 49, 0.1);
  position: relative;

  &::before {
    content: 'Resources';
    position: absolute;
    top: -10px;
    left: 24px;
    background: #f8f9f8;
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
`;

// Update ImageContainer to remove margin since it's now inside DescriptionContainer
export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #f5f5f5;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
  pointer-events: auto; // Re-enable pointer events for the button
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

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

export const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Update ImageDescription to have proper spacing inside the container
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

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
  background: white;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  color: #376d31;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(55, 109, 49, 0.15);
    background: rgba(55, 109, 49, 0.05);
  }

  svg {
    font-size: 20px;
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

export const TitleContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(55, 109, 49, 0.08);
  border-radius: 32px;
  padding: 0 8px;
  border: 2px solid rgba(189, 139, 19, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(55, 109, 49, 0.12);
    transform: translateY(-1px);
    border-color: rgba(189, 139, 19, 0.4);
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

  &:hover {
    background: rgba(55, 109, 49, 0.12);
    transform: translateY(-1px);
    border-color: rgba(189, 139, 19, 0.4);
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
  width: 100%;
  height: 100%;
  overflow-y: auto;
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

  scrollbar-width: thin;
  scrollbar-color: #376d31 #f1f1f1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #376d31;
    border-radius: 4px;
  }
`;

export const StructuresListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(55, 109, 49, 0.15);
  }

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
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

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

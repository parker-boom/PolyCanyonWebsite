/**
 * Work in progress...
 */

/*
Imports
*/

// Libraries
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaSearch,
  FaChevronDown,
  //FaSortAmountDown,
  //FaSortAmountUp,
  //FaExchangeAlt,
  FaArrowRight,
  //FaSort,
  //FaCalendarAlt,
  //FaMapMarkerAlt,
} from 'react-icons/fa';
//import { RiSparklingFill } from 'react-icons/ri'; (uncomment later when AI feature ready)

// Styles
import * as S from './Structures.styles.js';

// Add this import near the top with other imports
import { mainImages } from './images/structureImages.js';

// Add this import
import { useNavigate } from 'react-router-dom';

// Update the import path
import { getStructuresList } from './data/structuresData.js';

/*
Components & Renders
*/
const Structures = () => {
  const [structures, setStructures] = useState([]);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  //const [sortOpen, setSortOpen] = useState(false);
  //const [currentSort, setCurrentSort] = useState('Number');
  //const [sortAscending, setSortAscending] = useState(true);
  const [sectionsOpen, setSectionsOpen] = useState({
    active: true,
    ghost: true,
    planned: true,
  });

  //const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    try {
      const structuresList = getStructuresList();
      setStructures(structuresList);
    } catch (error) {
      console.error('Error loading structures:', error);
      setError(error.message);
    }
  }, []);

  const getSortedStructures = () => {
    if (!structures.length) return [];

    return numberList.filter((number) => {
      const structure = structures.find((s) => s.number === number);
      return (
        structure.number.toString().includes(searchQuery.toLowerCase()) ||
        structure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        structure.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };
  const numberList = structures.map((structure) => structure.number);

  /*
  const yearList = [
    7, 3, 12, 16, 11, 9, 2, 26, 24, 29, 1, 14, 15, 10, 19, 25, 28, 8, 13, 17, 6,
    20, 21, 22, 5, 18, 4, 23, 27, 30,
  ];

  const locationList = [
    17, 16, 18, 15, 19, 13, 14, 20, 21, 12, 11, 22, 23, 10, 24, 25, 9, 26, 8,
    27, 7, 28, 6, 5, 29, 4, 30, 3, 2, 1,
  ];

  const getSortedStructures = () => {
    if (!structures.length) return [];

    let sortedList;

    switch (currentSort) {
      case 'Number':
        sortedList = [...numberList];
        break;
      case 'Year':
        sortedList = [...yearList];
        break;
      case 'Location':
        sortedList = [...locationList];
        break;
      default:
        sortedList = [...numberList];
    }

    if (searchQuery) {
      sortedList = sortedList.filter((number) => {
        const structure = structures.find((s) => s.number === number);
        return (
          structure.number.toString().includes(searchQuery.toLowerCase()) ||
          structure.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    return sortAscending ? sortedList : sortedList.reverse();
  };


  const toggleSortDirection = () => {
    setSortAscending(!sortAscending);
  };

  const handleSortClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setSortOpen(true);
  }; */

  const toggleSection = (section) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const navigate = useNavigate();

  const handleStructureClick = (structureNumber) => {
    navigate('/structure/info', { state: { structureNumber } });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Learn About the Structures</title>
        <meta
          name="description"
          content="Explore and learn about the student-built structures in Poly Canyon."
        />
      </Helmet>

      <S.PageContainer>
        <S.SearchContainer>
          <S.TitleContainer>
            <S.TitleTop>The Stories of</S.TitleTop>
            <S.TitleBottom>The Structures</S.TitleBottom>
            <S.TitleTagline>A Legacy of Student Innovation</S.TitleTagline>
          </S.TitleContainer>

          <S.SearchSection>
            <S.SearchIcon>
              <FaSearch />
            </S.SearchIcon>
            <S.SearchInput
              type="text"
              placeholder="Search structures by name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </S.SearchSection>
        </S.SearchContainer>

        <S.StructuresContainer>
          <S.SectionContainer>
            <S.SectionHeader>
              <S.SectionTitleContainer onClick={() => toggleSection('active')}>
                <S.SectionTitle>Active Structures</S.SectionTitle>
                <S.SectionToggle isOpen={sectionsOpen.active}>
                  <FaChevronDown />
                </S.SectionToggle>
              </S.SectionTitleContainer>

              {/*
              <S.ControlGroup>
                <S.SortButton
                  onClick={handleSortClick}
                  ascending={sortAscending}
                >
                  <S.DirectionToggle
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSortDirection();
                    }}
                  >
                    {sortAscending ? <FaSortAmountUp /> : <FaSortAmountDown />}
                  </S.DirectionToggle>
                  <span>{currentSort}</span>
                  <FaChevronDown />
                </S.SortButton>
                {sortOpen && (
                  <S.EnhancedDropdownMenu
                    top={dropdownPosition.top}
                    left={dropdownPosition.left}
                  >
                    <S.DropdownItem
                      onClick={() => {
                        setCurrentSort('Number');
                        setSortOpen(false);
                      }}
                      selected={currentSort === 'Number'}
                    >
                      <FaSort />
                      Number
                    </S.DropdownItem>
                    <S.DropdownItem
                      onClick={() => {
                        setCurrentSort('Year');
                        setSortOpen(false);
                      }}
                      selected={currentSort === 'Year'}
                    >
                      <FaCalendarAlt />
                      Year
                    </S.DropdownItem>
                    <S.DropdownItem
                      onClick={() => {
                        setCurrentSort('Location');
                        setSortOpen(false);
                      }}
                      selected={currentSort === 'Location'}
                    >
                      <FaMapMarkerAlt />
                      Location
                    </S.DropdownItem>
                    <S.SortDirectionToggle
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSortDirection();
                        setSortOpen(false);
                      }}
                    >
                      <span>{sortAscending ? 'Ascending' : 'Descending'}</span>
                      <FaExchangeAlt />
                    </S.SortDirectionToggle>
                  </S.EnhancedDropdownMenu>
                )}
              </S.ControlGroup>
              */}
            </S.SectionHeader>
            {sectionsOpen.active && (
              <S.StructuresGrid>
                {getSortedStructures().map((structureNumber) => {
                  const structure = structures.find(
                    (s) => s.number === structureNumber
                  );
                  return (
                    <S.StructureCard
                      key={structure.number}
                      onClick={() => handleStructureClick(structure.number)}
                    >
                      <S.StructureImage
                        src={mainImages[structure.image_key]}
                        alt={structure.title}
                        onError={(e) => {
                          e.target.src =
                            'https://via.placeholder.com/200x200?text=Structure';
                        }}
                      />
                      <S.StructureInfo>
                        <S.StructureNumber>
                          {structure.number}
                        </S.StructureNumber>
                        <S.StructureTitle>{structure.title}</S.StructureTitle>
                      </S.StructureInfo>
                      <S.ChevronIcon className="chevron-icon">
                        <FaArrowRight />
                      </S.ChevronIcon>
                    </S.StructureCard>
                  );
                })}
              </S.StructuresGrid>
            )}
          </S.SectionContainer>

          {/* Ghost and Planned sections */}
        </S.StructuresContainer>
      </S.PageContainer>
    </>
  );
};

// Used in Index.js
export default Structures;

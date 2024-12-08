/**
 * Need to:
 * 1. Re-enable sorting
 */

/*
Imports
*/

// Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FaSearch,
  FaChevronDown,
  FaSortAmountDown,
  FaSortAmountUp,
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDice,
  FaImage,
  FaQuestion,
  FaHashtag,
} from 'react-icons/fa';

// Styles
import * as S from './Structures.styles.js';

// Data & Images
import { mainImages } from './images/structureImages.js';
import { getStructuresList, getStructureInfo } from './data/structuresData.js';
import useListImagePreloader from './useListImagePreloader.js';
import LoadingSpinner from './LoadingSpinner.js';
import ResearchInfo from './ResearchInfo.js';

/*
Components & Renders
*/
const Structures = () => {
  const [structures, setStructures] = useState([]);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState('Number');
  const [sortAscending, setSortAscending] = useState(true);
  const [sectionsOpen, setSectionsOpen] = useState({
    active: true,
    ghost: true,
    planned: true,
  });

  const { initialBatchLoaded, loadedImages } =
    useListImagePreloader(structures);

  const [showResearchInfo, setShowResearchInfo] = useState(false);

  // Add hover state
  const [hoveredSort, setHoveredSort] = useState(null);

  // Move debug useEffect up here with other hooks
  useEffect(() => {
    console.log('Current sort:', currentSort);
    console.log('Sort ascending:', sortAscending);
  }, [currentSort, sortAscending]);

  // Load structures list
  useEffect(() => {
    try {
      const structuresList = getStructuresList();
      setStructures(structuresList);
    } catch (error) {
      console.error('Error loading structures:', error);
      setError(error.message);
    }
  }, []);

  // Default list is just numerical
  const numberList = structures.map((structure) => structure.number);

  const yearList = [
    3, 7, 24, 12, 16, 29, 11, 26, 9, 2, 1, 14, 15, 10, 25, 19, 28, 8, 13, 17, 6,
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
          structure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          structure.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      });
    }

    return sortAscending ? sortedList : [...sortedList].reverse();
  };

  // Toggle section visibility (active, ghost, planned)
  const toggleSection = (section) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Navigate to structure info page
  const navigate = useNavigate();

  const handleStructureClick = (structure) => {
    navigate(`/structures/${structure.url}`);
  };

  const getRandomStructure = () => {
    const randomIndex = Math.floor(Math.random() * structures.length);
    return structures[randomIndex];
  };

  const handleSurpriseMe = () => {
    const randomStructure = getRandomStructure();
    navigate(`/structures/${randomStructure.url}`);
  };

  const handleSurpriseImage = () => {
    const randomStructure = getRandomStructure();
    const structureInfo = getStructureInfo(randomStructure.number);

    let randomImageIndex = 0;
    if (structureInfo.images && structureInfo.images.length > 0) {
      randomImageIndex = Math.floor(
        Math.random() * structureInfo.images.length
      );
    }

    navigate(
      `/structures/${randomStructure.url}?fullscreen=true&imageIndex=${randomImageIndex}`
    );
  };

  // Show loading spinner while initial batch loads
  if (!initialBatchLoaded) {
    return (
      <S.PageContainer>
        <LoadingSpinner />
      </S.PageContainer>
    );
  }

  // Error handling
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* Helmet - Meta data */}
      <Helmet>
        <title>Learn About the Structures</title>
        <meta
          name="description"
          content="Explore and learn about the student-built structures in Poly Canyon."
        />
        <meta property="og:title" content="Poly Canyon Structures" />
        <meta
          property="og:description"
          content="Explore and learn about the student-built structures in Poly Canyon."
        />
        <meta property="og:url" content="https://polycanyon.com/structures" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Poly Canyon Structures" />
        <meta
          name="twitter:description"
          content="Explore and learn about the student-built structures in Poly Canyon."
        />
      </Helmet>

      <S.PageContainer>
        {/* Search Container */}
        <S.SearchContainer>
          <S.TitleContainer>
            <S.TitleTop>The Stories of</S.TitleTop>
            <S.TitleBottom>The Structures</S.TitleBottom>
            <S.TitleTagline>A Legacy of Student Innovation</S.TitleTagline>
          </S.TitleContainer>

          <S.SearchAndInfoContainer>
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
            <S.InfoButton onClick={() => setShowResearchInfo(true)}>
              <FaQuestion />
              <S.Tooltip className="tooltip" position="right">
                Learn about
                <br /> the research process
              </S.Tooltip>
            </S.InfoButton>
          </S.SearchAndInfoContainer>

          <S.SurpriseButtonsContainer>
            <S.IntegratedSurpriseButton>
              <S.SurpriseText>Surprise me</S.SurpriseText>
              <S.SurpriseIconButton onClick={handleSurpriseMe}>
                <FaDice />
                <S.Tooltip className="tooltip" position="bottom">
                  with a random structure
                </S.Tooltip>
              </S.SurpriseIconButton>
              <S.SurpriseIconButton onClick={handleSurpriseImage}>
                <FaImage />
                <S.Tooltip className="tooltip" position="bottom">
                  with a random image
                </S.Tooltip>
              </S.SurpriseIconButton>
            </S.IntegratedSurpriseButton>
          </S.SurpriseButtonsContainer>
        </S.SearchContainer>

        {/* Active Structures Toggle */}
        <S.StructuresContainer>
          <S.SectionContainer>
            <S.SectionHeader>
              <S.SectionTitleContainer onClick={() => toggleSection('active')}>
                <S.SectionTitle>Active Structures</S.SectionTitle>
                <S.SectionToggle isOpen={sectionsOpen.active}>
                  <FaChevronDown />
                </S.SectionToggle>
              </S.SectionTitleContainer>

              <S.ControlGroup>
                <S.SortButtonGroup>
                  <S.SortOption
                    onClick={() => setCurrentSort('Number')}
                    selected={currentSort === 'Number'}
                    onMouseEnter={() => setHoveredSort('Number')}
                    onMouseLeave={() => setHoveredSort(null)}
                    $hovered={hoveredSort === 'Number'}
                    $anyHovered={hoveredSort !== null}
                  >
                    <FaHashtag />
                    <span>Number</span>
                  </S.SortOption>
                  <S.SortOption
                    onClick={() => setCurrentSort('Year')}
                    selected={currentSort === 'Year'}
                    onMouseEnter={() => setHoveredSort('Year')}
                    onMouseLeave={() => setHoveredSort(null)}
                    $hovered={hoveredSort === 'Year'}
                    $anyHovered={hoveredSort !== null}
                  >
                    <FaCalendarAlt />
                    <span>Year</span>
                  </S.SortOption>
                  <S.SortOption
                    onClick={() => setCurrentSort('Location')}
                    selected={currentSort === 'Location'}
                    onMouseEnter={() => setHoveredSort('Location')}
                    onMouseLeave={() => setHoveredSort(null)}
                    $hovered={hoveredSort === 'Location'}
                    $anyHovered={hoveredSort !== null}
                  >
                    <FaMapMarkerAlt />
                    <span>Location</span>
                  </S.SortOption>
                  <S.DirectionToggle
                    onClick={() => setSortAscending(!sortAscending)}
                  >
                    {sortAscending ? <FaSortAmountUp /> : <FaSortAmountDown />}
                  </S.DirectionToggle>
                </S.SortButtonGroup>
              </S.ControlGroup>

              {/* Active Structures List */}
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
                      onClick={() => handleStructureClick(structure)}
                    >
                      {loadedImages.has(structure.image_key) ? (
                        <S.StructureImage
                          src={mainImages[structure.image_key]}
                          alt={structure.title}
                          onError={(e) => {
                            e.target.src =
                              'https://via.placeholder.com/200x200?text=Structure';
                          }}
                        />
                      ) : (
                        <S.StructureImagePlaceholder>
                          <LoadingSpinner small />
                        </S.StructureImagePlaceholder>
                      )}
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

        <S.ContactContainer>
          <S.ContactTitle>Have information on structures?</S.ContactTitle>
          <S.ContactText>
            <a
              href="https://forms.office.com/r/r13RDrzxxS"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fill out this form
            </a>
            <a href="mailto:pjones15@calpoly.edu">Email pjones15@calpoly.edu</a>
          </S.ContactText>
        </S.ContactContainer>

        {showResearchInfo && (
          <ResearchInfo onClose={() => setShowResearchInfo(false)} />
        )}
      </S.PageContainer>
    </>
  );
};

// Used in Index.js
export default Structures;

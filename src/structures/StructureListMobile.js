/**
 * Mobile version of StructureList component
 * Maintains same functionality as web version with mobile-optimized layout
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
  FaArrowRight,
  FaDice,
  FaQuestion,
  FaHashtag,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSortAmountUp,
  FaSortAmountDown,
} from 'react-icons/fa';

// Styles
import * as S from './Structures.styles.js';

// Data & Images
import { mainImages } from './images/structureImages.js';
import { getStructuresList } from './data/structuresData.js';

// ResearchInfo component
import ResearchInfo from './ResearchInfo.js';

/*
Component
*/
const StructureListMobile = () => {
  const [structures, setStructures] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionsOpen, setSectionsOpen] = useState({
    active: true,
    ghost: true,
    planned: true,
  });
  const [activeCardId, setActiveCardId] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showResearchInfo, setShowResearchInfo] = useState(false);
  const [currentSort, setCurrentSort] = useState('Number');
  const [sortAscending, setSortAscending] = useState(true);

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

  // Add the sorting arrays
  const yearList = [
    3, 7, 24, 12, 16, 29, 11, 26, 9, 2, 1, 14, 15, 10, 25, 19, 28, 8, 13, 17, 6,
    20, 21, 22, 5, 18, 4, 23, 27, 30,
  ];

  const locationList = [
    17, 16, 18, 15, 19, 13, 14, 20, 21, 12, 11, 22, 23, 10, 24, 25, 9, 26, 8,
    27, 7, 28, 6, 5, 29, 4, 30, 3, 2, 1,
  ];

  // Update getSortedStructures to handle sorting
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

  const numberList = structures.map((structure) => structure.number);

  // Toggle section visibility
  const toggleSection = (section) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Navigation
  const navigate = useNavigate();

  const handleStructureClick = (structure) => {
    navigate(`/structures/${structure.url}`);
  };

  useEffect(() => {
    if (!structures.length) return;

    const options = {
      root: null,
      rootMargin: '-49.9% 0px -49.9% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      // If none are intersecting, clear the active card
      if (!entries.some((entry) => entry.isIntersecting)) {
        setActiveCardId(null);
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCardId(Number(entry.target.dataset.structureNumber));
        }
      });
    }, options);

    setTimeout(() => {
      const cards = document.querySelectorAll('.structure-card');
      cards.forEach((card) => {
        observer.observe(card);
      });
    }, 100);

    return () => observer.disconnect();
  }, [structures]);

  const getRandomStructure = () => {
    const randomIndex = Math.floor(Math.random() * structures.length);
    return structures[randomIndex];
  };

  const handleSurpriseMe = () => {
    const randomStructure = getRandomStructure();
    navigate(`/structures/${randomStructure.url}`);
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

      <S.MobilePageContainer>
        <S.MobileSearchContainer>
          <S.TitleContainer>
            <S.TitleTop>The Stories of</S.TitleTop>
            <S.TitleBottom>Structures</S.TitleBottom>
            <S.TitleTagline>A Legacy of Student Innovation</S.TitleTagline>
          </S.TitleContainer>

          <S.MobileSurpriseButton onClick={handleSurpriseMe}>
            <S.MobileSurpriseIcon>
              <FaDice />
            </S.MobileSurpriseIcon>
            <S.MobileSurpriseText>Surprise me!</S.MobileSurpriseText>
          </S.MobileSurpriseButton>

          <S.SearchAndInfoContainer>
            <S.MobileSearchSection
              style={{
                flex: isSearchFocused ? '1' : 'initial',
                transition: 'flex 0.3s ease',
              }}
            >
              <S.MobileSearchIcon>
                <FaSearch />
              </S.MobileSearchIcon>
              <S.MobileSearchInput
                type="text"
                placeholder="Search structures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </S.MobileSearchSection>
            <S.InfoButton
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                padding: '0',
                opacity: isSearchFocused ? 0 : 1,
                visibility: isSearchFocused ? 'hidden' : 'visible',
                transition: 'opacity 0.3s ease, visibility 0.3s ease',
                marginLeft: isSearchFocused ? '-48px' : '0',
              }}
              onClick={() => setShowResearchInfo(true)}
            >
              <FaQuestion style={{ fontSize: '22px' }} />
              <S.Tooltip className="tooltip" position="right">
                Learn about
                <br /> the research process
              </S.Tooltip>
            </S.InfoButton>
          </S.SearchAndInfoContainer>
        </S.MobileSearchContainer>

        <S.StructuresContainer>
          <S.SectionContainer>
            <S.SectionHeader>
              <S.SectionTitleContainer onClick={() => toggleSection('active')}>
                <S.SectionTitle>Active Structures</S.SectionTitle>
                <S.SectionToggle isOpen={sectionsOpen.active}>
                  <FaChevronDown />
                </S.SectionToggle>
              </S.SectionTitleContainer>
            </S.SectionHeader>

            <S.MobileSortContainer>
              <S.MobileSortOptions>
                <S.MobileSortOption
                  onClick={() => setCurrentSort('Number')}
                  selected={currentSort === 'Number'}
                >
                  <FaHashtag />
                  <span>Number</span>
                </S.MobileSortOption>
                <S.MobileSortOption
                  onClick={() => setCurrentSort('Year')}
                  selected={currentSort === 'Year'}
                >
                  <FaCalendarAlt />
                  <span>Year</span>
                </S.MobileSortOption>
                <S.MobileSortOption
                  onClick={() => setCurrentSort('Location')}
                  selected={currentSort === 'Location'}
                >
                  <FaMapMarkerAlt />
                  <span>Location</span>
                </S.MobileSortOption>
              </S.MobileSortOptions>
              <S.MobileDirectionToggle
                onClick={() => setSortAscending(!sortAscending)}
              >
                {sortAscending ? <FaSortAmountUp /> : <FaSortAmountDown />}
              </S.MobileDirectionToggle>
            </S.MobileSortContainer>

            {sectionsOpen.active && (
              <S.MobileStructuresGrid>
                {getSortedStructures().map((structureNumber) => {
                  const structure = structures.find(
                    (s) => s.number === structureNumber
                  );
                  return (
                    <S.MobileStructureCard
                      key={structure.number}
                      onClick={() => handleStructureClick(structure)}
                      className="structure-card"
                      data-structure-number={structure.number}
                      isActive={activeCardId === structure.number}
                    >
                      <S.MobileStructureImage
                        src={mainImages[structure.image_key]}
                        alt={structure.title}
                        onError={(e) => {
                          e.target.src =
                            'https://via.placeholder.com/200x200?text=Structure';
                        }}
                      />
                      <S.MobileStructureInfo>
                        <S.MobileStructureNumber>
                          {structure.number}
                        </S.MobileStructureNumber>
                        <S.MobileStructureTitle>
                          {structure.title}
                        </S.MobileStructureTitle>
                      </S.MobileStructureInfo>
                      <S.ChevronIcon className="chevron-icon">
                        <FaArrowRight />
                      </S.ChevronIcon>
                    </S.MobileStructureCard>
                  );
                })}
              </S.MobileStructuresGrid>
            )}
          </S.SectionContainer>
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
      </S.MobilePageContainer>

      {showResearchInfo && (
        <ResearchInfo
          onClose={() => setShowResearchInfo(false)}
          isMobile={true}
        />
      )}
    </>
  );
};

export default StructureListMobile;

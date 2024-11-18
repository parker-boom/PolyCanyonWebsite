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
import { FaSearch, FaChevronDown, FaArrowRight } from 'react-icons/fa';

// Styles
import * as S from './Structures.styles.js';

// Data & Images
import { mainImages } from './images/structureImages.js';
import { getStructuresList } from './data/structuresData.js';

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

  // Filter structures based on search
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

      <S.MobilePageContainer>
        <S.MobileSearchContainer>
          <S.TitleContainer>
            <S.TitleTop>The Stories of</S.TitleTop>
            <S.TitleBottom>Structures</S.TitleBottom>
            <S.TitleTagline>A Legacy of Student Innovation</S.TitleTagline>
          </S.TitleContainer>

          <S.MobileSearchSection>
            <S.MobileSearchIcon>
              <FaSearch />
            </S.MobileSearchIcon>
            <S.MobileSearchInput
              type="text"
              placeholder="Search structures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </S.MobileSearchSection>
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
      </S.MobilePageContainer>
    </>
  );
};

export default StructureListMobile;

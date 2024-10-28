// StructureInfo.jsx
import React, { useState } from 'react';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaNewspaper,
  FaBook,
  FaGlobe,
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

// Data
import structureData from './structureExInfo.json';

// Styles
import * as S from './Structures.styles';

// Import images directly
import M3 from './historicalImages/M-3.jpg';
import C3 from './historicalImages/C-3.jpg';
import BladeRedesign from './historicalImages/BladeRedesign.png';
import OriginalBladePeople from './historicalImages/OriginalBladePeople.png';

// Create an image map
const imageMap = {
  '/historicalImages/M-3.jpg': M3,
  '/historicalImages/C-3.jpg': C3,
  '/historicalImages/BladeRedesign.png': BladeRedesign,
  '/historicalImages/OriginalBladePeople.png': OriginalBladePeople,
};

const StructureInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  // Function to handle closing
  const handleClose = () => {
    navigate('/structures');
  };

  // Get structure data based on structureNumber
  const structureNumber = location.state?.structureNumber || 3; // Default to 3 if no number passed
  const structure = structureData.structure; // Update this to use the structureNumber as needed

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? structure.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === structure.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleDescription = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  // Helper function to get link icon
  const getLinkIcon = (title) => {
    if (title.toLowerCase().includes('article')) return <FaNewspaper />;
    if (title.toLowerCase().includes('thesis')) return <FaBook />;
    return <FaGlobe />;
  };

  // Helper function to get emoji for info cards
  const getInfoEmoji = (type) => {
    const emojiMap = {
      year: '📅',
      department: '🏛️',
      advisor: '👨‍🏫',
      builders: '👷',
      status: '🔄',
      style: '🎨',
      location: '📍',
    };
    return emojiMap[type] || '📌';
  };

  // Function to get image path
  const getImagePath = (relativePath) => {
    return imageMap[relativePath] || '';
  };

  return (
    <S.InfoPageWrapper>
      <S.HeaderContainer>
        <S.StructureNumberBubble>{structure.number}</S.StructureNumberBubble>
        <S.StructureTitleInfo>{structure.name}</S.StructureTitleInfo>
        <S.CloseButton onClick={handleClose}>
          <FaTimes />
        </S.CloseButton>
      </S.HeaderContainer>

      <S.ContentContainer>
        <S.MainContent>
          {/* Left section with natural height */}
          <S.LeftSection>
            <S.DescriptionContainer>
              <S.SectionTitleInfo>Images</S.SectionTitleInfo>
              <S.ImageContainer>
                <S.StyledImage
                  src={getImagePath(structure.images[currentImageIndex].path)}
                  alt={structure.images[currentImageIndex].description}
                />
                <S.ImageControls>
                  <S.ArrowButton onClick={handlePrevImage}>
                    <FaChevronLeft />
                  </S.ArrowButton>
                  <S.ArrowButton onClick={handleNextImage}>
                    <FaChevronRight />
                  </S.ArrowButton>
                </S.ImageControls>
              </S.ImageContainer>

              <S.ImageDescription>
                <p>{structure.images[currentImageIndex].description}</p>
              </S.ImageDescription>
            </S.DescriptionContainer>

            <S.DescriptionContainer>
              <S.SectionTitleInfo>Description</S.SectionTitleInfo>
              <S.DescriptionText expanded={descriptionExpanded}>
                <p>{structure.description}</p>
                <p>{structure.extended_description}</p>
              </S.DescriptionText>
              <S.ToggleDescriptionButton onClick={toggleDescription}>
                {descriptionExpanded ? 'Show Less Info' : 'Show More Info'}
              </S.ToggleDescriptionButton>
            </S.DescriptionContainer>
          </S.LeftSection>

          {/* Right section that matches height and scrolls if needed */}
          <S.InfoCardsSection>
            <S.SectionTitleInfo>Quick Facts</S.SectionTitleInfo>
            {structure.year && (
              <S.InfoCard>
                <S.InfoCardHeader>
                  <S.InfoCardEmoji>{getInfoEmoji('year')}</S.InfoCardEmoji>
                  <S.InfoCardTitle>Year</S.InfoCardTitle>
                </S.InfoCardHeader>
                <S.InfoCardContent>{structure.year}</S.InfoCardContent>
              </S.InfoCard>
            )}

            {structure.department && (
              <S.InfoCard>
                <S.InfoCardHeader>
                  <S.InfoCardEmoji>
                    {getInfoEmoji('department')}
                  </S.InfoCardEmoji>
                  <S.InfoCardTitle>Department</S.InfoCardTitle>
                </S.InfoCardHeader>
                <S.InfoCardContent>
                  {structure.department.join(', ')}
                </S.InfoCardContent>
              </S.InfoCard>
            )}

            {structure.advisor_builders?.some((person) =>
              person.role.includes('Advisor')
            ) && (
              <S.InfoCard>
                <S.InfoCardHeader>
                  <S.InfoCardEmoji>{getInfoEmoji('advisor')}</S.InfoCardEmoji>
                  <S.InfoCardTitle>Advisors</S.InfoCardTitle>
                </S.InfoCardHeader>
                <S.InfoCardContent>
                  {structure.advisor_builders
                    .filter((person) => person.role.includes('Advisor'))
                    .map((person) => person.name)
                    .join(', ')}
                </S.InfoCardContent>
              </S.InfoCard>
            )}

            {structure.advisor_builders?.some(
              (person) => !person.role.includes('Advisor')
            ) && (
              <S.InfoCard>
                <S.InfoCardHeader>
                  <S.InfoCardEmoji>{getInfoEmoji('builders')}</S.InfoCardEmoji>
                  <S.InfoCardTitle>Builders</S.InfoCardTitle>
                </S.InfoCardHeader>
                <S.InfoCardContent>
                  {structure.advisor_builders
                    .filter((person) => !person.role.includes('Advisor'))
                    .map((person) => person.name)
                    .join(', ')}
                </S.InfoCardContent>
              </S.InfoCard>
            )}

            {structure.status && (
              <S.InfoCard>
                <S.InfoCardHeader>
                  <S.InfoCardEmoji>{getInfoEmoji('status')}</S.InfoCardEmoji>
                  <S.InfoCardTitle>Status</S.InfoCardTitle>
                </S.InfoCardHeader>
                <S.InfoCardContent>{structure.status}</S.InfoCardContent>
              </S.InfoCard>
            )}

            {structure.style && (
              <S.InfoCard>
                <S.InfoCardHeader>
                  <S.InfoCardEmoji>{getInfoEmoji('style')}</S.InfoCardEmoji>
                  <S.InfoCardTitle>Style</S.InfoCardTitle>
                </S.InfoCardHeader>
                <S.InfoCardContent>{structure.style}</S.InfoCardContent>
              </S.InfoCard>
            )}

            {structure.location && (
              <S.InfoCard>
                <S.InfoCardHeader>
                  <S.InfoCardEmoji>{getInfoEmoji('location')}</S.InfoCardEmoji>
                  <S.InfoCardTitle>Location</S.InfoCardTitle>
                </S.InfoCardHeader>
                <S.InfoCardContent>
                  {`${structure.location.latitude}, ${structure.location.longitude}`}
                </S.InfoCardContent>
              </S.InfoCard>
            )}
          </S.InfoCardsSection>
        </S.MainContent>

        {/* Resources */}
        <S.LinksSection>
          {structure.links.map((link, index) => (
            <S.LinkButton
              key={index}
              href={link.URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getLinkIcon(link.title)}
              {link.title}
            </S.LinkButton>
          ))}
        </S.LinksSection>
      </S.ContentContainer>
    </S.InfoPageWrapper>
  );
};

export default StructureInfo;

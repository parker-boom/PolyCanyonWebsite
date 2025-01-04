import React, { useState } from 'react';
import {
  FaArrowLeft,
  FaLeaf,
  FaWater,
  FaMountain,
  FaSun,
  FaPaw,
} from 'react-icons/fa';
import {
  Container,
  ContentWrapper,
  TopSection,
  TopContentWrapper,
  SelectedIconContainer,
  DisplayIcon,
  CategoryTitle,
  MainContent,
  TextSection,
  InteractiveSection,
  IconsBar,
  NavIcon,
  ExitBar,
  ExitLink,
  ParagraphText,
  SectionTitle,
  TextContainer,
} from './cLand.styles.js';
import { landContent } from './landContent.js';
import {
  ClimateInteractive,
  VegetationInteractive,
  WildlifeInteractive,
  GeologyInteractive,
  HydrologyInteractive,
} from './cLand.components.js';
import { categoryQuestions } from './landData.js';
import { Helmet } from 'react-helmet-async';

// Map of interactive components for each category
const interactiveComponents = {
  climate: ClimateInteractive,
  vegetation: VegetationInteractive,
  wildlife: WildlifeInteractive,
  geology: GeologyInteractive,
  hydrology: HydrologyInteractive,
};

const categories = [
  { id: 'climate', icon: FaSun, label: 'Climate' },
  { id: 'vegetation', icon: FaLeaf, label: 'Vegetation' },
  { id: 'wildlife', icon: FaPaw, label: 'Wildlife' },
  { id: 'geology', icon: FaMountain, label: 'Geology' },
  { id: 'hydrology', icon: FaWater, label: 'Hydrology' },
];

const Land = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Get the appropriate interactive component
  const InteractiveComponent = interactiveComponents[selectedCategory.id];

  return (
    <Container>
      <Helmet>
        <title>The Land - Natural History of Poly Canyon</title>
        <meta
          name="description"
          content="Discover the natural environment of Poly Canyon - from its Mediterranean climate and native vegetation to its unique geology, wildlife, and water systems that shape this architectural laboratory."
        />
        <meta
          property="og:title"
          content="The Land - Natural History of Poly Canyon"
        />
        <meta
          property="og:description"
          content="Discover the natural environment of Poly Canyon - from its Mediterranean climate and native vegetation to its unique geology, wildlife, and water systems that shape this architectural laboratory."
        />
        <meta
          property="og:url"
          content="https://polycanyon.com/chronicles/land"
        />
        <meta
          name="twitter:title"
          content="The Land - Natural History of Poly Canyon"
        />
        <meta
          name="twitter:description"
          content="Discover the natural environment of Poly Canyon - from its Mediterranean climate and native vegetation to its unique geology, wildlife, and water systems that shape this architectural laboratory."
        />
      </Helmet>
      <ContentWrapper>
        <TopSection>
          <TopContentWrapper>
            <SelectedIconContainer>
              <DisplayIcon>
                <selectedCategory.icon />
              </DisplayIcon>
            </SelectedIconContainer>
            <CategoryTitle>{selectedCategory.label}</CategoryTitle>
          </TopContentWrapper>
        </TopSection>

        <MainContent>
          <TextSection>
            <SectionTitle>
              {categoryQuestions[selectedCategory.id]}
            </SectionTitle>
            <TextContainer>
              <ParagraphText>{landContent[selectedCategory.id]}</ParagraphText>
            </TextContainer>
          </TextSection>

          <InteractiveSection>
            <InteractiveComponent />
          </InteractiveSection>
        </MainContent>

        <IconsBar>
          {categories.map((category) => (
            <NavIcon
              key={category.id}
              $isSelected={selectedCategory.id === category.id}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon />
            </NavIcon>
          ))}
        </IconsBar>
      </ContentWrapper>

      <ExitBar>
        <ExitLink to="/chronicles/2">
          <FaArrowLeft /> Back to Chronicles
        </ExitLink>
      </ExitBar>
    </Container>
  );
};

export default Land;

import React, { useState, useEffect } from 'react';
import { FaDice, FaArrowLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { projectImages } from './images/projectImgs.js';
import projectData from './images/projectImgs.json';
import projectsBg from '../Home/bubbleimgs/projects.jpg';
import {
  Container,
  ImageSection,
  HeaderBar,
  StructureTitle,
  ImageContainer,
  BlurredBackground,
  MainImage,
  HeaderYear,
  ProjectDescription,
  SurpriseButton,
  ExitBar,
  ExitLink,
} from './cProjects.styles.js';
import structuresList from '../../structures/data/structuresList.json';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = projectImages[currentIndex];
  const currentData = projectData[currentIndex];

  const handleSurpriseMe = () => {
    const activeStructures = structuresList.filter(
      (s) => s.status === 'Active'
    );
    const randomStructure =
      activeStructures[Math.floor(Math.random() * activeStructures.length)];
    window.location.href = `/structures/${randomStructure.url}`;
  };

  return (
    <Container $bgImage={projectsBg}>
      <Helmet>
        <title>The Projects - Student-Built Legacy of Poly Canyon</title>
        <meta
          name="description"
          content="Explore the remarkable student-built structures of Poly Canyon. Each project tells a story of innovation, determination, and architectural vision, creating a living laboratory of experimental design."
        />
        <meta
          property="og:title"
          content="The Projects - Student-Built Legacy of Poly Canyon"
        />
        <meta
          property="og:description"
          content="Explore the remarkable student-built structures of Poly Canyon. Each project tells a story of innovation, determination, and architectural vision, creating a living laboratory of experimental design."
        />
        <meta
          property="og:url"
          content="https://polycanyon.com/chronicles/projects"
        />
        <meta
          name="twitter:title"
          content="The Projects - Student-Built Legacy of Poly Canyon"
        />
        <meta
          name="twitter:description"
          content="Explore the remarkable student-built structures of Poly Canyon. Each project tells a story of innovation, determination, and architectural vision, creating a living laboratory of experimental design."
        />
      </Helmet>
      <ImageSection>
        <HeaderBar>
          <StructureTitle>{currentData.name}</StructureTitle>
          <HeaderYear>{currentData.year}.</HeaderYear>
        </HeaderBar>
        <ImageContainer>
          <BlurredBackground $image={currentImage} />
          <MainImage
            src={currentImage}
            alt={currentData.name}
            key={currentIndex}
          />
        </ImageContainer>
        <ProjectDescription>
          In these structures lie countless stories from students. Each project
          began with uncertainty - hands shaking as they drew the first lines,
          voices wavering as they defended their visions. But in moments of
          fear, something remarkable happened. The canyon became their teacher,
          their canvas, their crucible. These weren&apos;t just senior projects
          - they were battles with the status quo that forged new confidence,
          technical challenges that bred innovation, and solitary visions that
          blossomed into lasting legacies.
        </ProjectDescription>
      </ImageSection>

      <SurpriseButton onClick={handleSurpriseMe}>
        <FaDice /> Explore a Random Structure
      </SurpriseButton>

      <ExitBar>
        <ExitLink to="/chronicles/2">
          <FaArrowLeft /> Back to Chronicles
        </ExitLink>
      </ExitBar>
    </Container>
  );
};

export default Projects;

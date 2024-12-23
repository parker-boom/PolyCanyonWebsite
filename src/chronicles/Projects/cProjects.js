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
          Every structure in the canyon began as a senior project, but each grew
          far beyond its original scope. Students from architecture,
          engineering, and construction worked together, testing new ideas at
          full scale. What makes these projects remarkable isn&apos;t just their
          experimental nature—it&apos;s how they challenged everyone involved.
          Simple drawings became complex problems. Initial timelines stretched
          as students grappled with real materials, weather, and terrain. Yet
          these challenges created something remarkable: the purest example of
          learning by doing. While each structure explored different techniques
          and scales, they all share this legacy of pushing boundaries through
          collaboration.
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

import React, { useEffect, useRef } from 'react';
import { FaTimes, FaChevronRight } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { TransitionProvider, useTransition } from '../TransitionContext.js';
import ChroniclesTransition from '../ChroniclesTransition.js';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  ExitBar,
  ExitLink,
  TitleContainer,
  MainTitle,
  Subtitle,
  BubblesGrid,
  BubbleCard,
  BubbleTitle,
  StageButton,
  ExploreTitle,
  ChroniclesLogo,
  BottomRow,
} from './cHome.styles.js';
import StoryImg from './bubbleimgs/story.jpg';
import NaturalImg from './bubbleimgs/land.jpg';
import PeopleImg from './bubbleimgs/people.jpg';
import ProjectsImg from './bubbleimgs/projects.jpg';
import ChroniclesIcon from './bubbleimgs/chroniclesIcon.png';

const HomeContent = () => {
  const location = useLocation();
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const { startTransition } = useTransition();

  const currentStage = location.pathname === '/chronicles/2' ? 2 : 1;

  useEffect(() => {
    if (titleRef.current) {
      const text = titleRef.current;
      const bbox = text.getBBox();
      const viewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
      text.closest('svg').setAttribute('viewBox', viewBox);
    }
  }, []);

  const handleCardClick = async (path, e, imageUrl) => {
    // Get click position relative to viewport
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 + '%';
    const y = ((e.clientY - rect.top) / rect.height) * 100 + '%';

    // Start transition
    startTransition({
      fromSection: 'home',
      toSection: path,
      startPosition: { x, y },
      imageUrl,
    });

    // Wait for expansion and quick fade
    setTimeout(() => {
      navigate(`/chronicles/${path.toLowerCase()}`);
    }, 1200); // Gives time for expansion (800ms) and quick fade (400ms)
  };

  const handleStageChange = () => {
    navigate('/chronicles/2');
  };

  return (
    <Container>
      <Helmet>
        <title>Canyon Chronicles - A Journey Through Time</title>
        <meta
          name="description"
          content="Explore the rich history of Poly Canyon through an interactive journey. Discover the story, land, people, and projects that shaped this unique architectural laboratory."
        />
        <meta
          property="og:title"
          content="Canyon Chronicles - A Journey Through Time"
        />
        <meta
          property="og:description"
          content="Explore the rich history of Poly Canyon through an interactive journey. Discover the story, land, people, and projects that shaped this unique architectural laboratory."
        />
        <meta property="og:url" content="https://polycanyon.com/chronicles" />
        <meta
          name="twitter:title"
          content="Canyon Chronicles - A Journey Through Time"
        />
        <meta
          name="twitter:description"
          content="Explore the rich history of Poly Canyon through an interactive journey. Discover the story, land, people, and projects that shaped this unique architectural laboratory."
        />
      </Helmet>
      <ChroniclesTransition />
      <TitleContainer $stage={currentStage}>
        {currentStage === 1 ? (
          <>
            <ChroniclesLogo src={ChroniclesIcon} alt="Chronicles Icon" />
            <MainTitle>
              <svg overflow="visible">
                <text ref={titleRef} x="50%" y="50%" textAnchor="middle">
                  Canyon Chronicles
                </text>
              </svg>
              Canyon Chronicles
            </MainTitle>
            <Subtitle>
              <span>We must understand what has been,</span>
              <span>to dream about what can be</span>
            </Subtitle>
            <StageButton onClick={handleStageChange}>
              Uncover the Story <FaChevronRight />
            </StageButton>
          </>
        ) : (
          <>
            <ExploreTitle>What would you like to explore?</ExploreTitle>
            <BubblesGrid>
              <BubbleCard
                $image={StoryImg}
                onClick={(e) => handleCardClick('story', e, StoryImg)}
                $isStory={true}
              >
                <BubbleTitle $isStory={true}>
                  <span className="prefix">The</span>
                  <span className="main">Story</span>
                </BubbleTitle>
              </BubbleCard>
              <BottomRow>
                <BubbleCard
                  $image={NaturalImg}
                  onClick={(e) => handleCardClick('land', e, NaturalImg)}
                >
                  <BubbleTitle>
                    <span className="prefix">The</span>
                    <span className="main">Land</span>
                  </BubbleTitle>
                </BubbleCard>
                <BubbleCard
                  $image={PeopleImg}
                  onClick={(e) => handleCardClick('people', e, PeopleImg)}
                >
                  <BubbleTitle>
                    <span className="prefix">The</span>
                    <span className="main">People</span>
                  </BubbleTitle>
                </BubbleCard>
                <BubbleCard
                  $image={ProjectsImg}
                  onClick={(e) => handleCardClick('projects', e, ProjectsImg)}
                >
                  <BubbleTitle>
                    <span className="prefix">The</span>
                    <span className="main">Projects</span>
                  </BubbleTitle>
                </BubbleCard>
              </BottomRow>
            </BubblesGrid>
          </>
        )}
      </TitleContainer>

      <ExitBar $stage={currentStage}>
        <ExitLink to="/">
          <FaTimes /> Exit the Chronicles
        </ExitLink>
      </ExitBar>
    </Container>
  );
};

const Home = () => {
  return (
    <TransitionProvider>
      <HomeContent />
    </TransitionProvider>
  );
};

export default Home;

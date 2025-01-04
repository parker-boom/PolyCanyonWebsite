import React, { useState } from 'react';
import { FaTimes, FaChevronRight } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { TransitionProvider, useTransition } from '../TransitionContext.js';
import ChroniclesTransition from '../ChroniclesTransition.js';
import {
  Container,
  ExitBar,
  ExitLink,
  TitleContainer,
  MainTitle,
  BubblesGrid,
  BubbleCard,
  BubbleTitle,
  StageButton,
  ExploreTitle,
  ChroniclesLogo,
  BottomRow,
  ActionLine,
  LogoTitleGroup,
} from './cHome.styles.js';
import StoryImg from './bubbleimgs/story.jpg';
import NaturalImg from './bubbleimgs/land.jpg';
import PeopleImg from './bubbleimgs/people.jpg';
import ProjectsImg from './bubbleimgs/projects.jpg';
import ChroniclesIcon from './bubbleimgs/chroniclesIcon.png';

const HomeContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { startTransition } = useTransition();
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const currentStage = location.pathname === '/chronicles/2' ? 2 : 1;

  const handleStageChange = () => {
    const container = document.querySelector('.stage-1');
    if (container) {
      container.style.opacity = 0;
      setTimeout(() => {
        navigate('/chronicles/2');
      }, 600);
    }
  };

  const handleCardClick = async (path, e, imageUrl) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 + '%';
    const y = ((e.clientY - rect.top) / rect.height) * 100 + '%';

    startTransition({
      fromSection: 'home',
      toSection: path,
      startPosition: { x, y },
      imageUrl,
    });

    setTimeout(() => {
      navigate(`/chronicles/${path.toLowerCase()}`);
    }, 1200);
  };

  return (
    <Container
      className={`stage-${currentStage} ${isButtonHovered ? 'button-hovered' : ''}`}
    >
      <ChroniclesTransition />
      <TitleContainer $stage={currentStage}>
        {currentStage === 1 ? (
          <>
            <LogoTitleGroup>
              <ChroniclesLogo src={ChroniclesIcon} alt="Chronicles Icon" />
              <MainTitle>Canyon Chronicles</MainTitle>
            </LogoTitleGroup>
            <ActionLine>
              An interactive journey through Cal Poly&apos;s architectural
              wonderland
            </ActionLine>
            <StageButton
              onClick={handleStageChange}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span>
                Uncover the Story
                <FaChevronRight />
              </span>
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

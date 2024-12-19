import React, { useEffect, useRef } from 'react';
import { FaTimes, FaChevronRight } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
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
import StoryImg from './bubbleimgs/Story.png';
import NaturalImg from './bubbleimgs/Natural.png';
import PeopleImg from './bubbleimgs/People.png';
import ProjectsImg from './bubbleimgs/Projects.png';
import ChroniclesIcon from './bubbleimgs/chroniclesIcon.png';

const Home = () => {
  const location = useLocation();
  const titleRef = useRef(null);
  const navigate = useNavigate();

  const currentStage = location.pathname === '/chronicles/2' ? 2 : 1;

  useEffect(() => {
    if (titleRef.current) {
      const text = titleRef.current;
      const bbox = text.getBBox();
      const viewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
      text.closest('svg').setAttribute('viewBox', viewBox);
    }
  }, []);

  const handleCardClick = (path) => {
    navigate(`/chronicles/${path.toLowerCase()}`);
  };

  const handleStageChange = () => {
    navigate('/chronicles/2');
  };

  return (
    <Container>
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
                onClick={() => handleCardClick('story')}
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
                  onClick={() => handleCardClick('land')}
                >
                  <BubbleTitle>
                    <span className="prefix">The</span>
                    <span className="main">Land</span>
                  </BubbleTitle>
                </BubbleCard>
                <BubbleCard
                  $image={PeopleImg}
                  onClick={() => handleCardClick('people')}
                >
                  <BubbleTitle>
                    <span className="prefix">The</span>
                    <span className="main">People</span>
                  </BubbleTitle>
                </BubbleCard>
                <BubbleCard
                  $image={ProjectsImg}
                  onClick={() => handleCardClick('projects')}
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

export default Home;

import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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
} from './cHome.styles.js';
import OriginsImg from './bubbleimgs/Origins.png';
import NaturalImg from './bubbleimgs/Natural.png';
import PeopleImg from './bubbleimgs/People.png';
import ProjectsImg from './bubbleimgs/Projects.png';
import ChroniclesIcon from './bubbleimgs/chroniclesIcon.png';

const Home = () => {
  const [stage, setStage] = useState(1);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up SVG text with proper positioning
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

  return (
    <Container>
      <TitleContainer $stage={stage}>
        {stage === 1 ? (
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
              <span>We must understand what has already been,</span>
              <span>to dream about what could be</span>
            </Subtitle>
            <StageButton onClick={() => setStage(2)}>
              Uncover the Story <FaChevronRight />
            </StageButton>
          </>
        ) : (
          <>
            <ExploreTitle>
              <svg overflow="visible">
                <text ref={titleRef} x="50%" y="50%" textAnchor="middle">
                  What would you like to explore?
                </text>
              </svg>
              What would you like to explore?
            </ExploreTitle>
            <BubblesGrid>
              <BubbleCard
                $image={OriginsImg}
                onClick={() => handleCardClick('origins')}
              >
                <BubbleTitle>
                  <span className="prefix">The</span>
                  <span className="main">Origins</span>
                </BubbleTitle>
              </BubbleCard>
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
            </BubblesGrid>
          </>
        )}
      </TitleContainer>

      <ExitBar>
        <ExitLink to="/">
          <FaArrowLeft /> Exit the Chronicles
        </ExitLink>
      </ExitBar>
    </Container>
  );
};

export default Home;

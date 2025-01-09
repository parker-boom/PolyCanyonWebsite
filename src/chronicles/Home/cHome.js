import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaTimes, FaChevronRight, FaQuestion } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { TransitionProvider, useTransition } from '../TransitionContext.js';
import ChroniclesTransition from '../ChroniclesTransition.js';
import {
  Container,
  ExitBar,
  ExitLink,
  TitleContainer,
  Title2Container,
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
  CopyrightButton,
} from './cHome.styles.js';
import {
  DisclaimerPopup,
  DisclaimerContent,
  DisclaimerTitle,
  DisclaimerSection,
  CloseButton,
} from '../../layout/Navigation.styles.js';
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
  const [isDisclaimerOpen, setDisclaimerOpen] = useState(false);

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
    <>
      <Helmet>
        <title>Canyon Chronicles | Poly Canyon Interactive Experience</title>
        <meta
          name="description"
          content="Embark on an interactive journey through Cal Poly's architectural wonderland. Explore the rich history, untold stories, and architectural heritage of Poly Canyon through an immersive digital experience."
        />
        <meta
          name="keywords"
          content="Poly Canyon, Cal Poly, architecture, interactive experience, architectural history, design village, experimental structures"
        />

        {/* Open Graph tags for social sharing */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Canyon Chronicles | Poly Canyon Interactive Experience"
        />
        <meta
          property="og:description"
          content="Discover the stories, people, and projects that shaped Cal Poly's architectural wonderland through an immersive digital journey."
        />
        <meta property="og:site_name" content="Poly Canyon App" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Canyon Chronicles | Interactive History of Poly Canyon"
        />
        <meta
          name="twitter:description"
          content="Explore the rich history and architectural heritage of Poly Canyon through an interactive digital experience."
        />
      </Helmet>

      <Container
        className={`stage-${currentStage} ${isButtonHovered ? 'button-hovered' : ''}`}
      >
        <ChroniclesTransition />
        {currentStage === 1 ? (
          <TitleContainer>
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
          </TitleContainer>
        ) : (
          <Title2Container>
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
          </Title2Container>
        )}

        <ExitBar $stage={currentStage}>
          <ExitLink to="/">
            <FaTimes /> Exit the Chronicles
          </ExitLink>
          {currentStage === 1 && (
            <CopyrightButton onClick={() => setDisclaimerOpen(true)}>
              <FaQuestion />
            </CopyrightButton>
          )}
        </ExitBar>
      </Container>

      {isDisclaimerOpen && (
        <DisclaimerPopup onClick={() => setDisclaimerOpen(false)}>
          <DisclaimerContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setDisclaimerOpen(false)}>
              <FaTimes />
            </CloseButton>
            <DisclaimerTitle>Copyright Disclaimer</DisclaimerTitle>
            <DisclaimerSection>
              <p>
                The content featured on this site, including images and
                information, is curated solely for educational, archival, and
                non-commercial purposes to document and preserve the history and
                cultural significance of Poly Canyon. We aim to present this
                information as part of a larger interactive experience that
                provides value to the community while respecting intellectual
                property rights.
              </p>
            </DisclaimerSection>

            <DisclaimerSection>
              <h3>Our Approach to Content:</h3>
              <p>
                Wherever possible, we attribute sources and highlight the
                origins of the materials used. Content such as photos and
                resources has been integrated into broader educational
                experiences, offering context and additional insights. Some
                images and materials originate from contributors and archives
                who have explicitly or implicitly supported their use for
                research and documentation.
              </p>
            </DisclaimerSection>

            <DisclaimerSection>
              <h3>Respect for Copyright Holders:</h3>
              <p>
                If you are the copyright owner of any material featured here and
                have concerns about its use, or if you prefer your content not
                be included, we are happy to address this. Please fill out our{' '}
                <a
                  href="https://forms.office.com/r/yL2REum2cj"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Opt-Out Form
                </a>{' '}
                or email at{' '}
                <a href="mailto:pjones15@calpoly.edu">pjones15@calpoly.edu</a>.
                We are committed to resolving such requests promptly and
                respectfully.
              </p>
            </DisclaimerSection>

            <DisclaimerSection>
              <h3>Good Faith Use:</h3>
              <p>
                This site operates under a good-faith belief that its use of
                copyrighted materials falls under fair use principles, as it is
                educational, transformative, and non-commercial in nature.
                However, we value collaboration and respect intellectual
                property rights above all else.
              </p>
            </DisclaimerSection>

            <DisclaimerSection>
              <p>
                By engaging with this site, users agree that all content is
                provided for informational and educational purposes only, with
                no intent to infringe on the rights of copyright holders.
              </p>
            </DisclaimerSection>
          </DisclaimerContent>
        </DisclaimerPopup>
      )}
    </>
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

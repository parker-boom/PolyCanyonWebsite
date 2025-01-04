import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  MainParagraph,
  ButtonGrid,
  MainButton,
  IconContainer,
  ButtonTitle,
  ExitBar,
} from './cPeople.styles.js';
import { comicIcons, ComicStrip } from './cPeople.comics.js';

const People = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const handleComicClick = (comicType) => {
    navigate(`/chronicles/people/${comicType}`);
  };

  // If we have a type parameter, show the comic strip
  if (type) {
    return (
      <Container>
        <ComicStrip
          type={type}
          onClose={() => navigate('/chronicles/people')}
        />
      </Container>
    );
  }

  // Otherwise show the home view
  return (
    <Container>
      <Helmet>
        <title>The People - Builders & Caretakers of Poly Canyon</title>
        <meta
          name="description"
          content="Meet the visionaries, builders, faculty, and caretakers who have shaped Poly Canyon's legacy. Discover the stories of those who dedicated themselves to this unique architectural laboratory."
        />
        <meta
          property="og:title"
          content="The People - Builders & Caretakers of Poly Canyon"
        />
        <meta
          property="og:description"
          content="Meet the visionaries, builders, faculty, and caretakers who have shaped Poly Canyon's legacy. Discover the stories of those who dedicated themselves to this unique architectural laboratory."
        />
        <meta
          property="og:url"
          content="https://polycanyon.com/chronicles/people"
        />
        <meta
          name="twitter:title"
          content="The People - Builders & Caretakers of Poly Canyon"
        />
        <meta
          name="twitter:description"
          content="Meet the visionaries, builders, faculty, and caretakers who have shaped Poly Canyon's legacy. Discover the stories of those who dedicated themselves to this unique architectural laboratory."
        />
      </Helmet>

      <MainParagraph>
        <p>
          Poly Canyon is nothing without its people—it is a living, breathing
          demonstration of tens of thousands of hours of labor, countless
          dreams, and the tireless efforts of those who believed in its
          potential...
        </p>
      </MainParagraph>

      <ButtonGrid>
        {['faculty', 'caretakers', 'builders'].map((type) => {
          const Icon = comicIcons[type];
          return (
            <MainButton key={type} onClick={() => handleComicClick(type)}>
              <IconContainer>
                <Icon />
              </IconContainer>
              <ButtonTitle>{type}</ButtonTitle>
            </MainButton>
          );
        })}
      </ButtonGrid>

      <ExitBar>
        <Link to="/chronicles/2">
          <FaArrowLeft /> Back to Chronicles
        </Link>
      </ExitBar>
    </Container>
  );
};

export default People;

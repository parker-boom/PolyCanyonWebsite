import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const People = () => {
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
      <Title>People</Title>
    </Container>
  );
};

export default People;

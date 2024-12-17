import React from 'react';
import styled from 'styled-components';

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
      <Title>People</Title>
    </Container>
  );
};

export default People;

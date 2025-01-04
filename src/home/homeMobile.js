import React from 'react';
import styled from 'styled-components';

// Styled component for centering text
const CenteredText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
`;

const HomeMobile = () => {
  return <CenteredText>homeMobile</CenteredText>;
};

export default HomeMobile;

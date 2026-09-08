import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChroniclesIcon from './bubbleimgs/chroniclesIcon.webp';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Logo = styled.img`
  width: 180px;
  height: 180px;
  margin-bottom: 10px;
  filter: drop-shadow(0 0 15px rgba(189, 139, 19, 0.6))
    drop-shadow(0 0 30px rgba(189, 139, 19, 0.3));
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 900;
  font-style: italic;
  color: #db8b1c;
  text-align: center;
  margin-bottom: 30px;
  text-shadow:
    0 0 20px rgba(219, 139, 28, 0.6),
    0 0 40px rgba(219, 139, 28, 0.4),
    0 0 60px rgba(219, 139, 28, 0.2);
`;

const Message = styled.p`
  color: #db8b1c;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  max-width: 300px;
  line-height: 1.5;
  margin-bottom: 40px;
  text-shadow:
    0 0 10px rgba(219, 139, 28, 0.4),
    0 0 20px rgba(219, 139, 28, 0.2);
  letter-spacing: 0.5px;
`;

const ExitButton = styled.button`
  padding: 14px 28px;
  border-radius: 30px;
  border: none;
  background: rgb(0, 0, 0);
  cursor: pointer;
  box-shadow:
    0 0 8px rgba(255, 255, 255, 0.1),
    0 0 14px rgba(255, 255, 255, 0.05);
  transition: all 0.4s ease;

  span {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 2px;
    color: white;
    text-transform: uppercase;
  }

  &:hover {
    box-shadow:
      0 0 15px rgba(255, 255, 255, 0.03),
      0 0 40px rgba(219, 139, 28, 0.35);
  }
`;

const ChroniclesHomeMobile = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo src={ChroniclesIcon} alt="Chronicles Icon" />
      <Title>Canyon Chronicles</Title>
      <Message>
        The Chronicles experience is designed for desktop viewing. Please visit
        on a computer to explore the full journey.
      </Message>
      <ExitButton onClick={() => navigate('/')}>
        <span>Exit</span>
      </ExitButton>
    </Container>
  );
};

export default ChroniclesHomeMobile;

import React from 'react';
import styled from 'styled-components';
import { FaMobileAlt, FaDesktop } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  min-height: 20vh;
  padding: 20px;
  text-align: center;
`;

const MessageCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px;
  max-width: 90%;
  width: 340px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.25),
    0 2px 8px rgba(55, 109, 49, 0.1);
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  font-size: 32px;
  color: #376d31;

  svg {
    transition: transform 0.3s ease;
  }

  svg:first-child {
    transform: rotate(-10deg);
  }

  svg:last-child {
    transform: rotate(10deg);
  }
`;

const Title = styled.h1`
  color: #376d31;
  font-size: 24px;
  margin: 0 0 16px 0;
  font-weight: 700;
`;

const Message = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
`;

const Highlight = styled.span`
  color: rgba(189, 139, 19, 0.9);
  font-weight: 600;
`;

const StructureListMobile = () => {
  return (
    <Container>
      <MessageCard>
        <IconContainer>
          <FaMobileAlt />
          <FaDesktop />
        </IconContainer>
        <Title>Desktop View Only</Title>
        <Message>
          The structures gallery is currently optimized for{' '}
          <Highlight>desktop viewing</Highlight>. A mobile-friendly version is
          coming soon to enhance your experience on the go!
        </Message>
      </MessageCard>
    </Container>
  );
};

export default StructureListMobile;

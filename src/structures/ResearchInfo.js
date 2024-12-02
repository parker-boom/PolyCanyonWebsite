import React from 'react';
import styled from 'styled-components';
import {
  FaTimes,
  FaGraduationCap,
  FaCamera,
  FaNewspaper,
} from 'react-icons/fa';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.95),
    rgba(255, 245, 222, 0.9)
  );
  border-radius: 24px;
  width: 95%;
  max-width: 920px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(189, 139, 19, 0.3);
  animation: modalAppear 0.3s ease-out;

  @keyframes modalAppear {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Header = styled.div`
  padding: 24px 32px;
  border-bottom: 2px solid rgba(189, 139, 19, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(255, 248, 230, 0.95),
    rgba(255, 245, 222, 0.9)
  );
  border-radius: 24px 24px 0 0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 32px;
  color: #376d31;
  font-weight: 800;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgba(189, 139, 19, 0.7);

  svg {
    font-size: 24px;
    transition: all 0.2s ease;
  }

  &:hover {
    background: rgba(189, 139, 19, 0.1);
    color: rgba(189, 139, 19, 0.9);
    transform: rotate(90deg);

    svg {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }
`;

const IntroText = styled.p`
  font-size: 18px;
  color: #2c3e50;
  line-height: 1.6;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 0px;
  padding: 0 24px;
`;

const SourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const SourceCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  border: 1px solid rgba(189, 139, 19, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 24px rgba(189, 139, 19, 0.15),
      0 4px 8px rgba(189, 139, 19, 0.1);
    border-color: rgba(189, 139, 19, 0.3);
  }
`;

const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #376d31, #2c5526);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: white;
  font-size: 24px;
  box-shadow:
    0 4px 12px rgba(55, 109, 49, 0.2),
    0 2px 4px rgba(55, 109, 49, 0.1);
  transition: all 0.3s ease;

  ${SourceCard}:hover & {
    transform: scale(1.05);
    box-shadow:
      0 6px 16px rgba(55, 109, 49, 0.25),
      0 4px 6px rgba(55, 109, 49, 0.15);
  }
`;

const SourceTitle = styled.h3`
  font-size: 20px;
  color: #376d31;
  margin: 0;
  font-weight: 700;
  transition: color 0.3s ease;

  ${SourceCard}:hover & {
    color: #2c5526;
  }
`;

const Disclaimer = styled.div`
  margin: 10px 24px;
  padding: 16px 20px;
  background: rgba(189, 139, 19, 0.1);
  border-radius: 12px;
  border-left: 4px solid rgba(189, 139, 19, 0.5);

  p {
    margin: 0;
    color: #2c3e50;
    font-size: 15px;
    line-height: 1.5;
  }
`;

const CreditsSection = styled.div`
  margin: 12px 24px 0;
  padding: 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.9),
    rgba(255, 245, 222, 0.85)
  );
  border-radius: 12px;
  border: 1px solid rgba(189, 139, 19, 0.2);
  box-shadow:
    0 4px 16px rgba(189, 139, 19, 0.1),
    0 2px 4px rgba(189, 139, 19, 0.05);
`;

const CreditsTitle = styled.h4`
  font-size: 17px;
  color: rgba(189, 139, 19, 1);
  margin: 0 0 16px 0;
  font-weight: 800;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  padding-bottom: 12px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(189, 139, 19, 0.5),
      transparent
    );
  }
`;

const CreditsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 15px;
  color: #2c3e50;
  line-height: 1.4;
`;

const CreditItem = styled.div`
  padding: 8px 0;

  strong {
    color: rgba(189, 139, 19, 0.9);
    font-weight: 600;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(189, 139, 19, 0.1);
  }
`;

const Content = () => (
  <div>
    <IntroText>
      The research into the structures at Poly Canyon comes directly from
      historical records and archives. When these sources are directly
      available, they have been linked in the &quot;Resources&quot; section at
      the bottom of each structure&apos;s page. Generally they can be
      categorized into the following 3 areas:
    </IntroText>

    <SourcesGrid>
      <SourceCard>
        <IconWrapper>
          <FaGraduationCap />
        </IconWrapper>
        <SourceTitle>Original Theses</SourceTitle>
      </SourceCard>

      <SourceCard>
        <IconWrapper>
          <FaCamera />
        </IconWrapper>
        <SourceTitle>Historical Images</SourceTitle>
      </SourceCard>

      <SourceCard>
        <IconWrapper>
          <FaNewspaper />
        </IconWrapper>
        <SourceTitle>Articles & Resources</SourceTitle>
      </SourceCard>
    </SourcesGrid>

    <CreditsSection>
      <CreditsTitle>Special Thanks To</CreditsTitle>
      <CreditsList>
        <CreditItem>
          <strong>Danny Wills and his 4th Year Architecture Studio</strong> for
          their comprehensive compilation of historical resources
        </CreditItem>
        <CreditItem>
          <strong>Jesse Vestermark</strong> for creating the Poly Canyon
          Research Guide and preserving access to original theses
        </CreditItem>
        <CreditItem>
          <strong>CAED Department</strong> for their collective knowledge and
          ongoing contributions to documenting these structures
        </CreditItem>
      </CreditsList>
    </CreditsSection>

    <Disclaimer>
      <p>
        While all information is sourced from primary and official
        documentation, please note that some details may be incomplete or
        subject to interpretation. This compilation puts forward a best effort
        representation of the history of these structures, but should not be
        considered definitive. To offer corrections or additional information,{' '}
        <a
          href="https://forms.office.com/r/r13RDrzxxS"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#376d31',
            textDecoration: 'underline',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#2c5526',
              textDecoration: 'none',
            },
          }}
        >
          submit your feedback
        </a>
      </p>
    </Disclaimer>
  </div>
);

const ResearchInfo = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>How the Research Was Done</Title>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </Header>
        <Content />
      </Container>
    </Overlay>
  );
};

export default ResearchInfo;

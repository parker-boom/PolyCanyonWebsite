// SupportPage.jsx
// Mobile-optimized Support Page for Poly Canyon App with requested UI adjustments.

import React from 'react';
import app360 from '../assets/app360.jpg';
import {
  PageContainer,
  Header,
  Title,
  Icon,
  MainContent,
  Section,
  SupportMessage,
  ActionButton,
  InfoContainer,
  InfoMessage,
  Footer,
  FooterText,
} from './SupportPage.styles';

const SupportPage = () => {
  return (
    <PageContainer>
      {/* Header Section: Contains the app icon and title */}
      <Header>
        <Icon src={app360} alt="Poly Canyon App Icon" />
        <Title>Poly Canyon Support</Title>
      </Header>

      {/* Main Content Section */}
      <MainContent>
        {/* Bug Reporting Section */}
        <Section>
          <SupportMessage>Did you find a bug? 🐛</SupportMessage>
          <ActionButton
            href="mailto:parker.jones@live.com"
            aria-label="Email Parker Jones about a bug"
            colorType="green"
          >
            Email Us
          </ActionButton>
        </Section>

        {/* Information Section */}
        <Section>
          <InfoContainer>
            <InfoMessage>Looking for more information? 📘</InfoMessage> 
          </InfoContainer>
          <div>
            <ActionButton
              href="https://polycanyon.calpoly.edu/history"
              target="_blank"
              rel="noopener noreferrer"
              colorType="yellow"
            >
              CAED Website
            </ActionButton>
            <ActionButton
              href="https://guides.lib.calpoly.edu/polycanyon"
              target="_blank"
              rel="noopener noreferrer"
              colorType="yellow"
            >
              Kennedy Library Archive
            </ActionButton>
          </div>
        </Section>
      </MainContent>

      {/* Footer Section */}
      <Footer>
        <FooterText>© 2024 Poly Canyon App. All rights reserved.</FooterText>
        <FooterText>Cal Poly, San Luis Obispo</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default SupportPage;

// SupportPage.styles.js
// Styled-components for the Support Page with requested UI adjustments.

import styled, { css } from 'styled-components';

// Define a color palette for consistency
const colors = {
  green: '#28a745',
  greenDark: '#218838',
  yellow: '#ffc107',
  yellowDark: '#e0a800',
  secondary: '#f0f0f0',
  secondaryDark: '#e0e0e0',
  text: '#333',
  background: '#ffffff',
  footerBackground: '#f8f9fa',
};

// Helper for button colors based on type
const buttonColors = {
  green: {
    background: colors.green,
    hover: colors.greenDark,
    text: '#fff',
  },
  yellow: {
    background: colors.yellow,
    hover: colors.yellowDark,
    text: '#333',
  },
};

// Container for the entire page with mobile-friendly padding and background
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.background};
  min-height: 100vh;
  padding: 20px 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

// Header section containing the icon and title, centered vertically
export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px; /* Reduced spacing between header and main content */
`;

// App icon styling with original sizing
export const Icon = styled.img`
  width: 150px; /* Restored original size */
  height: 150px; /* Restored original size */
  object-fit: cover;
  border-radius: 36px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 0; /* Removed spacing between icon and title */
`;

// Title styling with increased font size
export const Title = styled.h1`
  font-size: 28px; /* Increased from 24px */
  color: ${colors.text};
  text-align: center;
  margin-top: 5px; /* Slight top margin for balance */
`;

// Main content area with full width and responsive padding
export const MainContent = styled.main`
  width: 100%;
  max-width: 500px;
`;

// Individual section within main content, stacked vertically with spacing
export const Section = styled.section`
  background-color: ${colors.secondary};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center content within the section */
`;

// Support message styling with increased font size and removed top margin
export const SupportMessage = styled.h2`
  font-size: 22px; /* Increased from 20px */
  color: ${colors.text};
  margin: 0 0 15px 0; /* Removed top spacing */
  text-align: center;
`;

// Button styling optimized for touch interactions and colored based on type
export const ActionButton = styled.a`
  display: inline-block;
  background-color: ${({ colorType }) => buttonColors[colorType].background};
  color: ${({ colorType }) => buttonColors[colorType].text};
  padding: 14px 25px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  margin: 10px 10px 0 10px; /* Centered with equal left and right margins */
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  text-align: center;

  &:hover,
  &:focus {
    background-color: ${({ colorType }) => buttonColors[colorType].hover};
    transform: translateY(-2px); /* Subtle lift on hover */
  }

  &:active {
    transform: translateY(0); /* Reset position on click */
  }
`;

// Container for information section with icon and message, centered
export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

// Information message styling with single emoji on the right
export const InfoMessage = styled.h2`
  font-size: 22px; /* Increased from 20px */
  color: ${colors.text};
  display: flex;
  align-items: center;

  /* Adding space before the emoji */
  &::after {
    content: ' 📘';
    margin-left: 8px;
    font-size: 22px; /* Increased to match text */
  }
`;

// Footer styling with centered text and adequate spacing
export const Footer = styled.footer`
  width: 100%;
  background-color: ${colors.footerBackground};
  padding: 15px 10px;
  text-align: center;
  margin-top: auto;
  border-top: 1px solid ${colors.secondaryDark};
`;

// Footer text styling with smaller font size for subtlety
export const FooterText = styled.p`
  color: ${colors.text};
  margin: 5px 0;
  font-size: 14px;
`;

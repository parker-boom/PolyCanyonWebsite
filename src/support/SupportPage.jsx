import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ContactLink from '../components/ContactLink.jsx';

const Page = styled.article`
  max-width: 1040px;
  margin: 0 auto;
  padding: 36px 28px 60px;
  color: #354133;
  font-size: 17px;
  line-height: 1.8;
  h1 {
    margin: 0 0 24px;
    color: #376d31;
    font-size: clamp(34px, 4.5vw, 48px);
    line-height: 1.15;
  }
  p {
    margin: 0 0 20px;
  }
  a {
    color: #376d31;
    text-underline-offset: 3px;
  }
  @media (max-width: 600px) {
    padding: 26px 20px 40px;
  }
`;

export default function SupportPage() {
  return (
    <Page>
      <h1>Support</h1>
      <p>
        For help with the Poly Canyon app or website,{' '}
        <ContactLink>contact us</ContactLink>.
      </p>
      <p>
        If something isn’t working, include your device and a short description
        of the issue. Corrections and questions about material in the archive
        are welcome too.
      </p>
      <Link to="/privacy">Privacy Policy</Link>
    </Page>
  );
}

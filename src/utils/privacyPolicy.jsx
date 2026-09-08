import {
  policyDate,
  policyIntroduction,
  policySections,
} from './privacyContent.js';
import ContactLink from '../components/ContactLink.jsx';
import React from 'react';
import styled from 'styled-components';

const Page = styled.article`
  max-width: 1040px;
  margin: 0 auto;
  padding: 36px 28px 60px;
  color: #354133;
  line-height: 1.8;
  h1 {
    margin: 0 0 8px;
    color: #376d31;
    font-size: clamp(34px, 4.5vw, 48px);
    line-height: 1.15;
    letter-spacing: -1px;
  }
  h2 {
    margin: 32px 0 12px;
    color: #376d31;
    font-size: 23px;
    line-height: 1.3;
  }
  p {
    margin: 0 0 18px;
    font-size: 17px;
  }
  a {
    color: #376d31;
    text-underline-offset: 3px;
  }
  @media (max-width: 600px) {
    padding: 26px 20px 40px;
  }
`;
const Updated = styled.p`
  && {
    color: #606b5d;
    font-size: 13px;
    margin-bottom: 28px;
  }
`;

export default function PrivacyPolicy() {
  return (
    <Page>
      <h1>Privacy Policy</h1>
      <Updated>Last updated: {policyDate}</Updated>
      <p>{policyIntroduction}</p>
      {policySections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((parts, index) => (
            <p key={index}>
              {parts.map((part, i) =>
                typeof part === 'string' ? (
                  part
                ) : part.contact ? (
                  <ContactLink key={i}>{part.text}</ContactLink>
                ) : (
                  <a key={i} href={part.href}>
                    {part.text}
                  </a>
                )
              )}
            </p>
          ))}
        </section>
      ))}
    </Page>
  );
}

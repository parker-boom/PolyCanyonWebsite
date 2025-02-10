import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 30px;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #444;
`;

const Text = styled.p`
  line-height: 1.6;
  margin-bottom: 15px;
  color: #666;
`;

const ContactInfo = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
`;

function PrivacyPolicy() {
  return (
    <Container>
      <Title>Privacy Policy</Title>

      <Section>
        <Text>
          <strong>Effective Date:</strong> 07/09/24
          <br />
          <strong>Last Updated:</strong> 02/08/25
        </Text>
      </Section>

      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <Text>
          The <strong>Poly Canyon App</strong> (the &quot;App&quot;) respects
          your privacy. This Privacy Policy explains what data the App collects,
          how it is used, and your choices regarding that data. This policy
          applies to both our iOS and Android applications available on the
          Apple App Store and Google Play Store respectively.
        </Text>
      </Section>

      <Section>
        <SectionTitle>2. Information We Collect</SectionTitle>
        <Text>
          The App <strong>does not</strong> collect or store personally
          identifiable information. However, if you enable location services, we
          collect:
        </Text>
        <Text>
          <strong>Anonymous Location Data</strong> – If enabled, the App may
          collect location data while you are within the Poly Canyon area. This
          data is used solely for analyzing visitor movement patterns to suggest
          improvements to the College of Architecture and Environmental Design
          (CAED).
        </Text>
      </Section>

      <Section>
        <SectionTitle>3. How We Use Data</SectionTitle>
        <Text>The anonymous location data is used to:</Text>
        <ul>
          <li>Understand general visitor movement within Poly Canyon</li>
          <li>Improve navigation and app experience</li>
          <li>Provide insights to CAED for potential site improvements</li>
        </ul>
        <Text>
          The data is <strong>never</strong> linked to an individual and is only
          processed in aggregate.
        </Text>
      </Section>

      <Section>
        <SectionTitle>4. Data Sharing and Storage</SectionTitle>
        <Text>
          The App does <strong>not</strong> sell, share, or store any personal
          data. Location data is collected only when you are within Poly Canyon
          and is processed in an aggregated, anonymous format.
        </Text>
      </Section>

      <Section>
        <SectionTitle>5. Your Choices</SectionTitle>
        <Text>
          <ul>
            <li>
              Location tracking is <strong>optional</strong>. You can disable it
              at any time through your device settings.
            </li>
            <li>
              If disabled, the App will still function for navigation and
              structure information.
            </li>
          </ul>
        </Text>
      </Section>

      <Section>
        <SectionTitle>6. Data Security</SectionTitle>
        <Text>
          Since the App does not collect personal data, there is no risk of
          unauthorized access to personal information. All location data is
          anonymous and processed securely.
        </Text>
      </Section>

      <Section>
        <SectionTitle>7. Children&apos;s Privacy</SectionTitle>
        <Text>
          The App does not target children under 13 and does not collect
          personal data from any users.
        </Text>
      </Section>

      <Section>
        <SectionTitle>8. Changes to This Policy</SectionTitle>
        <Text>
          We may update this Privacy Policy. Any changes will be posted on this
          page with an updated <strong>Effective Date</strong>.
        </Text>
      </Section>

      <ContactInfo>
        <SectionTitle>Contact Us</SectionTitle>
        <Text>
          If you have any questions about this Privacy Policy, you can contact
          us at:
          <br />
          📧 pjones15@calpoly.edu
          <br />
          🌐 www.polycanyon.com
        </Text>
      </ContactInfo>
    </Container>
  );
}

export default PrivacyPolicy;

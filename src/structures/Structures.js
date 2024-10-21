/**
 * Work in progress...
 */

/*
Imports
*/

// Libraries
import React from 'react';
import { FaHardHat } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

// Styles
import {
  PageContainer,
  ContentContainer,
  ComingSoonContainer,
  ComingSoonTitle,
  ComingSoonText,
  ConstructionIcon,
} from './Structures.styles';

/*
Components & Renders
*/
const Structures = () => {
  return (
    <>
      <PageContainer>
        <ContentContainer>
          <ComingSoonContainer>
            <ConstructionIcon>
              <FaHardHat />
            </ConstructionIcon>
            <ComingSoonTitle>Under Construction</ComingSoonTitle>
            <ComingSoonText>
              Full information on structures coming soon!
            </ComingSoonText>
          </ComingSoonContainer>
        </ContentContainer>
      </PageContainer>

      {/* Meta Data */}
      <Helmet>
        <title>Explore the Poly Canyon Structures</title>
        <meta
          name="description"
          content="Learn the story behind each student-built structure, their origins, and significance. Explore how they came to be and their lasting impact."
        />
        <meta
          property="og:title"
          content="Explore the Poly Canyon Structures"
        />
        <meta
          property="og:description"
          content="Learn the story behind each student-built structure, their origins, and significance. Explore how they came to be and their lasting impact."
        />
        <meta
          property="og:image"
          content="https://polycanyon.com/sharePNG/ogstructures.png"
        />
        <meta property="og:url" content="https://polycanyon.com/structures" />
        <meta
          name="twitter:title"
          content="Explore the Poly Canyon Structures"
        />
        <meta
          name="twitter:description"
          content="Learn the story behind each student-built structure, their origins, and significance. Explore how they came to be and their lasting impact."
        />
        <meta
          name="twitter:image"
          content="https://polycanyon.com/sharePNG/twitstructures.png"
        />
      </Helmet>
      <div>Structures Page Content</div>
    </>
  );
};

// Used in Index.js
export default Structures;

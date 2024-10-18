/**
 * Work in progress...
 */




/*
Imports
*/

// Libraries
import React from 'react';
import { FaHardHat } from 'react-icons/fa';

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
  );
};

// Used in Index.js
export default Structures;

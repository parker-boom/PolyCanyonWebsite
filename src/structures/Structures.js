import React from 'react';
import { FaHardHat } from 'react-icons/fa';
import {
  PageContainer,
  ContentContainer,
  ComingSoonContainer,
  ComingSoonTitle,
  ComingSoonText,
  ConstructionIcon,
} from './Structures.styles';
import PhotoGrid from '../info/PhotoGrid';

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
          <PhotoGrid />
        </ComingSoonContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default Structures;

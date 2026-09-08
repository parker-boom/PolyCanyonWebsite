import React from 'react';
import styled from 'styled-components';
import Dialog from '../../components/Dialog.jsx';
import ContactLink from '../../components/ContactLink.jsx';
const Content = styled.div`
  h3 {
    font-size: 23px;
    margin-top: 28px;
  }
  ul {
    padding-left: 20px;
  }
  li {
    margin: 12px 0;
  }
`;
export default function ResearchInfo({ onClose }) {
  return (
    <Dialog open onClose={onClose} titleId="research-title">
      <Content>
        <h2 id="research-title">Research & sources</h2>
        <p>
          The research into the structures at Poly Canyon comes directly from
          historical records and archives: original theses, historical images,
          and articles. Available source documents are linked in the Resources
          section of each structure’s page.
        </p>
        <h3>With thanks</h3>
        <ul>
          <li>
            <strong>Danny Wills and his 4th Year Architecture Studio</strong>{' '}
            for their comprehensive compilation of historical resources.
          </li>
          <li>
            <strong>Jesse Vestermark</strong> for creating the Poly Canyon
            Research Guide and preserving access to original theses.
          </li>
          <li>
            <strong>CAED Department</strong> for their collective knowledge and
            ongoing contributions to documenting these structures.
          </li>
        </ul>
        <p>
          While all information is sourced from primary and official
          documentation, some details may be incomplete or subject to
          interpretation. This compilation offers a best effort representation
          of the history of these structures, but should not be considered
          definitive. To offer corrections or additional information,{' '}
          <ContactLink>contact Parker</ContactLink>.
        </p>
      </Content>
    </Dialog>
  );
}

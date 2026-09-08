import React from 'react';
import Dialog from '../../components/Dialog.jsx';
import ContactLink from '../../components/ContactLink.jsx';
export default function ResearchInfo({ onClose }) {
  return (
    <Dialog open onClose={onClose} titleId="research-title">
      <h2 id="research-title">Research & sources</h2>
      <p>
        The research into the structures at Poly Canyon comes from historical
        records and archives: original theses, historical photographs, articles,
        and official documentation. Available sources are linked on each
        structure’s page.
      </p>
      <h3>Credits</h3>
      <p>
        <strong>Danny Wills and his 4th Year Architecture Studio</strong>{' '}
        compiled a comprehensive collection of historical resources.
      </p>
      <p>
        <strong>Jesse Vestermark</strong> created the Poly Canyon Research Guide
        and preserved access to original theses.
      </p>
      <p>
        The <strong>CAED Department</strong> contributed its collective
        knowledge and ongoing work documenting these structures.
      </p>
      <p>
        Some details may be incomplete or subject to interpretation. This
        compilation is a best effort representation of the structures’ history,
        and should not be considered definitive. To offer corrections or
        additional information, <ContactLink>contact us</ContactLink>.
      </p>
    </Dialog>
  );
}

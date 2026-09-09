import React from 'react';
import Dialog from '../../components/Dialog.jsx';
import ContactLink from '../../components/ContactLink.jsx';
export default function ResearchInfo({ onClose }) {
  return (
    <Dialog open onClose={onClose} titleId="research-title">
      <h2 id="research-title">Research & sources</h2>
      <p>
        Each structure’s page links to available project reports, photographs,
        and historical records. Records are uneven and may describe an earlier
        condition of the site.
      </p>
      <p>
        Research draws on resources compiled by Danny Wills and his 4th Year
        Architecture Studio, Jesse Vestermark’s Poly Canyon Research Guide, and
        the CAED Department’s documentation.
      </p>
      <p>
        Have a correction or another source?{' '}
        <ContactLink>Get in touch</ContactLink>.
      </p>
    </Dialog>
  );
}

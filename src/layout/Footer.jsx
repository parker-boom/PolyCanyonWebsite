import ContactLink from '../components/ContactLink.jsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '../components/Dialog.jsx';
import styled from 'styled-components';

const Container = styled.footer`
  margin-top: auto;
  border-top: 1px solid #dce3d7;
  background: #f5f7f2;
  color: #53604f;
  font-size: 14px;
  line-height: 1.5;
  a,
  button {
    color: inherit;
    text-decoration: none;
    text-underline-offset: 4px;
  }
  a:hover,
  button:hover {
    color: var(--green);
    text-decoration: underline;
  }
`;
const Inner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 6px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px 18px;
  @media (max-width: 600px) {
    padding: 8px 18px;
    flex-wrap: wrap;
  }
`;
const Main = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px 14px;
  p {
    margin: 0;
    font-size: 12px;
  }
`;
const Brand = styled(Link)`
  font-weight: 650;
  color: var(--green);
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 20px;
  font-size: 12px;
  p {
    margin: 0;
  }
  div {
    display: flex;
    gap: 20px;
  }
  a,
  button {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
`;
const CopyrightLink = styled.button`
  border: 0;
  background: none;
  font: inherit;
  cursor: pointer;
`;

export default function Footer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Container>
        <Inner>
          <Main>
            <Brand to="/">Poly Canyon</Brand>
            <p>Built by Parker Jones</p>
          </Main>
          <Bottom>
            <p>© {new Date().getFullYear()} Poly Canyon</p>
            <div>
              <Link to="/privacy">Privacy</Link>
              <CopyrightLink
                type="button"
                aria-label="Copyright Disclaimer"
                aria-haspopup="dialog"
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                Copyright
              </CopyrightLink>
            </div>
          </Bottom>
        </Inner>
      </Container>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        titleId="copyright-title"
      >
        <h2 id="copyright-title">Copyright Disclaimer</h2>
        <p>
          The content featured on this site, including images and information,
          is curated solely for educational, archival, and non-commercial
          purposes to document and preserve the history and cultural
          significance of Poly Canyon.
        </p>
        <h3>Our approach to content</h3>
        <p>
          Wherever possible, we attribute sources and highlight the origins of
          the materials used. Photographs, documents, and resources are
          presented with context to support research and education.
        </p>
        <h3>Respect for copyright holders</h3>
        <p>
          If you own material featured here and would like to discuss its use or
          request removal, <ContactLink>contact us</ContactLink>.
        </p>
        <p>
          All content is provided for informational and educational purposes,
          with no intent to infringe on the rights of copyright holders.
        </p>
      </Dialog>
    </>
  );
}

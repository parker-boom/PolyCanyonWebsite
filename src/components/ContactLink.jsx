import React, { useId, useState } from 'react';
import styled from 'styled-components';
import Dialog from './Dialog.jsx';

import { contactEmail as email } from '../app/contact.js';
const Trigger = styled.button`
  background: none;
  border: 0;
  padding: 0;
  color: var(--green);
  font: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
`;
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 24px 0 16px;
  a,
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    border: 1px solid var(--green);
    border-radius: 3px;
    background: white;
    color: var(--green);
    font: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  a {
    background: var(--green);
    color: white;
  }
`;

export default function ContactLink({ children = 'Contact', className }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const titleId = useId();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('manual');
    }
  };
  return (
    <>
      <Trigger
        className={className}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setStatus('');
          setOpen(true);
        }}
      >
        {children}
      </Trigger>
      {open && (
        <Dialog open onClose={() => setOpen(false)} titleId={titleId}>
          <h2 id={titleId}>Contact Parker</h2>
          <p>
            Questions, corrections, or requests about material on the site are
            welcome.
          </p>
          <Actions>
            <a href={`mailto:${email}`}>Open email app</a>
            <button type="button" onClick={copy}>
              Copy email address
            </button>
          </Actions>
          <p role="status">
            {status === 'copied' ? (
              'Email address copied.'
            ) : status === 'manual' ? (
              <>
                Copy this address:{' '}
                <span style={{ userSelect: 'all' }}>{email}</span>
              </>
            ) : (
              'If an email app doesn’t open, copy the address into your usual email service.'
            )}
          </p>
        </Dialog>
      )}
    </>
  );
}

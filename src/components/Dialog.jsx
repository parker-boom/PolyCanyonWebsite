import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const Surface = styled.dialog`
  border: 1px solid #d4dfd2;
  border-radius: 4px;
  padding: 0;
  margin: auto;
  width: min(680px, calc(100vw - 32px));
  max-height: calc(100dvh - 40px);
  color: #29362b;
  background: #fff;
  box-shadow: none;
  &[open] {
    animation: detail-enter 160ms ease-out;
  }
  &::backdrop {
    background: #142c1b77;
  }
`;
const Body = styled.div`
  padding: 28px;
  line-height: 1.65;
  h2,
  h3 {
    color: var(--green);
    margin: 0 40px 16px 0;
  }
  p {
    margin: 0 0 16px;
  }
  a {
    color: var(--green);
  }
`;
const Close = styled.button`
  position: sticky;
  top: 12px;
  float: right;
  margin: 12px 12px -56px 0;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 2px;
  background: #e8efe8;
  color: var(--green);
  cursor: pointer;
  z-index: 1;
  &:hover {
    background: #dce5d8;
  }
`;

export default function Dialog({ open, onClose, titleId, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open) return;
    const previous = document.activeElement;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, [open]);
  return createPortal(
    <Surface
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === ref.current) onClose();
      }}
    >
      <Close onClick={onClose} aria-label="Close dialog">
        <FaTimes />
      </Close>
      <Body>{children}</Body>
    </Surface>,
    document.body
  );
}

import styled from 'styled-components';
export const DownloadButton = styled.a`
  && {
    color: white;
  }
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 50px;
  background: var(--green);
  border: 1px solid var(--green);
  border-radius: 3px;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  svg {
    font-size: 25px;
    flex-shrink: 0;
  }
  &:hover {
    background: #0e382b;
  }
  @media (max-width: 360px) {
    gap: 9px;
    padding: 12px 14px;
  }
`;
export const Phone = styled.div`
  position: relative;
  padding: 7px;
  background: #181b1a;
  border: 1px solid #68706b;
  border-radius: 42px;
  box-shadow: inset 0 0 0 2px #343b37;
  .display {
    overflow: hidden;
    border-radius: 34px;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: #454c47;
    border-radius: 2px;
    width: 3px;
  }
  &::before {
    left: -3px;
    top: 100px;
    height: 44px;
    box-shadow: 0 54px #454c47;
  }
  &::after {
    right: -3px;
    top: 150px;
    height: 66px;
  }
`;

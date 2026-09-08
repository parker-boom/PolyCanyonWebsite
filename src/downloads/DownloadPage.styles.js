import styled from 'styled-components';
export const PageContainer = styled.article`
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 48px 32px 64px;
  color: var(--ink);
  a {
    color: var(--green);
    text-underline-offset: 4px;
  }
  @media (max-width: 600px) {
    padding: 30px 20px 44px;
  }
`;
export const Introduction = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: start;
  p {
    font-size: 18px;
    line-height: 1.7;
    max-width: 410px;
    margin: 0 0 22px;
  }
  @media (min-width: 601px) and (max-width: 760px) {
    grid-template-columns: 1fr 1.2fr;
    gap: 32px;
    p {
      font-size: 17px;
    }
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
    p {
      font-size: 17px;
      margin-bottom: 20px;
    }
  }
`;
export const Copy = styled.div`
  min-width: 0;
  h1 {
    color: var(--green);
    font-size: clamp(34px, 4.2vw, 46px);
    line-height: 1.1;
    letter-spacing: -0.045em;
    font-weight: 600;
    margin: 0;
  }
`;
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
export const Screens = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 296px));
  justify-content: space-between;
  gap: 32px;
  margin: 46px 0 0;
  padding: 0 0 16px;
  figure {
    margin: 0;
    min-width: 0;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    background: #f7f5ec;
  }
  figcaption {
    margin: 20px 0 0;
    font-size: 15px;
    line-height: 1.5;
    text-align: center;
  }
  @media (max-width: 760px) {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    scrollbar-color: #aab8ad transparent;
    margin: 32px -20px 0;
    padding: 0 20px 16px;
    padding-right: max(20px, calc(100% - min(76vw, 280px)));
    scroll-padding: 20px;
    figure {
      flex: 0 0 min(76vw, 280px);
      scroll-snap-align: start;
    }
  }
`;
export const Notes = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 40px;
  margin: 32px 0 0;
  p {
    max-width: 620px;
    font-size: 15px;
    line-height: 1.8;
    margin: 0;
    color: var(--muted);
  }
  a {
    font-size: 14px;
    white-space: nowrap;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
  }
`;
export const Footnote = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 20px;
  border-top: 1px solid var(--line);
  margin-top: 36px;
  padding-top: 22px;
  font-size: 12px;
  line-height: 1.8;
  color: var(--muted);
  > span:last-child {
    display: flex;
    gap: 20px;
    flex-shrink: 0;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
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
export const ScreenControls = styled.nav`
  display: none;
  @media (max-width: 760px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 22px;
    margin-top: 6px;
    span {
      font-size: 13px;
      color: var(--muted);
      font-variant-numeric: tabular-nums;
    }
    button {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      padding: 0;
      background: none;
      color: var(--green);
      border: 1px solid var(--line);
      border-radius: 50%;
      cursor: pointer;
    }
    button:hover:not(:disabled) {
      background: #e9eee5;
    }
    button:disabled {
      opacity: 0.3;
      cursor: default;
    }
  }
`;

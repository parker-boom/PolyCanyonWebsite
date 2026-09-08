import styled from 'styled-components';

export const PageContainer = styled.article`
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 48px 32px 64px;
  box-sizing: border-box;
  color: #354139;
  a {
    color: #164b3b;
    text-underline-offset: 4px;
  }
  a:focus-visible {
    outline: 2px solid #926b1c;
    outline-offset: 5px;
  }
  @media (max-width: 600px) {
    padding: 30px 20px 44px;
  }
`;
export const Introduction = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  grid-template-areas: 'copy preview' 'details preview';
  gap: 0 72px;
  align-items: start;
  .app-details {
    grid-area: details;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'copy' 'preview' 'details';
    gap: 32px;
  }
`;
export const Copy = styled.div`
  grid-area: copy;
  min-width: 0;
  h1 {
    color: #164b3b;
    font-size: clamp(34px, 4.5vw, 50px);
    line-height: 1.1;
    letter-spacing: -0.045em;
    font-weight: 600;
    margin: 0 0 24px;
  }
  > p {
    font-size: 18px;
    line-height: 1.7;
    margin: 0 0 28px;
    max-width: 420px;
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
  background: #164b3b;
  border: 1px solid #164b3b;
  border-radius: 3px;
  padding: 12px 18px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  svg {
    font-size: 25px;
    flex: 0 0 auto;
  }
  &:hover {
    background: #0e382b;
  }
  @media (max-width: 360px) {
    gap: 9px;
    padding: 12px 14px;
  }
`;
export const Preview = styled.figure`
  grid-area: preview;
  align-self: center;
  margin: 0;
  display: flex;
  justify-content: center;
  min-width: 0;
  img {
    display: block;
    width: min(100%, 340px);
    height: auto;
    mix-blend-mode: multiply;
  }
  @media (max-width: 760px) {
    img {
      width: min(100%, 280px);
    }
  }
`;
export const Features = styled.div`
  margin-top: 32px;
  @media (max-width: 760px) {
    margin-top: 0;
  }
  section {
    border-top: 1px solid #dce2da;
    padding: 20px 0 0;
    margin-top: 20px;
  }
  h2 {
    margin: 0 0 8px;
    color: #164b3b;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.015em;
  }
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.8;
  }
`;
export const Footnote = styled.div`
  font-size: 12px;
  line-height: 1.8;
  color: #667267;
  margin-top: ${({ $footer }) => ($footer ? '48px' : '26px')};
  ${({ $footer }) => $footer && `border-top: 1px solid #dce2da; padding-top: 22px; display: flex; justify-content: space-between; gap: 20px; > span:last-child { display: flex; gap: 20px; flex-shrink: 0; }`}
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`;

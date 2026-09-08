import styled from 'styled-components';

export const PageContainer = styled.article`
  max-width: 1100px;
  margin: 0 auto;
  padding: 52px 40px 80px;
  color: #243f32;
  h1,
  h2 {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
  }
  h1 {
    font-size: clamp(38px, 5.2vw, 66px);
    line-height: 1.08;
    letter-spacing: -1.6px;
    margin: 0 0 28px;
  }
  h2 {
    font-size: 30px;
    line-height: 1.2;
    margin: 0 0 18px;
  }
  p {
    font-size: 17px;
    line-height: 1.8;
    margin: 0 0 24px;
  }
  a {
    text-underline-offset: 4px;
  }
  @media (max-width: 600px) {
    padding: 30px 20px 54px;
    p {
      font-size: 16px;
    }
  }
`;
export const Introduction = styled.header`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 70px;
  padding-bottom: 54px;
  > div > p {
    max-width: 420px;
    font-size: 20px;
    line-height: 1.65;
  }
  figure {
    margin: 0;
    background: #e9eddf;
    padding: 30px 24px;
    display: flex;
    justify-content: center;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding-bottom: 34px;
    figure {
      padding: 28px;
    }
  }
`;
export const Preview = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-height: 520px;
  max-width: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
  @media (max-width: 700px) {
    max-height: 440px;
  }
`;
export const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 52px;
  padding: 12px 18px;
  color: #f7f5ec;
  background: #243f32;
  text-decoration: none;
  font-size: 15px;
  box-sizing: border-box;
  svg {
    font-size: 25px;
    flex: 0 0 auto;
  }
  &:hover {
    background: #36523f;
  }
  &:focus-visible {
    outline: 3px solid #a17629;
    outline-offset: 4px;
  }
`;
export const UtilityLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 10px;
  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: 13px;
    color: #56634f;
  }
`;
export const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  border-top: 1px solid #c9cbbc;
  padding-top: 38px;
  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: #243f32;
    text-decoration-color: #a17629;
    font-size: 15px;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

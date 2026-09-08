import styled from 'styled-components';
export const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 0 60px;
  @media (max-width: 1280px) {
    margin: 0 40px;
  }
  @media (max-width: 700px) {
    margin: 0 20px;
    padding-top: 28px;
  }
`;
export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  margin-bottom: 32px;
  h1 {
    margin: 0;
    font-size: clamp(42px, 5vw, 64px);
    letter-spacing: -2px;
    line-height: 1.1;
  }
  @media (max-width: 700px) {
    flex-wrap: wrap;
    gap: 18px;
    margin-bottom: 24px;
  }
`;
export const Discovery = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  button {
    padding: 10px 0;
    border: 0;
    background: none;
    color: var(--green);
    font-size: 14px;
    cursor: pointer;
  }
  button:hover {
    text-decoration: underline;
    text-underline-offset: 5px;
  }
  span {
    margin-left: 8px;
    color: var(--gold);
  }
  @media (max-width: 520px) {
    gap: 16px;
  }
`;
export const Tools = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  margin-bottom: 44px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 26px;
  }
`;
export const Search = styled.label`
  display: flex;
  gap: 14px;
  align-items: center;
  border: 1px solid var(--rule);
  padding: 0 16px;
  width: min(430px, 100%);
  min-height: 50px;
  svg {
    font-size: 15px;
    flex-shrink: 0;
    color: var(--muted);
  }
  input {
    width: 100%;
    min-width: 0;
    border: 0;
    background: none;
    color: var(--ink);
    font-size: 16px;
    padding: 14px 0;
  }
  input:focus {
    outline: none;
  }
  &:focus-within {
    outline: 2px solid var(--gold);
    outline-offset: 3px;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;
export const Sort = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  font-size: 14px;
  > span {
    color: var(--muted);
  }
  button {
    border: 0;
    background: none;
    color: var(--muted);
    padding: 12px 0;
    cursor: pointer;
    min-height: 44px;
  }
  button[aria-pressed='true'] {
    color: var(--green);
    box-shadow: 0 1px var(--green);
  }
  button:hover {
    color: var(--gold);
  }
  button:last-child {
    font-size: 23px;
    min-width: 34px;
  }
  @media (max-width: 380px) {
    gap: 12px;
    font-size: 13px;
  }
`;
export const SectionHeader = styled.div`
  border-top: 1px solid var(--rule);
  margin-bottom: 24px;
  button {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 16px;
    border: 0;
    background: none;
    color: var(--green);
    padding: 20px 0 0;
    text-align: left;
    cursor: pointer;
  }
  h2 {
    margin: 0;
    font-size: 25px;
  }
  .count {
    color: var(--muted);
    font:
      14px ui-monospace,
      monospace;
  }
  button > span:last-child {
    margin-left: auto;
    font-size: 24px;
  }
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px 28px;
  margin-bottom: 52px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 20px;
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;
export const Card = styled.a`
  color: inherit;
  text-decoration: none;
  min-width: 0;
  &:hover h3 {
    text-decoration: underline;
    text-underline-offset: 5px;
  }
  &:hover img {
    transform: scale(1.02);
  }
`;
export const PhotoFrame = styled.div`
  position: relative;
  background: var(--surface);
  aspect-ratio: 4/5;
  overflow: hidden;
  img {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s;
  }
  img[hidden] {
    display: none;
  }
  .photo-fallback {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 24px;
    font: 24px var(--serif);
    color: var(--muted);
  }
  @media (max-width: 520px) {
    aspect-ratio: 1/1;
  }
`;
export const Caption = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: baseline;
  gap: 14px;
  padding-top: 14px;
  .number {
    font:
      14px ui-monospace,
      monospace;
    color: var(--gold);
  }
  h3 {
    font-size: 23px;
    line-height: 1.2;
    margin: 0;
  }
  p {
    margin: 8px 0 0;
    color: var(--muted);
    font-size: 13px;
  }
  .arrow {
    color: var(--gold);
  }
`;
export const Empty = styled.div`
  padding: 20px 0 50px;
  color: var(--muted);
  button {
    border: 0;
    background: none;
    color: var(--green);
    padding: 12px 0;
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const Research = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid var(--rule);
  padding-top: 24px;
  font-size: 14px;
  line-height: 1.6;
  p {
    color: var(--muted);
    margin: 0;
  }
  > button {
    border: 0;
    padding: 12px 0;
    background: none;
    cursor: pointer;
    color: var(--green);
    text-decoration: underline;
    text-underline-offset: 5px;
  }
`;

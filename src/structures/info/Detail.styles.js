import styled from 'styled-components';
export const Page = styled.article`
  max-width: 1240px;
  margin: 0 auto;
  padding: 28px 40px 80px;
  color: #213b32;
  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }
  button {
    font: inherit;
    cursor: pointer;
  }
  :where(button, a):focus-visible {
    outline: 3px solid #b58a32;
    outline-offset: 4px;
  }
  @media (max-width: 640px) {
    padding: 20px 20px 48px;
  }
`;
export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 44px;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid #dce2da;
  border-radius: 0;
  color: #164b3b;
  &:hover {
    background: #edf1e9;
    border-color: #849b8c;
  }
  &:active {
    background: #e0e8dd;
  }
`;
export const Topline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  > button {
    border-color: transparent;
    padding-left: 0;
    padding-right: 0;
  }
  > button:hover {
    background: transparent;
    border-color: transparent;
    text-decoration: underline;
    text-underline-offset: 5px;
  }
`;
export const Header = styled.header`
  display: flex;
  align-items: baseline;
  gap: 20px;
  margin-bottom: 30px;
  h1 {
    margin: 0;
    font-size: clamp(32px, 4.7vw, 58px);
    line-height: 1.05;
    letter-spacing: -0.045em;
    font-weight: 550;
    color: #164b3b;
    overflow-wrap: anywhere;
  }
  > span {
    color: #826322;
    font-size: 19px;
    font-variant-numeric: tabular-nums;
  }
  @media (max-width: 640px) {
    gap: 12px;
    margin-bottom: 24px;
  }
`;
export const Figure = styled.figure`
  margin: 0;
  min-width: 0;
`;
export const PhotoButton = styled.button`
  display: block;
  width: 100%;
  aspect-ratio: 4/3;
  max-height: 480px;
  border: 0;
  padding: 0;
  background: #e9ede5;
  cursor: zoom-in !important;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (max-width: 640px) {
    aspect-ratio: auto;
    height: 330px;
  }
`;
export const Caption = styled.figcaption`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 14px 0;
  font-size: 13px;
  line-height: 1.6;
  color: #536258;
  > span {
    flex: 1;
  }
  > div {
    display: flex;
    gap: 6px;
    align-items: center;
    flex-shrink: 0;
  }
  button {
    padding: 8px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
    > div {
      align-self: flex-end;
    }
  }
`;
export const Thumbnails = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0 12px;
  margin-bottom: 0;
  scrollbar-width: thin;
  button {
    width: 78px;
    height: 60px;
    flex-shrink: 0;
    border: 2px solid transparent;
    background: #e9ede5;
    padding: 3px;
  }
  button[aria-current='true'] {
    border-color: #164b3b;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(240px, 1fr);
  grid-template-areas: 'gallery facts' 'research facts';
  gap: 34px 56px;
  > .gallery {
    grid-area: gallery;
    min-width: 0;
  }
  > aside {
    grid-area: facts;
  }
  > div:not(.gallery) {
    grid-area: research;
  }
  @media (max-width: 900px) {
    gap: 30px;
  }
  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'gallery' 'research';
    gap: 28px;
  }
`;
export const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 80px;
  margin-top: 32px;
  @media (max-width: 900px) {
    gap: 35px;
    grid-template-columns: minmax(0, 1fr) 240px;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;
export const Research = styled.div`
  font-size: 17px;
  line-height: 1.75;
  overflow-wrap: anywhere;
  p {
    margin: 0 0 24px;
  }
  h2 {
    font-size: 22px;
    font-weight: 550;
    letter-spacing: -0.02em;
    margin: 36px 0 16px;
  }
  a {
    color: #164b3b;
    text-underline-offset: 4px;
  }
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
export const Facts = styled.aside`
  border-top: 1px solid #dce2da;
  min-width: 0;
  dl {
    margin: 0;
  }
  dl > div {
    padding: 18px 0;
    border-bottom: 1px solid #dce2da;
  }
  dt {
    font-size: 12px;
    color: #66756b;
    margin-bottom: 6px;
  }
  dd {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    overflow-wrap: anywhere;
  }
  > div {
    margin-top: 24px;
  }
  > div > div {
    border-radius: 0;
  }
  button {
    border-radius: 0;
  }
`;
export const Sources = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    border-top: 1px solid #dce2da;
  }
  a {
    display: block;
    padding: 13px 0;
    font-size: 15px;
  }
`;
export const Credits = styled.details`
  margin-top: 28px;
  padding: 18px 0;
  border-top: 1px solid #dce2da;
  font-size: 14px;
  line-height: 1.75;
  color: #536258;
  summary {
    cursor: pointer;
    color: #164b3b;
    padding: 4px 0;
  }
  p {
    margin-top: 15px;
  }
`;
export const BottomNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 55px;
  padding-top: 22px;
  border-top: 1px solid #dce2da;
`;
export const Viewer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5000;
  background: #101a15;
  color: #fff;
  display: flex;
  flex-direction: column;
  button {
    color: #fff;
    border-color: #617269;
    font: inherit;
    cursor: pointer;
  }
  button:hover {
    background: #34463b;
  }
  :where(button):focus-visible {
    outline: 3px solid #ddbc70;
    outline-offset: 3px;
  }
`;
export const ViewerBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 20px;
  flex-shrink: 0;
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  p {
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
    max-width: 900px;
  }
  @media (max-width: 540px) {
    padding: 12px;
    flex-wrap: wrap;
  }
`;
export const ViewerPhoto = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  align-items: ${(p) => (p.$zoom ? 'flex-start' : 'center')};
  touch-action: pan-x pan-y pinch-zoom;
  img {
    display: block;
    width: ${(p) => (p.$zoom ? '180%' : '100%')};
    height: ${(p) => (p.$zoom ? 'auto' : '100%')};
    flex-shrink: 0;
    max-width: none;
    object-fit: contain;
    cursor: ${(p) => (p.$zoom ? 'zoom-out' : 'zoom-in')};
  }
`;

export const Identity = styled.div`
  margin-bottom: 24px;
  color: #536258;
  font-size: 14px;
  line-height: 1.6;
  > div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: baseline;
  }
  a {
    white-space: nowrap;
    font-size: 13px;
  }
  p {
    margin: 6px 0 0;
    font-size: 13px;
  }
`;
export const Story = styled.div`
  max-width: 68ch;
  > p {
    margin: 0 0 24px;
  }
  > p:first-child {
    font-size: 18px;
    line-height: 1.7;
    color: #213b32;
  }
  @media (max-width: 700px) {
    > p:first-child {
      font-size: 17px;
      line-height: 1.75;
    }
  }
`;
export const SupportingPeople = styled.div`
  border-top: 1px solid #dce2da;
  margin-top: 36px;
  padding-top: 20px;
  dl {
    margin: 0;
  }
  dl > div + div {
    margin-top: 16px;
  }
  dt {
    font-size: 13px;
    color: #66756b;
    margin-bottom: 5px;
  }
  dd {
    margin: 0;
    font-size: 14px;
    line-height: 1.7;
  }
`;
export const Location = styled.div`
  margin-top: 32px;
  scroll-margin-top: 24px;
`;

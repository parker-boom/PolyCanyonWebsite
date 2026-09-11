import styled from 'styled-components';
export const Page = styled.article`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;
  padding: 24px 0 64px;
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
    width: calc(100% - 36px);
    padding: 20px 0 40px;
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
  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
  &:hover:not(:disabled) {
    background: #edf1e9;
    border-color: #849b8c;
  }
  &:active {
    background: #e0e8dd;
  }
`;
export const Topline = styled.div`
  @media (min-width: 701px) {
    .share {
      transform: translateY(
        calc(68px + (64px - clamp(30px, 3.2vw, 44px) * 1.05) / 2)
      );
    }
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  > button:first-child {
    border-color: transparent;
    padding-left: 0;
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
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 64px;
  margin-bottom: 16px;
  h1 {
    margin: 0;
    font-size: clamp(30px, 3.2vw, 44px);
    line-height: 1.05;
    letter-spacing: -0.045em;
    font-weight: 550;
    color: #164b3b;
    overflow-wrap: anywhere;
  }
  > span {
    color: #826322;
    font-size: 12px;
    font-variant-numeric: tabular-nums;
    padding: 0;
    border: 0;
    background: none;
    flex-shrink: 0;
  }
  @media (max-width: 640px) {
    gap: 12px;
    margin-bottom: 16px;
  }
`;
export const Figure = styled.figure`
  margin: 0;
  min-width: 0;
`;
export const Frame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 8 / 5;
  background: #e9ede5;
  @media (max-width: 700px) {
    aspect-ratio: 4 / 3;
  }
`;
export const PhotoButton = styled.button`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: zoom-in !important;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: photo-enter 180ms ease-out;
  }
  @keyframes photo-enter {
    from {
      opacity: 0.65;
    }
    to {
      opacity: 1;
    }
  }
`;
export const FrameControls = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  gap: 2px;
  background: #fafbf8f5;
  color: #164b3b;
  box-shadow: 0 1px 8px #14291d18;
  button {
    border: 0;
    min-width: 44px;
  }
  span {
    font-size: 12px;
    min-width: 38px;
    text-align: center;
  }
  @media (max-width: 700px) {
    right: 8px;
    bottom: 8px;
  }
`;
export const ExpandControl = styled(FrameControls)`
  right: auto;
  left: 12px;
  @media (max-width: 700px) {
    right: auto;
    left: 8px;
  }
`;
export const Thumbnails = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0 12px;
  margin-top: 14px;
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
  button:hover:not([aria-current='true']) {
    border-color: #b58a32;
    background: #f3ecd9;
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
  grid-template-columns: minmax(0, 760px) minmax(220px, 1fr);
  grid-template-areas: 'gallery facts' 'research facts';
  gap: 24px 48px;
  > .gallery {
    grid-area: gallery;
    min-width: 0;
  }
  > aside {
    grid-area: facts;
    align-self: start;
    margin-top: 80px;
  }
  > div:not(.gallery) {
    grid-area: research;
  }
  @media (max-width: 1000px) {
    gap: 24px 28px;
  }
  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'gallery' 'facts' 'research';
    gap: 22px;
    > aside {
      margin-top: 0;
    }
    > aside [data-fact='Builders'],
    > aside [data-fact='Advisors'] {
      display: none;
    }
    > aside dl {
      display: block;
    }
  }
`;
export const Research = styled.div`
  max-width: 70ch;
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
  [data-fact='Dates'] dd {
    font-size: 26px;
    font-weight: 600;
    line-height: 1.3;
    color: #164b3b;
  }
  [data-fact='Also known as'] dd {
    font-size: 19px;
    line-height: 1.45;
  }
  [data-fact='Builders'] dd,
  [data-fact='Advisors'] dd {
    font-size: 13px;
    line-height: 1.65;
    color: #000;
  }
  .historical {
    font-size: 13px;
    color: #66756b;
  }
  .map-link {
    display: inline-flex;
    gap: 18px;
    align-items: center;
    min-height: 44px;
    margin-top: 14px;
    color: #164b3b;
    font-size: 14px;
    text-underline-offset: 4px;
  }

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
  a:is(:hover, :focus-visible) {
    background: #f3ecd9;
  }
`;
export const BottomNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 55px;
  padding-top: 22px;
  border-top: 1px solid #dce2da;
  button {
    max-width: 48%;
    text-align: left;
    gap: 14px;
    line-height: 1.4;
  }
  small {
    display: block;
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 4px;
  }
`;
export const Viewer = styled.div`
  animation: detail-enter 160ms ease-out;
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
export const ViewerFooter = styled(ViewerBar)`
  display: grid;
  grid-template-columns: 1fr;
  align-items: end;
  padding-bottom: max(14px, env(safe-area-inset-bottom));
  > div {
    justify-self: center;
  }
  p {
    max-height: 25vh;
    overflow: auto;
  }
  @media (max-width: 540px) {
    grid-template-columns: minmax(0, 1fr);
    padding-bottom: max(12px, env(safe-area-inset-bottom));
  }
`;
export const ViewerPhoto = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  align-items: center;
  touch-action: pan-x pan-y pinch-zoom;
  img {
    display: block;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    max-width: none;
    object-fit: contain;
    cursor: default;
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
  dd {
    color: #000;
  }
  display: none;
  @media (max-width: 700px) {
    display: block;
  }
  &:has(dl:empty) {
    display: none;
  }
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
    font-size: 13px;
    line-height: 1.7;
  }
`;

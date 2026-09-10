import styled from 'styled-components';
export const Page = styled.div`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;
  padding: 28px 0 64px;
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    padding: 24px 0 40px;
  }
`;
export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
  margin-bottom: 28px;
  h1 {
    margin: 0 0 12px;
    font-size: clamp(34px, 4vw, 48px);
    letter-spacing: -0.045em;
    font-weight: 550;
  }
  p {
    margin: 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.6;
  }
  a {
    font-size: 14px;
    white-space: nowrap;
    text-underline-offset: 5px;
    padding: 12px 0;
  }
  @media (max-width: 600px) {
    display: block;
    a {
      display: inline-block;
      margin-top: 8px;
    }
  }
`;
export const Tools = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid #b8c4b9;
  background: #fff;
  margin-bottom: 26px;
  .search {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    flex: 1;
    min-width: 0;
  }
  .search svg {
    color: var(--muted);
    width: 14px;
    flex-shrink: 0;
  }
  input {
    width: 100%;
    min-width: 0;
    height: 50px;
    border: 0;
    background: none;
    color: var(--green);
    outline: none;
    font-size: 15px;
  }
  &:focus-within {
    outline: 2px solid var(--gold);
    outline-offset: 3px;
  }
  .random {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border: 0;
    background: none;
    color: var(--green);
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  .random svg {
    width: 20px;
    height: 20px;
  }
  .random:hover {
    background: #edf1e9;
  }
  .sort {
    border-left: 1px solid var(--line);
    padding: 0 10px;
  }
  select {
    height: 48px;
    border: 0;
    background: none;
    color: var(--green);
    font-size: 13px;
    max-width: 125px;
    cursor: pointer;
  }
  @media (max-width: 420px) {
    .search {
      padding: 0 10px;
      gap: 8px;
    }
    input {
      font-size: 14px;
    }
    .random {
      width: 40px;
    }
    .sort {
      padding: 0 4px;
    }
    select {
      max-width: 94px;
      font-size: 12px;
    }
  }
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 34px 26px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 20px;
  }
  @media (max-width: 600px) {
    gap: 26px 14px;
  }
`;
export const Item = styled.div`
  color: var(--green);
  text-decoration: none;
  min-width: 0;
  .photograph {
    position: relative;
    overflow: hidden;
    background: #e9eee5;
  }
  img {
    display: block;
    width: 100%;
    aspect-ratio: 1.3;
    object-fit: cover;
    transition: transform 0.35s ease;
  }
  .info {
    padding-top: 13px;
  }
  h3 {
    font-size: 20px;
    line-height: 1.25;
    margin: 0 0 6px;
    font-weight: 550;
    letter-spacing: -0.025em;
  }
  .year {
    font-size: 12px;
    color: var(--muted);
  }
  &:hover img {
    transform: scale(1.035);
  }
  &:hover h3 {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  &:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 6px;
  }
  @media (max-width: 600px) {
    h3 {
      font-size: 17px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
    }
    &:hover img {
      transform: none;
    }
  }
`;
export const Tail = styled.section`
  scroll-margin-top: 32px;
  h2 {
    margin: 0;
    font-size: 25px;
    font-weight: 550;
  }
  h2 button {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font: inherit;
    color: var(--green);
    background: none;
    border: 0;
    padding: 12px 0;
    cursor: pointer;
  }
  h2 button:hover {
    color: #846019;
  }
  h2 button:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 4px;
  }
  #historical-structures > p {
    margin: 6px 0 24px;
  }

  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-size: 14px;
  line-height: 1.6;
  a {
    display: inline-block;
    padding: 8px 0;
    text-underline-offset: 4px;
  }
  p {
    color: var(--muted);
    margin: 8px 0 0;
  }
`;

export const Empty = styled.div`
  padding: 44px 0 56px;
  h2 {
    font-size: 22px;
    font-weight: 550;
    margin: 0 0 12px;
  }
  p {
    color: var(--muted);
    line-height: 1.7;
  }
  button {
    border: 0;
    background: none;
    color: var(--green);
    padding: 12px 0;
    text-decoration: underline;
    text-underline-offset: 4px;
    cursor: pointer;
  }
`;

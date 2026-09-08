import styled from 'styled-components';
export const Page = styled.div`
  width: min(1120px, calc(100% - 80px));
  margin: 0 auto;
  padding: 48px 0 64px;
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    padding: 24px 0 40px;
  }
`;
export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  margin-bottom: 22px;
  h1 {
    font-size: clamp(36px, 4vw, 48px);
    font-weight: 600;
    letter-spacing: -1.8px;
    margin: 0;
    color: var(--green);
  }
  button {
    border: 0;
    background: none;
    color: var(--muted);
    text-decoration: underline;
    text-underline-offset: 4px;
    font-size: 13px;
    padding: 12px 0;
    cursor: pointer;
  }
  @media (max-width: 400px) {
    align-items: flex-start;
    gap: 12px;
    button {
      max-width: 90px;
      text-align: right;
      padding-top: 8px;
    }
  }
`;
export const Tools = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 12px;
  .search {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    border: 1px solid #aebdb2;
    background: #fff;
    flex: 1;
    min-width: 0;
  }
  .search:focus-within {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }
  .search svg {
    color: var(--muted);
    width: 16px;
    flex-shrink: 0;
  }
  input {
    background: none;
    border: 0;
    color: var(--ink);
    width: 100%;
    min-width: 0;
    height: 48px;
    outline: none;
  }
  input::placeholder {
    color: var(--muted);
  }
  .random {
    position: relative;
    flex-shrink: 0;
  }
  summary {
    list-style: none;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: var(--green);
    border: 1px solid var(--line);
    border-radius: 3px;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary svg {
    width: 22px;
    height: 22px;
  }
  summary:hover,
  details[open] summary {
    background: #e9eee5;
  }
  summary:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 3px;
  }
  .random-options {
    position: absolute;
    z-index: 10;
    right: 0;
    top: 56px;
    width: 140px;
    padding: 5px;
    background: var(--background, #fafbf8);
    border: 1px solid #aebdb2;
    border-radius: 3px;
  }
  button {
    display: block;
    width: 100%;
    background: none;
    border: 0;
    padding: 12px;
    text-align: left;
    cursor: pointer;
    font-size: 14px;
    color: var(--green);
  }
  button:hover,
  button:focus-visible {
    background: #e9eee5;
  }
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
export const SortBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 14px;
  margin-bottom: 16px;
  .sorting {
    display: flex;
    gap: 4px;
    align-items: center;
    flex-wrap: wrap;
  }
  .label {
    color: var(--muted);
    font-size: 13px;
    margin-right: 8px;
  }
  button {
    border: 0;
    background: none;
    padding: 10px 12px;
    color: var(--muted);
    font-size: 13px;
    cursor: pointer;
    min-height: 40px;
  }
  button[aria-pressed='true'] {
    color: var(--green);
    background: #e9eee5;
  }
  button:hover {
    color: var(--green);
    background: #eff2ec;
  }
  .count {
    font-size: 13px;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  @media (max-width: 450px) {
    gap: 8px;
    .label {
      display: none;
    }
    button {
      padding: 10px 9px;
    }
    .count {
      font-size: 12px;
    }
  }
  @media (max-width: 360px) {
    .sorting {
      gap: 0;
      flex-wrap: nowrap;
    }
    button {
      font-size: 12px;
      padding: 10px 7px;
    }
    .count {
      font-size: 11px;
    }
  }
`;
export const Section = styled.section`
  margin: 0 0 32px;
  .section-heading {
    display: flex;
    align-items: center;
    gap: 12px;
    border: 0;
    background: none;
    color: var(--green);
    padding: 0 0 14px;
    cursor: pointer;
    min-height: 44px;
  }
  h2 {
    font-weight: 550;
    font-size: 19px;
    margin: 0;
    letter-spacing: -0.3px;
  }
  .section-heading svg {
    font-size: 11px;
    transition: transform 0.2s;
  }
  .section-heading[aria-expanded='false'] svg {
    transform: rotate(-90deg);
  }
  .empty {
    padding: 28px 0;
    color: var(--muted);
    line-height: 1.7;
  }
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 40px;
  @media (max-width: 740px) {
    grid-template-columns: 1fr;
  }
`;
export const Item = styled.div`
  display: grid;
  grid-template-columns: 142px 1fr;
  align-items: center;
  gap: 20px;
  border-top: 1px solid var(--line);
  padding: 18px 0;
  text-decoration: none;
  color: var(--green);
  min-width: 0;
  img {
    display: block;
    width: 142px;
    height: 104px;
    object-fit: cover;
    background: #e9eee5;
    transition: filter 0.2s;
  }
  &:hover img {
    filter: brightness(1.06);
  }
  .info {
    min-width: 0;
  }
  .title {
    display: flex;
    gap: 10px;
    align-items: baseline;
  }
  .number {
    color: #876b2b;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
  h3 {
    font-size: 17px;
    font-weight: 550;
    letter-spacing: -0.3px;
    line-height: 1.4;
    margin: 0;
    overflow-wrap: anywhere;
  }
  .year {
    display: block;
    color: var(--muted);
    font-size: 13px;
    margin-top: 8px;
  }
  @media (max-width: 1000px) and (min-width: 741px) {
    grid-template-columns: 100px 1fr;
    gap: 14px;
    img {
      width: 100px;
      height: 88px;
    }
    .title {
      display: block;
    }
    .number {
      display: block;
      margin-bottom: 4px;
    }
  }
  @media (max-width: 420px) {
    grid-template-columns: 96px 1fr;
    gap: 12px;
    padding: 14px 0;
    img {
      width: 96px;
      height: 86px;
    }
    h3 {
      font-size: 15px;
    }
    .title {
      gap: 8px;
    }
    .year {
      font-size: 12px;
      margin-top: 5px;
    }
  }
`;
export const Contact = styled.p`
  border-top: 1px solid var(--line);
  padding-top: 24px;
  margin: 36px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
  a,
  button {
    color: var(--green);
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

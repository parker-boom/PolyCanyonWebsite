import React from 'react';
import styled from 'styled-components';
import MapEmbed from '../components/MapEmbed.jsx';
import dome from '../assets/generated/info/a1.webp';
import domeSmall from '../assets/generated/info/a1-800.webp';
import researchArchive from './researchArchive.html?raw';
import { intro, visit, history, project } from './articleContent.js';
const Page = styled.article`
  width: min(1040px, calc(100% - 80px));
  margin: 0 auto;
  padding: 28px 0 56px;
  color: var(--ink);
  figure {
    margin: 0 0 32px;
  }
  figure img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1.9;
    object-fit: cover;
  }
  figcaption {
    font-size: 12px;
    color: var(--muted);
    margin-top: 10px;
  }
  .reading {
    max-width: 700px;
    margin: 0 auto;
  }
  h1 {
    color: var(--green);
    font-size: clamp(34px, 4.2vw, 50px);
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.045em;
    margin: 0 0 24px;
  }
  h2 {
    color: var(--green);
    font-size: 27px;
    line-height: 1.25;
    font-weight: 550;
    letter-spacing: -0.03em;
    margin: 36px 0 18px;
  }
  p,
  li {
    font-size: 16px;
    line-height: 1.85;
  }
  p {
    margin: 0 0 20px;
  }
  li {
    padding-bottom: 10px;
  }
  a {
    color: var(--green);
    text-underline-offset: 4px;
  }
  .sources {
    font-size: 13px;
    color: var(--muted);
  }
  section {
    scroll-margin-top: 24px;
  }
  details {
    margin: 24px 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  summary {
    padding: 16px 0;
    cursor: pointer;
    color: var(--green);
    font-size: 14px;
    line-height: 1.5;
  }
  details[open] {
    padding-bottom: 16px;
  }
  details h1 {
    font-size: 28px;
    margin-top: 20px;
  }
  a:focus-visible,
  summary:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 4px;
  }
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    padding-top: 20px;
    figure img {
      aspect-ratio: 1.4;
    }
    p,
    li {
      font-size: 15px;
    }
  }
`;
export default function AboutPage() {
  return (
    <Page>
      <figure>
        <img
          src={domeSmall}
          srcSet={`${domeSmall} 800w, ${dome} 1600w`}
          sizes="(max-width:600px) calc(100vw - 36px), (max-width:1120px) calc(100vw - 80px), 1040px"
          width="1600"
          height="1067"
          alt="The Geodesic Dome’s open framework on a grassy slope in Poly Canyon"
          fetchPriority="high"
        />
        <figcaption>
          The Geodesic Dome, moved to Poly Canyon in 1963.
        </figcaption>
      </figure>
      <div className="reading">
        <h1>An outdoor construction laboratory</h1>
        <div dangerouslySetInnerHTML={{ __html: intro }} />
        <div dangerouslySetInnerHTML={{ __html: visit }} />
        <MapEmbed
          latitude={35.31344}
          longitude={-120.65192}
          title="Entry Arch destination map"
          height={300}
          directions
        />
        <div dangerouslySetInnerHTML={{ __html: history }} />
        <div dangerouslySetInnerHTML={{ __html: project }} />
        <details>
          <summary>Background notes &amp; original research</summary>
          <p>
            Preserved background from the earlier About article, including
            historical stewardship and regional climate notes.
          </p>
          <div dangerouslySetInnerHTML={{ __html: researchArchive }} />
        </details>
      </div>
    </Page>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  mainImages,
  thumbnailImages,
  getResponsiveImage,
} from '../structures/images/structureImages.js';
const features = [
  {
    number: 6,
    name: 'Tensile',
    url: 'tensile',
    text: 'Fabric panels and tensioned cables form an open-air shade structure.',
  },
  {
    number: 10,
    name: 'Underground House',
    url: 'undergroundHouse',
    text: 'An experiment in ferrocement construction and passive solar design.',
  },
  {
    number: 24,
    name: 'Shell House',
    url: 'shellHouse',
    text: 'A cantilevered concrete shell resting on three points.',
  },
  {
    number: 31,
    name: 'Moment Monument',
    url: 'momentMonument',
    text: 'Six steel frames demonstrate different seismic moment connections.',
  },
];
const Page = styled.div`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;
  padding: 40px 0 48px;
  .opening {
    display: grid;
    grid-template-columns: minmax(240px, 0.65fr) minmax(0, 1.35fr);
    gap: 58px;
    align-items: center;
  }
  .intro {
    padding-bottom: 60px;
  }
  .place {
    font-size: 12px;
    letter-spacing: 0.06em;
    color: var(--muted);
    margin: 0 0 18px;
  }
  h1 {
    font-size: clamp(42px, 5vw, 66px);
    line-height: 1.04;
    letter-spacing: -0.05em;
    font-weight: 550;
    color: var(--green);
    margin: 0 0 24px;
  }
  .intro p:not(.place) {
    font-size: 17px;
    line-height: 1.75;
    color: var(--muted);
    max-width: 330px;
    margin: 0 0 28px;
  }
  .explore {
    display: inline-flex;
    align-items: center;
    gap: 26px;
    min-height: 48px;
    padding: 12px 18px;
    background: var(--green);
    color: white;
    text-decoration: none;
    border-radius: 3px;
  }
  .explore:hover {
    background: #285c46;
  }
  .hero {
    display: block;
    position: relative;
    overflow: hidden;
    isolation: isolate;
    aspect-ratio: 1.65;
    background: #dce2da;
    color: white;
    text-decoration: none;
  }
  .hero img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: appear 0.3s ease;
  }
  .hero::after {
    content: '';
    position: absolute;
    inset: 40% 0 0;
    background: linear-gradient(transparent, #102c20e8);
    pointer-events: none;
  }
  .caption {
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 24px;
    z-index: 1;
  }
  .caption h2 {
    margin: 0 0 8px;
    font-size: 28px;
    letter-spacing: -0.025em;
    font-weight: 550;
  }
  .caption p {
    margin: 0;
    max-width: 460px;
    font-size: 14px;
    line-height: 1.55;
  }
  .hero:hover h2 {
    text-decoration: underline;
    text-underline-offset: 5px;
    text-decoration-thickness: 1px;
  }
  .choices {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 14px;
  }
  .choices button {
    padding: 0;
    border: 0;
    background: none;
    color: var(--green);
    text-align: left;
    cursor: pointer;
    font: inherit;
  }
  .choices img {
    width: 100%;
    height: 92px;
    object-fit: cover;
    display: block;
    transition: filter 0.2s;
  }
  .choices span {
    display: block;
    font-size: 12px;
    margin-top: 8px;
    line-height: 1.4;
  }
  .choices button:hover img {
    filter: brightness(1.12);
  }
  .entrances {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    margin-top: 44px;
    padding-top: 26px;
    border-top: 1px solid var(--line);
  }
  .entrances a {
    display: block;
    text-decoration: none;
    padding: 8px 0;
  }
  .entrances h2 {
    font-size: 21px;
    font-weight: 550;
    letter-spacing: -0.025em;
    margin: 0 0 8px;
  }
  .entrances p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
    max-width: 390px;
  }
  .entrances a:hover h2 {
    text-decoration: underline;
    text-underline-offset: 5px;
  }
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 5px;
  }
  @keyframes appear {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hero img {
      animation: none;
    }
    .choices img {
      transition: none;
    }
  }
  @media (max-width: 800px) {
    .opening {
      gap: 28px;
      grid-template-columns: 0.7fr 1.3fr;
    }
    h1 {
      font-size: 42px;
    }
    .intro p:not(.place) {
      font-size: 15px;
    }
    .caption {
      left: 18px;
      right: 18px;
      bottom: 18px;
    }
    .caption h2 {
      font-size: 24px;
    }
    .choices img {
      height: 74px;
    }
  }
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    padding: 26px 0 34px;
    .opening {
      display: block;
    }
    .intro {
      padding: 0 0 28px;
    }
    .place {
      margin-bottom: 12px;
    }
    h1 {
      font-size: 44px;
      margin-bottom: 16px;
    }
    .intro p:not(.place) {
      max-width: 100%;
      margin-bottom: 20px;
    }
    .hero {
      aspect-ratio: 1.18;
    }
    .choices {
      gap: 10px;
    }
    .choices img {
      height: 70px;
    }
    .entrances {
      gap: 22px;
      grid-template-columns: 1fr;
      margin-top: 30px;
      padding-top: 18px;
    }
    .entrances a {
      padding: 8px 0;
    }
  }
`;
export default function Home() {
  const [selection, setSelection] = useState({
    active: 0,
    alternatives: [1, 2, 3],
  });
  const feature = features[selection.active];
  const swap = (slot) =>
    setSelection((s) => ({
      active: s.alternatives[slot],
      alternatives: s.alternatives.map((n, i) => (i === slot ? s.active : n)),
    }));
  return (
    <Page>
      <div className="opening">
        <div className="intro">
          <p className="place">Cal Poly · San Luis Obispo</p>
          <h1>Poly Canyon</h1>
          <p>
            A hillside of student-built structures. Explore the designs, the
            people who built them, and the paths between.
          </p>
          <Link className="explore" to="/structures">
            Explore the structures <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div>
          <Link
            className="hero"
            to={`/structures/${feature.url}`}
            aria-label={`Read about ${feature.name}`}
          >
            <img
              key={feature.number}
              {...getResponsiveImage(
                mainImages[`M-${feature.number}`],
                '(max-width:600px) calc(100vw - 36px), (max-width:1320px) 60vw, 800px'
              )}
              width="1080"
              height="720"
              alt={feature.name}
              fetchPriority="high"
            />
            <div className="caption" aria-live="polite">
              <h2>{feature.name}</h2>
              <p>{feature.text}</p>
            </div>
          </Link>
          <div
            className="choices"
            role="group"
            aria-label="More structures to explore"
          >
            {selection.alternatives.map((n, slot) => (
              <button
                key={slot}
                onClick={() => swap(slot)}
                aria-label={`Feature ${features[n].name}`}
              >
                <img
                  {...getResponsiveImage(
                    thumbnailImages[`M-${features[n].number}`],
                    '(max-width:600px) 30vw, 240px'
                  )}
                  width="480"
                  height="320"
                  alt=""
                />
                <span>{features[n].name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="entrances">
        <Link to="/about">
          <h2>The canyon, then and now</h2>
          <p>
            How an outdoor laboratory grew—and what to know before walking up
            from campus.
          </p>
        </Link>
        <Link to="/app">
          <h2>A guide for your own visit</h2>
          <p>
            Find your way with the illustrated map, or explore the photo Tour
            from wherever you are.
          </p>
        </Link>
      </div>
    </Page>
  );
}

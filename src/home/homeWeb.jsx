import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { features } from './features.js';
import hero6Small from '../assets/generated/home/M-6-800.webp';
import hero6Large from '../assets/generated/home/M-6-1600.webp';
import hero10Small from '../assets/generated/home/M-10-800.webp';
import hero10Large from '../assets/generated/home/M-10-1600.webp';
import hero24Small from '../assets/generated/home/M-24-800.webp';
import hero24Large from '../assets/generated/home/M-24-1600.webp';
import hero31Small from '../assets/generated/home/M-31-800.webp';
import hero31Large from '../assets/generated/home/M-31-1600.webp';
const heroImages = {
  6: [hero6Small, hero6Large],
  10: [hero10Small, hero10Large],
  24: [hero24Small, hero24Large],
  31: [hero31Small, hero31Large],
};
// A page visit gets one choice; route changes and Back retain subsequent swaps.
const initialFeature = Math.floor(Math.random() * features.length);
let visitSelection = {
  active: initialFeature,
  alternatives: features.map((_, i) => i).filter((i) => i !== initialFeature),
};
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
    padding-bottom: 0;
  }
  h1 {
    font-size: clamp(38px, 4vw, 56px);
    line-height: 1.04;
    letter-spacing: -0.05em;
    font-weight: 550;
    color: var(--green);
    margin: 0 0 24px;
  }
  .intro p {
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
  }
  .hero.changed img {
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
  .choices button:hover img {
    filter: brightness(1.12);
  }
  .entrances {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin-top: 36px;
    padding-top: 26px;
    border-top: 1px solid var(--line);
  }
  .entrances a {
    display: block;
    text-decoration: none;
    padding: 18px 48px 18px 20px;
    position: relative;
    background: #f0f3ec;
    border: 1px solid #dce3d7;
    border-radius: 3px;
    transition: background 160ms ease, border-color 160ms ease;
  }
  .entrances a::after {
    content: '→';
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    color: var(--green);
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
  .entrances a:hover,
  .entrances a:focus-visible {
    background: #f3ecd9;
    border-color: #bda46a;
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
    .hero.changed img {
      animation: none;
    }
    .choices img,
    .entrances a {
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
    .intro p {
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
    h1 {
      font-size: 44px;
      margin-bottom: 16px;
    }
    .intro p {
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

  }
`;
export default function Home() {
  const [selection, setSelection] = useState(visitSelection);
  const [changed, setChanged] = useState(false);
  const feature = features[selection.active];
  const swap = (slot) => {
    visitSelection = {
      active: selection.alternatives[slot],
      alternatives: selection.alternatives.map((n, i) =>
        i === slot ? selection.active : n
      ),
    };
    setChanged(true);
    setSelection(visitSelection);
  };
  return (
    <Page>
      <div className="opening">
        <div className="intro">
          <h1>An outdoor architecture lab</h1>
          <p>
            Student-built structures at Cal Poly, from experiments in the
            1960s to the projects standing today.
          </p>
          <Link className="explore" to="/structures">
            Browse the archive <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div>
          <Link
            className={`hero${changed ? ' changed' : ''}`}
            to={`/structures/${feature.url}`}
            aria-label={`Read about ${feature.name}`}
          >
            <img
              key={feature.number}
              src={heroImages[feature.number][1]}
              srcSet={`${heroImages[feature.number][0]} 800w, ${heroImages[feature.number][1]} 1600w`}
              sizes="(max-width:600px) calc(100vw - 36px), (max-width:1320px) 60vw, 800px"
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
                  src={heroImages[features[n].number][0]}
                  width="480"
                  height="320"
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="entrances">
        <Link to="/about">
          <h2>Learn about the canyon</h2>
          <p>Its history and how to visit.</p>
        </Link>
        <Link to="/app">
          <h2>Download the app</h2>
          <p>A walking map and virtual tour for iPhone.</p>
        </Link>
      </div>
    </Page>
  );
}

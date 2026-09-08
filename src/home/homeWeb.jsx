import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  thumbnailImages,
  getResponsiveImage,
} from '../structures/images/structureImages.js';
import shell from '../assets/generated/home/M-24-1600.webp';
import shellSmall from '../assets/generated/home/M-24-800.webp';
import dome from '../assets/generated/home/M-7-1600.webp';
import domeSmall from '../assets/generated/home/M-7-800.webp';
import bridge from '../assets/generated/home/M-16-1600.webp';
import bridgeSmall from '../assets/generated/home/M-16-800.webp';
export const features = [
  {
    number: 24,
    name: 'Shell House',
    url: 'shellHouse',
    large: shell,
    small: shellSmall,
    text: 'A cantilevered concrete shell resting on three points, conceived as a senior project in 1964.',
  },
  {
    number: 7,
    name: 'Geodesic Dome',
    url: 'geodesicDome',
    large: dome,
    small: domeSmall,
    text: 'Built by students in 1957, the dome was moved piece by piece to the canyon in 1963.',
  },
  {
    number: 16,
    name: 'Bridge House',
    url: 'bridgeHouse',
    large: bridge,
    small: bridgeSmall,
    text: 'An experiment in Cor-ten steel that spans the terrain, restored as a bridge in 2019.',
  },
];
const Page = styled.div`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;
  padding: 28px 0 40px;
  header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 22px;
  }
  h1 {
    margin: 0;
    color: var(--green);
    font-size: clamp(30px, 4vw, 48px);
    font-weight: 600;
    letter-spacing: -0.045em;
  }
  header a {
    padding: 12px 0;
    font-size: 14px;
    text-underline-offset: 5px;
  }
  .hero {
    display: block;
    position: relative;
    isolation: isolate;
    aspect-ratio: 2.1;
    color: white;
    overflow: hidden;
    background: #233c32;
    box-shadow: 0 12px 24px -20px #183326;
  }
  .hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    animation: reveal 0.35s ease-out;
  }
  .hero::after {
    content: '';
    position: absolute;
    inset: 30% 0 0;
    background: linear-gradient(transparent, rgba(10, 25, 16, 0.9));
    z-index: 1;
    pointer-events: none;
  }
  .caption {
    position: absolute;
    left: 32px;
    right: 32px;
    bottom: 26px;
    z-index: 2;
  }
  .caption span {
    font-size: 12px;
    letter-spacing: 0.06em;
    color: #e4e9dc;
  }
  h2 {
    margin: 7px 0 10px;
    font-size: clamp(27px, 3.3vw, 44px);
    letter-spacing: -0.035em;
    font-weight: 550;
  }
  .caption p {
    margin: 0;
    max-width: 570px;
    font-size: 15px;
    line-height: 1.55;
  }
  .choices {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    padding: 20px 0 26px;
  }
  button {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background: none;
    color: var(--muted);
    border: 0;
    border-bottom: 2px solid transparent;
    padding: 0 0 10px;
    cursor: pointer;
    text-align: left;
    font: inherit;
  }
  button img {
    width: 100%;
    height: 110px;
    object-fit: cover;
    display: block;
    margin-bottom: 10px;
  }
  button[aria-pressed='true'] {
    border-color: var(--gold);
    color: var(--green);
  }
  button:hover img {
    filter: brightness(1.08);
  }
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 5px;
  }
  .links {
    border-top: 1px solid var(--line);
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    padding-top: 16px;
  }
  .links a {
    padding: 12px 0;
    text-underline-offset: 5px;
  }
  @keyframes reveal {
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
  }
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    padding-top: 20px;
    header {
      display: block;
      margin-bottom: 16px;
    }
    header a {
      display: inline-block;
    }
    .hero {
      aspect-ratio: 0.95;
    }
    .caption {
      left: 20px;
      right: 20px;
      bottom: 22px;
    }
    .caption p {
      font-size: 14px;
    }
    .choices {
      gap: 12px;
      padding-top: 14px;
    }
    button {
      font-size: 12px;
      line-height: 1.4;
    }
    button img {
      height: 72px;
    }
    .links {
      gap: 6px 26px;
      font-size: 14px;
    }
  }
`;
export default function Home() {
  const [active, setActive] = useState(0);
  const current = features[active];
  return (
    <Page>
      <header>
        <h1>Built to explore.</h1>
        <Link to="/structures">Explore the structures</Link>
      </header>
      <Link
        className="hero"
        to={`/structures/${current.url}`}
        aria-label={`Read about ${current.name}`}
      >
        <img
          key={current.number}
          src={current.small}
          srcSet={`${current.small} 800w, ${current.large} 1600w`}
          sizes="(max-width:600px) calc(100vw - 36px), (max-width:1320px) calc(100vw - 80px), 1240px"
          width="1600"
          height={current.number === 7 ? 1200 : 1067}
          alt={current.name}
          fetchPriority="high"
        />
        <div className="caption" aria-live="polite">
          <span>No. {current.number}</span>
          <h2>{current.name}</h2>
          <p>{current.text}</p>
        </div>
      </Link>
      <div
        className="choices"
        role="group"
        aria-label="Choose a featured structure"
      >
        {features.map((feature, i) => (
          <button
            key={feature.number}
            aria-label={`Show ${feature.name}`}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <img
              {...getResponsiveImage(
                thumbnailImages[`M-${feature.number}`],
                '(max-width:600px) 30vw, 390px'
              )}
              alt=""
              width="480"
              height="320"
            />
            {feature.name}
          </button>
        ))}
      </div>
      <div className="links">
        <Link to="/about">Learn about the canyon</Link>
        <Link to="/app">Download the app</Link>
      </div>
    </Page>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { FaApple } from 'react-icons/fa';
import styled from 'styled-components';
import { Phone, DownloadButton } from './DownloadPage.styles.js';
import map360 from '../assets/generated/app/second-pass/map-360.webp';
import map720 from '../assets/generated/app/second-pass/map-720.webp';
import collection360 from '../assets/generated/app/second-pass/collection-360.webp';
import collection720 from '../assets/generated/app/second-pass/collection-720.webp';
import tour360 from '../assets/generated/app/second-pass/tour-360.webp';
import tour720 from '../assets/generated/app/second-pass/tour-720.webp';
const features = [
  {
    name: 'On foot',
    title: 'Find your way through the canyon.',
    text: 'Follow the illustrated paths and locate the structures as you explore.',
    small: map360,
    large: map720,
    alt: 'The app’s illustrated map of Poly Canyon and its numbered structures',
  },
  {
    name: 'Structures',
    title: 'Look closer at what you find.',
    text: 'Open a structure’s photographs and story, and connect a design with the people who built it.',
    small: collection360,
    large: collection720,
    alt: 'The photographic structure collection in the Poly Canyon app',
  },
  {
    name: 'Tour',
    title: 'Explore from wherever you are.',
    text: 'Move through the structures in photographs. Each stop connects back to its place on the canyon map.',
    small: tour360,
    large: tour720,
    alt: 'The photo-led Tour showing Palm Tree and its location on the map',
  },
];
const Page = styled.article`
  width: min(1040px, calc(100% - 80px));
  margin: 0 auto;
  padding: 38px 0 44px;
  .layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 120px;
    align-items: center;
  }
  h1 {
    font-size: clamp(36px, 4vw, 48px);
    font-weight: 550;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin: 0 0 22px;
    color: var(--green);
  }
  .intro {
    font-size: 17px;
    line-height: 1.75;
    color: var(--muted);
    margin: 0 0 26px;
    max-width: 430px;
  }
  .choices {
    display: flex;
    gap: 8px;
    margin: 36px 0 22px;
    border-bottom: 1px solid var(--line);
  }
  .choices button {
    font: inherit;
    font-size: 14px;
    padding: 12px 14px;
    min-height: 44px;
    color: var(--muted);
    border: 0;
    border-bottom: 2px solid transparent;
    background: none;
    cursor: pointer;
  }
  .choices button[aria-pressed='true'] {
    color: var(--green);
    border-bottom-color: var(--gold);
  }
  .choices button:hover {
    background: #edf1e9;
  }
  h2 {
    font-size: 24px;
    line-height: 1.25;
    font-weight: 550;
    letter-spacing: -0.025em;
    margin: 0 0 12px;
    color: var(--green);
  }
  .feature-copy {
    min-height: 138px;
  }
  .feature-copy p {
    font-size: 15px;
    color: var(--muted);
    line-height: 1.75;
    margin: 0;
    max-width: 380px;
  }
  .device {
    width: 300px;
    margin: 0 auto;
  }
  .screen-window {
    overflow: hidden;
  }
  .strip {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }
  .strip::-webkit-scrollbar {
    display: none;
  }
  .strip img {
    width: 100%;
    height: auto;
    display: block;
    flex: 0 0 100%;
    min-width: 0;
    scroll-snap-align: start;
  }
  button:focus-visible,
  a:focus-visible,
  .strip:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 4px;
  }
  @media (max-width: 900px) {
    .layout {
      gap: 50px;
      grid-template-columns: 1fr 300px;
    }
    .device {
      width: 280px;
    }
  }
  @media (max-width: 650px) {
    width: calc(100% - 36px);
    padding-top: 28px;
    .layout {
      display: block;
    }
    h1 {
      font-size: 36px;
    }
    .intro {
      font-size: 16px;
    }
    .choices {
      margin-top: 28px;
    }
    .feature-copy {
      min-height: 0;
    }
    h2 {
      font-size: 22px;
    }
    .feature-copy h2 {
      display: none;
    }
    .feature-copy p {
      font-size: 14px;
      line-height: 1.6;
    }
    .device {
      width: min(280px, calc(100vw - 72px));
      margin-top: 24px;
    }
  }
`;
export default function DownloadPage() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const scrollTimer = useRef(null);
  useEffect(() => () => clearTimeout(scrollTimer.current), []);
  const move = (index) => {
    if (index < 0 || index >= features.length) return;
    clearTimeout(scrollTimer.current);
    setActive(index);
    ref.current.scrollTo({
      left: ref.current.clientWidth * index,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };
  return (
    <Page>
      <div className="layout">
        <div>
          <h1>
            Poly Canyon
            <br />
            for iPhone
          </h1>
          <p className="intro">
            Explore the canyon on foot, or take a photo tour from anywhere.
          </p>
          <DownloadButton
            href="https://apps.apple.com/us/app/poly-canyon/id6499063781"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaApple aria-hidden="true" />
            Download on the App Store
          </DownloadButton>
          <div
            className="choices"
            role="group"
            aria-label="Explore app features"
          >
            {features.map((f, i) => (
              <button
                key={f.name}
                aria-pressed={active === i}
                onClick={() => move(i)}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="feature-copy" aria-live="polite">
            <h2>{features[active].title}</h2>
            <p>{features[active].text}</p>
          </div>
        </div>
        <div className="device">
          <Phone>
            <div className="display screen-window">
              <div
                className="strip"
                ref={ref}
                role="region"
                aria-label="App screens"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                    event.preventDefault();
                    move(active + (event.key === 'ArrowRight' ? 1 : -1));
                  }
                }}
                onScroll={() => {
                  clearTimeout(scrollTimer.current);
                  // Keep the chosen caption steady while the phone travels.
                  // A manual swipe updates the caption after settling as well.
                  scrollTimer.current = setTimeout(() => {
                    if (!ref.current) return;
                    setActive(
                      Math.min(
                        features.length - 1,
                        Math.max(
                          0,
                          Math.round(
                            ref.current.scrollLeft / ref.current.clientWidth
                          )
                        )
                      )
                    );
                  }, 160);
                }}
              >
                {features.map((f, i) => (
                  <img
                    key={f.name}
                    src={f.small}
                    srcSet={`${f.small} 360w, ${f.large} 720w`}
                    sizes="300px"
                    width="1320"
                    height="2868"
                    alt={f.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
            </div>
          </Phone>
        </div>
      </div>
    </Page>
  );
}

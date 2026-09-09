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
    label: 'Explore on foot',
    text: 'Use the walking map to find paths and locate the structures.',
    small: map360,
    large: map720,
    alt: 'The app’s illustrated map of Poly Canyon and its numbered structures',
  },
  {
    name: 'Structures',
    label: 'Learn about the structures',
    text: 'Read each structure’s history and see photographs of its design and construction.',
    small: collection360,
    large: collection720,
    alt: 'The photographic structure collection in the Poly Canyon app',
  },
  {
    name: 'Virtual tour',
    label: 'Take a virtual tour',
    text: 'Browse the structures in a photo tour and see where each one sits on the map.',
    small: tour360,
    large: tour720,
    alt: 'The photo-led Tour showing Palm Tree and its location on the map',
  },
];
const featureDescriptions = [
  'Find paths and structures on the illustrated map.',
  'See who built each structure and how it was made.',
  'Explore the structures through photographs and the map.',
];
const Page = styled.article`
  width: min(1120px, calc(100% - 80px));
  margin: 30px auto;
  padding: 46px;
  background: #f3ecd9;
  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 330px;
    gap: 54px;
    align-items: center;
  }
  h1 {
    font-size: clamp(38px, 4.2vw, 56px);
    font-weight: 550;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin: 0 0 16px;
    color: var(--green);
  }
  .intro {
    font-size: 18px;
    line-height: 1.65;
    color: var(--muted);
    margin: 0 0 24px;
    max-width: 390px;
  }
  .showcase {
    background: #d6dfcf;
    padding: 24px 12px;
    border-radius: 160px 160px 8px 8px;
  }
  .choices {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 32px 0 12px;
  }
  .choices button {
    font: inherit;
    font-size: 14px;
    line-height: 1.4;
    padding: 10px 15px;
    white-space: nowrap;
    min-height: 44px;
    color: var(--green);
    border: 1px solid #97a78d;
    border-radius: 24px;
    background: transparent;
    cursor: pointer;
    transition:
      background 160ms ease,
      color 160ms ease;
  }
  .choices button[aria-pressed='true'] {
    color: white;
    background: var(--green);
    border-color: var(--green);
  }
  .choices button:hover {
    background: #e3dfcc;
  }
  .choices button[aria-pressed='true']:hover {
    background: #0e382b;
  }
  .feature-copy {
    min-height: 60px;
    margin-top: 18px;
    max-width: 350px;
  }
  .feature-copy p {
    font-size: 16px;
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }
  .device {
    width: 240px;
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
  @media (max-width: 1000px) {
    .layout {
      grid-template-columns: minmax(0, 1fr) 280px;
      gap: 32px;
    }
  }
  @media (max-width: 760px) {
    width: calc(100% - 36px);
    padding: 24px 20px;
    margin: 18px auto;
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
      gap: 6px;
    }
    .choices button {
      padding: 9px 10px;
      font-size: 13px;
    }
    .showcase {
      margin-top: 24px;
      padding: 20px 8px;
    }
    .device {
      width: min(260px, 100%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .choices button {
      transition: none;
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
            Your interactive guide to everything the canyon has to offer.
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
                aria-label={f.label}
                aria-pressed={active === i}
                onClick={() => move(i)}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="feature-copy" aria-live="polite">
            <p>{featureDescriptions[active]}</p>
          </div>
        </div>
        <div className="showcase">
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
                    if (
                      event.key === 'ArrowRight' ||
                      event.key === 'ArrowLeft'
                    ) {
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
      </div>
    </Page>
  );
}

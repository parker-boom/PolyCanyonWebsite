import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaApple } from 'react-icons/fa';
import styled from 'styled-components';
import placeholders from './preview-placeholders.js';
import { Phone, DownloadButton } from './DownloadPage.styles.js';
const features = [
  {
    name: 'Explore',
    label: 'Explore on foot',
    file: 'explore',
    alt: 'Following the satellite map, discovering Underground House, and opening its story',
  },
  {
    name: 'Learn',
    label: 'Learn about the structures',
    file: 'learn',
    alt: 'Scrolling the collection, opening Bridge House, reading its story, and swiping to Pyramid',
  },
  {
    name: 'Tour',
    label: 'Take a virtual tour',
    file: 'tour',
    alt: 'Swiping through the virtual tour, opening Tensegrity, and continuing to browse',
  },
];
const featureDescriptions = [
  'Navigate the canyon, discover its structures, and track your progress as you explore.',
  'Discover who built each structure, how it was made, and the history behind its design.',
  'Take a virtual walk through the canyon, exploring its structures and their surroundings.',
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
    align-items: stretch;
  }
  .copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .download {
    margin-top: auto;
  }
  h1 {
    font-size: clamp(38px, 4.2vw, 56px);
    font-weight: 550;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin: 0 0 16px;
    color: var(--green);
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
    margin: 12px 0 0;
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
    position: relative;
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
  .screen {
    position: relative;
    flex: 0 0 100%;
    min-width: 0;
    aspect-ratio: 110 / 239;
    scroll-snap-align: start;
    background-size: cover;
    background-position: center;
  }
  .screen video,
  .screen img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  .screen video {
    opacity: 0;
    transition: opacity 120ms ease-out;
  }
  .screen video[data-ready='true'] {
    opacity: 1;
  }
  .buffering {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    padding: 7px 12px;
    border-radius: 16px;
    background: #fafbf8ed;
    color: var(--green);
    font-size: 12px;
    pointer-events: none;
  }
  .strip video {
    cursor: pointer;
  }
  button:focus-visible,
  a:focus-visible,
  video:focus-visible,
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
      order: -2;
    }
    .download {
      order: -1;
      margin: 8px 0 12px;
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
export default function DownloadPage({ isActive = true }) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const videos = useRef([]);
  const scrollTimer = useRef(null);
  const [paused, setPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [ready, setReady] = useState({});
  const [failed, setFailed] = useState({});
  const [buffering, setBuffering] = useState({ 0: true });
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPaused(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    let cancelled = false;
    const sync = () =>
      videos.current.forEach((video, index) => {
        if (!video) return;
        if (!isActive || index !== active || paused || document.hidden) {
          video.pause();
          if (index !== active) video.currentTime = 0;
        } else {
          video.play().catch((error) => {
            if (!cancelled && error.name !== 'AbortError') setPaused(true);
          });
        }
      });
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', sync);
    };
  }, [active, paused, isActive]);
  useLayoutEffect(() => {
    clearTimeout(scrollTimer.current);
    if (isActive && ref.current)
      ref.current.scrollLeft = ref.current.clientWidth * active;
  }, [isActive]);
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
        <div className="copy">
          <h1>
            Poly Canyon
            <br />
            for iPhone
          </h1>
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
          <DownloadButton
            className="download"
            href="https://apps.apple.com/us/app/poly-canyon/id6499063781"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaApple aria-hidden="true" />
            Download on the App Store
          </DownloadButton>
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
                    if (!isActive || !ref.current?.clientWidth) return;
                    clearTimeout(scrollTimer.current);
                    // Keep the chosen caption steady while the phone travels.
                    // A manual swipe updates the caption after settling as well.
                    scrollTimer.current = setTimeout(() => {
                      if (!ref.current?.clientWidth) return;
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
                    <div
                      className="screen"
                      key={f.name}
                      style={{
                        backgroundImage: `url(${placeholders[f.file]})`,
                      }}
                      aria-hidden={active !== i}
                    >
                      <img
                        src={`/media/app-tap-only/${f.file}-poster.webp`}
                        width="480"
                        height="1043"
                        alt={f.alt}
                        aria-hidden={!!ready[i] && !failed[i]}
                        onError={(event) => {
                          event.currentTarget.style.visibility = 'hidden';
                        }}
                        fetchPriority={i === 0 ? 'high' : 'low'}
                      />
                      {!failed[i] && (
                        <video
                          ref={(video) => {
                            videos.current[i] = video;
                          }}
                          src={`/media/app-tap-only/${f.file}.mp4`}
                          width="720"
                          height="1564"
                          aria-label={f.alt}
                          muted
                          loop
                          playsInline
                          autoPlay={isActive && active === i && !paused}
                          preload={active === i ? 'auto' : 'metadata'}
                          data-ready={!!ready[i]}
                          tabIndex={isActive && active === i ? 0 : -1}
                          title={paused ? 'Play preview' : 'Pause preview'}
                          onClick={() => setPaused((value) => !value)}
                          onKeyDown={(event) => {
                            if (event.key === ' ' || event.key === 'Enter') {
                              event.preventDefault();
                              setPaused((value) => !value);
                            }
                          }}
                          onWaiting={() =>
                            setBuffering((previous) => ({
                              ...previous,
                              [i]: true,
                            }))
                          }
                          onPlaying={(event) => {
                            const video = event.currentTarget;
                            const reveal = () => {
                              setReady((previous) => ({
                                ...previous,
                                [i]: true,
                              }));
                              setBuffering((previous) => ({
                                ...previous,
                                [i]: false,
                              }));
                            };
                            if (video.requestVideoFrameCallback)
                              video.requestVideoFrameCallback(reveal);
                            else reveal();
                          }}
                          onError={() =>
                            setFailed((previous) => ({
                              ...previous,
                              [i]: true,
                            }))
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Phone>
            {isActive && buffering[active] && !paused && !failed[active] && (
              <span className="buffering" role="status">
                Loading preview…
              </span>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}

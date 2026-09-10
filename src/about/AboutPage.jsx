import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import beginnings from '../../archive/chronicles/Story/Images/A/A6.webp';
import village from '../../archive/chronicles/Story/Images/C/C2.webp';
import gathering from '../../archive/chronicles/Story/Images/D/D5.webp';
import {
  mainImages,
  getResponsiveImage,
} from '../structures/images/structureImages.js';
import {
  eras,
  introduction,
  transition,
  discoveries,
  structureLinks,
  linkedParts,
} from './storyContent.js';
import today from '../../archive/chronicles/Story/Images/F/F1.webp';

const eraPhotos = { beginnings, village, gathering, today };
const linkedText = (text) =>
  linkedParts(text).map((part, index) =>
    structureLinks[part] ? (
      <Link key={index} to={`/structures/${structureLinks[part]}`}>
        {part}
      </Link>
    ) : (
      part
    )
  );

const Page = styled.article`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;
  padding: 48px 0 58px;
  color: #233b32;
  * {
    box-sizing: border-box;
  }
  h1,
  h2,
  h3,
  p,
  figure {
    margin: 0;
  }
  h1 {
    color: var(--green, #164b3b);
    font-size: clamp(34px, 4.2vw, 52px);
    line-height: 1.1;
    letter-spacing: -0.045em;
    font-weight: 550;
  }
  h2 {
    color: var(--green, #164b3b);
    font-size: 27px;
    line-height: 1.2;
    letter-spacing: -0.025em;
    font-weight: 550;
  }
  p {
    font-size: 16px;
    line-height: 1.7;
  }
  a {
    color: inherit;
    text-underline-offset: 4px;
  }
  button {
    font: inherit;
    cursor: pointer;
  }
  a:focus-visible,
  button:focus-visible,
  [role='tabpanel']:focus-visible {
    outline: 3px solid #ad801f;
    outline-offset: 4px;
  }
  .intro {
    max-width: 85ch;
    margin-bottom: 28px;
  }
  .intro h1 {
    margin-bottom: 22px;
  }
  .examples {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
    margin-bottom: 36px;
  }
  .examples img {
    display: block;
    width: 100%;
    height: 220px;
    object-fit: cover;
  }
  .examples figcaption {
    margin-top: 12px;
  }
  .examples figcaption > a {
    font-size: 18px;
  }
  .examples p {
    font-size: 14px;
    line-height: 1.6;
    margin-top: 6px;
  }
  .transition {
    max-width: 85ch;
    margin-bottom: 24px;
  }
  .visit-photo img {
    width: 100%;
    height: 210px;
    object-fit: cover;
    display: block;
  }
  .visit-photo figcaption {
    font-size: 12px;
    line-height: 1.5;
    margin-top: 8px;
  }
  .visit h2 {
    margin-bottom: 14px;
  }
  .intro p + p {
    margin-top: 13px;
  }
  .history-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 18px;
  }
  .history-heading > a {
    font-size: 14px;
  }
  .eras {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
  .eras button {
    position: relative;
    display: block;
    width: 100%;
    background: transparent;
    color: #164b3b;
    border: 0;
    border-bottom: 2px solid #dce3dc;
    padding: 0 0 10px;
    text-align: left;
    transition: border-color 0.18s;
  }
  .eras img {
    display: block;
    width: 100%;
    height: 90px;
    object-fit: cover;
    filter: saturate(0.65);
    opacity: 0.78;
    transition:
      opacity 0.2s,
      filter 0.2s;
    margin-bottom: 10px;
  }
  .eras button:first-child img {
    object-position: center 54%;
  }
  .eras button:hover img,
  .eras button[aria-selected='true'] img {
    opacity: 1;
    filter: none;
  }
  .eras button[aria-selected='true'] {
    border-color: #ab7d20;
  }
  .eras button:hover {
    border-color: #164b3b;
  }
  .eras span {
    display: block;
    font-size: 14px;
    font-weight: 550;
  }
  .story {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #eef0e9;
    min-height: 350px;
  }
  .story figure {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .story img {
    width: 100%;
    height: 300px;
    object-fit: contain;
    display: block;
    background: #e2e5dc;
  }
  .story figcaption {
    font-size: 12px;
    line-height: 1.5;
    padding: 11px 16px;
  }
  .story-copy {
    padding: 34px;
    align-self: center;
  }
  .story h3 {
    color: #164b3b;
    font-size: 27px;
    line-height: 1.2;
    font-weight: 550;
    letter-spacing: -0.025em;
    margin-bottom: 16px;
  }
  .story-copy > div {
    animation: story-reveal 0.22s ease-out;
  }
  .visit {
    display: grid;
    grid-template-columns: 230px 1fr;
    gap: 36px;
    padding: 30px 0;
    margin: 30px 0 38px;
    border-block: 1px solid #dce3dc;
  }
  .visit p + p {
    margin-top: 12px;
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 19px;
  }
  .links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 10px 17px;
    border: 1px solid #164b3b;
    text-decoration: none;
    font-size: 14px;
    transition:
      background 0.18s,
      color 0.18s;
  }
  .links a:first-child {
    color: white;
    background: #164b3b;
  }
  .links a:hover {
    color: white;
    background: #28644e;
  }
  .archive {
    margin-top: 32px;
    padding-top: 22px;
    border-top: 1px solid #dce3dc;
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 50px;
  }
  .contact {
    margin-top: 18px;
  }
  .contact .email {
    display: block;
    width: fit-content;
    margin-top: 8px;
    font-size: 15px;
  }
  .contact .links {
    margin-top: 14px;
  }
  .contact button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 10px 17px;
    border: 1px solid #164b3b;
    background: transparent;
    color: #164b3b;
    font-size: 14px;
  }
  .contact button:hover {
    background: #e2e9df;
  }
  .contact .copy-status {
    min-height: 24px;
    margin-top: 8px;
    font-size: 13px;
  }
  .archive h2 {
    font-size: 19px;
  }
  .archive p {
    font-size: 14px;
    line-height: 1.65;
  }
  @keyframes story-reveal {
    from {
      opacity: 0.3;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @media (max-width: 700px) {
    padding: 30px 0 40px;
    .intro,
    .visit,
    .archive {
      grid-template-columns: 1fr;
      gap: 18px;
    }
    .intro {
      margin-bottom: 30px;
    }
    .examples {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .examples img {
      height: 220px;
    }
    .visit {
      display: block;
    }
    .visit-photo {
      float: right;
      width: 110px;
      margin: 0 0 14px 18px;
    }
    .visit-photo img {
      height: 145px;
    }
    .visit::after {
      content: '';
      display: block;
      clear: both;
    }
    .visit .links {
      clear: both;
      padding-top: 4px;
    }
    .visit p {
      font-size: 15px;
    }
    .history-heading {
      align-items: center;
    }
    .history-heading h2 {
      font-size: 24px;
    }
    .eras {
      gap: 8px;
    }
    .eras img {
      height: 62px;
    }
    .eras span {
      font-size: 12px;
      letter-spacing: -0.02em;
      white-space: nowrap;
    }
    .story {
      grid-template-columns: 1fr;
    }
    .story img {
      height: 240px;
    }
    .story-copy {
      padding: 22px;
    }
    .story h3 {
      font-size: 24px;
    }
    .story p {
      font-size: 15px;
    }
  }
  @media (max-width: 600px) {
    width: calc(100% - 36px);
  }
  @media (max-width: 360px) {
    .eras {
      gap: 5px;
    }
    .eras span {
      font-size: 11px;
    }
    .eras img {
      height: 54px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;

export default function AboutPage() {
  const [selected, setSelected] = useState(0);
  const [copyStatus, setCopyStatus] = useState('');
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('parker.jones@Live.com');
      setCopyStatus('Copied');
    } catch {
      setCopyStatus(
        'Could not copy. Select the email address above to copy it manually.'
      );
    }
  };
  const tabs = useRef([]);
  const era = eras[selected];
  const changeWithKeyboard = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % eras.length;
    if (event.key === 'ArrowLeft')
      next = (index - 1 + eras.length) % eras.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = eras.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };
  return (
    <Page>
      <header className="intro">
        <h1>What is Poly Canyon?</h1>
        {introduction.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </header>
      <div className="examples">
        {discoveries.map((item) => (
          <figure key={item.slug}>
            <Link
              to={`/structures/${item.slug}`}
              aria-label={`Read about ${item.name}`}
            >
              <img
                {...getResponsiveImage(
                  mainImages[`M-${item.number}`],
                  '(max-width:700px) 100vw, 400px'
                )}
                alt={item.name}
              />
            </Link>
            <figcaption>
              <Link to={`/structures/${item.slug}`}>{item.name}</Link>
              <p>{item.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <section className="visit" id="visit" aria-labelledby="visit-heading">
        <figure className="visit-photo">
          <Link to="/structures/entryArch">
            <img
              {...getResponsiveImage(mainImages['M-1'], '230px')}
              alt="The stone Entry Arch beside the canyon path"
              loading="lazy"
            />
          </Link>
          <figcaption>
            The <Link to="/structures/entryArch">Entry Arch</Link> marks your
            arrival.
          </figcaption>
        </figure>
        <div>
          <h2 id="visit-heading">Visiting</h2>
          <p>
            Open to the public year-round. Come during daylight and follow any
            posted closures.
          </p>
          <p>
            From the H-4f parking lot at Cal Poly, follow Poly Canyon Road
            through the yellow gate to the{' '}
            <Link to="/structures/entryArch">Entry Arch</Link>. Bring water and
            shoes for uneven ground; paths can be muddy after rain.
          </p>
          <div className="links">
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=35.30302,-120.65913&destination=35.31344,-120.65192&travelmode=walking"
              target="_blank"
              rel="noreferrer"
            >
              Walking directions
            </a>
            <a
              href="https://www.alltrails.com/trail/us/california/architecture-graveyard-hike-private-property"
              target="_blank"
              rel="noreferrer"
            >
              Trail on AllTrails
            </a>
          </div>
        </div>
      </section>
      <section id="history" aria-labelledby="story-heading">
        <div className="history-heading">
          <h2 id="story-heading">The history of the canyon</h2>
          <Link to="/structures">See the structures</Link>
        </div>
        <p className="transition">{transition}</p>
        <div className="eras" role="tablist" aria-label="Canyon history">
          {eras.map((item, index) => (
            <button
              key={item.date}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={`canyon-era-${index}`}
              type="button"
              role="tab"
              aria-selected={selected === index}
              aria-controls="canyon-story-panel"
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => changeWithKeyboard(event, index)}
            >
              <img src={eraPhotos[item.photo]} alt="" width="240" height="90" />
              <span>{item.date}</span>
            </button>
          ))}
        </div>
        <div
          className="story"
          id="canyon-story-panel"
          role="tabpanel"
          aria-labelledby={`canyon-era-${selected}`}
          tabIndex={0}
        >
          <figure>
            <img
              src={eraPhotos[era.photo]}
              alt={era.alt}
              width="520"
              height="300"
            />
            <figcaption>{linkedText(era.caption)}</figcaption>
          </figure>
          <div className="story-copy">
            <div key={selected}>
              <h3>{era.title}</h3>
              <p>{linkedText(era.text)}</p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="project"
        className="archive"
        aria-labelledby="archive-heading"
      >
        <h2 id="archive-heading">About this archive</h2>
        <div>
          <p>
            Parker Jones assembled this collection of photographs, structure
            histories, and original project reports with help from Cal Poly’s
            Kennedy Library and architecture community.{' '}
            <Link to="/structures">Browse the archive.</Link>
          </p>
          <div className="contact" aria-label="Contact Parker">
            <p>Questions, corrections, or anything else? Reach out.</p>
            <a className="email" href="mailto:parker.jones@Live.com">
              parker.jones@Live.com
            </a>
            <div className="links">
              <a href="mailto:parker.jones@Live.com">Email Parker</a>
              <button type="button" onClick={copyEmail}>
                Copy email
              </button>
            </div>
            <p className="copy-status" role="status" aria-live="polite">
              {copyStatus}
            </p>
          </div>
        </div>
      </section>
    </Page>
  );
}

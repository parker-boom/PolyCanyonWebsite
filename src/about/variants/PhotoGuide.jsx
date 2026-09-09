import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  mainImages,
  getResponsiveImage,
} from '../../structures/images/structureImages.js';

const chapters = [
  {
    period: '1950s–1960s',
    title: 'Room to build',
    number: 7,
    url: 'geodesicDome',
    name: 'Geodesic Dome',
    text: 'As Cal Poly’s architecture program grew, students needed space for experiments too large for a classroom. George Hasslein helped establish an outdoor laboratory on former agricultural land. In the early 1960s, students moved the dome here and began building houses, bridges, and the water and electrical systems that supported them.',
    caption:
      'The Geodesic Dome was built on campus before moving into the canyon.',
  },
  {
    period: '1970s–1980s',
    title: 'A place to live, too',
    number: 24,
    url: 'shellHouse',
    name: 'Shell House',
    text: 'Student caretakers lived in the canyon’s houses, maintaining the grounds in exchange for housing and meals. Projects grew across successive generations of builders. Design Village brought another tradition: teams built temporary shelters and lived in them during the competition. The canyon was a working site, a home, and a gathering place.',
    caption:
      'Shell House’s concrete shell became a home for student caretakers.',
  },
  {
    period: '1990s–2000s',
    title: 'Building and repairing',
    number: 6,
    url: 'tensile',
    name: 'Tensile',
    text: 'New projects joined an increasingly established collection. Resident caretakers continued their work, and Design Village returned each spring. As older structures weathered, restoration became part of the learning: students rebuilt the Blade in 2003 and the Stick Structure in 2009, revisiting the choices earlier builders had made.',
    caption:
      'The Tensile pavilion added a shaded gathering space to the laboratory.',
  },
  {
    period: '2011–today',
    title: 'The work continues',
    number: 31,
    url: 'momentMonument',
    name: 'Moment Monument',
    text: 'The resident caretaker program ended around 2011, changing how the site was maintained. Weathering and vandalism took a toll, followed by student cleanups and major repairs. Today, restored buildings stand alongside new projects such as Moment Monument. Design Village and student construction continue; “Architecture Graveyard” tells only part of the story.',
    caption:
      'Moment Monument, completed in 2024, makes steel connections visible for study.',
  },
];

const Page = styled.article`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;
  padding: 46px 0 52px;
  color: #243b32;
  h1,
  h2 {
    color: var(--green, #164b3b);
    letter-spacing: -0.035em;
    font-weight: 550;
  }
  h1 {
    font-size: clamp(34px, 4.3vw, 56px);
    line-height: 1.07;
    margin: 0;
    max-width: 8.4em;
  }
  h2 {
    font-size: 27px;
    line-height: 1.2;
    margin: 0 0 14px;
  }
  p {
    font-size: 16px;
    line-height: 1.65;
    margin: 0 0 15px;
  }
  a {
    color: var(--green, #164b3b);
    text-underline-offset: 4px;
  }
  a:focus-visible,
  button:focus-visible {
    outline: 3px solid var(--gold, #b78a28);
    outline-offset: 5px;
  }
  .opening {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 65px;
    align-items: start;
    margin-bottom: 35px;
  }
  .opening p:last-child {
    margin-bottom: 0;
  }
  .history-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 20px;
    margin-bottom: 14px;
  }
  .history-top h2 {
    margin: 0;
  }
  .history-top p {
    font-size: 14px;
    color: #56665e;
    margin: 0;
  }
  .photographs {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
  }
  .photograph {
    border: 0;
    border-bottom: 3px solid transparent;
    padding: 0 0 13px;
    text-align: left;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .photograph[aria-pressed='true'] {
    border-bottom-color: var(--gold, #b78a28);
  }
  .crop {
    overflow: hidden;
    display: block;
    background: #e7ebe4;
  }
  .photograph img {
    width: 100%;
    aspect-ratio: 1.4;
    height: auto;
    display: block;
    object-fit: cover;
    transition:
      transform 240ms ease,
      filter 240ms ease;
  }
  .photograph:hover img {
    transform: scale(1.035);
    filter: brightness(1.05);
  }
  .period {
    display: block;
    margin-top: 11px;
    font-size: 13px;
    color: #637065;
  }
  .chapter-title {
    display: block;
    margin-top: 3px;
    font-size: 16px;
    font-weight: 550;
    color: #164b3b;
  }
  .stories {
    display: grid;
  }
  .story {
    grid-area: 1 / 1;
    display: grid;
    grid-template-columns: 1.65fr 1fr;
    gap: 42px;
    padding: 24px 28px;
    margin-top: 6px;
    background: #edf0e9;
    align-items: center;
    min-height: 170px;
  }
  .story[aria-hidden='true'] {
    visibility: hidden;
    pointer-events: none;
  }
  .story p {
    margin: 0;
  }
  .story-caption {
    border-left: 1px solid #cad3c7;
    padding-left: 26px;
  }
  .story-caption p {
    font-size: 14px;
    line-height: 1.55;
    margin-bottom: 9px;
  }
  .story-caption a {
    font-size: 14px;
    font-weight: 550;
  }
  .practical {
    display: grid;
    grid-template-columns: 1.65fr 1fr;
    gap: 65px;
    margin-top: 35px;
    padding-top: 30px;
    border-top: 1px solid var(--line, #dee4da);
  }
  .practical p {
    font-size: 15px;
  }
  .directions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
  }
  .directions a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 44px;
    padding: 9px 17px;
    text-decoration: none;
    border: 1px solid #164b3b;
    font-size: 14px;
    transition: background 180ms ease;
  }
  .directions a:first-child {
    background: #164b3b;
    color: white;
  }
  .directions a:first-child:hover {
    background: #25624d;
  }
  .directions a:last-child:hover {
    background: #e8ede5;
  }
  @media (max-width: 900px) {
    width: calc(100% - 48px);
    .opening {
      gap: 32px;
    }
    .story,
    .practical {
      gap: 26px;
    }
    .chapter-title {
      font-size: 15px;
    }
  }
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    padding: 28px 0 35px;
    h1 {
      max-width: none;
      font-size: 38px;
    }
    .opening {
      grid-template-columns: 1fr;
      gap: 20px;
      margin-bottom: 28px;
    }
    .history-top {
      display: block;
    }
    .history-top p {
      margin-top: 7px;
    }
    .photographs {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px 12px;
    }
    .photograph img {
      aspect-ratio: 1.45;
    }
    .chapter-title {
      min-height: 20px;
      font-size: 14px;
    }
    .period {
      margin-top: 8px;
    }
    .story {
      grid-template-columns: 1fr;
      padding: 20px;
      gap: 18px;
      min-height: 0;
    }
    .story-caption {
      border-left: 0;
      border-top: 1px solid #cad3c7;
      padding: 15px 0 0;
    }
    .practical {
      grid-template-columns: 1fr;
      gap: 28px;
      margin-top: 28px;
      padding-top: 25px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition: none !important;
    }
  }
`;

export default function PhotoGuide() {
  const [active, setActive] = useState(0);
  return (
    <Page>
      <header className="opening">
        <h1>What is Poly Canyon?</h1>
        <div>
          <p>
            In the hills behind Cal Poly in San Luis Obispo, paths lead between
            student-built houses, bridges, towers, and structural experiments.
            This nine-acre outdoor construction laboratory is also known as the
            Architecture Graveyard.
          </p>
          <p>
            For more than sixty years, students have come here to turn drawings
            into buildings. You can walk among their work, see how it was made,
            and discover a part of campus that keeps changing.
          </p>
        </div>
      </header>
      <section aria-labelledby="photo-history-heading">
        <div className="history-top">
          <h2 id="photo-history-heading">Inside the canyon</h2>
          <p>Choose a photograph to explore its history.</p>
        </div>
        <div
          className="photographs"
          role="group"
          aria-label="Chapters of the canyon’s history"
        >
          {chapters.map((item, index) => (
            <button
              className="photograph"
              key={item.url}
              type="button"
              aria-pressed={index === active}
              aria-controls="photo-history-story"
              onClick={() => setActive(index)}
            >
              <span className="crop">
                <img
                  {...getResponsiveImage(
                    mainImages[`M-${item.number}`],
                    '(max-width: 600px) 45vw, (max-width: 900px) 22vw, 300px'
                  )}
                  alt={item.name}
                  width="600"
                  height="430"
                />
              </span>
              <span className="period">{item.period}</span>
              <span className="chapter-title">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="stories" id="photo-history-story" aria-live="polite">
          {chapters.map((chapter, index) => (
            <div
              className="story"
              key={chapter.url}
              aria-hidden={index !== active}
            >
              <p>{chapter.text}</p>
              <div className="story-caption">
                <p>{chapter.caption}</p>
                <Link
                  to={`/structures/${chapter.url}`}
                  tabIndex={index === active ? 0 : -1}
                >
                  See {chapter.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="practical">
        <section aria-labelledby="photo-visiting-heading">
          <h2 id="photo-visiting-heading">Visiting</h2>
          <p>
            Open to the public year-round; visit in daylight and follow posted
            restrictions. From the H-4f parking lot, take Poly Canyon Road
            through the yellow gate. Continue to the Entry Arch to reach the
            structures.
          </p>
          <p>
            Bring water and shoes for uneven ground. Paths can be muddy after
            rain.
          </p>
          <div className="directions">
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=35.30302,-120.65913&destination=35.31344,-120.65192&travelmode=walking"
              target="_blank"
              rel="noopener noreferrer"
            >
              Walking directions
            </a>
            <a
              href="https://www.alltrails.com/trail/us/california/architecture-graveyard-hike-private-property?sh=rvw6ps"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trail on AllTrails
            </a>
          </div>
        </section>
        <section aria-labelledby="photo-archive-heading">
          <h2 id="photo-archive-heading">About this archive</h2>
          <p>
            Parker Jones began by mapping the canyon as a Cal Poly student. This
            archive brings together photographs, structure histories, and
            original reports, with help from Kennedy Library and architecture
            students.
          </p>
          <Link to="/structures">Browse the structures</Link>
        </section>
      </div>
    </Page>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  mainImages,
  getResponsiveImage,
} from '../../structures/images/structureImages.js';
const discoveries = [
  {
    number: 24,
    slug: 'shellHouse',
    name: 'Shell House',
    type: 'Experimental houses',
    text: 'A thin concrete shell became a house for student caretakers. Other homes tested modular construction, earth building, and solar design.',
  },
  {
    number: 6,
    slug: 'tensile',
    name: 'Tensile',
    type: 'Places to gather',
    text: 'Fabric and tensioned cables form this open-air shelter. Across the site, students built places to sit, meet, and work outdoors.',
  },
  {
    number: 31,
    slug: 'momentMonument',
    name: 'Moment Monument',
    type: 'Engineering up close',
    text: 'Completed in 2024, this steel frame leaves its connections exposed so students can study how buildings resist sideways forces.',
  },
];
const Page = styled.article`
  max-width: 1240px;
  width: calc(100% - 80px);
  margin: 0 auto;
  padding: 48px 0 64px;
  color: #243a31;
  h1,
  h2,
  h3,
  p,
  figure {
    margin: 0;
  }
  h1,
  h2,
  h3 {
    color: var(--green, #164b3b);
  }
  h1 {
    font-size: clamp(36px, 4.8vw, 62px);
    font-weight: 550;
    line-height: 1.06;
    letter-spacing: -0.045em;
    max-width: 10ch;
  }
  h2 {
    font-size: clamp(26px, 3vw, 36px);
    line-height: 1.14;
    letter-spacing: -0.035em;
    font-weight: 550;
  }
  h3 {
    font-size: 17px;
    line-height: 1.5;
    font-weight: 600;
  }
  p {
    font-size: 16px;
    line-height: 1.65;
  }
  a {
    color: var(--green, #164b3b);
    text-underline-offset: 4px;
  }
  a:focus-visible,
  button:focus-visible {
    outline: 3px solid var(--gold, #aa7b24);
    outline-offset: 4px;
  }
  .intro {
    display: grid;
    grid-template-columns: 1fr 1.14fr;
    gap: 64px;
    align-items: start;
    margin-bottom: 36px;
  }
  .intro-copy {
    max-width: 60ch;
    padding-top: 3px;
  }
  .intro-copy p + p {
    margin-top: 15px;
  }
  .discovery {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 38px;
    align-items: stretch;
  }
  .feature {
    position: relative;
    background: #e8ebe4;
    overflow: hidden;
    height: 380px;
    min-height: 340px;
  }
  .feature a {
    display: block;
    height: 100%;
  }
  .feature img {
    width: 100%;
    height: 100%;
    min-height: 340px;
    object-fit: cover;
    display: block;
    animation: arrive 0.28s ease-out;
    transition: transform 0.35s ease;
  }
  .feature a:hover img {
    transform: scale(1.025);
  }
  .feature figcaption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    padding: 44px 22px 19px;
    background: linear-gradient(transparent, #10281dd9);
    font-size: 22px;
    pointer-events: none;
  }
  .feature figcaption span {
    float: right;
    font-size: 15px;
    margin-top: 5px;
  }
  .choices {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .choices button {
    width: 100%;
    display: grid;
    grid-template-columns: 88px 1fr;
    gap: 17px;
    text-align: left;
    align-items: center;
    padding: 17px 0;
    border: 0;
    border-bottom: 1px solid #d9e0d8;
    background: transparent;
    color: #456054;
    cursor: pointer;
    font: inherit;
    transition: color 0.18s ease;
  }
  .choices button:first-child {
    border-top: 1px solid #d9e0d8;
  }
  .choices button:hover {
    color: #122e22;
  }
  .choices button[aria-pressed='true'] {
    color: #164b3b;
  }
  .choices button[aria-pressed='true'] img {
    outline: 2px solid #ac8128;
    outline-offset: 3px;
  }
  .choices img {
    display: block;
    width: 88px;
    height: 65px;
    object-fit: cover;
  }
  .choice-title {
    display: block;
    font-size: 17px;
    line-height: 1.3;
    font-weight: 550;
  }
  .choice-name {
    display: block;
    margin-top: 5px;
    font-size: 13px;
  }
  .description {
    padding-top: 18px;
    min-height: 106px;
    font-size: 15px;
  }
  .visit {
    margin: 56px 0;
    padding: 32px 0;
    border-top: 1px solid #d9e0d8;
    border-bottom: 1px solid #d9e0d8;
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 36px;
  }
  .visit-photo img {
    display: block;
    width: 100%;
    height: 235px;
    object-fit: cover;
  }
  .visit-photo figcaption {
    font-size: 13px;
    margin-top: 9px;
  }
  .visit h2 {
    margin-bottom: 15px;
  }
  .visit p {
    max-width: 70ch;
  }
  .visit p + p {
    margin-top: 12px;
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }
  .buttons a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 10px 17px;
    text-decoration: none;
    border: 1px solid #164b3b;
    font-size: 14px;
    transition:
      background 0.18s,
      color 0.18s;
  }
  .buttons a:first-child {
    color: white;
    background: #164b3b;
  }
  .buttons a:hover {
    background: #e2e9df;
    color: #164b3b;
  }
  .history h2 {
    margin-bottom: 25px;
  }
  .eras {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 34px;
  }
  .era {
    border-top: 2px solid #b09353;
    padding-top: 16px;
  }
  .era h3 {
    margin-bottom: 9px;
  }
  .era p {
    font-size: 15px;
  }
  .archive {
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid #d9e0d8;
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 36px;
  }
  .archive p {
    max-width: 76ch;
    font-size: 14px;
  }
  @keyframes arrive {
    from {
      opacity: 0.7;
    }
    to {
      opacity: 1;
    }
  }
  @media (max-width: 850px) {
    .intro {
      gap: 30px;
      grid-template-columns: 1fr 1.4fr;
    }
    .discovery {
      grid-template-columns: 1.2fr 1fr;
      gap: 24px;
    }
    .choices button {
      grid-template-columns: 65px 1fr;
      gap: 12px;
    }
    .choices img {
      width: 65px;
      height: 54px;
    }
    .visit {
      grid-template-columns: 160px 1fr;
      gap: 25px;
    }
    .eras {
      gap: 22px;
    }
  }
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    padding-top: 28px;
    .intro {
      display: block;
      margin-bottom: 26px;
    }
    h1 {
      max-width: none;
      font-size: 39px;
      margin-bottom: 20px;
    }
    .intro-copy {
      padding: 0;
    }
    .discovery {
      display: block;
    }
    .feature {
      height: 235px;
      min-height: 0;
    }
    .feature img {
      min-height: 0;
    }
    .feature figcaption {
      font-size: 21px;
      padding: 38px 15px 14px;
    }
    .choices {
      margin-top: 16px;
    }
    .choices button {
      grid-template-columns: 62px 1fr;
      padding: 12px 0;
      gap: 15px;
    }
    .choices img {
      width: 62px;
      height: 44px;
    }
    .choice-title {
      font-size: 16px;
    }
    .choice-name {
      margin-top: 2px;
    }
    .description {
      min-height: 100px;
      padding-top: 15px;
    }
    .visit {
      margin: 30px 0;
      padding: 26px 0;
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
    .visit-photo figcaption {
      font-size: 11px;
      line-height: 1.4;
    }
    .visit::after {
      content: '';
      display: block;
      clear: both;
    }
    .visit .buttons {
      clear: both;
    }
    .eras {
      grid-template-columns: 1fr;
      gap: 22px;
    }
    .archive {
      grid-template-columns: 1fr;
      gap: 12px;
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
export default function VisitCanyon() {
  const [selected, setSelected] = useState(0);
  const current = discoveries[selected];
  return (
    <Page>
      <div className="intro">
        <h1>What is Poly Canyon?</h1>
        <div className="intro-copy">
          <p>
            In the hills behind Cal Poly in San Luis Obispo, paths lead between
            houses, bridges, towers, and other structures built by students. You
            may know it as the Architecture Graveyard.
          </p>
          <p>
            It began as a place to try things at full size: pour a concrete
            roof, build a bridge, or make a house from earth. More than sixty
            years of experiments now share this nine-acre outdoor laboratory.
          </p>
        </div>
      </div>
      <div className="discovery">
        <figure className="feature">
          <Link
            to={`/structures/${current.slug}`}
            aria-label={`Read about ${current.name}`}
          >
            <img
              key={current.number}
              {...getResponsiveImage(
                mainImages[`M-${current.number}`],
                '(max-width: 600px) calc(100vw - 36px), 720px'
              )}
              alt={current.name}
            />
          </Link>
          <figcaption>
            {current.name}
            <span aria-hidden="true">Explore →</span>
          </figcaption>
        </figure>
        <div className="choices">
          <div role="group" aria-label="What you can find in the canyon">
            {discoveries.map((item, i) => (
              <button
                key={item.number}
                type="button"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                <img
                  {...getResponsiveImage(
                    mainImages[`M-${item.number}`],
                    '88px'
                  )}
                  alt=""
                />
                <span>
                  <span className="choice-title">{item.type}</span>
                  <span className="choice-name">{item.name}</span>
                </span>
              </button>
            ))}
          </div>
          <p className="description" aria-live="polite">
            {current.text}
          </p>
        </div>
      </div>
      <section className="visit" aria-labelledby="visit-heading">
        <figure className="visit-photo">
          <Link to="/structures/entryArch">
            <img
              {...getResponsiveImage(mainImages['M-1'], '220px')}
              alt="The stone Entry Arch beside the canyon path"
              loading="lazy"
            />
          </Link>
          <figcaption>The Entry Arch marks your arrival.</figcaption>
        </figure>
        <div>
          <h2 id="visit-heading">Visiting</h2>
          <p>
            Open to the public year-round. Come during daylight to see the
            structures and follow the paths; check any posted closures.
          </p>
          <p>
            From the H-4f parking lot at Cal Poly, follow Poly Canyon Road
            through the yellow gate to the Entry Arch. Bring water and shoes for
            uneven ground. Paths can be muddy after rain.
          </p>
          <div className="buttons">
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
        </div>
      </section>
      <section className="history" aria-labelledby="history-heading">
        <h2 id="history-heading">History</h2>
        <div className="eras">
          <div className="era">
            <h3>1960s · Room to build</h3>
            <p>
              As Cal Poly’s architecture program grew, George Hasslein helped
              establish a site for experiments too large for a classroom.
              Students built infrastructure and houses, often passing unfinished
              projects to the next team.
            </p>
          </div>
          <div className="era">
            <h3>1970s–2000s · A working community</h3>
            <p>
              Student caretakers lived in the houses and maintained the grounds.
              Design Village brought an annual competition of temporary
              shelters. New construction continued alongside repairs to older
              experiments.
            </p>
          </div>
          <div className="era">
            <h3>2010s–today · Repairing and building</h3>
            <p>
              Resident care ended around 2011. Weathering and vandalism left
              their mark, but students returned to restore structures and build
              new ones. Design Village still brings teams into the canyon.
            </p>
          </div>
        </div>
      </section>
      <section className="archive" aria-labelledby="archive-heading">
        <h3 id="archive-heading">About this archive</h3>
        <p>
          Parker Jones created this guide as a Cal Poly student, gathering
          photographs and research with help from Kennedy Library and the
          college. <Link to="/structures">Explore the structures</Link> for
          photographs, histories, and available original reports.
        </p>
      </section>
    </Page>
  );
}

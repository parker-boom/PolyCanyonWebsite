import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  mainImages,
  getResponsiveImage,
} from '../structures/images/structureImages.js';
import { intro, visit, history, project } from './articleContent.js';
const photos = [
  { number: 8, url: 'cantileverDeck', name: 'Cantilever Deck' },
  { number: 24, url: 'shellHouse', name: 'Shell House' },
  { number: 6, url: 'tensile', name: 'Tensile' },
  { number: 31, url: 'momentMonument', name: 'Moment Monument' },
];
const captions = {
  8: 'Cantilever Deck makes its support system visible: cables carry the deck’s load through the upright structure to its base.',
  24: 'Shell House began as a thin concrete-shell experiment and later housed student caretakers.',
  6: 'The Tensile Structure provides shelter with a fabric canopy held by cables, adding a gathering place to the outdoor laboratory.',
  31: 'Moment Monument, completed in 2024, exposes steel connections so students can study how a frame resists sideways forces.',
};
// Pick once per document visit. Returning from a structure keeps the same image.
function choosePhoto() {
  let candidates = photos;
  try {
    const last = sessionStorage.getItem('about-photo');
    candidates = photos.filter((p) => String(p.number) !== last);
  } catch {
    /* A photo still works when storage is unavailable. */
  }
  const photo = candidates[Math.floor(Math.random() * candidates.length)];
  try {
    sessionStorage.setItem('about-photo', String(photo.number));
  } catch {
    /* optional */
  }
  return photo;
}
const photo = choosePhoto();
const Page = styled.article`
  width: min(760px, calc(100% - 80px));
  margin: 0 auto;
  padding: 40px 0 64px;
  color: #213b32;
  h1 {
    font-size: clamp(32px, 4vw, 44px);
    line-height: 1.15;
    letter-spacing: -0.04em;
    font-weight: 550;
    margin: 0 0 24px;
    color: var(--green);
  }
  h2 {
    font-size: 27px;
    line-height: 1.25;
    font-weight: 550;
    letter-spacing: -0.025em;
    margin: 0 0 20px;
    color: var(--green);
  }
  p {
    font-size: 17px;
    line-height: 1.8;
    margin: 0 0 20px;
  }
  section {
    margin-top: 36px;
    padding-top: 30px;
    border-top: 1px solid var(--line);
  }
  a {
    color: var(--green);
    text-underline-offset: 4px;
  }
  a:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 4px;
  }
  figure {
    width: 300px;
    margin: 28px 0 0;
  }
  figure img {
    width: 100%;
    aspect-ratio: 1.6;
    height: auto;
    object-fit: cover;
    display: block;
  }
  figcaption {
    font-size: 13px;
    line-height: 1.6;
    margin-top: 12px;
    color: var(--muted);
  }
  h3 {
    font-size: 21px;
    line-height: 1.4;
    font-weight: 550;
    margin: 30px 0 16px;
    color: var(--green);
  }
  .directions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }
  .directions a {
    min-height: 46px;
    display: inline-flex;
    align-items: center;
    padding: 10px 16px;
    border: 1px solid #164b3b;
    text-decoration: none;
    font-size: 15px;
  }
  .directions a:last-child {
    color: white;
    background: var(--green);
  }
  .directions a:hover {
    box-shadow: inset 0 0 0 1px var(--green);
  }
  .sources {
    font-size: 13px;
    color: var(--muted);
  }
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    padding-top: 28px;
    p {
      font-size: 16px;
    }
    h2 {
      font-size: 25px;
    }
    figure {
      width: min(280px, 100%);
    }
  }
`;
export default function AboutPage() {
  return (
    <Page>
      <h1>What is Poly Canyon?</h1>
      <div dangerouslySetInnerHTML={{ __html: intro }} />
      <figure>
        <Link
          to={`/structures/${photo.url}`}
          aria-label={`Read about ${photo.name}`}
        >
          <img
            {...getResponsiveImage(mainImages[`M-${photo.number}`], '300px')}
            width="480"
            height="300"
            alt={photo.name}
          />
        </Link>
        <figcaption>
          <Link to={`/structures/${photo.url}`}>{captions[photo.number]}</Link>
        </figcaption>
      </figure>
      <div dangerouslySetInnerHTML={{ __html: visit }} />
      <div dangerouslySetInnerHTML={{ __html: history }} />
      <div dangerouslySetInnerHTML={{ __html: project }} />
    </Page>
  );
}

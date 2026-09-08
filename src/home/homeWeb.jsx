import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  mainImages,
  getResponsiveImage,
} from '../structures/images/structureImages.js';
import structures from '../structures/data/structuresList.json';
const Page = styled.div`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;
  padding: 44px 0 64px;
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    padding: 28px 0 40px;
  }
`;
const Hero = styled.section`
  display: grid;
  grid-template-columns: 0.78fr 1.22fr;
  gap: 64px;
  align-items: center;
  @media (max-width: 800px) {
    gap: 32px;
    grid-template-columns: 0.8fr 1.2fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;
const Intro = styled.div`
  h1 {
    font-size: clamp(46px, 5.1vw, 68px);
    line-height: 0.98;
    letter-spacing: -0.055em;
    font-weight: 650;
    margin: 0 0 24px;
    color: var(--green);
  }
  p {
    font-size: 18px;
    line-height: 1.65;
    max-width: 310px;
    margin: 0 0 30px;
    color: var(--muted);
  }
  a {
    display: inline-flex;
    align-items: center;
    gap: 28px;
    text-decoration: none;
    border-bottom: 1px solid var(--gold);
    padding: 10px 0;
    color: var(--green);
    font-weight: 600;
  }
  a:hover {
    gap: 36px;
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 48px;
      letter-spacing: -2px;
      margin-bottom: 14px;
    }
    h1 br {
      display: none;
    }
    p {
      font-size: 16px;
      max-width: 340px;
      margin-bottom: 12px;
    }
    a {
      min-height: 44px;
    }
  }
`;
const Feature = styled.figure`
  margin: 0;
  min-width: 0;
  .photo {
    display: block;
    overflow: hidden;
    background: #e8ede5;
    aspect-ratio: 1.5;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  .photo:hover img {
    transform: scale(1.025);
  }
  figcaption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    gap: 12px;
  }
  figcaption a {
    text-decoration: none;
    display: flex;
    align-items: baseline;
    gap: 14px;
    font-size: 15px;
    font-weight: 600;
  }
  .number {
    color: #8b702d;
    font-weight: 400;
    font-variant-numeric: tabular-nums;
  }
  .controls {
    display: flex;
    gap: 6px;
  }
  button {
    border: 0;
    background: transparent;
    color: var(--green);
    width: 40px;
    height: 40px;
    font-size: 21px;
    cursor: pointer;
  }
  button:hover {
    background: #edf1e9;
  }
  @media (max-width: 600px) {
    .photo {
      aspect-ratio: 1.15;
    }
    figcaption {
      padding: 5px 0;
    }
  }
`;
const Collection = styled.section`
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 16px;
  }
  h2 {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: -0.5px;
    margin: 0;
  }
  header a {
    font-size: 14px;
    text-decoration: none;
    padding: 10px 0;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }
  .item {
    text-decoration: none;
    min-width: 0;
  }
  .item img {
    display: block;
    width: 100%;
    aspect-ratio: 1.6;
    object-fit: cover;
    background: #e8ede5;
    transition: filter 0.2s;
  }
  .item:hover img {
    filter: brightness(1.06);
  }
  .caption {
    display: flex;
    gap: 12px;
    align-items: baseline;
    padding-top: 13px;
    font-size: 15px;
  }
  .caption span {
    color: #8b702d;
    font-variant-numeric: tabular-nums;
  }
  .caption strong {
    font-weight: 550;
  }
  .caption i {
    font-style: normal;
    margin-left: auto;
  }
  @media (max-width: 600px) {
    margin-top: 30px;
    .grid {
      gap: 16px;
      grid-template-columns: 1fr 1fr;
    }
    .item:last-child {
      display: none;
    }
    .caption {
      font-size: 14px;
      gap: 8px;
    }
    .caption i {
      display: none;
    }
    h2 {
      font-size: 18px;
    }
  }
`;
const Below = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  margin-top: 44px;
  padding-top: 28px;
  border-top: 1px solid var(--line);
  a {
    text-decoration: none;
    display: block;
  }
  h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 10px;
    display: flex;
    justify-content: space-between;
  }
  p {
    color: var(--muted);
    font-size: 15px;
    line-height: 1.65;
    max-width: 420px;
    margin: 0;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-top: 32px;
  }
`;
const featured = [1, 16, 7, 24, 31, 23].map((n) =>
  structures.find((s) => s.number === n)
);
const picks = [8, 26, 20].map((n) => structures.find((s) => s.number === n));
export default function Home() {
  const [index, setIndex] = useState(0);
  const current = featured[index];
  return (
    <Page>
      <Hero>
        <Intro>
          <h1>
            Poly
            <br /> Canyon
          </h1>
          <p>Student-built architecture in the hills of Cal Poly.</p>
          <Link to="/structures">Explore the structures</Link>
        </Intro>
        <Feature>
          <Link className="photo" to={`/structures/${current.url}`}>
            <img
              {...getResponsiveImage(
                mainImages[current.image_key],
                '(max-width:600px) calc(100vw - 36px), (max-width:1320px) 55vw, 690px'
              )}
              alt={current.title}
              decoding="async"
              fetchPriority="high"
            />
          </Link>
          <figcaption>
            <Link to={`/structures/${current.url}`}>
              <span className="number">
                {String(current.number).padStart(2, '0')}
              </span>
              <span aria-live="polite">{current.title}</span>
            </Link>
            <div className="controls">
              <button
                aria-label="Previous featured structure"
                onClick={() =>
                  setIndex((index + featured.length - 1) % featured.length)
                }
              >
                ←
              </button>
              <button
                aria-label="Next featured structure"
                onClick={() => setIndex((index + 1) % featured.length)}
              >
                →
              </button>
            </div>
          </figcaption>
        </Feature>
      </Hero>
      <Collection>
        <header>
          <h2>Around the canyon</h2>
          <Link to="/structures">View all</Link>
        </header>
        <div className="grid">
          {picks.map((s) => (
            <Link className="item" to={`/structures/${s.url}`} key={s.number}>
              <img
                {...getResponsiveImage(
                  mainImages[s.image_key],
                  '(max-width:600px) 45vw, 33vw'
                )}
                alt={s.title}
                loading="lazy"
                decoding="async"
              />
              <div className="caption">
                <span>{String(s.number).padStart(2, '0')}</span>
                <strong>{s.title}</strong>
              </div>
            </Link>
          ))}
        </div>
      </Collection>
      <Below>
        <Link to="/about">
          <h2>About the canyon</h2>
          <p>
            An outdoor laboratory shaped by generations of students. Its
            history, landscape, and the walk from campus.
          </p>
        </Link>
        <Link to="/app">
          <h2>Take the guide along</h2>
          <p>
            Find the structures and their stories with the Poly Canyon app for
            iPhone.
          </p>
        </Link>
      </Below>
    </Page>
  );
}

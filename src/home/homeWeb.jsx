import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  mainImages,
  getResponsiveImage,
} from '../structures/images/structureImages.js';
import structures from '../structures/data/structuresList.json';
const choices = structures.filter((s) => s.number > 0 && s.status === 'Active');
const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 0 64px;
  @media (max-width: 1280px) {
    margin: 0 40px;
  }
  @media (max-width: 700px) {
    margin: 0 20px;
    padding: 26px 0 40px;
  }
`;
const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 64px;
  align-items: stretch;
  @media (max-width: 900px) {
    gap: 32px;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 26px;
  }
`;
const Intro = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 32px 0;
  h1 {
    font-size: clamp(54px, 6.4vw, 88px);
    line-height: 0.98;
    letter-spacing: -3px;
    margin: 24px 0;
    color: var(--green);
  }
  p {
    font-family: var(--serif);
    font-size: 21px;
    line-height: 1.65;
    max-width: 350px;
    margin: 0 0 28px;
  }
  .place {
    font:
      12px/1.5 -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }
  @media (max-width: 700px) {
    padding: 0;
    h1 {
      font-size: 54px;
      margin: 12px 0 18px;
      letter-spacing: -2px;
    }
    h1 br {
      display: none;
    }
    p {
      font-size: 18px;
      max-width: 440px;
      margin-bottom: 18px;
    }
  }
`;
const TextLink = styled(Link)`
  display: inline-flex;
  gap: 28px;
  align-items: center;
  color: var(--green);
  text-decoration: none;
  border-bottom: 1px solid var(--gold);
  padding: 12px 0;
  font-size: 16px;
  &:hover {
    color: var(--gold);
  }
`;
const Figure = styled.figure`
  margin: 0;
  min-width: 0;
  > a {
    display: block;
    background: var(--surface);
    height: min(630px, 61vw);
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 57%;
    display: block;
    transition: transform 0.5s;
  }
  > a:hover img {
    transform: scale(1.015);
  }
  figcaption {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 20px;
    padding-top: 14px;
    font-size: 14px;
  }
  figcaption a {
    text-decoration: none;
    font: 20px var(--serif);
  }
  .number {
    font:
      14px ui-monospace,
      monospace;
    color: var(--gold);
    margin-right: 14px;
  }
  .year {
    color: var(--muted);
    font: italic 16px var(--serif);
  }
  @media (max-width: 700px) {
    > a {
      height: auto;
      aspect-ratio: 4/5;
    }
  }
`;
const Random = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 12px;
  padding: 14px 0;
  background: none;
  border: 0;
  color: var(--green);
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  span {
    font-size: 24px;
    color: var(--gold);
  }
  &:hover {
    text-decoration: underline;
    text-underline-offset: 5px;
  }
  @media (max-width: 700px) {
    margin-top: 12px;
  }
`;
const Links = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--rule);
  margin-top: 52px;
  padding-top: 30px;
  gap: 32px;
  a {
    text-decoration: none;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 9px 16px;
  }
  h2 {
    font-size: 25px;
    margin: 0;
  }
  p {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.6;
  }
  span {
    grid-column: 2;
    grid-row: 1/3;
    align-self: center;
    color: var(--gold);
  }
  a:hover h2 {
    text-decoration: underline;
    text-underline-offset: 5px;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    margin-top: 32px;
    padding-top: 24px;
    gap: 26px;
    h2 {
      font-size: 23px;
    }
  }
`;
export default function Home() {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const structure = choices[index];
  function another() {
    setFailed(false);
    setIndex(
      (current) =>
        (current + 1 + Math.floor(Math.random() * (choices.length - 1))) %
        choices.length
    );
  }
  return (
    <Page>
      <Hero>
        <Intro>
          <span className="place">Cal Poly · San Luis Obispo</span>
          <h1>
            Poly
            <br /> Canyon
          </h1>
          <p>
            Student-built architecture in the hills at Cal Poly. A guide to the
            structures and the research behind them.
          </p>
          <TextLink to="/structures">
            Browse structures <span aria-hidden="true">↗</span>
          </TextLink>
        </Intro>
        <Figure>
          <Link
            to={`/structures/${structure.url}`}
            aria-label={`Explore ${structure.title}`}
          >
            {failed ? (
              <p>Photograph unavailable. Read about {structure.title} →</p>
            ) : (
              <img
                key={structure.number}
                {...getResponsiveImage(
                  mainImages[structure.image_key],
                  '(max-width:700px) calc(100vw - 40px), (max-width:1280px) 54vw, 650px'
                )}
                alt={structure.title}
                {...{ fetchpriority: 'high' }}
                decoding="async"
                onError={() => setFailed(true)}
              />
            )}
          </Link>
          <figcaption aria-live="polite">
            <Link to={`/structures/${structure.url}`}>
              <span className="number">
                {String(structure.number).padStart(2, '0')}
              </span>
              {structure.title}
            </Link>
            <span className="year">{structure.year}</span>
          </figcaption>
          <Random onClick={another} aria-label="Show another structure">
            Show me another <span aria-hidden="true">↻</span>
          </Random>
        </Figure>
      </Hero>
      <Links>
        <Link to="/about#visiting">
          <h2>Into the canyon</h2>
          <p>Walking directions & visiting information</p>
          <span aria-hidden="true">↗</span>
        </Link>
        <Link to="/about#history">
          <h2>A place to experiment</h2>
          <p>The history of Poly Canyon</p>
          <span aria-hidden="true">↗</span>
        </Link>
        <Link to="/app">
          <h2>The pocket companion</h2>
          <p>Maps & structures on your iPhone</p>
          <span aria-hidden="true">↗</span>
        </Link>
      </Links>
    </Page>
  );
}

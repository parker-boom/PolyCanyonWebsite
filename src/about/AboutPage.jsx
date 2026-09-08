import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  mainImages,
  getResponsiveImage,
} from '../structures/images/structureImages.js';
import { intro, visit, history, project } from './articleContent.js';
const Page = styled.article`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;
  padding: 40px 0 56px;
  .opening {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 380px;
    gap: 64px;
    align-items: start;
    padding-bottom: 36px;
    border-bottom: 1px solid var(--line);
  }
  h1 {
    font-size: clamp(32px, 3.6vw, 44px);
    line-height: 1.15;
    letter-spacing: -0.04em;
    font-weight: 550;
    margin: 0 0 24px;
    color: var(--green);
  }
  figure {
    margin: 0;
  }
  figure img {
    width: 100%;
    height: auto;
    aspect-ratio: 1.6;
    object-fit: cover;
    object-position: center;
    display: block;
  }
  figcaption {
    font-size: 12px;
    color: var(--muted);
    margin-top: 10px;
  }
  p,
  li {
    font-size: 16px;
    line-height: 1.8;
    margin: 0 0 20px;
  }
  a {
    color: var(--green);
    text-underline-offset: 4px;
  }
  a:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 4px;
  }
  .reading {
    max-width: 700px;
    margin: 0 auto;
  }
  h2 {
    font-size: 25px;
    letter-spacing: -0.025em;
    font-weight: 550;
    line-height: 1.3;
    margin: 36px 0 18px;
    color: var(--green);
  }
  .sources {
    font-size: 13px;
    color: var(--muted);
  }
  section {
    scroll-margin-top: 24px;
  }
  #visit {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--line);
  }
  #project {
    margin-top: 36px;
    padding-top: 4px;
    border-top: 1px solid var(--line);
  }
  @media (max-width: 760px) {
    .opening {
      gap: 28px;
    }
    .opening p {
      font-size: 15px;
    }
  }
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    padding-top: 26px;
    .opening {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 24px;
    }
    h1 {
      font-size: 32px;
    }
    figure img {
      aspect-ratio: 1.6;
    }
    .opening p:last-child {
      margin-bottom: 0;
    }
    p,
    li {
      font-size: 15px;
    }
  }
`;
export default function AboutPage() {
  return (
    <Page>
      <header className="opening">
        <div>
          <h1>About Poly Canyon</h1>
          <div dangerouslySetInnerHTML={{ __html: intro }} />
          <a href="#visit">Plan a walk from campus</a>
        </div>
        <figure>
          <Link
            to="/structures/cantileverDeck"
            aria-label="Read about Cantilever Deck"
          >
            <img
              {...getResponsiveImage(
                mainImages['M-8'],
                '(max-width:600px) calc(100vw - 36px), 460px'
              )}
              width="1080"
              height="720"
              alt="Cantilever Deck among the canyon’s grassy hills"
            />
          </Link>
          <figcaption>Cantilever Deck and the landscape around it.</figcaption>
        </figure>
      </header>
      <div className="reading">
        <div dangerouslySetInnerHTML={{ __html: visit }} />
        <div dangerouslySetInnerHTML={{ __html: history }} />
        <div dangerouslySetInnerHTML={{ __html: project }} />
      </div>
    </Page>
  );
}

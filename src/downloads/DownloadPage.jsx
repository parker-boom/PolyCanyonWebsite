import React from 'react';
import { Link } from 'react-router-dom';
import { FaApple } from 'react-icons/fa';
import structures360 from '../assets/generated/app/current/structures-360.webp';
import structures720 from '../assets/generated/app/current/structures-720.webp';
import entry360 from '../assets/generated/app/current/entry-arch-360.webp';
import entry720 from '../assets/generated/app/current/entry-arch-720.webp';
import map360 from '../assets/generated/app/current/map-360.webp';
import map720 from '../assets/generated/app/current/map-720.webp';
import {
  PageContainer,
  Introduction,
  Copy,
  DownloadButton,
  Screens,
  Notes,
  Footnote,
} from './DownloadPage.styles.js';
const screenshots = [
  {
    small: structures360,
    large: structures720,
    alt: 'The Poly Canyon app’s photographic collection of numbered structures',
  },
  {
    small: entry360,
    large: entry720,
    alt: 'Entry Arch in the app, with its photograph, year, and offline story',
  },
  {
    small: map360,
    large: map720,
    alt: 'The app’s illustrated canyon map connecting numbered structures along the trails',
  },
];
export default function DownloadPage() {
  return (
    <PageContainer>
      <Introduction>
        <Copy>
          <h1>
            Poly Canyon
            <br />
            for iPhone
          </h1>
        </Copy>
        <div>
          <p>
            Take the canyon’s illustrated map, photographs, and stories with
            you, even offline.
          </p>
          <DownloadButton
            href="https://apps.apple.com/us/app/poly-canyon/id6499063781"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Poly Canyon on the App Store (opens in a new tab)"
          >
            <FaApple aria-hidden="true" />
            <span>Get it on the App Store</span>
            <span aria-hidden="true">↗</span>
          </DownloadButton>
        </div>
      </Introduction>
      <Screens
        role="region"
        aria-label="Poly Canyon app screenshots"
        tabIndex={0}
      >
        {screenshots.map((screen, i) => (
          <figure key={screen.small}>
            <img
              src={screen.small}
              srcSet={`${screen.small} 360w, ${screen.large} 720w`}
              sizes="(max-width:360px) 76vw, (max-width:760px) 280px, (max-width:900px) 28vw, 296px"
              width="1206"
              height="2622"
              alt={screen.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </figure>
        ))}
      </Screens>
      <Notes>
        <p>
          Find structures by their map number, or browse the photographs before
          you go. Visits are optional and use location only while the app is
          open.
        </p>
        <Link to="/about#visit">Walking directions ↗</Link>
      </Notes>
      <Footnote>
        <span>
          Original reports and further research are in the{' '}
          <Link to="/structures">web archive</Link>.
        </span>
        <span>
          <Link to="/support">App support</Link>
          <Link to="/privacy">Privacy</Link>
        </span>
      </Footnote>
    </PageContainer>
  );
}

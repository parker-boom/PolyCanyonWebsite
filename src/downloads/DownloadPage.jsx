import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaApple, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import structures360 from '../assets/generated/app/release-6/structures-360.webp';
import structures720 from '../assets/generated/app/release-6/structures-720.webp';
import story360 from '../assets/generated/app/release-6/shell-house-360.webp';
import story720 from '../assets/generated/app/release-6/shell-house-720.webp';
import map360 from '../assets/generated/app/release-6/map-360.webp';
import map720 from '../assets/generated/app/release-6/map-720.webp';
import {
  PageContainer,
  Introduction,
  Copy,
  DownloadButton,
  Screens,
  ScreenControls,
  Phone,
  Notes,
  Footnote,
} from './DownloadPage.styles.js';
const screenshots = [
  {
    caption: 'Browse by name or number.',
    small: structures360,
    large: structures720,
    alt: 'The Poly Canyon app’s photographic collection of numbered structures',
  },
  {
    caption: 'Read stories offline.',
    small: story360,
    large: story720,
    alt: 'Shell House in the app, with its photographs, year, and offline story',
  },
  {
    caption: 'Follow the illustrated map.',
    small: map360,
    large: map720,
    alt: 'The app’s illustrated canyon map connecting numbered structures along the trails',
  },
];
export default function DownloadPage() {
  const screensRef = useRef(null);
  const [active, setActive] = useState(0);
  const moveTo = (index) => {
    const strip = screensRef.current;
    const target = strip.children[index];
    strip.scrollTo({
      left: target.offsetLeft - strip.children[0].offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };
  const trackScreen = () => {
    const strip = screensRef.current;
    const start =
      strip.getBoundingClientRect().left +
      parseFloat(getComputedStyle(strip).paddingLeft);
    const distances = [...strip.children].map((child) =>
      Math.abs(child.getBoundingClientRect().left - start)
    );
    setActive(distances.indexOf(Math.min(...distances)));
  };
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
        ref={screensRef}
        onScroll={trackScreen}
        id="app-screens"
        role="region"
        aria-label="Poly Canyon app screenshots"
        tabIndex={0}
      >
        {screenshots.map((screen, i) => (
          <figure key={screen.small}>
            <Phone>
              <div className="display">
                <img
                  src={screen.small}
                  srcSet={`${screen.small} 360w, ${screen.large} 720w`}
                  sizes="(max-width:360px) 76vw, (max-width:760px) 280px, (max-width:900px) 28vw, 296px"
                  width="1320"
                  height="2868"
                  alt={screen.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </Phone>
            <figcaption>{screen.caption}</figcaption>
          </figure>
        ))}
      </Screens>
      <ScreenControls aria-label="App screenshot navigation">
        <button
          aria-label="Previous app screenshot"
          aria-controls="app-screens"
          disabled={active === 0}
          onClick={() => moveTo(active - 1)}
        >
          <FaArrowLeft aria-hidden="true" />
        </button>
        <span aria-live="polite">
          {active + 1} / {screenshots.length}
        </span>
        <button
          aria-label="Next app screenshot"
          aria-controls="app-screens"
          disabled={active === screenshots.length - 1}
          onClick={() => moveTo(active + 1)}
        >
          <FaArrowRight aria-hidden="true" />
        </button>
      </ScreenControls>
      <Notes>
        <p>Visits are optional and use location only while the app is open.</p>
        <Link to="/about#visit">Walking directions</Link>
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

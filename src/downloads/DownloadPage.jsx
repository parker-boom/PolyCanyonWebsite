import React from 'react';
import { Link } from 'react-router-dom';
import { FaApple } from 'react-icons/fa';
import structures from '../assets/generated/app/structures-600.webp';
import structuresLarge from '../assets/generated/app/structures-900.webp';
import map from '../assets/generated/app/map-600.webp';
import mapLarge from '../assets/generated/app/map-900.webp';
import entryArch from '../assets/generated/app/entry-arch-600.webp';
import entryArchLarge from '../assets/generated/app/entry-arch-900.webp';
import {
  PageContainer,
  Introduction,
  Preview,
  DownloadButton,
  Details,
  UtilityLinks,
  ScreenStory,
} from './DownloadPage.styles.js';

const screenProps = (src, large, alt) => ({
  src,
  srcSet: `${src} 600w, ${large} 900w`,
  sizes: '(max-width: 700px) 260px, 280px',
  width: 1206,
  height: 2622,
  alt,
  decoding: 'async',
});

export default function DownloadPage() {
  return (
    <PageContainer>
      <Introduction>
        <div>
          <h1>
            Poly Canyon
            <br />
            for iPhone
          </h1>
          <p>
            The canyon’s structures, photographs, and stories. Ready to explore,
            on the trail or from home.
          </p>
          <DownloadButton
            href="https://apps.apple.com/us/app/poly-canyon/id6499063781"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Poly Canyon on the App Store (opens in a new tab)"
          >
            <FaApple aria-hidden="true" /> Get it on the App Store{' '}
            <span aria-hidden="true">↗</span>
          </DownloadButton>
          <UtilityLinks aria-label="App information">
            <Link to="/support">Support</Link>
            <Link to="/privacy">Privacy</Link>
          </UtilityLinks>
        </div>
        <figure>
          <Preview
            {...screenProps(
              structures,
              structuresLarge,
              'The iPhone app’s photographic Structures collection, showing Entry Arch, Techite Bridge, Blade, and Spire Array'
            )}
          />
          <figcaption>
            Find a structure by photograph, name, or map number.
          </figcaption>
        </figure>
      </Introduction>
      <Details>
        <ScreenStory>
          <div>
            <h2>Find your way</h2>
            <p>
              An illustrated canyon map connects the structures and paths. Turn
              on location to see where you are and optionally mark visits while
              the app is open.
            </p>
          </div>
          <Preview
            {...screenProps(
              map,
              mapLarge,
              'The app’s illustrated map with numbered structures along the canyon paths'
            )}
            loading="lazy"
          />
          <Link to="/about#visiting">Walking directions →</Link>
        </ScreenStory>
        <ScreenStory>
          <div>
            <h2>Look a little closer</h2>
            <p>
              Photographs and stories bring each structure into focus. They’re
              stored in the app for offline reading—download it before heading
              into the canyon.
            </p>
          </div>
          <Preview
            {...screenProps(
              entryArch,
              entryArchLarge,
              'Entry Arch in the app, with a large photograph and the story of its stonework'
            )}
            loading="lazy"
          />
          <Link to="/structures">Explore the full research archive →</Link>
        </ScreenStory>
      </Details>
    </PageContainer>
  );
}

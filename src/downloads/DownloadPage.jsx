import React from 'react';
import { Link } from 'react-router-dom';
import { FaApple } from 'react-icons/fa';
import iosPreview from '../assets/generated/app/ios.webp';
import {
  PageContainer,
  Introduction,
  Copy,
  DownloadButton,
  Preview,
  Features,
  Footnote,
} from './DownloadPage.styles.js';

export default function DownloadPage() {
  return (
    <PageContainer>
      <Introduction>
        <Copy>
          <h1>
            Poly Canyon
            <br />
            for iPhone.
          </h1>
          <p>
            Find your way among the structures, put a name to what you see, and
            read the stories behind it.
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
        </Copy>
        <Preview>
          <img
            src={iosPreview}
            alt="The Poly Canyon iPhone app showing its aerial trail map, numbered structures, and nearby places"
            width="540"
            height="960"
            decoding="async"
          />
        </Preview>
        <div className="app-details">
          <Features>
            <section>
              <h2>On the trail</h2>
              <p>
                A detailed map shows the paths, structures, and your location.
                Keep track of the places you have visited as you explore.
              </p>
            </section>
            <section>
              <h2>From anywhere</h2>
              <p>
                Browse photographs and structure histories, find your favorites,
                and get to know the canyon before you arrive.
              </p>
            </section>
          </Features>
          <Footnote>
            Download before your visit; cell service in the canyon can be
            spotty. <Link to="/about#visit">Walking directions ↗</Link>
          </Footnote>
        </div>
      </Introduction>
      <Footnote $footer>
        <span>
          More photographs, original reports, and project research are in the{' '}
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

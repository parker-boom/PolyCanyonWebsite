import React from 'react';
import { Link } from 'react-router-dom';
import { FaApple } from 'react-icons/fa';
import iosPreview from '../assets/generated/app/ios.webp';
import {
  PageContainer,
  Introduction,
  Preview,
  DownloadButton,
  Details,
  UtilityLinks,
} from './DownloadPage.styles.js';

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
            A map of the paths and structures, with photographs and the history
            behind what you find.
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
            src={iosPreview}
            alt="Poly Canyon iPhone app showing its map of the canyon’s structures and trails"
            width="540"
            height="960"
            decoding="async"
          />
        </figure>
      </Introduction>
      <Details>
        <section>
          <h2>On the trail</h2>
          <p>
            Find your location on the canyon map, identify nearby structures,
            and keep track of those you’ve visited. Historical photographs and
            structure descriptions give context to the work around you.
          </p>
          <p>
            Download the app before your visit; cell service can be spotty in
            the canyon.
          </p>
          <Link to="/about#visiting">Walking directions →</Link>
        </section>
        <section>
          <h2>From wherever you are</h2>
          <p>
            Explore the map remotely, find favorite structures, and read their
            histories. The website’s archive includes longer research,
            historical photographs, and links to original project reports.
          </p>
          <Link to="/structures">Browse the structures →</Link>
        </section>
      </Details>
    </PageContainer>
  );
}

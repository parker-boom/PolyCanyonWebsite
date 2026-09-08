import React, { useState } from 'react';
import useAccessoryDetail from '../hooks/useAccessoryDetail.js';
import {
  accessoryImages,
  getResponsiveImage,
} from '../images/structureImages.js';
import DetailLocation from '../info/DetailLocation.jsx';
import '../info/Detail.css';

function AccessoryImage({ structure }) {
  const [failed, setFailed] = useState(false);
  const key = structure.image.split('/accessory/').pop().split('.')[0];
  return (
    <div className="detail-accessory-image">
      {failed ? (
        <p>This photograph could not load.</p>
      ) : (
        <img
          {...getResponsiveImage(
            accessoryImages[key],
            '(max-width: 700px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 96px), 1184px'
          )}
          alt={structure.name}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
export default function AccessoryStructureInfo() {
  const {
    currentStructure: structure,
    handleNext,
    handlePrev,
    backToList,
  } = useAccessoryDetail();
  if (!structure)
    return (
      <article className="detail-page">
        <button className="detail-return" onClick={backToList}>
          ← Structures
        </button>
        <h1>Accessory structures are unavailable</h1>
      </article>
    );
  return (
    <article className="detail-page">
      <button
        className="detail-return"
        aria-label="Back to structures"
        onClick={backToList}
      >
        ← Structures
      </button>
      <header className="detail-heading">
        <h1>{structure.name}</h1>
      </header>
      <AccessoryImage key={structure.name} structure={structure} />
      <dl className="detail-facts">
        {structure.year && (
          <div>
            <dt>Year</dt>
            <dd>{structure.year}</dd>
          </div>
        )}
        <div>
          <dt>Status</dt>
          <dd>Accessory</dd>
        </div>
      </dl>
      <div className="detail-content">
        <div className="detail-research">
          <p className="detail-intro">{structure.description}</p>
        </div>
        <aside className="detail-side">
          <section>
            <h2>Location</h2>
            <DetailLocation
              key={structure.name}
              location={structure.location}
              name={structure.name}
            />
          </section>
        </aside>
      </div>
      <nav className="detail-nav" aria-label="Accessory structures">
        <button
          onClick={() => {
            handlePrev();
            window.scrollTo(0, 0);
          }}
          aria-label="Previous structure"
        >
          ← Previous
        </button>
        <button
          onClick={() => {
            handleNext();
            window.scrollTo(0, 0);
          }}
          aria-label="Next structure"
        >
          Next →
        </button>
      </nav>
    </article>
  );
}

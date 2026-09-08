import React, { useRef, useState } from 'react';
import useStructureDetail from '../hooks/useStructureDetail.js';
import DetailLocation from './DetailLocation.jsx';
import PhotoViewer from './PhotoViewer.jsx';
import ContactLink from '../../components/ContactLink.jsx';
import './Detail.css';

function Photograph({ photo, image, onOpen, triggerRef }) {
  const [result, setResult] = useState({ path: photo.path, state: 'loading' });
  const state = result.path === photo.path ? result.state : 'loading';
  return (
    <button
      ref={triggerRef}
      className="detail-photo-trigger"
      onClick={onOpen}
      aria-label="Open photograph full screen"
    >
      {state !== 'error' && (
        <img
          {...image}
          sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1280px) 58vw, 710px"
          alt={photo.description}
          style={{ objectFit: 'contain' }}
          decoding="async"
          {...{ fetchpriority: 'high' }}
          onLoad={() => setResult({ path: photo.path, state: 'loaded' })}
          onError={() => setResult({ path: photo.path, state: 'error' })}
        />
      )}
      {state !== 'loaded' && (
        <span className="detail-photo-loading">
          {state === 'loading'
            ? 'Loading photograph…'
            : 'This photograph could not load. Try the next photograph.'}
        </span>
      )}
      <span className="detail-photo-open">View photograph ↗</span>
    </button>
  );
}

export default function StructureInfo() {
  const detail = useStructureDetail();
  const photoTrigger = useRef(null);
  const {
    structure,
    backToList,
    currentImageIndex,
    loadedImages,
    fullscreen,
    setFullscreen,
    handlePrevImage,
    handleNextImage,
    handlePrevStructure,
    handleNextStructure,
    getValidLinks,
    handleShare,
    shareStatus,
    getPrevStructureNumber,
    getNextStructureNumber,
  } = detail;
  if (!structure)
    return (
      <article className="detail-page">
        <button className="detail-return" onClick={backToList}>
          ← Back to structures
        </button>
        <h1>Structure not found</h1>
      </article>
    );
  const photo = structure.images[currentImageIndex];
  const links = getValidLinks();
  const builders =
    structure.advisor_builders?.filter(
      (person) => !person.role.includes('Advisor')
    ) || [];
  const advisors =
    structure.advisor_builders?.filter((person) =>
      person.role.includes('Advisor')
    ) || [];
  return (
    <>
      <article
        className="detail-page"
        aria-hidden={fullscreen || undefined}
        inert={fullscreen ? '' : undefined}
      >
        <button
          className="detail-return"
          aria-label="Back to structures"
          onClick={backToList}
        >
          ← Structures
        </button>
        <div className="detail-top">
          <header className="detail-heading">
            <span className="detail-number">
              {String(structure.number).padStart(2, '0')}
            </span>
            <h1>{structure.names[0]}</h1>
          </header>
          {photo ? (
            <figure
              className="detail-gallery"
              style={{
                '--photo-ratio':
                  (loadedImages[currentImageIndex]?.foreground?.width || 2) /
                  (loadedImages[currentImageIndex]?.foreground?.height || 3),
              }}
            >
              <Photograph
                triggerRef={photoTrigger}
                photo={photo}
                image={loadedImages[currentImageIndex]?.foreground}
                onOpen={() => setFullscreen(true)}
              />
              <figcaption className="detail-caption">
                <p>{photo.description}</p>
                <div className="detail-photo-controls">
                  {structure.images.length > 1 && (
                    <button
                      className="detail-icon-button"
                      onClick={handlePrevImage}
                      aria-label="Previous photograph"
                    >
                      ←
                    </button>
                  )}
                  <span>
                    {currentImageIndex + 1} / {structure.images.length}
                  </span>
                  {structure.images.length > 1 && (
                    <button
                      className="detail-icon-button"
                      onClick={handleNextImage}
                      aria-label="Next photograph"
                    >
                      →
                    </button>
                  )}
                </div>
              </figcaption>
            </figure>
          ) : (
            <p className="detail-empty">
              No photographs are available for this structure.
            </p>
          )}
          <dl className="detail-facts">
            {structure.year && (
              <div>
                <dt>Year</dt>
                <dd>{structure.year}</dd>
              </div>
            )}
            {structure.status && (
              <div>
                <dt>Status</dt>
                <dd>{structure.status}</dd>
              </div>
            )}
            {structure.names.length > 1 && (
              <div>
                <dt>Also known as</dt>
                <dd>{structure.names.slice(1).join(', ')}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="detail-content">
          <div className="detail-research">
            <p className="detail-intro">{structure.description}</p>
            {structure.extended_description
              ?.split(/\n\s*\n/)
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
            <details className="detail-credits">
              <summary>Research & credits</summary>
              <p>
                The research into these structures comes from historical records
                and archives: original theses, historical images, articles and
                resources. Available sources are linked on each structure’s
                page.
              </p>
              <p>
                Thanks to Danny Wills and his 4th Year Architecture Studio for
                their comprehensive compilation of historical resources; Jesse
                Vestermark for creating the Poly Canyon Research Guide and
                preserving access to original theses; and the CAED Department
                for their collective knowledge and ongoing contributions.
              </p>
              <p>
                This compilation is a best effort representation of the
                structures’ history. Some details may be incomplete or subject
                to interpretation. To offer corrections or additional
                information, <ContactLink>contact us</ContactLink>.
              </p>
            </details>
          </div>
          <aside className="detail-side">
            {links.length > 0 && (
              <section>
                <h2>Resources</h2>
                <ul className="detail-sources">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.title} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {builders.length > 0 && (
              <section>
                <h2>Builders</h2>
                {builders.map((person, index) => (
                  <p key={index}>{person.name}</p>
                ))}
              </section>
            )}
            {advisors.length > 0 && (
              <section>
                <h2>Advisors</h2>
                {advisors.map((person, index) => (
                  <p key={index}>{person.name}</p>
                ))}
              </section>
            )}
            {structure.location && (
              <section>
                <h2>Location</h2>
                <DetailLocation
                  location={structure.location}
                  name={structure.names[0]}
                />
              </section>
            )}
            <button className="detail-share" onClick={handleShare}>
              Share structure
            </button>
            {shareStatus && (
              <p className="detail-status" role="status">
                {shareStatus}
              </p>
            )}
          </aside>
        </div>
        <nav className="detail-nav" aria-label="Adjacent structures">
          <button onClick={handlePrevStructure} aria-label="Previous structure">
            ←{' '}
            <span>
              Previous · {String(getPrevStructureNumber()).padStart(2, '0')}
            </span>
          </button>
          <button onClick={handleNextStructure} aria-label="Next structure">
            <span>
              Next · {String(getNextStructureNumber()).padStart(2, '0')}
            </span>{' '}
            →
          </button>
        </nav>
      </article>
      {fullscreen && photo && (
        <PhotoViewer
          photo={photo}
          image={loadedImages[currentImageIndex]?.foreground}
          index={currentImageIndex}
          count={structure.images.length}
          name={structure.names[0]}
          onClose={() => {
            setFullscreen(false);
            requestAnimationFrame(() =>
              photoTrigger.current?.focus({ preventScroll: true })
            );
          }}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </>
  );
}

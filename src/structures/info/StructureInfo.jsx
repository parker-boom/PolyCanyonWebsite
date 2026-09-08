import React, { useEffect, useRef, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaExpand,
  FaMinus,
  FaPlus,
} from 'react-icons/fa';
import * as S from './Detail.styles.js';
import { useMediaQuery } from 'react-responsive';
import useStructureDetail from '../hooks/useStructureDetail.js';
import useDialog from '../hooks/useDialog.js';
import GoogleMapLandmark from '../extraComponents/GoogleMapLandmark.jsx';
import ContactLink from '../../components/ContactLink.jsx';

export default function StructureInfo() {
  const d = useStructureDetail();
  const compact = useMediaQuery({ maxWidth: 700 });
  const { structure, currentImageIndex: index, fullscreen } = d;
  const [zoom, setZoom] = useState(false);
  const [failed, setFailed] = useState({});
  const touch = useRef(null);
  useEffect(() => setZoom(false), [index]);
  const dialogRef = useDialog(fullscreen, () => d.setFullscreen(false));
  useEffect(() => {
    if (!fullscreen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [fullscreen]);
  const select = (selected) => {
    for (
      let i = 0;
      i <
      (selected - index + structure.images.length) % structure.images.length;
      i++
    )
      d.handleNextImage();
    setZoom(false);
  };
  const move = (next) => {
    setZoom(false);
    next ? d.handleNextImage() : d.handlePrevImage();
  };
  const onTouchStart = (event) => {
    touch.current =
      event.touches.length === 1
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : null;
  };
  const onTouchEnd = (event) => {
    if (!touch.current || zoom) return;
    const dx = event.changedTouches[0].clientX - touch.current.x;
    const dy = event.changedTouches[0].clientY - touch.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0);
    touch.current = null;
  };
  if (!structure)
    return (
      <S.Page>
        <S.Button onClick={d.backToList}>Back to structures</S.Button>
        <h1>Structure not found</h1>
      </S.Page>
    );
  const current = structure.images[index];
  const advisors = structure.advisor_builders
    ?.filter((p) => p.role.includes('Advisor'))
    .map((p) => p.name)
    .join(', ');
  const builders = structure.advisor_builders
    ?.filter((p) => !p.role.includes('Advisor'))
    .map((p) => p.name)
    .join(', ');
  const facts = [
    ['Year', structure.year],
    ['Also known as', structure.names.slice(1).join(', ')],
    ['Builders', builders],
    ['Advisors', advisors],
    ['Status', structure.status],
  ];
  const photo =
    current && !failed[index] ? (
      <img
        {...d.loadedImages[index]?.foreground}
        sizes={fullscreen ? '100vw' : '(max-width: 700px) 100vw, 750px'}
        alt={current.description || structure.names[0]}
        decoding="async"
        onError={() => setFailed((v) => ({ ...v, [index]: true }))}
      />
    ) : (
      <span>
        {current
          ? 'This photograph could not load.'
          : 'No photographs are available for this structure.'}
      </span>
    );
  return (
    <>
      <S.Page
        aria-hidden={fullscreen ? true : undefined}
        inert={fullscreen ? '' : undefined}
      >
        <S.Topline>
          <S.Button aria-label="Back to structures" onClick={d.backToList}>
            <FaArrowLeft /> Structures
          </S.Button>
          <S.Button onClick={d.handleShare} aria-label="Share structure">
            Share
          </S.Button>
        </S.Topline>
        {d.shareStatus && <p role="status">{d.shareStatus}</p>}
        <S.Header>
          <span>{String(structure.number).padStart(2, '0')}</span>
          <h1>{structure.names[0]}</h1>
        </S.Header>
        <S.DetailGrid>
          <div className="gallery">
            <S.Figure>
              {current ? (
                <S.PhotoButton
                  aria-label="Toggle fullscreen mode"
                  onClick={() => {
                    setZoom(false);
                    d.toggleFullscreen();
                  }}
                >
                  {photo}
                </S.PhotoButton>
              ) : (
                <p>No photographs are available for this structure.</p>
              )}
              {current && (
                <S.Caption>
                  <span>{current.description}</span>
                  <div>
                    <span>
                      {index + 1} / {structure.images.length}
                    </span>
                    {structure.images.length > 1 && (
                      <>
                        <S.Button
                          aria-label="Previous photograph"
                          onClick={() => move(false)}
                        >
                          <FaArrowLeft />
                        </S.Button>
                        <S.Button
                          aria-label="Next photograph"
                          onClick={() => move(true)}
                        >
                          <FaArrowRight />
                        </S.Button>
                      </>
                    )}
                    <S.Button
                      aria-label="Expand photograph"
                      onClick={() => {
                        setZoom(false);
                        d.toggleFullscreen();
                      }}
                    >
                      <FaExpand />
                    </S.Button>
                  </div>
                </S.Caption>
              )}
            </S.Figure>
            {structure.images.length > 1 && (
              <S.Thumbnails aria-label="Photographs">
                {structure.images.map((image, i) => (
                  <button
                    key={image.path}
                    type="button"
                    aria-label={`View photograph ${i + 1}`}
                    aria-current={i === index ? 'true' : undefined}
                    onClick={() => select(i)}
                  >
                    <img
                      {...d.loadedImages[i]?.foreground}
                      sizes="78px"
                      loading="lazy"
                      alt=""
                    />
                  </button>
                ))}
              </S.Thumbnails>
            )}
          </div>

          <S.Research>
            {compact && (
              <S.Identity>
                <div>
                  <span>
                    {[structure.year, structure.status]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                  {structure.location?.latitude !== 0 && structure.location && (
                    <a href="#structure-location">Location ↓</a>
                  )}
                </div>
                {structure.names.length > 1 && (
                  <p>Also known as {structure.names.slice(1).join(', ')}</p>
                )}
              </S.Identity>
            )}
            <S.Story>
              <p>{structure.description}</p>
              {structure.extended_description
                ?.split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, i) => (
                  <p key={i}>{paragraph.trim()}</p>
                ))}
            </S.Story>
            {compact && (builders || advisors) && (
              <S.SupportingPeople>
                <dl>
                  {[
                    ['Builders', builders],
                    ['Advisors', advisors],
                  ]
                    .filter(([, value]) => value)
                    .map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                </dl>
              </S.SupportingPeople>
            )}
            {d.getValidLinks().length > 0 && (
              <>
                <h2>Sources & further reading</h2>
                <S.Sources>
                  {d.getValidLinks().map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.title} ↗
                      </a>
                    </li>
                  ))}
                </S.Sources>
              </>
            )}
            <S.Credits>
              <summary>Research & credits</summary>
              <p>
                The research comes from historical records and archives,
                including original theses, historical images, articles and
                official documentation. Available sources are linked above.
              </p>
              <p>
                Special thanks to Danny Wills and his 4th Year Architecture
                Studio for their comprehensive compilation of historical
                resources; Jesse Vestermark for creating the Poly Canyon
                Research Guide and preserving access to original theses; and the
                CAED Department for their collective knowledge and ongoing
                contributions.
              </p>
              <p>
                Some details may be incomplete or subject to interpretation.
                This compilation is a best effort representation of the
                structures’ history, and should not be considered definitive. To
                offer corrections or additional information,{' '}
                <ContactLink>contact us</ContactLink>.
              </p>
            </S.Credits>
            {compact && structure.location && (
              <S.Location id="structure-location">
                {structure.location.latitude === 0 ? (
                  <p>Location unknown</p>
                ) : (
                  <GoogleMapLandmark
                    {...structure.location}
                    structureName={structure.names[0]}
                  />
                )}
              </S.Location>
            )}
          </S.Research>
          {!compact && (
            <S.Facts aria-label="Structure details">
              <dl>
                {facts
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
              </dl>
              {structure.location && (
                <div id="structure-location">
                  {structure.location.latitude === 0 ? (
                    <p>Location unknown</p>
                  ) : (
                    <GoogleMapLandmark
                      {...structure.location}
                      structureName={structure.names[0]}
                    />
                  )}
                </div>
              )}
            </S.Facts>
          )}
        </S.DetailGrid>

        <S.BottomNav aria-label="Adjacent structures">
          <S.Button
            aria-label="Previous structure"
            onClick={d.handlePrevStructure}
          >
            <FaArrowLeft />{' '}
            {String(d.getPrevStructureNumber()).padStart(2, '0')} Previous
          </S.Button>
          <S.Button aria-label="Next structure" onClick={d.handleNextStructure}>
            Next {String(d.getNextStructureNumber()).padStart(2, '0')}{' '}
            <FaArrowRight />
          </S.Button>
        </S.BottomNav>
      </S.Page>
      {fullscreen && (
        <S.Viewer
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
        >
          <S.ViewerBar>
            <span>{structure.names[0]}</span>
            <div>
              <S.Button
                aria-label={zoom ? 'Zoom out' : 'Zoom in'}
                onClick={() => setZoom((v) => !v)}
              >
                {zoom ? <FaMinus /> : <FaPlus />}
              </S.Button>
              <S.Button
                aria-label="Exit fullscreen mode"
                onClick={() => d.setFullscreen(false)}
              >
                <FaTimes />
              </S.Button>
            </div>
          </S.ViewerBar>
          <S.ViewerPhoto
            $zoom={zoom}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onDoubleClick={() => setZoom((v) => !v)}
          >
            {photo}
          </S.ViewerPhoto>
          <S.ViewerBar>
            <p>{current?.description}</p>
            <div>
              <S.Button
                aria-label="Previous photograph"
                onClick={() => move(false)}
              >
                <FaArrowLeft />
              </S.Button>
              <span>
                {index + 1} / {structure.images.length}
              </span>
              <S.Button aria-label="Next photograph" onClick={() => move(true)}>
                <FaArrowRight />
              </S.Button>
            </div>
          </S.ViewerBar>
        </S.Viewer>
      )}
    </>
  );
}

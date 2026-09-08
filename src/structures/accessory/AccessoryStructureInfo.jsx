import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import * as S from '../info/Detail.styles.js';
import useAccessoryDetail from '../hooks/useAccessoryDetail.js';
import {
  accessoryImages,
  getResponsiveImage,
} from '../images/structureImages.js';
import GoogleMapLandmark from '../extraComponents/GoogleMapLandmark.jsx';
export default function AccessoryStructureInfo() {
  const {
    currentStructure: structure,
    previousStructure,
    nextStructure,
    handleNext,
    handlePrev,
    backToList,
  } = useAccessoryDetail();
  if (!structure)
    return (
      <S.Page>
        <S.Button onClick={backToList}>Back to structures</S.Button>
        <h1>Accessory structures are unavailable</h1>
      </S.Page>
    );
  const src =
    accessoryImages[structure.image.split('/accessory/').pop().split('.')[0]];
  return (
    <S.Page>
      <S.Topline>
        <S.Button aria-label="Back to structures" onClick={backToList}>
          <FaArrowLeft /> Structures
        </S.Button>
      </S.Topline>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 12px' }}>
        Smaller structures &amp; connections
      </p>
      <S.Header>
        <h1>{structure.name}</h1>
      </S.Header>
      <S.Figure>
        <S.PhotoButton as="div" style={{ cursor: 'default' }}>
          <img
            {...getResponsiveImage(src, '(max-width: 1240px) 100vw, 1160px')}
            decoding="async"
            alt={structure.name}
          />
        </S.PhotoButton>
      </S.Figure>
      <S.Columns>
        <S.Research>
          <p>{structure.description}</p>
        </S.Research>
        <S.Facts aria-label="Structure details">
          <dl>
            <div>
              <dt>Dates</dt>
              <dd>
                {structure.name.toLowerCase().includes('metal entrance')
                  ? 'Date not confirmed'
                  : structure.year}
              </dd>
            </div>
          </dl>
          {structure.location && (
            <div>
              {structure.location.latitude === 0 ? (
                <p>Location unknown</p>
              ) : (
                <GoogleMapLandmark
                  {...structure.location}
                  structureName={structure.name}
                />
              )}
            </div>
          )}
        </S.Facts>
      </S.Columns>
      <S.BottomNav aria-label="Adjacent accessory structures">
        {previousStructure ? (
          <S.Button
            aria-label={`Previous: ${previousStructure.name}`}
            onClick={handlePrev}
          >
            <FaArrowLeft /> {previousStructure.name}
          </S.Button>
        ) : (
          <span />
        )}
        {nextStructure ? (
          <S.Button
            aria-label={`Next: ${nextStructure.name}`}
            onClick={handleNext}
          >
            {nextStructure.name} <FaArrowRight />
          </S.Button>
        ) : (
          <S.Button onClick={backToList}>Back to collection</S.Button>
        )}
      </S.BottomNav>
    </S.Page>
  );
}

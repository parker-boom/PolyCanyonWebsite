import ContactLink from '../../components/ContactLink.jsx';
import React, { lazy, Suspense, useLayoutEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import * as S from './StructureList.styles.js';
import {
  mainImages,
  accessoryImages,
  getResponsiveImage,
} from '../images/structureImages.js';
import structures from '../data/structuresList.json';
import { sortStructures } from '../data/structureHelpers.js';
const ResearchInfo = lazy(() => import('../extraComponents/ResearchInfo.jsx'));

export default function StructureList({ mobile = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const returnState = {
    returnTo: location.pathname + location.search,
    returnKey: location.key,
  };
  const [params, setParams] = useSearchParams();
  const action = useNavigationType();
  const [query, setQuery] = useState(params.get('q') || '');
  // Typing must update immediately; URL changes may render in a transition.
  // Our filters replace the current entry. Back/Forward and incoming links
  // restore the field from their own URL instead.
  useLayoutEffect(() => {
    if (action !== 'REPLACE') setQuery(params.get('q') || '');
  }, [location.key, action, params]);
  const sort = ['Number', 'Year', 'Location'].includes(params.get('sort'))
    ? params.get('sort')
    : 'Number';
  const ascending = params.get('direction') !== 'desc';
  const open = {
    active: params.get('active') !== 'closed',
    ghost: params.get('ghost') !== 'closed',
  };
  function updateFilter(key, value) {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true }
    );
  }
  const [research, setResearch] = useState(false);
  function surprise(image = false) {
    const choices = image
      ? structures.filter((s) => s.imageCount > 0)
      : structures;
    const choice = choices[Math.floor(Math.random() * choices.length)];
    if (!choice) return;
    const index = image ? Math.floor(Math.random() * choice.imageCount) : 0;
    navigate(
      `/structures/${choice.url}${image ? `?fullscreen=true&imageIndex=${index}` : ''}`,
      { state: returnState }
    );
  }
  return (
    <S.Page>
      <S.Heading>
        <h1>Structures</h1>
        <S.Discovery>
          <button onClick={() => surprise()} aria-label="Random structure">
            Random structure <span aria-hidden="true">↗</span>
          </button>
          <button onClick={() => surprise(true)} aria-label="Random photograph">
            Random photo <span aria-hidden="true">↗</span>
          </button>
        </S.Discovery>
      </S.Heading>
      <S.Tools>
        <S.Search>
          <FaSearch aria-hidden="true" />
          <input
            aria-label="Search structures"
            type="search"
            placeholder="Search by name or number"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateFilter('q', e.target.value);
            }}
          />
        </S.Search>
        <S.Sort aria-label="Sort structures">
          <span>Sort by</span>
          {['Number', 'Year', 'Location'].map((name) => (
            <button
              key={name}
              aria-label={`Sort by ${name.toLowerCase()}`}
              aria-pressed={sort === name}
              onClick={() =>
                updateFilter('sort', name === 'Number' ? '' : name)
              }
            >
              {name}
            </button>
          ))}
          <button
            aria-label={ascending ? 'Sort descending' : 'Sort ascending'}
            onClick={() => updateFilter('direction', ascending ? 'desc' : '')}
          >
            {ascending ? '↑' : '↓'}
          </button>
        </S.Sort>
      </S.Tools>
      {['active', 'ghost'].map((status) => {
        const entries = sortStructures(structures, {
          status,
          sort,
          ascending,
          query,
        });
        return (
          <section key={status}>
            <S.SectionHeader>
              <button
                aria-expanded={open[status]}
                onClick={() =>
                  updateFilter(status, open[status] ? 'closed' : '')
                }
              >
                <h2>{status === 'active' ? 'Active' : 'Ghost'} Structures</h2>
                <span className="count">{entries.length}</span>
                <span aria-hidden="true">{open[status] ? '−' : '+'}</span>
              </button>
            </S.SectionHeader>
            {open[status] &&
              (entries.length ? (
                <S.Grid>
                  {entries.map((s) => (
                    <S.Card
                      as={Link}
                      to={`/structures/${s.url}`}
                      state={returnState}
                      key={s.number}
                    >
                      <S.PhotoFrame>
                        <img
                          {...getResponsiveImage(
                            s.number === -1
                              ? Object.values(accessoryImages)[0]
                              : mainImages[s.image_key],
                            '(max-width:520px) calc(100vw - 40px), (max-width:900px) 44vw, (max-width:1280px) 29vw, 380px'
                          )}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.hidden = true;
                          }}
                        />
                        <span className="photo-fallback" aria-hidden="true">
                          {s.title}
                        </span>
                      </S.PhotoFrame>
                      <S.Caption>
                        <span className="number">
                          {s.number === -1
                            ? '—'
                            : String(s.number).padStart(2, '0')}
                        </span>
                        <div>
                          <h3>{s.title}</h3>
                          {s.year && <p>{s.year}</p>}
                        </div>
                        <span className="arrow" aria-hidden="true">
                          ↗
                        </span>
                      </S.Caption>
                    </S.Card>
                  ))}
                </S.Grid>
              ) : (
                <S.Empty role="status">
                  <p>
                    No {status} structures match “{query}”.
                  </p>
                  <button
                    onClick={() => {
                      setQuery('');
                      updateFilter('q', '');
                    }}
                  >
                    Clear search
                  </button>
                </S.Empty>
              ))}
          </section>
        );
      })}
      <S.Research>
        <button
          onClick={() => setResearch(true)}
          aria-label="About the research"
        >
          About the research
        </button>
        <p>
          Have a correction or something to add?{' '}
          <ContactLink>Contact Parker</ContactLink>
        </p>
      </S.Research>
      {research && (
        <Suspense fallback={null}>
          <ResearchInfo isMobile={mobile} onClose={() => setResearch(false)} />
        </Suspense>
      )}
    </S.Page>
  );
}

import React, { lazy, Suspense, useLayoutEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { FaSearch, FaChevronDown, FaDiceFive } from 'react-icons/fa';
import * as C from './Collection.styles.js';
import {
  thumbnailImages,
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
  function surprise() {
    const choice = structures[Math.floor(Math.random() * structures.length)];
    if (choice) navigate(`/structures/${choice.url}`, { state: returnState });
  }
  const count = sortStructures(structures, { query }).length;
  return (
    <C.Page>
      <C.Heading>
        <h1>Structures</h1>
        <button
          aria-label="About the research and sources"
          title="Research and sources"
          aria-haspopup="dialog"
          onClick={() => setResearch(true)}
        >
          ?
        </button>
      </C.Heading>
      <C.Tools>
        <div className="search">
          <FaSearch aria-hidden="true" />
          <input
            aria-label="Search structures"
            type="search"
            placeholder="Name or number"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateFilter('q', e.target.value);
            }}
          />
        </div>
        <button
          className="random"
          aria-label="Open a random structure"
          title="Random structure"
          onClick={surprise}
        >
          <FaDiceFive aria-hidden="true" />
        </button>
      </C.Tools>
      <C.SortBar>
        <div className="sorting">
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
        </div>
        <span
          className="count"
          role="status"
          aria-label={`${count} structures`}
        >
          {count} structures
        </span>
      </C.SortBar>
      {count === 0 ? (
        <C.Empty>
          <h2>No matches</h2>
          <button
            onClick={() => {
              setQuery('');
              updateFilter('q', '');
            }}
          >
            Clear search
          </button>
        </C.Empty>
      ) : (
        ['active', 'ghost'].map((status) => {
          const entries = sortStructures(structures, {
            status,
            sort,
            ascending,
            query,
          });
          if (!entries.length) return null;
          return (
            <C.Section key={status}>
              <h2>
                <button
                  className="section-heading"
                  aria-expanded={open[status]}
                  onClick={() =>
                    updateFilter(status, open[status] ? 'closed' : '')
                  }
                >
                  {status === 'active' ? 'Standing' : 'No longer standing'}
                  <FaChevronDown aria-hidden="true" />
                </button>
              </h2>
              {open[status] && (
                <C.Grid>
                  {entries.map((s) => (
                    <C.Item
                      as={Link}
                      to={`/structures/${s.url}`}
                      state={returnState}
                      key={s.number}
                    >
                      <img
                        {...getResponsiveImage(
                          s.number === -1
                            ? Object.values(accessoryImages)[0]
                            : thumbnailImages[s.image_key],
                          '(max-width:420px) 96px, (max-width:740px) 142px, (max-width:1000px) 100px, 142px'
                        )}
                        alt={s.title}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="info">
                        <div className="title">
                          <span className="number">
                            {s.number === -1
                              ? '—'
                              : String(s.number).padStart(2, '0')}
                          </span>
                          <h3>{s.title}</h3>
                        </div>
                        {s.year && <span className="year">{s.year}</span>}
                      </div>
                    </C.Item>
                  ))}
                </C.Grid>
              )}
            </C.Section>
          );
        })
      )}
      {research && (
        <Suspense fallback={null}>
          <ResearchInfo isMobile={mobile} onClose={() => setResearch(false)} />
        </Suspense>
      )}
    </C.Page>
  );
}

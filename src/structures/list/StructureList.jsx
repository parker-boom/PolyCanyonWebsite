import React, { useLayoutEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { FaSearch, FaDiceFive } from 'react-icons/fa';
import * as C from './Collection.styles.js';
import {
  thumbnailImages,
  getResponsiveImage,
} from '../images/structureImages.js';
import structures from '../data/structuresList.json';
import { sortStructures } from '../data/structureHelpers.js';

export default function StructureList({ historical = false }) {
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
  const sort = ['Number', 'Year'].includes(params.get('sort'))
    ? params.get('sort')
    : 'Number';
  const ascending = params.get('direction') !== 'desc';
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
  function surprise() {
    const choices = structures.filter(
      (s) => s.status === 'Active' && s.number > 0
    );
    const choice = choices[Math.floor(Math.random() * choices.length)];
    if (choice) navigate(`/structures/${choice.url}`, { state: returnState });
  }
  const entries = sortStructures(
    structures.filter((s) => s.number > 0),
    { query, sort, ascending, status: historical ? 'Ghost' : 'Active' }
  );
  const count = entries.length;
  return (
    <C.Page>
      <C.Heading>
        <div>
          <h1>{historical ? 'Past structures' : 'Structures'}</h1>
          <p>
            {historical
              ? 'Projects that are no longer standing, preserved in photographs and research.'
              : 'Explore the experiments still found in the canyon.'}
          </p>
        </div>
        <Link to={historical ? '/structures' : '/structures/history'}>
          {historical ? 'Back to the canyon' : 'Past structures'}
        </Link>
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
          {['Number', 'Year'].map((name) => (
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
        <C.Grid>
          {entries.map((s) => (
            <C.Item
              as={Link}
              to={`/structures/${s.url}`}
              state={returnState}
              key={s.number}
            >
              <div className="photograph">
                <img
                  {...getResponsiveImage(
                    thumbnailImages[s.image_key],
                    '(max-width:600px) 46vw, (max-width:1000px) 44vw, 390px'
                  )}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="number">
                  {String(s.number).padStart(2, '0')}
                </span>
              </div>
              <div className="info">
                <h3>{s.title}</h3>
                {s.year && <span className="year">{s.year}</span>}
              </div>
            </C.Item>
          ))}
        </C.Grid>
      )}
      {!historical && (
        <C.Tail>
          <Link to="/structures/accessory">
            Smaller structures & connections
          </Link>
          <p>Reports and original sources accompany each structure’s story.</p>
        </C.Tail>
      )}
    </C.Page>
  );
}

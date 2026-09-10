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
    { query, sort, ascending, status: 'Active' }
  );
  const historyEntries = sortStructures(
    structures.filter((s) => s.number > 0),
    { query, sort, ascending, status: 'Ghost' }
  );
  const historyOpen =
    historical ||
    params.get('history') === 'open' ||
    (Boolean(query.trim()) && params.get('history') !== 'closed');
  const count = entries.length;
  const cards = (items) => (
    <C.Grid>
      {items.map((s) => (
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
                '(max-width:600px) 46vw, (max-width:1000px) 44vw, 290px'
              )}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="info">
            <h3>{s.title}</h3>
            {s.year && <span className="year">{s.year}</span>}
          </div>
        </C.Item>
      ))}
    </C.Grid>
  );

  return (
    <C.Page>
      <C.Heading>
        <h1>Structures</h1>
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
        {
          <button
            className="random"
            aria-label="Open a random structure"
            title="Random structure"
            onClick={surprise}
          >
            <FaDiceFive aria-hidden="true" />
          </button>
        }
        <label className="sort">
          <span className="sr-only">Sort structures</span>
          <select
            value={
              sort === 'Year' ? (ascending ? 'oldest' : 'newest') : 'number'
            }
            onChange={(e) =>
              setParams(
                (current) => {
                  const next = new URLSearchParams(current);
                  // A pending URL update may still contain the previous search.
                  // Sort the query currently shown in the input.
                  if (query) next.set('q', query);
                  else next.delete('q');
                  if (e.target.value === 'number') {
                    next.delete('sort');
                    next.delete('direction');
                  } else {
                    next.set('sort', 'Year');
                    if (e.target.value === 'newest')
                      next.set('direction', 'desc');
                    else next.delete('direction');
                  }
                  return next;
                },
                { replace: true }
              )
            }
          >
            <option value="number">Number</option>
            <option value="oldest">Oldest first</option>
            <option value="newest">Newest first</option>
          </select>
        </label>
      </C.Tools>
      <span className="sr-only" role="status">
        {count} {count === 1 ? 'structure' : 'structures'}
      </span>
      {count === 0 ? (
        <C.Empty>
          <h2>{historyEntries.length ? 'No current structures match' : 'No matches'}</h2>
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
        cards(entries)
      )}
      <C.Tail id="historical">
        <h2>
          <button
            type="button"
            aria-expanded={historyOpen}
            aria-controls="historical-structures"
            onClick={() => {
              const next = new URLSearchParams(params);
              if (historyOpen) {
                if (query.trim()) next.set('history', 'closed');
                else next.delete('history');
              } else next.set('history', 'open');
              if (historical)
                navigate(`/structures${next.size ? `?${next}` : ''}`, {
                  replace: true,
                });
              else setParams(next, { replace: true });
            }}
          >
            Historical structures{' '}
            <span aria-hidden="true">{historyOpen ? '−' : '+'}</span>
          </button>
        </h2>
        {historyOpen && (
          <div id="historical-structures">
            <p>
              Projects that are no longer standing, preserved in photographs and
              research.
            </p>
            {historyEntries.length ? (
              cards(historyEntries)
            ) : (
              <p>No historical structures match your search.</p>
            )}
          </div>
        )}
      </C.Tail>
    </C.Page>
  );
}

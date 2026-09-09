import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollPositions = new Map();

export default function RoutePosition() {
  const location = useLocation();
  const action = useNavigationType();
  const previous = useRef(null);
  useEffect(() => {
    const original = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = original;
    };
  }, []);
  useLayoutEffect(() => {
    const { pathname, hash, key } = location;
    const prior = previous.current;
    previous.current = location;
    const preserve =
      prior?.pathname === pathname && prior?.hash === hash && action !== 'POP';
    let id;
    try {
      id =
        hash && !hash.includes('token=')
          ? decodeURIComponent(hash.slice(1))
          : null;
    } catch {
      id = null;
    }
    const restoreKey = location.state?.restoreScrollKey;
    const position = restoreKey
      ? scrollPositions.get(restoreKey)
      : action === 'POP'
        ? scrollPositions.get(key)
        : null;
    let restoring = !preserve;
    let observer;
    let timeout;
    const save = () => {
      // A scroll event from a collapsing route can arrive before React commits
      // the new route. Never save it under the history entry we just left.
      if (!restoring && (window.history.state?.key || 'default') === key)
        scrollPositions.set(key, { x: window.scrollX, y: window.scrollY });
    };
    const restore = () => {
      if (id) {
        const target = document.getElementById(id);
        if (!target) return false;
        target.scrollIntoView();
      } else {
        const { x = 0, y = 0 } = position || {};
        if (document.documentElement.scrollHeight - innerHeight < y)
          return false;
        window.scrollTo({ left: x, top: y, behavior: 'instant' });
      }
      restoring = false;
      save();
      return true;
    };
    if (preserve) save();
    else if (!restore()) {
      observer = new MutationObserver(() => {
        if (restore()) observer.disconnect();
      });
      observer.observe(document.getElementById('root'), {
        childList: true,
        subtree: true,
      });
      timeout = setTimeout(() => {
        observer.disconnect();
        restoring = false;
        save();
      }, 5000);
    }
    window.addEventListener('scroll', save, { passive: true });
    return () => {
      window.removeEventListener('scroll', save);
      observer?.disconnect();
      clearTimeout(timeout);
    };
  }, [location, action]);
  return null;
}

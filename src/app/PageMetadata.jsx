import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pages from './metadata.generated.json';
const site = 'https://polycanyon.com';
const image = `${site}/sharePNG/OGDefault.png`;
function setMeta(attribute, name, content) {
  const matches = [
    ...document.head.querySelectorAll(`meta[${attribute}="${name}"]`),
  ];
  const element = matches.shift() || document.createElement('meta');
  element.setAttribute(attribute, name);
  element.content = content;
  if (!element.parentNode) document.head.appendChild(element);
  matches.forEach((node) => node.remove());
}
export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const requestedPath = pathname.replace(/\/$/, '') || '/';
    const path =
      Object.keys(pages).find(
        (route) => route.toLowerCase() === requestedPath.toLowerCase()
      ) || requestedPath;
    const page = pages[path] || {
      title: 'Page not found — Poly Canyon',
      description: 'Find your way back to the Poly Canyon structure archive.',
    };
    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', pages[path] ? 'index,follow' : 'noindex,follow');
    for (const [name, content] of Object.entries({
      'og:title': page.title,
      'og:description': page.description,
      'og:url': site + path,
      'og:type': 'website',
      'og:image': image,
      'og:site_name': 'Poly Canyon',
    }))
      setMeta('property', name, content);
    for (const [name, content] of Object.entries({
      'twitter:card': 'summary_large_image',
      'twitter:title': page.title,
      'twitter:description': page.description,
      'twitter:image': `${site}/sharePNG/TwitDefault.png`,
    }))
      setMeta('name', name, content);
    const canonical =
      document.querySelector('link[rel="canonical"]') ||
      document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = site + path;
    if (!canonical.parentNode) document.head.appendChild(canonical);
  }, [pathname]);
  return null;
}

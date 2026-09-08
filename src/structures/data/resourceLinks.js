// Use the same resource semantics in React and the generated archive.
export function resourceLinks(links = []) {
  return links.filter((link) => {
    if (link?.URL === 'https://google.com') return false;
    try {
      return ['http:', 'https:'].includes(new URL(link?.URL).protocol);
    } catch {
      return false;
    }
  });
}

// Curated walking order. Unknown/new entries remain visible at the end.
const locationOrder = [
  17, 16, 18, 15, 19, 13, 14, 20, 21, 12, 11, 22, 23, 10, 24, 25, 9, 26, 8, 27,
  7, 28, 6, 5, 29, 4, 30, 3, 2, 1, 39, 37, 42, 34, 38, 35, 40, 41, 33, 32, 36,
];
export function sortStructures(
  structures,
  { status, sort = 'Number', ascending = true, query = '' } = {}
) {
  const search = query.trim().toLowerCase();
  const year = (s) =>
    Number(String(s.year ?? '').match(/\d{4}/)?.[0]) || Infinity;
  return structures
    .filter(
      (s) =>
        (!status || s.status.toLowerCase() === status.toLowerCase()) &&
        (!search ||
          [s.number, s.title, s.description].some((v) =>
            String(v ?? '')
              .toLowerCase()
              .includes(search)
          ))
    )
    .sort((a, b) => {
      if (a.number === -1 || b.number === -1) return a.number === -1 ? 1 : -1;
      const rank = (s) => {
        const i = locationOrder.indexOf(s.number);
        return i < 0 ? Infinity : i;
      };
      const difference =
        sort === 'Year'
          ? year(a) - year(b)
          : sort === 'Location'
            ? rank(a) - rank(b)
            : a.number - b.number;
      return (difference || a.number - b.number) * (ascending ? 1 : -1);
    });
}
export function sortImages(images = []) {
  const order = { main: 0, other: 1, closeup: 2 };
  return [...(Array.isArray(images) ? images : [])].sort(
    (a, b) => (order[a?.type] ?? 3) - (order[b?.type] ?? 3)
  );
}
export function galleryQuery(search, count) {
  const params = new URLSearchParams(search);
  const index = Number(params.get('imageIndex'));
  return {
    index: Number.isInteger(index) && index >= 0 && index < count ? index : 0,
    fullscreen: count > 0 && params.get('fullscreen') === 'true',
  };
}

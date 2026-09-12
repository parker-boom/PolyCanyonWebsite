import React, { useEffect, useRef, useState } from 'react';

// Share decoded previews between the inline gallery and its fullscreen viewer.
const previews = new Map();

export default function DecodedPhoto({
  photoKey,
  src,
  srcSet,
  sizes,
  alt,
  onError,
}) {
  const [visible, setVisible] = useState(() => previews.get(photoKey));
  const errorHandler = useRef(onError);
  errorHandler.current = onError;

  useEffect(() => {
    if (!src) return undefined;
    let cancelled = false;
    const image = new Image();
    image.decoding = 'async';
    image.sizes = sizes;
    if (srcSet) image.srcset = srcSet;
    image.src = src;
    // Loading offscreen is deliberate: decoding=async alone still permits a
    // progressive image to paint before the complete photograph is available.
    image
      .decode()
      .then(() => {
        if (cancelled) return;
        const next = { src: image.currentSrc || image.src, alt };
        previews.delete(photoKey);
        previews.set(photoKey, next);
        if (previews.size > 24) previews.delete(previews.keys().next().value);
        setVisible(next);
      })
      .catch(() => {
        if (!cancelled) errorHandler.current?.();
      });
    return () => {
      cancelled = true;
    };
  }, [photoKey, src, srcSet, sizes, alt]);

  return visible ? (
    <img
      src={visible.src}
      alt={visible.alt}
      decoding="async"
      data-decoded-photo
    />
  ) : (
    <span role="status">Loading photograph…</span>
  );
}

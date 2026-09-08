import React, { useEffect, useRef, useState } from 'react';
import useDialog from '../hooks/useDialog.js';
export default function PhotoViewer({
  photo,
  image,
  index,
  count,
  name,
  onClose,
  onPrev,
  onNext,
}) {
  const dialogRef = useDialog(true, onClose);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [failed, setFailed] = useState(false);
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setFailed(false);
  }, [index]);
  const changeZoom = () => {
    setZoom(zoom === 1 ? 2 : 1);
    setPan({ x: 0, y: 0 });
  };
  const onPointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    const points = [...pointers.current.values()];
    gesture.current =
      points.length === 2
        ? {
            distance: Math.hypot(
              points[0].x - points[1].x,
              points[0].y - points[1].y
            ),
            zoom,
          }
        : { x: event.clientX, y: event.clientY, pan, zoom };
  };
  const onPointerMove = (event) => {
    if (!pointers.current.has(event.pointerId) || !gesture.current) return;
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    const points = [...pointers.current.values()];
    if (points.length === 2 && gesture.current.distance) {
      setZoom(
        Math.min(
          4,
          Math.max(
            1,
            (gesture.current.zoom *
              Math.hypot(
                points[0].x - points[1].x,
                points[0].y - points[1].y
              )) /
              gesture.current.distance
          )
        )
      );
    } else if (zoom > 1 && gesture.current.pan) {
      const box = event.currentTarget.getBoundingClientRect();
      const maxX = (box.width * (zoom - 1)) / 2,
        maxY = (box.height * (zoom - 1)) / 2;
      setPan({
        x: Math.max(
          -maxX,
          Math.min(
            maxX,
            gesture.current.pan.x + event.clientX - gesture.current.x
          )
        ),
        y: Math.max(
          -maxY,
          Math.min(
            maxY,
            gesture.current.pan.y + event.clientY - gesture.current.y
          )
        ),
      });
    }
  };
  const onPointerUp = (event) => {
    const start = gesture.current;
    if (
      pointers.current.size === 1 &&
      start &&
      start.zoom === 1 &&
      start.x !== undefined &&
      count > 1
    ) {
      const dx = event.clientX - start.x,
        dy = event.clientY - start.y;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5)
        (dx > 0 ? onPrev : onNext)();
    }
    pointers.current.delete(event.pointerId);
    gesture.current = null;
    if (zoom <= 1) setPan({ x: 0, y: 0 });
  };
  return (
    <div
      className="photo-viewer"
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
      ref={dialogRef}
    >
      <div className="photo-viewer-toolbar">
        <span>{name}</span>
        <div>
          <button
            onClick={changeZoom}
            aria-label={zoom === 1 ? 'Zoom in' : 'Reset zoom'}
          >
            {zoom === 1 ? 'Zoom +' : 'Reset zoom'}
          </button>
          <button onClick={onClose} aria-label="Close photograph">
            Close ×
          </button>
        </div>
      </div>
      <div
        className="photo-viewer-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointers.current.clear();
          gesture.current = null;
        }}
        onDoubleClick={changeZoom}
      >
        {failed ? (
          <p className="photo-viewer-error">
            This photograph could not load. Try another photograph.
          </p>
        ) : (
          <img
            {...image}
            sizes="100vw"
            alt={photo.description}
            draggable="false"
            decoding="async"
            onError={() => setFailed(true)}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? 'grab' : 'zoom-in',
            }}
          />
        )}
      </div>
      <div className="photo-viewer-caption">
        {count > 1 && (
          <button onClick={onPrev} aria-label="Previous photograph">
            ←
          </button>
        )}
        <span>
          {index + 1} / {count}
        </span>
        <p>{photo.description}</p>
        {count > 1 && (
          <button onClick={onNext} aria-label="Next photograph">
            →
          </button>
        )}
      </div>
    </div>
  );
}

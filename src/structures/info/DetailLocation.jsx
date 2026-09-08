import React, { useState } from 'react';
export default function DetailLocation({ location, name }) {
  const [loaded, setLoaded] = useState(false);
  if (!location || !location.latitude) return <p>Location unknown</p>;
  const point = `${location.latitude},${location.longitude}`;
  return (
    <div className="detail-location">
      <p>
        {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
      </p>
      <button onClick={() => setLoaded(!loaded)}>
        {loaded ? 'Hide map' : 'Show map'}
      </button>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${point}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Google Maps ↗
      </a>
      {loaded && (
        <iframe
          title={`${name} location`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(point)}&z=18&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </div>
  );
}

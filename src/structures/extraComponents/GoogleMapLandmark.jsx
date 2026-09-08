import React from 'react';
export default function GoogleMapLandmark({latitude,longitude,structureName}) {
 if(!latitude || !longitude) return null;
 return <a href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer" style={{display:'inline-block',padding:'12px 0',fontSize:14,textUnderlineOffset:4,color:'var(--green)'}}>Locate {structureName || 'this structure'} in Google Maps</a>;
}

// public/admin/StructurePreview.js

import React from 'react';
import PropTypes from 'prop-types';

const StructurePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  if (!data) {
    return <div>Loading...</div>;
  }

  const structures = data.structures || [];

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      {structures.map((structure, index) => (
        <div
          key={index}
          style={{
            marginBottom: '2rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1rem',
          }}
        >
          <h2>{structure.names ? structure.names[0] : 'Untitled Structure'}</h2>
          <p>
            <strong>Number:</strong> {structure.number}
          </p>
          <p>
            <strong>Year:</strong> {structure.year}
          </p>

          {/* Display Advisor/Builders */}
          {structure.advisor_builders &&
            structure.advisor_builders.length > 0 && (
              <div>
                <h3>Advisor/Builders</h3>
                <ul>
                  {structure.advisor_builders.map((person, idx) => (
                    <li key={idx}>
                      {person.name} -{' '}
                      {person.role ? person.role.join(', ') : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          <p>
            <strong>Status:</strong> {structure.status}
          </p>
          <p>
            <strong>Style:</strong> {structure.style}
          </p>

          {/* Display Department */}
          {structure.department && structure.department.length > 0 && (
            <p>
              <strong>Department:</strong> {structure.department.join(', ')}
            </p>
          )}

          {/* Display Location */}
          {structure.location && (
            <div>
              <h3>Location</h3>
              <p>
                <strong>Latitude:</strong> {structure.location.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {structure.location.longitude}
              </p>
            </div>
          )}

          {/* Display Tags */}
          {structure.tags && structure.tags.length > 0 && (
            <p>
              <strong>Tags:</strong> {structure.tags.join(', ')}
            </p>
          )}

          <p>
            <strong>Description:</strong> {structure.description}
          </p>
          <p>
            <strong>Extended Description:</strong>{' '}
            {structure.extended_description}
          </p>

          {/* Display Images */}
          {structure.images && structure.images.length > 0 && (
            <div>
              <h3>Images</h3>
              {structure.images.map((image, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <p>
                    <strong>Type:</strong> {image.type}
                  </p>
                  <p>
                    <strong>Description:</strong> {image.description}
                  </p>
                  {image.path && (
                    <img
                      src={image.path}
                      alt={image.description || ''}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Display Links */}
          {structure.links && structure.links.length > 0 && (
            <div>
              <h3>Links</h3>
              <ul>
                {structure.links.map((link, idx) => (
                  <li key={idx}>
                    <strong>{link.linkType}:</strong>{' '}
                    <a
                      href={link.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display Additional Names */}
          {structure.names && structure.names.length > 1 && (
            <div>
              <h3>Alternate Names</h3>
              <ul>
                {structure.names.slice(1).map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Display Other Fields if Needed */}
        </div>
      ))}
    </div>
  );
};

StructurePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func.isRequired,
  }).isRequired,
};

export default StructurePreview;

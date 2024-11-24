import React from 'react';

const PhotoGallery = ({ photoLinks }) => {
  if (!photoLinks || photoLinks.length === 0) {
    return <p>No photos available.</p>;
  }

  return (
    <div className="photo-gallery-container">
  <h2 className="photo-gallery-title">Photo Gallery</h2>
  <div className="photo-gallery-grid">
    {photoLinks.map((photo, index) => (
      <img
        key={index}
        src={photo}
        alt={`Photo ${index + 1}`}
        className="gallery-photo"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150'; 
        }}
      />
    ))}
  </div>
</div>

  );
};

export default PhotoGallery;

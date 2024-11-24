import React, { useState } from 'react';

export default function ResortPageMainComponent({ resort }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track if the modal is open

  const handleImageClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="resort-page-container">
      <div className="resort-map-container">
        <h1 className="resort-page-title">{resort.name}</h1>
        <p className="resort-page-description">{resort.description}</p>
        <img
          src={resort.map}
          alt={`${resort.name} map`}
          className="resortPage-image"
          onClick={handleImageClick} // Open modal on click
          style={{ cursor: 'pointer' }} // Indicate it's clickable
        />
      </div>

      <div className="resortPage-park-list">
        <h2>Park List</h2>
        {resort.parkList && resort.parkList.length > 0 ? (
          <ul className="park-list">
            {resort.parkList.map((park, index) => (
              <li key={index} className="park-list-item">
                {typeof park === 'object' ? park.name : park}
              </li>
            ))}
          </ul>
        ) : (
          <p>No parks available in the list.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal" onClick={handleModalClose}>
          <div className="modal-content">
            <img
              src={resort.map}
              alt={`${resort.name} map enlarged`}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}

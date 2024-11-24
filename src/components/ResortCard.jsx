import React from 'react';
import { Link } from 'react-router-dom';

const ResortCard = ({ resort }) => {
  return (
    <Link 
      to={`/resorts/${resort.domain}`}
      className="resortCard-card"
    >
      <div className="resortCard-image-wrapper">
        <img 
          src={resort.photo} 
          alt={resort.name} 
          className="resortCard-image"
        />
      </div>
      <div className="resortCard-details">
        <h2 className="resortCard-name">{resort.name}</h2>
        <p className="resortCard-location">
          {resort.location.latitude}, {resort.location.longitude}
        </p>
        <p className="resortCard-description">{resort.description}</p>
      </div>
    </Link>
  );
};

export default ResortCard;

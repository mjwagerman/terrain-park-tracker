import React from 'react';
import { Link } from 'react-router-dom';

const ResortCard = ({ resort }) => {
  return (
    <Link 
      to={`/resorts/${resort.domain}`}
      className="resort-card"
    >
      <div className="resort-image-wrapper">
        <img 
          src={resort.photo} 
          alt={resort.name} 
          className="resort-image"
        />
      </div>
      <div className="resort-details">
        <h2 className="resort-name">{resort.name}</h2>
        <p className="resort-location">
          {resort.location.latitude}, {resort.location.longitude}
        </p>
        <p className="resort-description">{resort.description}</p>
      </div>
    </Link>
  );
};

export default ResortCard;

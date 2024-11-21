import React from 'react';
import useFetchResorts from '../hooks/useFetchResorts';
import ResortCard from '../components/ResortCard'; // Import the new component

export default function ResortsPage() {
  const resortList = useFetchResorts();

  return (
    <div className="resorts-container">
      <h1 className="resorts-title">Explore The Resorts</h1>
      <div className="resorts-flex">
        {resortList.map((resort) => (
          <ResortCard key={resort.domain} resort={resort} /> // Use ResortCard
        ))}
      </div>
    </div>
  );
}

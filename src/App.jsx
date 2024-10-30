import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header';
import MapComponent from './components/MapComponent';
import InputResort from './components/InputResort';

function App() {

  return (
    <>
    <div className="app-container">
        <div className="header">
          <Header />
        </div>
        <div className="map-container">
          <MapComponent />
        </div>
        <div>
          <InputResort/>
        </div>
      </div>
    </>
  )
}

export default App

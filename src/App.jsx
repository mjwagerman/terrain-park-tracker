import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import MapComponent from './components/MapComponent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="app-container">
        <div className="header">
          <Header />
        </div>
        <div className="map-container">
          <MapComponent />
        </div>
      </div>
    </>
  )
}

export default App

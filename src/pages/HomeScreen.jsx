import React from 'react'

import Header from '../components/Header';
import MapComponent from '../components/MapComponent';
import InputResort from '../components/InputResort';
import SearchComponent from '../components/SearchComponent';

export default function HomeScreen() {
  return (
    <div>
        <MapComponent />
        <InputResort />
        <SearchComponent />
    </div>
  )
}

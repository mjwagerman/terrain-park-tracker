import React from 'react'

import Header from '../components/Header';
import MapComponent from '../components/MapComponent';
import InputResort from '../components/InputResort';
import SearchComponent from '../components/SearchComponent';
import SearchResortSelector from '../components/ResortSearchSelector';

export default function HomeScreen() {
  return (
    <div>
        {/* <SearchComponent />
        <MapComponent /> */}
        <SearchResortSelector />
        <InputResort />
    </div>
  )
}

import React from 'react'

import InputResort from '../components/InputResort';
import SearchResortSelector from '../components/ResortSearchSelector';
import ResortsPage from './ResortsPage.jsx'

export default function HomeScreen() {
  return (
    <div>
        <SearchResortSelector />
        <InputResort />
        <div id="resorts-section">
          <ResortsPage />
        </div>
    </div>
  )
}

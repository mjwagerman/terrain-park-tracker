import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider,  } from 'react-router-dom';

import HomeScreen from './pages/HomeScreen.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ResortsPage from './pages/ResortsPage.jsx';
import ResortPage from './pages/ResortPage.jsx';
import Header from './components/Header.jsx';
import AboutPage from './pages/AboutPage.jsx';





function App() {

const router = createBrowserRouter([
  {
  path: '/',
  element: (
    <>
      <Header />
      <HomeScreen />
    </>
      
  ),
  errorElement: <NotFoundPage />
  },
  {
    path: '/resorts',
    element: < ResortsPage/>,
  },
  {
    path: '/resorts/:resort',
    element: <ResortPage />,
  },
  {
    path: '/about',
    element: <AboutPage />
  }
]);

return (
  
  <div className="app-container">
          <RouterProvider router={router} />
  </div>
  )
}

export default App

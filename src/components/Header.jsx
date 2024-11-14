import { useState, useEffect } from 'react';
import Auth from './Auth';
import { Link } from "react-router-dom";
import pinimg from '../assets/mappin.png';


const Header = () => {
  
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            setIsShrunk(true);
        } else {
            setIsShrunk(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    return (
      <header>
        <div className={`header-wrapper ${isShrunk ? 'shrink' : ''}`} >
          <div className="header-links">
            <Link to="/" className="header-link-home">
              <img src={pinimg} alt="logo" className="logo-img"></img>
              <h1>TerrainParkTracker</h1> 
            </Link>
            <nav className="header-nav-list">
              <Link to="/resorts" className="header-link-resorts">
                Resorts
              </Link>
              <Link to="/about" className="header-link-about">
                About
              </Link>
            </nav>
          </div>
          <Auth />
        </div>
      </header>
    )
}
  
  export default Header;
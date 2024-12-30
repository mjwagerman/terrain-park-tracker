import { useState, useEffect } from 'react';
import Auth from './Auth';
import { Link, useLocation, useNavigate } from "react-router-dom";
import pinimg from '../assets/mappin.png';


const Header = () => {
  
  const [isShrunk, setIsShrunk] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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

  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();
  
    if (location.pathname === "/") {
      const targetSection = document.getElementById(sectionId);
      const yOffset = -60; // Adjust for your desired offset
  
      if (targetSection) {
        const y = targetSection.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const targetSection = document.getElementById(sectionId);
        const yOffset = -60; // Adjust for your desired offset
        if (targetSection) {
          const y = targetSection.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 300); // Adjust delay as necessary
    }
  };
  
  const handleHomeClick = (e) => {
    e.preventDefault(); // Prevent default navigation behavior
  
    if (location.pathname === "/") {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to the home page
      navigate("/");
    }
  };
  
  


    return (
      <header>
        <div className={`header-wrapper ${isShrunk ? 'shrink' : ''}`} >
          <div className="header-links">
          <Link to="/" className="header-link-home" onClick={handleHomeClick}>
            <img src={pinimg} alt="logo" className="logo-img" />
            <h1>TerrainParkTracker</h1>
          </Link>
          <nav className="header-nav-list">
            <a href="#resorts-section" onClick={(e) => handleScrollTo(e, "resorts-section")} className="header-link-resorts">
              Resorts
            </a>
            <a href="#input-section" onClick={(e) => handleScrollTo(e, "input-section")} className="header-link-contribute">
              Contribute
            </a>
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
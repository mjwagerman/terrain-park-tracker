import Auth from './Auth';
import { Link } from "react-router-dom";



const Header = () => {
  
    return (
      <header>
        <div className="header-wrapper" >
          <div className="header-links">
            <Link to="/" className="header-link-home">
              <img src="./src/assets/mappin.png" alt="logo" className="logo-img"></img>
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
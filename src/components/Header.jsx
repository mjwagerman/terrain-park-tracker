import Auth from './Auth';
import { Link } from "react-router-dom";



const Header = () => {
  
    return (
      <div className = "header">

        <Link to="/" className="header-link-home">
          <img src="./src/assets/mappin.png" alt="logo" className="logo-img"></img>
          <h1>TerrainParkTracker</h1> 
        </Link>
        <div className="header-list-links">
          <Link to="/resorts" className="header-link-resorts">
            Resorts
          </Link>
          <Link to="/about" className="header-link-about">
            About
          </Link>
        </div>
        <Auth />
      </div>
    )
}
  
  export default Header;
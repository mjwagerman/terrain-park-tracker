import Auth from './Auth';
import { Link } from "react-router-dom";

const Header = () => {
  
    return (
      <div className = "header">
        <Link to="/"><h1>TerrainParkTracker</h1> </Link>
        <Auth />
      </div>
    )
}
  
  export default Header;
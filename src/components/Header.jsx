import Auth from './Auth';
import { Link } from "react-router-dom";



const Header = () => {
  
    return (
      <div className = "header">

        <Link to="/"><h1>TerrainParkTracker</h1> </Link>
      <img src="./src/assets/mappin.png" alt="logo" className="logo-img"></img>
        <h1>TerrainParkTracker</h1>
        <Auth />
      </div>
    )
}
  
  export default Header;
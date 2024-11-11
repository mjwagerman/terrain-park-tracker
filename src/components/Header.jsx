import Auth from './Auth'; 

const Header = () => {
  
    return (
      <div className = "header">
      <img src="./src/assets/mappin.png" alt="logo" className="logo-img"></img>
        <h1>TerrainParkTracker</h1>
        <Auth />
      </div>
    )
}
  
  export default Header;
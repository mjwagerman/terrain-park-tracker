import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import MapComponent from "./MapComponent";

export default function ResortSearchSelector() {

    const [searchSelectedResort, setSearchSelectedResort] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    const handleResortSelect = (resort) => {
        setSearchSelectedResort(resort);
    };

    const handleMouseLeaveMapComboContainer = () => {
        setIsOverlayVisible(true);
        setSearchSelectedResort(null);
    };

    const handleOverlayClick = () => {
        setIsOverlayVisible(false);
    }

    return (
        <div className = "map-search-combo-container" 
        onMouseLeave={handleMouseLeaveMapComboContainer}
        onClick={handleOverlayClick}
        >  
            <SearchComponent 
                onResortSelect={ handleResortSelect } 
            />
            <MapComponent 
                searchSelectedResort={ searchSelectedResort } 
                setSearchSelectedResort={setSearchSelectedResort}
                isOverlayVisible = {isOverlayVisible}
            />
        </div>
    );
}

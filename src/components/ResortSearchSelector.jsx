import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import MapComponent from "./MapComponent";

export default function ResortSearchSelector() {

    const [searchSelectedResort, setSearchSelectedResort] = useState(null);

    const handleResortSelect = (resort) => {
        setSearchSelectedResort(resort);
    };

    return (
        <div>
            <SearchComponent onResortSelect={ handleResortSelect } />
            <MapComponent searchSelectedResort={ searchSelectedResort } />
        </div>
    );
}

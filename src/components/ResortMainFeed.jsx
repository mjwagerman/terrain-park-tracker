import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ResortMainFeed = () => {

    const profiles = [1,2,3,4,5];

    return (
        <div>
            {profiles.map((profile) => (
                <Link key={profile} to={`resorts/${profile}`} >
                    Profile {profile}
                </Link>
            ))}
        </div>
    )
}
  
export default ResortMainFeed;
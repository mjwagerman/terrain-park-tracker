import React from 'react'
import { useState,useEffect } from "react";

import { getResorts } from "../services/getResorts";


const getFilteredResorts = (query, resorts) => {
    if (!query) {
        return resorts;
    }
    return resorts.filter((resort) => resort.name.toLowerCase().includes(query.toLowerCase()));
}

export default function SearchComponent() {

    const [query, setQuery] = useState("");
    

    const[resortList, setResortList] = useState([]);  
    useEffect(() => {
        const fetchResorts = async() => {
          try {
            const resorts = await getResorts();
            setResortList(resorts);
          } catch (err) {
            console.error(err)
          }
        };
        fetchResorts();
      }, []);

      const filteredResorts = getFilteredResorts(query, resortList);
    

    
    return (
        <div className = "search-box">
            <input type="text" onChange={e=> setQuery (e.target.value)} />
            {query && (
                <ul>
                    {filteredResorts.map(value => (
                        <h1 key={value.name}>{value.name}</h1>
                    ))}
                </ul>
            )}
        </div>
    )
}

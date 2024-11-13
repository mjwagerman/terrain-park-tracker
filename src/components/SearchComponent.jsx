import React from 'react'
import { useState, useEffect, useMemo } from "react";

import { getResorts } from "../services/getResorts";


const getFilteredResorts = (query, resorts) => {
    if (!query) {
        return resorts;
    }
    return resorts.filter((resort) => resort.name.toLowerCase().includes(query.toLowerCase()));
}

export default function SearchComponent( { onResortSelect }) {

    const[query, setQuery] = useState("");
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

      const filteredResorts = useMemo(() => getFilteredResorts(query, resortList), [query,]);
    

    
    return (
        <div className = "search-box">
            <input type="text" placeholder="Search resorts..." onChange={e=> setQuery (e.target.value)} />
            {query && (
                <ul>
                    {filteredResorts.map(value => (
                        <li key={value.name} onClick={() => onResortSelect(value)}>
                            {value.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

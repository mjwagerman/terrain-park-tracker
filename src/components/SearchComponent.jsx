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
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
            <input
             type="text" 
             placeholder="Search resorts..." 
             value={query}
             onChange={e=> {
                setQuery (e.target.value);
                setIsDropdownVisible(true);
            } }
            />
            {isDropdownVisible && query && (
                <ul>
                    {filteredResorts.map(value => (
                        <h1 
                        key={value.name} 
                        onClick={() => {
                            onResortSelect(value);
                            setIsDropdownVisible(false);
                            setQuery(value.name);
                        }}
                        >
                            {value.name}
                        </h1>
                    ))}
                </ul>
            )}
        </div>
    )
}

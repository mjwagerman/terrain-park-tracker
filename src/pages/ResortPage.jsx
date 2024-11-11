import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getResorts } from "../services/getResorts"; 
import { Link } from "react-router-dom";


export default function ResortPage() {

    const[resortList, setResortList] = useState([]);
    const [resort, setResort] = useState(null);
    const params = useParams();

    useEffect(() => {
        const fetchResorts = async() => {
          try {
            const resorts = await getResorts();
            setResortList(resorts);

            const selectedResort = resorts.find(r => r.domain === params.resort);
            setResort(selectedResort);
          } catch (err) {
            console.error(err)
          }
        };
        fetchResorts();
      }, [params.resort]);

      if (!resort) return <div>Loading...</div>;
    
    return (
        <div>
           <h1>{resort.name}</h1>
           <p>{resort.website}</p>
           
        </div>
    )
    
}

import React from 'react';
import { useState, useEffect } from 'react'
import ResortMainFeed from '../components/ResortMainFeed';
import { getResorts } from "../services/getResorts";
import { Link } from "react-router-dom";


export default function ResortsPage() {

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

  return (
    <div>
        {/* <p>hafaf</p> */}
        {/* <ResortMainFeed /> */}

        {resortList.map((resort) => (
          <Link 
            key={resort}
            to={`/resorts/${resort.domain}`}
          
          >
            {resort.name}
          </Link>
          ))}
    </div>
  )
}

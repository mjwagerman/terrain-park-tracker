import { useState, useEffect } from 'react'
import getResorts from '../services/getResorts'


export default function useFetchResorts() {
 
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
  
    
      return resortList;
}

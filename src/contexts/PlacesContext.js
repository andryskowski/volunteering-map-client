/* eslint-disable import/prefer-default-export */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {
  useState, useEffect, createContext,
} from 'react';
import { getPlaces } from '../actions/FetchData';

export const PlacesContext = createContext();

const PlacesContextProvider = ({ children }) => {
  // Initialize state
  const [data, setData] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchMyData = async () => {
      const response = await getPlaces();
      setData(response);
    };
    fetchMyData();
  }, []);

  return (
    <PlacesContext.Provider value={data}>
      {children}
    </PlacesContext.Provider>
  );
};

export { PlacesContextProvider };

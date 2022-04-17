/* eslint-disable import/prefer-default-export */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {
  useState, useEffect, createContext,
} from 'react';
import { getUsers } from '../actions/FetchData';

export const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {
  // Initialize state
  const [data, setData] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchMyData = async () => {
      const response = await getUsers();
      setData(response);
    };
    fetchMyData();
  }, []);

  return (
    <UsersContext.Provider value={data}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContextProvider };

import React, {
  useState, useEffect, createContext,
} from 'react';
  
export const AccessibleInterfaceContext = createContext();
  
const AccessibleInterfaceContextProvider = ({ children }) => {
  // Initialize state
  const [isAccessibleInterface, setIsAccesibleInterface] = useState(false);

  return (
    <AccessibleInterfaceContext.Provider value={{ isAccessibleInterface, setIsAccesibleInterface }}>
      {children}
    </AccessibleInterfaceContext.Provider>
  );
};
  
export { AccessibleInterfaceContextProvider };

import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  // Initialize user state as an object with potential fields like id, number_id, and email
  const [name, setName] = useState('');

  return (
    <SearchContext.Provider value={[ name, setName ]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for easier access
export const useSearch = () => useContext(SearchContext);

export default SearchContextProvider;

import { createContext, useState, useContext } from "react";

const UserLoginContext = createContext();

const UserLoginContextProvider = ({ children }) => {
  // Initialize user state as an object with potential fields like id, number_id, and email
  const [user, setUser] = useState({
    id: '',
    number_id: '',
    email: ''
  });

  return (
    <UserLoginContext.Provider value={[ user, setUser ]}>
      {children}
    </UserLoginContext.Provider>
  );
};

// Custom hook for easier access
export const useUserLogin = () => useContext(UserLoginContext);

export default UserLoginContextProvider;

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const setUserDataValue = (data) => {
    setUserData(data);
  };

  return (
    <AuthContext.Provider value={{ userData, setUserDataValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

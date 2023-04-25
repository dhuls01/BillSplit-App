import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeToken, removeToken, verifyToken } from '../api/auth';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const authenticateUser = useCallback(async () => {
    const { isValid, user } = await verifyToken();

    if (isValid) {
      setIsLoggedIn(true);
      setIsLoading(false);
      setUser(user);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }, []);

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();

    // Empty location state after logout
    navigate('/login', { state: {} });
  };

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };

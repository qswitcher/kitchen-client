import React, { useContext, createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  const login = async (email, password) => {
    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push('/recipes');
    } catch (e) {
      alert(e.message);
    }
  };

  const logout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
  };

  return (
    !isAuthenticating && (
      <AppContext.Provider
        {...props}
        value={{ isAuthenticated, login, logout }}
      />
    )
  );
};

export function useAppContext() {
  return useContext(AppContext);
}

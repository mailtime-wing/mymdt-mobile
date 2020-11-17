import React, {createContext, useContext} from 'react';

import {AuthContext} from '@/context/auth';
import {PreloadDataContext} from '@/context/preloadData';
import SplashScreen from '@/screens/SplashScreen';

export const SplashContext = createContext(false);

export const SplashProvider = ({children}) => {
  const {initialized: authInitialized} = useContext(AuthContext);
  const {initialized: preloadDataInitialized} = useContext(PreloadDataContext);

  // ensure all data required by our app is loaded
  if (!authInitialized || !preloadDataInitialized) {
    return <SplashScreen />;
  }

  return (
    <SplashContext.Provider value={true}>{children}</SplashContext.Provider>
  );
};

export default SplashProvider;

import React, {createContext, useContext} from 'react';

import {AuthContext} from '@/context/auth';
import {PreloadDataContext} from '@/context/preloadData';
import RNBootSplash from 'react-native-bootsplash';

export const SplashContext = createContext(false);

export const SplashProvider = ({children}) => {
  const {initialized: authInitialized} = useContext(AuthContext);
  const {initialized: preloadDataInitialized} = useContext(PreloadDataContext);

  // ensure all data required by our app is loaded
  useEffect(() => {
    if (authInitialized && preloadDataInitialized) {
      RNBootSplash.hide();
    }
  }, [authInitialized, preloadDataInitialized]);

  if (!authInitialized || !preloadDataInitialized) {
    return null;
  }

  return (
    <SplashContext.Provider value={true}>{children}</SplashContext.Provider>
  );
};

export default SplashProvider;

import React, {createContext, useContext, useEffect} from 'react';

import {AuthContext} from '@/context/auth';
import {PreloadDataContext} from '@/context/preloadData';
import RNBootSplash from 'react-native-bootsplash';

export const SplashContext = createContext(false);

export const SplashProvider = ({children}) => {
  const {initialized: authInitialized} = useContext(AuthContext);
  const {initialized: preloadDataInitialized} = useContext(PreloadDataContext);

  // ensure all data required by our app is loaded
  useEffect(() => {
    let timeoutId;
    if (authInitialized && preloadDataInitialized) {
      // delay the hiding so that UI is ready right after splash disappears
      timeoutId = setTimeout(() => {
        RNBootSplash.hide();
      }, 300);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [authInitialized, preloadDataInitialized]);

  if (!authInitialized || !preloadDataInitialized) {
    return null;
  }

  return (
    <SplashContext.Provider value={true}>{children}</SplashContext.Provider>
  );
};

export default SplashProvider;

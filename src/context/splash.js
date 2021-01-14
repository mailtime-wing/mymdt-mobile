import React, {createContext, useContext, useEffect, useState} from 'react';

import {AuthContext} from '@/context/auth';
import {PreloadDataContext} from '@/context/preloadData';
import RNBootSplash from 'react-native-bootsplash';

export const SplashContext = createContext(false);

export const SplashProvider = ({children}) => {
  const {initialized: authInitialized} = useContext(AuthContext);
  const {initialized: preloadDataInitialized} = useContext(PreloadDataContext);
  const [splashHidden, setSplashHidden] = useState(false);

  // ensure all data required by our app is loaded
  useEffect(() => {
    let timeoutId;
    if (authInitialized && preloadDataInitialized) {
      // delay the hiding so that UI is ready right after splash disappears
      timeoutId = setTimeout(() => {
        RNBootSplash.hide();
        setSplashHidden(true);
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
    <SplashContext.Provider value={splashHidden}>
      {children}
    </SplashContext.Provider>
  );
};

export default SplashProvider;

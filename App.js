import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';

import NavigationContainer from './src/NavigationContainer'
import LanguageProvider, { LanguageContext } from './src/context/LanguageContext';

const AppContainer = () => {
  const { language, translation } = useContext(LanguageContext)
  return (
    <IntlProvider locale={language} messages={translation}>
      <NavigationContainer />
    </IntlProvider>
  )
}

function App(props) {
  return (
    <LanguageProvider>
      <AppContainer {...props} />
    </LanguageProvider>
  );
}

export default App;

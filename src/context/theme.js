import React, {createContext, useEffect, useState, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {ThemeProvider as EmotionThemeProvider} from 'emotion-theming';
import {darkTheme, lightTheme} from '@/theme';
import AsyncStorage from '@react-native-community/async-storage';

export const ThemeContext = createContext();

const DARK = 'dark';
const LIGHT = 'light';
const SYSTEM_DEFAULT = 'default';
const THEME_MODE = 'themeMode';

const themeList = [
  {value: SYSTEM_DEFAULT, label: <FormattedMessage id="system_default" />},
  {value: DARK, label: <FormattedMessage id="dark" />},
  {value: LIGHT, label: <FormattedMessage id="light" />},
];

export const ThemeProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(colorScheme || LIGHT);
  const isDarkMode =
    themeMode === DARK ||
    (themeMode === SYSTEM_DEFAULT && colorScheme === DARK);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const themeContext = useMemo(
    () => ({
      changeThemeMode: async mode => {
        try {
          await AsyncStorage.setItem(THEME_MODE, mode);
          setThemeMode(mode);
        } catch (e) {
          console.error(`${e} in saving theme mode`);
        }
      },
      darkMode: isDarkMode,
      themeList: themeList,
      themeMode: themeList.find(t => t.value === themeMode).label,
    }),
    [isDarkMode, themeMode],
  );

  useEffect(() => {
    const getThemeMode = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_MODE);
        if (savedTheme) {
          setThemeMode(savedTheme);
        } else {
          themeContext.changeThemeMode(themeMode);
        }
      } catch (e) {
        console.error(`${e} in getting theme mode`);
      }
    };
    getThemeMode();
  }, [isDarkMode, themeContext, themeMode]);

  return (
    <ThemeContext.Provider value={themeContext}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

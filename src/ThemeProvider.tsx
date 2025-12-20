import React, {createContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {useAppSelector} from 'stores';
import {DarkStyle, LightStyle} from 'utils/Colors';

export type ThemeStyleType = typeof LightStyle;

export const ThemeContext = createContext({
  theme: 'light' as ThemeType,
  themeStyle: LightStyle,
});

export const ThemeProvider = (props: {children: any}) => {
  const themeSetting = useAppSelector(state => state.common).theme;
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(
    colorScheme == 'dark' ? 'dark' : 'light',
  );
  const [style, setStyle] = useState(
    colorScheme == 'dark' ? DarkStyle : LightStyle,
  );
  useEffect(() => {
    if (themeSetting) {
      setTheme(themeSetting);
    } else {
      const timeout = setTimeout(() => {
        setTheme(colorScheme == 'dark' ? 'dark' : 'light');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [themeSetting, colorScheme]);
  useEffect(() => {
    if (theme == 'light') {
      setStyle(LightStyle);
    } else {
      setStyle(DarkStyle);
    }
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeStyle: style,
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

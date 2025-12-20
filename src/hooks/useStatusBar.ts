import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {NavigationBar, SystemBarStyle} from 'react-native-bars';
import {Platform, StatusBar} from 'react-native';
import useTheme from './useTheme';
const useStatusBar = (
  style?: SystemBarStyle,
  navStyle?: SystemBarStyle,
  depend?: any[],
) => {
  const {theme} = useTheme();

  useFocusEffect(
    useCallback(
      () => {
        StatusBar.setBarStyle(
          (style ?? theme) == 'light' ? 'dark-content' : 'light-content',
        );
        if (Platform.OS == 'android') {
          // StatusBar.setTranslucent(true);
          // StatusBar.setBackgroundColor('transparent');
        }

        NavigationBar.pushStackEntry({
          barStyle:
            (navStyle ?? style ?? theme == 'light')
              ? 'dark-content'
              : 'light-content',
        });
      },
      depend ?? [theme],
    ),
  );
};

export default useStatusBar;

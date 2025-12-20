import {StyleSheet} from 'react-native';

export const FontFamily = {};

export const GlobalStyles = StyleSheet.create({
  shadow: {
    elevation: 10,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  shadowLite: {
    elevation: 3,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  shadowDept: {
    elevation: 15,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

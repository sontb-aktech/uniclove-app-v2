import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

// const PreloadAds = lazyWithPreload(
//   () => import('screens/login/components/IntroAdmobBanner'),
// );

const OnboardingScreen = () => {
  const {theme, themeStyle} = useTheme();
  const {trans} = useTrans();
  useStatusBar();

  return <View style={[styles.container, {backgroundColor: 'red'}]}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  pageContainer: {
    flex: 1,
    // width: width,
    // height: height,
  },
});

export default OnboardingScreen;

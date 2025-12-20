import useStatusBar from 'hooks/useStatusBar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {WidgetPreview} from 'react-native-android-widget';
import useCommon from 'hooks/useCommon';
// import {trans} from 'trans';
import useRouteParams from 'hooks/useRouteParams';
import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';

const HomeScreen = () => {
  const {theme, themeStyle} = useTheme();
  useStatusBar();
  const common = useCommon();
  const params = useRouteParams('HomeScreen');
  // common.showNotice('warning', 'testttttt  ffff');
  const {trans, langCode} = useTrans();
  // const route = useRouteParams('HomeScreen');
  const insets = useSafeAreaInsets();
  // const isGPTTyping = useAppSelector(state => state.gpt).isGPTTyping;

  return <View style={[styles.container]}></View>;
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

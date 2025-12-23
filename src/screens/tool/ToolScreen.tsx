import ScreenContainer from 'components/ScreenContainer';
import useCommon from 'hooks/useCommon';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
const ToolScreen = () => {
  useStatusBar();
  const { theme, themeStyle } = useTheme();
  const common = useCommon();

  return <ScreenContainer title=""></ScreenContainer>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ToolScreen;

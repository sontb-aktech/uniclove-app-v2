import React from 'react';
import {StyleSheet, View} from 'react-native';
import useTrans from 'hooks/useTrans';
import useTheme from 'hooks/useTheme';
import useVersion from 'hooks/useVersion';
import useStatusBar from 'hooks/useStatusBar';
import useCommon from 'hooks/useCommon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function SettingsScreen() {
  useStatusBar();
  const {theme, themeStyle} = useTheme();
  const {trans} = useTrans();
  const version = useVersion();
  const common = useCommon();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: themeStyle.background,
      }}></View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    marginTop: 0,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 12,
    marginTop: 20,
  },
  btnBack: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;

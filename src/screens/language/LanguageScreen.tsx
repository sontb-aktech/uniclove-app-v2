import React from 'react';
import ScreenContainer from 'components/ScreenContainer';
import {StyleSheet, View} from 'react-native';

const LanguageScreen = () => {
  // const {theme, themeStyle} = useTheme();

  return (
    <ScreenContainer
      style={styles.container}
      title={'trans.Select_language'}
      headerStyle={{paddingRight: 28}}
      // listButtonRight={[
      //   {
      //     button: (
      //       <IconAwesome
      //         name="check"
      //         size={26}
      //         color={!!selectedLang ? COLOR.ACCENT_1 : COLOR.OVERLEY_DARK_20}
      //       />
      //     ),
      //     onPress: () => onContine(),
      //   },
      // ]}
      // safeBottom
      // listButtonRight={
      //   isSelected ? [{text: trans.Continue, onPress: () => onContine()}] : []
      // }
      disableBack>
      <View style={{flex: 1}}></View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default LanguageScreen;

import GradientButton from 'components/button/GradientButton';
import ScreenContainer from 'components/ScreenContainer';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
const WelcomScreen = () => {
  useStatusBar();
  const { theme, themeStyle } = useTheme();
  const common = useCommon();

  return (
    <ScreenContainer title="" hideHeader safeBottom>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
          <Image
            style={{ flex: 1, aspectRatio: 1 }}
            source={require('assets/img_welcome.png')}
          />
        </View>
        <CustomText fontStyleType="header-medium">Tất cả đã xong!</CustomText>
        <CustomText
          colorType="subtitleText"
          style={{ textAlign: 'center', marginHorizontal: 24, marginTop: 12 }}
        >
          Tài khoản của bạn đã được tạo ra. Hãy bắt đầu khám phá thế giới ngập
          tràn tình yêu
        </CustomText>
      </View>
      <GradientButton
        text="Khám phá ngay"
        style={{ marginTop: 0, marginHorizontal: 20 }}
        onPress={() => common.navigate('WelcomScreen')}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WelcomScreen;

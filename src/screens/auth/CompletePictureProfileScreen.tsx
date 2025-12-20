import ImageIcon from 'components/ImageIcon';
import ScreenContainer from 'components/ScreenContainer';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
const CompletePictureProfileScreen = () => {
  useStatusBar('dark-content');
  const { theme, themeStyle } = useTheme();
  const common = useCommon();

  return (
    <ScreenContainer title="" contentContainerStyle={{ alignItems: 'center' }}>
      <CustomText fontStyleType="header-medium">
        Thêm hình ảnh của bạn
      </CustomText>
      <CustomText
        colorType="subtitleText"
        style={{ textAlign: 'center', marginHorizontal: 20, marginTop: 12 }}
      >
        Thêm các bức ảnh, có thể là bạn cùng thú cưng, đang ăn món ăn yêu
        thích...
      </CustomText>
      <View
        style={{
          width: 220,
          height: 220,
          borderRadius: 24,
          borderWidth: 1.5,
          borderColor: themeStyle.primary,
          marginTop: 24,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageIcon
          source={require('assets/img_default_profile.png')}
          size={36}
        />
        <CustomText style={{ color: themeStyle.primary, marginTop: 8 }}>
          Tải lên ảnh đại diện
        </CustomText>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CompletePictureProfileScreen;

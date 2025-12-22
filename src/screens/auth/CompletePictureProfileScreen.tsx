import ImageIcon from 'components/image/ImageIcon';
import ScreenContainer from 'components/ScreenContainer';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AvatarUpload from './components/AvatarUpload';
import PictureProfileUpload from './components/PictureProfileUpload';
const CompletePictureProfileScreen = () => {
  useStatusBar();
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
      <AvatarUpload />
      <PictureProfileUpload />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CompletePictureProfileScreen;

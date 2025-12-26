import ScreenContainer from 'components/ScreenContainer';
import useCommon from 'hooks/useCommon';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SurveyHeader from './components/SurveyHeader';
import CustomText from 'components/text/CustomText';
import GroupSelector from 'components/selected/GroupSelector';
import GradientButton from 'components/button/GradientButton';

export const LIST_HOBBIES = [
  'Du lịch',
  'Âm nhạc',
  'Thể thao',
  'Đọc sách',
  'Nấu ăn',
  'Chụp ảnh',
  'Xem phim',
  'Mua sắm',
];

const SurveyStep3Screen = () => {
  useStatusBar();
  const { theme, themeStyle } = useTheme();
  const common = useCommon();
  const [listSelected, setListSelected] = React.useState<number[]>([]);
  return (
    <ScreenContainer title="" safeBottom hideHeader>
      <SurveyHeader step={3} />
      <View style={styles.container}>
        <CustomText fontStyleType="header-medium">
          Chọn sở thích của bạn
        </CustomText>
        <CustomText colorType="subtitleText" style={{ marginTop: 8 }}>
          Đây là những cơ sở quan đểm để kết nối với những người cùng giá trị
          quan
        </CustomText>
        <GroupSelector
          style={{ marginTop: 16 }}
          listItems={LIST_HOBBIES}
          listSelected={listSelected}
          onPressItem={index => {
            if (listSelected.includes(index)) {
              setListSelected(listSelected.filter(item => item !== index));
            } else {
              setListSelected([...listSelected, index]);
            }
          }}
        />
      </View>
      <GradientButton
        text="Hoàn tất hồ sơ"
        style={{ marginTop: 0, marginHorizontal: 20 }}
        onPress={() => common.navigate('SurveyStep2Screen')}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 24,
  },
});

export default SurveyStep3Screen;

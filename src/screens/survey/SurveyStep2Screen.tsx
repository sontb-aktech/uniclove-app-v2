import ScreenContainer from 'components/ScreenContainer';
import useCommon from 'hooks/useCommon';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SurveyHeader from './components/SurveyHeader';
import CustomText from 'components/text/CustomText';
import GradientButton from 'components/button/GradientButton';
import ImageIcon from 'components/image/ImageIcon';
import RatioItem from 'components/ratio/RatioItem';
const LIST_TEST = [
  'Tôi muốn kết hôn trong tương lai',
  'Tôi chưa chắc chắn về hôn nhân',
  'Tôi không muốn kết hôn',
];

const SurveyStep2Screen = () => {
  useStatusBar();
  const { theme, themeStyle } = useTheme();
  const common = useCommon();
  const [selectedGender, setSelectedGender] = React.useState<number>();
  return (
    <ScreenContainer title="" safeBottom hideHeader>
      <SurveyHeader step={2} />
      <View style={styles.container}>
        <CustomText fontStyleType="header-medium">
          Những quan điểm về giá trị cuộc sống của bạn?
        </CustomText>
        <CustomText colorType="subtitleText" style={{ marginTop: 8 }}>
          Đây là những cơ sở quan đểm để kết nối với những người cùng giá trị
          quan
        </CustomText>
        <View>
          <CustomText fontStyleType="title-semibold" style={{ marginTop: 16 }}>
            Quan điểm về hôn nhân
          </CustomText>
          {LIST_TEST.map((gender, index) => (
            <RatioItem
              label={gender}
              isSelected={selectedGender === index}
              onPress={() => setSelectedGender(index)}
              style={{ marginTop: 12 }}
              key={index}
            />
          ))}
        </View>
      </View>
      <GradientButton
        text="Tiếp tục"
        style={{ marginTop: 0, marginHorizontal: 20 }}
        iconRight={
          <ImageIcon source={require('assets/ic_arrow_right_light.png')} />
        }
        onPress={() => common.navigate('SurveyStep3Screen')}
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

export default SurveyStep2Screen;

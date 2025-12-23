import ScreenContainer from 'components/ScreenContainer';
import useCommon from 'hooks/useCommon';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SurveyProgress from './components/SurveyProgress';
import SurveyHeader from './components/SurveyHeader';
import CustomText from 'components/text/CustomText';
import CheckboxItem from 'components/checkbox/CheckboxItem';
import GradientButton from 'components/button/GradientButton';
import ImageIcon from 'components/image/ImageIcon';
const LIST_GENDER = ['Đàn ông', 'Phụ nữ', 'Mọi người'];

const SurveyStep1Screen = () => {
  useStatusBar();
  const { theme, themeStyle } = useTheme();
  const common = useCommon();
  const [listSelected, setListSelected] = useState<number[]>([]);
  return (
    <ScreenContainer title="" hideHeader safeBottom>
      <SurveyHeader step={1} />
      <View style={styles.container}>
        <CustomText fontStyleType="header-medium">
          Giới tính bạn quan tâm
        </CustomText>
        <CustomText colorType="subtitleText" style={{ marginTop: 8 }}>
          Chọn tất cả các mục phù hợp để giúp chúng tôi giới thiệu những người
          phù hợp với bạn
        </CustomText>
        <View>
          {LIST_GENDER.map((gender, index) => (
            <CheckboxItem
              label={gender}
              isSelected={listSelected.includes(index)}
              onPress={() => {
                if (listSelected.includes(index)) {
                  setListSelected(listSelected.filter(item => item !== index));
                } else {
                  setListSelected([...listSelected, index]);
                }
              }}
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

export default SurveyStep1Screen;

import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import SurveyProgress from './SurveyProgress';
import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
const SurveyHeader = (props: { step: number }) => {
  const { themeStyle } = useTheme();
  return (
    <View style={styles.container}>
      <SurveyProgress step={props.step} />
      <TouchableOpacity hitSlop={10} onPress={() => {}}>
        <CustomText
          fontStyleType="title-semibold"
          style={{ color: themeStyle.primary }}
        >
          Bỏ qua
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default SurveyHeader;

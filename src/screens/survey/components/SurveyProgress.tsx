import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

const PROGRESS_WIDTH = 48;
const SurveyProgress = (props: { style?: ViewStyle; step: number }) => {
  const { themeStyle } = useTheme();
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={[
          styles.progressContainer,
          { backgroundColor: themeStyle.primaryContainer, marginRight: 8 },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              backgroundColor: themeStyle.primary,
              width: (PROGRESS_WIDTH / 3) * props.step,
            },
          ]}
        ></View>
      </View>
      <CustomText fontStyleType="small-regular" colorType="subtitleText">
        {props.step}/3
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    width: PROGRESS_WIDTH,
    height: 8,
    borderRadius: 48,
    flexDirection: 'row',
  },
  progressBar: {
    width: 24,
    height: 8,
    borderRadius: 48,
  },
});

export default SurveyProgress;

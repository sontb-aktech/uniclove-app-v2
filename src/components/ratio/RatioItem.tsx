import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import RatioButton from './RatioButton';
const RatioItem = (props: {
  style?: ViewStyle;
  isSelected?: boolean;
  label: string;
  onPress?: () => void;
}) => {
  const { themeStyle } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: themeStyle.primary,
          backgroundColor: themeStyle.primaryContainer,
        },
        props.isSelected && { borderWidth: 1 },
        props.style,
      ]}
      onPress={props.onPress}
    >
      <CustomText style={{ flex: 1 }}>{props.label}</CustomText>
      <RatioButton isSelected={props.isSelected} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
});

export default RatioItem;

import ImageIcon from 'components/image/ImageIcon';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
const RatioButton = (props: { style?: ViewStyle; isSelected?: boolean }) => {
  const { themeStyle } = useTheme();
  return (
    <View style={[props.style]}>
      {props.isSelected ? (
        <ImageIcon source={require('assets/ic_ratio_active.png')} />
      ) : (
        <ImageIcon source={require('assets/ic_ratio.png')} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RatioButton;

import useTheme from 'hooks/useTheme';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
const RatioButton = (props: {style?: ViewStyle; isSelected?: boolean}) => {
  const {themeStyle} = useTheme();
  return (
    <View style={[props.style]}>
      {props.isSelected ? (
        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: 12,
            borderColor: themeStyle.primary,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 12,
              width: 10,
              height: 10,
              backgroundColor: themeStyle.primary,
            }}
          />
        </View>
      ) : (
        <View
          style={{
            borderColor: themeStyle.onSurfaceVariant,
            width: 16,
            height: 16,
            borderWidth: 1,
            borderRadius: 12,
          }}
        />
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

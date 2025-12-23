import ImageIcon from 'components/image/ImageIcon';
import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
const SelectedItem = (props: {
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
          backgroundColor: themeStyle.primaryContainer,
          borderColor: props.isSelected
            ? themeStyle.primary
            : themeStyle.outline,
        },
        props.style,
      ]}
      onPress={props.onPress}
    >
      {!!props.isSelected && (
        <ImageIcon
          source={require('assets/ic_selected.png')}
          style={{ marginRight: 8 }}
        />
      )}
      <CustomText
        style={{
          color: props.isSelected
            ? themeStyle.primary
            : themeStyle.onSurfaceVariant,
        }}
      >
        {props.label}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 48,
    borderWidth: 1,
    marginTop: 12,
  },
});

export default SelectedItem;

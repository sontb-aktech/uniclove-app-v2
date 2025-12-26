import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  text?: string;
  style?: ViewStyle;
  onPress?: () => void;
  children?: any;
  disabled?: boolean;
  iconRight?: any;
  colors?: string[];
  colorText?: string;
};

const GradientButtonWithColor = (props: Props) => {
  const { themeStyle } = useTheme();
  const colors =
    props.colors && props.colors.length > 0
      ? props.colors
      : ['#F5FAFF', '#F5FAFF'];

  return (
    <TouchableOpacity
      style={[
        {
          paddingVertical: 14,
          overflow: 'hidden',
          borderRadius: 16,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        props.style,
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <LinearGradient
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        pointerEvents="none"
        colors={colors}
      />

      {!!props.text && (
        <CustomText
          fontStyleType="title-semibold"
          style={{
            color: props.colorText || themeStyle.onPrimary,
            marginHorizontal: 8,
          }}
        >
          {props.text}
        </CustomText>
      )}

      {props.children}
      {props.iconRight}
    </TouchableOpacity>
  );
};

export default GradientButtonWithColor;

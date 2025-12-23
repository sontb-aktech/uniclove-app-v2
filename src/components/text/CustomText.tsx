import useTheme from 'hooks/useTheme';
import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { LightStyle } from 'utils/Colors';

export type CustomFontStyleType =
  | 'header-medium'
  | 'header-bold'
  | 'text-regular'
  | 'text-semibold'
  | 'title-semibold'
  | 'small-semibold'
  | 'small-regular';

export type ColorTextType = 'subtitleText' | 'disable' | 'default';

const CustomText = (
  props: TextProps & {
    fontStyleType?: CustomFontStyleType;
    colorType?: ColorTextType;
  },
) => {
  const { themeStyle } = useTheme();
  let style = getFontStyleType(
    props.fontStyleType,
    props.colorType,
    themeStyle,
  );
  return <Text {...props} style={[style, props.style]} />;
};

export const getFontStyleType = (
  type?: CustomFontStyleType,
  colorType?: ColorTextType,
  themeStyle?: typeof LightStyle,
): TextStyle => {
  let style: TextStyle = {
    fontSize: 14,
  };
  switch (type) {
    case 'header-medium':
      style = {
        fontSize: 20,
        fontWeight: '500',
      };
      break;
    case 'header-bold':
      style = {
        fontSize: 20,
        fontWeight: 'bold',
      };
      break;
    case 'title-semibold':
      style = {
        fontSize: 16,
        fontWeight: '600',
      };
      break;
    case 'small-semibold':
      style = {
        fontSize: 12,
        fontWeight: '500',
      };
      break;
    case 'small-regular':
      style = {
        fontSize: 12,
        fontWeight: 'regular',
      };
      break;
    case 'text-semibold':
      style = {
        fontSize: 14,
        fontWeight: '500',
      };
      break;
    default:
      style = {
        fontSize: 14,
        fontWeight: 'regular',
      };
      break;
  }
  switch (colorType) {
    case 'subtitleText':
      style = {
        ...style,
        color: themeStyle?.onSurfaceVariant,
      };
      break;
    case 'disable':
      style = {
        ...style,
        color: themeStyle?.outline,
      };
      break;
    default:
      style = {
        ...style,
        color: themeStyle?.onBackground,
      };
  }
  return style;
};

export default CustomText;

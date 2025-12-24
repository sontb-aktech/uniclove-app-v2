import useTheme from 'hooks/useTheme';
import React from 'react';
import { Image, ImageProps, StyleSheet, View, ViewStyle } from 'react-native';
import { ColorType } from 'utils/Colors';

export type AvatarSizeType = 'tini' | 'small' | 'default' | 'large';

const Avatar = (
  props: ImageProps & {
    style?: ViewStyle;
    sizeType?: AvatarSizeType;
    isShowBorder?: boolean;
    borderColor?: string;
  },
) => {
  const { themeStyle } = useTheme();
  const style = getAvatarStyle(themeStyle, props.sizeType, props.isShowBorder);

  return (
    <View
      style={[
        styles.container,
        style,
        !!props.borderColor && { borderColor: props.borderColor },
      ]}
    >
      <View
        style={{ borderRadius: 100, overflow: 'hidden', flexDirection: 'row' }}
      >
        <Image {...props} style={{ flex: 1, aspectRatio: 1 }} />
      </View>
    </View>
  );
};

const getAvatarStyle = (
  themStyle: ColorType,
  sizeType?: AvatarSizeType,
  isShowBorder?: boolean,
): ViewStyle => {
  let style: ViewStyle = {
    borderRadius: 100,
    backgroundColor: themStyle.surface,
    borderColor: themStyle.primary,
  };
  switch (sizeType) {
    case 'tini':
      style = {
        ...style,
        width: 28,
        height: 28,
        borderWidth: isShowBorder ? 1 : 0,
        padding: isShowBorder ? 2 : 0,
      };
      break;
    case 'small':
      style = {
        ...style,
        width: 48,
        height: 48,
        borderWidth: isShowBorder ? 1 : 0,
        padding: isShowBorder ? 2 : 0,
      };
      break;
    case 'large':
      style = {
        ...style,
        width: 96,
        height: 96,
        borderWidth: isShowBorder ? 2 : 0,
        padding: isShowBorder ? 4 : 0,
      };
      break;
    default:
      style = {
        ...style,
        width: 64,
        height: 64,
        borderWidth: isShowBorder ? 1.5 : 0,
        padding: isShowBorder ? 2 : 0,
      };
  }

  return style;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
  },
});

export default Avatar;

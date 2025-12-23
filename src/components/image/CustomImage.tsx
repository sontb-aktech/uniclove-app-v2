import React from 'react';
import {
  Image,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

const CustomImage = (
  props: ImageProps & { style?: ViewStyle; imageStyle?: ImageStyle },
) => {
  return (
    <View style={props.style}>
      <Image {...props} style={props.imageStyle} />
    </View>
  );
};

export default CustomImage;

import React from 'react';
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Props = {
  size?: number;
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  tintColor?: string;
  resizeMode?: ImageResizeMode;
};

const ImageIcon = (props: Props) => {
  return (
    <Image
      style={[
        {
          width: props.size ?? 24,
          height: props.size ?? 24,
          tintColor: props.tintColor,
        },
        props.style,
      ]}
      source={props.source}
      resizeMode={props.resizeMode ? props.resizeMode : 'contain'}
    />
  );
};

export default ImageIcon;

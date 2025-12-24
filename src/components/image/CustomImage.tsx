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

const CustomImage = (props: ImageProps & { style?: ViewStyle }) => {
  return (
    <View style={[props.style, { flexDirection: 'row' }]}>
      <Image
        {...props}
        style={[
          { flex: 1 },
          !!props.style?.aspectRatio && {
            aspectRatio: props.style.aspectRatio,
          },
          !!props.style?.width && { width: props.style.width },
          !!props.style?.height && { height: props.style.height },
        ]}
      />
    </View>
  );
};

export default CustomImage;

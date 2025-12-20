import React from 'react';
import {Platform, Text, TextProps, TextStyle} from 'react-native';
// import MaskedView from "@react-native-community/masked-view";
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const GradientText = (
  props: TextProps & {
    style: TextStyle | TextStyle[];
    children?: any;
    colors: string[];
    start?: {x: number; y: number};
    end?: {x: number; y: number};
  },
) => {
  // if(Platform.OS == 'ios')
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={props.colors}
        start={props.start ?? {x: 0, y: 0}}
        end={props.end ?? {x: 1.5, y: 0.5}}>
        <Text
          {...props}
          style={[
            props.style,
            {
              opacity: 0,
            },
          ]}
        />
      </LinearGradient>
    </MaskedView>
  );
  // else
  // return <Text {...props} style={[props.style]} />;
};

export default GradientText;

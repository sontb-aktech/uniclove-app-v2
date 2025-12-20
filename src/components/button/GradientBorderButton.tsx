import MaskedView from '@react-native-masked-view/masked-view';
import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBorderButton = (props: {
  style?: ViewStyle;
  colors?: string[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  borderStyle?: ViewStyle;
  // contentContainerStyle?: ViewStyle;
  onPress?: () => void;
  children?: any;
  text?: string;
}) => {
  const {themeStyle} = useTheme();
  return (
    <TouchableOpacity
      style={[
        {paddingVertical: 14, alignItems: 'center', justifyContent: 'center'},
        props.style,
      ]}
      onPress={props.onPress}>
      <MaskedView
        style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}
        maskElement={
          <View
            style={[
              {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'black',
                flex: 1,
                borderRadius: 16,
              },
              props.borderStyle,
            ]}
          />
        }>
        <LinearGradient
          colors={props.colors ?? ['#67A4FF', '#0786FF']}
          start={props.start}
          end={props.end}
          style={{flex: 1}}
        />
      </MaskedView>
      {!!props.text && (
        <CustomText
          fontStyleType="title-semibold"
          style={{color: themeStyle.primary}}>
          {props.text}
        </CustomText>
      )}
      {props.children}
    </TouchableOpacity>
  );
};

export default GradientBorderButton;

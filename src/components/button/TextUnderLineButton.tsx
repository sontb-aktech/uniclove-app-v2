import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

const TextUnderLineButton = (props: {style?: ViewStyle; text: string}) => {
  const {themeStyle} = useTheme();
  return (
    <TouchableOpacity hitSlop={10} style={[props.style]}>
      <CustomText
        fontStyleType="text-semibold"
        style={{textDecorationLine: 'underline', color: themeStyle.primary}}>
        {props.text}
      </CustomText>
    </TouchableOpacity>
  );
};

export default TextUnderLineButton;

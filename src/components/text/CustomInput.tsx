import useTheme from 'hooks/useTheme';
import React, { useState } from 'react';
import {
  Pressable,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import CustomText, {
  CustomFontStyleType,
  getFontStyleType,
} from './CustomText';
import ImageIcon from 'components/ImageIcon';

const CustomInput = (
  props: TextInputProps & {
    style?: ViewStyle;
    textStyle?: TextStyle;
    type?: 'password' | 'phone';
    fontStyleType?: CustomFontStyleType;
    iconRight?: any;
    isError?: boolean;
    label?: string;
    textError?: string;
  },
) => {
  const { themeStyle } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  return (
    <View style={[props.style]}>
      {!!props.label && (
        <CustomText fontStyleType="title-semibold" style={{ marginBottom: 12 }}>
          {props.label}
        </CustomText>
      )}

      <View
        style={[
          {
            backgroundColor: props.isError
              ? themeStyle.errorContainer
              : themeStyle.primaryContainer,
            borderRadius: 16,
            borderWidth: isFocused || props.isError ? 1 : 0,
            borderColor: props.isError ? themeStyle.error : themeStyle.primary,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
      >
        <TextInput
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={themeStyle.onSurfaceVariant}
          style={[
            getFontStyleType(props.fontStyleType ?? 'text-regular'),
            {
              paddingHorizontal: 12,
              paddingVertical: 16,
              flex: 1,
              maxHeight: 100,
            },
            props.textStyle,
          ]}
          secureTextEntry={props.type == 'password' && !showPass}
        />
        {props.type == 'password' && (
          <Pressable
            hitSlop={10}
            style={{ marginRight: 12 }}
            onPress={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <ImageIcon source={require('assets/ic_eye_off.png')} size={24} />
            ) : (
              <ImageIcon source={require('assets/ic_eye.png')} size={24} />
            )}
          </Pressable>
        )}
        {!!props.iconRight && (
          <View style={{ marginRight: 12 }}>{props.iconRight}</View>
        )}
      </View>
      {!!props.isError && (
        <CustomText
          fontStyleType="title-semibold"
          style={{ marginTop: 8, color: themeStyle.error, fontStyle: 'italic' }}
        >
          {props.textError ?? '*Không được để trống thông tin này'}
        </CustomText>
      )}
    </View>
  );
};

export default CustomInput;

import GradientButton from 'components/button/GradientButton';
import ModalCenter from 'components/modal/ModalCenter';
import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
const ModalSignUpRequired = (props: {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  const {themeStyle} = useTheme();
  return (
    <ModalCenter isVisible={props.isVisible} onCancel={props.onCancel}>
      <View
        style={{
          alignItems: 'center',
          paddingTop: 40,
          paddingBottom: 16,
        }}>
        <CustomText fontStyleType="text-regular" colorType="subtitleText">
          Bạn chưa có tài khoản. Vui lòng đăng ký
        </CustomText>
        <View
          style={{
            width: '80%',
            aspectRatio: 1,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Image
            style={{
              flex: 1,
              aspectRatio: 1,
            }}
            source={require('assets/img_require_signup.png')}
          />
        </View>
        <GradientButton
          text="Đăng ký ngay"
          style={{alignSelf: 'stretch', marginHorizontal: 16}}
          onPress={() => props.onSubmit()}
        />
      </View>
    </ModalCenter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ModalSignUpRequired;

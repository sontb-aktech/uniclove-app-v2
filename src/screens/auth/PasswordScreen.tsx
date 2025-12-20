import GradientBorderButton from 'components/button/GradientBorderButton';
import GradientButton from 'components/button/GradientButton';
import TextUnderLineButton from 'components/button/TextUnderLineButton';
import ScreenContainer from 'components/ScreenContainer';
import CustomInput from 'components/text/CustomInput';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import useRouteParams from 'hooks/useRouteParams';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {login} from 'stores/UserSlice';

const width = Dimensions.get('window').width;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const PasswordScreen = () => {
  const {theme, themeStyle} = useTheme();
  useStatusBar();
  const params = useRouteParams('LoginScreen');
  const insets = useSafeAreaInsets();
  const {trans} = useTrans();
  const common = useCommon();

  const onLogin = async (type: 'apple' | 'google') => {
    // appOpen.preventShow();
    const result = await common.getResultDispatch(login({type}));
  };

  return (
    <ScreenContainer style={styles.container} containInput>
      <ScrollView style={{flex: 1}}>
        <Image
          source={require('assets/img_password.png')}
          style={{
            width: '80%',
            height: undefined,
            aspectRatio: 1,
            // marginTop: insets.top,
            marginTop: -12,
            alignSelf: 'center',
          }}
        />
        <CustomText fontStyleType="header-medium" style={{textAlign: 'center'}}>
          Mật khẩu
        </CustomText>
        <View style={{marginTop: 20, marginHorizontal: 20}}>
          <CustomInput placeholder="Nhập mật khẩu" type="password" autoFocus />
          <GradientButton text="Đăng nhập" style={{marginTop: 20}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginHorizontal: '10%',
            }}>
            <View
              style={[styles.line, {backgroundColor: themeStyle.outline}]}
            />
            <CustomText
              style={{
                color: themeStyle.onSurfaceVariant,
                marginHorizontal: 16,
              }}>
              hoặc
            </CustomText>
            <View
              style={[styles.line, {backgroundColor: themeStyle.outline}]}
            />
          </View>
          <GradientBorderButton
            text="Đăng nhập bằng mã OTP"
            style={{marginTop: 20}}
            onPress={() => common.navigate('VerifyOtpScreen', {phone: ''})}
          />
          <TextUnderLineButton
            text="Quên mật khẩu"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  countryCodeContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  line: {
    height: 1,
    flex: 1,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default PasswordScreen;

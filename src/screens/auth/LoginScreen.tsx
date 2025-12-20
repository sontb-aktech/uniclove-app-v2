import GradientButton from 'components/button/GradientButton';
import ImageIcon from 'components/ImageIcon';
import ScreenContainer from 'components/ScreenContainer';
import CustomInput from 'components/text/CustomInput';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import useRouteParams from 'hooks/useRouteParams';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';
import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {login} from 'stores/UserSlice';
import {GlobalStyles} from 'utils/GlobalStyles';
import ModalSignUpRequired from './components/ModalSignUpRequired';

const width = Dimensions.get('window').width;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const LoginScreen = () => {
  const {theme, themeStyle} = useTheme();
  useStatusBar();
  const params = useRouteParams('LoginScreen');
  const insets = useSafeAreaInsets();
  const {trans} = useTrans();
  const common = useCommon();
  const [showModalSignup, setShowModalSignup] = useState(false);

  const onLogin = async (type: 'apple' | 'google') => {
    // appOpen.preventShow();
    const result = await common.getResultDispatch(login({type}));
  };

  return (
    <ScreenContainer style={styles.container} hideHeader containInput>
      <ScrollView style={{flex: 1}}>
        <Image
          source={require('assets/img_login.png')}
          style={{
            width: width,
            height: undefined,
            aspectRatio: 78 / 84,
          }}
        />
        <View style={{marginHorizontal: 20, marginTop: -width * 0.27}}>
          <CustomText
            fontStyleType="header-medium"
            style={{marginHorizontal: 10, textAlign: 'center'}}>
            Đăng nhập để bắt đầu một chương mới ngập tràn{' '}
            <CustomText
              style={{color: themeStyle.primary}}
              fontStyleType="header-bold">
              tình yêu
            </CustomText>
          </CustomText>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View
              style={[
                styles.countryCodeContainer,
                {backgroundColor: themeStyle.primaryContainer},
              ]}>
              <CustomText>VN +84</CustomText>
            </View>
            <CustomInput
              placeholder="Nhập số điện thoại"
              style={{flex: 1, marginLeft: 8}}
              keyboardType="phone-pad"
            />
          </View>
          <GradientButton
            text="Bắt đầu ngay"
            style={{marginTop: 20}}
            onPress={() => {
              // common.navigate('PasswordScreen');
              setShowModalSignup(true);
            }}
          />
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <View
              style={[styles.line, {backgroundColor: themeStyle.outline}]}
            />
            <CustomText
              style={{
                color: themeStyle.onSurfaceVariant,
                marginHorizontal: 16,
              }}>
              hoặc tiếp tục với
            </CustomText>
            <View
              style={[styles.line, {backgroundColor: themeStyle.outline}]}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View
              style={[
                styles.button,
                {backgroundColor: themeStyle.surface},
                GlobalStyles.shadow,
              ]}>
              <ImageIcon
                source={require('assets/ic_signin_apple.png')}
                size={24}
              />
            </View>
            <View
              style={[
                styles.button,
                {backgroundColor: themeStyle.surface},
                GlobalStyles.shadow,
              ]}>
              <ImageIcon
                source={require('assets/ic_signin_google.png')}
                size={24}
              />
            </View>
            <View
              style={[
                styles.button,
                {backgroundColor: themeStyle.surface},
                GlobalStyles.shadow,
              ]}>
              <ImageIcon
                source={require('assets/ic_signin_facebook.png')}
                size={24}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <ModalSignUpRequired
        isVisible={showModalSignup}
        onCancel={() => setShowModalSignup(false)}
        onSubmit={() => {
          setShowModalSignup(false);
          setTimeout(() => {
            common.navigate('CreatePasswordScreen');
          }, 300);
        }}
      />
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

export default LoginScreen;

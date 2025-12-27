import GradientButton from 'components/button/GradientButton';
import ImageIcon from 'components/image/ImageIcon';
import ScreenContainer from 'components/ScreenContainer';
import CustomInput from 'components/text/CustomInput';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import useRouteParams from 'hooks/useRouteParams';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { checkUserExistThunk, login } from 'stores/UserSlice';
import { GlobalStyles } from 'utils/GlobalStyles';
import ModalSignUpRequired from './components/ModalSignUpRequired';
import Api from 'apis/Api';
import { formatPhoneNumber, validatePhoneWithLib } from 'utils/PhoneUtils';

const width = Dimensions.get('window').width;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const LoginScreen = () => {
  const { theme, themeStyle } = useTheme();
  useStatusBar();
  const params = useRouteParams('LoginScreen');
  const insets = useSafeAreaInsets();
  const { trans } = useTrans();
  const common = useCommon();
  const [showModalSignup, setShowModalSignup] = useState(false);
  const [phone, setPhone] = useState('');
  const [isErrorPhone, setIsErrorPhone] = useState(false);

  const checkUserExist = async () => {
    // if (!phone) {
    //   common.showNotice('warning', 'Vui lòng nhập số điện thoại');
    // }
    const isValid = validatePhoneWithLib(phone, 'VN');
    if (!isValid) {
      setIsErrorPhone(true);
      return;
    }
    const formatedPhone = formatPhoneNumber(phone, {
      country: 'VN',
      style: 'E.164',
      noPlus: true,
    });
    if (!formatedPhone) {
      return;
    }
    const result = await common.getResultDispatch(
      checkUserExistThunk({ identity: formatedPhone! }),
    );
    if (result == true) {
      common.navigate('PasswordScreen', { phone: formatedPhone });
    } else if (result == false) {
      setShowModalSignup(true);
    }
  };

  const onGotoCreatePassword = () => {
    setShowModalSignup(false);
    setTimeout(() => {
      const formatedPhone = formatPhoneNumber(phone, {
        country: 'VN',
        style: 'E.164',
        noPlus: true,
      });
      common.navigate('CreatePasswordScreen', { phone: formatedPhone! });
    }, 300);
  };

  return (
    <ScreenContainer style={styles.container} hideHeader containInput>
      <ScrollView style={{ flex: 1 }}>
        <Image
          source={require('assets/img_login.png')}
          style={{
            width: width,
            height: undefined,
            aspectRatio: 78 / 84,
          }}
        />
        <View style={{ marginHorizontal: 20, marginTop: -width * 0.27 }}>
          <CustomText
            fontStyleType="header-medium"
            style={{ marginHorizontal: 10, textAlign: 'center' }}
          >
            Đăng nhập để bắt đầu một chương mới ngập tràn{' '}
            <CustomText
              style={{ color: '#FF41A9' }}
              fontStyleType="header-bold"
            >
              tình yêu
            </CustomText>
          </CustomText>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View
              style={[
                styles.countryCodeContainer,
                {
                  backgroundColor: themeStyle.primaryContainer,
                  alignSelf: 'baseline',
                },
              ]}
            >
              <CustomText>VN +84</CustomText>
            </View>
            <CustomInput
              placeholder="Nhập số điện thoại"
              style={{ flex: 1, marginLeft: 8 }}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={text => {
                setPhone(text);
                setIsErrorPhone(false);
              }}
              isError={isErrorPhone}
              textError="Số điện thoại không hợp lệ"
            />
          </View>
          <GradientButton
            text="Bắt đầu ngay"
            style={{ marginTop: 20 }}
            onPress={() => {
              // common.navigate('PasswordScreen');
              // setShowModalSignup(true);
              checkUserExist();
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <View
              style={[styles.line, { backgroundColor: themeStyle.outline }]}
            />
            <CustomText
              style={{
                color: themeStyle.onSurfaceVariant,
                marginHorizontal: 16,
              }}
            >
              hoặc tiếp tục với
            </CustomText>
            <View
              style={[styles.line, { backgroundColor: themeStyle.outline }]}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <View
              style={[
                styles.button,
                { backgroundColor: themeStyle.surface },
                GlobalStyles.shadow,
              ]}
            >
              <ImageIcon
                source={require('assets/ic_signin_apple.png')}
                size={24}
              />
            </View>
            <View
              style={[
                styles.button,
                { backgroundColor: themeStyle.surface },
                GlobalStyles.shadow,
              ]}
            >
              <ImageIcon
                source={require('assets/ic_signin_google.png')}
                size={24}
              />
            </View>
            <View
              style={[
                styles.button,
                { backgroundColor: themeStyle.surface },
                GlobalStyles.shadow,
              ]}
            >
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
        onSubmit={onGotoCreatePassword}
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

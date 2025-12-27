import GradientButton from 'components/button/GradientButton';
import ImageIcon from 'components/image/ImageIcon';
import ScreenContainer from 'components/ScreenContainer';
import CustomInput from 'components/text/CustomInput';
import CustomText from 'components/text/CustomText';
import { FormInputGroup } from 'components/text/FormInputGroup';
import useCommon from 'hooks/useCommon';
import useRouteParams from 'hooks/useRouteParams';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { login } from 'stores/UserSlice';
import TextUtils from 'utils/TextUtils';

const width = Dimensions.get('window').width;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const ERROR_PASS =
  'Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
const CreatePasswordScreen = () => {
  const { theme, themeStyle } = useTheme();
  useStatusBar();
  const params = useRouteParams('CreatePasswordScreen');
  const insets = useSafeAreaInsets();
  const { trans } = useTrans();
  const common = useCommon();
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorRepassword, setIsErrorRepassword] = useState(false);
  const [textErrorPassword, setTextErrorPassword] = useState('');
  const [textErrorRepassword, setTextErrorRepassword] = useState('');

  const onContinue = () => {
    common.navigate('CompleteProfileScreen', {
      phone: params?.phone!,
      password,
    });
  };

  useEffect(() => {
    if (password) {
      const passOk = TextUtils.verifyPass(password);
      setIsErrorPassword(!passOk);
      if (!passOk) {
        setTextErrorPassword(ERROR_PASS);
      } else {
        setTextErrorPassword('');
      }
    }
  }, [password]);

  useEffect(() => {
    if (repassword) {
      const verify = TextUtils.verifyPass(repassword);
      setIsErrorRepassword(!(verify && password == repassword));
      if (!verify) {
        setTextErrorRepassword(ERROR_PASS);
      } else if (password != repassword) {
        setTextErrorRepassword('Mật khẩu không trùng khớp');
      } else {
        setTextErrorRepassword('');
      }
    }
  }, [repassword]);

  return (
    <ScreenContainer style={styles.container} hideHeader>
      <ScrollView style={{ flex: 1 }}>
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
        <CustomText
          fontStyleType="header-medium"
          style={{ textAlign: 'center' }}
        >
          Tạo mật khẩu
        </CustomText>
        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          <FormInputGroup>
            <CustomInput
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Nhập mật khẩu"
              type="password"
              isError={isErrorPassword}
              textError={textErrorPassword}
            />
            <CustomInput
              value={repassword}
              onChangeText={text => setRepassword(text)}
              placeholder="Nhập lại mật khẩu"
              type="password"
              style={{ marginTop: 16 }}
              isError={isErrorRepassword}
              textError={textErrorRepassword}
            />
          </FormInputGroup>

          <GradientButton
            text="Tiếp tục"
            style={{ marginTop: 20 }}
            disabled={
              isErrorPassword || isErrorRepassword || password != repassword
            }
            iconRight={
              <ImageIcon source={require('assets/ic_arrow_right_light.png')} />
            }
            onPress={onContinue}
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

export default CreatePasswordScreen;

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
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { login } from 'stores/UserSlice';

const width = Dimensions.get('window').width;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const CreatePasswordScreen = () => {
  const { theme, themeStyle } = useTheme();
  useStatusBar();
  const params = useRouteParams('LoginScreen');
  const insets = useSafeAreaInsets();
  const { trans } = useTrans();
  const common = useCommon();

  const onLogin = async (type: 'apple' | 'google') => {
    // appOpen.preventShow();
    const result = await common.getResultDispatch(login({ type }));
  };

  const onVerifyPassword = () => {
    common.navigate('CompleteProfileScreen');
  };

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
              placeholder="Nhập mật khẩu"
              type="password"
              autoFocus
            />
            <CustomInput
              placeholder="Nhập lại mật khẩu"
              type="password"
              style={{ marginTop: 16 }}
              onSubmitEditing={onVerifyPassword}
            />
          </FormInputGroup>

          <GradientButton
            text="Tiếp tục"
            style={{ marginTop: 20 }}
            iconRight={
              <ImageIcon source={require('assets/ic_arrow_right_light.png')} />
            }
            onPress={onVerifyPassword}
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

import GradientButton from 'components/button/GradientButton';
import TextUnderLineButton from 'components/button/TextUnderLineButton';
import ScreenContainer from 'components/ScreenContainer';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import useRouteParams from 'hooks/useRouteParams';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {removeListener, startOtpListener} from 'react-native-otp-verify';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {sendOtp, validOtp} from 'stores/UserSlice';

const VerifyOtpScreen = () => {
  useStatusBar();
  const common = useCommon();
  const phone = useRouteParams('VerifyOtpScreen')?.phone;
  const insets = useSafeAreaInsets();
  const {themeStyle} = useTheme();
  // const recaptcha = useAppSelector(state => state.user).recaptcha;
  const [listInput, setListInput] = useState(['', '', '', '', '', '']);
  const refsInput = useRef([
    null,
    null,
    null,
    null,
    null,
    null,
  ] as (TextInput | null)[]);
  const [downTime, setDownTime] = useState(0);
  const [otpMethod, setOtpMethod] = useState(0);

  // useEffect(() => {
  //   refreshToken();
  // }, []);

  useEffect(() => {
    sendOtpApi();
  }, [otpMethod]);

  useEffect(() => {
    if (Platform.OS == 'android') {
      startOtpListener(message => {
        try {
          const otp = /(\d{6})/g.exec(message)?.[1];
          if (otp && otp.length == 6) {
            setListInput(otp?.split(''));
          }
        } catch {}
      });
      return () => removeListener();
    }
  }, []);

  useEffect(() => {
    let timeout: any;
    if (downTime > 0) {
      timeout = setTimeout(() => {
        setDownTime(downTime - 1);
      }, 1000);
    } else {
      timeout && clearTimeout(timeout);
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [downTime]);

  useEffect(() => {
    if (listInput[5] != '') {
      onValidOtp();
    }
  }, [listInput]);

  async function sendOtpApi() {}

  const onTextChange = (text: string, index: number) => {
    const textOk = text.replace(/[^0-9]/g, '');
    const listInputOk = [...listInput];
    if (index == 5 && listInputOk[5] != '' && text != '') {
      return;
    }
    if (textOk.length > 1) {
      Array.from(textOk).map((item, indexChar) => {
        if (indexChar <= 5) {
          listInputOk[indexChar] = item;
        }
      });
      if (textOk.length < 6) {
        refsInput.current[textOk.length]?.focus();
      } else {
        refsInput.current[5]?.focus();
      }
      setListInput(listInputOk);
    } else {
      listInputOk[index] = textOk;
      setListInput(listInputOk);
      if (text.length > 0) {
        if (index < 5) {
          refsInput.current[index + 1]?.focus();
        }
      }
    }
  };

  async function onValidOtp() {
    const notFull = listInput.some(item => {
      if (item == '') return true;
    });
  }

  function onResendOtp() {
    setDownTime(120);
    if (otpMethod === 0) {
      setOtpMethod(1);
    } else {
      setOtpMethod(0);
    }
    // setOtpMethod()
    // sendOtpApi();
  }
  const a = refsInput.current[0];
  return (
    <ScreenContainer title="" containInput>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={require('assets/img_bg_otp.png')}
            style={{
              width: '80%',
              height: undefined,
              aspectRatio: 1,
            }}
          />
          <CustomText
            style={[
              styles.textTitle,
              {color: themeStyle.onBackground, marginTop: -12},
            ]}
            fontStyleType="header-medium">
            Xác minh OTP
          </CustomText>
          <CustomText
            style={[
              styles.textDesc,
              {color: themeStyle.onSurfaceVariant, marginTop: 4},
            ]}
            fontStyleType="text-regular">
            Nhập dãy số OTP đã gửi đến +84 387024364
          </CustomText>

          <View style={styles.rowContaner} removeClippedSubviews={true}>
            {listInput.map((item, index) => {
              return (
                <View
                  style={[
                    styles.inputContaner,
                    {
                      backgroundColor: themeStyle.primaryContainer,
                      borderColor: !!item ? themeStyle.primary : 'transparent',
                    },
                  ]}
                  key={index}>
                  <TextInput
                    ref={ref => {
                      refsInput.current[index] = ref;
                    }}
                    value={item}
                    style={styles.inputPhone}
                    onChangeText={text => onTextChange(text, index)}
                    keyboardType="number-pad"
                    textContentType={index == 0 ? 'oneTimeCode' : undefined}
                    // maxLength={1}
                    // contextMenuHidden={true}
                    autoFocus={index == 0}
                    onKeyPress={({nativeEvent}) => {
                      // console.log(nativeEvent);
                      if (
                        nativeEvent.key === 'Backspace' &&
                        listInput[index] == ''
                      ) {
                        refsInput.current[index - 1]?.focus();
                        const listInputOk = [...listInput];
                        listInputOk[index - 1] = '';
                        setListInput(listInputOk);
                      }
                    }}
                  />
                </View>
              );
            })}
          </View>
          <GradientButton
            text="Xác nhận"
            style={{alignSelf: 'stretch', marginHorizontal: 20, marginTop: 20}}
          />
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
            <CustomText
              style={{
                color: themeStyle.onSurfaceVariant,
              }}
              fontStyleType="text-regular">
              Bạn không nhận được gửi OTP?
            </CustomText>
            <TextUnderLineButton
              text="Yêu cầu gửi lại"
              style={{marginLeft: 4}}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    textAlign: 'center',
  },
  textDesc: {},

  rowContaner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 30,
  },
  inputContaner: {
    borderRadius: 12,
    marginHorizontal: 5,
    overflow: 'hidden',
    borderWidth: 1.5,
  },
  inputPhone: {height: 40, width: 40, textAlign: 'center'},
  buttonNext: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  box: {
    width: 300,
    height: 55,
    marginVertical: 20,
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default VerifyOtpScreen;

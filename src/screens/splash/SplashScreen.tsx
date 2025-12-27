import CustomText from 'components/text/CustomText';
import Configs from 'configs';
import FirebaseAnalyticHelper from 'helpers/FirebaseAnalyticHelper';
import useCommon from 'hooks/useCommon';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';
import useVersion from 'hooks/useVersion';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import CodePush from 'react-native-code-push';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import store, { useAppSelector } from 'stores';
import { getConfig, getUserInfo, refreshToken } from 'stores/UserSlice';
// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const width = Dimensions.get('window').width;
const imageWidth = (width * 2) / 3;
const SplashScreen = () => {
  const common = useCommon();
  const { theme, themeStyle } = useTheme();
  useStatusBar();
  // const appOpenAds = useAppOpenAds(AdmobIds.App_Open_Splash);
  // console.log('--- appOpenAds', appOpenAds);

  const { trans, langCode } = useTrans();
  const insets = useSafeAreaInsets();
  // const { accessToken, userInfo, firstInstall } = useAppSelector(
  //   state => state.user,
  // );
  const [isInitedData, setIsInitedData] = useState(false);
  // let didShowApp = useRef(false);
  const [updatingStr, setUpdatingStr] = useState('');
  const version = useVersion();
  // const progress = useSharedValue(0);
  const isAnimReadyRef = useRef(false);
  // const langCode = useAppSelector(state => state.trans).langCode;
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isStartAnimationFinishedRef = useRef(false);
  const isInitDataFinishedRef = useRef(false);

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    showApp();
  }, [isInitedData]);

  const initData = async () => {
    try {
      await Promise.all([
        common.getResultDispatch(getConfig()),
        common.getResultDispatch(refreshToken()),
      ]);
    } catch {
    } finally {
      setIsInitedData(true);
    }
  };

  const showApp = async () => {
    if (isInitedData) {
      const { firstInstall, accessToken, userInfo } = store.getState().user;
      if (firstInstall) {
        common.reset('OnboardingScreen');
      } else {
        if (accessToken) {
          if (userInfo) {
            common.reset('MainTabScreen');
            common.getResultDispatch(getUserInfo());
          } else {
            const result = await common.getResultDispatch(getUserInfo());
            if (result) {
              common.reset('MainTabScreen');
            } else {
              common.reset('LoginScreen');
            }
          }
        } else {
          common.reset('LoginScreen');
        }
      }
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* <BackgroundLight /> */}
      <LinearGradient
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
        colors={['#FFFFFF', '#DEEFFF']}
      />
      <View style={[styles.pageContainer, { marginTop: insets.top + 40 }]}>
        <Image
          style={{
            width: imageWidth,
            height: undefined,
            aspectRatio: 257 / 66,
          }}
          source={require('assets/img_uniclove.png')}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: insets.bottom + 12,
        }}
      >
        <ActivityIndicator
          size={'small'}
          color={themeStyle.primary}
          style={{ marginBottom: 10 }}
        />

        <CustomText colorType="subtitleText">
          {'Phiên bản'}: {version}
        </CustomText>
        <CustomText colorType="subtitleText">{updatingStr}</CustomText>

        {Configs.ENV != 'PROD' && (
          <Text
            style={{
              fontSize: 12,
            }}
          >
            ENV: {Configs.ENV}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
    position: 'absolute',
    alignItems: 'center',
  },
  pageContainer: {
    width: width - 60,
    height: (width - 60) * 1.46,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;

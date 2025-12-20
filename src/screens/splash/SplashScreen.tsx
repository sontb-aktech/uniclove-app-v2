import Configs from 'configs';
import FirebaseAnalyticHelper from 'helpers/FirebaseAnalyticHelper';
import useCommon from 'hooks/useCommon';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';
import useVersion from 'hooks/useVersion';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import CodePush from 'react-native-code-push';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from 'stores';
import {getConfig} from 'stores/UserSlice';
// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const width = Dimensions.get('window').width;

const SplashScreen = () => {
  const common = useCommon();
  const {theme, themeStyle} = useTheme();
  useStatusBar();
  // const appOpenAds = useAppOpenAds(AdmobIds.App_Open_Splash);
  // console.log('--- appOpenAds', appOpenAds);

  const {trans, langCode} = useTrans();
  const [bannerAdDone, setBannerAdDone] = useState(true);
  const [initDataDone, setInitDataDone] = useState(false);
  const [preloadAdDone, setPreloadAdDone] = useState(false);
  const insets = useSafeAreaInsets();
  const userStore = useAppSelector(state => state.user);
  const firstInstall = userStore.firstInstall;
  const userInfo = userStore.userInfo;
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
  }, []);

  const initData = async () => {
    try {
      if (!userInfo) {
      }
    } catch {
    } finally {
      setInitDataDone(true);
    }
  };

  const showApp = async () => {
    setTimeout(() => {
      common.reset('LoginScreen');
    }, 2000);
  };

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      {/* <BackgroundLight /> */}
      <View style={[styles.pageContainer, {marginTop: insets.top + 40}]}>
        {/* <LottieView
          source={themeStyle.logoAnimation}
          style={{width: '50%', height: '50%'}}
          autoPlay
        /> */}
        <Animated.View entering={FadeIn.duration(1000)}>
          <Image
            style={{
              width: width / 2,
              height: ((width / 2) * 36) / 144,
              marginTop: -40,
            }}
            source={require('assets/img_logo_home.png')}
            resizeMode="contain"
          />
        </Animated.View>

        {/* <ImageIcon size={120} source={require('assets/ic_logo.png')} /> */}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: insets.bottom + 12,
        }}>
        {/* <Text
          style={{
            color: themeStyle.textSub,
            fontSize: 12,
            marginBottom: 4,
          }}>
          {trans.ads_warning}
        </Text> */}
        {/* {userStore.memberType == 0 && (
          <Text
            style={{
              color: themeStyle.textSub,
              fontSize: 12,
              marginBottom: insets.bottom + 20,
            }}>
            {version}
          </Text>
        )} */}
        <ActivityIndicator
          size={'small'}
          color={themeStyle.primary}
          style={{marginBottom: 10}}
        />

        {/* <Text
          style={{
            color: themeStyle.textSub,
            fontSize: 12,
            marginBottom: 2,
          }}>
          {trans.ads_warning}
        </Text> */}
        <Text
          style={{
            fontSize: 12,
          }}>
          {'trans.version'}: {version}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}>
          {updatingStr}
        </Text>

        {Configs.ENV != 'PROD' && (
          <Text
            style={{
              fontSize: 12,
            }}>
            ENV: {Configs.ENV}
          </Text>
        )}
      </View>
      {/* {isInited && (
        <AdmobBanner
          adUnitKey="Banner_Splash"
          onAdLoaded={() => {
            setTimeout(() => {
              setBannerAdDone(true);
            }, 3000);
          }}
          onAdFailedToLoad={() => setBannerAdDone(true)}
        />
      )} */}
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

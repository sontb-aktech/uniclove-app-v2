import mobileAds, {
  AdEventType,
  AppOpenAd,
  InterstitialAd,
  NativeAd,
  NativeAdChoicesPlacement,
  NativeMediaAspectRatio,
  RewardedAd,
  RewardedInterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import AdmobIds from 'utils/AdmobIds';
import {DeviceEventEmitter} from 'react-native';
import FirebaseAnalyticHelper from './FirebaseAnalyticHelper';
const initAdmob = async () => {
  // AdManager.subscribe('Native_Home', 'onAdPreloadLoaded', () => {
  //   FirebaseAnalyticHelper.logEvent(`NativeAdPreLoaded_Native_Home`);
  // });
  const a = await mobileAds().initialize();

  console.log('---- initAdmob', a);
  // .then(adapterStatuses => {
  //   // Initialization complete!
  //   console.log('---- initAdmob', adapterStatuses);
  // });
};

export default {
  initAdmob,
  interstitial: (adId: string) => {
    const adUnitId = __DEV__ ? adId : adId;

    const interstitial = InterstitialAd.createForAdRequest(adUnitId);
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        // setLoaded(true);
        interstitial.show();
      },
    );
    interstitial.load();

    return unsubscribe;
  },
  interstitialRequest: (adUnitId: string) => {
    const interstitial = InterstitialAd.createForAdRequest(
      __DEV__ ? TestIds.GAM_INTERSTITIAL! : adUnitId,
      // adUnitId,
    );
    return interstitial;
  },
  nativeAdRequest: (adUnitId: string, aspectRatio?: NativeMediaAspectRatio) => {
    return NativeAd.createForAdRequest(
      __DEV__ ? TestIds.GAM_NATIVE : adUnitId,
      // adUnitId,
      {
        aspectRatio: aspectRatio ?? NativeMediaAspectRatio.LANDSCAPE,
        adChoicesPlacement: NativeAdChoicesPlacement.TOP_RIGHT,
      },
    );
  },
  appOpenRequest: (adUnitId: string) => {
    const appOpen = AppOpenAd.createForAdRequest(
      __DEV__ ? TestIds.GAM_APP_OPEN! : adUnitId,
      // adUnitId,
    );
    return appOpen;
  },
  rewardedRequest: (adUnitId: string) => {
    const rewarded = RewardedAd.createForAdRequest(
      __DEV__ ? TestIds.REWARDED! : adUnitId,
      // adUnitId,
    );
    return rewarded;
  },
  // nativeRegisterAds: (params: {
  //   adUnitId: string;
  //   name: string;
  //   muted?: boolean;
  //   numOfAds?: number;
  // }) => {
  //   // AdManager.resetCache();
  //   AdManager.unRegisterRepository(params.name);
  //   FirebaseAnalyticHelper.logEvent(`NativeAdRequested_${params.name}`);

  //   return AdManager.registerRepository({
  //     name: params.name,
  //     adUnitId: params.adUnitId,
  //     numOfAds: params.numOfAds ?? 3,
  //     videoOptions: {
  //       muted: params.muted,
  //     },
  //     expirationPeriod: 3600000, // in milliseconds (optional)
  //     mediationEnabled: true,
  //   });
  // },
  // unRegisterRepository: (name: string) => {
  //   AdManager.unRegisterRepository(name);
  // },
};

import {PreloadAdsContext} from 'PreloadAdsProvider';
import {useContext, useRef, useSyncExternalStore} from 'react';
import {Platform} from 'react-native';
import {useAppSelector} from 'stores';
import {AdUnitKey} from 'utils/AdmobIds';

export const useRewardedAd = (adUnitKey: AdUnitKey) => {
  const context = useContext(PreloadAdsContext);
  if (!context) {
    throw new Error('useNativeAd must be used inside a NativeAdProvider');
  }
  const {memberType, config} = useAppSelector(state => state.user);

  const {rewardedAds} = context;

  const rewardedAdData = useSyncExternalStore(
    rewardedAds.subscribeRewardedAd,
    () => rewardedAds.getRewardedAdData(adUnitKey),
  );

  const loadRewardedAd = (onAdLoaded?: (success: boolean) => void) => {
    if (memberType == 0 && Platform.OS == 'android') {
      rewardedAds.load(adUnitKey, onAdLoaded);
    } else {
      onAdLoaded?.(false);
    }
  };

  const showRewardedAd = (
    onAdClosed: (earned: boolean) => void,
    onAdEarned: () => void,
    onAdError?: () => void,
  ) => {
    if (memberType == 0 && Platform.OS == 'android') {
      if (rewardedAds?.getState(adUnitKey) == 'Success') {
        rewardedAds.show(
          adUnitKey,
          () => {
            const currentRewarData = rewardedAds.getRewardedAdData(adUnitKey);
            onAdClosed(!!currentRewarData?.earned);
          },
          onAdEarned,
        );
      } else {
        loadRewardedAd(success => {
          if (success) {
            rewardedAds.show(
              adUnitKey,
              () => {
                const currentRewarData =
                  rewardedAds.getRewardedAdData(adUnitKey);
                onAdClosed(!!currentRewarData?.earned);
              },
              onAdEarned,
            );
          } else {
            onAdError?.();
          }
        });
      }
    }
  };

  return {
    rewardedAds,
    loadRewardedAd,
    showRewardedAd,
    rewardedAdData,
  };
};

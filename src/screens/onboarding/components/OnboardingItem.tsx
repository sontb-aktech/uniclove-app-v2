import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
const itemWidth = width;
const OnboardingItem = (props: {
  source: any;
  desc: any;
  // adUnitKey: AdUnitKey;
  index: number;
  currentIndex: number;
  isVisible?: boolean;
}) => {
  const { trans } = useTrans();
  const { themeStyle } = useTheme();
  const insets = useSafeAreaInsets();
  const [disableNext, setDisableNext] = useState(true);
  // const nativeAdRef = useRef<AdmobNativeLargeType>(null);

  useEffect(() => {
    if (props.isVisible) {
      const timeout = setTimeout(() => {
        setDisableNext(false);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [props.isVisible]);
  // const admobRef = useRef<AdmobBannerType>(null);
  // useFocusEffect(
  //   useCallback(() => {
  //     admobRef.current?.startAnimation();
  //   }, []),
  // );
  return (
    <View
      style={{
        // height: width,
        width: width,
        alignItems: 'center',
      }}
    >
      <Image
        source={props.source}
        style={{
          width: itemWidth,
          height: undefined,
          aspectRatio: 780 / 1128,
        }}
        resizeMethod="resize"
        resizeMode="contain"
        fadeDuration={0}
      />

      <Image
        source={props.desc}
        style={{
          width: 350,
          height: undefined,
          aspectRatio: 700 / 256,
          marginTop: -height * 0.05,
        }}
        resizeMethod="resize"
        resizeMode="contain"
        fadeDuration={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width: width,
    // height: height,
  },
});

export default OnboardingItem;

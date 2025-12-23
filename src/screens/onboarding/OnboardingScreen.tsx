import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';
import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import OnboardingItem from './components/OnboardingItem';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from 'components/button/GradientButton';
import ImageIcon from 'components/image/ImageIcon';
import { PageIndicator } from 'react-native-page-indicator';
import useCommon from 'hooks/useCommon';

const { width: screenWidth } = Dimensions.get('window');
const data = [
  {
    source: require('assets/img_onboarding_1.png'),
    desc: require('assets/img_desc_onboarding_1.png'),
  },
  {
    source: require('assets/img_onboarding_2.png'),
    desc: require('assets/img_desc_onboarding_2.png'),
  },
  {
    source: require('assets/img_onboarding_3.png'),
    desc: require('assets/img_desc_onboarding_3.png'),
  },
];
// const PreloadAds = lazyWithPreload(
//   () => import('screens/login/components/IntroAdmobBanner'),
// );

const OnboardingScreen = () => {
  useStatusBar();
  const { theme, themeStyle } = useTheme();
  const { trans } = useTrans();
  const common = useCommon();
  const insets = useSafeAreaInsets();
  const refPagerView = useRef<ICarouselInstance>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const onPressNext = () => {
    const currentIndexOk = refPagerView.current?.getCurrentIndex() ?? 2;
    if (currentIndexOk < 2) {
      // nativeAds?.load('Native_Onboarding_1');
      refPagerView.current?.next();
      setCurrentPage(currentIndexOk + 1);
    } else {
      common.navigate('LoginScreen');
    }
  };
  return (
    <View style={[styles.container]}>
      <LinearGradient
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
        colors={['#FFFFFF', '#DEEFFF']}
      />
      <View style={styles.pageContainer}>
        <Carousel
          loop={false}
          ref={refPagerView}
          width={screenWidth}
          scrollAnimationDuration={600}
          onSnapToItem={index => setCurrentPage(index)}
          data={data}
          pagingEnabled
          renderItem={({ item, index }) => {
            return (
              <OnboardingItem
                source={item.source}
                desc={item.desc}
                index={index}
                currentIndex={currentPage}
              />
            );
          }}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <PageIndicator
          count={3}
          current={currentPage}
          color={themeStyle.surface}
          activeColor={themeStyle.primary}
          size={8}
        />
      </View>

      <GradientButton
        text="Tiếp tục"
        style={{
          marginTop: 24,
          marginHorizontal: 20,
          marginBottom: insets.bottom,
        }}
        iconRight={
          <ImageIcon source={require('assets/ic_arrow_right_light.png')} />
        }
        onPress={onPressNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    // width: width,
    // height: height,
  },
});

export default OnboardingScreen;

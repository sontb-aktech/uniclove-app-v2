import ScreenContainer from 'components/ScreenContainer';
import * as React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';
import MainHeader from 'screens/components/MainHeader';

const window = Dimensions.get('window');
// const data = getImages();

const data = [
  'https://picsum.photos/id/1011/800/600',
  'https://picsum.photos/id/1012/800/600',
  'https://picsum.photos/id/1013/800/600',
  'https://picsum.photos/id/1015/800/600',
];

const MatchingScreen = () => {
  const PAGE_WIDTH = window.width;
  const PAGE_HEIGHT = PAGE_WIDTH / 0.63;

  const directionAnimVal = useSharedValue(0);

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number, index: number) => {
      'worklet';
      const translateY = interpolate(value, [0, 1], [0, -18]);

      const translateX =
        interpolate(value, [-1, 0], [PAGE_WIDTH, 0], Extrapolation.CLAMP) *
        directionAnimVal.value;

      const rotateZ =
        interpolate(value, [-1, 0], [15, 0], Extrapolation.CLAMP) *
        directionAnimVal.value;

      const zIndex = -10 * index;

      const scale = interpolate(value, [0, 1], [1, 0.95]);

      const opacity = interpolate(
        value,
        [-1, -0.8, 0, 1],
        [0, 0.9, 1, 0.85],
        Extrapolation.EXTEND,
      );

      return {
        transform: [
          { translateY },
          { translateX },
          { rotateZ: `${rotateZ}deg` },
          { scale },
        ],
        zIndex,
        opacity,
      };
    },
    [PAGE_HEIGHT, PAGE_WIDTH],
  );

  return (
    <ScreenContainer
      hideHeader
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MainHeader />
      <Carousel
        loop={false}
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
        }}
        defaultIndex={0}
        vertical={false}
        data={data}
        onConfigurePanGesture={g => {
          g.onChange(e => {
            'worklet';
            directionAnimVal.value = Math.sign(e.translationX);
          });
        }}
        width={window.width}
        fixedDirection="negative"
        renderItem={({ index, item }) => <ItemCard key={index} url={item} />}
        customAnimation={animationStyle}
        windowSize={5}
      />
    </ScreenContainer>
  );
};

const ItemCard = (props: { url: string }) => {
  const width = window.width * 0.95;

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        style={{
          width,
          aspectRatio: 374 / 594,
          borderRadius: 48,
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: props.url }}
          style={{
            width,
            aspectRatio: 374 / 594,
            borderRadius: 20,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
          }}
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'red',
          }}
        >
          <Text></Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default MatchingScreen;

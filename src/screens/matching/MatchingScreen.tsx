import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import { IconAnt } from 'libs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardItem from './components/CardItem';
import MainHeader from 'screens/components/MainHeader';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import { logout } from 'stores/UserSlice';

const data: ImageSourcePropType[] = [
  { uri: 'https://picsum.photos/id/1011/800/600' },
  { uri: 'https://picsum.photos/id/1012/800/600' },
  { uri: 'https://picsum.photos/id/1013/800/600' },
  { uri: 'https://picsum.photos/id/1015/800/600' },
  { uri: 'https://picsum.photos/id/1015/800/600' },
];

const ICON_SIZE = 24;

const { width, height } = Dimensions.get('window');
const cardWidth = (width * 90) / 100;
const cardHeight = (cardWidth * 5) / 3;

const MatchingScreen = () => {
  const ref = useRef<SwiperCardRefType>();
  const insets = useSafeAreaInsets();
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const common = useCommon();
  const renderCard = useCallback(
    (source: ImageSourcePropType, index: number) => {
      const isTop = index === activeIndex;
      return (
        <CardItem
          source={source}
          swipeDirection={isTop ? swipeDirection : null}
          isTop={isTop}
        />
      );
    },
    [swipeDirection, activeIndex],
  );
  const renderFlippedCard = useCallback(
    (_: ImageSourcePropType, index: number) => {
      return (
        <View style={styles.renderFlippedCardContainer}>
          <Text style={styles.text}>Flipped content 🚀 {index}</Text>
        </View>
      );
    },
    [],
  );
  const OverlayLabelRight = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'green',
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelLeft = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'red',
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelTop = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'blue',
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelBottom = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'orange',
          },
        ]}
      />
    );
  }, []);

  const closeAnim = useRef(new Animated.Value(0)).current;
  const heartAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (swipeDirection === 'right') {
      Animated.timing(heartAnim, {
        toValue: 1,
        duration: 160,
        useNativeDriver: false,
      }).start();
      Animated.timing(closeAnim, {
        toValue: 0,
        duration: 160,
        useNativeDriver: false,
      }).start();
    } else if (
      swipeDirection === 'left' ||
      swipeDirection === 'top' ||
      swipeDirection === 'bottom'
    ) {
      Animated.timing(closeAnim, {
        toValue: 1,
        duration: 160,
        useNativeDriver: false,
      }).start();
      Animated.timing(heartAnim, {
        toValue: 0,
        duration: 160,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(closeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: false,
      }).start();
      Animated.timing(heartAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: false,
      }).start();
    }
  }, [swipeDirection, closeAnim, heartAnim]);

  return (
    <GestureHandlerRootView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom + 60 },
      ]}
    >
      <MainHeader />
      <TouchableOpacity
        onPress={() => {
          common.dispatch(logout());
          common.navigate('LoginScreen');
        }}
      >
        <CustomText>Logout</CustomText>
      </TouchableOpacity>
      <View style={{ flex: 1, zIndex: 1000, marginTop: 10 }}>
        <View style={styles.subContainer}>
          <Swiper
            ref={ref}
            data={data}
            initialIndex={2}
            cardStyle={styles.cardStyle}
            overlayLabelContainerStyle={styles.overlayLabelContainerStyle}
            renderCard={renderCard}
            onIndexChange={index => {
              console.log('Current Active index', index);
              setActiveIndex(index);
            }}
            onSwipeRight={cardIndex => {
              console.log('cardIndex', cardIndex);
            }}
            onPress={() => {
              console.log('onPress');
            }}
            onSwipedAll={() => {
              console.log('onSwipedAll');
            }}
            disableTopSwipe
            disableBottomSwipe
            FlippedContent={renderFlippedCard}
            onSwipeLeft={cardIndex => {
              console.log('onSwipeLeft', cardIndex);
            }}
            onSwipeTop={cardIndex => {
              console.log('onSwipeTop', cardIndex);
            }}
            onSwipeBottom={cardIndex => {
              console.log('onSwipeBottom', cardIndex);
            }}
            // OverlayLabelRight={OverlayLabelRight}
            // OverlayLabelLeft={OverlayLabelLeft}
            // OverlayLabelTop={OverlayLabelTop}
            // OverlayLabelBottom={OverlayLabelBottom}
            onSwipeActive={direction => {
              console.log('onSwipeActive', direction);
              // set animation state based on swipe direction
              setSwipeDirection(direction as string);
            }}
            onSwipeStart={() => {
              console.log('onSwipeStart');
            }}
            onSwipeEnd={() => {
              console.log('onSwipeEnd');
              setSwipeDirection(null);
            }}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default MatchingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    bottom: 34,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  button: {
    height: 50,
    borderRadius: 40,
    aspectRatio: 1,
    backgroundColor: '#3A3D45',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  renderCardContainer: {
    borderRadius: 15,
    width: cardWidth,
    height: cardHeight,
  },
  renderFlippedCardContainer: {
    borderRadius: 15,
    backgroundColor: '#baeee5',
    width: cardWidth,
    height: cardHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardStyle: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderCardImage: {
    height: cardHeight,
    width: cardWidth,
    borderRadius: 15,
  },
  subContainer: {
    width,
    height: cardHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayLabelContainer: {
    borderRadius: 15,
    height: cardHeight,
    width: cardWidth,
  },
  text: {
    color: '#001a72',
  },
  overlayLabelContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

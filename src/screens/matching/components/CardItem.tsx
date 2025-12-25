import { BlurView } from '@danielsaraldi/react-native-blur-view';
import ImageIcon from 'components/image/ImageIcon';
import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  interpolateColor,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
const window = Dimensions.get('window');

const CardItem = (props: {
  source: ImageSourcePropType;
  swipeDirection?: string | null;
  isTop?: boolean;
}) => {
  const cardWidth = window.width * 0.95;
  const { themeStyle } = useTheme();
  const surfaceColor = themeStyle.surface;
  const heartVal = useSharedValue(0);
  const closeVal = useSharedValue(0);

  // animate based on swipeDirection prop
  React.useEffect(() => {
    // Only animate when this card is the top/active card
    if (props.isTop) {
      const dir = props.swipeDirection ?? null;
      if (dir === 'right') {
        heartVal.value = withTiming(1, { duration: 500 });
        closeVal.value = withTiming(0, { duration: 500 });
      } else if (dir === 'left' || dir === 'top' || dir === 'bottom') {
        closeVal.value = withTiming(1, { duration: 500 });
        heartVal.value = withTiming(0, { duration: 500 });
      } else {
        closeVal.value = withTiming(0, { duration: 120 });
        heartVal.value = withTiming(0, { duration: 120 });
      }
    } else {
      // reset when not top
      closeVal.value = withTiming(0, { duration: 120 });
      heartVal.value = withTiming(0, { duration: 120 });
    }
  }, [props.swipeDirection, props.isTop, heartVal, closeVal]);
  const heartAnimatedStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(heartVal.value, [0, 1], ['#3A3D45', '#ff69b4']);
    return { backgroundColor: bg };
  });

  const closeAnimatedStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(closeVal.value, [0, 1], ['#3A3D45', '#0786FF']);
    return { backgroundColor: bg };
  });

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        style={{
          width: cardWidth,
          aspectRatio: 374 / 594,
          borderRadius: 48,
          overflow: 'hidden',
        }}
      >
        <Image
          source={props.source}
          style={{
            width: cardWidth,
            aspectRatio: 374 / 594,
            borderRadius: 20,
          }}
        />
        {props.swipeDirection == 'right' && (
          <Animated.View
            style={{ position: 'absolute', left: 40, top: 40 }}
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <ImageIcon
              source={require('assets/ic_heart.png')}
              tintColor={themeStyle.secondary}
              size={60}
            />
          </Animated.View>
        )}

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
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <CustomText
              fontStyleType="header-medium"
              style={{ color: themeStyle.onPrimary }}
            >
              Nguyễn Thị Linh, 26 tuổi
            </CustomText>
            <View style={styles.rowContainer}>
              <ImageIcon
                source={require('assets/ic_location.png')}
                tintColor={themeStyle.surface}
              />
              <CustomText
                style={{ color: themeStyle.onPrimary, marginLeft: 4 }}
              >
                Hà Nội
              </CustomText>
              <Dot style={{ marginHorizontal: 4 }} />
              <CustomText style={{ color: themeStyle.onPrimary }}>
                Cách xa 1.4km
              </CustomText>
            </View>
            <View style={styles.rowContainer}>
              <ImageIcon
                source={require('assets/ic_relationship.png')}
                tintColor={themeStyle.surface}
              />
              <CustomText
                style={{ color: themeStyle.onPrimary, marginLeft: 4 }}
              >
                Độc thân
              </CustomText>
            </View>
          </View>
          <View style={{ gap: 16 }}>
            <TouchableOpacity>
              <Animated.View
                style={[styles.buttonContainer, heartAnimatedStyle]}
              >
                <BlurView style={StyleSheet.absoluteFill} targetId="aaa" />
                <ImageIcon
                  source={require('assets/ic_heart.png')}
                  tintColor={themeStyle.surface}
                />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Animated.View
                style={[styles.buttonContainer, closeAnimatedStyle]}
              >
                <BlurView style={StyleSheet.absoluteFill} targetId="aaa" />
                <ImageIcon
                  source={require('assets/ic_close.png')}
                  tintColor={themeStyle.surface}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const Dot = (props: { style?: ViewStyle }) => {
  const { themeStyle } = useTheme();
  return (
    <View
      style={[
        {
          width: 4,
          height: 4,
          borderRadius: 4,
          backgroundColor: themeStyle.surface,
        },
        props.style,
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  rowContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  buttonContainer: {
    width: 48,
    height: 48,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default CardItem;

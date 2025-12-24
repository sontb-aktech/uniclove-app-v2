import { BlurView } from '@danielsaraldi/react-native-blur-view';
import ImageIcon from 'components/image/ImageIcon';
import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {
  Dimensions,
  Image,
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
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
const window = Dimensions.get('window');

const CardItem = (props: {
  url: string;
  swipeProgress?: SharedValue<number>;
}) => {
  const cardWidth = window.width * 0.95;
  const { themeStyle } = useTheme();
  const surfaceColor = themeStyle.surface;
  console.log('--- swipeProgress', props.swipeProgress?.value);

  const closeAnimatedStyle = useAnimatedStyle(() => {
    const progress = props.swipeProgress ? props.swipeProgress.value : 0;
    const color = interpolateColor(
      progress,
      [0, -1],
      [surfaceColor, '#0786FF'],
    );
    return { tintColor: color } as any;
  });
  // console.log('--- closeAnimatedStyle', closeAnimatedStyle);
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
          source={{ uri: props.url }}
          style={{
            width: cardWidth,
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
              <BlurView style={styles.buttonContainer} targetId="aaa">
                <ImageIcon
                  source={require('assets/ic_heart.png')}
                  tintColor={themeStyle.surface}
                />
              </BlurView>
            </TouchableOpacity>
            <TouchableOpacity>
              <BlurView style={styles.buttonContainer} targetId="aaa">
                {props.swipeProgress ? (
                  <Animated.Image
                    source={require('assets/ic_close.png')}
                    style={[{ width: 22, height: 22 }, closeAnimatedStyle]}
                    resizeMode="contain"
                  />
                ) : (
                  <ImageIcon
                    source={require('assets/ic_close.png')}
                    tintColor={themeStyle.surface}
                  />
                )}
              </BlurView>
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
  },
});

export default CardItem;

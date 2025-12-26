import React, { useEffect } from 'react';
import {
  DimensionValue,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { FadeIn, FadeOut, Keyframe } from 'react-native-reanimated';
import { BlurView } from '@danielsaraldi/react-native-blur-view';
import { Portal } from 'react-native-portalize';
import { useBackHandler } from '@react-native-community/hooks';
import useTheme from 'hooks/useTheme';
import ImageIcon from 'components/image/ImageIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon5, IconMaterial } from 'libs';

const DURATION = 200;

const FadeZoomIn = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ scale: 0.2 }],
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
}).duration(DURATION);

const FadeZoomOut = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  100: {
    opacity: 0,
    transform: [{ scale: 0.2 }],
  },
}).duration(DURATION);

const ModalImage = (props: {
  isVisible: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  maxHeight?: DimensionValue;
  background?: any;
  disableClickOutside?: boolean;
  contentContainerStyle?: ViewStyle;
}) => {
  const { children, onCancel, isVisible } = props;
  const insets = useSafeAreaInsets();
  const { themeStyle } = useTheme();
  useBackHandler(() => {
    if (props.isVisible) {
      props.onCancel();
      return true;
    }
    return false;
  });
  // if (!isVisible) return null;
  useEffect(() => {
    if (props.isVisible) {
      Keyboard.dismiss();
    }
  }, [props.isVisible]);
  return (
    <Portal>
      {isVisible ? (
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.fullScreen}
          enabled
        >
          <Animated.View
            style={[styles.backdrop]}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(500)}
          >
            <TouchableWithoutFeedback
              onPress={onCancel}
              disabled={props.disableClickOutside}
            >
              <View style={{ flex: 1 }}>
                <BlurView
                  style={{ flex: 1 }}
                  radius={20}
                  targetId="target"
                  type={Platform.OS == 'ios' ? 'dark' : 'dark'}
                />
              </View>

              {/* <View style={{flex: 1, backgroundColor: 'red'}} /> */}
            </TouchableWithoutFeedback>
          </Animated.View>
          {!!props.background && (
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
            >
              {props.background}
            </View>
          )}
          <Animated.View
            entering={FadeZoomIn}
            exiting={FadeZoomOut}
            style={{
              alignSelf: 'stretch',
              maxHeight: props.maxHeight,
            }}
          >
            {children}
          </Animated.View>
          <Pressable
            style={{
              position: 'absolute',
              borderRadius: 100,
              top: insets.top,
              right: 16,
              width: 48,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
            }}
            onPress={() => props.onCancel()}
          >
            <IconMaterial name="close" color={'white'} size={24} />
          </Pressable>
        </KeyboardAvoidingView>
      ) : null}
    </Portal>
  );
};

export default ModalImage;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // backgroundColor: COLOR.OVERLEY_DARK_90,
  },
});

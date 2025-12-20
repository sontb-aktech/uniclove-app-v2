import React, { useEffect } from 'react';
import {
  Dimensions,
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
import ImageIcon from 'components/ImageIcon';
const { width, height } = Dimensions.get('window');

const DURATION = 200;

const SlideFadeInDown = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ translateY: height / 3 }],
  },
  100: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
}).duration(DURATION);

const SlideFadeOutDown = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
  100: {
    opacity: 0,
    transform: [{ translateY: height / 3 }],
  },
}).duration(DURATION);

const ModalBottom = (props: {
  isVisible: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  // maxHeight?: DimensionValue;
  background?: any;
  disableClickOutside?: boolean;
  contentContainerStyle?: ViewStyle;
  height?: DimensionValue | undefined;
}) => {
  const { children, onCancel, isVisible } = props;
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
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
          enabled
        >
          <Animated.View
            style={[styles.backdrop]}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(500)}
          >
            <TouchableWithoutFeedback onPress={onCancel}>
              <View style={{ flex: 1 }}>
                <BlurView
                  style={{ flex: 1 }}
                  radius={20}
                  targetId=""
                  type={Platform.OS == 'ios' ? 'dark' : 'dark'}
                />
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
          <Animated.View
            entering={SlideFadeInDown}
            exiting={SlideFadeOutDown}
            style={{
              height: props.height,
            }}
          >
            <View
              style={[
                {
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  backgroundColor: themeStyle.surface,
                  width: '90%',
                  alignSelf: 'center',
                  overflow: 'hidden',
                  flex: props.height ? 1 : undefined,
                },
                props.contentContainerStyle,
              ]}
            >
              {children}
              <Pressable
                style={{ position: 'absolute', top: 16, right: 16 }}
                onPress={() => props.onCancel()}
              >
                <ImageIcon
                  source={require('assets/ic_close_modal.png')}
                  size={24}
                />
              </Pressable>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      ) : null}
    </Portal>
  );
};

export default ModalBottom;

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

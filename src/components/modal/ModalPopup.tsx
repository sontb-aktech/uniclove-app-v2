import React, { useEffect } from 'react';
import {
  Dimensions,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import styles from './PopupModal.styles'
// import { PopupModalProps } from './PopupModal.types'
import { BlurView } from '@danielsaraldi/react-native-blur-view';
import { Portal } from 'react-native-portalize';
import { useBackHandler } from '@react-native-community/hooks';
import useTheme from 'hooks/useTheme';
import ImageIcon from 'components/ImageIcon';
const { width, height } = Dimensions.get('window');
const DURATION = 200;
const SlideFadeInUp = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ translateY: -height / 5 }],
  },
  100: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
}).duration(DURATION);

const SlideFadeOutUp = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
  100: {
    opacity: 0,
    transform: [{ translateY: -height / 5 }],
  },
}).duration(DURATION);

const ModalPopup = (props: {
  isVisible: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  title?: string;
  marginTop?: number;
  contentContainerStyle?: ViewStyle;
}) => {
  const insets = useSafeAreaInsets();
  const { children, onCancel, isVisible } = props;
  const { themeStyle } = useTheme();
  // const opacity = useSharedValue(0);

  useEffect(() => {
    // opacity.value = withTiming(isVisible ? 1 : 0);
    Keyboard.dismiss();
  }, [isVisible]);

  useBackHandler(() => {
    if (props.isVisible) {
      props.onCancel();
      return true;
    }
    return false;
  });

  // if (!isVisible) return null;

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
            entering={SlideFadeInUp}
            exiting={SlideFadeOutUp}
            style={{
              marginHorizontal: 20,
            }}
          >
            <View
              style={[
                {
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  backgroundColor: themeStyle.surface,
                  width: '90%',
                  overflow: 'hidden',
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

export default ModalPopup;

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

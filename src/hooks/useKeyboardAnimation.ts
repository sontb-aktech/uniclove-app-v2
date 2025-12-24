import { useRef } from 'react';
import { Animated } from 'react-native';
import { useKeyboardHandler } from 'react-native-keyboard-controller';
import { runOnJS } from 'react-native-reanimated';

export const useKeyboardAnimation = () => {
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const buttonTranslateY = useRef(new Animated.Value(0)).current;

  const showButton = () => {
    Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideButton = () => {
    Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: 100,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useKeyboardHandler(
    {
      onStart: e => {
        'worklet';
        const isShowing = e.height > 0;

        if (isShowing) {
          hideButton();
        } else {
          showButton();
        }
      },
    },
    [],
  );

  return { buttonOpacity, buttonTranslateY };
};

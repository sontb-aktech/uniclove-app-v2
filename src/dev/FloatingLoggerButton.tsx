import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  AccessibilityActionEvent,
  PanResponder,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

const BUTTON_SIZE = 56;
const EDGE_PADDING = 16;
const TAP_DISTANCE = 8;

type Props = {
  onPress?: () => void;
};

type Position = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const FloatingLoggerButton: React.FC<Props> = ({onPress}) => {
  // if (!__DEV__) {
  //   return null;
  // }

  const {width, height} = useWindowDimensions();
  const bounds = useMemo(
    () => ({
      minX: EDGE_PADDING,
      minY: EDGE_PADDING * 2,
      maxX: Math.max(EDGE_PADDING, width - BUTTON_SIZE - EDGE_PADDING),
      maxY: Math.max(EDGE_PADDING, height - BUTTON_SIZE - EDGE_PADDING * 4),
    }),
    [width, height],
  );

  const startPosition = useRef<Position>({
    x: bounds.maxX,
    y: bounds.maxY,
  });

  const latestPosition = useRef<Position>({
    x: bounds.maxX,
    y: bounds.maxY,
  });

  const [position, setPosition] = useState<Position>(latestPosition.current);

  const updatePosition = useCallback(
    (next: Position) => {
      const clamped: Position = {
        x: clamp(next.x, bounds.minX, bounds.maxX),
        y: clamp(next.y, bounds.minY, bounds.maxY),
      };
      latestPosition.current = clamped;
      setPosition(clamped);
    },
    [bounds],
  );

  useEffect(() => {
    updatePosition(latestPosition.current);
  }, [updatePosition]);

  const handleAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      if (event.nativeEvent.actionName === 'activate') {
        onPress?.();
      }
    },
    [onPress],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3,
        onPanResponderGrant: () => {
          startPosition.current = latestPosition.current;
        },
        onPanResponderMove: (_, gestureState) => {
          updatePosition({
            x: startPosition.current.x + gestureState.dx,
            y: startPosition.current.y + gestureState.dy,
          });
        },
        onPanResponderRelease: (_, gestureState) => {
          const distance = Math.hypot(gestureState.dx, gestureState.dy);

          if (distance < TAP_DISTANCE) {
            updatePosition(startPosition.current);
            onPress?.();
            return;
          }

          updatePosition({
            x: startPosition.current.x + gestureState.dx,
            y: startPosition.current.y + gestureState.dy,
          });
        },
      }),
    [onPress, updatePosition],
  );

  return (
    <View
      pointerEvents="box-none"
      style={StyleSheet.absoluteFill}
      testID="floating-network-logger">
      <View
        pointerEvents="box-none"
        style={[
          styles.dragWrapper,
          {
            top: position.y,
            left: position.x,
          },
        ]}
        {...panResponder.panHandlers}>
        <View
          accessible
          accessibilityRole="button"
          accessibilityLabel="Mở trình xem log mạng"
          accessibilityActions={[{name: 'activate'}]}
          onAccessibilityAction={handleAccessibilityAction}
          style={styles.touchTarget}>
          <View style={styles.button}>
            <View style={styles.inner} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dragWrapper: {
    position: 'absolute',
    zIndex: 999,
  },
  touchTarget: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: BUTTON_SIZE - 20,
    height: BUTTON_SIZE - 20,
    borderRadius: (BUTTON_SIZE - 20) / 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
});

export default FloatingLoggerButton;

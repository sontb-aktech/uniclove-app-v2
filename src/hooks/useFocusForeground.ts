import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';

const useFocusForeground = (
  fun: () => (() => void) | void,
  args: unknown[],
) => {
  const appState = useRef(AppState.currentState);
  const currentFun = useRef<(() => void) | void>();

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      currentFun.current = fun();
    } else {
      currentFun.current && currentFun.current();
    }
    appState.current = nextAppState;
  };
  useFocusEffect(
    useCallback(() => {
      const listener = AppState.addEventListener(
        'change',
        _handleAppStateChange,
      );

      currentFun.current = fun();

      return () => {
        listener.remove();
        currentFun.current && currentFun.current();
      };
    }, args),
  );
};

export default useFocusForeground;

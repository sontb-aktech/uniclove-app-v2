import { useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export default function useAppState(settings: { onChange?: (nextAppState: AppStateStatus) => void, onForeground?: () => void, onBackground?: () => void, onVisible?: () => void }) {
  const { onChange, onForeground, onBackground, onVisible } = settings;
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    onVisible && onVisible()
    AppState.addEventListener("change", _handleAppStateChange)

    return (() => {
      AppState.removeEventListener("change", _handleAppStateChange);
    })
  }, [])

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/)

    ) {
      if (nextAppState === "active") {
        onForeground && onForeground()
        onVisible && onVisible()
      } else {
        onBackground && onBackground()
      }
    }
    onChange && onChange(nextAppState)
    appState.current = nextAppState;
    // setAppStateVisible(appState.current);
  };

  return { appState };
}
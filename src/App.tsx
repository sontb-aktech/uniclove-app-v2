import { CacheManager } from '@georstat/react-native-image-cache';
import {
  DefaultTheme,
  NavigationContainer,
  NavigationState,
} from '@react-navigation/native';
import { LocalizationProvider } from 'LocalizationProvider';
import Nav from 'Nav';
import { navigationRef } from 'NavigationService';
import { ThemeProvider } from 'ThemeProvider';
import FirebaseAnalyticHelper from 'helpers/FirebaseAnalyticHelper';
import FirebaseAppCheckHelper from 'helpers/FirebaseAppCheckHelper';
import FirebaseCrashlyticHelper from 'helpers/FirebaseCrashlyticHelper';
import GoogleSignInHelper from 'helpers/GoogleSignInHelper';
import NotificationHelper from 'helpers/NotificationHelper';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Dirs } from 'react-native-file-access';
import { Host } from 'react-native-portalize';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'stores';
import { KeyboardProvider } from 'react-native-keyboard-controller';
LogBox.ignoreLogs([
  'new NativeEventEmitter',
  'ReactImageView: Image',
  'No task registered for key TrackPlayer',
  'CachedImage: Support for defaultProps will be removed',
]);
//@ts-ignore
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 1024 * 1024 * 16,
  maxRetries: 3 /* optional, if not provided defaults to 0 */,
  retryDelay: 3000 /* in milliseconds, optional, if not provided defaults to 0 */,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

const linking = {
  prefixes: ['heyai://'],
  config: {
    screens: {
      MainTabScreen: {
        screens: {
          HomeScreen: {
            path: 'home/:threadId?/:requestPermissionRecording?',
          },
          ProfileScreen: 'profile',
        },
        path: 'main',
      },
      LoginScreen: {
        path: 'login',
      },
    },
  },
};

function getActiveRouteName(state: NavigationState): string | undefined {
  const route = state.routes[state.index];

  // Nếu có nested navigator, tìm tiếp
  if (route.state) {
    return getActiveRouteName(route.state as NavigationState);
  }

  return route.name;
}

const App = () => {
  const routeNameRef = React.useRef<string>();
  useEffect(() => {
    // MetaSDKHelper.initializeSDK();
    GoogleSignInHelper.configure();
    NotificationHelper.setupNotification();
    FirebaseAppCheckHelper.initAppCheck();
    const removeNoti = NotificationHelper.notificationListener();
    // FirebaseAppCheckHelper.getAppCheckToken();
    return () => {
      removeNoti();
    };
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <KeyboardProvider>
            <ThemeProvider>
              <LocalizationProvider>
                <NavigationContainer
                  ref={navigationRef}
                  theme={navTheme}
                  linking={linking}
                  onReady={() => {}}
                  onStateChange={state => {
                    if (!state) return;
                    const currentRoute = getActiveRouteName(state);
                    if (currentRoute) {
                      FirebaseAnalyticHelper.logScreenView(currentRoute);
                      FirebaseCrashlyticHelper.logScreen(currentRoute);
                    }
                  }}
                >
                  <Host>
                    <Nav />
                  </Host>
                </NavigationContainer>
              </LocalizationProvider>
            </ThemeProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useTheme from 'hooks/useTheme';
import React, { useEffect } from 'react';

import {
  // ExampleScreen,
  OnboardingScreen,
  LoginScreen,
  MainTabScreen,
  RootStackParamList,
  SplashScreen,
  LanguageScreen,
  PasswordScreen,
  VerifyOtpScreen,
  CompleteProfileScreen,
  CreatePasswordScreen,
  CompletePictureProfileScreen,
} from 'screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Nav = () => {
  // const common = useCommon();
  const { themeStyle } = useTheme();
  useEffect(() => {
    // console.log('=== PreloadAds.preload()');
    // common.dispatch(TransSlice.actions.setLang(langCode));
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="ToolsScreen" component={ToolsScreen} /> */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      {/* <Stack.Screen name="IntroContainerScreen" component={IntroContainerScreen} /> */}
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />

      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />

      <Stack.Screen name="MainTabScreen" component={MainTabScreen} />

      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
      <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
      <Stack.Screen
        name="CompleteProfileScreen"
        component={CompleteProfileScreen}
      />
      <Stack.Screen
        name="CreatePasswordScreen"
        component={CreatePasswordScreen}
      />
      <Stack.Screen
        name="CompletePictureProfileScreen"
        component={CompletePictureProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default Nav;

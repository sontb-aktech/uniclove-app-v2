import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ModalCodepush from 'components/ModalCodepush';
import NotificationHelper from 'helpers/NotificationHelper';
import useCommon from 'hooks/useCommon';
import useRouteParams from 'hooks/useRouteParams';
import useTheme from 'hooks/useTheme';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import {
  ChatScreen,
  HomeScreen,
  MatchingScreen,
  NearbyScreen,
  RootStackParamList,
  SettingsScreen,
  ToolScreen,
} from 'screens';
import { useAppSelector } from 'stores';
// import {trans} from 'trans';
import useTrans from 'hooks/useTrans';
import TabBarIcon, { TabBarConfigType } from './components/tabBar/TabBarIcon';
import CustomTabBar from './components/tabBar/CustomTabBar';

const Tab = createBottomTabNavigator<RootStackParamList>();
const TabBarConfig: TabBarConfigType = {
  // HomeScreen: {
  //   sourceIcon: require('assets/ic_tab_home.png'),
  //   sourceActiveIcon: require('assets/ic_tab_home_active.png'),
  // },
  MatchingScreen: {
    sourceIcon: require('assets/ic_tab_matching.png'),
    sourceActiveIcon: require('assets/ic_tab_matching_active.png'),
  },
  NearbyScreen: {
    sourceIcon: require('assets/ic_tab_nearby.png'),
    sourceActiveIcon: require('assets/ic_tab_nearby_active.png'),
  },
  ChatScreen: {
    sourceIcon: require('assets/ic_tab_chat.png'),
    sourceActiveIcon: require('assets/ic_tab_chat_active.png'),
  },
  ToolScreen: {
    sourceIcon: require('assets/ic_tab_tool.png'),
    sourceActiveIcon: require('assets/ic_tab_tool_active.png'),
  },
};

const MainTabScreen = () => {
  const { theme, themeStyle } = useTheme();
  const { trans } = useTrans();
  const params = useRouteParams('MainTabScreen');

  const userInfo = useAppSelector(state => state.user).userInfo;
  const common = useCommon();
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  // const {interstitial} = useContext(PreloadAdsContext);
  const [canShowGuide, setCanShowGuide] = useState(false);
  useEffect(() => {}, []);

  const checkVersionUpdate = async () => {};

  const requestNotificationPermission = async () => {
    // appOpen.preventShow();
    await NotificationHelper.requestNotificationPermission();
    setCanShowGuide(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={props => {
          return (
            <CustomTabBar
              {...props}
              otherProps={props}
              bgColor={themeStyle.surface}
            />
          );
        }}
        safeAreaInsets={{ bottom: 0 }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <TabBarIcon
                tabBarConfig={TabBarConfig}
                focused={focused}
                routeName={route.name}
                activeColor={color}
                color={color}
              />
            );
          },
          // tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: themeStyle.primary,
          tabBarInactiveTintColor: themeStyle.onSurfaceVariant,
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            // paddingHorizontal: 10,
            elevation: 0,
          },

          headerShown: false,
          animation: Platform.OS == 'android' ? 'shift' : 'none',
          sceneStyle: { backgroundColor: 'transparent' },
          headerPressColor: 'transparent',
          tabBarButton: (props: any) => <TouchableOpacity {...props} />,
        })}
        // sceneContainerStyle={{backgroundColor: 'transparent'}}
        backBehavior="initialRoute"

        // detachInactiveScreens={true}
      >
        <Tab.Screen
          name={'MatchingScreen'}
          component={MatchingScreen}
          options={{ title: 'trans.matching' }}
        />
        <Tab.Screen
          name={'NearbyScreen'}
          component={NearbyScreen}
          options={{ title: 'trans.nearby' }}
        />
        <Tab.Screen
          name={'ChatScreen'}
          component={ChatScreen}
          options={{ title: 'trans.chat' }}
        />
        <Tab.Screen
          name={'ToolScreen'}
          component={ToolScreen}
          options={{ title: 'trans.tools' }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MainTabScreen;

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import ModalCodepush from 'components/ModalCodepush';
import NotificationHelper from 'helpers/NotificationHelper';
import useCommon from 'hooks/useCommon';
import useRouteParams from 'hooks/useRouteParams';
import useTheme from 'hooks/useTheme';
import React, {useEffect, useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {HomeScreen, RootStackParamList, SettingsScreen} from 'screens';
import {useAppSelector} from 'stores';
// import {trans} from 'trans';
import useTrans from 'hooks/useTrans';
import TabBarIcon, {TabBarConfigType} from './components/tabBar/TabBarIcon';
import CustomTabBar from './components/tabBar/CustomTabBar';

const Tab = createBottomTabNavigator<RootStackParamList>();
const TabBarConfig: TabBarConfigType = {
  HomeScreen: {
    sourceIcon: require('assets/ic_tab_home.png'),
    sourceActiveIcon: require('assets/ic_tab_home_active.png'),
  },

  SettingsScreen: {
    sourceIcon: require('assets/ic_tab_setting.png'),
    sourceActiveIcon: require('assets/ic_tab_setting_active.png'),
  },
};

const MainTabScreen = () => {
  const {theme, themeStyle} = useTheme();
  const {trans} = useTrans();
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
    <View style={{flex: 1}}>
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
        safeAreaInsets={{bottom: 0}}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
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
          tabBarShowLabel: true,
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
          sceneStyle: {backgroundColor: 'transparent'},
          headerPressColor: 'transparent',
          tabBarButton: (props: any) => <TouchableOpacity {...props} />,
        })}
        // sceneContainerStyle={{backgroundColor: 'transparent'}}
        backBehavior="initialRoute"

        // detachInactiveScreens={true}
      >
        <Tab.Screen
          name={'HomeScreen'}
          component={HomeScreen}
          options={{title: 'trans.trending'}}
        />

        <Tab.Screen
          name={'SettingsScreen'}
          component={SettingsScreen}
          options={{title: 'trans.history'}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MainTabScreen;

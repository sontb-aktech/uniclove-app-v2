import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import {useKeyboard} from '@react-native-community/hooks';
import useTheme from 'hooks/useTheme';
import { useNavigationState } from '@react-navigation/native';
import useCommon from 'hooks/useCommon';

export const TabBarHeight = 55;
const extraPaddingBottom = 5;
const CustomTabBar = ({
  onPress,
  otherProps,
}: {
  bgColor: string;
  onPress?: (btnActionType?: 'VoiceToVoice' | 'CreateImage') => void;
  otherProps?: any;
}) => {
  const { theme, themeStyle } = useTheme();
  const insets = useSafeAreaInsets();
  const common = useCommon();

  const currentTabName = useNavigationState(state => {
    // console.log('---useNavigationState', state);
    // const tabState = state.routes.find(r => r.name === 'MainTabScreen');
    // if (!tabState || !tabState.state) return null;

    const tabIndex = state.index;
    const tabRoute = state.routes[tabIndex!];

    return tabRoute.name;
  });

  console.log('currentTabName', currentTabName);

  return (
    <View>
      <View
        style={[
          {
            position: 'absolute',
            left: 40,
            bottom: 0,
            right: 40,
            justifyContent: 'flex-end',
            // backgroundColor: themeStyle.itemBackground2,
            paddingBottom: insets.bottom,
            // borderColor: themeStyle.line2,
          },
        ]}
        pointerEvents="box-none"
      >
        <BottomTabBar {...otherProps} />
        {/* <AdmobBanner adUnitKey="Banner_home" style={{marginTop: 8}} /> */}
      </View>
    </View>
  );
};

export default CustomTabBar;

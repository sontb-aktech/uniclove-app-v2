import ImageIcon from 'components/image/ImageIcon';
import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { RootStackParamList } from 'screens';
export type TabBarType = {
  sourceIcon: ImageSourcePropType;
  sourceActiveIcon?: ImageSourcePropType;
};

export type TabBarConfigType = {
  [key in keyof RootStackParamList]?: TabBarType;
};

type Props = {
  tabBarConfig: TabBarConfigType;
  focused: boolean;
  routeName: keyof RootStackParamList;
  color?: string;
  activeColor?: string;
};

const TabBarIcon = ({
  focused,
  tabBarConfig,
  routeName,
  color,
  activeColor,
}: Props) => {
  if (tabBarConfig[routeName]) {
    if (focused) {
      return (
        <ImageIcon
          size={24}
          source={
            tabBarConfig[routeName]!.sourceActiveIcon ??
            tabBarConfig[routeName]!.sourceIcon
          }
          tintColor={activeColor}
          style={{ marginBottom: 4 }}
        />
      );
    } else {
      return (
        <ImageIcon
          size={24}
          source={tabBarConfig[routeName]!.sourceIcon}
          tintColor={color}
          style={{ marginBottom: 4 }}
        />
      );
    }
  } else return null;
};

export default TabBarIcon;

import ImageIcon from 'components/image/ImageIcon';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
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
  const { themeStyle } = useTheme();
  if (tabBarConfig[routeName]) {
    if (focused) {
      return (
        <View
          style={[
            styles.itemContainer,
            { backgroundColor: themeStyle.primaryContainer },
          ]}
        >
          <ImageIcon
            source={
              tabBarConfig[routeName]!.sourceActiveIcon ??
              tabBarConfig[routeName]!.sourceIcon
            }
          />
        </View>
      );
    } else {
      return (
        <View style={styles.itemContainer}>
          <ImageIcon size={24} source={tabBarConfig[routeName]!.sourceIcon} />
        </View>
      );
    }
  } else return null;
};

export default TabBarIcon;

const styles = StyleSheet.create({
  itemContainer: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
});

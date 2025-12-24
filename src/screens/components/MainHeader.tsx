import Avatar from 'components/image/Avatar';
import ImageIcon from 'components/image/ImageIcon';
import useTheme from 'hooks/useTheme';
import NavigationService from 'NavigationService';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
const MainHeader = () => {
  const { themeStyle } = useTheme();
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 147, aspectRatio: 772 / 199 }}
        source={require('assets/img_uniclove.png')}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity
          style={[
            styles.iconContainer,
            {
              backgroundColor: themeStyle.primaryContainer,
            },
          ]}
        >
          <ImageIcon source={require('assets/ic_notification.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconContainer]}
          onPress={() => {
            NavigationService.navigate('ProfileScreen');
          }}
        >
          <Avatar
            source={{ uri: 'https://picsum.photos/id/1011/800/600' }}
            sizeType="tini"
            isShowBorder
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 12,
    paddingVertical: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
});

export default MainHeader;

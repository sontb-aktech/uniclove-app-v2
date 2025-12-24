import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from 'hooks/useTheme';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from 'stores';
import NavigationService from 'NavigationService';

const MainHeader = () => {
  const insets = useSafeAreaInsets();
  const { themeStyle } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: 10,
          paddingTop: insets.top,
          backgroundColor: themeStyle.surface,
        },
      ]}
    >
      <View style={styles.inner}>
        <Image
          source={require('assets/img_uniclove.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.rightGroup}>
          <TouchableOpacity style={{ marginRight: 36 }}>
            <Image
              source={require('assets/ic_bell.png')}
              style={styles.bell}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {/* Gradient bordered avatar */}
          <TouchableOpacity
            style={styles.avatarTouch}
            onPress={() => {
              NavigationService.navigate('ProfileScreen');
            }}
          >
            <LinearGradient
              colors={['#67A4FF', '#0786FF']}
              style={styles.gradientBorder}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/20240226_Kim_Jisoo_%EA%B9%80%EC%A7%80%EC%88%98_02.jpg/330px-20240226_Kim_Jisoo_%EA%B9%80%EC%A7%80%EC%88%98_02.jpg',
                }}
                style={styles.image}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 0,
    marginBottom: 19,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 147,
    height: undefined,
    aspectRatio: 147 / 30,
  },
  bell: {
    width: 24,
    aspectRatio: 1,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradientBorder: {
    width: 28,
    height: 28,
    borderRadius: 14, // = width / 2 để tạo hình tròn
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12, // = width / 2
    borderWidth: 1, // Thêm viền trắng mỏng nếu muốn tách biệt ảnh với gradient
    borderColor: '#ffffff',
  },
  avatarTouch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainHeader;

import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import React, { useState, useRef } from 'react';
import ScreenContainer from 'components/ScreenContainer';
import ImagePicker from 'react-native-image-crop-picker';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import ProfileInfoTab from './components/ProfileInfoTab';
import ProfileAlbumTab from './components/ProfileAlbumTab';
import NavigationService from 'NavigationService';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomText from 'components/text/CustomText';
import { TouchableOpacity } from 'react-native';

const Tab = createMaterialTopTabNavigator();
const TAB_PADDING = 20;
const TAB_GAP = 12;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = (SCREEN_WIDTH - TAB_PADDING * 2 - TAB_GAP) / 2;

const DEFAULT_ALBUM_PHOTOS = [
  {
    id: 1,
    image: require('assets/img_default_profile.png'),
    isDefault: true,
  },
  {
    id: 2,
    image: require('assets/img_default_profile.png'),
    isDefault: true,
  },
  {
    id: 3,
    image: require('assets/img_default_profile.png'),
    isDefault: true,
  },
  {
    id: 4,
    image: require('assets/img_default_profile.png'),
    isDefault: true,
  },
  {
    id: 5,
    image: require('assets/img_default_profile.png'),
    isDefault: true,
  },
];

const user = {
  name: 'Lê Quang Hiếu',
  age: 23,
  avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  matches: 144,
  liking: 144,
  liked: 120,
  bio: 'Heyyy! Tôi là 1 sinh viên đang theo học ngành lý marketing 26 tuổi. Cuốc sống của tôi là những dự án sống tạo, những chuyến đi vào và những trải nghiệm đời thực. Tô luôn tìm...',
  location: 'Sống tại Hà Nội',
};

const ProfileScreen = () => {
  const isPickingAlbumRef = useRef<Record<number, boolean>>({});
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [albumPhotos, setAlbumPhotos] = useState(DEFAULT_ALBUM_PHOTOS);

  const isPickingCoverRef = useRef(false);

  const handlePickCoverImage = async () => {
    if (isPickingCoverRef.current) return;
    isPickingCoverRef.current = true;
    try {
      const image = await ImagePicker.openPicker({
        width: 1200,
        height: 600,
        cropping: true,
        cropperCircleOverlay: false,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });
      if (image && image.path) setCoverImage(image.path);
    } catch (error: any) {
      if (error && error.code === 'E_PICKER_CANCELLED') {
      } else {
        console.warn('handlePickCoverImage error:', error);
        Alert.alert('Lỗi', 'Không thể chọn ảnh bìa. Vui lòng thử lại.');
      }
    } finally {
      isPickingCoverRef.current = false;
    }
  };

  const handleRemoveCoverImage = () => {
    Alert.alert(
      'Xóa ảnh bìa',
      'Bạn có chắc muốn xóa ảnh bìa?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => setCoverImage(null),
        },
      ],
      { cancelable: true },
    );
  };

  const handlePickAlbumImage = async (photoId: number) => {
    if (isPickingAlbumRef.current[photoId]) return;
    isPickingAlbumRef.current[photoId] = true;
    try {
      const image = await ImagePicker.openPicker({
        width: 800,
        height: 1000,
        cropping: true,
        cropperCircleOverlay: false,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      if (image && image.path) {
        setAlbumPhotos(prevPhotos =>
          prevPhotos.map(photo =>
            photo.id === photoId
              ? { ...photo, image: { uri: image.path }, isDefault: false }
              : photo,
          ),
        );
      }
    } catch (error: any) {
      if (error && error.code === 'E_PICKER_CANCELLED') {
      } else {
        console.warn('handlePickAlbumImage error:', error);
        Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
      }
    } finally {
      isPickingAlbumRef.current[photoId] = false;
    }
  };

  const handleRemoveAlbumImage = (photoId: number) => {
    Alert.alert(
      'Xóa ảnh',
      'Bạn có chắc muốn xóa ảnh này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setAlbumPhotos(prevPhotos =>
              prevPhotos.map(photo =>
                photo.id === photoId
                  ? {
                      ...photo,
                      image: require('assets/img_default_profile.png'),
                      isDefault: true,
                    }
                  : photo,
              ),
            );
          },
        },
      ],
      { cancelable: true },
    );
  };

  const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    return (
      <View style={styles.tabsContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={onPress}
              activeOpacity={0.7}
            >
              {isFocused ? (
                <View style={styles.tabActiveButton}>
                  <CustomText
                    fontStyleType="text-semibold"
                    style={styles.tabTextActive}
                  >
                    {label}
                  </CustomText>
                </View>
              ) : (
                <View style={styles.tabInactiveButton}>
                  <CustomText style={styles.tabText}>{label}</CustomText>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ScreenContainer
      title="Trang cá nhân"
      listButtonRight={[
        {
          source: require('assets/ic_setting.png'),
          onPress: () => console.log('Go to settings'),
        },
      ]}
      safeBottom
    >
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <ProfileHeader
            coverImage={coverImage}
            avatarUrl={user.avatar}
            onPickCoverImage={handlePickCoverImage}
            onRemoveCoverImage={handleRemoveCoverImage}
          />

          <ProfileInfo
            userName={user.name}
            matches={user.matches}
            liking={user.liking}
            liked={user.liked}
            onEditProfile={() => {
              NavigationService.navigate('EditProfileScreen');
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
              swipeEnabled: true,
              lazy: true,
            }}
          >
            <Tab.Screen
              name="InfoTab"
              component={() => (
                <ScrollView
                  style={styles.tabContent}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  <ProfileInfoTab
                    userName={user.name}
                    age={user.age}
                    bio={user.bio}
                    location={user.location}
                  />
                </ScrollView>
              )}
              options={{ tabBarLabel: 'Thông tin' }}
            />
            <Tab.Screen
              name="AlbumTab"
              component={() => (
                <ScrollView
                  style={styles.tabContent}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  <ProfileAlbumTab
                    photos={albumPhotos}
                    onPickImage={handlePickAlbumImage}
                    onRemoveImage={handleRemoveAlbumImage}
                  />
                </ScrollView>
              )}
              options={{ tabBarLabel: 'Album' }}
            />
          </Tab.Navigator>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 14,
  },
  headerScrollView: {
    paddingVertical: 14,
  },
  container: {
    flex: 1,
    paddingVertical: 14,
  },
  tabContent: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: TAB_PADDING,
    gap: TAB_GAP,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  tab: {
    width: TAB_WIDTH,
  },
  tabActiveButton: {
    height: 34,
    borderRadius: 12,
    width: '100%',
    backgroundColor: '#0786FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabInactiveButton: {
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '400',
  },
  tabTextActive: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

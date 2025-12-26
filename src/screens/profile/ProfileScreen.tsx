import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Tabs } from 'react-native-collapsible-tab-view';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import ScreenContainer from 'components/ScreenContainer';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import ProfileInfoTab from './components/ProfileInfoTab';
import ProfileAlbumTab from './components/ProfileAlbumTab';
import NavigationService from 'NavigationService';
import CustomText from 'components/text/CustomText';

const TAB_PADDING = 20;
const TAB_GAP = 12;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = (SCREEN_WIDTH - TAB_PADDING * 2 - TAB_GAP) / 2;

export const DEFAULT_ALBUM_PHOTOS = [
  { id: 1, image: require('assets/img_default_profile.png'), isDefault: true },
  { id: 2, image: require('assets/img_default_profile.png'), isDefault: true },
  { id: 3, image: require('assets/img_default_profile.png'), isDefault: true },
  { id: 4, image: require('assets/img_default_profile.png'), isDefault: true },
  { id: 5, image: require('assets/img_default_profile.png'), isDefault: true },
];

const user = {
  name: 'Lê Quang Hiếu',
  age: 23,
  avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  matches: 144,
  liking: 144,
  liked: 120,
  bio: 'Heyyy! Tôi là 1 sinh viên đang theo học ngành lý marketing 26 tuổi. Cuộc sống của tôi là những dự án sáng tạo, những chuyến đi và những trải nghiệm đời thực. Tôi luôn tìm...',
  location: 'Sống tại Hà Nội',
};

type TabItemProps = {
  tabName: string;
  label: string;
  onPress: () => void;
  focusedTab: any;
};

const TabItem = (props: TabItemProps) => {
  const { tabName, label, onPress, focusedTab } = props;
  const containerStyle = useAnimatedStyle(() => {
    const isActive = focusedTab.value === tabName;
    return {
      backgroundColor: isActive ? '#0786FF' : '#F5F5F5',
    };
  });

  const activeTextStyle = useAnimatedStyle(() => {
    return { opacity: focusedTab.value === tabName ? 1 : 0 };
  });

  const inactiveTextStyle = useAnimatedStyle(() => {
    return { opacity: focusedTab.value === tabName ? 0 : 1 };
  });

  return (
    <TouchableOpacity style={styles.tab} onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={[styles.tabBase, containerStyle]}>
        <Animated.View style={[styles.textLayer, activeTextStyle]}>
          <CustomText
            fontStyleType="text-semibold"
            style={styles.tabTextActive}
          >
            {label}
          </CustomText>
        </Animated.View>

        <Animated.View style={[styles.textLayer, inactiveTextStyle]}>
          <CustomText style={styles.tabText}>{label}</CustomText>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
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
      if (error.code !== 'E_PICKER_CANCELLED') {
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
      if (error.code !== 'E_PICKER_CANCELLED') {
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

  const renderTabBar = useCallback((props: any) => {
    const tabNames: string[] = props.tabNames || [];
    return (
      <View style={styles.tabsContainer}>
        {tabNames.map((tabName: string) => {
          const label = props.tabProps?.[tabName]?.label ?? tabName;
          return (
            <TabItem
              key={tabName}
              tabName={tabName}
              label={label}
              onPress={() => props.onTabPress(tabName)}
              focusedTab={props.focusedTab}
            />
          );
        })}
      </View>
    );
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.sharedHeaderContainer} pointerEvents="box-none">
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
    );
  }, [coverImage]);

  return (
    <ScreenContainer
      title="Trang cá nhân"
      listButtonRight={[
        {
          source: require('assets/ic_setting.png'),
          onPress: () => console.log('Go to settings'),
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Tabs.Container renderHeader={renderHeader} renderTabBar={renderTabBar}>
          <Tabs.Tab name="Thông tin">
            <Tabs.ScrollView
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
            </Tabs.ScrollView>
          </Tabs.Tab>

          <Tabs.Tab name="Album" label="Album">
            <Tabs.ScrollView
              style={styles.tabContent}
              showsVerticalScrollIndicator={false}
            >
              <ProfileAlbumTab
                photos={albumPhotos}
                onPickImage={handlePickAlbumImage}
                onRemoveImage={handleRemoveAlbumImage}
              />
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  sharedHeaderContainer: {
    paddingVertical: 14,
    backgroundColor: '#fff',
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
  tabBase: {
    height: 34,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
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

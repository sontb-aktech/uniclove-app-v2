import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import ScreenContainer from 'components/ScreenContainer';
import ImagePicker from 'react-native-image-crop-picker';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import ProfileInfoTab from './components/ProfileInfoTab';
import ProfileAlbumTab from './components/ProfileAlbumTab';
import NavigationService from 'NavigationService';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'album'>('info');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [albumPhotos, setAlbumPhotos] = useState([
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
  ]);

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

  const handlePickCoverImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 1200,
        height: 600,
        cropping: true,
        cropperCircleOverlay: false,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });
      setCoverImage(image.path);
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Lỗi', 'Không thể chọn ảnh bìa. Vui lòng thử lại.');
      }
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
    try {
      const image = await ImagePicker.openPicker({
        width: 800,
        height: 1000,
        cropping: true,
        cropperCircleOverlay: false,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      setAlbumPhotos(prevPhotos =>
        prevPhotos.map(photo =>
          photo.id === photoId
            ? { ...photo, image: { uri: image.path }, isDefault: false }
            : photo,
        ),
      );
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
      }
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onEditProfile={() => {
            NavigationService.navigate('EditProfileScreen');
          }}
        />

        {activeTab === 'info' && (
          <ProfileInfoTab
            userName={user.name}
            age={user.age}
            bio={user.bio}
            location={user.location}
          />
        )}

        {activeTab === 'album' && (
          <ProfileAlbumTab
            photos={albumPhotos}
            onPickImage={handlePickAlbumImage}
            onRemoveImage={handleRemoveAlbumImage}
          />
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
  },
});

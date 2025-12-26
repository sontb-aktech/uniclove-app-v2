import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@danielsaraldi/react-native-blur-view';
import { IconFeather } from 'libs';
import ImageIcon from 'components/image/ImageIcon';
import CustomText from 'components/text/CustomText';
import Avatar from 'components/image/Avatar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COVER_HEIGHT = 260;
const AVATAR_SIZE = 96;

export type ProfileHeaderProps = {
  coverImage: string | null;
  avatarUrl: string;
};

export const ProfileHeader = (props: ProfileHeaderProps) => {
  const { coverImage, avatarUrl } = props;

  return (
    <View style={styles.headerContainer}>
      {coverImage ? (
        <View style={styles.coverImageContainer}>
          <Image
            source={{ uri: coverImage }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={styles.coverContainer}>
          <View style={styles.blurImageWrapper}>
            <Image
              source={{ uri: avatarUrl }}
              style={styles.coverImageBlur}
              resizeMode="cover"
            />
          </View>
          <BlurView
            style={styles.blurOverlay}
            radius={5}
            targetId=""
            type="light"
          />
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)']}
            locations={[0, 0.8469]}
            style={styles.gradientOverlay}
          />
        </View>
      )}

      <View style={styles.avatarContainer}>
        <Avatar
          source={{ uri: 'https://picsum.photos/id/1011/800/600' }}
          sizeType="large"
          isShowBorder
          borderColor="#FF0990"
        />
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: COVER_HEIGHT,
    position: 'relative',
  },
  coverContainer: {
    borderRadius: 24,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  coverImageContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  blurImageWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  coverImageBlur: {
    paddingTop: 10,
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: '100%',
  },
  changePhotoButton: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 12,
    overflow: 'hidden',
    transform: [{ translateY: -20 }],
  },
  changePhotoBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  changePhotoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  removeCoverButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -AVATAR_SIZE / 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBorder: {
    position: 'absolute',
    width: AVATAR_SIZE + 5,
    height: AVATAR_SIZE + 5,
    borderRadius: (AVATAR_SIZE + 5) / 2,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 4,
    borderColor: '#fff',
  },
});

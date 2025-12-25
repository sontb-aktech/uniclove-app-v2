import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import CustomText from 'components/text/CustomText';
import ImageIcon from 'components/image/ImageIcon';
import NavigationService from 'NavigationService';

const AVATAR_SIZE = 96;

export type ProfileInfoProps = {
  userName: string;
  matches: number;
  liking: number;
  liked: number;
  onEditProfile: () => void;
};

const ProfileInfo = (props: ProfileInfoProps) => {
  const { userName, liking, liked, onEditProfile } = props;

  return (
    <View style={styles.infoSection}>
      <CustomText fontStyleType="header-medium" style={styles.userName}>
        {userName}
      </CustomText>

      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statView}
          onPress={() => {
            NavigationService.navigate('ListFriendScreen', {
              activeTabIndex: 1,
            });
          }}
        >
          <CustomText style={styles.statText}>
            <CustomText fontStyleType="text-semibold">{liking}</CustomText>
            {' Đang thích'}
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statView}
          onPress={() => {
            NavigationService.navigate('ListFriendScreen', {
              activeTabIndex: 2,
            });
          }}
        >
          <CustomText style={styles.statText}>
            <CustomText fontStyleType="text-semibold">{liked}</CustomText>
            {' lượt thích'}
          </CustomText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
        <CustomText fontStyleType="text-regular" style={styles.editButtonText}>
          Chỉnh sửa trang cá nhân
        </CustomText>
        <ImageIcon source={require('assets/ic_edit_pencil.png')} size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  infoSection: {
    marginTop: AVATAR_SIZE / 3 + 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  userName: {
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    gap: 8,
  },
  statText: {},
  statView: {
    backgroundColor: '#F5FAFF',
    padding: 8,
    borderRadius: 50,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 6,
  },
  editButtonText: {
    color: '#0786FF',
  },
});

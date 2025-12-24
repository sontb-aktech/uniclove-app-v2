import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from 'components/text/CustomText';
import ImageIcon from 'components/image/ImageIcon';

const TAB_PADDING = 20;
const TAB_GAP = 12;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = (SCREEN_WIDTH - TAB_PADDING * 2 - TAB_GAP) / 2;
const AVATAR_SIZE = 96;

interface ProfileInfoProps {
  userName: string;
  matches: number;
  liking: number;
  liked: number;
  activeTab: 'info' | 'album';
  onTabChange: (tab: 'info' | 'album') => void;
  onEditProfile: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  userName,
  matches,
  liking,
  liked,
  activeTab,
  onTabChange,
  onEditProfile,
}) => {
  return (
    <View style={styles.infoSection}>
      <CustomText style={styles.userName}>{userName}</CustomText>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statView}>
          <CustomText style={styles.statText}>
            <CustomText style={{ fontWeight: '600' }}>{matches}</CustomText>
            {' Độ match    '}
          </CustomText>
        </View>
        <View style={styles.statView}>
          <CustomText style={styles.statText}>
            <CustomText style={{ fontWeight: '600' }}>{liking}</CustomText>
            {' Đang thích'}
          </CustomText>
        </View>
      </View>
      <View style={styles.statView}>
        <CustomText style={styles.statText}>
          <CustomText style={{ fontWeight: '600' }}>{liked}</CustomText>
          {' lượt thích'}
        </CustomText>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
        <CustomText style={styles.editButtonText}>
          Chỉnh sửa trang cá nhân
        </CustomText>
        <ImageIcon source={require('assets/ic_edit_pencil.png')} size={16} />
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onTabChange('info')}
          activeOpacity={0.7}
        >
          {activeTab === 'info' ? (
            <LinearGradient
              colors={['#67A4FF', '#0786FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.tabActiveButton}
            >
              <CustomText style={styles.tabTextActive}>Thông tin</CustomText>
            </LinearGradient>
          ) : (
            <View style={styles.tabInactiveButton}>
              <CustomText style={styles.tabText}>Thông tin</CustomText>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => onTabChange('album')}
          activeOpacity={0.7}
        >
          {activeTab === 'album' ? (
            <LinearGradient
              colors={['#67A4FF', '#0786FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.tabActiveButton}
            >
              <CustomText style={styles.tabTextActive}>Album</CustomText>
            </LinearGradient>
          ) : (
            <View style={styles.tabInactiveButton}>
              <CustomText style={styles.tabText}>Album</CustomText>
            </View>
          )}
        </TouchableOpacity>
      </View>
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
    fontWeight: '500',
    marginBottom: 8,
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: '#242426',
  },
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
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: TAB_PADDING,
    gap: TAB_GAP,
    marginTop: 12,
  },
  tab: {
    width: TAB_WIDTH,
  },
  tabActiveButton: {
    height: 34,
    borderRadius: 12,
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
    fontWeight: '600',
  },
});

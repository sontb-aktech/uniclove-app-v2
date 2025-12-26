import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import CustomText from 'components/text/CustomText';
import ImageIcon from 'components/image/ImageIcon';
import NavigationService from 'NavigationService';
import GradientButton from 'components/button/GradientButton';
import GradientButtonWithColor from 'components/button/GradientButtonWithColor';
import { IconAnt } from 'libs';
import ModalPopup from 'components/modal/ModalPopup';
import ModalCenter from 'components/modal/ModalCenter';

const AVATAR_SIZE = 96;

export type ProfileInfoProps = {
  userName: string;
  matches: number;
  liking: number;
  liked: number;
  onEditProfile: () => void;
  isMatching: boolean;
  isSending: boolean;
  setIsSending: (value: boolean) => void;
};

const ProfileInfo = (props: ProfileInfoProps) => {
  const {
    userName,
    liking,
    liked,
    onEditProfile,
    isMatching,
    isSending,
    setIsSending,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.infoSection}>
      <CustomText fontStyleType="header-medium" style={styles.userName}>
        {userName}
      </CustomText>
      <TouchableOpacity
        disabled
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
      {!isMatching && (
        <CustomText
          fontStyleType="text-regular"
          style={{ textAlign: 'center', marginTop: 16 }}
        >
          Gửi tín hiệu cho Linh trước, đợi cô ấy đồng ý để mở chat, bạn có thể
          nhắn tin ngay.
        </CustomText>
      )}
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <GradientButtonWithColor
          colors={
            isSending
              ? ['#FF9B2A', '#FFC966']
              : isMatching
                ? ['#FFD6F7', '#FFD6F7']
                : ['#FF89A3', '#FF0990']
          }
          text={
            isSending ? 'Đang chờ' : isMatching ? 'Đã kết đôi' : 'Gửi tín hiệu'
          }
          style={{
            flex: 1,
            marginTop: 24,
            paddingHorizontal: 22,
          }}
          iconRight={
            <ImageIcon
              source={
                isSending
                  ? require('assets/ic_clock.png')
                  : isMatching
                    ? require('assets/ic_heart_match.png')
                    : require('assets/ic_heart.png')
              }
              size={20}
            />
          }
          colorText={isMatching ? '#FF6EB9' : undefined}
          onPress={() => {
            if (!isMatching) {
              if (isSending) {
                setModalVisible(true);
              } else {
                setIsSending(true);
              }
            }
          }}
        />

        <GradientButtonWithColor
          colors={isMatching ? ['#67A4FF', '#0786FF'] : undefined}
          text="Nhắn tin"
          colorText={isMatching ? '#FFFFFF' : '#C2C2C2'}
          style={{
            flex: 1,
            marginTop: 24,
            paddingHorizontal: 22,
          }}
          iconRight={
            <ImageIcon
              source={
                isMatching
                  ? require('assets/ic_send_active.png')
                  : require('assets/ic_send.png')
              }
              size={20}
            />
          }
          onPress={() => null}
        />
      </View>
      <ModalCenter
        isVisible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
              style={styles.avatar}
            />

            <View style={styles.content}>
              <CustomText fontStyleType="text-semibold" style={styles.name}>
                Nguyễn Thị Hà Quyên
              </CustomText>
              <CustomText
                fontStyleType="text-regular"
                style={styles.meta}
                numberOfLines={1}
              >
                0.5km · 23 tuổi
              </CustomText>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setIsSending(false);
            }}
            style={styles.modalDiscardButton}
            activeOpacity={0.7}
          >
            <CustomText style={styles.modalDiscardText}>Hủy kết đôi</CustomText>
          </TouchableOpacity>
        </View>
      </ModalCenter>
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
  modalContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  modalIcon: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 44,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#969696',
    textAlign: 'center',
  },
  modalSaveButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  modalSaveButtonGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSaveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalDiscardText: {
    fontSize: 16,
    color: '#0786FF',
    fontWeight: '600',
  },
  modalDiscardButton: {
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F5FAFF',
    borderRadius: 16,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    paddingVertical: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {},
  meta: {
    marginTop: 6,
    color: '#969696',
  },
});

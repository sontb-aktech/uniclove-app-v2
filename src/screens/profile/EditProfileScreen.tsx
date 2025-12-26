import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Animated,
  Platform,
  Modal,
} from 'react-native';
import React, { useState, useRef } from 'react';
import ScreenContainer from 'components/ScreenContainer';
import CustomText from 'components/text/CustomText';
import ImagePicker from 'react-native-image-crop-picker';
import { IconFeather } from 'libs';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@danielsaraldi/react-native-blur-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboardAnimation } from 'hooks/useKeyboardAnimation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ModalCenter from 'components/modal/ModalCenter';
import ImageIcon from 'components/image/ImageIcon';
import NavigationService from 'NavigationService';
import GradientButton from 'components/button/GradientButton';
import ListPicker from 'components/picker/ListPicker';
import GroupRatio from 'components/ratio/GroupRatio';
import DatePicker from 'components/picker/DatePicker';
import moment from 'moment';
import CustomInput from 'components/text/CustomInput';
import { LIST_GENDER, LIST_PROVINCE } from 'screens/auth/CompleteProfileScreen';
import GroupSelector from 'components/selected/GroupSelector';
import { LIST_HOBBIES } from 'screens/survey/SurveyStep3Screen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const formatBirthDate = (date: Date) => {
  const months = [
    'Th1',
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} / ${month} / ${year}`;
};
const width = Dimensions.get('window').width;

const EditProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const isPickingAvatarRef = useRef(false);
  const [avatar, setAvatar] = useState(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  );
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedGender, setSelectedGender] = useState<number>();
  const [listSelected, setListSelected] = useState<number[]>([]);

  const handlePickAvatar = async () => {
    if (isPickingAvatarRef.current) return;
    isPickingAvatarRef.current = true;
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });
      if (image && image.path) setAvatar(image.path);
    } catch (error: any) {
      if (error && error.code === 'E_PICKER_CANCELLED') {
        // user cancelled
      } else {
        console.warn('handlePickAvatar error:', error);
        Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
      }
    } finally {
      isPickingAvatarRef.current = false;
    }
  };

  const handleDateChange = (selectedDate: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleSave = () => {
    console.log('Saving profile...');
    NavigationService.back();
  };

  const handleDiscardChanges = () => {
    setShowExitModal(false);
    NavigationService.back();
  };

  return (
    <ScreenContainer
      title="Chỉnh sửa trang cá nhân"
      onPressBack={() => setShowExitModal(true)}
    >
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          bottomOffset={100}
        >
          <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>Ảnh đại diện</CustomText>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={handlePickAvatar}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />

              <View style={styles.avatarOverlay}>
                <BlurView style={styles.avatarBlur} radius={40} targetId="" />
                <View style={styles.avatarOverlayContent}>
                  <ImageIcon
                    source={require('assets/ic_camera.png')}
                    size={16}
                    tintColor="#fff"
                  />
                  <CustomText style={styles.avatarOverlayText}>
                    Thay ảnh đại diện
                  </CustomText>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <View>
              <CustomInput
                placeholder="Nhập tên"
                style={styles.inputContainer}
                iconRight={
                  <ImageIcon source={require('assets/ic_persion.png')} />
                }
                label="Tên đầy đủ của bạn"
              />
              <DatePicker
                style={styles.inputContainer}
                iconRight={
                  <ImageIcon source={require('assets/ic_persion.png')} />
                }
                label=" Ngày sinh của bạn"
                maxDate={moment().subtract(18, 'years').endOf('day').toDate()}
              />
              <GroupRatio
                label="Giới tính"
                listItems={LIST_GENDER}
                style={styles.inputContainer}
                currentIndex={selectedGender}
                onPressItem={index => setSelectedGender(index)}
              />
              <CustomInput
                placeholder="Nhập vài dòng giới thiệu"
                style={styles.inputContainer}
                label="Giới thiệu bản thân"
                multiline
              />
              <CustomText
                fontStyleType="title-semibold"
                style={{ marginTop: 16 }}
              >
                Sở thích
              </CustomText>
              <GroupSelector
                style={{ marginTop: 16 }}
                listItems={LIST_HOBBIES}
                listSelected={listSelected}
                onPressItem={index => {
                  const current = listSelected ?? [];
                  if (current.includes(index)) {
                    setListSelected(current.filter(item => item !== index));
                  } else {
                    setListSelected([...current, index]);
                  }
                }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>

        <GradientButton
          text="Lưu thay đổi"
          onPress={handleSave}
          style={
            [styles.saveButtonContainer, { marginBottom: insets.bottom }] as any
          }
        />
      </View>

      <ModalCenter
        isVisible={showExitModal}
        onCancel={() => setShowExitModal(false)}
      >
        <View style={styles.modalContent}>
          <CustomText style={styles.modalTitle}>
            Thay đổi chưa được lưu
          </CustomText>

          {/* Message */}
          <CustomText style={styles.modalMessage}>
            Nếu bạn rời đi bây giờ, các thay đổi vừa thực hiện sẽ không được lưu
            lại.
          </CustomText>

          <Image
            source={require('assets/img_not_save.png')}
            style={styles.modalIcon}
          />

          <GradientButton
            text="Lưu lại"
            onPress={handleSave}
            style={styles.modalSaveButton}
          />

          <TouchableOpacity
            onPress={handleDiscardChanges}
            style={styles.modalDiscardButton}
            activeOpacity={0.7}
          >
            <CustomText style={styles.modalDiscardText}>
              Thoát mà không lưu
            </CustomText>
          </TouchableOpacity>
        </View>
      </ModalCenter>

      {/* DateTimePicker Modal */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        date={birthDate}
        onConfirm={handleDateChange}
        onCancel={closeDatePicker}
        maximumDate={new Date()}
        minimumDate={new Date(1900, 0, 1)}
        locale="vi_VN"
        confirmTextIOS="Xác nhận"
        cancelTextIOS="Hủy"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      />
    </ScreenContainer>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  // Avatar styles
  avatarContainer: {
    width: SCREEN_WIDTH - 40,
    height: 320,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 17,
    right: 17,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 19,
    overflow: 'hidden',
  },
  avatarBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  avatarOverlayContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 1,
  },
  avatarOverlayText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  saveButtonContainer: {
    marginHorizontal: 20,
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal styles
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
  inputContainer: {
    marginTop: 16,
  },
});

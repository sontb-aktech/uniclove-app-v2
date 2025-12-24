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
import React, { useState } from 'react';
import ScreenContainer from 'components/ScreenContainer';
import CustomText from 'components/text/CustomText';
import ImagePicker from 'react-native-image-crop-picker';
import { IconFeather } from 'libs';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@danielsaraldi/react-native-blur-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboardAnimation } from 'hooks/useKeyboardAnimation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalCenter from 'components/modal/ModalCenter';
import ImageIcon from 'components/image/ImageIcon';
import NavigationService from 'NavigationService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const EditProfileScreen = () => {
  const insets = useSafeAreaInsets();

  const [avatar, setAvatar] = useState(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  );
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date(1990, 5, 1)); // Date object
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [bio, setBio] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);

  // Hàm chọn ảnh đại diện
  const handlePickAvatar = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });
      setAvatar(image.path);
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
      }
    }
  };

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

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
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
          {/* Ảnh đại diện */}
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

              {/* Blur overlay button ở dưới */}
              <View style={styles.avatarOverlay}>
                <BlurView style={styles.avatarBlur} radius={40} targetId="" />
                <View style={styles.avatarOverlayContent}>
                  <IconFeather name="camera" size={16} color="#fff" />
                  <CustomText style={styles.avatarOverlayText}>
                    Thay ảnh đại diện
                  </CustomText>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Tên đầy đủ của bạn */}
          <View style={styles.section}>
            <CustomText style={styles.label}>Tên đầy đủ của bạn</CustomText>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên"
                placeholderTextColor="#C7C7CD"
                value={fullName}
                onChangeText={setFullName}
              />
              <IconFeather
                name="user"
                size={20}
                color="#C7C7CD"
                style={styles.inputIcon}
              />
            </View>
          </View>

          {/* Ngày sinh của bạn */}
          <View style={styles.section}>
            <CustomText style={styles.label}>Ngày sinh của bạn</CustomText>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <CustomText style={styles.inputText}>
                {formatBirthDate(birthDate)}
              </CustomText>
              <IconFeather
                name="calendar"
                size={20}
                color="#C7C7CD"
                style={styles.inputIcon}
              />
            </TouchableOpacity>

            {/* DatePicker Modal for iOS */}
            {Platform.OS === 'ios' && showDatePicker && (
              <Modal
                transparent
                animationType="slide"
                visible={showDatePicker}
                onRequestClose={closeDatePicker}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.datePickerContainer}>
                    <View style={styles.datePickerHeader}>
                      <TouchableOpacity onPress={closeDatePicker}>
                        <CustomText style={styles.datePickerButton}>
                          Xong
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      value={birthDate}
                      mode="date"
                      display="spinner"
                      onChange={handleDateChange}
                      maximumDate={new Date()}
                      minimumDate={new Date(1900, 0, 1)}
                      textColor="#000"
                    />
                  </View>
                </View>
              </Modal>
            )}

            {/* DatePicker for Android */}
            {Platform.OS === 'android' && showDatePicker && (
              <DateTimePicker
                value={birthDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
              />
            )}
          </View>

          {/* Giới tính */}
          <View style={styles.section}>
            <CustomText style={styles.label}>Giới tính</CustomText>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  {
                    borderColor: gender == 'male' ? '#0786FF' : 'transparent',
                    borderWidth: 1,
                  },
                ]}
                onPress={() => setGender('male')}
                activeOpacity={0.7}
              >
                <CustomText style={styles.genderText}>Nam</CustomText>
                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor: gender === 'male' ? '#0786FF' : '#969696',
                    },
                  ]}
                >
                  {gender === 'male' && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderButton,
                  {
                    borderColor: gender == 'female' ? '#0786FF' : 'transparent',
                    borderWidth: 1,
                  },
                ]}
                onPress={() => setGender('female')}
                activeOpacity={0.7}
              >
                <CustomText style={styles.genderText}>Nữ</CustomText>
                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor: gender === 'female' ? '#0786FF' : '#969696',
                    },
                  ]}
                >
                  {gender === 'female' && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderButton,
                  {
                    borderColor: gender == 'other' ? '#0786FF' : 'transparent',
                    borderWidth: 1,
                  },
                ]}
                onPress={() => setGender('other')}
                activeOpacity={0.7}
              >
                <CustomText style={styles.genderText}>
                  Giới tính khác
                </CustomText>
                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor: gender === 'other' ? '#0786FF' : '#969696',
                    },
                  ]}
                >
                  {gender === 'other' && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Giới thiệu bản thân */}
          <View style={styles.section}>
            <CustomText style={styles.label}>Giới thiệu bản thân</CustomText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Nhập vài dòng giới thiệu"
              placeholderTextColor="#C7C7CD"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Sở thích */}
          {/* <View style={styles.section}>
          <CustomText style={styles.label}>Sở thích</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Nhập sở thích của bạn"
            placeholderTextColor="#C7C7CD"
            value={hobbies}
            onChangeText={setHobbies}
          />
        </View> */}
        </KeyboardAwareScrollView>

        {/* Button Lưu thay đổi - Neo bottom với gradient background */}
        <View>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[
              styles.saveButtonContainer,
              { paddingBottom: insets.bottom },
            ]}
          >
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#67A4FF', '#0786FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.saveButtonGradient}
              >
                <CustomText style={styles.saveButtonText}>
                  Lưu thay đổi
                </CustomText>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      <ModalCenter
        isVisible={showExitModal}
        onCancel={() => setShowExitModal(false)}
        disableClickOutside={false}
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

          {/* Save Button */}
          <TouchableOpacity
            style={styles.modalSaveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#67A4FF', '#0786FF']}
              style={styles.modalSaveButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <CustomText style={styles.modalSaveButtonText}>
                Lưu lại
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>

          {/* Discard Button */}
          <TouchableOpacity onPress={handleDiscardChanges} activeOpacity={0.7}>
            <CustomText style={styles.modalDiscardText}>
              Thoát mà không lưu
            </CustomText>
          </TouchableOpacity>
        </View>
      </ModalCenter>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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

  // Input styles
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FAFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1C1C1E',
    paddingVertical: 0,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: '#1C1C1E',
  },
  inputIcon: {
    marginLeft: 12,
  },
  textArea: {
    backgroundColor: '#F5FAFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 50,
    textAlignVertical: 'top',
  },

  // Gender styles
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5FAFF',
    borderRadius: 16,
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 17,
  },
  radioOuter: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#969696',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0786FF',
  },
  genderText: {
    fontSize: 14,
  },

  // DatePicker Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  datePickerButton: {
    color: '#0786FF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Save button
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
});

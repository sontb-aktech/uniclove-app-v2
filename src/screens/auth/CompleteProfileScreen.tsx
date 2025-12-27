import GradientBorderButton from 'components/button/GradientBorderButton';
import GradientButton from 'components/button/GradientButton';
import ImageIcon from 'components/image/ImageIcon';
import DatePicker from 'components/picker/DatePicker';
import ListPicker from 'components/picker/ListPicker';
import GroupRatio from 'components/ratio/GroupRatio';
import ScreenContainer from 'components/ScreenContainer';
import CustomInput from 'components/text/CustomInput';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import useRouteParams from 'hooks/useRouteParams';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createUser } from 'stores/UserSlice';
import TextUtils from 'utils/TextUtils';
const width = Dimensions.get('window').width;
const LIST_GENDER = ['Nam', 'Nữ', 'Giới tính khác'];
const LIST_GENDER_CODE = ['MALE', 'FEMALE', 'OTHER'];
const LIST_PROVINCE = [
  'Hà Nội',
  'TP Hồ Chí Minh',
  'Hà Nội',
  'TP Hồ Chí Minh',
  'Hà Nội',
  'TP Hồ Chí Minh',
  'Hà Nội',
  'TP Hồ Chí Minh',
  'Hà Nội',
  'TP Hồ Chí Minh',
  'Hà Nội',
  'TP Hồ Chí Minh',
  'Hà Nội',
  'TP Hồ Chí Minh',
];

const CompleteProfileScreen = () => {
  useStatusBar();
  const routeParams = useRouteParams('CompleteProfileScreen');
  const { theme, themeStyle } = useTheme();
  const common = useCommon();
  const insets = useSafeAreaInsets();
  const [selectedGenderIndex, setSelectedGenderIndex] = useState<number>();
  const [selectedProvinceIndex, setSelectedProvinceIndex] = useState<number>();
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState<Date>();
  const [bioDescription, setBioDescription] = useState('');

  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorBirthday, setIsErrorBirthday] = useState(false);
  const [isErrorGender, setIsErrorGender] = useState(false);
  const [isErrorProvince, setIsErrorProvince] = useState(false);
  const [isErrorBio, setIsErrorBio] = useState(false);
  const maxBirthday = moment().subtract(18, 'years').endOf('day').toDate();
  useEffect(() => {
    if (name) {
      setIsErrorName(!TextUtils.verifyFullName(name));
    }
  }, [name]);

  useEffect(() => {
    if (birthday) {
      if (moment(birthday).isAfter(maxBirthday)) {
        setIsErrorBirthday(true);
      } else {
        setIsErrorBirthday(false);
      }
    }
  }, [birthday]);

  useEffect(() => {
    if (selectedGenderIndex != undefined) {
      setIsErrorGender(false);
    }
  }, [selectedGenderIndex]);

  useEffect(() => {
    if (selectedProvinceIndex != undefined) {
      setIsErrorProvince(false);
    }
  });

  useEffect(() => {
    if (bioDescription) {
      setIsErrorBio(false);
    }
  }, [bioDescription]);

  const onContinue = async () => {
    if (
      selectedGenderIndex == undefined ||
      !name ||
      isErrorName ||
      !birthday ||
      isErrorBirthday ||
      selectedGenderIndex == undefined ||
      !bioDescription
    ) {
      if (selectedGenderIndex == undefined) {
        setIsErrorGender(true);
      }
      if (!name || isErrorName) {
        setIsErrorName(true);
      }
      if (!birthday || isErrorBirthday) {
        setIsErrorBirthday(true);
      }
      if (selectedProvinceIndex == undefined) {
        setIsErrorProvince(true);
      }
      if (!bioDescription) {
        setIsErrorBio(true);
      }
      return;
    }
    const createUserParams: CreateUserParams = {
      name,
      birthday: moment(birthday).format('YYYY-MM-DD'),
      gender: LIST_GENDER_CODE[selectedGenderIndex] as 'FEMALE',
      password: routeParams?.password!,
      phoneNumber: routeParams?.phone!,
    };
    const result = await common.getResultDispatch(createUser(createUserParams));
  };
  // const [];
  return (
    <ScreenContainer hideHeader safeBottom>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Image
          source={require('assets/img_complete_profile.png')}
          style={{
            width: width,
            height: undefined,
            aspectRatio: 78 / 84,
          }}
        />
        <View style={{ marginHorizontal: 20, marginTop: -width * 0.35 }}>
          <View>
            <CustomInput
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Nhập tên"
              style={styles.inputContainer}
              iconRight={
                <ImageIcon source={require('assets/ic_persion.png')} />
              }
              label="Tên đầy đủ của bạn"
              autoCapitalize="words"
              isError={isErrorName}
              textError={'Tên không hợp lệ'}
            />
            <DatePicker
              onChangeDate={date => setBirthday(date)}
              style={styles.inputContainer}
              iconRight={
                <ImageIcon source={require('assets/ic_persion.png')} />
              }
              label="Ngày sinh của bạn"
              maxDate={maxBirthday}
              textError={
                !birthday ? 'Vui lòng chọn ngày sinh' : 'Bạn phải đủ 18 tuổi'
              }
              isError={isErrorBirthday}
            />
            <GroupRatio
              label="Giới tính"
              listItems={LIST_GENDER}
              style={styles.inputContainer}
              currentIndex={selectedGenderIndex}
              onPressItem={index => setSelectedGenderIndex(index)}
              isError={isErrorGender}
            />
            <ListPicker
              listItem={LIST_PROVINCE}
              currentIndex={selectedProvinceIndex}
              onSelectedIndex={index => setSelectedProvinceIndex(index)}
              label="Bạn đang sinh sống ở tỉnh/thành nào?"
              style={styles.inputContainer}
              placeHolder="Tỉnh/Thành phố"
              placeHolderSearch="Tìm tỉnh thành"
              isError={isErrorProvince}
              textError="Vui lòng chọn tỉnh thành"
            />
            <CustomInput
              value={bioDescription}
              onChangeText={text => setBioDescription(text)}
              placeholder="Nhập vài dòng giới thiệu"
              style={styles.inputContainer}
              label="Giới thiệu bản thân"
              multiline
              maxLength={250}
              isError={isErrorBio}
              textError="Vui lòng nhập giới thiệu bản thân"
            />
          </View>
        </View>
      </ScrollView>
      <GradientButton
        text="Tiếp tục"
        style={{ marginTop: 0, marginHorizontal: 20 }}
        iconRight={
          <ImageIcon source={require('assets/ic_arrow_right_light.png')} />
        }
        onPress={onContinue}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    marginTop: 16,
  },
});

export default CompleteProfileScreen;

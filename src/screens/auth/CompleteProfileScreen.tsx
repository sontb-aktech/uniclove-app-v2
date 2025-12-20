import GradientBorderButton from 'components/button/GradientBorderButton';
import GradientButton from 'components/button/GradientButton';
import ImageIcon from 'components/ImageIcon';
import DatePicker from 'components/picker/DatePicker';
import ListPicker from 'components/picker/ListPicker';
import GroupRatio from 'components/ratio/GroupRatio';
import ScreenContainer from 'components/ScreenContainer';
import CustomInput from 'components/text/CustomInput';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import useStatusBar from 'hooks/useStatusBar';
import useTheme from 'hooks/useTheme';
import moment from 'moment';
import React, { useState } from 'react';
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
const width = Dimensions.get('window').width;
const LIST_GENDER = ['Nam', 'Nữ', 'Giới tính khác'];
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
  useStatusBar('dark-content');
  const { theme, themeStyle } = useTheme();
  const common = useCommon();
  const insets = useSafeAreaInsets();
  const [selectedGender, setSelectedGender] = useState<number>();
  const [selectedProvinceIndex, setSelectedProvinceIndex] = useState<number>();
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
        <View style={{ marginHorizontal: 20, marginTop: -width * 0.27 }}>
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
            <ListPicker
              listItem={LIST_PROVINCE}
              currentIndex={selectedProvinceIndex}
              onSelectedIndex={index => setSelectedProvinceIndex(index)}
              label="Bạn đang sinh sống ở tỉnh/thành nào?"
              style={styles.inputContainer}
              placeHolder="Tỉnh/Thành phố"
              placeHolderSearch="Nhập tỉnh thành"
            />
            <CustomInput
              placeholder="Nhập vài dòng giới thiệu"
              style={styles.inputContainer}
              label="Giới thiệu bản thân"
              multiline
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
        onPress={() => common.navigate('CompletePictureProfileScreen')}
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

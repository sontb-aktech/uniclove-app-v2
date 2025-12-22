import useTheme from 'hooks/useTheme';
import React, { useState } from 'react';
import {
  Pressable,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ImageIcon from 'components/image/ImageIcon';
import CustomText from 'components/text/CustomText';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

const DatePicker = (props: {
  style?: ViewStyle;
  iconRight?: any;
  isError?: boolean;
  label?: string;
  maxDate?: Date;
  onChangeDate?: (date: Date) => void;
  textError?: string;
}) => {
  const { themeStyle } = useTheme();
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>();

  const onChangeDate = (date: Date) => {
    setShowDateTimePicker(false);
    // setDateStr(moment(date).format('DD-MM-YYYY'));
    setCurrentDate(date);
    props.onChangeDate?.(date);
  };

  return (
    <View style={[props.style]}>
      <CustomText fontStyleType="title-semibold" style={{ marginBottom: 12 }}>
        {props.label}
      </CustomText>
      <TouchableOpacity
        style={[
          {
            backgroundColor: props.isError
              ? themeStyle.errorContainer
              : themeStyle.primaryContainer,
            borderRadius: 16,
            borderWidth: props.isError ? 1 : 0,
            borderColor: props.isError ? themeStyle.error : themeStyle.primary,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 16,
          },
        ]}
        onPress={() => setShowDateTimePicker(true)}
      >
        <CustomText
          colorType={currentDate ? 'default' : 'subtitleText'}
          style={{ flex: 1 }}
        >
          {currentDate
            ? moment(currentDate).format('DD / MM / YYYY')
            : 'dd / mm / yyyyy'}
        </CustomText>

        {!!props.iconRight && (
          <ImageIcon source={require('assets/ic_date.png')} />
        )}
      </TouchableOpacity>
      <DateTimePicker
        isVisible={showDateTimePicker}
        date={currentDate ?? props.maxDate ?? new Date()}
        locale="vi_VN"
        mode={'date'}
        maximumDate={props.maxDate}
        // display={'default'}
        // maximumDate={moment().startOf('day').add(-1, 'day').toDate()}
        // onChange={onChangeDate}
        onConfirm={date => {
          onChangeDate(date);
          // setCanUpdate(true);
        }}
        onCancel={() => setShowDateTimePicker(false)}
      />
      {!!props.isError && (
        <CustomText
          fontStyleType="title-semibold"
          style={{ marginTop: 8, color: themeStyle.error, fontStyle: 'italic' }}
        >
          {props.textError ?? '*Không được để trống thông tin này'}
        </CustomText>
      )}
    </View>
  );
};

export default DatePicker;

import useTheme from 'hooks/useTheme';
import React, { useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import ImageIcon from 'components/ImageIcon';
import CustomText from 'components/text/CustomText';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalSingleSelect from 'components/modal/ModalSingleSelect';

const ListPicker = (props: {
  listItem: string[];
  style?: ViewStyle;
  label?: string;
  currentIndex?: number;
  onSelectedIndex: (index: number) => void;
  isError?: boolean;
  textError?: string;
  placeHolder?: string;
  placeHolderSearch?: string;
}) => {
  const { themeStyle } = useTheme();
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const isSelected =
    props.currentIndex != undefined || props.currentIndex != null;

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
          colorType={isSelected ? 'default' : 'subtitleText'}
          style={{ flex: 1 }}
        >
          {isSelected
            ? props.listItem[props.currentIndex ?? 0]
            : props.placeHolder}
        </CustomText>

        <ImageIcon source={require('assets/ic_pick_down.png')} />
      </TouchableOpacity>
      <ModalSingleSelect
        isVisible={showDateTimePicker}
        listItem={props.listItem}
        selectedIndex={props.currentIndex}
        onSelectedIndex={props.onSelectedIndex}
        onCancel={() => setShowDateTimePicker(false)}
        showSearch
        placeHolderSearch={props.placeHolderSearch}
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

export default ListPicker;

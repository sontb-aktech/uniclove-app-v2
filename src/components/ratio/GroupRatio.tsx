import CustomText from 'components/text/CustomText';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import RatioButton from './RatioButton';
import useTheme from 'hooks/useTheme';

const GroupRatio = (props: {
  style?: ViewStyle;
  listItems: string[];
  currentIndex?: number;
  label?: string;
  isError?: boolean;
  textError?: string;
  onPressItem?: (index: number) => void;
}) => {
  const { themeStyle } = useTheme();

  return (
    <View style={[props.style]}>
      {!!props.label && (
        <CustomText fontStyleType="title-semibold" style={{ marginBottom: 0 }}>
          {props.label}
        </CustomText>
      )}
      <View style={styles.container}>
        {props.listItems.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                {
                  backgroundColor: props.isError
                    ? themeStyle.errorContainer
                    : themeStyle.primaryContainer,
                  borderColor: props.isError
                    ? themeStyle.error
                    : themeStyle.primary,
                  borderWidth:
                    props.currentIndex == index || props.isError ? 1 : 0,
                },
              ]}
              key={index}
              onPress={() => props.onPressItem?.(index)}
            >
              <CustomText>{item}</CustomText>
              <RatioButton
                isSelected={props.currentIndex == index}
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {!!props.isError && (
        <CustomText
          fontStyleType="text-regular"
          style={{ marginTop: 8, color: themeStyle.error, fontStyle: 'italic' }}
        >
          {props.textError ?? '*Vui lòng chọn ít nhất một mục'}
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginRight: 16,
    marginTop: 8,
    borderRadius: 16,
  },
});

export default GroupRatio;

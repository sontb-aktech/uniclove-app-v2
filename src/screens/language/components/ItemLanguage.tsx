import ImageIcon from 'components/ImageIcon';
import RatioButton from 'components/ratio/RatioButton';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

function ItemLanguage(
  props: LangType & {
    onSelected: (item: LangType) => void;
    isSelected: boolean;
    style?: ViewStyle;
  },
) {
  const {onSelected, isSelected, style, ...item} = props;
  const {themeStyle} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {backgroundColor: themeStyle.surface},
        isSelected && {
          borderColor: themeStyle.primary,
          borderWidth: 1,
        },
        props.style,
      ]}
      onPress={() => props.onSelected(item)}>
      {!!item.flag && (
        <ImageIcon source={item.flag} size={22} tintColor={item.tintColor} />
      )}
      <Text
        style={{
          // color: themeStyle.text,
          fontSize: 14,
          flex: 1,
          marginLeft: 10,
        }}>
        {item.name}
      </Text>
      <RatioButton isSelected={isSelected} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'center',
    // justifyContent: 'space-between',
    // paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginHorizontal: 14,
    height: 50,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  iconDelete: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'flex-end',
  },
  imageItemChoose: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default React.memo(ItemLanguage);

import CustomText from 'components/text/CustomText';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import useTheme from 'hooks/useTheme';
import SelectedItem from './SelectorItem';

const GroupSelector = (props: {
  style?: ViewStyle;
  listItems: string[];
  listSelected?: number[];
  label?: string;
  isError?: string;
  onPressItem?: (index: number) => void;
}) => {
  const { themeStyle } = useTheme();

  return (
    <View style={[styles.container, props.style]}>
      {props.listItems.map((item, index) => {
        return (
          <SelectedItem
            key={index}
            label={item}
            isSelected={props.listSelected?.includes(index)}
            onPress={() => props.onPressItem?.(index)}
            style={{ marginRight: 12 }}
          />
        );
      })}
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
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginRight: 16,
    marginTop: 8,
    borderRadius: 16,
  },
});

export default GroupSelector;

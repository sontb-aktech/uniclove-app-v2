import useTrans from 'hooks/useTrans';
import { Icon5 } from 'libs';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalStyles } from 'utils/GlobalStyles';
import TextUtils from 'utils/TextUtils';
import ModalPopup from './ModalPopup';
import CustomInput from 'components/text/CustomInput';
import ImageIcon from 'components/image/ImageIcon';
import useTheme from 'hooks/useTheme';
import CustomText from 'components/text/CustomText';
import RatioButton from 'components/ratio/RatioButton';
import ModalCenter from './ModalCenter';
import ModalBottom from './ModalBottom';

type Props = {
  listItem: string[];
  selectedIndex?: number;
  onSelectedIndex: (index: number) => void;
  isVisible: boolean;
  onCancel: () => void;
  title?: string;
  searchHint?: string;
  showSearch?: boolean;
  isWrapContain?: boolean;
  placeHolderSearch?: string;
};

const ModalSingleSelect = (props: Props) => {
  const [isVisible, setVisible] = useState(props.isVisible);
  const insets = useSafeAreaInsets();
  const { themeStyle } = useTheme();
  // const listItem = props.listItem?.slice();
  // if (props.showSelectAll) {
  //   listItem?.unshift(undefined);
  // }

  useEffect(() => {
    setVisible(props.isVisible);
  }, [props.isVisible]);

  const [listSearch, setListSearch] = useState(props.listItem);

  useEffect(() => {
    if (props.listItem && props.isVisible) {
      setListSearch([...props.listItem]);
    }
  }, [props.listItem, props.isVisible]);

  const onSearchChange = (text: string) => {
    if (props.listItem) {
      if (!text) {
        if (props.listItem) {
          setListSearch([...props.listItem]);
        }
      } else {
        const listSearch = [...props.listItem].filter(item => {
          return TextUtils.search(item, text);
        });
        setListSearch(listSearch);
      }
    }
  };

  return (
    <ModalBottom
      isVisible={props.isVisible}
      onCancel={props.onCancel}
      height={'50%'}
    >
      <View
        style={{
          marginTop: 48,
          marginHorizontal: 16,
          flex: 1,
        }}
      >
        {props.title && <CustomText>{props.title}</CustomText>}
        {props.showSearch && (
          <CustomInput
            placeholder={props.placeHolderSearch}
            iconRight={<ImageIcon source={require('assets/ic_search.png')} />}
            onChangeText={onSearchChange}
          />
        )}
        <ScrollView
          style={{ flex: 1, marginTop: 4 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={{ alignSelf: 'stretch' }}>
            {listSearch?.map((item, index) => {
              const isSelected = props.selectedIndex == index;
              return (
                <TouchableOpacity
                  style={[
                    styles.itemContainer,
                    {
                      backgroundColor: themeStyle.primaryContainer,
                      borderColor: themeStyle.primary,
                      borderWidth: isSelected ? 1 : 0,
                    },
                  ]}
                  key={index}
                  onPress={() => props.onSelectedIndex(index)}
                >
                  <CustomText style={{ flex: 1 }}>{item}</CustomText>
                  <RatioButton isSelected={isSelected} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ModalBottom>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 12,
  },
});

export default ModalSingleSelect;

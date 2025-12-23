import useCommon from 'hooks/useCommon';
import React, { useRef } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import ImageIcon from './image/ImageIcon';
import useTheme from 'hooks/useTheme';
import { useBackHandler, useKeyboard } from '@react-native-community/hooks';
import GradientText from './text/GradientText';
import CustomText from './text/CustomText';
import { LightStyle } from 'utils/Colors';

export type ButtonRightType = {
  source?: any;
  text?: string;
  onPress?: () => void;
  disableTint?: boolean;
  button?: any;
};
const screenWidth = Dimensions.get('window').width;

const ScreenContainer = (props: {
  containInput?: boolean;
  children?: any;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  onPressBack?: () => void;
  title?: string;
  listButtonRight?: ButtonRightType[];
  disableBack?: boolean;
  headerStyle?: ViewStyle;
  safeBottom?: boolean;
  safeBottomStyle?: ViewStyle;
  extraHeader?: any;
  hideHeader?: boolean;
}) => {
  const common = useCommon();
  const { theme, themeStyle } = useTheme();
  const insets = useSafeAreaInsets();
  // const bottomRef = useRef(insets.bottom);
  const keyboard = useKeyboard();

  useBackHandler(() => {
    if (!props.disableBack) {
      common.goBack();
      return true;
    }
    return false;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeStyle.background,
        paddingTop: insets.top,
        paddingBottom: Platform.select({
          ios: props.safeBottom ? insets.bottom : 0,
          android:
            !keyboard.keyboardShown && props.safeBottom ? insets.bottom : 0,
        }),
      }}
      // edges={['top', props.safeBottom ? 'bottom' : 'top']}
    >
      <View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: insets.bottom,
          },
          props.safeBottomStyle,
        ]}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={'padding'}
        enabled={props.containInput && Platform.OS == 'ios' ? true : false}
      >
        {!props.hideHeader && (
          <View style={[styles.header, props.headerStyle, {}]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {!props.disableBack ? (
                <Pressable
                  style={[styles.btnBack]}
                  hitSlop={10}
                  onPress={() => {
                    props.onPressBack ? props.onPressBack() : common.goBack();
                  }}
                >
                  <ImageIcon
                    size={24}
                    source={require('assets/ic_back.png')}
                    tintColor={themeStyle.primary}
                  />
                </Pressable>
              ) : (
                <View style={{ width: 18 }} />
              )}

              <CustomText fontStyleType="header-medium" numberOfLines={1}>
                {props?.title}
              </CustomText>

              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                {props.listButtonRight?.map((item, index) => {
                  if (item.button) {
                    return (
                      <Pressable
                        key={index}
                        hitSlop={10}
                        onPress={item.onPress}
                      >
                        {item.button}
                      </Pressable>
                    );
                  }
                  return (
                    <Pressable
                      style={[styles.button, !!item.text && { width: 'auto' }]}
                      onPress={item.onPress}
                      key={index}
                    >
                      {!!item.text ? (
                        <CustomText
                          style={{
                            textDecorationLine: 'underline',
                          }}
                        >
                          {item.text}
                        </CustomText>
                      ) : (
                        <ImageIcon source={item.source} size={24} />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        )}

        <View style={[{ flex: 1 }, props.contentContainerStyle]}>
          {props.children}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLOR.MAIN,
  },
  header: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  btnBack: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LightStyle.primaryContainer,
    borderRadius: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  memberTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    maxWidth: '85%',
  },
  button: {
    width: 35,
    height: 40,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScreenContainer;

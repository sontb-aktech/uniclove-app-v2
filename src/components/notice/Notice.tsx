import ImageIcon from 'components/image/ImageIcon';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import useTheme from 'hooks/useTheme';
import { Icon5 } from 'libs';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FullWindowOverlay } from 'react-native-screens';
import { useAppSelector } from 'stores';
import { GlobalStyles } from 'utils/GlobalStyles';
const WindowView = (props: { children: any; isVisible: boolean }) => {
  if (Platform.OS == 'android') {
    return <Portal>{props.children}</Portal>;
  } else {
    return <FullWindowOverlay>{props.children}</FullWindowOverlay>;
  }
};

const Notice = () => {
  const { closeNotice } = useCommon();
  const { themeStyle } = useTheme();
  const insets = useSafeAreaInsets();
  const props = useAppSelector(state => state.common);
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  // const [showNotice, setShowNotice] = useState(props.showNotice);
  // if (showNotice != props.showNotice) {
  //   if (props.showNotice) {
  //     setShowNotice(props.showNotice);
  //   }
  // }
  // const insets = useSafeAreaInsets();
  // useEffect(() => {
  //   if (props.showNotice) {
  //     fadeAnim.setValue(0);
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }).start();
  //   } else {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }).start(() => {
  //       setShowNotice(false);
  //     });
  //   }
  // }, [props.showNotice]);
  if (props.showNotice) {
    return (
      <WindowView isVisible={props.showNotice}>
        <View style={{ marginTop: insets.top }}>
          <Animated.View
            style={[
              {
                backgroundColor:
                  props.noticeType == 'warning'
                    ? themeStyle.tertiaryContainer
                    : themeStyle.surface,

                borderRadius: 12,
                marginHorizontal: 8,
                paddingVertical: 10,
                // marginTop:
                //   Platform.OS == 'ios' ? insets.top + 10 : insets.top + 10,
                paddingLeft: 12,
                flexDirection: 'row',
                alignItems: 'center',
                // opacity: fadeAnim,
                borderWidth: 1,
                borderColor:
                  props.noticeType == 'warning'
                    ? themeStyle.tertiary
                    : themeStyle.primary,
              },
              GlobalStyles.shadow,
            ]}
            entering={FadeInUp}
            exiting={FadeOutUp}
          >
            {props.noticeType == 'warning' ? (
              <ImageIcon
                size={20}
                source={require('assets/ic_notice_waring.png')}
              />
            ) : (
              <ImageIcon
                size={20}
                source={require('assets/ic_notice_success.png')}
              />
            )}
            <CustomText numberOfLines={2} style={{ marginLeft: 8, flex: 1 }}>
              {props.textNotice.toString()}
            </CustomText>
            {/* <Pressable
              onPress={closeNotice}
              hitSlop={10}
              style={{
                backgroundColor: COLOR.OVERLAY_LIGHT_LIGHT,
                borderRadius: 100,
                padding: 5,
                marginRight: 10,
              }}>
              <IconIonic
                name="close-outline"
                style={{color: COLOR.WHITE, fontSize: 18}}
              />
            </Pressable> */}
          </Animated.View>
        </View>
      </WindowView>
    );
  } else {
    return null;
  }
};

export default Notice;

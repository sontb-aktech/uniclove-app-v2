import useTheme from 'hooks/useTheme';
import useTrans from 'hooks/useTrans';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const width = Dimensions.get('window').width;
const itemWidth = (width * 4.5) / 5;
const ItemIntro = (props: {
  source: any;
  title: string;
  desc: string;
  onPressNext: () => void;
  // adUnitKey: AdUnitKey;
  index: number;
  currentIndex: number;
  isVisible?: boolean;
}) => {
  const {trans} = useTrans();
  const {themeStyle} = useTheme();
  const insets = useSafeAreaInsets();
  const [disableNext, setDisableNext] = useState(true);
  // const nativeAdRef = useRef<AdmobNativeLargeType>(null);

  useEffect(() => {
    if (props.isVisible) {
      const timeout = setTimeout(() => {
        setDisableNext(false);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [props.isVisible]);
  // const admobRef = useRef<AdmobBannerType>(null);
  // useFocusEffect(
  //   useCallback(() => {
  //     admobRef.current?.startAnimation();
  //   }, []),
  // );
  return (
    <View
      style={{
        // height: width,
        flex: 1,
        paddingTop: 30 + insets.top,
        alignItems: 'center',
      }}>
      {/* @ts-ignore */}
      <Text
        style={{
          fontSize: 18,
          color: themeStyle.onBackground,
          textAlign: 'center',
          fontWeight: 'bold',
          width: '90%',
          alignSelf: 'center',
        }}>
        {props.title}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: themeStyle.onSurfaceVariant,
          textAlign: 'center',
          marginTop: 0,
          width: '80%',
          alignSelf: 'center',
          // fontWeight: '300',
          marginBottom: 16,
        }}>
        {props.desc}
      </Text>
      <Image
        // ref={ref => {
        //   if (ref) videoRef.current[index] = ref;
        // }}
        source={props.source}
        style={styles.video}
        resizeMode="contain"
        fadeDuration={0}
        // paused={currentPage != index}
      />
      {/* <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'flex-end',
          bottom: insets.bottom + 308,
          left: 20,
          right: 20,
        }}>
        <Pressable
          hitSlop={10}
          onPress={() => props.onPressNext()}
          disabled={disableNext}
          style={{
            backgroundColor: COLOR.PRIMARY,
            paddingLeft: 14,
            paddingRight: 6,
            paddingVertical: 6,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            opacity: disableNext ? 0.5 : 1,
          }}>
          <Text style={{fontSize: 16, color: COLOR.WHITE, fontWeight: 'bold'}}>
            {props.index == 3 ? trans.start_now : trans.next}
          </Text>
          <IconIonic
            name="chevron-forward"
            size={18}
            color={COLOR.WHITE}
            style={{marginLeft: 4}}
          />
        </Pressable>
      </View> */}
      {/* {props.index == 2 ? (
        <AdmobNativeFull
          adUnitKey={props.adUnitKey}
          // adUnitID={AdmobIds.Native_Language}
          style={{
            marginTop: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            // borderRadius: 12,
            // borderTopLeftRadius: 8,
          }}
          isVisible={props.isVisible}
          onPressSkip={props.onPressNext}
        />
      ) : ( */}
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: insets.bottom,
        }}>
        <AdmobNativeLarge
          adUnitKey={props.adUnitKey}
          // adUnitID={AdmobIds.Native_Language}
          style={{
            marginTop: 0,
            backgroundColor: COLOR.SUB_2,
            // borderRadius: 12,
            // borderTopLeftRadius: 8,
          }}
          isVisible={props.isVisible}
          disableAutoLoad={true}
        />
      </View> */}
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width: width,
    // height: height,
  },

  video: {
    width: itemWidth,
    height: itemWidth,
    marginTop: 4,
    // backgroundColor: 'red',
  },
  button: {
    borderRadius: 12,
    height: 44,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 170,
  },
  textButton: {fontSize: 14, fontWeight: 'bold'},
  iconButton: {position: 'absolute', right: 16},
  btnSkip: {position: 'absolute', right: 0, top: 0},
  textSkip: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default ItemIntro;

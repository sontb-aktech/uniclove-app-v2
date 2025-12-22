import ImageIcon from 'components/image/ImageIcon';
import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
const PictureProfileUpload = () => {
  const { themeStyle } = useTheme();
  const list1 = [1, 2, 3];
  return (
    <View style={styles.container}>
      <View
        style={{
          // width: '100%',
          // width: 200,
          alignSelf: 'stretch',
          marginHorizontal: 20,
        }}
      >
        <Image
          source={require('assets/img_curved_chain.png')}
          style={{
            alignSelf: 'stretch',
            aspectRatio: 1170 / 72,
            backgroundColor: 'red',
          }}
          resizeMode="center"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: -12,
          }}
        >
          {list1.map((item, index) => (
            <PictureProfileItem key={index} />
          ))}
        </View>
      </View>
    </View>
  );
};

const PictureProfileItem = () => {
  const { themeStyle } = useTheme();
  return (
    <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
      <Image
        style={{ width: 6, height: 26, zIndex: 10 }}
        source={require('assets/img_peg.png')}
      />
      <View
        style={[
          styles.itemProfile,
          { backgroundColor: themeStyle.primaryContainer },
        ]}
      >
        <ImageIcon
          size={36}
          source={require('assets/img_default_profile.png')}
        />
      </View>
      <View
        style={[
          styles.btnAdd,
          {
            backgroundColor: themeStyle.surface,
            borderColor: themeStyle.primary,
          },
        ]}
      >
        <CustomText style={{ color: themeStyle.primary }}>Thêm</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  itemProfile: {
    width: 92,
    height: 92,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -6,
  },
  btnAdd: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: -16,
  },
});

export default PictureProfileUpload;

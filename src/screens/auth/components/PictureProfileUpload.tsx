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
        }}
      >
        <View style={{ marginTop: 16 }}>
          <CurvedChain />
          <View style={styles.pictureContainer}>
            {list1.map((item, index) => (
              <PictureProfileItem key={index} />
            ))}
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <CurvedChain />
          <View style={styles.pictureContainer}>
            {list1.map((item, index) => (
              <PictureProfileItem key={index} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const CurvedChain = () => {
  return (
    <View
      style={{
        alignSelf: 'stretch',
        aspectRatio: 1170 / 72,
        flexDirection: 'row',
      }}
    >
      <Image
        source={require('assets/img_curved_chain.png')}
        style={{
          flex: 1,
          aspectRatio: 1170 / 72,
        }}
        resizeMode="center"
      />
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
  pictureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -12,
  },
});

export default PictureProfileUpload;

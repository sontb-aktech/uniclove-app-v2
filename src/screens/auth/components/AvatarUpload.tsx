import ImageIcon from 'components/image/ImageIcon';
import CustomText from 'components/text/CustomText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
const AvatarUpload = (props: { style?: ViewStyle }) => {
  const { theme, themeStyle } = useTheme();
  const [selectedImage, setSelectedImage] = React.useState(null);
  return (
    <TouchableOpacity
      style={[
        {
          width: 220,
          height: 220,
          borderRadius: 24,
          borderWidth: 1.5,
          borderColor: themeStyle.primary,
          marginTop: 24,
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}
    >
      <ImageIcon source={require('assets/img_default_profile.png')} size={36} />
      <CustomText style={{ color: themeStyle.primary, marginTop: 8 }}>
        Tải lên ảnh đại diện
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AvatarUpload;

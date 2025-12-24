import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { IconFeather } from 'libs';
import CustomText from 'components/text/CustomText';

interface AlbumPhotoItemProps {
  id: number;
  image: any;
  isDefault: boolean;
  onPress: () => void;
  onRemove: () => void;
}

const AlbumPhotoItem = (props: AlbumPhotoItemProps) => {
  const { id, image, isDefault, onPress, onRemove } = props;
  return (
    <View key={id} style={styles.photoContainer}>
      <Image
        source={require('assets/img_peg.png')}
        style={styles.peg}
        resizeMode="contain"
      />

      <View style={styles.photoWrapper}>
        <TouchableOpacity style={styles.photoFrame} onPress={onPress}>
          <Image
            source={image}
            style={isDefault ? styles.photoImageDefault : styles.photoImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {!isDefault && (
          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <IconFeather name="x" size={14} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {!isDefault && (
        <View style={styles.changeLabel}>
          <CustomText style={styles.changeLabelText}>Thay ảnh</CustomText>
        </View>
      )}
    </View>
  );
};

export default AlbumPhotoItem;

const styles = StyleSheet.create({
  photoContainer: {
    alignItems: 'center',
    width: 92,
  },
  peg: {
    width: 24,
    height: 24,
    zIndex: 2,
  },
  photoWrapper: {
    position: 'relative',
    width: 92,
    marginTop: -5,
  },
  photoFrame: {
    width: 92,
    aspectRatio: 1,
    backgroundColor: '#F5FAFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    overflow: 'hidden',
  },
  photoImageDefault: {
    width: 30,
    height: 30,
  },
  photoImage: {
    width: 92,
    height: 92,
  },
  removeButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 14,
    backgroundColor: '#0786FF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  changeLabel: {
    marginTop: -12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0786FF',
    alignSelf: 'center',
  },
  changeLabelText: {
    color: '#0786FF',
    fontSize: 12,
    fontWeight: '600',
  },
});

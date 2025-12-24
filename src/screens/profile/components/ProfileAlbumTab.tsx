import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import AlbumPhotoItem from './AlbumPhotoItem';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Photo {
  id: number;
  image: any;
  isDefault: boolean;
}

interface ProfileAlbumTabProps {
  photos: Photo[];
  onPickImage: (photoId: number) => void;
  onRemoveImage: (photoId: number) => void;
}

const ProfileAlbumTab: React.FC<ProfileAlbumTabProps> = ({
  photos,
  onPickImage,
  onRemoveImage,
}) => {
  // Chia photos thành các hàng, mỗi hàng tối đa 3 ảnh
  const chunkPhotos = (photoList: Photo[], size: number = 3) => {
    const chunks = [];
    for (let i = 0; i < photoList.length; i += size) {
      chunks.push(photoList.slice(i, i + size));
    }
    return chunks;
  };

  const photoRows = chunkPhotos(photos);

  const renderAlbumRow = (row: Photo[], rowIndex: number) => (
    <View key={`row-${rowIndex}`} style={styles.albumRow}>
      <View style={styles.chainContainer}>
        <Image
          source={require('assets/img_curved_chain.png')}
          style={styles.curvedChain}
          resizeMode="cover"
        />
      </View>

      {/* Album Grid for this row */}
      <View style={styles.albumGrid}>
        {row.map(photo => (
          <AlbumPhotoItem
            key={photo.id}
            id={photo.id}
            image={photo.image}
            isDefault={photo.isDefault}
            onPress={() => onPickImage(photo.id)}
            onRemove={() => onRemoveImage(photo.id)}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.albumSection}>
      {photoRows.map((row, index) => renderAlbumRow(row, index))}
    </View>
  );
};

export default ProfileAlbumTab;

const styles = StyleSheet.create({
  albumSection: {
    paddingTop: 30,
  },
  albumRow: {
    marginBottom: 24,
  },
  chainContainer: {
    width: SCREEN_WIDTH,
  },
  curvedChain: {
    width: '100%',
    height: 20,
    marginBottom: -10,
  },
  albumGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 20,
  },
});

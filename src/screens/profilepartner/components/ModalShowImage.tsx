import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import AwesomeGallery from 'react-native-awesome-gallery';
import ModalImage from 'components/modal/ModalImage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Cấu hình Card Profile
const CARD_MARGIN = 32;
const IMAGE_WIDTH = SCREEN_WIDTH - CARD_MARGIN;
const IMAGE_ASPECT_RATIO = 3 / 4;
const IMAGE_HEIGHT = IMAGE_WIDTH / IMAGE_ASPECT_RATIO;

type ImageItem = {
  id?: number | string;
  image: ImageSourcePropType | { uri: string } | string;
};

type GalleryItem = {
  source: ImageSourcePropType;
  key: string | number;
};

const ModalShowImage = (props: {
  isVisible: boolean;
  onCancel: () => void;
  images: ImageItem[];
  initialIndex?: number;
}) => {
  const { isVisible, onCancel, images = [], initialIndex = 0 } = props;
  const [index, setIndex] = useState(initialIndex);
  const galleryRef = useRef<any>(null);

  useEffect(() => {
    if (isVisible) {
      setIndex(Math.max(0, initialIndex));
    }
  }, [isVisible, initialIndex]);

  useEffect(() => {
    if (isVisible && galleryRef.current) {
      setTimeout(() => {
        galleryRef.current?.setIndex(Math.max(0, initialIndex));
      }, 50);
    }
  }, [isVisible, initialIndex]);

  const galleryData: GalleryItem[] = images.map((img, i) => {
    let source: ImageSourcePropType;
    if (typeof img.image === 'string') {
      source = { uri: img.image };
    } else if ((img.image as any)?.uri) {
      source = { uri: (img.image as any).uri };
    } else {
      source = img.image as ImageSourcePropType;
    }
    return { source, key: img.id || i };
  });

  const renderItem = ({
    item,
    index: itemIndex,
  }: {
    item: GalleryItem;
    index: number;
    setImageDimensions: any;
  }) => {
    return (
      <View style={styles.itemContainer}>
        {/* Card Profile: Giữ nguyên logic ảnh bo góc + dot bên trong */}
        <View style={styles.imageCard}>
          <Image source={item.source} style={styles.image} resizeMode="cover" />
          <View style={styles.gradientOverlay} />
        </View>
      </View>
    );
  };

  return (
    <ModalImage
      isVisible={isVisible}
      onCancel={onCancel}
      // QUAN TRỌNG: Dòng này giúp giữ Animation/Blur nhưng sửa lỗi layout
      contentContainerStyle={{ flex: 1, width: '100%', height: '100%' }}
    >
      <View style={styles.galleryWrapper}>
        <AwesomeGallery
          ref={galleryRef}
          data={galleryData}
          keyExtractor={(item: GalleryItem) => String(item.key)}
          renderItem={renderItem}
          initialIndex={initialIndex}
          onIndexChange={setIndex}
          onSwipeToClose={onCancel}
          style={{ flex: 1 }}
        />
        <View style={styles.dotsContainer}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                index === i ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </ModalImage>
  );
};

export default ModalShowImage;

const styles = StyleSheet.create({
  galleryWrapper: {
    flex: 1,
    width: '100%',
  },
  itemContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCard: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#222',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#FFFFFF',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});

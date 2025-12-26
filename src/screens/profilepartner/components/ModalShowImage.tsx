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
import ModalCenter from 'components/modal/ModalCenter';
import ModalPopup from 'components/modal/ModalPopup';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_MARGIN = 32;
const IMAGE_WIDTH = SCREEN_WIDTH - CARD_MARGIN;
const IMAGE_ASPECT_RATIO = 3 / 4;
const IMAGE_HEIGHT = IMAGE_WIDTH / IMAGE_ASPECT_RATIO;

const ModalShowImage = (props: {
  isVisible: boolean;
  onCancel: () => void;
  images: string[];
  initialIndex?: number;
}) => {
  const { isVisible, onCancel, images = [], initialIndex = 0 } = props;
  const [index, setIndex] = useState(initialIndex);
  const galleryRef = useRef<any>(null);
  const renderItem = ({ item, index: itemIndex, setImageDimensions }: any) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageCard}>
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
            onLoad={e => {
              const { width, height } = e.nativeEvent.source;
              setImageDimensions({ width, height });
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <ModalImage isVisible={isVisible} onCancel={onCancel}>
      <AwesomeGallery
        ref={galleryRef}
        data={images}
        renderItem={renderItem}
        initialIndex={initialIndex}
        onIndexChange={setIndex}
        onSwipeToClose={onCancel}
        style={{ flex: 1 }}
      />
    </ModalImage>
  );
};

export default ModalShowImage;

const styles = StyleSheet.create({
  galleryWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    elevation: 50,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});

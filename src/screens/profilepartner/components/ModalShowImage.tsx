import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import ModalCenter from 'components/modal/ModalCenter';
import ImageIcon from 'components/image/ImageIcon';
import CustomText from 'components/text/CustomText';
import ModalImage from 'components/modal/ModalImage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type ImageItem = {
  id?: number | string;
  image: ImageSourcePropType | { uri: string } | string;
};

const ITEM_WIDTH = SCREEN_WIDTH;

const resolveSource = (input: ImageItem['image']) => {
  if (!input) return undefined;
  if (typeof input === 'string') return { uri: input };
  return input as ImageSourcePropType;
};

const ModalShowImage = (props: {
  isVisible: boolean;
  onCancel: () => void;
  images: ImageItem[];
  initialIndex?: number;
}) => {
  const { isVisible, onCancel, images = [], initialIndex = 0 } = props;
  const [index, setIndex] = useState(Math.max(0, initialIndex));
  const listRef = useRef<FlatList<ImageItem> | null>(null);

  useEffect(() => {
    setIndex(Math.max(0, initialIndex));
  }, [initialIndex, isVisible]);

  useEffect(() => {
    if (isVisible && listRef.current) {
      setTimeout(() => {
        try {
          listRef.current?.scrollToIndex({
            index: Math.max(0, initialIndex),
            animated: false,
          });
        } catch (e) {}
      }, 60);
    }
  }, [isVisible, initialIndex]);

  const onMomentumScrollEnd = (e: any) => {
    const ix = Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH);
    setIndex(ix);
  };

  const renderItem = ({ item }: ListRenderItemInfo<ImageItem>) => {
    return (
      <View style={styles.itemWrap}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  return (
    <ModalImage
      isVisible={isVisible}
      onCancel={onCancel}
      contentContainerStyle={styles.container}
    >
      <View style={styles.inner}>
        <FlatList
          ref={r => {
            listRef.current = r;
          }}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, i) =>
            item.id != null ? String(item.id) : String(i)
          }
          renderItem={renderItem}
          onMomentumScrollEnd={onMomentumScrollEnd}
          initialNumToRender={3}
          getItemLayout={(_, idx) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * idx,
            index: idx,
          })}
          initialScrollIndex={Math.max(0, initialIndex)}
        />

        <View style={styles.dotsRow} pointerEvents="none">
          {images.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index ? styles.dotActive : undefined]}
            />
          ))}
        </View>
      </View>
    </ModalImage>
  );
};

export default ModalShowImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    alignItems: 'center',
  },
  itemWrap: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  image: {
    width: SCREEN_WIDTH - 16,
    aspectRatio: 1 / 1.5,
    borderRadius: 48,
  },
  pagerRow: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  pagerText: {
    color: '#fff',
  },
  dotsRow: {
    position: 'absolute',
    bottom: 58,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: '#fff',
    borderRadius: 3,
  },
});

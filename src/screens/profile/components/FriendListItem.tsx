import CustomText from 'components/text/CustomText';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type Props = {
  name: string;
  distance?: string;
  age?: number;
  avatar?: string;
  onPress?: () => void;
};

const FriendListItem: React.FC<Props> = ({
  name,
  distance = '0.5km',
  age = 23,
  avatar,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: avatar || 'https://i.pravatar.cc/150?img=3' }}
        style={styles.avatar}
      />

      <View style={styles.content}>
        <CustomText fontStyleType="text-semibold" style={styles.name}>
          {name}
        </CustomText>
        <CustomText
          fontStyleType="text-regular"
          style={styles.meta}
          numberOfLines={1}
        >
          {distance} · {age} tuổi
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F6FB',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {},
  meta: {
    marginTop: 6,
    color: '#9AA6B2',
    fontSize: 13,
  },
});

export default FriendListItem;

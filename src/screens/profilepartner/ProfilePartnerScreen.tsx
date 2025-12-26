import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenContainer from 'components/ScreenContainer';
import ModalPopup from 'components/modal/ModalPopup';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import CustomText from 'components/text/CustomText';
import ImageIcon from 'components/image/ImageIcon';
import { Tabs } from 'react-native-collapsible-tab-view';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfoTab from 'screens/profile/components/ProfileInfoTab';
import ProfileAlbumTab from 'screens/profile/components/ProfileAlbumTab';
import ImageCropPicker from 'react-native-image-crop-picker';
import NavigationService from 'NavigationService';
import ProfileInfo from './components/ProfileInfo';
import ModalCenter from 'components/modal/ModalCenter';
import ModalShowImage from './components/ModalShowImage';
import ModalReport from './components/ModalReport';
const TAB_PADDING = 20;
const TAB_GAP = 12;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = (SCREEN_WIDTH - TAB_PADDING * 2 - TAB_GAP) / 2;

const DEFAULT_ALBUM_PHOTOS = [
  {
    id: 1,
    image: {
      uri: 'https://i.pinimg.com/736x/b8/fe/02/b8fe02df0f04563a9d08a9dc83d40686.jpg',
    },
    isDefault: false,
  },
  {
    id: 2,
    image: {
      uri: 'https://i.pinimg.com/1200x/8a/50/81/8a5081d45c646a9318ced80430bdbbc2.jpg',
    },
    isDefault: false,
  },
  { id: 3, image: require('assets/img_default_profile.png'), isDefault: true },
  { id: 4, image: require('assets/img_default_profile.png'), isDefault: true },
  { id: 5, image: require('assets/img_default_profile.png'), isDefault: true },
];

const SAMPLE_IMAGES = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80', // Ảnh chân dung nữ
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80', // Ảnh nghệ thuật
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80', // Ảnh mẫu thời trang
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', // Ảnh chân dung nam
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80', // Ảnh mẫu nữ ngồi
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80', // Ảnh cận mặt
  },
];

const user = {
  name: 'Nguyễn Thị Hà Quyên',
  age: 26,
  avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  matches: 144,
  liking: 144,
  liked: 120,
  bio: 'Heyyy! Tôi là 1 sinh viên đang theo học ngành lý marketing 26 tuổi. Cuộc sống của tôi là những dự án sáng tạo, những chuyến đi và những trải nghiệm đời thực. Tôi luôn tìm...',
  location: 'Sống tại Hà Nội',
};

type TabItemProps = {
  tabName: string;
  label: string;
  onPress: () => void;
  focusedTab: any;
};

const TabItem = (props: TabItemProps) => {
  const { tabName, label, onPress, focusedTab } = props;

  const activeTextStyle = useAnimatedStyle(() => {
    return {
      opacity: focusedTab.value === tabName ? 1 : 0,
    };
  });

  const inactiveTextStyle = useAnimatedStyle(() => {
    return {
      opacity: focusedTab.value === tabName ? 0 : 1,
    };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: focusedTab.value === tabName ? 1 : 0,
    };
  });

  return (
    <View style={styles.tabWrapper}>
      <TouchableOpacity
        style={styles.tab}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.tabBase}>
          <Animated.View style={activeTextStyle}>
            <CustomText
              fontStyleType="text-semibold"
              style={styles.tabTextActive}
            >
              {label}
            </CustomText>
          </Animated.View>
          <Animated.View style={[styles.textLayerAbsolute, inactiveTextStyle]}>
            <CustomText style={styles.tabText}>{label}</CustomText>
          </Animated.View>
        </View>
      </TouchableOpacity>

      <Animated.View style={[, indicatorStyle]}>
        <ImageIcon
          source={require('assets/ic_active_tab.png')}
          style={{ width: 72, height: 10 }}
        />
      </Animated.View>
    </View>
  );
};

const ProfilePartnerScreen = () => {
  const isPickingAlbumRef = useRef<Record<number, boolean>>({});
  const [albumPhotos, setAlbumPhotos] = useState(DEFAULT_ALBUM_PHOTOS);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleReport = () => {
    setShowReportModal(false);
  };

  const handleBlock = () => {
    setShowReportModal(false);
  };

  const handleCancelReport = () => {
    setShowReportModal(false);
  };

  const handlePickAlbumImage = async (photoId: number) => {
    const idx = albumPhotos.findIndex(p => p.id === photoId);
    const indexToOpen = idx >= 0 ? idx : 0;
    setViewerVisible(true);
    setViewerIndex(indexToOpen);
  };

  const renderTabBar = (props: any) => {
    const tabNames: string[] = props.tabNames || [];
    return (
      <View style={styles.tabsContainer}>
        {tabNames.map((name: string) => (
          <TabItem
            key={name}
            tabName={name}
            label={props.tabProps?.[name]?.label ?? name}
            onPress={() => props.onTabPress?.(name)}
            focusedTab={props.focusedTab}
          />
        ))}
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.sharedHeaderContainer} pointerEvents="box-none">
        <ProfileHeader
          coverImage={
            'https://i.pinimg.com/1200x/8a/50/81/8a5081d45c646a9318ced80430bdbbc2.jpg'
          }
          avatarUrl={user.avatar}
        />
        <ProfileInfo
          userName={user.name}
          isMatching={false}
          isSending={isSending}
          setIsSending={setIsSending}
          matches={user.matches}
          liking={user.liking}
          liked={user.liked}
          onEditProfile={() => {
            NavigationService.navigate('EditProfileScreen');
          }}
        />
      </View>
    );
  };

  return (
    <ScreenContainer
      title="Nguyễn Thị Hà Quyên"
      listButtonRight={[
        {
          source: require('assets/ic_alert_circle.png'),
          onPress: () => {
            setShowReportModal(true);
          },
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Tabs.Container
          renderHeader={renderHeader}
          renderTabBar={props => renderTabBar(props)}
        >
          <Tabs.Tab name="Thông tin">
            <Tabs.ScrollView
              style={styles.tabContent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              <ProfileInfoTab
                userName={user.name}
                age={user.age}
                bio={user.bio}
                location={user.location}
              />
            </Tabs.ScrollView>
          </Tabs.Tab>

          <Tabs.Tab name="Album" label="Album">
            <Tabs.ScrollView
              style={styles.tabContent}
              showsVerticalScrollIndicator={false}
            >
              <ProfileAlbumTab
                photos={albumPhotos}
                onPickImage={handlePickAlbumImage}
                isPartner={true}
              />
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
      </ScrollView>
      <ModalShowImage
        isVisible={viewerVisible}
        onCancel={() => setViewerVisible(false)}
        images={SAMPLE_IMAGES?.map(img => img.image)}
        initialIndex={viewerIndex}
      />
      <ModalReport
        isVisible={showReportModal}
        onCancel={() => setShowReportModal(false)}
        onReport={handleReport}
        onBlock={handleBlock}
      />
    </ScreenContainer>
  );
};

export default ProfilePartnerScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  sharedHeaderContainer: {
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  tabContent: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: TAB_PADDING,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  tab: {
    paddingHorizontal: 8,
  },
  tabBase: {
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabWrapper: {
    alignItems: 'center',
    marginRight: TAB_GAP,
  },

  tabTextActive: {
    color: '#0786FF',
  },

  tabText: {
    color: '#999',
  },

  textLayerAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

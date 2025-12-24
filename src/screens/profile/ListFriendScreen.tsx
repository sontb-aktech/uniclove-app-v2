import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import ScreenContainer from 'components/ScreenContainer';
import FriendListItem from './components/FriendListItem';
import ImageIcon from 'components/image/ImageIcon';
import useRouteParams from 'hooks/useRouteParams';
import CustomText from 'components/text/CustomText';

const DATA = [
  { id: '1', name: 'Lê Văn Quang', avatar: 'https://i.pravatar.cc/150?img=10' },
  { id: '2', name: 'Đào Dương', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '3', name: 'Lee Min Ho', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '4', name: 'Sơn Tùng MTP', avatar: 'https://i.pravatar.cc/150?img=13' },
  { id: '5', name: 'Quang Đặng', avatar: 'https://i.pravatar.cc/150?img=14' },
];

const ListFriendScreen = () => {
  const userName = 'Nguyễn Văn A';
  const params = useRouteParams('ListFriendScreen');
  const initialTab = params?.activeTabIndex ? params.activeTabIndex : 1;
  const [activeTab, setActiveTab] = useState<number>(initialTab);
  return (
    <ScreenContainer title={userName}>
      <View style={styles.container}>
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab(1)}
          >
            <View style={{ alignItems: 'center' }}>
              <FriendLabel active={activeTab === 1} label="Đang thích" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab(2)}
          >
            <View style={{ alignItems: 'center' }}>
              <FriendLabel active={activeTab === 2} label="Lượt thích" />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <FriendListItem name={item.name} avatar={item.avatar} />
          )}
          ItemSeparatorComponent={() => null}
        />
      </View>
    </ScreenContainer>
  );
};

const FriendLabel: React.FC<{ active?: boolean; label: string }> = ({
  active,
  label,
}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <CustomText
        fontStyleType={active ? 'text-semibold' : 'text-regular'}
        style={{ color: active ? '#0786FF' : '#999' }}
      >
        {label}
      </CustomText>
      {active ? (
        <ImageIcon
          source={require('assets/ic_active_tab.png')}
          style={{ width: 72, height: 10 }}
        />
      ) : null}
    </View>
  );
};

export default ListFriendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  tabButton: {
    paddingHorizontal: 20,
  },
});

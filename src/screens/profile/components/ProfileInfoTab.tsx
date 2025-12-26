import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import CustomText from 'components/text/CustomText';
import { IconFeather } from 'libs';
import GroupSelector from 'components/selected/GroupSelector';
import { LIST_HOBBIES } from 'screens/survey/SurveyStep3Screen';

type ProfileInfoTabProps = {
  userName: string;
  age: number;
  bio: string;
  location: string;
};

const ProfileInfoTab = (props: ProfileInfoTabProps) => {
  const { userName, age, bio, location } = props;
  return (
    <View style={styles.contentSection}>
      <View style={styles.section}>
        <CustomText fontStyleType="title-semibold" style={styles.sectionTitle}>
          Giới thiệu
        </CustomText>
        <CustomText style={styles.bioText}>
          {userName} <Text style={{ color: '#007AFF' }}>♂</Text> {age} tuổi
        </CustomText>
        <CustomText
          fontStyleType="text-regular"
          style={styles.bioDescription}
          numberOfLines={3}
        >
          {bio}
        </CustomText>
        <Pressable>
          <CustomText fontStyleType="text-regular" style={styles.readMore}>
            Xem thêm
          </CustomText>
        </Pressable>
      </View>

      <View style={styles.section}>
        <CustomText fontStyleType="title-semibold" style={styles.sectionTitle}>
          Địa điểm
        </CustomText>
        <View style={styles.locationRow}>
          <IconFeather name="map-pin" size={16} color={'#969696'} />
          <CustomText fontStyleType="text-regular" style={styles.locationText}>
            {location}
          </CustomText>
        </View>
      </View>
      <View style={styles.section}>
        <CustomText fontStyleType="title-semibold" style={styles.sectionTitle}>
          Sở thích
        </CustomText>
        <GroupSelector listItems={LIST_HOBBIES} />
      </View>
    </View>
  );
};

export default ProfileInfoTab;

const styles = StyleSheet.create({
  contentSection: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 16,
  },
  bioText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#969696',
  },
  bioDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#969696',
  },
  readMore: {
    color: '#0786FF',
    fontSize: 14,
    marginTop: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    color: '#969696',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const MY_PROFILE = {
  name: '바톤',
  age: 28,
  job: '개발자',
  bio: '좋은 사람들과 좋은 시간을 보내는 걸 좋아합니다.',
  photos: ['https://picsum.photos/seed/me/400/400'],
  tags: ['커피', '코딩', '러닝'],
  compatibilityAnswered: 2,
  totalQuestions: 5,
};

const SettingRow: React.FC<{ label: string; value?: string; onPress: () => void }> = ({
  label,
  value,
  onPress,
}) => (
  <TouchableOpacity style={styles.settingRow} onPress={onPress}>
    <Text style={styles.settingLabel}>{label}</Text>
    <View style={styles.settingRight}>
      {value && <Text style={styles.settingValue}>{value}</Text>}
      <Text style={styles.settingArrow}>›</Text>
    </View>
  </TouchableOpacity>
);

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const { signOut } = useAuth();
  const [photo, setPhoto] = useState(MY_PROFILE.photos[0]);
  const progress = MY_PROFILE.compatibilityAnswered / MY_PROFILE.totalQuestions;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진 라이브러리 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSignOut = () => {
    Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>내 프로필</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>편집</Text>
          </TouchableOpacity>
        </View>

        {/* Profile photo + basic info */}
        <View style={styles.profileSection}>
          <View style={styles.photoWrapper}>
            <Image source={{ uri: photo }} style={styles.photo} />
            <TouchableOpacity style={styles.photoAddBtn} onPress={pickImage}>
              <Text style={styles.photoAddIcon}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{MY_PROFILE.name}, {MY_PROFILE.age}</Text>
          <Text style={styles.profileJob}>{MY_PROFILE.job}</Text>
          <Text style={styles.profileBio}>{MY_PROFILE.bio}</Text>
          <View style={styles.tags}>
            {MY_PROFILE.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Values progress */}
        <View style={styles.valuesSection}>
          <Text style={styles.valuesSectionTitle}>가치관 매칭 프로필</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {MY_PROFILE.compatibilityAnswered} / {MY_PROFILE.totalQuestions} 완료
          </Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigation.navigate('ValuesQuiz')}
          >
            <Text style={styles.continueBtnText}>이어서 답하기 →</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>설정</Text>
          <View style={styles.settingsCard}>
            <SettingRow
              label="나이 범위"
              value="24 – 35세"
              onPress={() => navigation.navigate('Settings')}
            />
            <View style={styles.rowDivider} />
            <SettingRow
              label="거리 범위"
              value="10km 이내"
              onPress={() => navigation.navigate('Settings')}
            />
            <View style={styles.rowDivider} />
            <SettingRow
              label="알림 설정"
              onPress={() => navigation.navigate('Settings')}
            />
            <View style={styles.rowDivider} />
            <SettingRow
              label="프라이버시"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>

          <View style={[styles.settingsCard, { marginTop: Spacing.md }]}>
            <SettingRow
              label="ONYX 프리미엄"
              value="무료 플랜"
              onPress={() => navigation.navigate('Settings')}
            />
            <View style={styles.rowDivider} />
            <SettingRow
              label="문의하기"
              onPress={() => navigation.navigate('Settings')}
            />
            <View style={styles.rowDivider} />
            <TouchableOpacity style={styles.settingRow} onPress={handleSignOut}>
              <Text style={[styles.settingLabel, { color: Colors.error }]}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography['2xl'],
    fontWeight: Typography.bold,
    letterSpacing: Typography.tight,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  editBtnText: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  photoWrapper: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  photoAddBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoAddIcon: {
    color: '#000',
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
  },
  profileName: {
    color: Colors.textPrimary,
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    marginBottom: 4,
  },
  profileJob: {
    color: Colors.accentLight,
    fontSize: Typography.sm,
    marginBottom: Spacing.sm,
  },
  profileBio: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  tags: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  tag: {
    backgroundColor: 'rgba(201, 168, 76, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.3)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
  },
  tagText: {
    color: Colors.accentLight,
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
  },
  valuesSection: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.15)',
    marginBottom: Spacing.lg,
  },
  valuesSectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.elevated,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
  },
  progressText: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    marginBottom: Spacing.md,
  },
  continueBtn: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  continueBtnText: {
    color: '#000',
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },
  settingsSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  settingsSectionTitle: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    letterSpacing: Typography.wider,
    marginBottom: Spacing.sm,
  },
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  settingLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  settingValue: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
  },
  settingArrow: {
    color: Colors.textMuted,
    fontSize: Typography.lg,
  },
  rowDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingRow: React.FC<{
  label: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  onPress?: () => void;
  destructive?: boolean;
}> = ({ label, value, toggle, toggleValue, onToggle, onPress, destructive }) => (
  <TouchableOpacity style={styles.row} onPress={onPress} disabled={toggle}>
    <Text style={[styles.rowLabel, destructive && styles.destructive]}>{label}</Text>
    <View style={styles.rowRight}>
      {toggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: Colors.elevated, true: Colors.accent }}
          thumbColor={toggleValue ? '#000' : Colors.textMuted}
        />
      ) : (
        <>
          {value && <Text style={styles.rowValue}>{value}</Text>}
          <Text style={styles.rowArrow}>›</Text>
        </>
      )}
    </View>
  </TouchableOpacity>
);

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [matchNotify, setMatchNotify] = React.useState(true);
  const [messageNotify, setMessageNotify] = React.useState(true);
  const [profileVisible, setProfileVisible] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>알림</Text>
        <View style={styles.card}>
          <SettingRow label="푸시 알림" toggle toggleValue={pushEnabled} onToggle={setPushEnabled} />
          <View style={styles.divider} />
          <SettingRow label="새 매칭 알림" toggle toggleValue={matchNotify} onToggle={setMatchNotify} />
          <View style={styles.divider} />
          <SettingRow label="메시지 알림" toggle toggleValue={messageNotify} onToggle={setMessageNotify} />
        </View>

        <Text style={styles.sectionLabel}>공개 범위</Text>
        <View style={styles.card}>
          <SettingRow label="프로필 공개" toggle toggleValue={profileVisible} onToggle={setProfileVisible} />
          <View style={styles.divider} />
          <SettingRow label="나이 범위" value="24 – 35세" />
          <View style={styles.divider} />
          <SettingRow label="거리 범위" value="10km 이내" />
        </View>

        <Text style={styles.sectionLabel}>계정</Text>
        <View style={styles.card}>
          <SettingRow label="차단 목록" value="0명" />
          <View style={styles.divider} />
          <SettingRow label="문의하기" />
          <View style={styles.divider} />
          <SettingRow label="개인정보 처리방침" />
          <View style={styles.divider} />
          <SettingRow label="서비스 이용약관" />
        </View>

        <Text style={styles.sectionLabel}>위험 구역</Text>
        <View style={styles.card}>
          <SettingRow label="계정 탈퇴" destructive />
        </View>

        <Text style={styles.version}>ONYX v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
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
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: Colors.accent,
    fontSize: Typography.xl,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    letterSpacing: Typography.wider,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
  },
  rowLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
  },
  destructive: {
    color: Colors.error,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rowValue: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
  },
  rowArrow: {
    color: Colors.textMuted,
    fontSize: Typography.xl,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  version: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
});

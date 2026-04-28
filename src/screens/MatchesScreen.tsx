import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { Match, RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    user: {
      id: '1',
      name: '지윤',
      age: 27,
      job: 'UX 디자이너',
      bio: '주말엔 카페 투어, 평일엔 전시회.',
      photos: ['https://picsum.photos/seed/jiyun/200/200'],
      tags: ['카페', '전시'],
      distance: 1.2,
      compatibilityScore: 94,
      isVerified: true,
    },
    matchedAt: new Date(Date.now() - 1000 * 60 * 30),
    lastMessage: '안녕하세요! 카드 보고 연락드려요 😊',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 10),
    hasUnread: true,
    iceBreakers: [
      { id: 'i1', question: '주말 아침에 뭘 하시나요?', category: 'lifestyle' },
      { id: 'i2', question: '최근에 본 전시 있으세요?', category: 'fun' },
    ],
  },
  {
    id: 'm2',
    user: {
      id: '2',
      name: '서연',
      age: 29,
      job: '마케터',
      bio: '새벽 산책, 재즈, 와인 한 잔.',
      photos: ['https://picsum.photos/seed/seoyeon/200/200'],
      tags: ['와인', '재즈'],
      distance: 2.8,
      compatibilityScore: 89,
      isVerified: true,
    },
    matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    lastMessage: '어제 재즈바에 다녀왔어요 🎷',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    hasUnread: false,
    iceBreakers: [
      { id: 'i3', question: '와인이나 위스키 선호하세요?', category: 'lifestyle' },
    ],
  },
  {
    id: 'm3',
    user: {
      id: '4',
      name: '하은',
      age: 28,
      job: '작가',
      bio: '글 쓰는 사람.',
      photos: ['https://picsum.photos/seed/haeun/200/200'],
      tags: ['글쓰기', '책'],
      distance: 4.1,
      compatibilityScore: 82,
      isVerified: true,
    },
    matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    lastMessage: undefined,
    lastMessageAt: undefined,
    hasUnread: false,
    iceBreakers: [
      { id: 'i4', question: '요즘 읽고 있는 책이 있나요?', category: 'fun' },
      { id: 'i5', question: '글쓰기는 언제 시작하셨어요?', category: 'values' },
    ],
  },
  {
    id: 'm4',
    user: {
      id: '6',
      name: '채원',
      age: 30,
      job: '변호사',
      bio: '일 열심히 하고 쉴 때는 제대로.',
      photos: ['https://picsum.photos/seed/chaewon/200/200'],
      tags: ['맛집', '와인'],
      distance: 1.7,
      compatibilityScore: 76,
      isVerified: true,
    },
    matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    lastMessage: '혹시 이번 주말 시간 있으세요? 😄',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 45),
    hasUnread: true,
    iceBreakers: [
      { id: 'i6', question: '좋아하는 음식 장르가 있나요?', category: 'lifestyle' },
    ],
  },
];

function formatTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  if (diff < 1000 * 60) return '방금';
  if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))}분 전`;
  if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / (1000 * 60 * 60))}시간 전`;
  return `${Math.floor(diff / (1000 * 60 * 60 * 24))}일 전`;
}

const IceBreakerCard: React.FC<{ question: string }> = ({ question }) => (
  <TouchableOpacity style={styles.iceBreakerChip}>
    <Text style={styles.iceBreakerIcon}>💬</Text>
    <Text style={styles.iceBreakerText} numberOfLines={1}>{question}</Text>
  </TouchableOpacity>
);

const MatchItem: React.FC<{ match: Match; onPress: () => void }> = ({
  match,
  onPress,
}) => (
  <TouchableOpacity style={styles.matchItem} onPress={onPress}>
    <View style={styles.avatarContainer}>
      <Image source={{ uri: match.user.photos[0] }} style={styles.avatar} />
      {match.hasUnread && <View style={styles.unreadDot} />}
    </View>
    <View style={styles.matchInfo}>
      <View style={styles.matchHeader}>
        <Text style={styles.matchName}>{match.user.name}</Text>
        <Text style={styles.matchTime}>
          {match.lastMessageAt ? formatTime(match.lastMessageAt) : formatTime(match.matchedAt)}
        </Text>
      </View>
      <Text style={styles.matchJob}>{match.user.job} · {match.user.compatibilityScore}% 매칭</Text>
      {match.lastMessage ? (
        <Text
          style={[styles.lastMessage, match.hasUnread && styles.lastMessageUnread]}
          numberOfLines={1}
        >
          {match.lastMessage}
        </Text>
      ) : (
        <View style={styles.iceBreakerRow}>
          {match.iceBreakers.slice(0, 1).map((ib) => (
            <IceBreakerCard key={ib.id} question={ib.question} />
          ))}
        </View>
      )}
    </View>
  </TouchableOpacity>
);

export const MatchesScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const newMatches = MOCK_MATCHES.filter((m) => !m.lastMessage);
  const chatMatches = MOCK_MATCHES.filter((m) => m.lastMessage);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>매칭</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{MOCK_MATCHES.length}</Text>
        </View>
      </View>

      <FlatList
        data={chatMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchItem
            match={item}
            onPress={() => navigation.navigate('Chat', { match: item })}
          />
        )}
        ListHeaderComponent={() =>
          newMatches.length > 0 ? (
            <View style={styles.newMatchSection}>
              <Text style={styles.newMatchTitle}>새 매칭 ✨</Text>
              {newMatches.map((m) => (
                <MatchItem
                  key={m.id}
                  match={m}
                  onPress={() => navigation.navigate('Chat', { match: m })}
                />
              ))}
              <View style={styles.divider} />
              <Text style={styles.chatTitle}>대화 중</Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography['2xl'],
    fontWeight: Typography.bold,
    letterSpacing: Typography.tight,
  },
  headerBadge: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadgeText: {
    color: '#000',
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
  },
  listContent: {
    paddingBottom: Spacing['2xl'],
  },
  newMatchSection: {
    paddingHorizontal: Spacing.lg,
  },
  newMatchTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    marginBottom: Spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  chatTitle: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    letterSpacing: Typography.wide,
    marginBottom: Spacing.sm,
  },
  matchItem: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.card,
  },
  unreadDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  matchInfo: {
    flex: 1,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  matchName: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
  },
  matchTime: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
  },
  matchJob: {
    color: Colors.accentLight,
    fontSize: Typography.xs,
    marginBottom: 4,
  },
  lastMessage: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
  },
  lastMessageUnread: {
    color: Colors.textPrimary,
    fontWeight: Typography.medium,
  },
  iceBreakerRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  iceBreakerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 168, 76, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.25)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    gap: 4,
    flex: 1,
  },
  iceBreakerIcon: {
    fontSize: Typography.xs,
  },
  iceBreakerText: {
    color: Colors.accentLight,
    fontSize: Typography.xs,
    flex: 1,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { ProfileCard } from '../components/ProfileCard';
import { UserProfile, RootStackParamList } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Nav = NativeStackNavigationProp<RootStackParamList>;

const MOCK_USERS: UserProfile[] = [
  {
    id: '1',
    name: '지윤',
    age: 27,
    job: 'UX 디자이너',
    bio: '주말엔 카페 투어, 평일엔 전시회. 조용한 곳에서 커피 마시며 이야기 나눌 사람 찾아요.',
    photos: ['https://picsum.photos/seed/jiyun/400/600'],
    tags: ['카페', '전시', '미니멀리즘'],
    distance: 1.2,
    compatibilityScore: 94,
    isVerified: true,
  },
  {
    id: '2',
    name: '서연',
    age: 29,
    job: '마케터',
    bio: '좋아하는 것: 새벽 산책, 재즈, 와인 한 잔. 진지한 대화를 좋아합니다.',
    photos: ['https://picsum.photos/seed/seoyeon/400/600'],
    tags: ['와인', '재즈', '독서'],
    distance: 2.8,
    compatibilityScore: 89,
    isVerified: true,
  },
  {
    id: '3',
    name: '민아',
    age: 26,
    job: '개발자',
    bio: '코딩하다 지치면 러닝. 같이 건강한 루틴 만들어갈 사람 찾아요.',
    photos: ['https://picsum.photos/seed/mina/400/600'],
    tags: ['러닝', '헬스', '코딩'],
    distance: 0.9,
    compatibilityScore: 85,
    isVerified: false,
  },
  {
    id: '4',
    name: '하은',
    age: 28,
    job: '작가',
    bio: '글 쓰는 사람. 좋은 문장 하나로 하루를 버팁니다.',
    photos: ['https://picsum.photos/seed/haeun/400/600'],
    tags: ['글쓰기', '책', '산책'],
    distance: 4.1,
    compatibilityScore: 82,
    isVerified: true,
  },
  {
    id: '5',
    name: '유진',
    age: 25,
    job: '포토그래퍼',
    bio: '렌즈로 세상을 봅니다. 같이 산 타고 사진 찍을 사람 구해요.',
    photos: ['https://picsum.photos/seed/yujin/400/600'],
    tags: ['사진', '등산', '여행'],
    distance: 3.3,
    compatibilityScore: 78,
    isVerified: false,
  },
  {
    id: '6',
    name: '채원',
    age: 30,
    job: '변호사',
    bio: '일 열심히 하고 쉴 때는 제대로 쉬는 편. 맛있는 거 먹으러 다니는 걸 좋아해요.',
    photos: ['https://picsum.photos/seed/chaewon/400/600'],
    tags: ['맛집', '와인', '영화'],
    distance: 1.7,
    compatibilityScore: 76,
    isVerified: true,
  },
  {
    id: '7',
    name: '나연',
    age: 27,
    job: '플로리스트',
    bio: '꽃과 함께하는 하루하루. 소소한 것들에서 행복을 찾는 사람이에요.',
    photos: ['https://picsum.photos/seed/nayeon/400/600'],
    tags: ['꽃', '요리', '피크닉'],
    distance: 2.1,
    compatibilityScore: 74,
    isVerified: true,
  },
  {
    id: '8',
    name: '소희',
    age: 24,
    job: '대학원생',
    bio: '심리학 공부 중. 사람의 마음이 왜 움직이는지 알고 싶어요.',
    photos: ['https://picsum.photos/seed/sohee/400/600'],
    tags: ['심리', '독서', '음악'],
    distance: 5.0,
    compatibilityScore: 71,
    isVerified: false,
  },
  {
    id: '9',
    name: '예나',
    age: 31,
    job: '건축가',
    bio: '공간을 설계하는 사람. 아름다운 도시를 함께 걷고 싶어요.',
    photos: ['https://picsum.photos/seed/yena/400/600'],
    tags: ['건축', '여행', '아트'],
    distance: 3.8,
    compatibilityScore: 69,
    isVerified: true,
  },
  {
    id: '10',
    name: '다은',
    age: 26,
    job: '바리스타',
    bio: '커피 한 잔으로 하루를 시작해요. 좋은 원두처럼 깊은 사람이 되고 싶어요.',
    photos: ['https://picsum.photos/seed/daeun/400/600'],
    tags: ['커피', '음악', '고양이'],
    distance: 0.6,
    compatibilityScore: 67,
    isVerified: true,
  },
  {
    id: '11',
    name: '리아',
    age: 28,
    job: '피아니스트',
    bio: '음악으로 말하는 사람. 조용한 카페에서 피아노 소리 들으며 이야기 나눠요.',
    photos: ['https://picsum.photos/seed/ria/400/600'],
    tags: ['클래식', '피아노', '와인'],
    distance: 4.5,
    compatibilityScore: 65,
    isVerified: false,
  },
  {
    id: '12',
    name: '수빈',
    age: 29,
    job: '셰프',
    bio: '맛있는 음식이 세상을 더 좋게 만든다고 믿어요. 같이 먹고 또 먹어요.',
    photos: ['https://picsum.photos/seed/subin/400/600'],
    tags: ['요리', '맛집', '와인'],
    distance: 2.4,
    compatibilityScore: 63,
    isVerified: true,
  },
];

const NOW = new Date();
const NOON = new Date(NOW);
NOON.setHours(12, 0, 0, 0);
const isAfterNoon = NOW >= NOON;

function getTimeUntilNoon(): string {
  const tomorrow = new Date(NOW);
  tomorrow.setDate(tomorrow.getDate() + (isAfterNoon ? 1 : 0));
  tomorrow.setHours(12, 0, 0, 0);
  const diff = tomorrow.getTime() - NOW.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}시간 ${minutes}분`;
}

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [featuredUser] = useState(MOCK_USERS[0]);
  const [gridUsers] = useState(MOCK_USERS.slice(1));

  const handleLike = (userId: string) => {
    console.log('Liked:', userId);
  };

  const handleSkip = (userId: string) => {
    console.log('Skipped:', userId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>ONYX</Text>
            <Text style={styles.headerSub}>오늘의 큐레이션</Text>
          </View>
          <View style={styles.refreshBadge}>
            <Text style={styles.refreshIcon}>◎</Text>
            <Text style={styles.refreshTime}>{getTimeUntilNoon()} 후 갱신</Text>
          </View>
        </View>

        {/* Today's pick — featured card */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.accentDot} />
            <Text style={styles.sectionTitle}>오늘의 ONYX</Text>
          </View>
          <Text style={styles.sectionSub}>AI가 선택한 최고 매칭</Text>
        </View>

        <View style={styles.featuredContainer}>
          <ProfileCard
            user={featuredUser}
            onPress={() => navigation.navigate('UserDetail', { user: featuredUser })}
            onLike={() => handleLike(featuredUser.id)}
            onSkip={() => handleSkip(featuredUser.id)}
          />
        </View>

        {/* Daily 12 grid */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.accentDot} />
            <Text style={styles.sectionTitle}>오늘의 12명</Text>
          </View>
          <Text style={styles.sectionSub}>정오에 새로 바뀌어요</Text>
        </View>

        <View style={styles.grid}>
          {gridUsers.map((user) => (
            <ProfileCard
              key={user.id}
              user={user}
              onPress={() => navigation.navigate('UserDetail', { user })}
              onLike={() => handleLike(user.id)}
              onSkip={() => handleSkip(user.id)}
              isCompact
            />
          ))}
        </View>

        {/* Values card prompt */}
        <TouchableOpacity
          style={styles.valuesCard}
          onPress={() => navigation.navigate('ValuesQuiz')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#1A1A1A', '#222216']}
            style={styles.valuesGradient}
          >
            <Text style={styles.valuesTitle}>💡 가치관 매칭 정확도 높이기</Text>
            <Text style={styles.valuesDesc}>
              3가지 상황 질문에 답하면{'\n'}AI가 더 잘 맞는 사람을 찾아줘요
            </Text>
            <View style={styles.valuesBtn}>
              <Text style={styles.valuesBtnText}>질문 답하기 →</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing['2xl'],
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
    color: Colors.accent,
    fontSize: Typography['2xl'],
    fontWeight: Typography.bold,
    letterSpacing: 4,
  },
  headerSub: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    letterSpacing: Typography.wide,
    marginTop: 2,
  },
  refreshBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    gap: 4,
  },
  refreshIcon: {
    color: Colors.accentLight,
    fontSize: Typography.xs,
  },
  refreshTime: {
    color: Colors.textSecondary,
    fontSize: Typography.xs,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 4,
  },
  accentDot: {
    width: 6,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    letterSpacing: Typography.tight,
  },
  sectionSub: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    marginLeft: 10,
  },
  featuredContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  valuesCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.2)',
  },
  valuesGradient: {
    padding: Spacing.lg,
  },
  valuesTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    marginBottom: Spacing.sm,
  },
  valuesDesc: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  valuesBtn: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  valuesBtnText: {
    color: '#000',
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },
});

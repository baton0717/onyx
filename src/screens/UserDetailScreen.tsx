import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { RootStackParamList } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'UserDetail'>;

export const UserDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = route.params;
  const [liked, setLiked] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const handleLike = () => {
    setLiked(true);
    setTimeout(() => navigation.goBack(), 600);
  };

  const handleSkip = () => {
    setSkipped(true);
    setTimeout(() => navigation.goBack(), 400);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.photoContainer}>
          <Image source={{ uri: user.photos[0] }} style={styles.photo} resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.gradient}
          />
          <View style={styles.compatBadge}>
            <Text style={styles.compatText}>{user.compatibilityScore}%</Text>
            <Text style={styles.compatLabel}>매칭</Text>
          </View>
          {user.isVerified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓</Text>
            </View>
          )}
          <View style={styles.photoInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.age}>{user.age}</Text>
            </View>
            <Text style={styles.job}>{user.job}</Text>
            <Text style={styles.distance}>{user.distance}km 거리</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.bioSection}>
            <Text style={styles.sectionLabel}>소개</Text>
            <Text style={styles.bioText}>{user.bio}</Text>
          </View>

          <View style={styles.tagsSection}>
            <Text style={styles.sectionLabel}>관심사</Text>
            <View style={styles.tags}>
              {user.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.compatSection}>
            <Text style={styles.sectionLabel}>가치관 궁합</Text>
            <View style={styles.compatBar}>
              <View style={[styles.compatFill, { width: `${user.compatibilityScore}%` }]} />
            </View>
            <Text style={styles.compatDescription}>
              AI가 분석한 가치관 호환도 {user.compatibilityScore}%
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.skipBtn, skipped && styles.actionPressed]}
          onPress={handleSkip}
          activeOpacity={0.8}
        >
          <Text style={styles.skipIcon}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.likeBtn, liked && styles.likeBtnPressed]}
          onPress={handleLike}
          activeOpacity={0.8}
        >
          <Text style={styles.likeIcon}>{liked ? '♥' : '♡'}</Text>
          <Text style={styles.likeBtnText}>{liked ? '좋아요!' : '좋아요'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn}>
          <Text style={styles.skipIcon}>⋯</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backBtn: {
    position: 'absolute',
    top: 56,
    left: Spacing.lg,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: Colors.textPrimary,
    fontSize: Typography.xl,
  },
  photoContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 1.25,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  compatBadge: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    alignItems: 'center',
  },
  compatText: {
    color: '#000',
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },
  compatLabel: {
    color: '#000',
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
  },
  verifiedBadge: {
    position: 'absolute',
    top: Spacing.lg,
    left: 64,
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#000',
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },
  photoInfo: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 32,
    fontWeight: Typography.bold,
    letterSpacing: Typography.tight,
  },
  age: {
    color: Colors.textSecondary,
    fontSize: Typography.xl,
  },
  job: {
    color: Colors.accentLight,
    fontSize: Typography.md,
    fontWeight: Typography.medium,
    marginTop: 4,
  },
  distance: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
    marginTop: 4,
  },
  body: {
    padding: Spacing.lg,
    gap: Spacing.xl,
  },
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    letterSpacing: Typography.wider,
    marginBottom: Spacing.sm,
  },
  bioSection: {},
  bioText: {
    color: Colors.textSecondary,
    fontSize: Typography.md,
    lineHeight: 24,
  },
  tagsSection: {},
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  tag: {
    backgroundColor: 'rgba(201, 168, 76, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.3)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  tagText: {
    color: Colors.accentLight,
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
  },
  compatSection: {},
  compatBar: {
    height: 6,
    backgroundColor: Colors.elevated,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  compatFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
  },
  compatDescription: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  skipBtn: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.elevated,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPressed: {
    opacity: 0.5,
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flex: 1,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
  },
  likeBtnPressed: {
    backgroundColor: '#E8C060',
  },
  likeIcon: {
    color: '#000',
    fontSize: Typography.xl,
  },
  likeBtnText: {
    color: '#000',
    fontSize: Typography.md,
    fontWeight: Typography.bold,
  },
  skipIcon: {
    color: Colors.textSecondary,
    fontSize: Typography.xl,
  },
});

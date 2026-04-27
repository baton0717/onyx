import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { UserProfile } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - Spacing.lg * 2;

interface Props {
  user: UserProfile;
  onPress: () => void;
  onLike: () => void;
  onSkip: () => void;
  isCompact?: boolean;
}

export const ProfileCard: React.FC<Props> = ({
  user,
  onPress,
  onLike,
  onSkip,
  isCompact = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isCompact && styles.compactCard]}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <Image
        source={{ uri: user.photos[0] }}
        style={styles.photo}
        resizeMode="cover"
      />
      <LinearGradient
        colors={Colors.gradientBlack as [string, string, string]}
        style={styles.gradient}
      />

      {/* Compatibility badge */}
      <View style={styles.compatBadge}>
        <Text style={styles.compatText}>{user.compatibilityScore}%</Text>
        <Text style={styles.compatLabel}>매칭</Text>
      </View>

      {/* Verified badge */}
      {user.isVerified && (
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>✓</Text>
        </View>
      )}

      {/* Bottom info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.age}>{user.age}</Text>
        </View>
        <Text style={styles.job}>{user.job}</Text>
        {!isCompact && (
          <>
            <Text style={styles.bio} numberOfLines={2}>{user.bio}</Text>
            <View style={styles.tags}>
              {user.tags.slice(0, 3).map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.distance}>{user.distance}km</Text>
          </>
        )}
      </View>

      {/* Action buttons */}
      {!isCompact && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.skipBtn} onPress={onSkip}>
            <Text style={styles.skipIcon}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeBtn} onPress={onLike}>
            <Text style={styles.likeIcon}>♥</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.35,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    marginBottom: Spacing.md,
  },
  compactCard: {
    width: (SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md) / 2,
    height: ((SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md) / 2) * 1.4,
  },
  photo: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  compatBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
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
    top: Spacing.md,
    left: Spacing.md,
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
  info: {
    position: 'absolute',
    bottom: 80,
    left: Spacing.md,
    right: Spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: Typography['2xl'],
    fontWeight: Typography.bold,
    letterSpacing: Typography.tight,
  },
  age: {
    color: Colors.textSecondary,
    fontSize: Typography.lg,
    fontWeight: Typography.regular,
  },
  job: {
    color: Colors.accentLight,
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    marginTop: 2,
    marginBottom: Spacing.sm,
  },
  bio: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  tag: {
    backgroundColor: 'rgba(201, 168, 76, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.3)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  tagText: {
    color: Colors.accentLight,
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
  },
  distance: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
  },
  actions: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
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
  skipIcon: {
    color: Colors.textSecondary,
    fontSize: Typography.xl,
  },
  likeBtn: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.like,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeIcon: {
    color: Colors.textPrimary,
    fontSize: Typography.xl,
  },
});

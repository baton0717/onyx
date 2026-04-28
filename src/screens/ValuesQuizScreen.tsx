import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ValuesQuiz'>;

interface Question {
  id: string;
  text: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: '주말 오후, 이상적인 데이트 장소는?',
    options: ['조용한 카페에서 대화', '활기찬 맛집 탐방', '자연 속 산책이나 등산', '집에서 영화나 게임'],
  },
  {
    id: 'q2',
    text: '연인과의 관계에서 가장 중요한 것은?',
    options: ['서로의 시간과 공간 존중', '함께하는 시간의 양', '깊은 대화와 감정 공유', '공통된 취미와 활동'],
  },
  {
    id: 'q3',
    text: '5년 후 나의 모습은?',
    options: ['커리어에 집중하며 성장 중', '안정적인 관계와 가정', '여행과 새로운 경험 추구', '자기계발과 취미 생활'],
  },
];

export const ValuesQuizScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const currentQuestion = QUESTIONS[step];
  const totalSteps = QUESTIONS.length;
  const progress = (step + (answers[currentQuestion?.id] !== undefined ? 1 : 0)) / totalSteps;

  const selectOption = (qId: string, index: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: index }));
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else navigation.goBack();
  };

  if (done) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
        <View style={styles.doneContainer}>
          <Text style={styles.doneEmoji}>✦</Text>
          <Text style={styles.doneTitle}>완료!</Text>
          <Text style={styles.doneDesc}>
            가치관 분석이 완료되었습니다.{'\n'}AI가 더 잘 맞는 사람을 찾아드릴게요.
          </Text>
          <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.doneBtnText}>홈으로 돌아가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>{step + 1} / {totalSteps}</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>가치관 질문</Text>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        <View style={styles.options}>
          {currentQuestion.options.map((option, index) => {
            const selected = answers[currentQuestion.id] === index;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.option, selected && styles.optionSelected]}
                onPress={() => selectOption(currentQuestion.id, index)}
                activeOpacity={0.8}
              >
                <View style={[styles.optionCircle, selected && styles.optionCircleSelected]}>
                  {selected && <View style={styles.optionDot} />}
                </View>
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextBtn, answers[currentQuestion.id] === undefined && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={answers[currentQuestion.id] === undefined}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>
            {step < totalSteps - 1 ? '다음 →' : '완료'}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: Spacing.md,
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
  stepText: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.elevated,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
  },
  body: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  sectionLabel: {
    color: Colors.accentLight,
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    letterSpacing: Typography.wider,
    marginBottom: Spacing.md,
  },
  questionText: {
    color: Colors.textPrimary,
    fontSize: Typography.xl,
    fontWeight: Typography.semibold,
    lineHeight: 32,
    marginBottom: Spacing.xl,
  },
  options: {
    gap: Spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  optionSelected: {
    borderColor: Colors.accent,
    backgroundColor: 'rgba(201, 168, 76, 0.08)',
  },
  optionCircle: {
    width: 22,
    height: 22,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCircleSelected: {
    borderColor: Colors.accent,
  },
  optionDot: {
    width: 10,
    height: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
  },
  optionText: {
    color: Colors.textSecondary,
    fontSize: Typography.md,
    flex: 1,
  },
  optionTextSelected: {
    color: Colors.textPrimary,
    fontWeight: Typography.medium,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  nextBtn: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.xl,
    paddingVertical: 18,
    alignItems: 'center',
  },
  nextBtnDisabled: {
    opacity: 0.4,
  },
  nextBtnText: {
    color: '#000',
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    letterSpacing: 0.5,
  },
  doneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  doneEmoji: {
    color: Colors.accent,
    fontSize: 56,
    marginBottom: Spacing.lg,
  },
  doneTitle: {
    color: Colors.textPrimary,
    fontSize: 32,
    fontWeight: Typography.bold,
    marginBottom: Spacing.md,
    letterSpacing: Typography.tight,
  },
  doneDesc: {
    color: Colors.textSecondary,
    fontSize: Typography.md,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  doneBtn: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  doneBtnText: {
    color: '#000',
    fontSize: Typography.md,
    fontWeight: Typography.bold,
  },
});

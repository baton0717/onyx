import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

type VerificationMethod = 'pass' | 'sms';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'PhoneVerification'>;
};

export const PhoneVerificationScreen: React.FC<Props> = ({ navigation: _navigation }) => {
  const { setVerified } = useAuth();
  const [method, setMethod] = useState<VerificationMethod>('pass');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const spinValue = useRef(new Animated.Value(0)).current;

  const startPassAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleSendCode = async () => {
    if (!phone || phone.length < 10) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setCodeSent(true);
  };

  const handlePassStart = () => {
    setPassLoading(true);
    startPassAnimation();
  };

  const handleVerify = async () => {
    setVerifyLoading(true);
    await new Promise((r) => setTimeout(r, 3000));
    setVerifyLoading(false);
    setVerified(true);
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.badge}>IDENTITY VERIFIED</Text>
          <Text style={styles.title}>본인인증</Text>
          <Text style={styles.subtitle}>ONYX는 인증된 사람들만의 공간입니다</Text>
          <Text style={styles.description}>
            실명 인증을 통해 안전하고 신뢰할 수 있는{'\n'}연결을 보장합니다
          </Text>
        </View>

        <Text style={styles.sectionTitle}>인증 방법 선택</Text>

        <View style={styles.methodCards}>
          <TouchableOpacity
            style={[styles.methodCard, method === 'pass' && styles.methodCardSelected]}
            onPress={() => setMethod('pass')}
            activeOpacity={0.85}
          >
            <View style={styles.methodCardInner}>
              <View style={[styles.methodIconWrap, method === 'pass' && styles.methodIconWrapSelected]}>
                <Text style={styles.methodIcon}>🔐</Text>
              </View>
              <View style={styles.methodTextWrap}>
                <Text style={[styles.methodName, method === 'pass' && styles.methodNameSelected]}>
                  PASS 앱 인증
                </Text>
                <Text style={styles.methodDesc}>SKT · KT · LGU+ 통신사 인증</Text>
              </View>
              <View style={[styles.radioOuter, method === 'pass' && styles.radioOuterSelected]}>
                {method === 'pass' && <View style={styles.radioInner} />}
              </View>
            </View>
            {method === 'pass' && <View style={styles.selectedBorder} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.methodCard, method === 'sms' && styles.methodCardSelected]}
            onPress={() => setMethod('sms')}
            activeOpacity={0.85}
          >
            <View style={styles.methodCardInner}>
              <View style={[styles.methodIconWrap, method === 'sms' && styles.methodIconWrapSelected]}>
                <Text style={styles.methodIcon}>📱</Text>
              </View>
              <View style={styles.methodTextWrap}>
                <Text style={[styles.methodName, method === 'sms' && styles.methodNameSelected]}>
                  휴대폰 인증
                </Text>
                <Text style={styles.methodDesc}>문자(SMS) 인증번호 입력</Text>
              </View>
              <View style={[styles.radioOuter, method === 'sms' && styles.radioOuterSelected]}>
                {method === 'sms' && <View style={styles.radioInner} />}
              </View>
            </View>
            {method === 'sms' && <View style={styles.selectedBorder} />}
          </TouchableOpacity>
        </View>

        {method === 'pass' ? (
          <View style={styles.passSection}>
            {passLoading ? (
              <View style={styles.passLoadingWrap}>
                <Animated.View style={[styles.passSpinner, { transform: [{ rotate: spin }] }]}>
                  <Text style={styles.passSpinnerText}>◈</Text>
                </Animated.View>
                <Text style={styles.passLoadingTitle}>PASS 앱 실행 중</Text>
                <Text style={styles.passLoadingDesc}>
                  PASS 앱에서 본인인증을 완료해주세요
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.passStartButton}
                onPress={handlePassStart}
                activeOpacity={0.85}
              >
                <Text style={styles.passStartIcon}>🔐</Text>
                <Text style={styles.passStartText}>PASS 앱으로 인증하기</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.smsSection}>
            <View style={styles.phoneRow}>
              <TextInput
                style={styles.phoneInput}
                placeholder="010-0000-0000"
                placeholderTextColor="#555555"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={13}
              />
              <TouchableOpacity
                style={[styles.sendCodeButton, (!phone || phone.length < 10) && styles.sendCodeDisabled]}
                onPress={handleSendCode}
                disabled={loading || !phone || phone.length < 10}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color="#0A0A0A" size="small" />
                ) : (
                  <Text style={styles.sendCodeText}>{codeSent ? '재전송' : '인증번호 받기'}</Text>
                )}
              </TouchableOpacity>
            </View>

            {codeSent && (
              <View style={styles.codeSection}>
                <Text style={styles.codeSentMsg}>
                  {phone}으로 인증번호를 발송했습니다
                </Text>
                <TextInput
                  style={styles.codeInput}
                  placeholder="인증번호 6자리"
                  placeholderTextColor="#555555"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
            )}
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.securityNote}>
            <Text style={styles.securityIcon}>🛡️</Text>
            <Text style={styles.securityText}>
              인증 정보는 암호화되어 안전하게 보호됩니다
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.verifyButton, verifyLoading && styles.verifyButtonLoading]}
            onPress={handleVerify}
            disabled={verifyLoading}
            activeOpacity={0.85}
          >
            {verifyLoading ? (
              <View style={styles.verifyingWrap}>
                <ActivityIndicator color="#0A0A0A" />
                <Text style={styles.verifyingText}>인증 중...</Text>
              </View>
            ) : (
              <Text style={styles.verifyButtonText}>인증 완료</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 36,
  },
  badge: {
    fontSize: 10,
    color: '#C9A84C',
    letterSpacing: 3,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#C9A84C',
    marginBottom: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#666666',
    letterSpacing: 1,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  methodCards: {
    gap: 12,
    marginBottom: 28,
  },
  methodCard: {
    backgroundColor: '#111111',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    overflow: 'hidden',
  },
  methodCardSelected: {
    borderColor: '#C9A84C',
  },
  methodCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  methodIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodIconWrapSelected: {
    backgroundColor: 'rgba(201, 168, 76, 0.15)',
  },
  methodIcon: {
    fontSize: 22,
  },
  methodTextWrap: {
    flex: 1,
  },
  methodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#AAAAAA',
    marginBottom: 3,
  },
  methodNameSelected: {
    color: '#FFFFFF',
  },
  methodDesc: {
    fontSize: 12,
    color: '#555555',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#C9A84C',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C9A84C',
  },
  selectedBorder: {
    height: 2,
    backgroundColor: '#C9A84C',
    opacity: 0.4,
  },
  passSection: {
    marginBottom: 24,
  },
  passStartButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C9A84C',
    paddingVertical: 24,
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  passStartIcon: {
    fontSize: 22,
  },
  passStartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C9A84C',
  },
  passLoadingWrap: {
    backgroundColor: '#111111',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingVertical: 36,
    alignItems: 'center',
    gap: 12,
  },
  passSpinner: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passSpinnerText: {
    fontSize: 40,
    color: '#C9A84C',
  },
  passLoadingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  passLoadingDesc: {
    fontSize: 13,
    color: '#888888',
  },
  smsSection: {
    marginBottom: 24,
    gap: 12,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 10,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#FFFFFF',
  },
  sendCodeButton: {
    backgroundColor: '#C9A84C',
    borderRadius: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 90,
  },
  sendCodeDisabled: {
    opacity: 0.4,
  },
  sendCodeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A0A0A',
  },
  codeSection: {
    gap: 10,
  },
  codeSentMsg: {
    fontSize: 12,
    color: '#C9A84C',
    marginLeft: 4,
  },
  codeInput: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#C9A84C',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 22,
    color: '#FFFFFF',
    letterSpacing: 8,
    textAlign: 'center',
  },
  footer: {
    gap: 16,
    marginTop: 8,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#111111',
    borderRadius: 10,
    padding: 12,
  },
  securityIcon: {
    fontSize: 16,
  },
  securityText: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
  },
  verifyButton: {
    backgroundColor: '#C9A84C',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  verifyButtonLoading: {
    opacity: 0.8,
  },
  verifyingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  verifyingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A0A0A',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: 0.5,
  },
});

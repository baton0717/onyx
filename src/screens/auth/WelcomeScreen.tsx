import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
};

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />

    <View style={styles.logoSection}>
      <Text style={styles.logo}>ONYX</Text>
      <View style={styles.divider} />
      <Text style={styles.slogan}>verified connections only</Text>
    </View>

    <View style={styles.taglineSection}>
      <Text style={styles.tagline}>진짜 사람,{'\n'}진짜 연결.</Text>
      <Text style={styles.description}>
        신원 인증된 사람들만의 프리미엄 데이팅 공간
      </Text>
    </View>

    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('SignUp')}
        activeOpacity={0.85}
      >
        <Text style={styles.primaryButtonText}>시작하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.85}
      >
        <Text style={styles.secondaryButtonText}>이미 계정이 있으신가요?</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 48,
  },
  logoSection: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: '800',
    color: '#C9A84C',
    letterSpacing: 12,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: '#C9A84C',
    marginVertical: 12,
    opacity: 0.6,
  },
  slogan: {
    fontSize: 11,
    color: '#888888',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  taglineSection: {
    flex: 1,
    justifyContent: 'center',
  },
  tagline: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 46,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 22,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#C9A84C',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: 1,
  },
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  secondaryButtonText: {
    fontSize: 14,
    color: '#888888',
  },
});

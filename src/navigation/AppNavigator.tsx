import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MatchesScreen } from '../screens/MatchesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { UserDetailScreen } from '../screens/UserDetailScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ValuesQuizScreen } from '../screens/ValuesQuizScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { PhoneVerificationScreen } from '../screens/auth/PhoneVerificationScreen';
import { useAuth } from '../contexts/AuthContext';
import { Colors, Typography, Spacing } from '../theme';
import { RootTabParamList, AuthStackParamList, RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const TabIcon: React.FC<{ focused: boolean; label: string; icon: string }> = ({
  focused,
  label,
  icon,
}) => (
  <View style={iconStyles.wrapper}>
    <Text style={[iconStyles.icon, focused && iconStyles.iconFocused]}>{icon}</Text>
    <Text style={[iconStyles.label, focused && iconStyles.labelFocused]}>{label}</Text>
  </View>
);

const iconStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingTop: Spacing.xs,
  },
  icon: {
    fontSize: 22,
    color: Colors.textMuted,
  },
  iconFocused: {
    color: Colors.accent,
  },
  label: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  labelFocused: {
    color: Colors.accent,
    fontWeight: Typography.semibold,
  },
});

const MainTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: Colors.surface,
        borderTopColor: Colors.border,
        borderTopWidth: 1,
        height: 80,
        paddingBottom: Spacing.md,
      },
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} label="홈" icon="◈" />
        ),
      }}
    />
    <Tab.Screen
      name="Matches"
      component={MatchesScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} label="매칭" icon="♡" />
        ),
        tabBarBadge: 4,
        tabBarBadgeStyle: {
          backgroundColor: Colors.accent,
          color: '#000',
          fontSize: Typography.xs,
        },
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} label="나" icon="○" />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppContent: React.FC = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="Main" component={MainTabs} />
    <RootStack.Screen
      name="UserDetail"
      component={UserDetailScreen}
      options={{ animation: 'slide_from_right' }}
    />
    <RootStack.Screen
      name="Chat"
      component={ChatScreen}
      options={{ animation: 'slide_from_right' }}
    />
    <RootStack.Screen
      name="ValuesQuiz"
      component={ValuesQuizScreen}
      options={{ animation: 'slide_from_bottom' }}
    />
    <RootStack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ animation: 'slide_from_right' }}
    />
  </RootStack.Navigator>
);

const AuthNavigator: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
  </AuthStack.Navigator>
);

export const AppNavigator: React.FC = () => {
  const { session, loading, isVerified } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0A0A0A', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#C9A84C" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {session && isVerified ? <AppContent /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

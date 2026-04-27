import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { MatchesScreen } from '../screens/MatchesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Colors, Typography, Spacing } from '../theme';
import { RootTabParamList } from '../types';

const Tab = createBottomTabNavigator<RootTabParamList>();

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

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
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
          tabBarBadge: 2,
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
  </NavigationContainer>
);

/**
 * App Navigator
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme';
import { useAuth } from '../hooks/useAuth';
import { Icon } from '../components';

// Auth Screens
import { LoginScreen } from '../screens/LoginScreen';
import { MFAScreen } from '../screens/MFAScreen';

// Main Screens
import { HomeScreen } from '../screens/HomeScreen';
import { PartSearchScreen } from '../screens/PartSearchScreen';
import { PartDetailsScreen } from '../screens/PartDetailsScreen';
import { AnalogFinderScreen } from '../screens/AnalogFinderScreen';
import { RepairListScreen } from '../screens/RepairListScreen';
import { RepairDetailsScreen } from '../screens/RepairDetailsScreen';
import { NewRepairScreen } from '../screens/NewRepairScreen';
import { FleetListScreen } from '../screens/FleetListScreen';
import { VehicleDetailsScreen } from '../screens/VehicleDetailsScreen';
import { AIAdvisorScreen } from '../screens/AIAdvisorScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { BarcodeScannerScreen } from '../screens/BarcodeScannerScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="MFA" component={MFAScreen} />
  </Stack.Navigator>
);

// Tab Navigator
const TabNavigator = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('nav.home'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={PartSearchScreen}
        options={{
          tabBarLabel: t('nav.search'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Repairs"
        component={RepairListScreen}
        options={{
          tabBarLabel: t('nav.repairs'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="tool" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Fleet"
        component={FleetListScreen}
        options={{
          tabBarLabel: t('nav.fleet'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="truck" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          tabBarLabel: t('nav.profile'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main Stack
const MainStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PartDetails" component={PartDetailsScreen} />
      <Stack.Screen name="AnalogFinder" component={AnalogFinderScreen} />
      <Stack.Screen name="RepairDetails" component={RepairDetailsScreen} />
      <Stack.Screen name="NewRepair" component={NewRepairScreen} />
      <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
      <Stack.Screen name="AIAdvisor" component={AIAdvisorScreen} />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScannerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Root Navigator
export const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    return null; // Or splash screen
  }

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: colors.border,
          notification: colors.error,
        },
      }}
    >
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;

/**
 * Navigation Types
 */

import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  MFA: { email: string };
};

// Tab Stack
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Repairs: undefined;
  Fleet: undefined;
  Profile: undefined;
};

// Main Stack
export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  PartDetails: { partId: string };
  AnalogFinder: { partNumber: string };
  RepairDetails: { repairId: string };
  NewRepair: { vehicleId?: string };
  VehicleDetails: { vehicleId: string };
  AIAdvisor: { initialQuery?: string };
  BarcodeScanner: undefined;
  VoiceSearch: undefined;
};

// Root
export type RootStackParamList = AuthStackParamList & MainStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

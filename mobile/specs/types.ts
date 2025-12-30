/**
 * TypeScript Types
 */

// Part
export interface Part {
  id: string;
  part_number: string;
  brand: string;
  description: string;
  description_uk?: string;
  category: string;
  domain: string;
  nsn?: string;
  safety_critical: boolean;
  image_url?: string;
  specifications?: Record<string, any>;
  repair_coverage?: RepairCoverage;
}

export interface RepairCoverage {
  r1_field: boolean;
  r2_base: boolean;
  r3_depot: boolean;
  r4_factory: boolean;
}

export interface Analog {
  part: Part;
  confidence: number;
  type: 'oem' | 'oem_reman' | 'aftermarket_certified' | 'aftermarket';
  source: string;
  differences?: string[];
}

// Search
export interface SearchFilters {
  brand?: string[];
  category?: string[];
  platform?: string[];
  repair_level?: ('R1' | 'R2' | 'R3' | 'R4')[];
  safety_critical?: boolean;
}

export interface SearchResult {
  part: Part;
  score: number;
  highlights?: Record<string, string[]>;
}

// Repair
export type RepairStatus = 'waiting' | 'active' | 'on_hold' | 'completed' | 'cancelled';
export type RepairLevel = 'R1' | 'R2' | 'R3' | 'R4';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

export interface Repair {
  id: string;
  ticket_number: string;
  vehicle_id: string;
  issue: string;
  level: RepairLevel;
  status: RepairStatus;
  priority: Priority;
  workshop: string;
  assigned_to?: string;
  progress: number;
  created_at: string;
  started_at?: string;
  estimated_completion?: string;
}

// Vehicle
export type VehicleStatus = 'operational' | 'in_repair' | 'pending' | 'critical';
export type PlatformType = 'LTV' | 'MTV' | 'HTV' | 'APC' | 'IFV' | 'MBT';

export interface Vehicle {
  id: string;
  registration: string;
  platform: string;
  platform_type: PlatformType;
  status: VehicleStatus;
  unit: string;
  location: string;
  mileage_km?: number;
}

// AI
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Citation[];
  actions?: SuggestedAction[];
}

export interface Citation {
  index: number;
  source: string;
  title: string;
}

export interface SuggestedAction {
  id: string;
  label: string;
  action: string;
  params?: Record<string, any>;
}

// User
export type UserRole = 'operator' | 'technician' | 'logistics' | 'manager' | 'executive';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: string[];
  organization: {
    id: string;
    name: string;
  };
}

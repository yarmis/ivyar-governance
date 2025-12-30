/**
 * Test Data Factories
 */

import { DatabaseConnection } from '../../src/database';

let counter = 0;

export function createTestPart(overrides = {}) {
  counter++;
  return {
    part_number: `TEST-PART-${counter}-${Date.now()}`,
    brand: 'TestBrand',
    description: 'Test part description',
    category: 'test',
    domain: 'automotive',
    safety_critical: false,
    ...overrides,
  };
}

export function createTestVehicle(overrides = {}) {
  counter++;
  return {
    id: `TEST-VEH-${counter}`,
    platform: 'test-platform',
    platform_type: 'LTV',
    status: 'operational',
    unit: 'test-unit',
    location: 'test-location',
    ...overrides,
  };
}

export function createTestRepair(overrides = {}) {
  counter++;
  return {
    vehicle_id: `TEST-VEH-${counter}`,
    issue: 'Test repair issue',
    level: 'R2',
    priority: 'medium',
    ...overrides,
  };
}

export async function cleanupTestData(db: DatabaseConnection) {
  await db.query("DELETE FROM parts WHERE part_number LIKE 'TEST-%'");
  await db.query("DELETE FROM repairs WHERE vehicle_id LIKE 'TEST-%'");
  await db.query("DELETE FROM vehicles WHERE id LIKE 'TEST-%'");
}

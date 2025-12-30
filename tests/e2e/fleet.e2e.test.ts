/**
 * IVYAR Fleet API E2E Tests
 */

import { test, expect, APIRequestContext } from '@playwright/test';

const API_URL = process.env.API_URL || 'http://localhost:8080';

let apiContext: APIRequestContext;
let authToken: string;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: { 'Content-Type': 'application/json' },
  });

  const response = await apiContext.post('/v1/auth/token', {
    data: {
      api_key: process.env.TEST_API_KEY,
      api_secret: process.env.TEST_API_SECRET,
    },
  });
  const data = await response.json();
  authToken = data.access_token;
});

test.afterAll(async () => {
  await apiContext.dispose();
});

// ============================================================================
// VEHICLE LISTING
// ============================================================================
test.describe('Vehicle Listing', () => {
  test('should list all vehicles', async () => {
    const response = await apiContext.get('/v1/fleet/vehicles', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBeTruthy();
    expect(data.summary).toBeDefined();
    expect(data.summary.total).toBeGreaterThan(0);
  });

  test('should include fleet summary', async () => {
    const response = await apiContext.get('/v1/fleet/vehicles', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    expect(data.summary).toHaveProperty('total');
    expect(data.summary).toHaveProperty('operational');
    expect(data.summary).toHaveProperty('in_repair');
    expect(data.summary).toHaveProperty('operational_rate');
  });

  test('should filter by status', async () => {
    const response = await apiContext.get('/v1/fleet/vehicles?status=operational', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    data.data.forEach((vehicle: any) => {
      expect(vehicle.status).toBe('operational');
    });
  });

  test('should filter by platform', async () => {
    const response = await apiContext.get('/v1/fleet/vehicles?platform=hilux', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    data.data.forEach((vehicle: any) => {
      expect(vehicle.platform.toLowerCase()).toContain('hilux');
    });
  });

  test('should filter by unit', async () => {
    const response = await apiContext.get('/v1/fleet/vehicles?unit=72-brigade', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    data.data.forEach((vehicle: any) => {
      expect(vehicle.unit).toBe('72-brigade');
    });
  });
});

// ============================================================================
// VEHICLE DETAILS
// ============================================================================
test.describe('Vehicle Details', () => {
  test('should get vehicle by ID', async () => {
    // First get a vehicle ID
    const listResponse = await apiContext.get('/v1/fleet/vehicles?limit=1', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const listData = await listResponse.json();
    const vehicleId = listData.data[0].id;

    const response = await apiContext.get(`/v1/fleet/vehicles/${vehicleId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.id).toBe(vehicleId);
    expect(data.data).toHaveProperty('platform');
    expect(data.data).toHaveProperty('status');
    expect(data.data).toHaveProperty('mileage_km');
  });

  test('should return 404 for unknown vehicle', async () => {
    const response = await apiContext.get('/v1/fleet/vehicles/UNKNOWN-VEH-999', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.status()).toBe(404);
  });
});

// ============================================================================
// VEHICLE HISTORY
// ============================================================================
test.describe('Vehicle History', () => {
  test('should get vehicle repair history', async () => {
    const response = await apiContext.get('/v1/fleet/vehicles/HIL-234/history', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBeTruthy();
  });

  test('should limit history results', async () => {
    const response = await apiContext.get('/v1/fleet/vehicles/HIL-234/history?limit=5', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    expect(data.data.length).toBeLessThanOrEqual(5);
  });

  test('should include repair details in history', async () => {
    const response = await apiContext.get('/v1/fleet/vehicles/HIL-234/history', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    if (data.data.length > 0) {
      expect(data.data[0]).toHaveProperty('repair_id');
      expect(data.data[0]).toHaveProperty('date');
      expect(data.data[0]).toHaveProperty('issue');
      expect(data.data[0]).toHaveProperty('level');
    }
  });
});

// ============================================================================
// FLEET READINESS
// ============================================================================
test.describe('Fleet Readiness', () => {
  test('should get overall readiness metrics', async () => {
    const response = await apiContext.get('/v1/fleet/readiness', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.overall_rate).toBeDefined();
    expect(data.data.target_rate).toBeDefined();
    expect(typeof data.data.overall_rate).toBe('number');
    expect(data.data.overall_rate).toBeGreaterThanOrEqual(0);
    expect(data.data.overall_rate).toBeLessThanOrEqual(100);
  });

  test('should group by platform', async () => {
    const response = await apiContext.get('/v1/fleet/readiness?group_by=platform', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    expect(data.data.by_group).toBeDefined();
    expect(Array.isArray(data.data.by_group)).toBeTruthy();
    
    if (data.data.by_group.length > 0) {
      expect(data.data.by_group[0]).toHaveProperty('name');
      expect(data.data.by_group[0]).toHaveProperty('total');
      expect(data.data.by_group[0]).toHaveProperty('operational');
      expect(data.data.by_group[0]).toHaveProperty('rate');
    }
  });

  test('should group by unit', async () => {
    const response = await apiContext.get('/v1/fleet/readiness?group_by=unit', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    expect(data.data.by_group).toBeDefined();
  });

  test('should include trend indicator', async () => {
    const response = await apiContext.get('/v1/fleet/readiness', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    expect(data.data.trend).toBeDefined();
    expect(['up', 'down', 'stable']).toContain(data.data.trend);
  });
});

// ============================================================================
// VEHICLE LOCATIONS
// ============================================================================
test.describe('Vehicle Locations', () => {
  test('should get all vehicle locations', async () => {
    const response = await apiContext.get('/v1/fleet/locations', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBeTruthy();
  });

  test('should include coordinates', async () => {
    const response = await apiContext.get('/v1/fleet/locations', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    if (data.data.length > 0) {
      expect(data.data[0]).toHaveProperty('vehicle_id');
      expect(data.data[0]).toHaveProperty('coordinates');
      expect(data.data[0].coordinates).toHaveProperty('lat');
      expect(data.data[0].coordinates).toHaveProperty('lng');
    }
  });

  test('should filter by bounding box', async () => {
    const response = await apiContext.get(
      '/v1/fleet/locations?bbox=48.0,30.0,52.0,40.0',
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    data.data.forEach((location: any) => {
      expect(location.coordinates.lat).toBeGreaterThanOrEqual(48.0);
      expect(location.coordinates.lat).toBeLessThanOrEqual(52.0);
      expect(location.coordinates.lng).toBeGreaterThanOrEqual(30.0);
      expect(location.coordinates.lng).toBeLessThanOrEqual(40.0);
    });
  });
});

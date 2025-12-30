/**
 * IVYAR Repair API E2E Tests
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
// REPAIR WORKFLOW TESTS
// ============================================================================
test.describe('Repair Workflow', () => {
  let repairId: string;
  const vehicleId = 'TEST-VEH-001';

  test('should create repair ticket', async () => {
    const response = await apiContext.post('/v1/repairs', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        vehicle_id: vehicleId,
        issue: 'Brake pad replacement - squeaking noise',
        level: 'R2',
        priority: 'medium',
        notes: 'Customer reported squeaking during braking',
      },
    });

    expect(response.status()).toBe(201);
    const data = await response.json();

    expect(data.data.id).toBeDefined();
    expect(data.data.ticket_number).toBeDefined();
    expect(data.data.status).toBe('waiting');
    expect(data.data.vehicle_id).toBe(vehicleId);
    repairId = data.data.id;
  });

  test('should get repair details', async () => {
    const response = await apiContext.get(`/v1/repairs/${repairId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.id).toBe(repairId);
    expect(data.data.issue).toContain('Brake pad');
  });

  test('should start repair (update status to active)', async () => {
    const response = await apiContext.patch(`/v1/repairs/${repairId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        status: 'active',
        progress: 0,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.status).toBe('active');
    expect(data.data.started_at).toBeDefined();
  });

  test('should update repair progress', async () => {
    const response = await apiContext.patch(`/v1/repairs/${repairId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        progress: 50,
        notes: 'Old brake pads removed, cleaning rotors',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.progress).toBe(50);
  });

  test('should escalate repair priority', async () => {
    const response = await apiContext.post(`/v1/repairs/${repairId}/escalate`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        reason: 'Found additional damage to rotors',
        new_priority: 'high',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.priority).toBe('high');
  });

  test('should complete repair', async () => {
    const response = await apiContext.post(`/v1/repairs/${repairId}/complete`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        notes: 'Replaced brake pads and resurfaced rotors. Test drive completed.',
        parts_used: [
          { part_id: '04465-0K380', quantity: 1 },
        ],
        labor_hours: 2.5,
        technician_notes: 'Recommend checking rear brakes in 3 months',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.status).toBe('completed');
  });

  test('should not allow updates on completed repair', async () => {
    const response = await apiContext.patch(`/v1/repairs/${repairId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { progress: 80 },
    });

    expect(response.status()).toBe(400);
  });
});

// ============================================================================
// REPAIR LISTING AND FILTERING
// ============================================================================
test.describe('Repair Listing', () => {
  test('should list all repairs', async () => {
    const response = await apiContext.get('/v1/repairs', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBeTruthy();
    expect(data.pagination).toBeDefined();
  });

  test('should filter by status', async () => {
    const response = await apiContext.get('/v1/repairs?status=active', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    data.data.forEach((repair: any) => {
      expect(repair.status).toBe('active');
    });
  });

  test('should filter by repair level', async () => {
    const response = await apiContext.get('/v1/repairs?level=R2', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    data.data.forEach((repair: any) => {
      expect(repair.level).toBe('R2');
    });
  });

  test('should filter by priority', async () => {
    const response = await apiContext.get('/v1/repairs?priority=critical', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    data.data.forEach((repair: any) => {
      expect(repair.priority).toBe('critical');
    });
  });

  test('should filter by vehicle', async () => {
    const response = await apiContext.get('/v1/repairs?vehicle_id=TEST-VEH-001', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    data.data.forEach((repair: any) => {
      expect(repair.vehicle_id).toBe('TEST-VEH-001');
    });
  });
});

// ============================================================================
// REPAIR RECOMMENDATIONS
// ============================================================================
test.describe('Repair Recommendations', () => {
  test('should get recommendation for minor damage', async () => {
    const response = await apiContext.post('/v1/repairs/recommendations', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        vehicle_id: 'HIL-234',
        issue: 'Oil change required',
        damage_level: 'minor',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.recommended_level).toBe('R1');
    expect(data.data.estimated_time).toBeDefined();
    expect(data.data.required_parts).toBeDefined();
  });

  test('should get recommendation for moderate damage', async () => {
    const response = await apiContext.post('/v1/repairs/recommendations', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        vehicle_id: 'HIL-234',
        issue: 'Brake pad replacement',
        symptoms: ['squeaking noise', 'reduced braking'],
        damage_level: 'moderate',
      },
    });

    const data = await response.json();

    expect(['R1', 'R2']).toContain(data.data.recommended_level);
    expect(data.data.required_parts.length).toBeGreaterThan(0);
  });

  test('should get recommendation for critical damage', async () => {
    const response = await apiContext.post('/v1/repairs/recommendations', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        vehicle_id: 'HTV-012',
        issue: 'Transmission failure',
        symptoms: ['grinding noise', 'no power transfer', 'fluid leak'],
        damage_level: 'critical',
        context: {
          location: 'field',
          urgency: 'emergency',
        },
      },
    });

    const data = await response.json();

    expect(['R3', 'R4']).toContain(data.data.recommended_level);
    expect(data.data.safety_warnings).toBeDefined();
    expect(data.data.safety_warnings.length).toBeGreaterThan(0);
  });

  test('should include parts availability', async () => {
    const response = await apiContext.post('/v1/repairs/recommendations', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        vehicle_id: 'HIL-234',
        issue: 'Brake pad replacement',
        damage_level: 'moderate',
      },
    });

    const data = await response.json();

    data.data.required_parts.forEach((part: any) => {
      expect(part).toHaveProperty('available');
    });
  });
});

// ============================================================================
// REPAIR PROCEDURES
// ============================================================================
test.describe('Repair Procedures', () => {
  test('should get repair procedure', async () => {
    const response = await apiContext.get('/v1/repairs/procedures/brake-pad-replacement-hilux', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.title).toBeDefined();
    expect(data.data.steps).toBeDefined();
    expect(Array.isArray(data.data.steps)).toBeTruthy();
    expect(data.data.required_tools).toBeDefined();
    expect(data.data.safety_precautions).toBeDefined();
  });

  test('should get procedure in Ukrainian', async () => {
    const response = await apiContext.get(
      '/v1/repairs/procedures/brake-pad-replacement-hilux?language=uk',
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    const data = await response.json();

    // Should contain Ukrainian characters
    expect(data.data.title).toMatch(/[а-яА-ЯіїєґІЇЄҐ]/);
  });

  test('should return 404 for unknown procedure', async () => {
    const response = await apiContext.get('/v1/repairs/procedures/unknown-procedure', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.status()).toBe(404);
  });
});

// ============================================================================
// VALIDATION TESTS
// ============================================================================
test.describe('Repair Validation', () => {
  test('should require vehicle_id', async () => {
    const response = await apiContext.post('/v1/repairs', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        issue: 'Test issue',
        level: 'R2',
      },
    });

    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error.code).toBe('VALIDATION_ERROR');
  });

  test('should validate repair level', async () => {
    const response = await apiContext.post('/v1/repairs', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        vehicle_id: 'TEST-001',
        issue: 'Test issue',
        level: 'R5', // Invalid
      },
    });

    expect(response.status()).toBe(400);
  });

  test('should validate priority', async () => {
    const response = await apiContext.post('/v1/repairs', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        vehicle_id: 'TEST-001',
        issue: 'Test issue',
        level: 'R2',
        priority: 'invalid', // Invalid
      },
    });

    expect(response.status()).toBe(400);
  });
});

/**
 * IVYAR Catalog API E2E Tests
 * 
 * Tests complete user flows for catalog operations:
 * - Part search
 * - Part CRUD
 * - Analog finding
 * - Cross-reference
 * - Fitment verification
 */

import { test, expect, APIRequestContext } from '@playwright/test';

const API_URL = process.env.API_URL || 'http://localhost:8080';

let apiContext: APIRequestContext;
let authToken: string;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });

  // Get auth token
  const response = await apiContext.post('/v1/auth/token', {
    data: {
      api_key: process.env.TEST_API_KEY,
      api_secret: process.env.TEST_API_SECRET,
    },
  });
  
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  authToken = data.access_token;
});

test.afterAll(async () => {
  await apiContext.dispose();
});

// ============================================================================
// PART SEARCH TESTS
// ============================================================================
test.describe('Part Search', () => {
  test('should search parts by keyword', async () => {
    const response = await apiContext.post('/v1/catalog/search', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'brake pads Toyota',
        limit: 10,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBeTruthy();
    expect(data.data.length).toBeGreaterThan(0);
    expect(data.data[0].part).toHaveProperty('part_number');
    expect(data.data[0].part).toHaveProperty('brand');
    expect(data.data[0].part).toHaveProperty('description');
    expect(data.data[0]).toHaveProperty('score');
  });

  test('should search with semantic mode', async () => {
    const response = await apiContext.post('/v1/catalog/search', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'what stops the wheels on a pickup truck',
        mode: 'semantic',
        limit: 10,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.length).toBeGreaterThan(0);
    // Semantic search should find brake-related parts
    const hasBrakeRelated = data.data.some(
      (r: any) => r.part.category === 'brakes' || 
                  r.part.description.toLowerCase().includes('brake')
    );
    expect(hasBrakeRelated).toBeTruthy();
  });

  test('should filter by category', async () => {
    const response = await apiContext.post('/v1/catalog/search', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'filter',
        filters: { category: ['filters'] },
        limit: 20,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    data.data.forEach((result: any) => {
      expect(result.part.category).toBe('filters');
    });
  });

  test('should filter by multiple brands', async () => {
    const response = await apiContext.post('/v1/catalog/search', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'oil',
        filters: { brand: ['Toyota', 'Bosch'] },
        limit: 20,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    data.data.forEach((result: any) => {
      expect(['Toyota', 'Bosch']).toContain(result.part.brand);
    });
  });

  test('should filter by repair level', async () => {
    const response = await apiContext.post('/v1/catalog/search', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'brake',
        filters: { repair_level: ['R1', 'R2'] },
        limit: 20,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.length).toBeGreaterThan(0);
  });

  test('should return facets', async () => {
    const response = await apiContext.post('/v1/catalog/search', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { query: 'oil' },
    });

    const data = await response.json();

    expect(data.facets).toBeDefined();
    expect(data.facets).toHaveProperty('brand');
    expect(data.facets).toHaveProperty('category');
    expect(Array.isArray(data.facets.brand)).toBeTruthy();
  });

  test('should return pagination info', async () => {
    const response = await apiContext.post('/v1/catalog/search', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'filter',
        limit: 5,
        offset: 0,
      },
    });

    const data = await response.json();

    expect(data.pagination).toBeDefined();
    expect(data.pagination.limit).toBe(5);
    expect(data.pagination.total).toBeGreaterThan(0);
  });

  test('should handle empty results', async () => {
    const response = await apiContext.post('/v1/catalog/search', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { query: 'xyznonexistentpart123' },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data).toEqual([]);
    expect(data.pagination.total).toBe(0);
  });

  test('should validate query length', async () => {
    const response = await apiContext.post('/v1/catalog/search', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { query: 'a' }, // Too short
    });

    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error.code).toBe('VALIDATION_ERROR');
  });
});

// ============================================================================
// PART CRUD TESTS
// ============================================================================
test.describe('Part CRUD', () => {
  let createdPartId: string;
  const testPartNumber = `TEST-${Date.now()}`;

  test('should create a new part', async () => {
    const response = await apiContext.post('/v1/catalog/parts', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        part_number: testPartNumber,
        brand: 'TestBrand',
        description: 'Test part for E2E testing',
        description_uk: 'Тестова запчастина',
        category: 'test',
        domain: 'automotive',
        specifications: {
          weight_kg: 1.5,
          dimensions: '10x10x5',
        },
        safety_critical: false,
      },
    });

    expect(response.status()).toBe(201);
    const data = await response.json();

    expect(data.data.id).toBeDefined();
    expect(data.data.part_number).toBe(testPartNumber);
    expect(data.data.brand).toBe('TestBrand');
    createdPartId = data.data.id;
  });

  test('should get created part by ID', async () => {
    const response = await apiContext.get(`/v1/catalog/parts/${createdPartId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.part_number).toBe(testPartNumber);
    expect(data.data.description_uk).toBe('Тестова запчастина');
  });

  test('should get part by part number', async () => {
    const response = await apiContext.get(`/v1/catalog/parts/${testPartNumber}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.id).toBe(createdPartId);
  });

  test('should get part with includes', async () => {
    const response = await apiContext.get(
      `/v1/catalog/parts/${createdPartId}?include=fitment,repair_coverage`,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data).toHaveProperty('fitment');
    expect(data.data).toHaveProperty('repair_coverage');
  });

  test('should update part', async () => {
    const response = await apiContext.patch(`/v1/catalog/parts/${createdPartId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        description: 'Updated test part description',
        safety_critical: true,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.description).toBe('Updated test part description');
    expect(data.data.safety_critical).toBe(true);
  });

  test('should prevent duplicate part number', async () => {
    const response = await apiContext.post('/v1/catalog/parts', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        part_number: testPartNumber, // Already exists
        brand: 'AnotherBrand',
        description: 'Duplicate part',
        category: 'test',
      },
    });

    expect(response.status()).toBe(409);
  });

  test('should delete part', async () => {
    const response = await apiContext.delete(`/v1/catalog/parts/${createdPartId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.status()).toBe(204);
  });

  test('should return 404 for deleted part', async () => {
    const response = await apiContext.get(`/v1/catalog/parts/${createdPartId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.status()).toBe(404);
  });
});

// ============================================================================
// ANALOG FINDER TESTS
// ============================================================================
test.describe('Analog Finder', () => {
  const knownPartNumber = '04465-0K380'; // Known test part

  test('should find analogs for valid part', async () => {
    const response = await apiContext.get(`/v1/catalog/analogs/${knownPartNumber}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.original).toBeDefined();
    expect(data.data.original.part_number).toBe(knownPartNumber);
    expect(data.data.analogs).toBeDefined();
    expect(Array.isArray(data.data.analogs)).toBeTruthy();
  });

  test('should respect confidence threshold', async () => {
    const response = await apiContext.get(
      `/v1/catalog/analogs/${knownPartNumber}?min_confidence=0.9`,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    const data = await response.json();

    data.data.analogs.forEach((analog: any) => {
      expect(analog.confidence).toBeGreaterThanOrEqual(0.9);
    });
  });

  test('should filter by analog type', async () => {
    const response = await apiContext.get(
      `/v1/catalog/analogs/${knownPartNumber}?include_aftermarket=false`,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    const data = await response.json();

    data.data.analogs.forEach((analog: any) => {
      expect(analog.type).not.toContain('aftermarket');
    });
  });

  test('should include best match', async () => {
    const response = await apiContext.get(`/v1/catalog/analogs/${knownPartNumber}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    if (data.data.analogs.length > 0) {
      expect(data.data.best_match).toBeDefined();
      expect(data.data.best_match.confidence).toBeGreaterThan(0);
    }
  });

  test('should return 404 for unknown part', async () => {
    const response = await apiContext.get('/v1/catalog/analogs/INVALID-PART-999', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.status()).toBe(404);
  });

  test('should compare analogs', async () => {
    const response = await apiContext.post('/v1/catalog/analogs/compare', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        original: knownPartNumber,
        analogs: ['BP1234', 'SBP5678'],
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.original).toBeDefined();
    expect(data.data.comparisons).toBeDefined();
  });
});

// ============================================================================
// CROSS-REFERENCE TESTS
// ============================================================================
test.describe('Cross-Reference', () => {
  test('should cross-reference NSN', async () => {
    const response = await apiContext.post('/v1/catalog/cross-reference', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        identifier: '2530-12-123-4567',
        type: 'nsn',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.input).toBe('2530-12-123-4567');
    expect(data.data.input_type).toBe('nsn');
    expect(data.data.mappings).toBeDefined();
  });

  test('should auto-detect OEM part number', async () => {
    const response = await apiContext.post('/v1/catalog/cross-reference', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        identifier: '04465-0K380',
        type: 'auto',
      },
    });

    const data = await response.json();

    expect(data.data.input_type).toBe('oem');
  });

  test('should batch cross-reference', async () => {
    const response = await apiContext.post('/v1/catalog/cross-reference/batch', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        identifiers: ['04465-0K380', '15601-87703', '90915-YZZD4'],
        type: 'oem',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.length).toBe(3);
    expect(data.summary.total).toBe(3);
  });
});

// ============================================================================
// FITMENT TESTS
// ============================================================================
test.describe('Fitment Verification', () => {
  test('should verify compatible fitment', async () => {
    const response = await apiContext.post('/v1/catalog/fitment/verify', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        part_number: '04465-0K380',
        vehicle: {
          platform: 'hilux',
          year: 2019,
          engine: '2.8D',
        },
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.fits).toBe(true);
    expect(data.data.confidence).toBeGreaterThan(0.8);
  });

  test('should return warnings for partial fitment', async () => {
    const response = await apiContext.post('/v1/catalog/fitment/verify', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        part_number: '04465-0K380',
        vehicle: {
          platform: 'hilux',
          year: 2010, // Older year
        },
      },
    });

    const data = await response.json();

    if (!data.data.fits) {
      expect(data.data.warnings).toBeDefined();
    }
  });

  test('should suggest alternatives for incompatible fitment', async () => {
    const response = await apiContext.post('/v1/catalog/fitment/verify', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        part_number: '04465-0K380',
        vehicle: {
          platform: 'hmmwv', // Different platform
          year: 2015,
        },
      },
    });

    const data = await response.json();

    if (!data.data.fits && data.data.alternatives) {
      expect(Array.isArray(data.data.alternatives)).toBeTruthy();
    }
  });

  test('should get all fitment data for part', async () => {
    const response = await apiContext.get('/v1/catalog/fitment/04465-0K380', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(Array.isArray(data.data)).toBeTruthy();
    if (data.data.length > 0) {
      expect(data.data[0]).toHaveProperty('platform');
      expect(data.data[0]).toHaveProperty('years');
    }
  });
});

// ============================================================================
// AUTHENTICATION TESTS
// ============================================================================
test.describe('Authentication', () => {
  test('should reject invalid token', async () => {
    const response = await apiContext.get('/v1/catalog/parts', {
      headers: { Authorization: 'Bearer invalid-token' },
    });

    expect(response.status()).toBe(401);
    const data = await response.json();
    expect(data.error.code).toBe('UNAUTHORIZED');
  });

  test('should reject missing token', async () => {
    const response = await apiContext.get('/v1/catalog/parts');

    expect(response.status()).toBe(401);
  });

  test('should reject expired token', async () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDAwMDAwMDB9.invalid';
    
    const response = await apiContext.get('/v1/catalog/parts', {
      headers: { Authorization: `Bearer ${expiredToken}` },
    });

    expect(response.status()).toBe(401);
  });
});

// ============================================================================
// RATE LIMITING TESTS
// ============================================================================
test.describe('Rate Limiting', () => {
  test('should return rate limit headers', async () => {
    const response = await apiContext.get('/v1/catalog/parts?limit=1', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.headers()['x-ratelimit-limit']).toBeDefined();
    expect(response.headers()['x-ratelimit-remaining']).toBeDefined();
  });

  test.skip('should enforce rate limits', async () => {
    // This test is skipped by default to avoid hitting rate limits
    const requests = Array(150).fill(null).map(() =>
      apiContext.get('/v1/catalog/parts?limit=1', {
        headers: { Authorization: `Bearer ${authToken}` },
      })
    );

    const responses = await Promise.all(requests);
    const rateLimited = responses.filter(r => r.status() === 429);

    expect(rateLimited.length).toBeGreaterThan(0);
  });
});

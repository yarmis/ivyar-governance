/**
 * IVYAR Auth API E2E Tests
 */

import { test, expect, APIRequestContext } from '@playwright/test';

const API_URL = process.env.API_URL || 'http://localhost:8080';

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: { 'Content-Type': 'application/json' },
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});

// ============================================================================
// TOKEN GENERATION
// ============================================================================
test.describe('Token Generation', () => {
  test('should get token with valid API credentials', async () => {
    const response = await apiContext.post('/v1/auth/token', {
      data: {
        api_key: process.env.TEST_API_KEY,
        api_secret: process.env.TEST_API_SECRET,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.access_token).toBeDefined();
    expect(data.token_type).toBe('Bearer');
    expect(data.expires_in).toBeGreaterThan(0);
    expect(data.refresh_token).toBeDefined();
  });

  test('should reject invalid API key', async () => {
    const response = await apiContext.post('/v1/auth/token', {
      data: {
        api_key: 'invalid-key',
        api_secret: 'invalid-secret',
      },
    });

    expect(response.status()).toBe(401);
  });

  test('should reject missing credentials', async () => {
    const response = await apiContext.post('/v1/auth/token', {
      data: {},
    });

    expect(response.status()).toBe(400);
  });
});

// ============================================================================
// TOKEN REFRESH
// ============================================================================
test.describe('Token Refresh', () => {
  let refreshToken: string;

  test.beforeAll(async () => {
    const response = await apiContext.post('/v1/auth/token', {
      data: {
        api_key: process.env.TEST_API_KEY,
        api_secret: process.env.TEST_API_SECRET,
      },
    });
    const data = await response.json();
    refreshToken = data.refresh_token;
  });

  test('should refresh token', async () => {
    const response = await apiContext.post('/v1/auth/refresh', {
      data: { refresh_token: refreshToken },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.access_token).toBeDefined();
    expect(data.expires_in).toBeGreaterThan(0);
  });

  test('should reject invalid refresh token', async () => {
    const response = await apiContext.post('/v1/auth/refresh', {
      data: { refresh_token: 'invalid-token' },
    });

    expect(response.status()).toBe(401);
  });
});

// ============================================================================
// CURRENT USER
// ============================================================================
test.describe('Current User', () => {
  let authToken: string;

  test.beforeAll(async () => {
    const response = await apiContext.post('/v1/auth/token', {
      data: {
        api_key: process.env.TEST_API_KEY,
        api_secret: process.env.TEST_API_SECRET,
      },
    });
    const data = await response.json();
    authToken = data.access_token;
  });

  test('should get current user info', async () => {
    const response = await apiContext.get('/v1/auth/me', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data.id).toBeDefined();
    expect(data.data.role).toBeDefined();
    expect(data.data.permissions).toBeDefined();
  });
});

// ============================================================================
// API KEYS MANAGEMENT
// ============================================================================
test.describe('API Keys Management', () => {
  let authToken: string;
  let createdKeyId: string;

  test.beforeAll(async () => {
    const response = await apiContext.post('/v1/auth/token', {
      data: {
        api_key: process.env.TEST_API_KEY,
        api_secret: process.env.TEST_API_SECRET,
      },
    });
    const data = await response.json();
    authToken = data.access_token;
  });

  test('should list API keys', async () => {
    const response = await apiContext.get('/v1/auth/api-keys', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBeTruthy();
  });

  test('should create API key', async () => {
    const response = await apiContext.post('/v1/auth/api-keys', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        name: 'Test API Key',
        expires_in_days: 30,
        scopes: ['catalog:read'],
      },
    });

    expect(response.status()).toBe(201);
    const data = await response.json();

    expect(data.data.id).toBeDefined();
    expect(data.data.api_key).toBeDefined();
    expect(data.data.api_secret).toBeDefined();
    createdKeyId = data.data.id;
  });

  test('should revoke API key', async () => {
    const response = await apiContext.delete(`/v1/auth/api-keys/${createdKeyId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.status()).toBe(204);
  });
});

/**
 * Test Setup
 */

import { beforeAll, afterAll } from 'vitest';
import dotenv from 'dotenv';

// Load test environment
dotenv.config({ path: '.env.test' });

// Global setup
beforeAll(async () => {
  console.log('🧪 Starting test suite...');
});

afterAll(async () => {
  console.log('✅ Test suite completed');
});

// Increase timeout for integration tests
export const INTEGRATION_TIMEOUT = 30000;

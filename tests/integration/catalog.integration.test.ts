/**
 * IVYAR Catalog Service Integration Tests
 * 
 * Tests service layer with real database connections
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { CatalogService } from '../../src/services/catalog.service';
import { DatabaseConnection } from '../../src/database';
import { RedisClient } from '../../src/cache';
import { QdrantClient } from '../../src/vector';
import { createTestPart, cleanupTestData } from '../utils/factories';

describe('CatalogService Integration', () => {
  let catalogService: CatalogService;
  let db: DatabaseConnection;
  let redis: RedisClient;
  let qdrant: QdrantClient;

  beforeAll(async () => {
    db = await DatabaseConnection.connect(process.env.DATABASE_URL!);
    redis = await RedisClient.connect(process.env.REDIS_URL!);
    qdrant = await QdrantClient.connect(process.env.QDRANT_URL!);

    catalogService = new CatalogService(db, redis, qdrant);
  });

  afterAll(async () => {
    await cleanupTestData(db);
    await db.disconnect();
    await redis.disconnect();
  });

  beforeEach(async () => {
    await redis.flushDb();
  });

  describe('Part CRUD', () => {
    it('should create and retrieve part', async () => {
      const partData = createTestPart();
      
      const created = await catalogService.createPart(partData);
      expect(created.id).toBeDefined();

      const retrieved = await catalogService.getPartById(created.id);
      expect(retrieved?.part_number).toBe(partData.part_number);
    });

    it('should update part', async () => {
      const part = await catalogService.createPart(createTestPart());
      
      const updated = await catalogService.updatePart(part.id, {
        description: 'Updated description',
      });

      expect(updated.description).toBe('Updated description');
    });

    it('should delete part', async () => {
      const part = await catalogService.createPart(createTestPart());
      
      await catalogService.deletePart(part.id);

      const retrieved = await catalogService.getPartById(part.id);
      expect(retrieved).toBeNull();
    });
  });

  describe('Search', () => {
    beforeAll(async () => {
      // Create test parts for search
      await catalogService.createPart({
        part_number: 'SEARCH-001',
        brand: 'Toyota',
        description: 'Brake pads front',
        category: 'brakes',
        domain: 'automotive',
      });
      await catalogService.createPart({
        part_number: 'SEARCH-002',
        brand: 'Bosch',
        description: 'Brake pads rear',
        category: 'brakes',
        domain: 'automotive',
      });
    });

    it('should find parts by keyword', async () => {
      const results = await catalogService.search({
        query: 'brake pads',
        limit: 10,
      });

      expect(results.data.length).toBeGreaterThan(0);
    });

    it('should filter by brand', async () => {
      const results = await catalogService.search({
        query: 'brake',
        filters: { brand: ['Toyota'] },
      });

      results.data.forEach(result => {
        expect(result.part.brand).toBe('Toyota');
      });
    });

    it('should use cache for repeated searches', async () => {
      const query = { query: 'brake pads', limit: 10 };

      // First search (cache miss)
      await catalogService.search(query);

      // Check cache
      const cached = await redis.get(`search:${JSON.stringify(query)}`);
      expect(cached).toBeDefined();

      // Second search should use cache
      const startTime = Date.now();
      await catalogService.search(query);
      const duration = Date.now() - startTime;

      expect(duration).toBeLessThan(50); // Cached response should be fast
    });
  });

  describe('Analogs', () => {
    it('should find analogs with embeddings', async () => {
      const analogs = await catalogService.findAnalogs('04465-0K380', {
        minConfidence: 0.7,
      });

      expect(analogs.original).toBeDefined();
      expect(Array.isArray(analogs.analogs)).toBeTruthy();
    });

    it('should respect confidence threshold', async () => {
      const analogs = await catalogService.findAnalogs('04465-0K380', {
        minConfidence: 0.95,
      });

      analogs.analogs.forEach(analog => {
        expect(analog.confidence).toBeGreaterThanOrEqual(0.95);
      });
    });
  });

  describe('Cross-Reference', () => {
    it('should map NSN to OEM', async () => {
      const result = await catalogService.crossReference({
        identifier: '2530-12-123-4567',
        type: 'nsn',
      });

      expect(result.input_type).toBe('nsn');
      expect(result.mappings).toBeDefined();
    });
  });
});

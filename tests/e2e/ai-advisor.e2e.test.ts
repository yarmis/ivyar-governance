/**
 * IVYAR AI Advisor API E2E Tests
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
// BASIC AI QUERIES
// ============================================================================
test.describe('AI Advisor Basic Queries', () => {
  test('should respond to part search query', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'Find brake pads for Toyota Hilux 2019',
        context: { user_role: 'technician' },
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.id).toBeDefined();
    expect(data.content).toBeDefined();
    expect(data.content.length).toBeGreaterThan(0);
    expect(data.intent).toBe('part_search');
  });

  test('should detect analog finder intent', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'What are alternatives to part 04465-0K380?',
        context: { user_role: 'logistics' },
      },
    });

    const data = await response.json();

    expect(data.intent).toBe('analog_finder');
  });

  test('should detect repair advisor intent', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'How do I replace the fuel filter on a Hilux?',
        context: { user_role: 'operator' },
      },
    });

    const data = await response.json();

    expect(data.intent).toBe('repair_advisor');
  });

  test('should include confidence score', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { query: 'Find oil filter' },
    });

    const data = await response.json();

    expect(data.confidence).toBeDefined();
    expect(data.confidence).toBeGreaterThan(0);
    expect(data.confidence).toBeLessThanOrEqual(1);
  });
});

// ============================================================================
// ROLE-BASED RESPONSES
// ============================================================================
test.describe('Role-Based Responses', () => {
  const query = 'How to check brake fluid level?';

  test('should give concise response to operator', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query,
        context: { user_role: 'operator' },
      },
    });

    const data = await response.json();
    
    // Operator responses should be shorter and simpler
    expect(data.content.length).toBeLessThan(2000);
  });

  test('should give detailed response to technician', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query,
        context: { user_role: 'technician' },
      },
    });

    const data = await response.json();

    // Technician responses should include specs
    expect(data.content).toMatch(/spec|procedure|tool|torque/i);
  });

  test('should focus on logistics for logistics role', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'I need brake pads for 5 Hilux vehicles',
        context: { user_role: 'logistics' },
      },
    });

    const data = await response.json();

    // Should mention availability, stock, ordering
    expect(data.content).toMatch(/stock|available|order|quantity/i);
  });
});

// ============================================================================
// SAFETY WARNINGS
// ============================================================================
test.describe('Safety Warnings', () => {
  test('should include safety warnings for brake parts', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'Find brake pads',
        context: { user_role: 'operator' },
      },
    });

    const data = await response.json();

    expect(data.warnings).toBeDefined();
    const safetyWarning = data.warnings.find((w: any) => w.type === 'safety');
    expect(safetyWarning).toBeDefined();
  });

  test('should include warnings for fuel system', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'Fuel pump replacement procedure',
        context: { user_role: 'technician' },
      },
    });

    const data = await response.json();

    const hasFuelWarning = data.warnings?.some(
      (w: any) => w.message.toLowerCase().includes('fuel') || 
                  w.message.toLowerCase().includes('fire')
    );
    expect(hasFuelWarning).toBeTruthy();
  });
});

// ============================================================================
// CITATIONS
// ============================================================================
test.describe('Citations', () => {
  test('should include citations in response', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'What is the torque spec for Hilux brake caliper bolts?',
        context: { user_role: 'technician' },
      },
    });

    const data = await response.json();

    expect(data.citations).toBeDefined();
    if (data.citations.length > 0) {
      expect(data.citations[0]).toHaveProperty('source');
      expect(data.citations[0]).toHaveProperty('title');
    }
  });
});

// ============================================================================
// SUGGESTED ACTIONS
// ============================================================================
test.describe('Suggested Actions', () => {
  test('should suggest relevant actions', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'Find brake pads for Hilux',
        context: { user_role: 'technician' },
      },
    });

    const data = await response.json();

    expect(data.suggested_actions).toBeDefined();
    expect(Array.isArray(data.suggested_actions)).toBeTruthy();
    
    if (data.suggested_actions.length > 0) {
      expect(data.suggested_actions[0]).toHaveProperty('id');
      expect(data.suggested_actions[0]).toHaveProperty('label');
      expect(data.suggested_actions[0]).toHaveProperty('action');
    }
  });
});

// ============================================================================
// MULTI-LANGUAGE
// ============================================================================
test.describe('Multi-Language Support', () => {
  test('should respond in Ukrainian', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'Знайти гальмівні колодки для Hilux',
        context: { language: 'uk' },
      },
    });

    const data = await response.json();

    // Should contain Ukrainian characters
    expect(data.content).toMatch(/[а-яА-ЯіїєґІЇЄҐ]/);
  });

  test('should respond in German', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'Bremsbeläge für Hilux finden',
        context: { language: 'de' },
      },
    });

    const data = await response.json();

    // Should contain German words
    expect(data.content).toMatch(/[äöüßÄÖÜ]|und|der|die|das/);
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================
test.describe('Error Handling', () => {
  test('should handle empty query', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { query: '' },
    });

    expect(response.status()).toBe(400);
  });

  test('should handle very long query', async () => {
    const longQuery = 'a'.repeat(2000);
    
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { query: longQuery },
    });

    expect(response.status()).toBe(400);
  });

  test('should gracefully handle unknown parts', async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        query: 'Find part XYZNONEXISTENT999',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    // Should acknowledge not found
    expect(data.content).toMatch(/not found|no results|couldn't find/i);
  });
});

// ============================================================================
// FEEDBACK
// ============================================================================
test.describe('Feedback', () => {
  let responseId: string;

  test.beforeAll(async () => {
    const response = await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { query: 'Find oil filter' },
    });
    const data = await response.json();
    responseId = data.id;
  });

  test('should submit positive feedback', async () => {
    const response = await apiContext.post('/v1/ai/feedback', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        response_id: responseId,
        rating: 5,
        feedback: 'Very helpful!',
      },
    });

    expect(response.ok()).toBeTruthy();
  });

  test('should submit negative feedback with issue type', async () => {
    const response = await apiContext.post('/v1/ai/feedback', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        response_id: responseId,
        rating: 2,
        feedback: 'Missing some details',
        issue_type: 'incomplete',
      },
    });

    expect(response.ok()).toBeTruthy();
  });
});

// ============================================================================
// CONVERSATIONS
// ============================================================================
test.describe('Conversations', () => {
  test('should list conversations', async () => {
    const response = await apiContext.get('/v1/ai/conversations', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBeTruthy();
  });

  test('should get conversation history', async () => {
    // First create a conversation
    await apiContext.post('/v1/ai/ask', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { query: 'Find brake pads' },
    });

    // Get conversations
    const listResponse = await apiContext.get('/v1/ai/conversations?limit=1', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const listData = await listResponse.json();

    if (listData.data.length > 0) {
      const conversationId = listData.data[0].id;
      
      const response = await apiContext.get(`/v1/ai/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.ok()).toBeTruthy();
      const data = await response.json();

      expect(data.data.messages).toBeDefined();
      expect(Array.isArray(data.data.messages)).toBeTruthy();
    }
  });
});

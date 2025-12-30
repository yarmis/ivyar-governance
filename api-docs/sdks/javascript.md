# IVYAR JavaScript/TypeScript SDK

## Installation

```bash
npm install @ivyar/sdk
# or
yarn add @ivyar/sdk
```

## Quick Start

```typescript
import { IvyarClient } from '@ivyar/sdk';

const client = new IvyarClient({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
});

// Search parts
const results = await client.catalog.search({
  query: 'brake pads Toyota Hilux',
  filters: { category: ['brakes'] },
  limit: 10,
});

results.data.forEach(part => {
  console.log(`${part.part_number}: ${part.description}`);
});
```

## Catalog API

```typescript
// Search
const results = await client.catalog.search({
  query: 'oil filter',
  mode: 'hybrid',
  filters: {
    brand: ['Toyota', 'Bosch'],
    repairLevel: ['R1', 'R2'],
  },
});

// Get part
const part = await client.catalog.getPart('04465-0K380', {
  include: ['analogs', 'fitment'],
});

// Find analogs
const analogs = await client.catalog.findAnalogs('04465-0K380', {
  minConfidence: 0.8,
});

// Cross-reference
const xref = await client.catalog.crossReference({
  identifier: '2530-12-123-4567',
  type: 'nsn',
});

// Verify fitment
const fitment = await client.catalog.verifyFitment({
  partNumber: '04465-0K380',
  vehicle: { platform: 'hilux', year: 2019 },
});
```

## AI Advisor

```typescript
// Ask AI
const response = await client.ai.ask({
  query: 'Find analog for 04465-0K380',
  context: { userRole: 'technician' },
});

console.log(response.content);
console.log(`Intent: ${response.intent}`);

// Streaming
const stream = client.ai.stream({
  query: 'How to replace brake pads?',
});

for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

## React Hook

```tsx
import { useIvyar, usePartSearch } from '@ivyar/sdk/react';

function PartSearchComponent() {
  const { search, results, loading, error } = usePartSearch();

  const handleSearch = async (query: string) => {
    await search({ query, limit: 10 });
  };

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {loading && <p>Loading...</p>}
      {results?.data.map(part => (
        <div key={part.id}>{part.part_number}</div>
      ))}
    </div>
  );
}
```

## Error Handling

```typescript
import {
  IvyarError,
  AuthenticationError,
  NotFoundError,
  RateLimitError,
} from '@ivyar/sdk';

try {
  const part = await client.catalog.getPart('invalid-id');
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log(`Part not found: ${error.message}`);
  } else if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after ${error.retryAfter}s`);
  } else if (error instanceof IvyarError) {
    console.log(`API error: ${error.code} - ${error.message}`);
  }
}
```

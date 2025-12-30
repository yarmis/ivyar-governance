# IVYAR API Documentation

## Overview

Complete API reference for IVYAR platform services.

## Base URLs

| Environment | URL |
|-------------|-----|
| Production | `https://api.ivyar.org/v1` |
| Staging | `https://staging-api.ivyar.org/v1` |
| Sandbox | `https://sandbox-api.ivyar.org/v1` |

## API Services

| Service | Description | Spec |
|---------|-------------|------|
| [Catalog API](specs/catalog-api.yaml) | Parts catalog management | OpenAPI 3.1 |
| [Repair API](specs/repair-api.yaml) | Repair operations | OpenAPI 3.1 |
| [Fleet API](specs/fleet-api.yaml) | Fleet management | OpenAPI 3.1 |
| [Analytics API](specs/analytics-api.yaml) | Reporting & analytics | OpenAPI 3.1 |
| [AI Advisor API](specs/ai-advisor-api.yaml) | AI-powered assistant | OpenAPI 3.1 |
| [Auth API](specs/auth-api.yaml) | Authentication | OpenAPI 3.1 |

## Authentication

All API requests require Bearer token authentication:

```bash
curl -X GET "https://api.ivyar.org/v1/catalog/parts" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Getting a Token

```bash
curl -X POST "https://api.ivyar.org/v1/auth/token" \
  -H "Content-Type: application/json" \
  -d '{"api_key": "your-api-key", "api_secret": "your-api-secret"}'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhpcyBpcyBhIHJl..."
}
```

## Rate Limits

| Tier | Requests/min | Burst | Concurrent |
|------|-------------|-------|------------|
| Free | 60 | 10 | 5 |
| Standard | 300 | 50 | 20 |
| Professional | 1000 | 100 | 50 |
| Enterprise | 5000 | 500 | 200 |

Rate limit headers:
```
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 299
X-RateLimit-Reset: 1703865600
```

## Response Format

All responses are JSON with consistent structure:

### Success Response
```json
{
  "data": { ... },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2025-12-29T10:30:00Z"
  }
}
```

### Paginated Response
```json
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 25,
    "total": 1250,
    "pages": 50
  },
  "meta": { ... }
}
```

### Error Response
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid part number format",
    "details": {
      "field": "part_number",
      "constraint": "Must match pattern: XX-XXXXX"
    }
  },
  "meta": {
    "request_id": "req_abc123"
  }
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## SDKs

- [Python SDK](sdks/python.md)
- [JavaScript/TypeScript SDK](sdks/javascript.md)
- [Go SDK](sdks/go.md)

## Guides

- [Getting Started](guides/getting-started.md)
- [Part Search](guides/part-search.md)
- [Analog Finding](guides/analog-finding.md)
- [Webhooks](guides/webhooks.md)

*Version: 1.0.0 | December 2025*

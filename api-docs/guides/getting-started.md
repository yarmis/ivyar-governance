# Getting Started with IVYAR API

## 1. Get API Credentials

1. Log in to [IVYAR Portal](https://portal.ivyar.org)
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Copy your `api_key` and `api_secret`

> ⚠️ Store your API secret securely. It's only shown once.

## 2. Get Access Token

```bash
curl -X POST "https://api.ivyar.org/v1/auth/token" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "your-api-key",
    "api_secret": "your-api-secret"
  }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

## 3. Make Your First Request

```bash
curl "https://api.ivyar.org/v1/catalog/parts?limit=5" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 4. Search Parts

```bash
curl -X POST "https://api.ivyar.org/v1/catalog/search" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "brake pads"}'
```

## 5. Install SDK (Optional)

**Python:**
```bash
pip install ivyar-sdk
```

**JavaScript:**
```bash
npm install @ivyar/sdk
```

## Next Steps

- [Part Search Guide](part-search.md)
- [Analog Finding Guide](analog-finding.md)
- [API Reference](../specs/)

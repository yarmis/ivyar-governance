# IVYAR API - cURL Examples

## Authentication

```bash
# Get access token
export TOKEN=$(curl -s -X POST "https://api.ivyar.org/v1/auth/token" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "your-api-key",
    "api_secret": "your-api-secret"
  }' | jq -r '.access_token')

echo "Token: $TOKEN"
```

## Catalog API

### Search Parts

```bash
# Simple search
curl -X POST "https://api.ivyar.org/v1/catalog/search" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "brake pads Toyota Hilux",
    "limit": 10
  }'

# Filtered search
curl -X POST "https://api.ivyar.org/v1/catalog/search" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "oil filter",
    "mode": "hybrid",
    "filters": {
      "brand": ["Toyota", "Bosch"],
      "category": ["filters"],
      "repair_level": ["R1", "R2"]
    },
    "limit": 25
  }'

# Semantic search
curl -X POST "https://api.ivyar.org/v1/catalog/search" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "what stops the wheels on a 2019 pickup truck",
    "mode": "semantic"
  }'
```

### Get Part Details

```bash
# By ID
curl "https://api.ivyar.org/v1/catalog/parts/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer $TOKEN"

# By part number with includes
curl "https://api.ivyar.org/v1/catalog/parts/04465-0K380?include=analogs,fitment,repair_coverage" \
  -H "Authorization: Bearer $TOKEN"
```

### Find Analogs

```bash
# Find analogs with min confidence
curl "https://api.ivyar.org/v1/catalog/analogs/04465-0K380?min_confidence=0.8" \
  -H "Authorization: Bearer $TOKEN"

# Compare analogs
curl -X POST "https://api.ivyar.org/v1/catalog/analogs/compare" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "original": "04465-0K380",
    "analogs": ["BP1234", "SBP5678"]
  }'
```

### Cross-Reference

```bash
# NSN lookup
curl -X POST "https://api.ivyar.org/v1/catalog/cross-reference" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "2530-12-123-4567",
    "type": "nsn"
  }'

# Batch cross-reference
curl -X POST "https://api.ivyar.org/v1/catalog/cross-reference/batch" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "identifiers": ["04465-0K380", "15601-87703", "90915-YZZD4"],
    "type": "oem"
  }'
```

### Verify Fitment

```bash
curl -X POST "https://api.ivyar.org/v1/catalog/fitment/verify" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "part_number": "04465-0K380",
    "vehicle": {
      "platform": "hilux",
      "year": 2019,
      "engine": "2.8D"
    }
  }'
```

## Repair API

### Create Repair

```bash
curl -X POST "https://api.ivyar.org/v1/repairs" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": "HIL-234",
    "issue": "Front brake pad replacement",
    "level": "R2",
    "priority": "medium",
    "notes": "Squeaking noise when braking"
  }'
```

### Get Repair Recommendation

```bash
curl -X POST "https://api.ivyar.org/v1/repairs/recommendations" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": "HTV-012",
    "issue": "Engine overheating",
    "symptoms": ["temperature gauge high", "coolant leak"],
    "damage_level": "moderate"
  }'
```

### Complete Repair

```bash
curl -X POST "https://api.ivyar.org/v1/repairs/REP-12345/complete" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "notes": "Replaced brake pads, tested braking performance",
    "parts_used": [
      {"part_id": "04465-0K380", "quantity": 1}
    ],
    "labor_hours": 2.5
  }'
```

## Fleet API

```bash
# Get fleet readiness
curl "https://api.ivyar.org/v1/fleet/readiness?group_by=platform" \
  -H "Authorization: Bearer $TOKEN"

# Get vehicle history
curl "https://api.ivyar.org/v1/fleet/vehicles/HIL-234/history?limit=10" \
  -H "Authorization: Bearer $TOKEN"

# Get vehicle locations
curl "https://api.ivyar.org/v1/fleet/locations" \
  -H "Authorization: Bearer $TOKEN"
```

## AI Advisor API

```bash
# Ask AI (non-streaming)
curl -X POST "https://api.ivyar.org/v1/ai/ask" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Find analog for brake pad 04465-0K380 with at least 90% confidence",
    "context": {
      "user_role": "technician",
      "platform": "hilux",
      "language": "en"
    }
  }'

# Ask AI (streaming)
curl -N "https://api.ivyar.org/v1/ai/stream?query=repair+procedure+for+hilux+oil+change&role=operator" \
  -H "Authorization: Bearer $TOKEN"

# Submit feedback
curl -X POST "https://api.ivyar.org/v1/ai/feedback" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "response_id": "resp_abc123",
    "rating": 5,
    "feedback": "Very helpful response"
  }'
```

## Analytics API

```bash
# Get coverage analytics
curl "https://api.ivyar.org/v1/analytics/coverage?group_by=platform" \
  -H "Authorization: Bearer $TOKEN"

# Get gap analysis
curl "https://api.ivyar.org/v1/analytics/gaps?priority=critical&limit=20" \
  -H "Authorization: Bearer $TOKEN"

# Generate report
curl -X POST "https://api.ivyar.org/v1/analytics/reports" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "coverage",
    "parameters": {
      "platforms": ["hilux", "hmmwv"],
      "period": "month"
    },
    "format": "pdf"
  }'
```

## Error Handling

```bash
# Handle errors
response=$(curl -s -w "\n%{http_code}" -X GET "https://api.ivyar.org/v1/catalog/parts/invalid-id" \
  -H "Authorization: Bearer $TOKEN")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" != "200" ]; then
  echo "Error: $http_code"
  echo "$body" | jq '.error'
fi
```

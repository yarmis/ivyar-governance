# Webhooks

## Overview

Webhooks allow you to receive real-time notifications about events in IVYAR.

## Supported Events

| Event | Description |
|-------|-------------|
| `part.created` | New part added to catalog |
| `part.updated` | Part information updated |
| `repair.created` | New repair ticket created |
| `repair.completed` | Repair marked as complete |
| `repair.escalated` | Repair priority escalated |
| `fleet.status_changed` | Vehicle status changed |

## Setup Webhook

```bash
curl -X POST "https://api.ivyar.org/v1/webhooks" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-server.com/webhooks/ivyar",
    "events": ["repair.created", "repair.completed"],
    "secret": "your-webhook-secret"
  }'
```

## Payload Format

```json
{
  "id": "evt_abc123",
  "type": "repair.completed",
  "created_at": "2025-12-29T10:30:00Z",
  "data": {
    "repair_id": "REP-12345",
    "vehicle_id": "HIL-234",
    "status": "completed"
  }
}
```

## Verify Signature

```python
import hmac
import hashlib

def verify_signature(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

## Retry Policy

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 1 minute |
| 3 | 5 minutes |
| 4 | 30 minutes |
| 5 | 2 hours |

# IVYAR Python SDK

## Installation

```bash
pip install ivyar-sdk
```

## Quick Start

```python
from ivyar import IvyarClient

# Initialize client
client = IvyarClient(
    api_key="your-api-key",
    api_secret="your-api-secret"
)

# Search parts
results = client.catalog.search(
    query="brake pads Toyota Hilux",
    filters={"category": ["brakes"]},
    limit=10
)

for part in results.data:
    print(f"{part.part_number}: {part.description}")
```

## Catalog API

```python
# Search parts
results = client.catalog.search(
    query="oil filter",
    mode="hybrid",
    filters={
        "brand": ["Toyota", "Bosch"],
        "repair_level": ["R1", "R2"]
    }
)

# Get part details
part = client.catalog.get_part("04465-0K380", include=["analogs", "fitment"])

# Find analogs
analogs = client.catalog.find_analogs(
    part_number="04465-0K380",
    min_confidence=0.8
)

# Cross-reference
xref = client.catalog.cross_reference(
    identifier="2530-12-123-4567",
    type="nsn"
)

# Verify fitment
fitment = client.catalog.verify_fitment(
    part_number="04465-0K380",
    vehicle={"platform": "hilux", "year": 2019}
)
```

## Repair API

```python
# Create repair
repair = client.repairs.create(
    vehicle_id="HIL-234",
    issue="Brake pad replacement",
    level="R2",
    priority="medium"
)

# Get recommendation
recommendation = client.repairs.get_recommendation(
    vehicle_id="HTV-012",
    issue="Engine overheating",
    damage_level="moderate"
)

# Complete repair
client.repairs.complete(
    repair_id="REP-12345",
    parts_used=[{"part_id": "04465-0K380", "quantity": 1}],
    labor_hours=2.5
)
```

## AI Advisor

```python
# Ask AI
response = client.ai.ask(
    query="Find analog for 04465-0K380",
    context={"user_role": "technician"}
)

print(response.content)
print(f"Intent: {response.intent}")
print(f"Confidence: {response.confidence}")

# Streaming
for chunk in client.ai.stream("How to replace brake pads on Hilux?"):
    print(chunk, end="", flush=True)
```

## Async Support

```python
import asyncio
from ivyar import AsyncIvyarClient

async def main():
    async with AsyncIvyarClient(api_key="...", api_secret="...") as client:
        results = await client.catalog.search("brake pads")
        print(results)

asyncio.run(main())
```

## Error Handling

```python
from ivyar.exceptions import (
    IvyarError,
    AuthenticationError,
    NotFoundError,
    ValidationError,
    RateLimitError
)

try:
    part = client.catalog.get_part("invalid-id")
except NotFoundError as e:
    print(f"Part not found: {e.message}")
except RateLimitError as e:
    print(f"Rate limited. Retry after {e.retry_after} seconds")
except IvyarError as e:
    print(f"API error: {e.code} - {e.message}")
```

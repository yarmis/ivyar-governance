# IVYAR Medical Program API Reference

## Base URL

```
Production: https://api.medical.ivyar.gov.ua/v1
Staging:    https://staging-api.medical.ivyar.gov.ua/v1
```

## Authentication

All API requests require Bearer token authentication:

```http
Authorization: Bearer <your_token>
```

## Rate Limits

| Tier | Limit |
|------|-------|
| Standard | 1,000 requests/hour |
| Bulk operations | 100 requests/hour |

## API Endpoints Summary

### Patients

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/patients` | List patients |
| POST | `/patients` | Register new patient |
| GET | `/patients/{id}` | Get patient by ID |
| PUT | `/patients/{id}` | Update patient |
| GET | `/patients/{id}/eligibility` | Check eligibility |
| GET | `/patients/{id}/benefits` | Get benefits summary |

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/appointments` | List appointments |
| POST | `/appointments` | Schedule appointment |
| GET | `/appointments/available-slots` | Get available slots |
| GET | `/appointments/{id}` | Get appointment |
| PUT | `/appointments/{id}` | Update appointment |
| DELETE | `/appointments/{id}` | Cancel appointment |
| POST | `/appointments/{id}/confirm` | Confirm appointment |
| POST | `/appointments/{id}/check-in` | Check in |
| POST | `/appointments/{id}/reschedule` | Reschedule |

### Medical Records

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/records` | List records |
| GET | `/records/{id}` | Get record |
| GET | `/records/{id}/download` | Download as PDF |
| GET | `/patients/{id}/health-summary` | Get health summary |
| GET | `/patients/{id}/lab-results` | Get lab results |

### Prescriptions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/prescriptions` | List prescriptions |
| POST | `/prescriptions` | Create prescription |
| GET | `/prescriptions/{id}` | Get prescription |
| POST | `/prescriptions/{id}/refill` | Request refill |
| POST | `/prescriptions/check-interactions` | Check interactions |
| GET | `/formulary` | Search formulary |
| GET | `/pharmacies` | Find pharmacies |

### Programs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/programs` | List programs |
| GET | `/programs/{id}` | Get program details |
| POST | `/programs/{id}/enroll` | Enroll in program |
| GET | `/patients/{id}/enrollments` | Get enrollments |

### Disability

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/disability/assessments` | List assessments |
| POST | `/disability/assessments` | Schedule assessment |
| GET | `/disability/assessments/{id}` | Get assessment |
| GET | `/disability/assessments/{id}/documents` | Get documents |
| POST | `/disability/assessments/{id}/documents` | Upload document |
| GET | `/patients/{id}/disability-status` | Get disability status |

### Claims

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/claims` | List claims |
| POST | `/claims` | Submit claim |
| GET | `/claims/{id}` | Get claim |
| POST | `/claims/{id}/appeal` | Appeal claim |
| GET | `/patients/{id}/cost-sharing` | Get cost sharing |

### Authorizations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/authorizations` | List authorizations |
| POST | `/authorizations` | Request authorization |
| GET | `/authorizations/{id}` | Get authorization |
| POST | `/authorizations/check-required` | Check if required |

### Providers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/providers` | Search providers |
| GET | `/providers/{id}` | Get provider |
| GET | `/facilities` | List facilities |

### Integration

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/integration/pension/sync` | Sync with pension |
| GET | `/integration/pension/benefits` | Get pension benefits |
| GET | `/integration/insurance/coverage` | Get insurance coverage |
| POST | `/integration/insurance/coordinate-benefits` | Coordinate benefits |
| GET | `/integration/combined-statement` | Combined statement |

---

## Examples

### Schedule Appointment

```bash
curl -X POST https://api.medical.ivyar.gov.ua/v1/appointments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "patient_id": "PAT-001",
    "service_type": "cardiology",
    "appointment_type": "in_person",
    "scheduled_date": "2025-01-15",
    "scheduled_time": "10:00",
    "reason_for_visit": "Follow-up for hypertension"
  }'
```

Response:
```json
{
  "id": "APT-123456",
  "patient_id": "PAT-001",
  "provider_id": "PROV-001",
  "provider_name": "Dr. Koval, Oleksandr",
  "facility_name": "Military Clinic A",
  "service_type": "cardiology",
  "appointment_type": "in_person",
  "scheduled_date": "2025-01-15",
  "scheduled_time": "10:00",
  "duration_minutes": 45,
  "status": "scheduled",
  "authorization_required": false
}
```

### Request Prescription Refill

```bash
curl -X POST https://api.medical.ivyar.gov.ua/v1/prescriptions/RX-001/refill \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pharmacy_id": "PHARM-001",
    "delivery_method": "pickup"
  }'
```

Response:
```json
{
  "success": true,
  "prescription_id": "RX-001",
  "refill_number": 2,
  "refills_remaining": 3,
  "estimated_pickup": "2025-01-05T14:00:00Z",
  "pharmacy": {
    "id": "PHARM-001",
    "name": "Military Pharmacy #12",
    "address": "15 Khreshchatyk St., Kyiv",
    "phone": "+380 44 123 4567"
  },
  "copayment": 0
}
```

### Get Combined Benefits Statement

```bash
curl -X GET "https://api.medical.ivyar.gov.ua/v1/integration/combined-statement?patient_id=PAT-001&month=1&year=2025" \
  -H "Authorization: Bearer $TOKEN"
```

Response:
```json
{
  "patient_id": "PAT-001",
  "period": "January 2025",
  "pension": {
    "gross_amount": 45000,
    "deductions": [
      {"description": "Life Insurance", "amount": 1500},
      {"description": "Health Insurance", "amount": 600}
    ],
    "net_amount": 42900
  },
  "medical": {
    "services_used": 3,
    "total_billed": 15000,
    "plan_paid": 15000,
    "patient_paid": 0,
    "remaining_deductible": 0,
    "remaining_oop": 0
  },
  "insurance": {
    "total_coverage": 800000,
    "claims_submitted": 1,
    "claims_paid": 5000
  },
  "disability": {
    "group": "group_ii",
    "benefits": [
      "No cost sharing",
      "Priority healthcare access",
      "Home modification support"
    ]
  }
}
```

---

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "scheduled_date",
        "message": "Date must be in the future"
      }
    ]
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `UNAUTHORIZED` | 401 | Invalid or missing token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource state conflict |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Service Types

| Code | Description |
|------|-------------|
| `primary_care` | General medicine |
| `specialty_care` | Specialist consultations |
| `emergency` | Emergency services |
| `mental_health` | Psychological/psychiatric |
| `rehabilitation` | Physical/occupational therapy |
| `preventive` | Screenings, immunizations |
| `pharmacy` | Prescription drugs |
| `dental` | Oral health |
| `vision` | Eye care |
| `hearing` | Audiology |
| `telemedicine` | Video consultations |

## Beneficiary Categories

| Category | Cost Sharing | Description |
|----------|--------------|-------------|
| `category_a` | None | Combat veterans, disabled |
| `category_b` | Minimal | Veterans, pensioners |
| `category_c` | Standard | Dependents |
| `category_d` | Full | Extended family |

---

*API Version 1.0.0 | IVYAR Medical Program*

# IVYAR Integration Hub

Central integration layer for connecting platform modules.

## Active Integrations

| Integration | Modules | Status |
|-------------|---------|--------|
| Pension-Insurance | Pension Fund ↔ Fair Insurance | Active |

## Pension-Insurance Bridge

### Features

1. **Profile Synchronization**
   - Pensioner data syncs to insurance system
   - Service history, rank, disability status

2. **Premium Deduction**
   - Automatic deduction from pension (max 10%)
   - Monthly processing with pension payment

3. **Benefit Coordination**
   - Primary/secondary designation
   - Combined statements

4. **Auto-Enrollment**
   - Pensioners auto-enrolled in basic coverage
   - Recommended products based on profile

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /profile/:id | Get unified profile |
| POST | /sync | Sync pensioner to insurance |
| POST | /auto-enroll | Auto-enroll pensioner |
| POST | /deduction | Process premium deduction |
| GET | /statement/:id | Get combined statement |

---
*Version 1.0.0 | IVYAR Governance Platform*

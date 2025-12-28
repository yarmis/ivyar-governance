# Acceptance Rules

## Data Acceptance

| Check | Criteria | Action |
|-------|----------|--------|
| Format | Valid schema | Reject if fail |
| Quality | 95% complete | Review if below |
| Duplicates | None | Auto-remove |
| Source | Verified | Reject unknown |

## Order Acceptance

| Check | Criteria |
|-------|----------|
| User authorized | Valid role |
| Parts available | Stock check |
| Priority valid | P0-P3 |
| Approval | If required |

## Supplier Acceptance

| Criteria | Requirement |
|----------|-------------|
| Contract | Signed |
| Quality cert | Valid |
| Audit passed | Last 12 months |
| Performance | Above 90% |

## Change Acceptance

| Change Type | Approver |
|-------------|----------|
| Minor config | Ops Lead |
| Major feature | Management |
| Architecture | Leadership |
| Security | Security Team |

# API Test Suite

## Auth API

| ID | Endpoint | Method | Expected |
|----|----------|--------|----------|
| API-001 | /auth/login | POST | 200 + token |
| API-002 | /auth/refresh | POST | 200 + new token |
| API-003 | /auth/logout | POST | 200 |

## Search API

| ID | Endpoint | Method | Expected |
|----|----------|--------|----------|
| API-010 | /search?q=bosch | GET | 200 + results |
| API-011 | /search?brand=MANN | GET | 200 + filtered |
| API-012 | /search?page=2 | GET | 200 + page 2 |

## Catalog API

| ID | Endpoint | Method | Expected |
|----|----------|--------|----------|
| API-020 | /catalog/categories | GET | 200 + list |
| API-021 | /catalog/items | GET | 200 + items |
| API-022 | /catalog/items/123 | GET | 200 + item |

## Orders API

| ID | Endpoint | Method | Expected |
|----|----------|--------|----------|
| API-030 | /orders | POST | 201 + order |
| API-031 | /orders/123 | PUT | 200 + updated |
| API-032 | /orders/123 | DELETE | 200 |

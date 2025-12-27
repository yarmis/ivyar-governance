# API Test Cases - Detailed

## Auth Endpoints

### TC-API-001: Login Success
- Endpoint: POST /auth/login
- Input: valid email, password
- Expected: 200, token returned
- Validate: token is JWT format

### TC-API-002: Login Invalid Password
- Endpoint: POST /auth/login
- Input: valid email, wrong password
- Expected: 401
- Validate: no token returned

### TC-API-003: Login Missing Fields
- Endpoint: POST /auth/login
- Input: email only
- Expected: 400
- Validate: error message clear

## Search Endpoints

### TC-API-010: Search Toyota Parts
- Endpoint: GET /search?q=toyota+brake
- Expected: 200, results array
- Validate: all results contain toyota

### TC-API-011: Search MAN Parts
- Endpoint: GET /search?q=MAN+filter
- Expected: 200, results array
- Validate: MAN parts returned

### TC-API-012: Search with Filters
- Endpoint: GET /search?brand=BOSCH&category=brakes
- Expected: 200, filtered results
- Validate: only Bosch brakes

## Catalog Endpoints

### TC-API-020: Get Categories
- Endpoint: GET /catalog/categories
- Expected: 200, categories list
- Validate: Brakes, Filters, Engine present

### TC-API-021: Get Part Details
- Endpoint: GET /catalog/parts/04465-26420
- Expected: 200, part object
- Validate: Toyota brake pad data

# IVYAR API GATEWAY SPECIFICATION

## Version: Draft 1.0

---

## 1. Purpose

API Gateway provides:
- Centralized authorization
- Request routing
- Validation
- Logging
- Access control
- Partner integration

## 2. Base URL

https://api.ivyar.org/v1/

## 3. Authentication

- Method: OAuth2 (Client Credentials)
- Tokens: JWT (short-lived)
- Header: Authorization: Bearer <token>

## 4. Core Endpoints

### 4.1 Search
GET /search?query=<string>

### 4.2 RFQ
POST /rfq

### 4.3 Quotes
GET /quotes/{rfqId}

### 4.4 Purchase Orders
POST /po

### 4.5 Vendors
GET /vendors/{id}

### 4.6 Audit Log
GET /audit?entity=po&id=123

## 5. Error Model

{ "error": "InvalidRequest", "message": "NSN format invalid" }

## 6. Rate Limits

- 1000 req/min per client
- Burst protection enabled

## 7. Security

- HMAC request signing
- IP allowlists (optional)
- Full audit logging

---
IVYAR LLC

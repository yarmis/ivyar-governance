# IVYAR Data Protection Policy

## 1. Purpose

Establish requirements for protecting IVYAR data throughout its lifecycle.

## 2. Data Classification

### 2.1 RESTRICTED

**Examples:** Vehicle locations, unit assignments, operational data

**Requirements:**
- Encrypted at rest and in transit
- Need-to-know access only
- All access logged and monitored
- No external transmission
- Secure deletion required

### 2.2 CONFIDENTIAL

**Examples:** Repair procedures, fleet status, user data

**Requirements:**
- Encrypted at rest and in transit
- Role-based access
- Access logging
- Controlled external sharing

### 2.3 INTERNAL

**Examples:** Analytics, reports, documentation

**Requirements:**
- Standard access controls
- Internal use only

### 2.4 PUBLIC

**Examples:** Public specifications, marketing

**Requirements:**
- No restrictions

## 3. Data Handling

### 3.1 Storage

| Classification | Storage Requirements |
|----------------|---------------------|
| RESTRICTED | Encrypted, access-controlled, geo-restricted |
| CONFIDENTIAL | Encrypted, access-controlled |
| INTERNAL | Standard controls |
| PUBLIC | No special requirements |

### 3.2 Transmission

- TLS 1.3 for all data in transit
- No sensitive data in URLs
- Email encryption for CONFIDENTIAL+
- Secure file transfer only

### 3.3 Retention

| Data Type | Retention |
|-----------|-----------|
| Audit logs | 1 year |
| User data | Account lifetime + 30 days |
| Repair records | 7 years |
| Analytics | 2 years |

### 3.4 Disposal

- Secure deletion for CONFIDENTIAL+
- Certificate of destruction for media
- Cloud data: Provider confirmation

## 4. Personal Data

- Collect minimum necessary
- Purpose limitation
- User consent required
- Right to deletion honored
- Breach notification (72 hours)

## 5. Backup & Recovery

- Daily backups
- Encrypted backup storage
- Monthly recovery testing
- Offsite/geo-redundant storage

*Effective Date: December 2025*

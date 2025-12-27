import pytest
import requests

API = "http://localhost:8000"

class TestAuthTokens:
    """Security tests for token handling"""

    def test_invalid_token_rejected(self):
        """SEC-001: API must reject invalid tokens"""
        r = requests.get(f"{API}/catalog", headers={"Authorization": "Bearer INVALID"})
        assert r.status_code in [401, 403]

    def test_missing_token_rejected(self):
        """SEC-002: API must reject missing tokens"""
        r = requests.get(f"{API}/catalog")
        assert r.status_code in [401, 403]

    def test_expired_token_rejected(self):
        """SEC-003: API must reject expired tokens"""
        expired = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.EXPIRED.SIGN"
        r = requests.get(f"{API}/catalog", headers={"Authorization": f"Bearer {expired}"})
        assert r.status_code in [401, 403]

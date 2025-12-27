import pytest
import requests

API = "http://localhost:8000"

class TestInputValidation:
    """SEC-060: Input validation"""

    def test_invalid_json(self):
        r = requests.post(
            f"{API}/orders",
            data="INVALID_JSON",
            headers={"Content-Type": "application/json"}
        )
        assert r.status_code in [400, 422]

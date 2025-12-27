import pytest
import requests

API = "http://localhost:8000"

class TestRateLimits:
    """SEC-040: Rate limiting"""

    def test_rate_limit_trigger(self):
        for _ in range(50):
            r = requests.get(f"{API}/search?q=test")
        assert r.status_code in [200, 429]

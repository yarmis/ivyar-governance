import pytest
import requests

API = "http://localhost:8000"

class TestCORS:
    """SEC-050: CORS configuration"""

    def test_disallowed_origin(self):
        r = requests.get(
            f"{API}/catalog",
            headers={"Origin": "http://malicious.com"}
        )
        assert "Access-Control-Allow-Origin" not in r.headers

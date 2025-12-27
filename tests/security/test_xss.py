import pytest
import requests

API = "http://localhost:8000"

class TestXSS:
    """SEC-030: Cross-site scripting protection"""

    payload = "<script>alert('XSS')</script>"

    def test_xss_in_search(self):
        r = requests.get(f"{API}/search?q={self.payload}")
        assert "<script>" not in r.text

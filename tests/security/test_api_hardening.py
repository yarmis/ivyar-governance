import pytest
import requests

API = "http://localhost:8000"

class TestAPIHardening:
    """SEC-070: API hardening"""

    def test_disallowed_methods(self):
        r = requests.put(f"{API}/catalog")
        assert r.status_code in [405, 404]

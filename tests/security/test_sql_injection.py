import pytest
import requests

API = "http://localhost:8000"

class TestSQLInjection:
    """SEC-020: SQL Injection protection"""

    payloads = [
        "' OR 1=1 --",
        "'; DROP TABLE parts; --",
        "\" OR \"\"=\"",
        "1; SELECT * FROM users;"
    ]

    def test_sql_injection_in_search(self):
        for p in self.payloads:
            r = requests.get(f"{API}/search?q={p}")
            assert r.status_code != 500
            assert "error" not in r.text.lower()

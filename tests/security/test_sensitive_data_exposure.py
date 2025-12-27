import pytest
import requests

API = "http://localhost:8000"

class TestSensitiveDataExposure:
    """SEC-080: Sensitive data must not be exposed"""

    def test_no_stack_traces(self):
        r = requests.get(f"{API}/search?q=%")
        assert "Traceback" not in r.text
        assert "Exception" not in r.text

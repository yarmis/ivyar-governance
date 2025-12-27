import pytest
import requests

API = "http://localhost:8000"

class TestRoleEscalation:
    """SEC-010: Prevent privilege escalation"""

    def test_user_cannot_access_admin_endpoint(self):
        r = requests.get(
            f"{API}/admin/stats",
            headers={"Authorization": "Bearer USER_TOKEN"}
        )
        assert r.status_code in [401, 403]

    def test_operator_cannot_modify_roles(self):
        r = requests.post(
            f"{API}/admin/roles/update",
            json={"user": "x", "role": "admin"},
            headers={"Authorization": "Bearer OPERATOR_TOKEN"}
        )
        assert r.status_code in [401, 403]

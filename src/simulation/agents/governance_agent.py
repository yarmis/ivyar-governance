class GovernanceAgent:
    """Simulates governance decisions."""
    def act(self, state):
        governance = state.get("governance", {})
        governance["decisions"] = governance.get("decisions", 0) + 1
        state["governance"] = governance

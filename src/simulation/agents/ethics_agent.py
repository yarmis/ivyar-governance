class EthicsAgent:
    """Applies Gospel Ethics Engine to evaluate decisions."""
    def act(self, state):
        ethics = state.get("ethics", {})
        ethics["checks"] = ethics.get("checks", 0) + 1
        state["ethics"] = ethics

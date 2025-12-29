def crisis_fuel_shortage(state, events):
    """Realistic governance crisis scenario."""
    events.emit("crisis_detected", {"type": "fuel_shortage", "region": "A"})
    # Governance agent must allocate resources
    # Ethics agent evaluates fairness
    return state

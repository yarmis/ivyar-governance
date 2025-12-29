class StateManager:
    """Centralized state for simulation."""
    def __init__(self):
        self.data = {"resources": {}, "governance": {}, "ethics": {}, "treaties": {}}

    def get(self, key, default=None):
        return self.data.get(key, default)

    def set(self, key, value):
        self.data[key] = value

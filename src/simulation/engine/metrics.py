class Metrics:
    """Collects indicators during simulation."""
    def __init__(self):
        self.history = []

    def collect(self, state):
        self.history.append(dict(state))

    def export(self):
        return self.history

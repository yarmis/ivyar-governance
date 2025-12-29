class SimulationCore:
    """High-level simulation loop for IVYAR."""
    def __init__(self, agents, models):
        self.agents = agents
        self.models = models
        self.state = {}
        self.metrics = []

    def step(self, dt=1.0):
        for agent in self.agents:
            agent.act(self.state)
        for model in self.models:
            model.update(self.state, dt)

    def run(self, steps=10):
        for _ in range(steps):
            self.step()
        return self.metrics

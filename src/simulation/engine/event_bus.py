class EventBus:
    """Simple event bus for simulation events."""
    def __init__(self):
        self.queue = []

    def emit(self, event_type, payload=None):
        self.queue.append({"type": event_type, "payload": payload or {}})

    def process(self):
        processed = self.queue
        self.queue = []
        return processed

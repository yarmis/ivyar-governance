def safe_rewrite(draft, evaluation):
    """Softens content to align with Gospel ethics."""
    if not evaluation["overall_pass"]:
        softened = draft
        # Example: remove harsh language, add compassion
        return softened
    return draft

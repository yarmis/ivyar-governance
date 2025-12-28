class RuleEvaluator:
    def summarize(self, results):
        overall_pass = all(r["pass"] for r in results)
        explanation = []
        for r in results:
            if not r["pass"]:
                explanation.append(f"Rule {r[\"rule_id\"]} violated: {r[\"details\"]}")
        return {
            "overall_pass": overall_pass,
            "details": results,
            "explanation": explanation if not overall_pass else ["All Gospel rules satisfied."]
        }

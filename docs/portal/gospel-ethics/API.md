# GOSPEL ETHICS API

## Endpoint
POST /gospel-ethics/advice

## Request
{
  "context": { "domain": "personal_life | leadership | governance" },
  "question": "string"
}

## Response
{
  "advice": "Final ethically filtered answer",
  "ethics": ["Explanation of ethical outcome"],
  "rules": [{ "rule_id": "love_neighbor", "pass": true/false, "details": "..." }]
}

## Behavior
- All rules pass: advice = original draft
- Any rule fails: advice = safe rewrite
- ethics always explains why

---
IVYAR LLC

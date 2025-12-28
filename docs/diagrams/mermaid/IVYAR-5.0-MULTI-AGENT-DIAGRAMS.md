# IVYAR 5.0 MULTI-AGENT ARCHITECTURE DIAGRAMS

## 1. Multi-Agent System Overview
Procurement Agent -> Supplier Agent -> Compliance Agent
Procurement Agent -> Contract Agent -> Compliance Agent
Procurement Agent -> Logistics Agent -> Compliance Agent

## 2. Agent Interactions
Ministry -> Procurement -> Supplier -> Compliance -> Risk Score
Procurement -> Contract -> Compliance -> Approval
Procurement -> Logistics -> Compliance -> Route Approval
Procurement -> Ministry: Final Package

## 3. Agent Responsibilities
- Procurement Agent: generateRFQ, evaluateQuotes, coordinateAgents
- Supplier Agent: rankSuppliers, negotiate
- Contract Agent: draftContract, selectClauses
- Logistics Agent: predictDelays, selectCarrier
- Compliance Agent: riskCheck, decision

---
IVYAR LLC

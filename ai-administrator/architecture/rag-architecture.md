# IVYAR RAG Architecture

## Overview

Retrieval-Augmented Generation (RAG) система для IVYAR.

## Pipeline

```
USER QUERY
    │
    ▼
┌─────────────────────────────────────────┐
│  1. QUERY PROCESSING                     │
│  Language Detection → Intent Classify    │
│  → Entity Extraction → Query Rewrite     │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│  2. HYBRID RETRIEVAL                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Vector  │ │ Keyword │ │  Graph  │   │
│  │ Search  │ │  BM25   │ │  Neo4j  │   │
│  └────┬────┘ └────┬────┘ └────┬────┘   │
│       └───────────┼───────────┘         │
│                   ▼                      │
│           Rank Fusion (RRF)              │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│  3. CONTEXT BUILDING                     │
│  Document Ranking → Context Window       │
│  → User Context → Prompt Assembly        │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│  4. GENERATION                           │
│  LLM Inference → Golden Rules            │
│  → Response Format → Citations           │
└─────────────────────────────────────────┘
    │
    ▼
RESPONSE
```

## Vector Store Config

```yaml
vector_store:
  provider: qdrant
  collections:
    parts_catalog:
      dimensions: 768
      distance: cosine
    documents:
      dimensions: 768
    repair_procedures:
      dimensions: 768
  embedding_model:
    name: sentence-transformers/all-mpnet-base-v2
```

## Hybrid Search

```python
class HybridSearcher:
    def search(self, query, top_k=20):
        weights = {"vector": 0.5, "keyword": 0.3, "graph": 0.2}
        
        vector_results = self.vector_search(query)
        keyword_results = self.keyword_search(query)  
        graph_results = self.graph_search(query)
        
        return self.rrf_fusion([vector_results, keyword_results, graph_results], weights)
```

## Entity Extraction

```python
ENTITY_TYPES = {
    "part_number": r"[A-Z0-9]{2,}-[A-Z0-9]{2,}",
    "nsn": r"\d{4}-\d{2}-\d{3}-\d{4}",
    "brand": ["Toyota", "Caterpillar", "Cummins", ...],
    "platform": ["Hilux", "HMMWV", "M113", ...],
    "repair_level": ["R1", "R2", "R3", "R4"]
}
```

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Response Time (p50) | <500ms | 320ms |
| Response Time (p95) | <2s | 1.2s |
| Retrieval Recall@10 | >90% | 88% |
| Generation Accuracy | >95% | 94.2% |

*Version: 1.0.0*

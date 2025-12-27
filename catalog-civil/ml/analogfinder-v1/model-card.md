# AnalogFinder v1 - Model Card

## 1. Purpose
ML model for finding compatible alternative parts across OEM and aftermarket catalogs.

## 2. Architecture
- Base Model: Sentence Transformers
- Vector Store: FAISS
- Matching: Cosine similarity

## 3. Performance
| Metric | Value |
|--------|-------|
| Precision | 96% |
| Recall | 92% |
| Latency P95 | 120ms |

## 4. Training Data
- OEM Cross-refs: 500K+
- Aftermarket: 200K+
- Manual validations: 10K+

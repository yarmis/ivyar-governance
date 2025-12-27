# ETL Pipeline Specification

## 1. Data Sources
| Source | Format | Frequency |
|--------|--------|-----------|
| OEM Catalogs | CSV/JSON | Monthly |
| Aftermarket | CSV | Quarterly |
| NSN Mappings | CSV | Weekly |

## 2. Pipeline Steps
1. Extract - Read source files
2. Transform - Normalize, enrich
3. Load - Insert to database, update ML index

## 3. Validation Rules
- Required fields not empty
- Valid data types
- No duplicates

## 4. Error Handling
| Error | Action |
|-------|--------|
| Missing field | Reject record |
| Duplicate | Merge or flag |

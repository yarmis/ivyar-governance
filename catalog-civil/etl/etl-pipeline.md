# ETL Pipeline Specification

## 1. Data Sources

| Source | Format | Frequency |
|--------|--------|-----------|
| OEM Catalogs | CSV/JSON | Monthly |
| Aftermarket | CSV | Quarterly |
| NSN Mappings | CSV | Weekly |

## 2. Pipeline Steps

### Step 1: Ingestion
- Read source files
- Validate schema
- Log errors

### Step 2: Normalization
- Standardize brand names
- Normalize part numbers
- Convert units

### Step 3: Enrichment
- Add category mappings
- Add vehicle fitment
- Add cross-references

### Step 4: Validation
- Check required fields
- Validate relationships
- Flag duplicates

### Step 5: Loading
- Insert to database
- Update ML index
- Generate audit log

## 3. Error Handling

| Error Type | Action |
|------------|--------|
| Missing required field | Reject record |
| Invalid format | Reject record |
| Duplicate | Merge or flag |
| Unknown brand | Flag for review |

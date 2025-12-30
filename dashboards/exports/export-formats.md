# Dashboard Export Formats

## Supported Formats

| Format | Extension | Use Case |
|--------|-----------|----------|
| PDF | .pdf | Reports, printing, archiving |
| Excel | .xlsx | Data analysis, further processing |
| CSV | .csv | Raw data export, integration |
| PNG | .png | Screenshots, presentations |
| JSON | .json | API integration, automation |

## PDF Export

### Options

```json
{
  "format": "pdf",
  "options": {
    "pageSize": "A4",
    "orientation": "landscape",
    "includeHeader": true,
    "includeFooter": true,
    "includeFilters": true,
    "includeTimestamp": true,
    "quality": "high"
  }
}
```

### Template Structure

```
┌─────────────────────────────────────────────┐
│ [LOGO]  IVYAR Dashboard Report              │
│ Dashboard: {name}  |  Generated: {date}     │
├─────────────────────────────────────────────┤
│                                             │
│           [Dashboard Content]               │
│                                             │
├─────────────────────────────────────────────┤
│ Filters: {applied filters}                  │
│ Page {n} of {total}  |  Classification: ... │
└─────────────────────────────────────────────┘
```

## Excel Export

### Options

```json
{
  "format": "xlsx",
  "options": {
    "includeCharts": true,
    "separateSheets": true,
    "includeFormulas": false,
    "dateFormat": "YYYY-MM-DD"
  }
}
```

### Sheet Structure

1. **Summary** - KPI values and metadata
2. **Data** - Raw data table
3. **Charts** - Embedded charts (optional)
4. **Filters** - Applied filter values

## Scheduled Exports

### Configuration

```json
{
  "schedule": {
    "frequency": "daily",
    "time": "08:00",
    "timezone": "Europe/Kyiv"
  },
  "delivery": {
    "method": "email",
    "recipients": ["ops@ivyar.io"],
    "subject": "Daily Fleet Report - {date}"
  },
  "format": "pdf",
  "dashboard": "fleet-readiness"
}
```

### Frequencies

| Frequency | Cron | Description |
|-----------|------|-------------|
| Hourly | `0 * * * *` | Every hour |
| Daily | `0 8 * * *` | 08:00 daily |
| Weekly | `0 8 * * 1` | Monday 08:00 |
| Monthly | `0 8 1 * *` | 1st of month |

## API Usage

```bash
# Export to PDF
curl -X POST "https://api.ivyar.org/v1/dashboards/fleet-readiness/export" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"format": "pdf", "filters": {"platform": ["LTV", "MTV"]}}' \
  -o "fleet-report.pdf"

# Export to Excel
curl -X POST "https://api.ivyar.org/v1/dashboards/fleet-readiness/export" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"format": "xlsx"}' \
  -o "fleet-data.xlsx"
```

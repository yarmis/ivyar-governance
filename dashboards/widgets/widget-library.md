# IVYAR Dashboard Widget Library

## Widget Catalog

### 1. KPI Card

```tsx
<KPICard
  title="Fleet Readiness"
  value={78.2}
  unit="%"
  target={85}
  trend={{ value: 2.1, direction: "up" }}
  status="on-track"
  sparkline={data}
/>
```

**Variants:** `default`, `compact`, `large`
**States:** `achieved`, `on-track`, `at-risk`, `critical`

### 2. Gauge Chart

```tsx
<GaugeChart
  value={78}
  min={0}
  max={100}
  thresholds={[
    { value: 70, color: "red" },
    { value: 80, color: "yellow" },
    { value: 100, color: "green" }
  ]}
  label="Readiness"
/>
```

### 3. Bar Chart

```tsx
<BarChart
  data={platformData}
  xKey="platform"
  yKey="readiness"
  horizontal={true}
  showTarget={true}
  targetValue={85}
/>
```

### 4. Line Chart

```tsx
<LineChart
  data={trendData}
  series={[
    { key: "readiness", label: "Readiness", color: "#2c5282" },
    { key: "coverage", label: "Coverage", color: "#38a169" }
  ]}
  xKey="date"
  showArea={true}
/>
```

### 5. Data Table

```tsx
<DataTable
  data={vehicles}
  columns={[
    { key: "id", label: "ID", sortable: true },
    { key: "platform", label: "Platform", filterable: true },
    { key: "status", label: "Status", render: StatusBadge },
    { key: "actions", label: "", render: ActionButtons }
  ]}
  pagination={{ pageSize: 25 }}
  onRowClick={handleDrillDown}
/>
```

### 6. Status Badge

```tsx
<StatusBadge status="operational" size="md" />
<StatusBadge status="in-repair" size="md" />
<StatusBadge status="critical" size="md" pulse={true} />
```

**Statuses:** `operational`, `in-repair`, `pending`, `critical`, `unknown`

### 7. Progress Bar

```tsx
<ProgressBar
  value={65}
  max={100}
  label="Repair Progress"
  showValue={true}
  size="md"
  color="primary"
/>
```

### 8. Alert Card

```tsx
<AlertCard
  severity="critical"
  title="HTV-012 Transmission Failure"
  description="Vehicle in R3 repair for 3 days"
  timestamp={new Date()}
  actions={[
    { label: "View", onClick: handleView },
    { label: "Escalate", onClick: handleEscalate }
  ]}
/>
```

### 9. Map Widget

```tsx
<MapWidget
  center={{ lat: 49.0, lng: 32.0 }}
  zoom={6}
  markers={vehicleLocations}
  markerRenderer={VehicleMarker}
  clusters={true}
/>
```

### 10. Filter Bar

```tsx
<FilterBar
  filters={[
    { key: "platform", type: "multi-select", options: platforms },
    { key: "status", type: "multi-select", options: statuses },
    { key: "dateRange", type: "date-range" }
  ]}
  onChange={handleFilterChange}
  onReset={handleReset}
/>
```

### 11. Heatmap

```tsx
<Heatmap
  data={coverageMatrix}
  xLabels={categories}
  yLabels={platforms}
  colorScale={["#fee2e2", "#fef3c7", "#d1fae5", "#22c55e"]}
  valueFormatter={(v) => `${v}%`}
  onCellClick={handleDrillDown}
/>
```

### 12. Timeline

```tsx
<Timeline
  events={repairHistory}
  orientation="vertical"
  showDuration={true}
  groupBy="date"
/>
```

## Common Props

| Prop | Type | Description |
|------|------|-------------|
| `loading` | boolean | Show skeleton loader |
| `error` | Error | Show error state |
| `empty` | boolean | Show empty state |
| `className` | string | Additional CSS classes |
| `testId` | string | For testing |

## Theming

```tsx
<ThemeProvider theme={ivyarTheme}>
  <Dashboard>
    {/* widgets */}
  </Dashboard>
</ThemeProvider>
```

### Color Tokens

```css
--color-primary: #1a365d;
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-danger: #ef4444;
--color-info: #3b82f6;
```

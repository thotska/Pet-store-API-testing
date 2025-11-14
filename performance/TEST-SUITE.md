# Performance Test Suite Summary 📊

## Available Tests

### 1. Stress Test - Prime Day / Cyber Monday
**File:** `performance/stress-test.ts`  
**Scenario:** Gradual traffic increase to find breaking point

**Pattern:**
- 100 users → 200 users → hold 3 min → ramp down
- Total duration: 9 minutes

**Run:**
```powershell
npm run perf:stress       # Full test
npm run perf:demo         # Quick demo (1 min, 50 users)
npm run perf:report       # View report
```

**What it tests:**
- Can handle expected peak loads
- Response time degradation under sustained load
- System stability at capacity

---

### 2. Spike Test - Super Bowl Ad
**File:** `performance/spike-test.ts`  
**Scenario:** Sudden traffic spikes (like TV ad airing)

**Pattern:**
- 10 → 300 → 50 → 400 users
- Two major spikes with recovery periods
- Total duration: 6 minutes

**Run:**
```powershell
npm run perf:spike        # Full test
npm run perf:spike-demo   # Quick demo (1 min, 100 users)
npm run perf:spike-report # View report
```

**What it tests:**
- Handling sudden traffic bursts
- Auto-scaling response time
- Recovery between spikes
- Graceful degradation

---

## Test Reports

Both tests automatically generate HTML reports:
- **Stress test:** `performance-report.html`
- **Spike test:** `spike-test-report.html`

Reports include:
- ✅ Pass/fail status for all thresholds
- 📈 Response time graphs
- 📊 Request rate charts
- ⚠️ Error rates and failed checks
- 🎯 Detailed metrics (p90, p95, p99)

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run perf:stress` | Full 9-min stress test |
| `npm run perf:spike` | Full 6-min spike test |
| `npm run perf:demo` | Quick stress demo |
| `npm run perf:spike-demo` | Quick spike demo |
| `npm run perf:report` | Open stress test report |
| `npm run perf:spike-report` | Open spike test report |

---

## Understanding Results

### ✅ Success Indicators
- All thresholds green/passing
- Response times under limits
- Error rate < threshold
- Check success rate > target

### ⚠️ Warning Signs
- Response times approaching limits
- Error rates climbing
- Inconsistent performance

### ❌ Critical Issues
- Threshold violations
- High error rates (>2%)
- Complete outages
- No recovery between spikes

---

## Test Configuration

Both tests use the same API endpoints:
- `GET /api/productsList` (80% of traffic)
- `POST /api/searchProduct` (20% of traffic)

**Base URL:** `https://automationexercise.com`

**Thresholds:**
- Response time: p95 < 3000ms
- Error rate: < 1-2%
- Check success: > 98-99%

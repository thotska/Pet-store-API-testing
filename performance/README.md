# K6 Performance Test - Prime Day / Cyber Monday Stress Test

## Overview
This stress test simulates a Prime Day / Cyber Monday traffic scenario where we:
- Start at 100 concurrent users (comfortable zone)
- Ramp up to 200 users (expected peak)
- Hold at 200 users for 3 minutes to identify breaking points
- Monitor response times, error rates, and system behavior

## Prerequisites
1. Install k6: https://k6.io/docs/getting-started/installation/
   - Windows (Chocolatey): `choco install k6`
   - Windows (MSI): Download from https://k6.io/docs/getting-started/installation/

## Test Stages
- **Stage 1** (2 min): Warm up - Ramp from 0 to 100 users
- **Stage 2** (2 min): Scale up - Ramp from 100 to 200 users
- **Stage 3** (3 min): Peak load - Hold at 200 users (CRITICAL PHASE)
- **Stage 4** (2 min): Cool down - Ramp down to 0 users

## Critical Thresholds
- ✅ 95% of requests must complete in < 3 seconds
- ✅ Error rate must stay below 1%
- ✅ 90% of product list requests < 2 seconds
- ✅ 95% of search requests < 2.5 seconds
- ✅ Check success rate > 99%

## What We're Looking For
1. **Response Time Degradation**: At what point do response times exceed 3 seconds?
2. **Error Rate Spike**: When do error rates climb above 1%?
3. **Breaking Point**: What fails first - API server, database, memory?

## Running the Test

### Full Stress Test (9 minutes total)
```powershell
k6 run performance/stress-test.ts --out json=test-results/k6-results.json
```

### Quick Demo Run (1 minute total)
```powershell
k6 run performance/stress-test.ts --duration 1m --vus 50
```

### With HTML Report
The test automatically generates an HTML report named `performance-report.html` in the current directory.

After the test completes, open the report:
```powershell
start performance-report.html
```

## Interpreting Results

### Success Indicators ✅
- All thresholds show green/passing
- Response times remain stable under 3s
- Error rate stays below 1%
- Check success rate above 99%

### Warning Signs ⚠️
- Response times approaching 3s threshold
- Error rates climbing (0.5% - 1%)
- Increasing failed checks

### Critical Issues ❌
- Response times exceeding 3s for p95
- Error rates above 1%
- Check failures above 1%
- HTTP 5xx errors appearing

## Test Traffic Distribution
- **80%** - GET /api/productsList (Product listing)
- **20%** - POST /api/searchProduct (Product search)

Search terms used: top, tshirt, jean, dress, shirt

## User Behavior Simulation
Each virtual user:
1. Makes a request (80% list, 20% search)
2. Waits 1-3 seconds (think time)
3. Repeats until test ends

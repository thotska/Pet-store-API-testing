import http from 'k6/http';
import { check, sleep } from 'k6';
import { Options } from 'k6/options';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// Spike Test Configuration: Super Bowl Ad Scenario
export const options: Options = {
  stages: [
    // Baseline: Normal browsing before the ad
    { duration: '30s', target: 10 },
    
    // SPIKE: Super Bowl ad airs - 30 seconds to 300 users
    { duration: '30s', target: 300 },
    
    // Hold: People typing URL, clicking - 1 minute at peak
    { duration: '1m', target: 300 },
    
    // Recovery: Drop to curious browsers
    { duration: '30s', target: 50 },
    
    // SPIKE 2: Social media sharing wave
    { duration: '30s', target: 400 },
    
    // Hold at second peak
    { duration: '1m', target: 400 },
    
    // Ramp down: Traffic normalizes
    { duration: '1m', target: 10 },
  ],
  
  thresholds: {
    // Must handle spike - 95% under 3s
    'http_req_duration': ['p(95)<3000'],
    
    // Critical: Error rate must stay under 2% even during spike
    'http_req_failed': ['rate<0.02'],
    
    // Check success rate should stay above 98%
    'checks': ['rate>0.98'],
  },
};

const BASE_URL = 'https://automationexercise.com';

interface ProductsResponse {
  responseCode: number;
  products: Array<{
    id: number;
    name: string;
    price: string;
    brand: string;
  }>;
}

export function handleSummary(data: any) {
  return {
    'spike-test-report.html': htmlReport(data),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

export default function (): void {
  // 80% get products, 20% search
  if (Math.random() < 0.8) {
    const response = http.get(`${BASE_URL}/api/productsList`);
    
    check(response, {
      'Status is 200': (r) => r.status === 200,
      'Response time < 3s': (r) => r.timings.duration < 3000,
      'Has products': (r) => {
        try {
          const body = JSON.parse(r.body as string) as ProductsResponse;
          return body.responseCode === 200 && body.products?.length > 0;
        } catch {
          return false;
        }
      },
    });
  } else {
    const searchTerms = ['top', 'tshirt', 'jean', 'dress', 'shirt'];
    const term = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    
    const response = http.post(
      `${BASE_URL}/api/searchProduct`,
      { search_product: term },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    
    check(response, {
      'Search status 200': (r) => r.status === 200,
      'Search response < 3s': (r) => r.timings.duration < 3000,
    });
  }
  
  sleep(Math.random() * 10 + 5);
}

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Options } from 'k6/options';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';


export const options: Options = {
  stages: [
    { duration: '2m', target: 100 },
    
    { duration: '2m', target: 200 },

    { duration: '3m', target: 200 },
    
    { duration: '2m', target: 0 },
  ],
  
  
  thresholds: {
    'http_req_duration': ['p(95)<3000'],

    'http_req_failed': ['rate<0.01'],
    
    'http_req_duration{scenario:getProducts}': ['p(90)<2000'],
    
    'http_req_duration{scenario:searchProducts}': ['p(95)<2500'],
    
    'checks': ['rate>0.99'],
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

// Custom metrics tracking
export function handleSummary(data: any) {
  return {
    'performance-report.html': htmlReport(data),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

export default function (): void {
  // Test Case 1: Get All Products (80% of traffic)
  if (Math.random() < 0.8) {
    const productsResponse = http.get(`${BASE_URL}/api/productsList`, {
      tags: { scenario: 'getProducts' },
    });
    
    check(productsResponse, {
      'Products list - status is 200': (r: http.Response) => r.status === 200,
      'Products list - response time < 3s': (r: http.Response) => r.timings.duration < 3000,
      'Products list - has products': (r: http.Response) => {
        try {
          const body = JSON.parse(r.body as string) as ProductsResponse;
          return body.responseCode === 200 && body.products && body.products.length > 0;
        } catch {
          return false;
        }
      },
    });
  } 

  else {
    const searchTerms: string[] = ['top', 'tshirt', 'jean', 'dress', 'shirt'];
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    
    const searchResponse = http.post(
      `${BASE_URL}/api/searchProduct`,
      { search_product: randomTerm },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        tags: { scenario: 'searchProducts' },
      }
    );
    
    check(searchResponse, {
      'Search products - status is 200': (r: http.Response) => r.status === 200,
      'Search products - response time < 3s': (r: http.Response) => r.timings.duration < 3000,
      'Search products - valid response': (r: http.Response) => {
        try {
          const body = JSON.parse(r.body as string) as ProductsResponse;
          return body.responseCode === 200 && body.products !== undefined;
        } catch {
          return false;
        }
      },
    });
  }
  
  
  sleep(Math.random() * 2 + 1);
}

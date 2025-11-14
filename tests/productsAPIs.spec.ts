import { test, expect } from '@playwright/test';
import { gelAllProductsResponseSchema } from '../schemas/productsSchema';

test.describe('Products API Tests', () => {
    const BASE_URL = 'https://automationexercise.com';

    test('GET /api/productsList - Get all products list', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/productsList`);
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        gelAllProductsResponseSchema.parse(responseBody);
        
    });

    test('POST /api/searchProduct - Search for products', async ({ request }) => {
        const searchTerm = 'top';
        
        const response = await request.post(`${BASE_URL}/api/searchProduct`, {
            form: {
                search_product: searchTerm
            }
        });
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        gelAllProductsResponseSchema.parse(responseBody);
        
    });
});

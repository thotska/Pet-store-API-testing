import { test, expect, request } from '@playwright/test';
import z, { array, string } from 'zod';
import { faker } from '@faker-js/faker';
import { getAPI } from '../utils/apiCallHelper';
import { get } from 'http';



test.describe("Get Pet Inventories by Status", () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const expectedInventoryResponseSchema = z
    .record(z.string(), z.number())
    .refine((data) => Object.keys(data).length === 14, {
      message: "Response must have exactly 14 keys",
    });

    test('Get Pet Inventories by Status', async ({ request }) => {
     await getAPI(request, 
            `${BASE_URL}/store/inventory`, 
            200,
            expectedInventoryResponseSchema);
    });
});
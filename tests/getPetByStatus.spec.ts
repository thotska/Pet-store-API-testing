import { test, expect, request } from '@playwright/test';
import z, { array } from 'zod';
import { faker } from '@faker-js/faker';


test.describe("Get Pets by Status", () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const getPetsByStatusResponseSchema = z.array(z.object({
        id: z.number().int(),
        category: z.object({
            id: z.number().int(),
            name: z.string()
        }),
        photoUrls: z.array(z.string()),
        tags: z.array(z.object({
            id: z.number().int(),
            name: z.string()
        })),
        status: z.enum(['available', 'pending', 'sold'])
    }));
    test('Get Pets by Status - available', async ({ request }) => {
        const status = 'available';
        const getPetsByStatusResponse = await request.get(`${BASE_URL}/pet/findByStatus?status=${status}`);
        expect(getPetsByStatusResponse.status()).toBe(200);
        const getPetsByStatusResponseBody = await getPetsByStatusResponse.json();
        getPetsByStatusResponseSchema.parse(getPetsByStatusResponseBody);
    });
});
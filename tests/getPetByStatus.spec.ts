import { test, expect, request } from '@playwright/test';
import z, { array } from 'zod';
import { faker } from '@faker-js/faker';
import { getAPI } from '../utils/apiCallHelper';


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
        await getAPI(request, 
            `${BASE_URL}/pet/findByStatus?status=available`, 
            200,
            getPetsByStatusResponseSchema);
    });
});
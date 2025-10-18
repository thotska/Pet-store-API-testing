import { test, expect, request } from '@playwright/test';
import z, { array } from 'zod';
import { faker } from '@faker-js/faker';
import { get } from 'http';
import { getAPI } from '../utils/apiCallHelper';


test.describe("Get Pets by Tags", () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;   
    const getPetsByTagsResponseSchema = z.array(z.object({
        id: z.number().int(),
        category: z.object({
            id: z.number().int(),
            name: z.string(),
        }),
        name: z.string(),
        photoUrls: z.array(z.string()),
        tags: z.array(z.object({
            id: z.number().int(),
            name: z.string(),
        })),
        status: z.enum(['available', 'pending', 'sold']),
    }));
    test('Get Pets by Tags - tag1', async ({ request }) => {
        await getAPI(request, 
            `${BASE_URL}/pet/findByTags?tags=tag1`, 
            200,
            getPetsByTagsResponseSchema);
    });

});
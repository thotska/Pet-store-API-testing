import { test, expect, request } from '@playwright/test';
import z, { array, string } from 'zod';
import { faker } from '@faker-js/faker';
import { getAPI } from '../utils/apiCallHelper';



test.describe("Get Pet Inventories by Status", () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const getPetInventoriesByStatusResponseSchema = z.object({
        "sold": z.number().int(),
        "string": z.number().int(),
        "pending": z.number().int(),
        "available": z.number().int(),
        "peric": z.number().int(),
        "${sleep 15}\n": z.number().int(),
        "1": z.number().int(),
        "2'; SELECT pg_sleep(15) -- -": z.number().int(),
        "`sleep 15`\n": z.number().int(),
        "https://ssrfpinger.aikidosec.com/uuid/set/50150782-1cda-4c5c-ae9b-e1a4ed8a144c_status": z.number().int(),
        "2; SELECT pg_sleep(15) -- -": z.number().int(),
        "2'; SELECT SLEEP(15) -- -": z.number().int(),
        "1;sleep${IFS}15;#${IFS}';sleep${IFS}15;#${IFS}\";sleep${IFS}15;#${IFS}\n": z.number().int(),
        "2; SELECT SLEEP(15) -- -": z.number().int()
    });


    test('Get Pet Inventories by Status', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/store/inventory`);
    expect(response.status()).toBe(200);

    const json: Record<string, unknown> = await response.json();

    const keyCount = Object.keys(json).length;
    expect(keyCount).toBe(14);
    getPetInventoriesByStatusResponseSchema.parse(json);
    });
});
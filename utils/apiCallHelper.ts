import { APIRequestContext, APIResponse } from '@playwright/test';
import { ZodTypeAny } from 'zod';


export async function getAPI(
    request: APIRequestContext,
    url: string,
    expectedStatusCode: number,
    expectedSchema: ZodTypeAny,
    retryCount: number = 5,
): Promise<APIResponse> {
    for (let i = 0; i < retryCount; i++) {
        const response = await request.get(url);
        if (response.status() === expectedStatusCode) {
            const responseBody = await response.json();
            expectedSchema.parse(responseBody);
            return response;
        }
    }
    throw new Error(`Failed to get a valid response from ${url} after ${retryCount} attempts`);
}
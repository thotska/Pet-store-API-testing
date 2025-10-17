import { APIRequestContext, APIResponse } from '@playwright/test';
import { ZodTypeAny } from 'zod';

/**
 * Helper function to make POST API calls with retry logic.
 * @param request - The APIRequestContext from Playwright.
 * @param url - The API endpoint URL.
 * @param requestBody - The request payload.
 * @param expectedStatusCode - The expected HTTP status code.
 * @param expectedSchema - The Zod schema to validate the response.
 * @param retryCount - Number of retry attempts (default is 5).
 * @returns The APIResponse object.
 */
export async function postAPI(
    request: APIRequestContext,
    url: string,
    requestBody: any,
    expectedStatusCode: number,
    expectedSchema: ZodTypeAny,
    retryCount: number = 5, 
): Promise<APIResponse> {
    for (let i = 0; i < retryCount; i++) {
      
        const response = await request.post(url, { data: requestBody });

        if (response.status() === expectedStatusCode) {
            const responseBodyJson = await response.json()
            expectedSchema.parse(responseBodyJson)
            return response;
        }
        console.log(`Attempt ${i + 1} failed. Retrying...`);
    }

    throw new Error('Max retries reached. API call failed.');
}
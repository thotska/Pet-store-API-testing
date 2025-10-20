import { test, expect, request } from '@playwright/test';
import z, { array } from 'zod';
import { faker } from '@faker-js/faker';
import { postAPI } from '../utils/createMultipleUsersHelper';   


test.describe("Create Multiple Users", () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    
    const numberOfUsers = 5; 
    const createMultipleUsersRequestBody = Array.from({ length: numberOfUsers }, () => ({
        id: faker.number.int({ min: 1000, max: 99999 }),
        username: faker.internet.username(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 12 }),
        phone: faker.phone.number(),    
        userStatus: faker.number.int({ min: 0, max: 9999 })
    }));

    const createMultipleUsersResponseSchema = z.object({
        code: z.number().int(),
        type: z.string(),
        message: z.string(),
    });

    test('Create Multiple Users', async ({ request }) => {
        await postAPI(
            request,
            `${BASE_URL}/user/createWithArray`,
            createMultipleUsersRequestBody,
            200,
            createMultipleUsersResponseSchema
        );
    });
});
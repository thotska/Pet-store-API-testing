import { test, expect } from '@playwright/test';
import z from 'zod';
import { faker } from '@faker-js/faker';

test.describe('User API Tests', () => {
    const baseURL = "https://petstore.swagger.io/v2";

    test('Create a new User', async ({ request }) => {
        const createNewUserRequestBody = {
            "id": 12452,
            "username": "TestUserNameTetiana99",
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "phone": faker.phone.number(),
            "userStatus": 0
        };

        const createNewUserResponse = await request.post(`${baseURL}/user`, {
            data: createNewUserRequestBody
        });
        expect(createNewUserResponse.status()).toBe(200);
        const createNewUserResponseBody = await createNewUserResponse.json();
        const createNewUserResponseSchema = z.object({
            code: z.literal(200),
            type: z.literal('unknown'),
            message: z.literal(createNewUserRequestBody.id.toString()),
        });

        createNewUserResponseSchema.parse(createNewUserResponseBody);


    });
});



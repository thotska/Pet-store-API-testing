import { test, expect } from '@playwright/test';
import z from 'zod';
import { faker } from '@faker-js/faker';

test.describe('User API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`
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
    test('Create a new User', async ({ request }) => {
        

        const createNewUserResponse = await request.post(`${BASE_URL}/user`, {
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

    test("Get user by username", async ({request}) => {
        const username = "TestUserNameTetiana99";
    
        const getUserByUsernameResponse = await request.get(`${BASE_URL}/user/${username}`);
        
        let getUserResponse;
        for (let i = 0; i < 5; i++) {
            getUserResponse = await request.get(`${BASE_URL}/user/${username}`);
            if(getUserResponse.status() === 200) {
                break; // Exit loop if the request is successful
            }
            console.log(`Attempt ${i + 1} failed. Retrying...`);
        }
    
        expect(getUserByUsernameResponse.status()).toBe(200);
        const getUserByUsernameResponseBody = await getUserByUsernameResponse.json();
        const getUserByUsernameResponseSchema = z.object({
            id: z.number().int(),
            username: z.literal(username),
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            password: z.string(),
            phone: z.string(),
            userStatus: z.number().int()
        });
    
        getUserByUsernameResponseSchema.parse(getUserByUsernameResponseBody);
    });

    test("Delete user by username", async ({request}) => {
        const username = "TestUserNameTetiana99";

        const deleteUserByUsernameResponse = await request.delete(`${BASE_URL}/user/${username}`);

        expect(deleteUserByUsernameResponse.status()).toBe(200);
        const deleteUserByUsernameResponseBody = await deleteUserByUsernameResponse.json();
        const deleteUserByUsernameResponseSchema = z.object({
            code: z.literal(200),
            type: z.literal('unknown'),
            message: z.literal(username),
        });

        deleteUserByUsernameResponseSchema.parse(deleteUserByUsernameResponseBody);
    });
});


